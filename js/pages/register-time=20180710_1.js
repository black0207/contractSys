if (window.sessionStorage.getItem('codeInitTime')) {
    window.sessionStorage.removeItem('codeInitTime');
}
// var QrCode_init_time = new Date().getTime(); //初始化验证码的时间
// window.sessionStorage.setItem('codeInitTime', QrCode_init_time);

var cur = -1; //上下键标志

$(function() {
    // getAllCourt(); //获取所有法院
    $(".field").val("");
    // $('#idcode').attr("src", "http://" + ip + "/caa_v3.0/search/getVerifyCodeImage");
    // changeImg();

    //已经登录 隐藏“已有账号，立即登录”
    if ($.cookie('USERINFO')) {
        $('.loginbtn').hide();
    } else {
        $('.loginbtn').show();
    }
})

var isOK_obj = {
    'username_isOK': false,
    'password_isOK': false,
    'confirm_password_isOK': false,
    'court_isOK': false,
    'name_isOK': true,
    'telephone_isOK': true
    // 'Txtidcode_isOK': false
};
/*var all_court = [];
// 获取所有法院
function getAllCourt() {
    var jsonData = {
        keyword: ''
    };

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
}*/
//用户名
$('#user_name').blur(function() {
    $(this).parent().removeClass('passing_border');
    // 是否为空
    if (!isHasValue('#user_name', '请输入用户名')) {
        isOK_obj.username_isOK = false;
        return false;
    }

    //是否已经存在
    var jsonData = {
        'username': $(this).val()
    };

    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/checkUserName',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            if (res.resultcode == '0000') {
                isOK_obj.username_isOK = true;
                // 格式是否正确
                if (check_user_name()) {
                    isOK_obj.username_isOK = true;
                } else {
                    isOK_obj.username_isOK = false;
                }
            } else if (res.resultcode == '0007') {
                isOK_obj.username_isOK = false;
                inputFalse('#user_name', '用户名已存在,请重新输入。');
            }
        },
        error: function(error) {
            isOK_obj.username_isOK = false;
        }
    });
})

function check_user_name() {
    var reg = /^[a-zA-Z0-9_-]*$/;
    if (reg.test($('#user_name').val())) { //通过字符验证
        //检验长度
        if ($('#user_name').val().length > 20 || $('#user_name').val().length < 4) {
            inputFalse('#user_name', '请输入4-20个字符。');
            return false;
        }
        inputTrue('#user_name');
        return true;
    } else { //未通过字符验证
        inputFalse('#user_name', '用户名存在非法字符，请重新输入。');
        return false;
    }
}

// 密码
$('#user_pwd').blur(function() {
    $(this).parent().removeClass('passing_border');
    //是否为空
    if (!isHasValue('#user_pwd', '请输入密码')) {
        isOK_obj.password_isOK = false;
        return false;
    }
    //长度
    if ($(this).val().length > 20 || $(this).val().length < 8) {
        inputFalse('#user_pwd', '请输入8-20个字符。');
        return false;
    }
    // 正则限制
    if (testPass($(this).val())) {
        isOK_obj.password_isOK = true;
    } else {
        isOK_obj.password_isOK = false;
    }
})

//密码校验
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
        inputFalse('#user_pwd', '含有非法字符，请重新输入。');
        return false;
    }
    if ((tR.l && tR.n) || (tR.l && tR.s) || (tR.s && tR.n) || (tR.s && tR.l && tR.n)) { //两种 或 三种
        inputTrue('#user_pwd');
        return true;
    } else {
        inputFalse('#user_pwd', '建议您使用字母、数字、符号两种及以上组合。');
        return false;
    }
}

//确认密码
$('#confirm').blur(function() {
    $(this).parent().removeClass('passing_border');
    // 是否为空
    if (!isHasValue('#confirm', '请再次输入密码')) {
        isOK_obj.confirm_password_isOK = false;
        return false;
    }
    if (confirm_password()) {
        isOK_obj.confirm_password_isOK = true;
    } else {
        isOK_obj.confirm_password_isOK = false;
    }
});

