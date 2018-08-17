var token = '';
// var verifyCode = new GVerify("idcode");//页面加载时生成验证码
function getUserInfoByCookie() {
    if ($.cookie('USERINFO')=='null') {
        // console.log('为空')
    }else if($.cookie('USERINFO')==undefined){
        // console.log('为空');
    }else{
        return JSON.parse($.cookie('USERINFO'));
    }
}
getUserInfoByCookie();
var userInfo=getUserInfoByCookie()==undefined?'':getUserInfoByCookie();
var username=userInfo.username;
var userid=userInfo.id;
var court=userInfo.court;
var telephone=userInfo.telephone;
var realname=userInfo.realname;
$(document).ready(function () {
    getAllCourt();
    if(!userid){
        window.location.href = '../jsp/index.html';
    }
})
//
// //用户名
var p = '<p>' + username + '</p>';
$(".userName").html(p);
$(".familyName").text(realname)
$(".court").text(court)
$(".phone").text(telephone)
//点击修改


$(".amendBtn").click(function () {
    if ($(this).parents('li').next(".hide_box").hasClass("hide")) {
        // $(this).parents('li').next(".hide_box").;
        $(this).parents('li').next(".hide_box").removeClass("hide").slideDown(300);
    } else {
        // $(this).parents('li').next(".hide_box");
        $(this).parents('li').next(".hide_box").addClass("hide").slideUp(300);
    }

});
/********************************修改密码*****************************************/
//修改密码
// $(document).ready(function () {
//比较原密码
$("#originalPwd").blur(function () {
    $(this).parent().removeClass('passing_border');
    checkOriginalPwd();
});

//新密码
$("#newPwd").blur(function () {
    $(this).parent().removeClass('passing_border');
    checkNewpwd();
});
//再次输入密码
$("#newPwd2").blur(function () {
    $(this).parent().removeClass('passing_border');
    confrimPwd();
});
// console.log(username)
//点击确定/密码
$(".pwdOkBtn").click(function () {
    $('#originalPwd').trigger('blur');
    $('#newPwd').trigger('blur');
    $('#newPwd2').trigger('blur');
    if ($('.warning_border').length > 0) {
        // alert(1)
        return false;

    }
    jQuery.support.cors = true;
    $.ajax({
        type: 'POST',
        url:  'http://' + ip + '/caa_v3.0/search/getAccessToken?username=' + username,
        success: function (res) {
            token = res.access_token;
            var originalPwd = $("#originalPwd").val();
            var newPwd = $("#newPwd").val();
            var url = 'http://' + ip + '/caa_v3.0/search/changePassword';
            var obj = {'username': username, 'password': md5(newPwd), 'oldpassword': md5(token + md5(originalPwd))};
            jQuery.support.cors = true;
            $.ajax({
                type: "post",
                url: url,
                data: JSON.stringify(obj),
                dataType: 'json',
                contentType: 'application/json',
                success: function (data) {
                    // console.log(data);
                    if (data.resultcode == '0000') {
                        $("#originalPwd").val('');
                        $('#originalPwd').next("i").hide();
                        $("#newPwd").val('');
                        $('#newPwd').next("i").hide();
                        $("#newPwd2").val('');
                        $('#newPwd2').next("i").hide();
                        $(".hide_box_changePwd").addClass("hide").slideUp(300);
                        alert("修改密码成功！");
                        return true;
                    }
                        else if(data.resultcode == '0009'){
                            $("#originalPwd").val('');
                        $('#originalPwd').next("i").hide();
                        $('#originalPwd').parent().siblings('.hints').show().find('span').text('原密码输入错误！');
                        $('#originalPwd').parent().addClass('warning_border')
                        $("#newPwd").val('');
                        $('#newPwd').next("i").hide();
                        $("#newPwd2").val('');
                        $('#newPwd2').next("i").hide();
                        return false;
                    }
                    else if(data.resultcode == '0011'){
                        $("#originalPwd").val('');
                        $('#originalPwd').next("i").hide();
                        $('#newPwd').parent().siblings('.hints').show().find('span').text('新密码不能与原密码一致！');
                        $('#newPwd').parent().addClass('warning_border');
                        $("#newPwd").val('');
                        $('#newPwd').next("i").hide();
                        $("#newPwd2").val('');
                        $('#newPwd2').next("i").hide();
                        return false;

                    }
                    if (data.resultcode === '0005') {
                        alert('数据库异常，修改密码失败！')
                    }
                },
                error: function (error) {
                    // console.log(error);
                }
            });

        },
        error: function (error) {
            // console.log(error);
        }
    })


});


