function closeMovieDetail()
{
    try{
        var subManager = yifysubtitle.getSubManager();
        if( subManager ) {
            subManager.server.listen(0);
            subManager.server.close();
        }
    }
    catch(e){
        console.log(e);
    }

    $("#customCSS").stop();
    $("#customCSS").removeAttr('style');
    $("#customCSS").empty();
    $("#content-overlay").hide();
    $("#movie").hide();
    $("#content").css("opacity", "1");
    $("#head-bar").show();
    $( "#btnBuy").unbind( "click" );
}

function closeTrailerOverlay()
{
    $("#video-container-trailer").empty();
    $("#content-overlay").show();
    $(".top-titlebar-back-button").attr("onclick","closeMovieDetail()");
}

$(document).on('mouseover','a.shadow',function(){
    $(".on").removeClass("on");
    $(this).addClass("on");
});