function confirm_password() {
    if (!$('#confirm').val() || !$('#user_pwd').val()) {
        return false;
    }
    if (!testPass($('#user_pwd').val())) {
        return false;
    }
    if ($('#user_pwd').val() == $('#confirm').val()) {
        inputTrue('#confirm')
        return true;
    } else {
        inputFalse('#confirm', '两次密码输入不一致。');
        return false;
    }
}

//所在法院
var click_li = false; //是否点击了li
$('#court').on('click focus', function(e) {
    click_li = false;
});

$('#court').on('input propertychange', function(e) {
    cur = -1;

    if (click_li) return;

    if (!$(this).val()) {
        $('#court_dropdown_wrapper').show();
        $('#court_dropdown').empty();
        return;
    }

    court_drop($(this).val());
});

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
                $('#court_dropdown_wrapper').hide();
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
        html += '<li>' + tmp.name + '</li>';
    }

    $('#court_dropdown').html(html);

    $('#court_dropdown_wrapper').show();
}

$('#court_dropdown').on('click', 'li', function(e) {
    click_li = true; // 点击过li了
    $('#court').val($(this).text());
});

$('#court').blur(function() {
    $(this).parent().removeClass('passing_border');
    // 判空
    if (trim($(this).val()) == '' || $(this).val() == undefined || $(this).val() == null) {
        isOK_obj.court_isOK = false;
        inputFalse('#court', '请填写您所在的法院');
    } else {
        // 长度大于30
        if ($(this).val().length > 30) {
            isOK_obj.court_isOK = false;
            inputFalse('#court', '最多输入30个字');
        } else {
            isOK_obj.court_isOK = true;
            inputTrue('#court');
        }
    }

    /*if (reg_court($(this).val())) {
        isOK_obj.court_isOK = true;
        // find_court($(this).val());
    } else {
        isOK_obj.court_isOK = false;
    }*/
});

/*function reg_court(val) {
    var reg = /^[\u4e00-\u9fa5]+$/;
    if (reg.test(val)) {
        inputTrue('#court');
        return true;
    } else {
        inputFalse('#court', '请填写您所在的法院');
        return false;
    }
}*/

// 检察法院是否存在
/*function find_court(val) {
    var num = 0;
    for (var i = 0, l = all_court.length; i < l; i++) {
        if (all_court[i].name == val) {
            num++;
        }
    }
    if (num > 0) {
        inputTrue('#court');
        return true;
    } else {
        inputFalse('#court', '请填写您所在的法院');
        return false;
    }
}*/

//姓名
$('#name').blur(function() {
    $(this).parent().removeClass('passing_border');
    if ($(this).val()) {
        // 1、正则校验
        reg_name($(this).val());
    } else {
        $(this).siblings('i').hide();
    }

    // 是否为空
    // if (!isHasValue('#name', '请填写您的真实姓名')) {
    //     isOK_obj.name_isOK = false;
    //     return false;
    // }
    // if (reg_name($(this).val())) {
    //     isOK_obj.name_isOK = true;
    // } else {
    //     isOK_obj.name_isOK = false;
    // }
});

function reg_name(val) {
    var reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{2,10}$/;
    if (reg.test(val)) {
        isOK_obj.name_isOK = true;
        inputTrue('#name');
        // return true;
    } else {
        isOK_obj.name_isOK = false;
        inputFalse('#name', '请输入真实姓名2-10个字符');
        // return false;
    }
}

// 手机号码
$('#telephone').blur(function() {
    $(this).parent().removeClass('passing_border');
    if ($(this).val()) {
        reg_phone($(this).val());
    }
});

function reg_phone(val) {
    var reg = /^[1][3-9][0-9]{9,9}$/;
    if (reg.test(val)) {
        inputTrue('#telephone');
        isOK_obj.telephone_isOK = true;
        return true;
    } else {
        inputFalse('#telephone', '请输入正确的手机号');
        isOK_obj.telephone_isOK = false;
        return false;
    }
}

