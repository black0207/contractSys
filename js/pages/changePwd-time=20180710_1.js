if (window.localStorage.getItem('codeInitTime')) {
    window.localStorage.removeItem('codeInitTime');
}
var QrCode_init_time = new Date().getTime(); //初始化验证码的时间
window.sessionStorage.setItem('codeInitTime', QrCode_init_time);


$(function() {
    $('#idcode').attr("src", "http://" + ip + "/caa_v3.0/search/getVerifyCodeImage");
    changeImg();
})
//表单校验是否通过标志
var CP_pass_obj = {
    uname_isOK: false,
    vQrCode_isOK: false
}

/* 身份验证开始 */
// 判断是否为空(身份验证)
function isHasValue(id, str) {
    var str2 = str || '';
    $(id).parent().siblings('.hints').css('visibility', 'hidden');
    $(id).parent().removeClass('warning_border');
    if ($(id).val()) {
        return true;
    } else {
        $(id).parent().siblings('.hints').find('span').text(str2);
        $(id).parent().siblings('.hints').css('visibility', 'visible');
        $(id).parent().addClass('warning_border');
        $(id).next('i').hide();
        return false;
    }
}

// 用户名
$('#username').blur(function() {
    $(this).parent().removeClass('passing_border');

    if (!isHasValue('#username', '请输入用户名')) {
        CP_pass_obj.uname_isOK = false;
        return false;
    }

    //是否已经存在
    var jsonData = {
        'username': $(this).val()
    };
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/checkUserName',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            if (res.resultcode == '0000') {
                CP_pass_obj.uname_isOK = false;
                CP_inputFalse('#username', '用户不存在,请重新输入。');
                return false;
            } else if (res.resultcode == '0007') {
                CP_pass_obj.uname_isOK = true;
                CP_inputTrue('#username');
            }
        },
        error: function(error) {
            // console.log('获取失败')
        }
    });
})
// 验证码
$("#Txtidcode").blur(function() {
    $(this).parent().removeClass('passing_border');

    if (!isHasValue("#Txtidcode", '请输入验证码')) {
        CP_pass_obj.uname_isOK = false;
        return false;
    }
});

function changeImg() {
    var imgSrc = $("#idcode");
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

//点击 下一步
$('#nextBtn').on('click', function() {

    //验证码是否过期
    var QrCode_last_time = new Date().getTime(),
        QrCode_out_time = 1000 * 60 * 5, //验证码过期时间
        codeInitTime = window.sessionStorage.getItem('codeInitTime'),
        outTime = QrCode_last_time - codeInitTime;
    if (outTime > QrCode_out_time) {
        CP_inputFalse('#Txtidcode', '验证码已失效');
        changeImg();
        window.sessionStorage.setItem('codeInitTime', new Date().getTime());
        return false;
    } else {
        CP_inputTrue('#Txtidcode');
    }

    // 先进行校验
    $('#username').trigger('blur');
    $("#Txtidcode").trigger('blur');

    if (!CP_pass_obj.uname_isOK) return false;

    var jsonData = {
        "imgVerifyCode": $('#Txtidcode').val()
    }
    // 验证通过，发送请求
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/checkVerifyCode',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            if (res.resultcode == '0000') {
                $('#nextBtn').siblings('p').css('visibility', 'hidden');
                $('#verify_form').hide();
                $('#changePwd_from').show();
                $('.process_txt').eq(0).removeClass('current');
                $('.process_txt').eq(1).addClass('current');
            } else {
                $('#Txtidcode').parent().siblings('p').children('span').text('验证码错误');
                $('#Txtidcode').parent().siblings('p').css('visibility', 'visible');
                $("#Txtidcode").parent().addClass('warning_border');

                changeImg(); //重新生成验证码
            }
        },
        error: function(error) {
            // console.log('获取失败');
        }
    })
})
/* 身份验证结束 */



/* 找回密码开始*/

// 新密码
$('#newPwd').on('blur', function() {
    $(this).parent().removeClass('passing_border');

    // 是否为空
    if (!isHasValue('#newPwd', '请输入新密码')) {
        return false;
    }
    testPass($(this).val());
})

