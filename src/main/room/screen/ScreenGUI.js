// Copyright 2015 by Paulo Augusto Peccin. See license.txt distributed with this file.

jt.ScreenGUI = jt.Util.isMobileDevice()
    ? {
        BAR_HEIGHT: 29,
        BAR_MENU_WIDTH: 150,
        BAR_MENU_ITEM_HEIGHT: 33,
        BAR_MENU_ITEM_FONT_SIZE: 14,
        LOGO_SCREEN_WIDTH: 618,
        LOGO_SCREEN_HEIGHT: 455,
        TOUCH_CONTROLS_LEFT_WIDTH: 119,
        TOUCH_CONTROLS_LEFT_WIDTH_BIG: 143,
        TOUCH_CONTROLS_RIGHT_WIDTH: 80
    }
    : {
        BAR_HEIGHT: 29,
        BAR_MENU_WIDTH: 140,
        BAR_MENU_ITEM_HEIGHT: 29,
        BAR_MENU_ITEM_FONT_SIZE: 13,
        LOGO_SCREEN_WIDTH: 618,
        LOGO_SCREEN_HEIGHT: 455,
        TOUCH_CONTROLS_LEFT_WIDTH: 119,
        TOUCH_CONTROLS_LEFT_WIDTH_BIG: 143,
        TOUCH_CONTROLS_RIGHT_WIDTH: 80
    };

jt.ScreenGUI.html = function() {
    return `<div id="jt-screen-fs" tabindex="0">
            <div id="jt-screen-fs-center" tabindex="-1">
                <div id="jt-screen-canvas-outer">
                    <canvas id="jt-screen-canvas" tabindex="-1"></canvas>
                    <img id="jt-canvas-loading-icon" draggable="false" src="` + jt.Images.urls.loading + `">
                    <div id="jt-logo">
                        <div id="jt-logo-center">
                            <img id="jt-logo-loading-icon" draggable="false" src="` + jt.Images.urls.loading + `">
                            <img id="jt-logo-image" draggable="false" src="` + jt.Images.urls.logo + `">
                            <div id="jt-logo-message">
                                <div id="jt-logo-message-text"></div>
                                <div id="jt-logo-message-ok">
                                    <div id="jt-logo-message-ok-text"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="jt-osd"></div>
                </div>
                <div id="jt-bar">
                    <div id="jt-bar-inner"></div>
                </div>
                <div id="jt-console-panel" class="jt-console-panel" tabindex="-1">
                </div>
            </div>
            <div id="jt-screen-scroll-message">
                Swipe up/down on the Screen <br>to hide the browser bars!
            </div>
        </div>`;
};

jt.ScreenGUI.htmlConsolePanel =
    `<div id="jt-console-panel-p0-diff-label" class="jt-console-panel-p0-diff-label jt-console-panel-icon"></div>
    <div id="jt-console-panel-p1-diff-label" class="jt-console-panel-p1-diff-label jt-console-panel-icon"></div>
    <div id="jt-console-panel-power-labels" class="jt-console-panel-power-labels jt-console-panel-icon"></div>
    <div id="jt-console-panel-reset-labels" class="jt-console-panel-reset-labels jt-console-panel-icon"></div>
    <div id="jt-console-panel-power" class="jt-console-panel-power jt-console-panel-lever"></div>
    <div id="jt-console-panel-color" class="jt-console-panel-color jt-console-panel-lever"></div>
    <div id="jt-console-panel-select" class="jt-console-panel-select jt-console-panel-lever"></div>
    <div id="jt-console-panel-reset" class="jt-console-panel-reset jt-console-panel-lever"></div>
    <div id="jt-console-panel-p0-diff" class="jt-console-panel-p0-diff jt-console-panel-switch"></div>
    <div id="jt-console-panel-p1-diff" class="jt-console-panel-p1-diff jt-console-panel-switch"></div>
    <div id="jt-console-panel-cart-image" class="jt-console-panel-cart-image"></div>
    <div id="jt-console-panel-cart-load" class="jt-console-panel-cart-load"></div>
    <div id="jt-console-panel-cart-file" class="jt-console-panel-cart-file jt-console-panel-icon"></div>
    <div id="jt-console-panel-cart-url" class="jt-console-panel-cart-url jt-console-panel-icon"></div>
    <div id="jt-console-panel-cart-label" class="jt-console-panel-cart-label"></div>`
