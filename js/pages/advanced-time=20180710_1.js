$(function() {
    $(".searchInp").val("");
})
// store.remove('CASECAUSEOBJ'); //初始化时 先清除所有的store
sessionCont.removeSession('CASECAUSEOBJ'); //初始化时 先清除所有的session

//一级案由(level==1)
var civilCause_level_1 = [], //民事案由
    criminalCause_level_1 = [], //刑事案由
    stateCompensationCause_level_1 = [], //国家赔偿案由(2011版)
    administrativeCause_level_1 = [], //行政案由
    data = [], //所有案由
    cur = -1; //上下键标志
$(function() {
    renderCasecause(); //动态生成案由
})

function renderCasecause() {
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: 'http://' + ip + '/caa_v3.0/search/casecause',
        // crossDomain: true == !(document.all),
        success: function(res) {
            data = res;
            //找出顶级案由
            var array_level_0 = [];
            for (var i = 0; i < res.length; i++) {
                if (res[i].level == 0) {
                    array_level_0.push(res[i])
                }
            }

            for (var i = 0; i < res.length; i++) {
                if (res[i].level == 1) {
                    if (res[i].pid == array_level_0[0].id) { //民事
                        addChild_1(array_level_0[0].name, res[i]);
                    } else if (res[i].pid == array_level_0[1].id) { //行政
                        addChild_1(array_level_0[1].name, res[i]);
                    } else if (res[i].pid == array_level_0[2].id) { //国家赔偿案由
                        addChild_1(array_level_0[2].name, res[i]);
                    } else if (res[i].pid == array_level_0[3].id) { //刑事
                        addChild_1(array_level_0[3].name, res[i]);
                    }
                }
            }
            // console.log(civilCause_level_1);
            // console.log(criminalCause_level_1);
            // console.log(stateCompensationCause_level_1);
            // console.log(administrativeCause_level_1);

            createHtml(civilCause_level_1, civilCause_level_2, 'civilCause_level_0');
        },
        error: function(error) {
            // console.log('获取失败');
        }
    })
}

function addChild_1(parent, child) {
    if (parent == '民事案由') {
        civilCause_level_1.push(child);
    } else if (parent == '刑事案由') {
        criminalCause_level_1.push(child);
    } else if (parent == '赔偿案由') {
        stateCompensationCause_level_1.push(child);
    } else if (parent == '行政案由') {
        administrativeCause_level_1.push(child);
    }
}

function createHtml(casecause, data, level0) {
    // console.log(level0)
    var bgImage_class = '';
    switch (level0) {
        case 'civilCause_level_0':
            bgImage_class = 'civilCauseImg';
            break;
        case 'criminalCause_level_0':
            bgImage_class = 'criminalCauseImg';
            break;
        case 'administrativeCause_level_0':
            bgImage_class = 'administrativeImg';
            break;
        default:
            // statements_def
            break;
    }
    //页面加载时显示民事案由
    var html = '';
    for (var i = 0; i < casecause.length; i++) {
        var tmpt = casecause[i];

        if (tmpt) {
            html +=
                '<div class="catelogeBox clearfix">' +
                '<div class="secondLevel fl">' +
                tmpt.name +
                '</div>' +
                '<div class="thirdLevel fr">' +
                '<ul class="clearfix">';

            var x = -1;
            for (var j = 0, l = data[i].length; j < l; j++) {
                x++;
                html +=
                    '<li >' +
                    '<a href="javascript:void(0);" class="casecauseItem" title="' + data[i][j] + '">' +
                    '<span class="icon">' +
                    '<i style="background-position: ' + (-x * 33) + 'px ' + (-i * 33) + 'px ;" class="' + bgImage_class + '"></i>' +
                    '</span>' +
                    '<span class="casecause ' + (data[i][j].length > 8 ? 'overLine' : '') + '">' +
                    data[i][j] +
                    '</span>' +
                    '</a>' +
                    '</li>';
            }
            html += '</ul>' +
                '</div>' +
                '</div>'
        }
    }

    $('.chooseBox').html(html);

    //    console.log($('.chooseBox .catelogeBox').height())

    // $('.chooseBox .secondLevel').css('line-height', $('.chooseBox .catelogeBox').height() + 'px')

    for (var i = 0, l = $('.chooseBox .secondLevel').length; i < l; i++) {
        $('.chooseBox .secondLevel').eq(i).css('line-height', $('.chooseBox .secondLevel').eq(i).parent().height() + 'px')
    }

    //判断浏览器类型
    var browserType = getBrowser();
    // alert(browserType)
    if ("chrome" == browserType) {
        return false;
    }

    //判断浏览器类型 IE89
    var brotype = myBrowser();
    if (brotype == "IE6" || brotype == "IE7" || brotype == "IE8" || brotype == "IE9") {
        var casecauseLis = $('.casecause');
        //console.log(casecauseLis);
        for (var i = 0; i < casecauseLis.length; i++) {
            //console.log(casecauseLis.eq(i).text());
            if (casecauseLis.eq(i).text().length > 14) {
                var te = casecauseLis.eq(i).text().slice(0, 14) + ' . . .';
                //console.log(te)
                casecauseLis.eq(i).text(te)
            }
        }
        return false;
    }

    var casecause = getElementsByClassName(document, 'casecause');
    for (var i = 0; i < casecause.length; i++) {
        $clamp(casecause[i], { clamp: 3 });
    }
}


