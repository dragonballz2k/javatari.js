// Copyright 2015 by Paulo Augusto Peccin. See license.txt distributed with this file.

function Settings() {
    var self = this;

    this.show = function (page) {
        if (!this.panel) {
            create(this);
            setTimeout(function() {
                self.show(page);
            }, 0);
            return;
        }
        preferencesChanged = false;
        controlRedefining = null;
        refreshData();
        if (page) this.setPage(page);
        this["cover"].classList.add("show");
        this["modal"].classList.add("show");
        this.panel.focus();
    };

    this.hide = function () {
        if (preferencesChanged) finishPreferences();
        this["modal"].classList.remove("show");
        this["cover"].classList.remove("show");
        Javatari.room.screen.focus();
    };

    self.setPage = function (page) {
        var contentPosition = {
            "HELP": "0",
            "CONTROLS": "-560px",
            "ABOUT": "-1120px"
        }[page];
        var selectionPosition = {
            "HELP": "0",
            "CONTROLS": "33.3%",
            "ABOUT": "66.6%"
        }[page];

        if (contentPosition) self["content"].style.left = contentPosition;
        if (selectionPosition) self["menu-selection"].style.left = selectionPosition;

        self["menu-help"].classList[page === "HELP" ? "add" : "remove"]("selected");
        self["menu-controls"].classList[page === "CONTROLS" ? "add" : "remove"]("selected");
        self["menu-about"].classList[page === "ABOUT" ? "add" : "remove"]("selected");
    };

    var create = function () {
        var styles = document.createElement('style');
        styles.type = 'text/css';
        styles.innerHTML = Settings.css();
        document.head.appendChild(styles);

        self.panel = document.createElement("div");
        self.panel.innerHTML = Settings.html();
        self.panel.style.outline = "none";
        self.panel.tabIndex = -1;
        document.body.appendChild(self.panel);

        delete Settings.html;
        delete Settings.css;

        setFields();
        setEvents();
    };

    // Automatic set fields for each child element that has the "id" attribute
    var setFields = function () {
        traverseDOM(self.panel, function (element) {
            if (element.id) self[element.id] = element;
        });

        function traverseDOM(element, func) {
            func(element);
            var child = element.childNodes;
            for (var i = 0; i < child.length; i++) {
                traverseDOM(child[i], func);
            }
        }
    };

    var setEvents = function () {
        // Close the modal with a click outside
        self.panel.addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.hide();
        });
        // But do not close the modal with a click inside
        self["modal"].addEventListener("mousedown", function (e) {
            e.stopPropagation();
            keyRedefinitonStop();
        });
        // Close with the back button
        self["back"].addEventListener("mousedown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.hide();
        });

        // Several key events
        self.panel.addEventListener("keydown", function (e) {
            e.preventDefault();
            e.stopPropagation();
            processKeyEvent(e);
        });

        // Tabs
        self["menu-help"].addEventListener("mousedown", function (e) {
            e.preventDefault();
            self.setPage("HELP");
        });
        self["menu-controls"].addEventListener("mousedown", function (e) {
            e.preventDefault();
            self.setPage("CONTROLS");
        });
        self["menu-about"].addEventListener("mousedown", function (e) {
            e.preventDefault();
            self.setPage("ABOUT");
        });

        // Double click for key redefinition
        for (var control in controlKeys) {
            (function(localControl) {
                self[localControl].addEventListener("mousedown", function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    reyRedefinitionStart(localControl);
                });
            })(control);
        }

        // Controls Actions
        self["controls-defaults"].addEventListener("mousedown", function (e) {
            e.preventDefault();
            controlsDefaults();
        });
        self["controls-revert"].addEventListener("mousedown", function (e) {
            e.preventDefault();
            controlsRevert();
        });

        // Generic Console Controls Commands
        for (var key in controlsCommandKeys) {
            (function(keyLocal) {
                self[controlsCommandKeys[key]].addEventListener("mousedown", function (e) {
                    e.preventDefault();
                    Javatari.room.controls.processKeyEvent(keyLocal, true, DOMConsoleControls.KEY_ALT_MASK);
                    keyRedefinitonStop();   // will refresh
                });
            })(key | 0);    // must be a number to simulate a keyCode
        }
    };

    var refreshData = function () {
        self["browserinfo"].innerHTML = navigator.userAgent;

        if (Javatari.room.controls.isPaddleMode()) {
            self["control-p1-controller"].style.backgroundPositionY = "-91px";
            self["control-p2-controller"].style.backgroundPositionY = "-91px";
            self["control-p1-up-label"].innerHTML = self["control-p2-up-label"].innerHTML = "+ Speed";
            self["control-p1-down-label"].innerHTML = self["control-p2-down-label"].innerHTML = "- Speed";
        } else {
            self["control-p1-controller"].style.backgroundPositionY = "0";
            self["control-p2-controller"].style.backgroundPositionY = "0";
            self["control-p1-up-label"].innerHTML = self["control-p2-up-label"].innerHTML = "Up";
            self["control-p1-down-label"].innerHTML = self["control-p2-down-label"].innerHTML = "Down";

        }
        var swapped = Javatari.room.controls.isP1ControlsMode();
        self["control-p1-label"].innerHTML = "Player " + (swapped ? "2" : "1");
        self["control-p2-label"].innerHTML = "Player " + (swapped ? "1" : "2");

        for (var control in controlKeys) {
            if (control === controlRedefining) {
                self[control].classList.add("redefining");
                self[control].innerHTML = "?";
            } else {
                self[control].classList.remove("redefining");
                self[control].innerHTML = KeyNames[Javatari.preferences[controlKeys[control]]];
            }
        }
    };

    var processKeyEvent = function (e) {
        if (e.keyCode === KEY_ESC)
            closeOrKeyRedefinitionStop();
        else if(controlRedefining) keyRedefinitionTry(e.keyCode);
        else {
            if (e.altKey && controlsCommandKeys[e.keyCode]) {
                Javatari.room.controls.filteredKeyPressed(e);
                refreshData();
            }
        }
    };

    var reyRedefinitionStart = function(control) {
        controlRedefining = control;
        refreshData();
    };

    var keyRedefinitonStop = function() {
        controlRedefining = null;
        refreshData();
    };

    var keyRedefinitionTry = function (keyCode) {
        if (!controlRedefining) return;
        if (!KeyNames[keyCode]) return;
        preferencesChanged = true;
        Javatari.preferences[controlKeys[controlRedefining]] = keyCode;
        keyRedefinitonStop();
    };

    var closeOrKeyRedefinitionStop = function() {
        if (controlRedefining) keyRedefinitonStop();
        else self.hide()
    };

    var controlsDefaults = function () {
        Javatari.preferencesSetDefaults();
        preferencesChanged = true;
        keyRedefinitonStop();   // will refresh
    };

    var controlsRevert = function () {
        Javatari.preferencesLoad();
        preferencesChanged = false;
        keyRedefinitonStop();   // will refresh
    };

    var finishPreferences = function () {
        Javatari.room.controls.applyPreferences();
        Javatari.preferencesSave();
        preferencesChanged = false;
    };

    var controlKeys = {
        "control-p1-button1": "KP0BUT",
        "control-p1-button2": "KP0BUT2",
        "control-p1-up": "KP0UP",
        "control-p1-left": "KP0LEFT",
        "control-p1-right": "KP0RIGHT",
        "control-p1-down": "KP0DOWN",
        "control-p2-button1": "KP1BUT",
        "control-p2-button2": "KP1BUT2",
        "control-p2-up": "KP1UP",
        "control-p2-left": "KP1LEFT",
        "control-p2-right": "KP1RIGHT",
        "control-p2-down": "KP1DOWN"
    };

    var controlRedefining = null;

    var controlsCommandKeys = {};
        controlsCommandKeys[DOMConsoleControls.KEY_TOGGLE_P1_MODE] = "controls-swap-keys";
        controlsCommandKeys[DOMConsoleControls.KEY_TOGGLE_JOYSTICK] = "controls-swap-gamepads";
        controlsCommandKeys[DOMConsoleControls.KEY_TOGGLE_PADDLE] = "controls-toggle-paddles";

    var preferencesChanged = false;

    var KEY_ESC = 27;        // VK_ESC

}

