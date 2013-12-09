function centerDashGraphic() {
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var graphicHeight = $('#dashGraphic').height();
    var graphicWidth = $('#dashGraphic').width();
    $('#dashGraphic')
        .css('top', windowHeight/2 - graphicHeight/2 + 130*(graphicHeight - windowHeight)/graphicHeight)
        .css('left', windowWidth/2 - graphicWidth/2 - 110*(graphicWidth-windowWidth)/graphicWidth);
}

$(window).resize(centerDashGraphic);

centerDashGraphic();