//输入新手机
$('#newPhone').blur(function () {
    checkPhone();
});

$(".telOkBtn").click(function () {
    // var flag=true;
    $('#newPhone').trigger('blur');
    $('#Txtidcode').trigger('blur');
    $('#codePhone').trigger('blur');

    if ($('.warning_border').length > 0) {
        // alert(1);
        return false;
    } else {
        doCompare();

    }

    // }
    // doCompare();
});

//图形验证码
$("#Txtidcode").blur(function () {
    checkImgCode();
});


//手机验证码
$("#codePhone").blur(function () {
    checkPhoneCode();
});
//点击取消
$(".cancelBtn").click(function () {
    $(this).parents(".hide_box").find('.change_item').removeClass('warning_border');
    $(this).parents(".hide_box").find('.change_item').find('input').val('');
    $(this).parents(".hide_box").find(".hints").hide();
    $(this).parents(".hide_box").find(".i_status").hide();
    $(this).parents(".hide_box").addClass("hide").slideUp(300);
    $(this).parents(".hide_box").find('.placeholder').show();
//    var brotype = myBrowser();
//    if ( brotype == "IE8" || brotype == "IE9") {
//    	$(this).parents(".hide_box").find('.placeholder').show();
//    }
    
});

//检验原密码
function checkOriginalPwd() {
    // var patrn = /^(?![0-9]+$)[A-z0-9]{8,20}$/;
    // var patrn2 = /^(?![A-z]+$)[A-z0-9]{8,20}$/;
    // var reg=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$){8,20}$/i;
    //var reg=/(?!^(\d+|[a-zA-Z]+|[`\-_|~!@#$%^&*()+=[\]{};:'"<,>.?]+)$)^[\w`\-_|~!@#$%^&*()+=[\]{};:'"<,>.?]+$/i;
	var reg = /^[a-zA-Z0-9`\-_|~!@#$%^&*()+=[\]{};:'"<,>.?]{8,20}$/
    var reg2=/^\S+$/;
    // var reg3=/{8,20}$/;
    var originalPwd = $("#originalPwd").val();
    if (originalPwd == '') {
        $('#originalPwd').parent().siblings('.hints').find('span').text('原密码不能为空');
        $('#originalPwd').next("i").hide();
        $('#originalPwd').parent().siblings('.hints').show();
        $('#originalPwd').parent().addClass('warning_border');
        // $('#originalPwd').val('');
        return false;
    }else if(!reg2.test(originalPwd)){
        $('#originalPwd').parent().siblings('.hints').find('span').text('含有非法字符，请重新输入');
        $('#originalPwd').next("i").hide();
        $('#originalPwd').parent().siblings('.hints').show();
        $('#originalPwd').parent().addClass('warning_border');
        // $('#originalPwd').val('');
        return false;

    }
    else if (!reg.test(originalPwd)||originalPwd.length<8||originalPwd.length>20) {
        //$('#originalPwd').parent().siblings('.hints').find('span').text('字母、数字、符号两种及以上组合，8-20字符');
    	$('#originalPwd').parent().siblings('.hints').find('span').text('字母、数字、符号，8-20字符');
    	$('#originalPwd').next("i").hide();
        $('#originalPwd').parent().siblings('.hints').show();
        $('#originalPwd').parent().addClass('warning_border');
        // $('#originalPwd').val('');
        return false;
    }
    else {
        $('#originalPwd').next("i").show();
        $('#originalPwd').parent().siblings('.hints').hide();
        $('#originalPwd').parent().removeClass('warning_border');
        return true;
    }
}

//校验新密码
function checkNewpwd() {
    var newPwd=$("#newPwd").val();
        // var patrn = /^(?![0-9]+$)[A-z0-9]{8,20}$/;
    // var patrn2 = /^(?![A-z]+$)[A-z0-9]{8,20}$/;
    // var reg=/(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$){8,20}$/i;
    var reg=/(?!^(\d+|[a-zA-Z]+|[`\-_|~!@#$%^&*()+=[\]{};:'"<,>.?]+)$)^[\w`\-_|~!@#$%^&*()+=[\]{};:'"<,>.?]+$/i;
    var reg2=/^\S+$/;
    if (newPwd == '' || newPwd == null) {
        $('#newPwd').parent().siblings('.hints').find('span').text('密码不能为空');
        $('#newPwd').next("i").hide();
        $('#newPwd').parent().siblings('.hints').show();
        $('#newPwd').parent().addClass('warning_border');
        // $('#newPwd').val('');
        return false;

    }
    else if (!reg2.test(newPwd)){
    // else if (!patrn.test(newPwd)||!patrn2.test(newPwd)){
        $('#newPwd').parent().siblings('.hints').find('span').text('含有非法字符，请重新输入');          $('#newPwd').next("i").hide();
        $('#newPwd').parent().siblings('.hints').show();
        $('#newPwd').parent().addClass('warning_border');
        // $('#newPwd').val('');
        return false;

    }else if(!reg.test(newPwd) ||newPwd.length<8||newPwd.length>20){
        $('#newPwd').parent().siblings('.hints').find('span').text(' 字母、数字、符号两种及以上组合，8-20字符');
        $('#newPwd').next("i").hide();
        $('#newPwd').parent().siblings('.hints').show();
        $('#newPwd').parent().addClass('warning_border');
        // $('#newPwd').val('');
        return false;

    } else {
        $('#newPwd').next("i").show();
        $('#newPwd').parent().siblings('.hints').hide();
        $('#newPwd').parent().removeClass('warning_border');
        return true;
    }

}

//确认密码
function confrimPwd() {
    var newPwd = $("#newPwd").val();
    var newPwd2 = $("#newPwd2").val();
    if (newPwd2 == '' || newPwd2 == null) {
        $('#newPwd2').parent().siblings('.hints').find('span').text('密码不能为空，请再次输入密码');
        $('#newPwd2').next("i").hide();
        $('#newPwd2').parent().siblings('.hints').show();
        $('#newPwd2').parent().addClass('warning_border');
        // $('#newPwd2').val('');
        return false;

    } else if (newPwd2 != newPwd) {
        $('#newPwd2').parent().siblings('.hints').find('span').text('两次密码输入不一致');
        $('#newPwd2').next("i").hide();
        $('#newPwd2').parent().siblings('.hints').show();
        $('#newPwd2').parent().addClass('warning_border');
        // $('#newPwd2').val('');
        return false;

    } else {
        $('#newPwd2').next("i").show();
        $('#newPwd2').parent().siblings('.hints').hide();
        $('#newPwd2').parent().removeClass('warning_border');
        return true;
    }

}

//输入新手机号码
function checkPhone() {
    var oldPhone = $(".phone").text();
    var newPhone = $("#newPhone").val();
    var reg = /^1[3|5|7|8][0-9]\d{8}$/;
    if (newPhone == oldPhone) {
        $("#newPhone").parent().siblings('.hints').find('span').text('新手机号码不能与原号码一致');
        $("#newPhone").next("i").hide();
        $("#newPhone").parent().siblings('.hints').show();
        $("#newPhone").parent().addClass('warning_border');
        $("#newPhone").val('');
        return false;
    }
    else if (newPhone == '' || newPhone == null) {
        $("#newPhone").parent().siblings('.hints').find('span').text('手机号码不能为空');
        $("#newPhone").next("i").hide();
        $("#newPhone").parent().siblings('.hints').show();
        $("#newPhone").parent().addClass('warning_border');
        $("#newPhone").val('');
        return false;

    } else if (!reg.test(newPhone)) {
        $("#newPhone").parent().siblings('.hints').find('span').text('格式有误,请输入正确手机号');
        $("#newPhone").next("i").hide();
        $("#newPhone").parent().siblings('.hints').show();
        $("#newPhone").parent().addClass('warning_border');
        $("#newPhone").val('');
        return false;
    } else {
        var url = '',
            obj = {
                newPhone: newPhone
            };
        jQuery.support.cors = true;
        $.ajax({
            type: 'post',
            url: url,
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json',
            success: function (data) {
                if (data == 'true') {
                    $("#newPhone").parent().siblings('.hints').find('span').text('该手机号已被注册');
                    $("#newPhone").next("i").hide();
                    $("#newPhone").parent().siblings('.hints').show();
                    $("#newPhone").parent().addClass('warning_border');
                    $("#newPhone").val('');
                    return false;

                } else {
                    $("#newPhone").next("i").show();
                    $("#newPhone").parent().siblings('.hints').hide();
                    $("#newPhone").parent().removeClass('warning_border');
                    return true;
                }
            }
        });
    }
}


//图形验证码
function changeImg() {
    var imgSrc = $("#imgObj");
    var src = imgSrc.attr("src");
    imgSrc.attr("src", chgUrl(src));
}

// 时间戳
// 为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
function chgUrl(url) {
    var timestamp = (new Date()).valueOf();
    if ((url.indexOf("&") >= 0)) {
        url = url + "×tamp=" + timestamp;
    } else {
        url = url + "?timestamp=" + timestamp;
    }
    return url;
}

//图形验证码非空验证、
function checkImgCode() {
    var textCode = $("#Txtidcode").val(),
        reg = /^([a-z]|[A-Z]|[0-9]){4}$/;

    if (textCode == '' || textCode == null) {
        $("#Txtidcode").parent().siblings('.hints').show().find('span').text("请输入正确的验证码");
        $("#Txtidcode").parent().addClass('warning_border');
        $("#Txtidcode").val('');
        return false;
    } else if (!reg.test(textCode)) {

    }
    else {
        $("#Txtidcode").parent().siblings('.hints').hide()
        $("#Txtidcode").parent().removeClass('warning_border');
        return true;
    }
}

//手机验证码非空验证
function checkPhoneCode() {
    var reg = /^\d{6}/,
        phoneCode = $("#codePhone").val();
    if (phoneCode == '' || phoneCode == null || !reg.test(phoneCode)) {
        $("#codePhone").parent().siblings('.hints').show().find('span').text("请输入正确的验证码");
        $("#codePhone").parent().addClass('warning_border');
        $("#codePhone").val('');
        return false;
    } else {
        $("#codePhone").parent().siblings('.hints').hide()
        $("#codePhone").parent().removeClass('warning_border');
        $(".telOkBtn").addClass('btnsBlue');
        return true;
    }
}

//点击获取手机验证码
var InterValObj; //timer变量，控制时间
var count = 120; //间隔函数，1秒执行
var curCount;//当前剩余秒数

$("#getPhoneCode").click(function () {
    $("#newPhone").trigger('blur');
    var url = 'http://' + ip + '/caa_v3.0/search/sendSMSVerifyCode';//发送验证码地址
    var obj = {"telephone": $("#newPhone").val()};
    // {"telephone":"15345190663"}
    jQuery.support.cors = true;
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: 'application/json',
        beforeSend: function () {
            if ($("#newPhone").val() == '') {
                return false;
            } else {
                curCount = count;
                // 设置button效果，开始计时
                $('#getPhoneCode').css("background", "#999");
                $(this).attr("disabled", "true");//设置按钮为禁用状态
                $(this).val(curCount + "s后重新获取");//更改按钮文字
                InterValObj = window.setInterval(SetRemainTime, 1000);

            }

        },
        success: function (data) {
            // console.log(data);
            // console.log(1);
            if (data.result == 'fail') {
                if (data.errorMessage == '短信验证码发送失败！') {//短信验证校验失败
                    $("#codePhone").parent().siblings('.hints').show().find('span').text("短信验证码发送失败！");
                    $("#codePhone").parent().addClass('warning_border');
                    $("#codePhone").val('');
                    return false;
                }
                else if (data.errorMessage == '短信验证码发送失败！') {//图形验证码校验失败
                    $("#Txtidcode").parent().siblings('.hints').show().find('span').text("图形验证码错误！");
                    $("#Txtidcode").parent().addClass('warning_border');
                    $("#Txtidcode").val('');
                    return false;

                }
            }
            else {
                $("#getPhoneCode").val("获取验证码");
                $("#codePhone").parent().removeClass('warning_border');
                $("#codePhone").parent().siblings('.hints').hide();
                // $("#codePhone").val('');
                $("#Txtidcode").parent().siblings('.hints').hide();
                $("#Txtidcode").parent().removeClass('warning_border');
                // $("#Txtidcode").val('');
                // $(".phone").attr("text",$("#newPhone").val());
            }


        },
        error: function (error) {
            // console.log(error);
        }

    });


});

