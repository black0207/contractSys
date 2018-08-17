$(document).ready(function () {
    $(".navs dl dd").click(function () {
        $(this).addClass('current').siblings('dd').removeClass('current');
        var index=$(this).index();
        //console.log(index)
        $(".answers").eq(index-1).removeClass('hide').siblings('.answers').addClass('hide');
        // console.log($(".answers").eq(index))
    });

});