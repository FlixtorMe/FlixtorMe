var gui = window.require('nw.gui');
var win = gui.Window.get();

// GENERAL KEYS

/* Close app (esc) */
Mousetrap.bind('esc', function() {
    win.close();
});

/* Fullscreen switch (f) */
Mousetrap.bind('f', function() {
    if (win.isFullscreen) {
        win.leaveFullscreen();
    } else {
        win.enterFullscreen();
    }
    win.focus();
});

/* Open dev tools (f12) */
Mousetrap.bind('f12', function() {
    win.showDevTools();
});