function testPass(str) {
    var rC = {
        lW: '[a-zA-Z]',
        nW: '[0-9]',
        sW: '[\\u0020-\\u002F\\u003A-\\u0040\\u005B-\\u0060\\u007B-\\u007E]',
        kW: /\s/
    };

    function Reg(str, rStr) {
        var reg = new RegExp(rStr);
        if (reg.test(str)) return true;
        else return false;
    }

    var tR = {
        l: Reg(str, rC.lW),
        n: Reg(str, rC.nW),
        s: Reg(str, rC.sW),
        k: Reg(str, rC.kW)
    };

    if (tR.k) { //是否有空格
        CP_inputFalse('#newPwd', '含有非法字符，请重新输入');
        return false;
    }

    if ((tR.l && tR.n) || (tR.l && tR.s) || (tR.s && tR.n) || (tR.s && tR.l && tR.n)) { //两种 或 三种
        if (str.length > 20 || str.length < 8) { //最后判断长度符不符合
            CP_inputFalse('#newPwd', '请输入8-20个字符');
            return false;
        }
        CP_inputTrue('#newPwd');
        return true;
    } else {
        CP_inputFalse('#newPwd', '建议您使用字母、数字、符号两种及以上组合');
        return false;
    }

}
// 确认密码
$('#newPwd2').on('blur', function() {
    $(this).parent().removeClass('passing_border');

    // 是否为空
    if (!isHasValue('#newPwd2', '请再次输入新密码')) {
        return false;
    }

    confirm_password();
})

function confirm_password() {
    if (!$('#newPwd').val() || !$('#newPwd2').val()) {
        return false;
    }
    if ($('#newPwd').val() == $('#newPwd2').val()) {
        CP_inputTrue('#newPwd2');
        return true;
    } else {
        CP_inputFalse('#newPwd2', '两次密码输入不一致');
        return false;
    }
}

$('#okBtn').on('click', function() {
    

    $('#okBtn').siblings('.hints').css('visibility', 'hidden');

    $('#newPwd').trigger('blur');
    $('#newPwd2').trigger('blur');
    confirm_password();

    if ($('.warning_border').length > 0) {
        return false;
    }

    $(this).attr('disabled','disabled');

    //验证通过,发送请求,新密码入库
    var jsonData = {
        "username": $('#username').val(),
        "password": md5($('#newPwd').val())
    }
    // 验证通过，发送请求
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/changePassword',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            if (res.resultcode == '0000') {
                window.clearInterval(timer);
                var timer = null,
                    wait = 3;
                timer = window.setInterval(function() {
                    wait--;
                    $('.seconds').text(wait);
                    if (wait < 1) {
                        window.clearInterval(timer);
                        window.history.go(-1); //返回上一页
                    }
                }, 1000);

                $('#okBtn').siblings('.hints').children().css('color', '#82d300');
                $('#okBtn').siblings('.hints').css('visibility', 'visible');
                $('.okBtn_Tip_success').show();
                $('.okBtn_Tip_fail').hide();

            } else if (res.resultcode == '0011') {
                $('#okBtn').removeAttr('disabled');

                $('.changePwd_item i').hide();
                $('.okBtn_Tip_fail').text("新密码不能与原密码一致");
                $('#okBtn').siblings('.hints').children().css('color', '#f14c1a');
                $('#okBtn').siblings('p').css('visibility', 'visible');
                $('#changePwd_from .changePwd_item i').hide();
                $('.okBtn_Tip_success').hide();
                $('.okBtn_Tip_fail').show();

                
            } else {
                $('#okBtn').removeAttr('disabled');

                $('.changePwd_item i').hide();
                $('.okBtn_Tip_fail').text("修改失败");
                $('#okBtn').siblings('.hints').children().css('color', '#f14c1a');
                $('#okBtn').siblings('p').css('visibility', 'visible');
                $('.okBtn_Tip_success').hide();
                $('.okBtn_Tip_fail').show(); 
            }
        },
        error: function(error) {
            // console.log('修改失败');
        }
    })
})


//修改成功返回上一页
$('.goBackLastPage').on('click', function() {
    window.history.go(-1); //刷新上一页
})

//找回密码点击回到身份认证页
$('#identityCheck').click(function() {
    $('.process_txt').eq(0).addClass('current');
    $('.process_txt').eq(1).removeClass('current');

    $('#verify_form').show();
    $('#changePwd_from').hide();

    changeImg();
})
/* 找回密码结束*/

$('.field').on('focus', function(e) {
    $(this).parent().removeClass('warning_border');
    $(this).parent().addClass('passing_border');
    // stopPropagation(e);
})