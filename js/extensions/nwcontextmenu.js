var translations = require('../js/translations.js');
translations.initialize();

var cutLabel = translations.translate('Cut');
var copyLabel = translations.translate('Copy');
var pasteLabel = translations.translate('Paste');

$(function() {
    function Menu(cutLabel, copyLabel, pasteLabel) {
        var gui = require('nw.gui')
            , menu = new gui.Menu()

            , cut = new gui.MenuItem({
                label: cutLabel || "Cut"
                , click: function() {
                    document.execCommand("cut");
                }
            })

            , copy = new gui.MenuItem({
                label: copyLabel || "Copy"
                , click: function() {
                    document.execCommand("copy");
                }
            })

            , paste = new gui.MenuItem({
                label: pasteLabel || "Paste"
                , click: function() {
                    document.execCommand("paste");
                }
            })
            ;

        menu.append(cut);
        menu.append(copy);
        menu.append(paste);

        return menu;
    }

    var menu = new Menu(cutLabel, copyLabel, pasteLabel);
    $(document).on("contextmenu", function(e) {
        e.preventDefault();
        menu.popup(e.originalEvent.x, e.originalEvent.y);
    });
});