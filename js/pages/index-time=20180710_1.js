var cur = -1; //上下键标志
var ifIsFileUpload = false; //是否是文件上传

//是否显示下载框
function ifShowDownload() {
    //判断浏览器类型
    var brotype = myBrowser();
    // if (brotype == "IE6" || brotype == "IE7" || brotype == "IE8" || brotype == "IE9" || brotype == "IE10") {
    if (brotype == "IE6" || brotype == "IE7") {
        var ie_vertion;
        // if (brotype == "IE10") {
            // ie_vertion = brotype.slice(brotype.length - 2);
        // } else {
            ie_vertion = brotype.slice(brotype.length - 1);
        // }
        // alert(ie_vertion);
        $('.ie_vertion').text(ie_vertion);
        $('.mask').removeClass('hide');
        $('.download_chrome').removeClass('hide');
    } else {
        $('.mask').addClass('hide');
        $('.download_chrome').addClass('hide');
    }
}
$(function() {
    ifShowDownload(); //判断浏览器类型 是否显示下载框

    $(".search_ipt").val(''); //清空搜索框
    $('.upfileWrap #upFile').val(''); //清空文件
    $('.dropDown_box').empty(); //清空  解决IE8 下拉框 页面后退时不会隐藏
    $('.dropDown_box').hide(); //解决IE8 下拉框 页面后退时不会隐藏

    //解决页面后退时placeholder问题
    if ($('.search_select input').val() == '全文内容') {
        $('.searchMid .placeholder').text('请输入查询条件');
        $('.upfileWrap').show();
    } else {
        $('.searchMid .placeholder').text('请输入查询条件');
        $('.upfileWrap').hide();
    }
})

//win7+
$('.advanChrome').on('click', function() {
    window.open("http://" + ip + "/caa_v3.0/search/downloadBrowser?browsername=" + encodeURI(encodeURI("ChromeStandalone_63.0.3239.108_Setup.exe")));
    // $('.mask').addClass('hide');
    // $('.download_chrome').addClass('hide');
})
//winXp
$('.XpChrome').on('click', function() {
    window.open("http://" + ip + "/caa_v3.0/search/downloadBrowser?browsername=" + encodeURI(encodeURI("49.0.2623.112_chrome_installer.exe")));
    // $('.mask').addClass('hide');
    // $('.download_chrome').addClass('hide');
})


//点击关闭 下载浏览器 
$('#closeChroBox').on('click', function() {
    $('.mask').addClass('hide');
    $('.download_chrome').addClass('hide');
})

//点击其他地方隐藏下拉框
$(document).click(function() {
    $('.search_select').removeClass('search_select_hover');
    $(".dropDown_box").stop().slideUp(300);
    $(".search_menu").stop().slideUp(300);
    $('.search_select').children('i').replaceWith('<i class="fa fa-angle-down"></i>');
})
//下拉框
$('.search_select').on('click', function(e) {
    $(this).addClass('search_select_hover');
    $(".dropDown_box").stop().slideUp(300);
    $(".search_menu").stop().slideToggle(300);
    stopPropagation(e);
});


//选中li改变input值
$('.search_menu ul li').on('click', function(e) {
    stopPropagation(e);

    ifIsFileUpload = false; //不是文件上传

    $(this).parent().parent().siblings('.search_select').children('input').val($(this).text());
    $(this).parent().parent().siblings('.search_select').children('i').replaceWith('<i class="fa fa-angle-down"></i>');
    $(this).parent().parent().slideUp(300);
    e.stopPropagation();

    $('.search_ipt').removeAttr('readonly');
    $(".search_ipt").val(''); //清空搜索框
    $('.upfileWrap #upFile').val(''); //清空文件
    $('.ul_shade ul').empty();

    if ($(this).children('a').text() == '全文内容') {
        $('.searchMid .placeholder').text('请输入查询条件');
        $('.upfileWrap').show();
    } else {
        $('.searchMid .placeholder').text('请输入查询条件');
        $('.upfileWrap').hide();
    }

    $('.dropDown_box').hide();
});