;

jt.ScreenGUI.css = function() {
    return `html.jt-full-screen-scroll-hack body {
    position: absolute;
    width: 100%;
    height: ` + Math.max(1280, (Math.max(screen.width, screen.height) * 1.4) | 0) + `px;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    border: none;
    overflow-x: hidden;
    overflow-y: auto;
}

#jt-screen-fs, #jt-screen-fs div, #jt-screen-fs canvas {
    outline: none;
}

#` + Javatari.SCREEN_ELEMENT_ID + ` {
    display: inline-block;
    visibility: hidden;
    font-family: sans-serif;
    font-weight: normal;
    margin: 0;
    padding: 0;
    border: 1px solid black;
    background: black;
    overflow: visible;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    tap-highlight-color: transparent;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    text-size-adjust: none;
}
html.jt-full-screen #` + Javatari.SCREEN_ELEMENT_ID + ` {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
    box-shadow: none;
    z-index: 2147483646;    /* one behind fsElement */
}
html.jt-started #` + Javatari.SCREEN_ELEMENT_ID + ` {
    visibility: visible;
}

#jt-screen-scroll-message {
    position: absolute;
    bottom: 150%;
    right: 0;
    left: 0;
    height: 0;
    width: 0;
    margin: 0 auto;
    padding: 0;
    font-size: 16px;
    line-height: 28px;
    white-space: nowrap;
    color: hsl(0, 0%, 4%);
    background: hsl(0, 0%, 92%);
    border-radius: 15px;
    box-shadow: 2px 2px 9px rgba(0, 0, 0, 0.7);
    transition: all 1.7s step-end, opacity 1.6s linear;
    opacity: 0;
    z-index: -1;
}
html.jt-full-screen-scroll-hack #jt-screen-fs.jt-scroll-message #jt-screen-scroll-message {
    opacity: 1;
    bottom: 23%;
    width: 215px;
    height: 56px;
    padding: 13px 20px;
    z-index: 60;
    transition: none;
}

#jt-screen-fs {
    position: relative;
    background: black;
    text-align: center;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    tap-highlight-color: rgba(0,0,0,0)
}
html.jt-full-screen #jt-screen-fs {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2147483647;
}
html.jt-full-screen-scroll-hack #jt-screen-fs {
    position: fixed;
    bottom: 0;
    height: 100vh;
}

html.jt-full-screen #jt-screen-fs-center {      /* Used to center and move things horizontally in Landscape Full Screen */
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

#jt-screen-canvas-outer {
    display: inline-block;
    position: relative;
    overflow: hidden;
    vertical-align: top;
    line-height: 1px;
    z-index: 3;
}

#jt-screen-canvas {
    display: block;
}

#jt-bar {
    position: relative;
    left: 0;
    right: 0;
    height: ` + this.BAR_HEIGHT + `px;
    margin: 0 auto;
    border-top: 1px solid black;
    background: hsl(0, 0%, 16%);
    overflow: visible;                    /* for the Menu to show through */
    box-sizing: content-box;
    z-index: 40;

}
#jt-bar-inner {
    position: absolute;
    overflow: hidden;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: left;
}

html.jt-bar-auto-hide #jt-bar, html.jt-full-screen #jt-bar {
    position: absolute;
    bottom: 0;
    transition: height 0.08s ease-in-out;
}
html.jt-bar-auto-hide #jt-bar.jt-hidden {
    transition: height 0.5s ease-in-out;
    height: 0;
    bottom: -1px;
}
@media only screen and (orientation: landscape) {
    html.jt-full-screen #jt-bar.jt-hidden {
        transition: height 0.5s ease-in-out;
        height: 0;
        bottom: -1px;
    }
}

#jt-bar.jt-narrow .jt-narrow-hidden {
    display: none;
}

.jt-bar-button {
    display: inline-block;
    width: 24px;
    height: 28px;
    margin: 0 1px;
    background-image: url("` + jt.Images.urls.iconSprites + `");
    background-repeat: no-repeat;
    background-size: 264px 82px;
    cursor: pointer;
}
/*
.jt-bar-button {
    border: 1px solid yellow;
    background-origin: border-box;
    box-sizing: border-box;
}
*/

#jt-bar-power {
    margin: 0 8px 0 6px;
}
#jt-bar-select {
    margin: 0 2px;
    width: 50px;
}
#jt-bar-reset {
    margin: 0 2px;
    width: 50px;
}
html.jt-console-panel-active #jt-bar-select, html.jt-console-panel-active #jt-bar-reset {
    display: none;
}
#jt-bar-settings, #jt-bar-full-screen, #jt-bar-scale-plus, #jt-bar-scale-minus {
    float: right;
    margin: 0;
}
#jt-bar-settings {
    margin-right: 5px;
}
#jt-bar-full-screen.jt-mobile {
    margin: 0 6px;
}
#jt-bar-scale-plus {
    width: 21px;
}
#jt-bar-scale-minus {
    width: 18px;
}
#jt-bar-text {
    float: right;
    width: 32px;
}
#jt-bar-text.jt-mobile {
    margin: 0 0 0 6px;
}
#jt-bar-console-panel {
    position: absolute;
    left: 0; right: 0;
    width: 37px;
    margin: 0 auto;
}
#jt-bar.jt-narrow #jt-bar-console-panel {
    position: static;
    float: right;
}
#jt-bar-logo {
    position: absolute;
    left: 0; right: 0;
    width: 34px;
    margin: 0 auto;
}


#jt-bar-menu {
    position: absolute;
    display: none;
    bottom: ` + this.BAR_HEIGHT + `px;
    font-size: ` + this.BAR_MENU_ITEM_FONT_SIZE + `px;
    line-height: 1px;
    overflow: hidden;
    transform-origin: bottom center;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
#jt-bar-menu-inner {
    display: inline-block;
    padding-bottom: 2px;
    border: 1px solid black;
    background: hsl(0, 0%, 16%);
}
.jt-bar-menu-item, #jt-bar-menu-title {
    position: relative;
    display: none;
    width: ` + this.BAR_MENU_WIDTH + `px;
    height: ` + this.BAR_MENU_ITEM_HEIGHT + `px;
    color: rgb(205, 205, 205);
    border: none;
    padding: 0;
    line-height: ` + this.BAR_MENU_ITEM_HEIGHT + `px;
    text-shadow: 1px 1px 1px black;
    background: transparent;
    outline: none;
    overflow: hidden;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    cursor: pointer;
    box-sizing: border-box;
}
#jt-bar-menu-title {
    display: block;
    color: white;
    font-weight: bold;
    border-bottom: 1px solid black;
    margin-bottom: 1px;
    text-align: center;
    background: rgb(70, 70, 70);
    cursor: auto;
}
.jt-bar-menu-item.jt-hover:not(.jt-bar-menu-item-disabled):not(.jt-bar-menu-item-divider) {
    color: white;
    background: hsl(358, 67%, 46%);
}
.jt-bar-menu-item-disabled {
    color: rgb(110, 110, 110);
}
.jt-bar-menu-item-divider {
    height: 1px;
    margin: 1px 0;
    background: black;
}
.jt-bar-menu-item-toggle {
    text-align: left;
    padding-left: 30px;
}
.jt-bar-menu-item-toggle::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 19px;
    top: ` + (((this.BAR_MENU_ITEM_HEIGHT - 21) / 2) | 0) + `px;
    left: 10px;
    background: rgb(70, 70, 70);
    box-shadow: black 1px 1px 1px;
}

.jt-bar-menu-item-toggle.jt-bar-menu-item-toggle-checked {
    color: white;
}
.jt-bar-menu-item-toggle.jt-bar-menu-item-toggle-checked::after {
    background: rgb(248, 33, 28);
}


#jt-console-panel {
    display: none;
    position: absolute;
    bottom: -` + (jt.ConsolePanel.DEFAULT_HEIGHT + 2) + `px;
    left: 50%;
    transform: translate(-50%, 0);
    transform-origin: center top;
    margin: 0 auto;
    border: 1px solid black;
    z-index: 30;
}

html.jt-console-panel-active #jt-console-panel {
    display: block;
}
html.jt-full-screen #jt-console-panel {
    bottom: ` + (jt.ScreenGUI.BAR_HEIGHT + 2) + `px;
    border: none;
    transform-origin: center bottom;
}


#jt-screen-fs .jt-select-dialog {
    position: absolute;
    overflow: hidden;
    display: none;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 540px;
    max-width: 92%;
    height: 297px;
    margin: auto;
    color: white;
    font-size: 18px;
    line-height: 21px;
    background: hsl(0, 0%, 16%);
    padding: 14px 0 0;
    text-align: center;
    border: 1px solid black;
    box-sizing: initial;
    text-shadow: 1px 1px 1px black;
    box-shadow: 3px 3px 15px 2px rgba(0, 0, 0, .4);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: auto;
    z-index: 50;
}
#jt-screen-fs .jt-select-dialog.jt-show {
    display: block;
}
#jt-screen-fs .jt-select-dialog .jt-footer {
    position: absolute;
    width: 100%;
    bottom: 7px;
    font-size: 13px;
    text-align: center;
    color: rgb(170, 170, 170);
}
#jt-screen-fs .jt-select-dialog ul {
    position: relative;
    width: 88%;
    top: 5px;
    margin: auto;
    padding: 0;
    list-style: none;
    font-size: 14px;
    color: hsl(0, 0%, 88%);
}
#jt-screen-fs .jt-select-dialog li {
    display: none;
    position: relative;
    overflow: hidden;
    height: 26px;
    background: rgb(70, 70, 70);
    margin: 7px 0;
    padding: 11px 10px 0;
    line-height: 0;
    text-align: left;
    text-overflow: ellipsis;
    border: 2px dashed transparent;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
    white-space: nowrap;
    box-sizing: border-box;
    cursor: pointer;
}
#jt-screen-fs .jt-select-dialog li.jt-visible {
    display: block;
}
#jt-screen-fs .jt-select-dialog li.jt-selected {
    color: white;
    background: hsl(358, 67%, 46%);
}
#jt-screen-fs .jt-select-dialog li.jt-droptarget {
    color: white;
    border-color: lightgray;
}
#jt-screen-fs .jt-select-dialog li.jt-toggle::after {
    content: "";
    position: absolute;
    width: 6px;
    height: 17px;
    top: 2px;
    left: 6px;
    background: rgb(60, 60, 60);
    box-shadow: black 1px 1px 1px;
}
#jt-screen-fs .jt-select-dialog li.jt-toggle-checked::after {
    background: rgb(248, 33, 28);
}

#jt-logo {
    position: absolute;
    display: none;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background: black;
}
#jt-logo.jt-show {
    display: block;
}

#jt-logo-center {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 598px;
    height: 456px;
    transform: translate(-50%, -50%);
}

#jt-logo-image {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 335px;
    max-width: 57%;
    transform: translate(-50%, -50%);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#jt-screen-fs.jt-logo-message-active #jt-logo-image {
    top: 128px;
    width: 37%;
    max-width: initial;
}

#jt-logo-loading-icon, #jt-canvas-loading-icon {
    display: none;
    position: absolute;
    top: 79%;
    left: 0; right: 0;
    width: 14%;
    height: 3%;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, .8);
    border: solid transparent;
    border-width: 8px 30px;
    border-radius: 3px;
    box-sizing: content-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
#jt-screen-fs.jt-logo-message-active #jt-logo-loading-icon {
    top: 204px;
}

#jt-logo-message {
    display: none;
    position: absolute;
    top: 226px;
    width: 100%;
    color: hsl(0, 0%, 97%);
    font-size: 29px;
    line-height: 34px;
}
#jt-screen-fs.jt-logo-message-active #jt-logo-message {
    display: block;
}

#jt-logo-message-ok {
    display: block;
    position: absolute;
    top: 91px;
    left: 193px;
    width: 214px;
    height: 130px;
}
#jt-logo-message-ok.jt-higher {
    top: 74px;
}
#jt-logo-message-ok-text {
    position: absolute;
    top: 49%;
    left: 50%;
    width: 120px;
    height: 47px;
    font-size: 23px;
    line-height: 47px;
    background: hsl(358, 67%, 46%);
    border-radius: 6px;
    color: white;
    transform: translate(-50%, -50%);
}

#jt-osd {
    position: absolute;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    top: -29px;
    right: 16px;
    height: 29px;
    padding: 0 12px;
    margin: 0;
    font-weight: bold;
    font-size: 15px;
    line-height: 29px;
    color: rgb(0, 255, 0);
    background: rgba(0, 0, 0, 0.7);
    transform-origin: top right;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    opacity: 0;
}


.jt-arrow-up, .jt-arrow-down, .jt-arrow-left, .jt-arrow-right {
    border: 0px solid transparent;
    box-sizing: border-box;
}
.jt-arrow-up    { border-bottom-color: inherit; }
.jt-arrow-down  { border-top-color: inherit; }
.jt-arrow-left  { border-right-color: inherit; }
.jt-arrow-right { border-left-color: inherit; }


.jt-quick-options-list {
    margin-top: 12px;
    padding: 0;
    list-style: none;
    color: hsl(0, 0%, 88%);
}
.jt-quick-options-list li {
    margin-top: 9px;
    line-height: 1px;
    text-align: left;
}
.jt-quick-options-list li div {
    display: inline-block;
    overflow: hidden;
    height: 26px;
    font-size: 14px;
    line-height: 26px;
    text-overflow: ellipsis;
    white-space: nowrap;
    box-sizing: border-box;
}
.jt-quick-options-list .jt-control {
    float: right;
    width: 86px;
    font-size: 15px;
    line-height: 25px;
    color: hsl(0, 0%, 70%);
    background: black;
    text-align: center;
    cursor: pointer;
}
.jt-quick-options-list .jt-control.jt-selected {
    color: white;
    background: hsl(358, 67%, 46%);
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
}
.jt-quick-options-list .jt-control.jt-selected.jt-inactive {
    line-height: 21px;
    border: 2px dashed hsl(358, 67%, 46%);
    background: black;
}


#jt-quick-options {
    display: none;
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    width: 216px;
    height: 282px;
    margin: auto;
    padding: 14px 16px 0;
    color: white;
    font-size: 18px;
    line-height: 22px;
    background: hsl(0, 0%, 16%);
    text-align: center;
    border: 1px solid black;
    box-sizing: initial;
    text-shadow: 1px 1px 1px black;
    box-shadow: 3px 3px 15px 2px rgba(0, 0, 0, .4);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    cursor: auto;
    z-index: 50;
}
#jt-quick-options.jt-show {
    display: block;
}
#jt-quick-options::before {
    content: "Quick Options";
    display: block;
}


#jt-touch-left, #jt-touch-right, #jt-touch-speed {
    display: none;
    position: absolute;
    z-index: 1;
}

html.jt-full-screen.jt-touch-active #jt-touch-left, html.jt-full-screen.jt-touch-active #jt-touch-right, html.jt-full-screen.jt-touch-active #jt-touch-speed {
    display: block;
}

.jt-touch-dir {
    width: 130px;
    height: 130px;
    color: hsl(0, 0%, 75%);
    border-radius: 100%;
}
.jt-touch-dir::before {
    content: "";
    position: absolute;
    top: 14px; left: 14px;
    right: 14px; bottom: 14px;
    border: 1px solid hsl(0, 0%, 26%);
    border-radius: 100%;
}

.jt-touch-dir-joy .jt-touch-dir-up, .jt-touch-dir-joy .jt-touch-dir-left {
    position: absolute;
    background: hsl(0, 0%, 31%);
    border-radius: 2px 2px 0 0;
    box-shadow: inset 1px 2px 0px hsl(0, 0%, 43%), inset -1px -1px hsl(0, 0%, 19%), 0 3px 0 1px hsl(0, 0%, 21%);
}
.jt-touch-dir-joy .jt-touch-dir-up {
    width: 26px;
    height: 78px;
    top: 24px;
    left: 52px;
}
.jt-touch-dir-joy .jt-touch-dir-left {
    width: 78px;
    height: 25px;
    top: 51px;
    left: 26px;
}
.jt-touch-dir-joy .jt-touch-dir-left::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 23px;
    width: 33px;
    height: 22px;
    background: inherit;
    z-index: 1;
}
.jt-touch-dir-joy .jt-touch-dir-left::after {
    content: "";
    position: absolute;
    top: 4px;
    left: 30px;
    height: 17px;
    width: 17px;
    border-radius: 100%;
    box-shadow:  inset 0 0 2px hsl(0, 0%, 22%), inset 1px 2px 3px 1px hsl(0, 0%, 26%), inset -1px -2px 1px hsl(0, 0%, 64%);
    z-index: 2;
}

.jt-touch-dir .jt-arrow-up, .jt-touch-dir .jt-arrow-down, .jt-touch-dir .jt-arrow-left, .jt-touch-dir .jt-arrow-right {
    position: absolute;
    border-width: 5px;
    z-index: 2;
}
.jt-touch-dir .jt-arrow-up {
    top: 26px;
    left: 60px;
    border-bottom-width: 11px;
}
.jt-touch-dir .jt-arrow-down {
    bottom: 29px;
    left: 60px;
    border-top-width: 11px;
}
.jt-touch-dir .jt-arrow-left {
    top: 58px;
    left: 26px;
    border-right-width: 11px;
}
.jt-touch-dir .jt-arrow-right {
    top: 58px;
    right: 26px;
    border-left-width: 11px;
}

.jt-touch-button {
    position: relative;
    display: block;
    width: 72px;
    height: 72px;
    font-size: 20px;
    line-height: 67px;
    color: hsl(0, 0%, 79%);
    border-radius: 100%;
    cursor: default;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    z-index: 0;
}

.jt-touch-button::before {
    content: "";
    position: absolute;
    box-sizing: border-box;
    z-index: -1;
}

.jt-touch-button-joy::before, .jt-touch-button-none::before {
    width: 50px;
    height: 48px;
    top: 9px;
    left: 11px;
    border-radius: 100%;
}
#jt-screen-fs.jt-touch-config-active .jt-touch-button-none::before {
    border: 2px solid hsl(0, 0%, 30%);
}

.jt-touch-button-joy.jt-touch-button-joy-button::before {
    border: none;
    background: hsl(0, 70%, 42%);
    box-shadow: inset 0 2px 0 0px hsl(0, 70%, 48%), 0 2px 0 2px hsl(0, 70%, 27%), inset 0 0px 1px 9px hsl(0, 70%, 38%);
}
.jt-touch-button-joy.jt-touch-button-joy-buttonT::before {
    border: none;
    background: hsl(240, 50%, 45%);
    box-shadow: inset 0 2px 0 0px hsl(240, 50%, 52%), 0 2px 0 2px hsl(240, 50%, 24%), inset 0 0px 1px 9px hsl(240, 50%, 40%);
}

#jt-touch-button  { z-index: 7 }
#jt-touch-buttonT { z-index: 6 }


#jt-touch-speed.jt-center {
     width: 84px;
     left: 0; right: 0;
     margin: 0 auto;
}
#jt-touch-speed.jt-center.jt-poweroff #jt-touch-pause {
     margin-left: 21px
}
#jt-touch-pause, #jt-touch-fast {
    float: left;
    width: 42px;
    height: 42px;
    border-color: hsl(0, 0%, 70%);
}
#jt-touch-pause::after, #jt-touch-fast::before, #jt-touch-fast::after {
    content: "";
    display: inline-block;
    border: 0 solid transparent;
    box-sizing: border-box;
}
#jt-touch-pause::after {
    margin-top: 14px;
    width: 13px;
    height: 14px;
    border-width: 0;
    border-left-width: 4px;
    border-left-color: inherit;
    border-right-width: 4px;
    border-right-color: inherit;
}
#jt-touch-fast::before, #jt-touch-fast::after {
    margin-top: 14px;
    width: 11px;
    height: 14px;
    border-width: 7px;
    border-left-width: 11px;
    border-left-color: inherit;
    border-right-width: 0;
}
#jt-touch-speed.jt-paused #jt-touch-pause::after, #jt-touch-speed.jt-poweroff #jt-touch-pause::after {
    margin: 12px 0 0 3px;
    width: 15px;
    height: 18x;
    border-width: 9px;
    border-left-width: 15px;
    border-right-width: 0;
}
#jt-touch-speed.jt-paused  #jt-touch-fast::after {
    width: 7px;
    border-width: 0;
    border-left-width: 3px;
}
#jt-touch-speed.jt-poweroff #jt-touch-fast {
    display: none;
}


.jt-console-panel {
    width:` + jt.ConsolePanel.DEFAULT_WIDTH + `px;
    height:` + jt.ConsolePanel.DEFAULT_HEIGHT + `px;
    background: black url("` + jt.Images.urls.panel + `") no-repeat;
    background-size: 460px 134px;
    box-shadow: ` + jt.ConsolePanel.sameBoxShadowAsScreen() + `;
    outline: none;
}

html.jt-full-screen .jt-console-panel {
    box-shadow: none;
}

.jt-console-panel-icon {
    position: absolute;
    background: url("` + jt.Images.urls.iconSprites + `") center no-repeat;
    background-size: 264px 82px;
}

.jt-console-panel-switch {
    position: absolute;
    bottom: 107px;
    width: 50px;
    height: 26px;
    opacity: 0;
    cursor: pointer;
}
.jt-console-panel-switch:after {
    content: "";
    position: absolute;
    left: 11px;
    bottom: 5px;
    width: 27px;
    height: 16px;
    background: url("` + jt.Images.urls.panelSprites + `") center no-repeat;
    background-size: 256px 93px;
}

.jt-console-panel-lever {
    position: absolute;
    bottom: 30px;
    width: 44px;
    height: 72px;
    cursor: pointer;
}
.jt-console-panel-lever:after {
    content: "";
    position: absolute;
    left: 12px;
    bottom: 8px;
    width: 20px;
    height: 46px;
    background: url("` + jt.Images.urls.panelSprites + `") center no-repeat;
    background-size: 256px 93px;
}

.jt-console-panel-power {
    left: 19px;
}
.jt-console-panel-power:after {
    background-position: 0px 0px;
}

.jt-console-panel-color {
    left: 84px;
}
.jt-console-panel-color:after {
    background-position: -21px 0px;
}

.jt-console-panel-select {
    left: 340px;
}
.jt-console-panel-select:after {
    background-position: 0px -47px;
}

.jt-console-panel-reset {
    left: 403px;
}
.jt-console-panel-reset:after {
    background-position: -21px -47px;
}

.jt-console-panel-p0-diff {
    left: 152px;
}
.jt-console-panel-p0-diff:after {
    background-position: -229px -17px;
}

.jt-console-panel-p1-diff {
    left: 265px;
}
.jt-console-panel-p1-diff:after {
    background-position: -229px 0px;
}

.jt-console-panel-cart-image {
    position: absolute;
    left: 140px;
    bottom: 9px;
    width: 186px;
    height: 82px;
    background: url("` + jt.Images.urls.panelSprites + `") center no-repeat;
    background-size: 256px 93px;
    background-position: -42px 0px;
}

.jt-console-panel-cart-load {
    position: absolute;
    left: 141px;
    bottom: 36px;
    width: 184px;
    height: 55px;
    cursor: pointer;
}

.jt-console-panel-cart-file {
    left: 170px;
    bottom: 3px;
    width: 31px;
    height: 30px;
    background-position: -132px -6px;
    cursor: pointer;
}

.jt-console-panel-cart-url {
    left: 266px;
    bottom: 3px;
    width: 31px;
    height: 30px;
    background-position: -161px -6px;
    cursor: pointer;
}

.jt-console-panel-cart-label {
    position: absolute;
    top: 51px;
    left: 156px;
    width: 148px;
    height: 25px;
    padding: 0px 2px;
    margin: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-style: normal;
    font-variant: normal;
    font-weight: bold;
    font-stretch: normal;
    font-size: 14px;
    line-height: 25px;
    font-family: sans-serif;
    text-align: center;
    color: black;
    background: black;
    border: 1px solid transparent;
    opacity: 1;
    cursor: pointer;
}

.jt-console-panel-power-labels {
    left: 31px;
    bottom: 9px;
    width: 88px;
    height: 15px;
    background-position: -135px -37px;
}

.jt-console-panel-reset-labels {
    right: 16px;
    bottom: 9px;
    width: 96px;
    height: 15px;
    background-position: -135px -55px;
}

.jt-console-panel-p0-diff-label {
    left: 128px;
    top: 8px;
    width: 29px;
    height: 15px;
    background-position: -233px -37px;
}

.jt-console-panel-p1-diff-label {
    left: 313px;
    top: 8px;
    width: 28px;
    height: 15px;
    background-position: -233px -55px;
}

.jt-hide-labels .jt-console-panel-p0-diff-label,
.jt-hide-labels .jt-console-panel-p1-diff-label,
.jt-hide-labels .jt-console-panel-power-labels,
.jt-hide-labels .jt-console-panel-reset-labels,
.jt-hide-labels .jt-console-panel-cart-file,
.jt-hide-labels .jt-console-panel-cart-url {
    visibility: hidden;
}


@media only screen and (orientation: landscape) {    /* Landscape */
    #jt-touch-left {
        left: calc(-6px - ` + this.TOUCH_CONTROLS_LEFT_WIDTH + `px);
        bottom: 50%;
        transform: translateY(50%);
    }
    html.jt-full-screen.jt-touch-active.jt-dir-big  #jt-touch-left {
        left: calc(-6px - ` + this.TOUCH_CONTROLS_LEFT_WIDTH_BIG + `px);
        transform: translateY(50%) scale(1.2);
        transform-origin: left center;
    }

    #jt-touch-right {
        right: calc(5px - ` + this.TOUCH_CONTROLS_RIGHT_WIDTH + `px);
        bottom: 50%;
        transform: translateY(50%);
    }

    #jt-touch-speed {
        position: absolute;
        left: -103px;
        top: 10px;
    }
    html.jt-full-screen.jt-touch-active.jt-dir-big  #jt-touch-speed {
        left: -118px;
    }

    /* Adjust centered elements leaving space to the touch controls on both sides */
    html.jt-full-screen.jt-touch-active #jt-screen-fs-center {
        left: ` + this.TOUCH_CONTROLS_LEFT_WIDTH + `px;
        right: ` + this.TOUCH_CONTROLS_RIGHT_WIDTH + `px;
    }
    html.jt-full-screen.jt-touch-active.jt-dir-big #jt-screen-fs-center {
        left: ` + this.TOUCH_CONTROLS_LEFT_WIDTH_BIG + `px;
    }
}


@media only screen and (orientation: portrait) {    /* Portrait */

    #jt-touch-left {
        left: 2px;
        bottom: 200px;
    }
    html.jt-full-screen.jt-touch-active.jt-dir-big  #jt-touch-left {
        transform: scale(1.2);
        transform-origin: left center;
    }

    #jt-touch-right {
        right: 5px;
        bottom: 144px;
        width: 112px;
        height: 112px;
    }

    #jt-touch-speed {
        position: absolute;
        left: 19px;
        bottom: ` + (this.BAR_HEIGHT + 12) + `px;
    }

    .jt-touch-button {
        position: absolute;
    }
    #jt-touch-button {
        bottom: 50%;
        right: 50%;
    }
    #jt-touch-buttonT {
        bottom: 100%;
        right: 0%;
    }

}

@media only screen and (orientation: portrait) and (max-device-height: 638px) {    /* Medium Portrait. Like iPhone 5 */

    #jt-touch-left {
        bottom: 156px;
    }
    #jt-touch-right {
        bottom: 98px;
    }

}

@media only screen and (orientation: portrait) and (max-device-height: 518px) {    /* Short Portrait. Like iPhone 4 */

    #jt-touch-left {
        bottom: 98px;
    }
    #jt-touch-right {
        bottom: 42px;
    }

    html.jt-console-panel-active #jt-touch-left {
        bottom: 106px;
    }
    html.jt-console-panel-active #jt-touch-right {
        bottom: 52px;
    }

    html.jt-full-screen.jt-console-panel-active #jt-touch-speed {
        display: none;
    }

}

`;
};