// 验证码(后台校验)
/*$("#Txtidcode").blur(function() {
    $(this).parent().removeClass('passing_border');

    var QrCode_last_time = new Date().getTime(),
        QrCode_out_time = 1000 * 60 * 5,
        codeInitTime = window.sessionStorage.getItem('codeInitTime'),
        outTime = QrCode_last_time - codeInitTime;
    if (outTime > QrCode_out_time) {
        inputFalse('#Txtidcode', '验证码已失效');
        changeImg();
        window.sessionStorage.setItem('codeInitTime', new Date().getTime());
        return false;
    } else {
        inputTrue('#Txtidcode');
    }

    if (isHasValue("#Txtidcode", '请输入验证码')) {
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
            // crossDomain: true == !(document.all),
            success: function(res) {
                if (res.resultcode == '0000') {
                    inputTrue('#Txtidcode');
                    isOK_obj.Txtidcode_isOK = true;
                } else {
                    isOK_obj.Txtidcode_isOK = false;
                    inputFalse('#Txtidcode', '验证码有误');
                    changeImg(); //重新生成验证码
                }
            },
            error: function(error) {
                isOK_obj.Txtidcode_isOK = false;
                // console.log('获取失败');
            }
        })
    } else {
        isOK_obj.confirm_password_isOK = false;
    }
});*/

//改变验证码
/*function changeImg() {
    var imgSrc = $("#idcode"),
        src = imgSrc.attr("src");
    imgSrc.attr("src", chgUrl(src));
}*/

// 时间戳
// 为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
/*function chgUrl(url) {
    var timestamp = (new Date()).valueOf();
    if ((url.indexOf("&") >= 0)) {
        url = url + "×tamp=" + timestamp;
    } else {
        url = url + "?timestamp=" + timestamp;
    }
    return url;
}*/


// 点击注册按钮
$('#submitBtn').on('click', function() {
    //先进行校验
    $('#user_name').trigger('blur');
    $('#user_pwd').trigger('blur');
    $('#confirm').trigger('blur');
    $('#court').trigger('blur');
    $('#name').trigger('blur');
    $('#telephone').trigger('blur');
    confirm_password();

    // 检测该法院是否存在
    /*if (find_court($('#court').val())) {
        isOK_obj.court_isOK = true;
        // find_court($(this).val());
    } else {
        isOK_obj.court_isOK = false;
    }*/

    // console.log(isOK_obj);
    for (var k in isOK_obj) {
        if (!isOK_obj[k]) {
            return false;
        }
    }
    var timer = null;
    window.clearInterval(timer);

    $('#submitBtn').attr('disabled', 'disabled');

    var jsonData = {
        "username": $('#user_name').val(),
        "password": md5($('#user_pwd').val()),
        // "imgVerifyCode": $("#Txtidcode").val()
        "court": $("#court").val(),
        "realname": $("#name").val(),
        "telephone": $("#telephone").val()
    };
    // 验证通过，发送请求
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/register',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            // console.log(res)
            if (res.resultcode == 0000) {
                // 获取token
                $.ajax({
                    type: 'POST',
                    url: 'http://' + ip + '/caa_v3.0/search/getAccessToken?username=' + $('#user_name').val(),
                    success: function(res) {
                        var token = res.access_token;
                        goLogin(token);
                    },
                    error: function(error) {}
                })
            } else {
                $('#submitBtn').removeAttr('disabled');
                $('.regSuccess').hide();
                $('.regSuccess span').text('3')
            }
        },
        error: function(error) {
            $('#submitBtn').removeAttr('disabled');
            $('.regSuccess').hide();
            $('.regSuccess span').text('3');
        }
    })
})