//全文内容
$(".search_ipt").on('input propertychange', function(e) {
    stopPropagation(e);

    ifIsFileUpload = false; //不是文件上传

    cur = -1; //重置上下键标志

    if (!trim($(this).val())) {
        $(".dropDown_box").slideUp(300);
    }

    if (trim($(this).val()) && isChinese(trim($(this).val()))) {
        var jsonData = {
            'keyword': trim($(this).val()),
            "queryfields": ["casecause", "case_feature", "dispute_focus", "involved_person", "lawyer", "judge"]
        };

        if ($('.search_select input').val() == '全文内容') {
            jQuery.support.cors = true;
            $.ajax({
                type: 'post',
                url: 'http://' + ip + '/caa_v3.0/search/relatedWord',
                data: JSON.stringify(jsonData),
                dataType: 'json',
                contentType: 'application/json',
                success: function(data) {
                    // console.log(data);
                    var sortArr = [{
                            'casecause': '案由'
                        }, { 'dispute_focus': '争议焦点' }, { 'case_feature': '案情特征' }, { 'involved_person': '当事人' }, { 'lawyer': '律师' }, { 'judge': '法官' }],
                        kong = render_dropDown_box(sortArr, data), //动态生成下拉框
                        dispute_focus_li = []; //争议焦点也显示为案情特征，且先取争议焦点，不够五个再用案情特征
                    for (var i = 0; i < $('.ul_shade li').length; i++) {
                        if ($('.ul_shade li').eq(i).children('span').text() == '案情特征') {
                            dispute_focus_li.push($('.ul_shade li').eq(i));
                        }
                    }
                    // console.log(dispute_focus_li)
                    for (var i = 0, l = dispute_focus_li.length; i < l; i++) {
                        if (i > 4) {
                            dispute_focus_li[i].remove();
                        }
                    }
                    // console.log(kong);

                    // 六种类别都没数据不显示下拉框
                    if (kong == 6) {
                        $('.dropDown_box').hide();
                        return false;
                    }

                    // var li_length = $('.ul_shade>ul>li').length;
                    // console.log(li_length);
                    // var li_height = $('.ul_shade>ul>li').eq(0).height();
                    // console.log(li_height);
                    // if (li_length > 10) {
                    // console.log(11)
                    // $('.ul_shade').css('height', 10 * li_height + 'px');
                    // } else {
                    // console.log(9)
                    // $('.ul_shade').css('height', li_length * li_height + 'px');
                    // }

                    if ($(".search_ipt").val() != undefined && $(".search_ipt").val().length > 0) {
                        $(".dropDown_box").slideDown(300);
                    }
                },
                error: function(error) {
                    $('.dropDown_box').hide();
                }
            })
        }
    }
});



function render_dropDown_box(sortArr, data) {
    var li = '<div class="ul_shade"><ul>',
        kong = 0; //避免没数据还显示
    for (var i = 0, l = sortArr.length; i < l; i++) {
        for (var k in sortArr[i]) {
            var arr = data[k];

            if (arr.length > 0) {
                var arr_five = arr_unique(arr).slice(0, 5);
                // console.log(arr_five);
                for (var j = 0, n = arr_five.length; j < n; j++) {
                    if (k == "case_feature") { //案情特征插入到争议焦点中，先显示争议焦点的数据，不够5个用案情特征凑
                        li += '<li class="' + k + '"><span>' + '案情特征' + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_five[j].substring(arr_five[j].lastIndexOf('/') + 1) + '</span></a></li>';
                    } else if (k == "dispute_focus") {
                        li += '<li class="' + k + '"><span>' + '案情特征' + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_five[j] + '</span></a></li>';
                    } else {
                        li += '<li class="' + k + '"><span>' + sortArr[i][k] + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_five[j] + '</span></a></li>';
                    }
                }
            } else {
                kong++;
            }
        }
    }
    li += '</ul></div>';
    $('.dropDown_box').html(li);

    return kong;
}

//全文内容下拉列表点击
$('.dropDown_box').on('click', 'li', function(e) {
    stopPropagation(e);

    ifIsFileUpload = false; //不是文件上传

    var index = $(this).attr('class').indexOf(" "),
        key,
        value;
    if (index > 0) {
        key = $(this).attr('class').slice(0, index);
    } else {
        key = $(this).attr('class');
    }

    value = $(this).find('.item').attr('title');

    //  $(".dropDown_box").stop().slideUp(300);

    openWindow(key, value);
})
//上下键选取
$('.search_ipt').on('keydown', function(e) {
    var as = $('.ul_shade>ul>li');
    if (as.length > 0) {
        checkKeyCode(e, as, 'drop-li-active', 'item', 'dropDown_box ul', 38);
    }
})