//timer处理函数
function SetRemainTime() {
    if (curCount == 0) {
        window.clearInterval(InterValObj);// 停止计时器
        $("#getPhoneCode").attr("disabled");//移除禁用状态改为可用
        $("#getPhoneCode").css("background", "#6094cd");
        $("#getPhoneCode").val("重新获取");
    } else {
        curCount--;
        $("#getPhoneCode").val(curCount + "s后再次获取");
    }
}

//验证输入的验证码

function doCompare() {
    var url = 'http://192.168.10.111:8083/caa_v3.0/search/checkVerifyCode';
    var imgCode = $("#Txtidcode").val();
    var codePhone = $("#codePhone").val();
    var obj = {"imgVerifyCode": imgCode, "smsVerifyCode": codePhone};
    jQuery.support.cors = true;
    $.ajax({
        type: "POST",
        dataType: "json",
        url: url, // 目标地址
        data: JSON.stringify(obj),
        contentType: 'application/json',
        success: function (data) {
            // console.log(data);


        },
        error: function (error) {
            // console.log(error);
        }
    });
    // alert(1);
}

$('.exit').on('click', function() {
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/logout?username=' + username,
        success: function(res) {
            if (res.resultcode == '0000') { //退出成功
                $('.login').show();
                $('.curUser span').text("当前用户");
                $('#currentUser').hide();

                $.cookie('USERINFO', null, {
                    path: '/',
                    expires: 0 //过期时间365天
                }); //退出并清除用户信息

                window.location.href = '../jsp/index.html';
            }
        },
        error: function(error) {
            // console.log(error)
        }
    })
})

