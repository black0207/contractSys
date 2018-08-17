/**
 * Created by Arther on 2017/12/1.
 */

var user;
var ieType;

$(document).ready(function() {
	user = getUidByCookie();
    ieType=IEVersion();
    if (ieType == "9" || ieType == "8") {
        ie8_input();
    }else{

    }
        $('.subBtn').click(function () {
            if(JSON.stringify(user)=="{}")
            {
                alert("请先登陆。");
                return;
            }
        var info = $('#feedbackInfo').val();
        var cont = $('#contact').val();
        if (info != "" && cont != "") {
            commit(info,cont);
        }
        else {
            $('.hints_error').show().siblings('p').hide();
        }
    });

});


function check_message(string) {
        var re = /.{301}|^[\s]*$|^[^\u4e00-\u9fa5a-zA-Z0-9_-]+$/;
    if (re.test(string)) {
        return false;
    }
    else {
        return true;
    }
}
function check_address(string) {
    var re = /[\u4e00-\u9fa5a-zA-Z0-9_-]+/;

   // var re = /^[_-A-Za-z0-9]{4,15}$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]{2,5}(\.[a-zA-Z0-9_-]{2,5})+$/;
    if (re.test(string)) {
        return true;
    }
    else {
        return false;
    }
}
var text;
var mlen;
var input = document.getElementById("feedbackInfo");

var ie8_input=function (){

    $("#feedbackInfo").on('blur', function () {
        text = $(this).val();
        mlen = text.length;
        if(mlen>300) {
            $(this).val(text.substring(0, 300));
        //    $('.hints_maxlength').show();
        }
        else{
       //     $('.hints_maxlength').hide();
        }
    });
    $("#feedbackInfo").on('input propertychange', function () {
        text = $(this).val();
        mlen = text.length;
       // if(mlen==300){
      //      input.focus();
      //      return 0;
      //  }
         if(mlen>300) {
               // input.blur();
                //$(this).val(text.substring(0, 300));
            $('.hints_maxlength').show();
        }
        else{
            $('.hints_maxlength').hide();
        }
 });


}
var chrome_input=function(){
    $("#feedbackInfo").on('input propertychange', function () {
        text = $(this).val();
        mlen = text.length;
        if(mlen==300){
            input.focus();
            //e.stopPropagation();
            return;
        }
        else if(mlen>300) {
        //    if (ieType == "9" || ieType == "8") {

                //   if(text.substring(0, 300)==$(this).val())
                //   {
                //       return;
                //    }else{
                //alert("输入内容达上限");
                //        text_flag=text.length;
                //$(this).blur();
                input.blur();
                $(this).val(text.substring(0, 300));
                //  }
      //      }
            $('.hints_maxlength').show();
        }
        else{
            $('.hints_maxlength').hide();
        }
    });
}

var commit =function(info,cont){
    var  massagec=check_message($('#feedbackInfo').val());
    var addc=check_address($("#contact").val());
    if(massagec&&addc) //验证
    {
        var param={};
        param.feedback_text=info;
        param.contact_way=cont;
      //  if(JSON.stringify(user)!="{}"){
        if(user!=undefined)	{
            param.userid=user.id;
        }
        else{
            param.userid="-1";
        }
        $.ajax({
            type: 'POST',

             url: 'http://' + ip + '/caa_v3.0/search/feedbackCondition',
            async: false,
            data: JSON.stringify(param),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                switch (data.resultcode){
                    case "0000":
                        $('.hints_right').show().siblings('p').hide();
                        $('.subBtn').attr('disabled','disabled');
                        var wait = 3;
                        var timer = window.setInterval(function () {
                                wait--;
                                $('.timer').text(wait);
                                if (wait == 0) {
                                    clearInterval(timer);
                                    window.open("index.html", "_self");
                                }
                            }, 1000)
                            ;break;
                    case "0001":break;
                    case "0002":break;
                    case "0003":break;
                    case "0004":break;
                    case "0005":break;
                    case "0006":break;
                    case "0007":break;
                    case "0008":break;
                    case "0009":break;
                    case "0010":break;
                    case "4444":break;
                }

            },
            complete: function (data) {
            },
            error: function () {
                // console.log("反馈失败！");
            }
        });
    }
   else{
        $('.hints_check').show().siblings('p').hide();
    }
};
$('textarea').on('focus', function() {
    $(this).addClass('bgChange');
})
$('textarea').on('blur', function() {
    $(this).removeClass('bgChange');
})


var temp="";
$("body").on("focus","textarea",function () {
    $(this).siblings(".placeholder").hide();
})

    $("body").on("blur",'textarea',function () {
        var v=$(this).val();
        if(temp==v){
            $(this).siblings(".placeholder").show();
        }
    })

$("body").on('click','.placeholder',function () {
    $(this).siblings("textarea").trigger('focus');
});

 $("body").on('click','.closeBtn',function () {
 	$(".login_cont .placeholder").show();
 });