/* 上传文件 */
var fileBackData = ''; //上传文件返回的数据
var filename = '',
    fullName = '',
    fileExt = '';
//点击时还原  IE 火狐 谷歌 file不一致
$('.upfileWrap1 ').on('click', '#upFile', function() {
    ifIsFileUpload = false; //不是文件上传（不选取文件也属于）
    $(this).val(''); //没有选取文件时清空
    $('.search_ipt').val('');
    $('.search_ipt').removeAttr('readonly');
    $(".searchMid .placeholder").show();
})

$('.upfileWrap1 ').on('change', '#upFile', function() { //不管有没有点击确定  浏览器会默认删除 val

    if (!$(this).val()) {
        ifIsFileUpload = false; //不是文件上传（不选取文件也属于）
        return false;
    }

    $('.ul_shade ul').empty();

    filename = $(this).val(), //文件名包括磁盘地址
        fullName = GetFileName(filename), //文件名包括后缀
        fileExt = GetFileExt(filename), //后缀名
        fileType_array = ['.doc', '.docx', '.txt'];

    if (fileType_array.indexOf(fileExt) == -1) {
        alert('只允许上传doc、docx、txt类型文件');

        $('.upfileWrap #upFile').remove();
        var fileEle = '上传<input type="file" name="upFile" id="upFile" accept=".doc,.docx,.txt" >';
        $('.upfileWrap').html(fileEle);

        ifIsFileUpload = false; // 不是这四种类型文件    等于   不是文件上传
        return false;
    }
    $(".searchMid .placeholder").hide();

    $('.shade').show();

    ifIsFileUpload = true; //是文件上传

    $('.search_ipt').val(fullName);
    $('.search_ipt').attr('readonly', 'readonly');

    if (window.FormData) { //支持FormData （ IE10+ ）
        var formData = new FormData();
        formData.append("file", $(".upfileWrap1 #upFile")[0].files[0]);
        formData.append("name", "/upload" + fullName);

        window.open("checkResult.html?name="+fullName,"_self");
       /* var url = 'http://' + ip + '/caa_v3.0/search/documentAnalyseByFile';
        $.ajax({
            url: url,
            type: 'post',
            data: formData,
            cache: false,
            // 告诉jQuery不要去处理发送的数据
            processData: false,
            // 告诉jQuery不要去设置Content-Type请求头
            contentType: false,
            // crossDomain: true == !(document.all),

            success: function(data) {

                fileBackData = data.condition;
                // console.log(fileBackData);
                $('.shade').hide();

                //              $('.upfileWrap #upFile').val('');
                $('.upfileWrap #upFile').remove();
                var fileEle = '上传<input type="file" name="upFile" id="upFile" accept=".doc,.docx,.txt" >';
                $('.upfileWrap').html(fileEle);
            },
            error: function(error) {

                $('.shade').hide();
                // console.log('获取失败');
            }
        });*/
    } else { //不支持FormData ( IE 8 9 )
        jQuery.support.cors = true;
        var uuid = getuuid();
        upload(uuid);
    }

})

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function getuuid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}

function aajax(uuid) {
    $.ajax({
        url: 'http://' + ip + '/caa_v3.0/search/getFeatureForIE89',
        type: 'post',
        dataType: 'json',
        data: { fileName: $(".upfileWrap #upFile").val(), uuid: uuid },
        success: function(data) {
            fileBackData = data.condition;
            ifIsFileUpload = true; //是文件上传
            $('.shade').hide();
            $('.upfileWrap #upFile').val('');
            $('.upfileWrap #upFile').remove();
            var fileEle = '上传<input type="file" name="upFile" id="upFile" accept=".doc,.docx,.txt" >';
            $('.upfileWrap').html(fileEle);
        },
        error: function(error) {
            $('.shade').hide();
        }
    });
}

function upload(uuid) {
    var form = $("#fileForm");
    var ajaxFormOption = {
        type: "post", //提交方式 
        dataType: "text",
        secureuri: false,
        data: { fileName: $(".upfileWrap #upFile").val(), uuid: uuid }, //自定义数据参数，视情况添加
        url: "http://" + ip + "/caa_v3.0/search/uploadFileForIE89", //请求url 
        success: function(data) { //提交成功的回调函数 
            aajax(uuid);
        },
        error: function(XmlHttpRequest, textStatus, e) {
            $('.shade').hide();
        }
    };

    form.ajaxSubmit(ajaxFormOption);
}