//登录接口
function goLogin(token) {
    var jsonData = {
        "username": $('#user_name').val(),
        "password": md5(token + md5($('#user_pwd').val()))
    };

    $.ajax({
        type: 'POST',
        url: 'http://' + ip + '/caa_v3.0/search/login',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            if (res.resultcode == '0000') {
                var userInfo = res.userinfo;
                $.cookie("USERINFO", JSON.stringify(userInfo), {
                    path: '/',
                    expires: 365 //过期时间365天
                })
                // console.log($.cookie("USERINFO"));

                var wait = 3;
                $('.regSuccess').show();

                timer = window.setInterval(function() {
                    wait--;
                    $('.regSuccess span').text(wait);
                    if (wait < 1) {
                        $('#submitBtn').removeAttr('disabled');
                        $('.regSuccess').hide();
                        $('.regSuccess span').text('3')
                        window.clearInterval(timer);
                        window.history.go(-1); //返回上一页
                    }
                }, 1000);
            } else {
                $('.loginTip').css('visibility', 'visible')
            }
        },
        error: function(error) {
            // console.log('登录失败');
        }
    })
}

$('.goBackLast').on('click', function() {
    window.history.go(-1); //返回上一页
})

//已有账号 去登录
$('#loginNow').on('click', function() {
    $(".mask").removeClass('hide');
    $(".login_box").removeClass('hide');

    /* $.ajax({
         type: 'POST',
         url: 'http://' + ip + '/caa_v3.0/search/getAccessToken',
         success: function(res) {
             token = res.access_token;
         },
         error: function(error) {
             // console.log('获取失败');
         }
     })*/

    $(".mask").show();
    $(".login_box").show();
})

//文本框获取焦点
$('.register_ic .field').on('focus', function() {
    $(this).parent().removeClass('warning_border');
    $(this).parent().addClass('passing_border');
    $(this).parent().siblings('.hints').hide();
    $(this).parent().siblings('.hints').children('span').text('');
})

// 法院下拉框
$(document).click(function() {
    $('#court_dropdown_wrapper').hide();
})

// 法院上下键选择
$('#court').on('keydown', function(e) {
    var as = $('#court_dropdown li');
    UpDowmSelect(e, as, 'court_h', '', 'court_dropdown', 30)
})
//通过按上下键 下拉列表 移动高亮
function UpDowmSelect(e, as, className, child, ul_name, li_height) {

    switch (e.keyCode) {
        case 38: //上
            if (cur == -1) cur = as.length - 1;
            else {
                as.eq(cur).removeClass(className);
                cur -= 1;
            }
            if (cur < 0) cur = as.length - 1; //当前为第一个时
            as.eq(cur).addClass(className);


            //上下键修复
            if (cur == (as.length - 1)) { //高亮为最后一个时
                $('.' + ul_name).scrollTop(li_height * (cur - 9));
            } else {
                var position_top = $('.' + className).next().position().top; //高亮的下一个兄弟元素距离父盒子顶部的距离
                if (position_top <= 0) {
                    $('.' + ul_name).scrollTop(li_height * cur);
                }
            }
            break;
        case 40: //下
            if (cur == -1) cur = 0;
            else {
                as.eq(cur).removeClass(className);
                cur++;
            }
            if (cur >= as.length) {
                cur = 0; //当前为最后一个时
                $('.' + ul_name).scrollTop(0)
            }
            as.eq(cur).addClass(className);

            // 上下键修复
            var position_top = $('.' + className).position().top; //距离父盒子顶部的距离
            // console.log(position_top);
            if (position_top > (li_height * 9)) {
                // console.log(cur)
                // console.log('当前li的索引:'+cur);
                $('.' + ul_name).scrollTop(li_height * (cur - 9));
            }

            break;
        case 13: //回车选择
            if (cur != -1) {
                click_li = true; //点击过li了

                var cur_court = $('.' + className).text();
                $('#court').val(cur_court);

                $('#court').blur(); // 让文本框失去焦点  使用户必须再点击获取焦点

                $('#court_dropdown_wrapper').hide();
                $('#court_dropdown').empty();
            }
            break;
    }
}