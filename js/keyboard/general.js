var gui = window.require('nw.gui');
var win = gui.Window.get();

// GENERAL KEYS
Mousetrap.bind('esc', function() {
    win.close();
});

Mousetrap.bind('f', function() {
    if (win.isFullscreen) {
        win.leaveFullscreen();
    } else {
        win.enterFullscreen();
    }
    win.focus();
});

Mousetrap.bind('f12', function() {
    win.showDevTools();
});