// 检索按钮
$('#searchBtn').on('click', function() {
    wordSearch();
});
//回车键检索
$(document).keydown(function(e) {
    e = e || window.event;
    keyCode = e.keyCode || e.which
    if (keyCode == 13) {
        if (!$(".mask").hasClass('hide') || !$(".login_box").hasClass('hide')) {
            return false;
        }
        if ($('.drop-li-active').length > 0) return false; //避免回车产生冲突

        $('.upfileWrap #upFile').attr('disabled', 'false');
        wordSearch();
    }
})

function wordSearch() {
    var key = $('.searchTitle span.active').html(),
        value = $('.search_ipt').val();
    if (!trim($('.search_ipt').val())) {
        alert("请输入检索关键词！")
        return false;
    }

/*新增检索事件的跳转方法*/
    switch (key){
        case "合同查询":
            window.open("result.html?key="+value,"_self");
            break;
        case "构想查询":
            window.open( "resultidea.html?key="+value,"_self");
            break;
        case "人员/机构查询":
            window.open("result.html?key="+value,"_self");
            break;
    }

    /*if (key == '全文内容') {
        if (ifIsFileUpload) {

            var caseid = fileBackData ? (fileBackData.caseid ? fileBackData.caseid[0] : '') : '';
            var tmptObj_or = {
                condition: {
                    orcondition: fileBackData
                },
                flag: 1,
                filename: fullName,
                caseid: caseid
            }
            if (tmptObj_or) {
                if (tmptObj_or.condition) {
                    if (tmptObj_or.condition.orcondition) {
                        if (tmptObj_or.condition.orcondition.caseid) {
                            delete tmptObj_or.condition.orcondition.caseid;
                        }
                    }
                }
            }
            var date = new Date().getTime();
            //console.log(tmptObj_or)
            // store.set('CONDITION_' + date, tmptObj_or);
            sessionCont.setSession('CONDITION_' + date, tmptObj_or);

            window.location.href = "result.html?caa_id=" + date;

        } else {
            if ($('.search_ipt').val()) {
                var CONDITION = {
                    commonfields: [trim($('.search_ipt').val())]
                };

                var tmptObj_ar = {
                    condition: {
                        andcondition: CONDITION,
                        flag: 0
                    }
                };
                var date = new Date().getTime();
                // store.set('CONDITION_' + date, tmptObj_ar);
                sessionCont.setSession('CONDITION_' + date, tmptObj_ar);
                window.location.href = "result.html?caa_id=" + date;
            }
        }
        return false;
    }*/


    /*switch (key) {
        case '本院认为':
            openWindow('court_consider', value);
            break;
        case '裁判结果':
            openWindow('judge_decision', value);
            break;
        case '本院查明':
            openWindow('court_ascertained', value);
            break;
        case '当事人':
            openWindow('involved_person', value);
            break;
        case '审理经过':
            openWindow('trialprocess', value);
            break;
        case '诉称':
            openWindow('appellant_opinion', value);
            break;
        case '辩称':
            openWindow('defender_opinion', value);
            break;
        default:
            // statements_def
            break;
    }*/
}

function openWindow(key, value) {
    // $('.dropDown_box').empty(); //清空  解决IE8 下拉框 页面后退时不会隐藏
    $('.dropDown_box').hide(); //解决IE8 下拉框 页面后退时不会隐藏
    if (!trim(value)) {
        return false;
    }
    var CONDITION = {};
    CONDITION[key] = [trim(value)];

    var tmptObj_ar = {
        condition: {
            andcondition: CONDITION,
            flag: 0
        }
    }

    var date = new Date().getTime();
    // store.set('CONDITION_' + date, tmptObj_ar);
    sessionCont.setSession('CONDITION_' + date, tmptObj_ar);
    window.location.href = "result.html?caa_id=" + date;
}


/*控制输入框样式开始*/
$('.search_ipt').on('focus', function() {
    $(this).parent().addClass('search_ipt_focus')
})

$('.search_ipt').on('blur', function() {
    $(this).parent().removeClass('search_ipt_focus')
})

/*$('.searchMid').on('mouseenter',function(){
    $(this).addClass('search_ipt_hover')
})

$('.searchMid').on('mouseleave',function(){
    $(this).removeClass('search_ipt_hover')
})*/
/*控制输入框样式结束*/