//文本框获取焦点
$('.hide_box .field').on('focus', function() {
    $(this).parent().removeClass('warning_border');
    $(this).parent().addClass('passing_border');
})

String.prototype.trim = function () {
    return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}



var temp="";
$("body").on("focus","input",function () {
    $(this).siblings(".placeholder").hide();
})

    $("body").on("blur",'input',function () {
        var v=$(this).val();
        if(temp==v){
            $(this).siblings(".placeholder").show();
        }
    })

$("body").on('click','.placeholder',function () {
    $(this).siblings("input").trigger('focus');
});

 $("body").on('click','.closeBtn',function () {
 	$(".login_cont .placeholder").show();
 });

 //修改法院
$("#court .amendBtn").click(function () {
    $(this).parents(".showBox").addClass("hide");
    $(this).parents(".showBox").siblings(".amendBox").removeClass("hide");
    $(".i_status").hide();
    if(!isEmpty($(".court").text())){
        $(this).parents(".showBox").siblings(".amendBox").find(".amendIpt").attr("value",$(".court").text())
    }else{
        $(this).parents(".showBox").siblings(".amendBox").find(".placeholder").show()
    }
});
//点击修改法院结束
//修改所在法院失去焦点判断格式是否正确
$("#court .amendIpt").on("input propertychange",function (e) {
    var court=$("#court .amendIpt").val();
    if(!court){
        $('#court_dropdown_wrapper').stop().slideUp(300);
        return;
    }
    court_drop($("#court .amendIpt").val());
});
$('#court .amendIpt').blur(function() {
    var court=$("#court .amendIpt").val();
    if(isEmpty(court)){
        $(this).parent(".iptBox").removeClass('passing_border').addClass('warning_border');
        $(this).parents(".amendBox").siblings(".hintsAmend").show();
        $(this).siblings("i").hide()
        $(this).parents(".amendBox").siblings(".hintsAmend").find("span").text("法院不能为空");
    }else if(court.length>30){
        $(this).parent(".iptBox").removeClass('passing_border').addClass('warning_border');
        $(this).parents(".amendBox").siblings(".hintsAmend").show();
        $(this).siblings("i").hide()
        $(this).parents(".amendBox").siblings(".hintsAmend").find("span").text("最多输入30个字");

    }

});

