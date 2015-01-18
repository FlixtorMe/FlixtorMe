var gui = window.require('nw.gui');
var win = gui.Window.get();

// GENERAL KEYS

/* Section switch(movies, series, etc.) (tab) */
Mousetrap.bind('tab', function() {
    if( location.pathname.split('/').slice(-1)[0] == "settings.html" ) {
        $(".menuMovies").click();
    }
    else {
        $(".selected").next().click();
    }
});

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