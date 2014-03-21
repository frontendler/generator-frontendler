$(document).ready(function() {
    //higlightjs
    $('pre code').each(function(i, e) {
        hljs.highlightBlock(e);
    });
    //select
    $(".select select-btn").find("span.text").text($(".select select").find(":selected").text());
    $(".select select").change(function() {
        var a = $(this).closest(".select").find(".select-btn");
        a.find("span.text").text($(this).find(":selected").text());
    });
    //note
    $(".close-btn").click(function() {
        $(this).closest(".note.close").slideUp("fast");
    });
    //switch
    $(".switch").click(function() {
        $(this).toggleClass("on");
        $(this).toggleClass("off");
    });
    //sidebar
    $('.sidebar .tree .group .title').click(function (){
        $(this).closest('.group').toggleClass('open');
        $(this).next('.itens').slideToggle();
    });

    $('.top .bt-menu').click(function (){
        $('.sidebar').slideToggle();
    });


});
