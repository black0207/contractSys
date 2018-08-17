$(function() {
    $(".input_box input").val("");

    if (window.location.href.indexOf('index') > -1 ){
        ddLogin(); // 单点登录
    }
})

// 单点登录
function ddLogin() {
    if (!Request3('param') || !Request3('sign')) return;

    var jsonData = {
        param: Request3('param'),
        sign: Request3('sign')
    };

    $.ajax({
        type: 'POST',
        url: 'http://' + ip + '/caa_v3.0/search/TJSSOLogin',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            // console.log(res)
            if (res.resultcode == '0000') {
                var userInfo = res.userinfo,
                    username = res.userinfo.username;

                $.cookie("USERINFO", JSON.stringify(userInfo), {
                    path: '/',
                    expires: 365 //过期时间365天
                })
                // console.log($.cookie("USERINFO"));

                $('.login').hide();
                $('.curUser span').text(username);
                $('.curUser span').attr('title', username);
                $('#currentUser').show();
                // window.location.reload(); //页面刷新
            }
        },
        error: function(error) {
            // console.log('登录失败');
        }
    })
}


// var token = '',
var login_flag = {}, //文本框是否为空
    local_href = window.location.href,
    now = new Date().getTime(); //间隔一天时间清除localstorage

/*store.forEach(function(key, value) {
    var then = key.substr(key.indexOf('_') + 1),
        gap = (now - then) / 1000 / 60 / 60 / 24;
    // var gap =(now-then)/1000;
    if (gap >= 0.3) {
        store.remove(key);
    }
})*/

setUserByLocalCookie(); //根据cookie设置当前用户

//判断cookie是否有用户
function setUserByLocalCookie() {
    // 获取url
    var url = window.location.href;
    if ($.cookie('USERINFO') == 'null' || $.cookie('USERINFO') == undefined) {
        // 除了首页和案由选择页外 都判断是否存在
        /*if (url.indexOf('index.html') > -1 || url.indexOf('advanced.html') > -1 || url.indexOf('register.html') > -1 || url.indexOf('404.html') > -1) {
            return;
        } else {
            window.location.href = './index.html';
        }*/
    } else {
        // 有问题的cookie页面  清除有问题的cookie
        if ($.cookie('USERINFO').indexOf('id%') > -1) {
            $.cookie('USERINFO', null, {
                path: '/',
                expires: 0 //过期时间365天
            }); //退出并清除用户信息

        } else {
            // var username = JSON.parse(decodeURI($.cookie('USERINFO'))).username;
            var username = JSON.parse($.cookie('USERINFO')).username;
            $('.login').hide();
            $('.curUser span').text(username);
            $('.curUser span').attr('title', username);
            $('#currentUser').show();
        }
    }
}

// 点击登录
$(".loginA").click(function() {
    $(".mask").removeClass('hide');
    $(".login_box").removeClass('hide');
});

//点击关闭
$(".closeBtn").click(function() {
    $(".mask").addClass('hide');
    $(".login_box").addClass('hide');

    $('#userName').val(''); //清除原来的用户名
    $('#userPwd').val(''); //清除原来的密码
    $('#currentUser ul').hide(); //防止再次登录时 仍显示下拉框
    //清除错误提示
    $('.hints_login').hide();
    $('.input_box').removeClass('warning_border');
    $('.loginTip').css('visibility', 'hidden');
});

/***************************账号登录*******************************/

//校验用户名
$("#userName").on('blur', function() {
    $(this).parent().removeClass('passing_border');

    if (!$(this).val()) {
        login_flag.username = false;

        tipConfirm_false("#userName", ' 请输入用户名');
    } else {
        login_flag.username = true;

        tipConfirm_true("#userName")
    }
});

//检验密码
$("#userPwd").on('blur', function() {
    $(this).parent().removeClass('passing_border');

    if (!$(this).val()) {
        login_flag.password = false;

        tipConfirm_false("#userPwd", '请输入密码');
    } else {
        login_flag.password = true;

        tipConfirm_true("#userPwd");
    }
})

//表单校验(false)
function tipConfirm_false(id, str) {
    $(id).parent().addClass('warning_border');
    $(id).parent().siblings().children('span').text(str);
    $(id).parent().siblings().show();

    return false;
}

//表单校验(true)
function tipConfirm_true(id) {
    $(id).parent().removeClass('warning_border');
    $(id).parent().siblings().children('span').text('');
    $(id).parent().siblings().hide();

    return true;
}

//进行登录
$("#loginBtn").click(function() {

    $("#userName").trigger('blur'); //是否为空
    $("#userPwd").trigger('blur'); //是否为空

    for (var k in login_flag) {
        if (!login_flag[k]) {
            return false;
        }
    }
    jQuery.support.cors = true;
    $.ajax({
        type: 'POST',
        url: 'http://' + ip + '/caa_v3.0/search/getAccessToken?username=' + $("#userName").val(),
        success: function(res) {
            var token = res.access_token;
            if (!token) return false; //页面加载时 获取token
            login(token);
        },
        error: function(error) {
            // console.log('获取失败');
        }
    })
});

function login(token) {
    var jsonData = {
        "username": $('#userName').val(),
        "password": md5(token + md5($('#userPwd').val()))
    };

    $.ajax({
        type: 'POST',
        url: 'http://' + ip + '/caa_v3.0/search/login',
        data: JSON.stringify(jsonData),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            // console.log(res)
            if (res.resultcode == '0000') {
                $(".mask").addClass('hide');
                $(".login_box").addClass('hide');
                $('.loginTip').css('visibility', 'hidden');

                var userInfo = res.userinfo,
                    username = res.userinfo.username;
                // $.cookie("USERINFO", encodeURI(JSON.stringify(userInfo)), {
                $.cookie("USERINFO", JSON.stringify(userInfo), {
                    path: '/',
                    expires: 365 //过期时间365天
                })
                // console.log($.cookie("USERINFO"));

                if (local_href.indexOf('register') > 0 || local_href.indexOf('changePwd') > 0) {
                    window.location.href = "../jsp/index.html";

                } else {
                    $('.login').hide();
                    $('.curUser span').text(username);
                    $('.curUser span').attr('title', username);
                    $('#currentUser').show();
                    window.location.reload(); //页面刷新
                }

            } else {
                $('.loginTip').css('visibility', 'visible');
            }
        },
        error: function(error) {
            // console.log('登录失败');
        }
    })
}

$(document).on('click', function() {
    $('.curUser').removeClass('curUser_active')
    $('.curUser i').eq(0).removeClass('hide');
    $('.curUser i').eq(1).addClass('hide');

    $('#currentUser ul').stop().slideUp(300);
});

//点击右上角用户名 显示下拉框
$('.curUser').on('click', function(e) {
    $(this).toggleClass('curUser_active')
    for (var i = 0; i < $('.curUser i').length; i++) {
        if ($('.curUser i').eq(i).hasClass('hide')) {
            $('.curUser i').eq(i).removeClass('hide')
        } else {
            $('.curUser i').eq(i).addClass('hide')
        }
    }

    $('#currentUser ul').stop().slideToggle(300);
    e = e || window.event;
    e.stopPropagation();
})

//退出
$('.logout').on('click', function() {
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/logout?username=' + $('.uname').attr('title'),
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
            // console.log('退出失败')
        }
    })
})

$('.input_box input').on('focus', function(e) {
    $(this).parent().removeClass('warning_border');
    $(this).parent().addClass('passing_border');
})