//点击修改所在法院确定，判断是否修改成功
$("#court .sureSpan").click(function () {
    $("#court .amendIpt").trigger("blur");
    if ($('#court .warning_border').length > 0) {
        return false;
    }else{
        $("#court_dropdown_wrapper").hide();
        var val=$("#court .amendIpt").val()
        var obj={
            "username":username,
            "court":val,
            "type":"court"
        };
        // var _this=$(this);
        jQuery.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://' + ip + '/caa_v3.0/search/changeUserInfo',
            data:JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json',
            success: function (res) {
                // console.log(res)
                if(res.resultcode == '0000') {
                    $(".i_status ").hide();
                    $("#court").find(".amendBox").addClass('hide');
                    $("#court").find(".amendBox").siblings(".showBox").removeClass('hide');
                    $(".court").text(val)
                    userInfo.court=val
                    $.cookie("USERINFO", JSON.stringify(userInfo), {
                        path: '/',
                        expires: 365 //过期时间365天
                    })
                }else{
                    alert("修改法院失败")
                }
            }
        })
    }




});


//修改姓名
$("#familyName .amendBtn").click(function () {
    $(this).parents(".showBox").addClass("hide");
    $(this).parents(".showBox").siblings(".amendBox").removeClass("hide");
    $(".i_status").hide();
    if(!isEmpty($(".familyName").text())){
        $(this).parents(".showBox").siblings(".amendBox").find(".amendIpt").attr("value",$(".familyName").text())
    }else{
        $(this).parents(".showBox").siblings(".amendBox").find(".placeholder").show()
    }
});
//点击修改姓名结束