// 点击顶级案由切换
$('.firstItem').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');

    var top_level = $(this).text();
    switch (top_level) {
        case '民事案由':
            createHtml(civilCause_level_1, civilCause_level_2, 'civilCause_level_0');
            break;
        case '刑事案由':
            createHtml(criminalCause_level_1, criminalCause_level_2, 'criminalCause_level_0');
            break;
            // case '国家赔偿案由(2011版)':
            //     createHtml(stateCompensationCause_level_1, data);
            //     break;
        case '行政案由':
            createHtml(administrativeCause_level_1, administrativeCause_level_2, 'administrativeCause_level_0');
            break;
        default:
            // statements_def
            break;
    }

})

$('#searchInp').on('input propertychange', function() {
    cur = -1; //重置上下键标志

    var text = trim($(this).val());
    if (!text) {
        $(".dropList").slideUp(300);
        return false;
    }

    $('.dropList').html('')

    var drop_data = [];
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i].level == 2 && data[i].name.indexOf(text) > -1) {
            drop_data.push(data[i].name);
        }
    }

    if (drop_data.length > 0) {
        var dropList_html = '';

        for (var i = 0, l = drop_data.length; i < l; i++) {
            dropList_html +=
                '<li>' + drop_data[i] + '</li>';
        }

        $('.dropList').html(dropList_html)

        $(".dropList").slideDown(300);
    } else {
        $(".dropList").hide();
    }
})

//点击其他地方隐藏下拉框
$(document).click(function() {
    $(".dropList").stop().slideUp(300);
    $('.dropList').empty();
})

//点击下拉框li
$(".dropList").on('click', 'li', function() {
    url_To_New_Html($(this).text(), data);
})

//上下键高亮  下个版本做
$('#searchInp').on('keydown', function(e) {
    var as = $('.dropList li');
    checkKeyCode(e, as, 'li-active', '', 'dropList', 35);
})
//点击三级案由
$('.chooseBox').on('click', '.catelogeBox li', function() {
    if (data.length == 0) {
        return false;
    }

    // 背景色 边框
    // $('.chooseBox .catelogeBox li').css('border','1px solid #e6e6e6');
    // $('.chooseBox .catelogeBox li a').css('backgroundColor','#FFFFFF');
    // $(this).css('border','1px solid #acc3cb');
    // $(this).children('a').css('backgroundColor','#d5eae3');

    var text = $(this).children('.casecauseItem').attr('title');
    //console.log(text);
    url_To_New_Html(text, data);
})

function url_To_New_Html(text, data) {
    // console.log(text);
    var casecauseObj = {
            casecause: text
        },
        causeid = '';
    for (var i = 0, l = data.length; i < l; i++) {
        if (data[i].name == text && data[i].level == 2) {
            causeid = data[i].id;
        }
    }

    var cause_tmptObj = {
        condition: {
            andcondition: casecauseObj
        },
        causeid: causeid
    };

    var date = new Date().getTime();
    // store.set('CASECAUSEOBJ_' + date, cause_tmptObj);
    sessionCont.setSession('CASECAUSEOBJ_' + date, cause_tmptObj);
    window.location.href = "resultGj.html?caa_id=" + date;
}
/*控制输入框样式开始*/
$('.search_ipt').on('focus', function() {
    $(this).parent().addClass('search_ipt_focus')
})

$('.search_ipt').on('blur', function() {
    $(this).parent().removeClass('search_ipt_focus')
})