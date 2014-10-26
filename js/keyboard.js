Mousetrap.bind('backspace', function() {
    if(window.sessionStorage.history) {
        var  historyList = JSON.parse(window.sessionStorage.history);

        if(historyList.length > 0) {
            window.location = historyList[(historyList.length - 1)];
            var index = historyList.indexOf(historyList.length - 1);
            historyList.splice(index, 1);
            window.sessionStorage.history = JSON.stringify(historyList);
        }
    }
});

Mousetrap.bind('return', function() {
});