//修改姓名失去焦点判断格式是否正确
$("#familyName .amendIpt").blur(function () {
    var familyName=$("#familyName .amendIpt").val();
    //姓名正则
    var reg = /^[a-zA-Z\0-9\u4e00-\u9fa5]{2,10}$/;
    if(familyName){
        if(!reg.test(familyName)){
            $(this).parent(".iptBox").removeClass('passing_border').addClass('warning_border');
            $(this).parents(".amendBox").siblings(".hintsAmend").show();
            $(this).siblings("i").hide()
            $(this).parents(".amendBox").siblings(".hintsAmend").find("span").text("请输入真实姓名,2-10字符");
        }
    }
});
//点击修改姓名确定，判断是否修改成功
$("#familyName .sureSpan").click(function () {
    $("#familyName .amendIpt").trigger("blur")
    if ($('#familyName .warning_border').length > 0) {
        return false;
    }else{
        var realname=$("#familyName .amendIpt").val();
            var obj={
                "username":username,
                "realname":realname,
                "type":"realname"
            };
        var _this=$(this);
        jQuery.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://' + ip + '/caa_v3.0/search/changeUserInfo',
            data:JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json',
            success: function (res) {
                // console.log(res)
                if(res.resultcode == '0000') {

                    $(".i_status ").hide();
                    _this.parents(".amendBox").siblings(".showBox").removeClass('hide');
                    _this.parents(".amendBox").addClass('hide');
                    $(".familyName").text(realname);
                    userInfo.realname=realname
                    $.cookie("USERINFO", JSON.stringify(userInfo), {
                        path: '/',
                        expires: 365 //过期时间365天
                    })
                }else{
                    alert("修改姓名失败")

                }
            }
        })
    }
})

//修改手机号码
$("#phone .amendBtn").click(function () {
    $(this).parents(".showBox").addClass("hide");
    $(this).parents(".showBox").siblings(".amendBox").removeClass("hide");
    $(".i_status").hide();
    if(!isEmpty($(".phone").text())){
        $(this).parents(".showBox").siblings(".amendBox").find(".amendIpt").attr("value",$(".phone").text())
    }else{
        $(this).parents(".showBox").siblings(".amendBox").find(".placeholder").show()
    }
});
//修改手机失去焦点判断格式是否正确
$("#phone .amendIpt").blur(function () {
    $(this).parent(".iptBox").addClass('passing_border').removeClass('warning_border');
    var phone=$("#phone .amendIpt").val();
    //手机正则
    var reg = /^[1][3-9][0-9]{9,9}$/;
    if(phone){
        if(!reg.test(phone)){
            $(this).parent(".iptBox").removeClass('passing_border').addClass('warning_border');
            $(this).parents(".amendBox").siblings(".hintsAmend").show();
            $(this).siblings("i").hide()
            $(this).parents(".amendBox").siblings(".hintsAmend").find("span").text("请输入正确手机号码");
        }
    }

});
//点击修改手机确定，判断是否修改成功
$("#phone .sureSpan").click(function () {
    $("#phone .amendIpt").trigger("blur")
    if ($('#phone .warning_border').length > 0) {
        return false;
    }else{
        var telephone=$("#phone .amendIpt").val();
            var obj={
                "username":username,
                "telephone":telephone,
                "type":"telephone"
            };
        var _this=$(this);
        jQuery.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://' + ip + '/caa_v3.0/search/changeUserInfo',
            data:JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json',
            success: function (res) {
                if(res.resultcode == '0000') {
                    $(".i_status ").hide();
                    _this.parents(".amendBox").siblings(".showBox").removeClass('hide');
                    _this.parents(".amendBox").addClass('hide');
                    $(".phone").text(telephone)
                    userInfo.telephone=telephone;
                    $.cookie("USERINFO", JSON.stringify(userInfo), {
                        path: '/',
                        expires: 365 //过期时间365天
                    })
                }else{
                    alert("修改手机号码失败")
                }


            }
        })

    }

})
//点击修改手机结束

//输入框获取焦点样式
$(".amendIpt").focus(function () {
    $(this).parent(".iptBox").removeClass('warning_border').addClass('passing_border');
    $(this).parents(".amendBox").siblings(".hintsAmend").hide();
});

//判断是否为空
function isEmpty(str) {
    if (str == null || typeof str == "undefined" || str == "" || str == "{ }") {
        return true;
    }
    return false;
}
var isOK_obj = {
    'court_isOK': false
    // 'Txtidcode_isOK': false
};

var all_court=[];
// 获取所有法院
function getAllCourt() {
    var jsonData = {
        keyword: ''
    };
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/relatedCourt',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            all_court = res;
        },
        error: function(error) {
            // console.log('失败')
        }
    })
}

function court_drop(val) {
    var jsonData = {
        keyword: val
    };
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/relatedCourt',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            // console.log(res);
            var data = res;
            if (data.length == 0) {
                $("#court_dropdown_wrapper").hide();
            } else {
                render_court(data);
            }
        },
        error: function(error) {
            // console.log('失败')
        }
    })
}
function render_court(data) {
    var html = '';
    for (var i = 0, l = data.length; i < l; i++) {
        var tmp = data[i];
        html += '<li title="'+tmp.name+'">' + tmp.name + '</li>';
    }

    $('#court_dropdown').html(html);

    $('#court_dropdown_wrapper').stop().slideDown(300);
}

$('#court_dropdown').on('click', 'li', function(e) {
    $('#court .amendIpt').val($(this).text());
    $(this).parents(".form_item").find(".placeholder").hide();
});

function find_court(val) {
    var num = 0;
    for (var i = 0, l = all_court.length; i < l; i++) {
        if (all_court[i].name == val) {
            num++;
        }
    }
    if (num > 0) {
        // $("#court .amendIpt").val()
        var obj={
            "username":username,
            "court":val
        };
        // var _this=$(this);
        jQuery.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://' + ip + '/caa_v3.0/search/changeUserInfo',
            data:JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json',
            success: function (res) {
                // console.log(res)
                if(res.resultcode == '0000') {
                    $(".i_status ").hide();
                    $("#court").find(".amendBox").addClass('hide');
                    $("#court").find(".amendBox").siblings(".showBox").removeClass('hide');
                    $(".court").text(val)
                    userInfo.court=val
                    $.cookie("USERINFO", JSON.stringify(userInfo), {
                        path: '/',
                        expires: 365 //过期时间365天
                    })

                }else{
                    alert("修改法院失败")
                }
            }
        })
        return true;

    } else {
        $(this).parent(".iptBox").removeClass('passing_border').addClass('warning_border');
        $(this).parents(".amendBox").siblings(".hintsAmend").show();
        $(this).siblings("i").hide()
        $(this).parents(".amendBox").siblings(".hintsAmend").find("span").text("请填写您所在的法院");
        return false;
    }
}


