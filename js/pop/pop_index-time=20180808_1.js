//通过按上下键 下拉列表 移动高亮
function checkKeyCode(e, as, className, child, ul_name, li_height) {

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

                var text = '';
                if (child) { //区分是首页还是案由选择页
                    var index = $('.' + className).attr('class').indexOf(" ");
                    // console.log(index)
                    var key = $('.' + className).attr('class').slice(0, index),
                        text = $('.' + className).find('.' + child).text();
                    // console.log(key)
                    // console.log(text)
                    openWindow(key, text);
                } else {
                    text = $('.' + className).text();
                    url_To_New_Html(text, data);
                }
            }
            break;
    }
}

//针对首页的浏览器检测
function myBrowser() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1; //判断是否Opera浏览器
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //判断是否IE浏览器
    var isFF = userAgent.indexOf("Firefox") > -1; //判断是否Firefox浏览器
    var isSafari = userAgent.indexOf("Safari") > -1; //判断是否Safari浏览器
    if (isIE) {
        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = false;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        IE55 = fIEVersion == 5.5;
        IE6 = fIEVersion == 6.0;
        IE7 = fIEVersion == 7.0;
        IE8 = fIEVersion == 8.0;
        IE9 = fIEVersion == 9.0;
        IE10 = fIEVersion == 10.0;
        if (IE55) {
            return "IE55";
        }
        if (IE6) {
            return "IE6";
        }
        if (IE7) {
            return "IE7";
        }
        if (IE8) {
            return "IE8";
        }
        if (IE9) {
            return "IE9";
        }
        if (IE10) {
            return "IE10";
        }


    } //isIE end
    if (isFF) {
        return "FF";
    }
    if (isOpera) {
        return "Opera";
    }
}

//判断浏览器类型
function getBrowser(getVersion) {
    //注意关键字大小写
    var ua_str = navigator.userAgent.toLowerCase(),
        ie_Tridents, trident, match_str, ie_aer_rv, browser_chi_Type;

    //判断IE 浏览器, 
    if ("ActiveXObject" in self) {
        // ie_aer_rv:  指示IE 的版本.
        // It can be affected by the current document mode of IE.
        ie_aer_rv = (match_str = ua_str.match(/msie ([\d.]+)/)) ? match_str[1] :
            (match_str = ua_str.match(/rv:([\d.]+)/)) ? match_str[1] : 0;

        // ie: Indicate the really version of current IE browser.
        ie_Tridents = { "trident/7.0": 11, "trident/6.0": 10, "trident/5.0": 9, "trident/4.0": 8 };
        //匹配 ie8, ie11, edge
        trident = (match_str = ua_str.match(/(trident\/[\d.]+|edge\/[\d.]+)/)) ? match_str[1] : undefined;
        browser_chi_Type = (ie_Tridents[trident] || ie_aer_rv) > 0 ? "ie" : undefined;
    } else {
        //判断 windows edge 浏览器
        // match_str[1]: 返回浏览器及版本号,如: "edge/13.10586"
        // match_str[1]: 返回版本号,如: "edge" 

        //若要返回 "edge" 请把下行的 "ie" 换成 "edge"。 注意引号及冒号是英文状态下输入的
        browser_chi_Type = (match_str = ua_str.match(/edge\/([\d.]+)/)) ? "ie" :
            //判断firefox 浏览器
            (match_str = ua_str.match(/firefox\/([\d.]+)/)) ? "firefox" :
            //判断chrome 浏览器
            (match_str = ua_str.match(/chrome\/([\d.]+)/)) ? "chrome" :
            //判断opera 浏览器
            (match_str = ua_str.match(/opera.([\d.]+)/)) ? "opera" :
            //判断safari 浏览器
            (match_str = ua_str.match(/version\/([\d.]+).*safari/)) ? "safari" : undefined;
    }

    //返回浏览器类型和版本号

    var verNum, verStr;

    verNum = trident && ie_Tridents[trident] ? ie_Tridents[trident] : match_str[1];

    verStr = (getVersion != undefined) ? browser_chi_Type + "/" + verNum : browser_chi_Type;
    return verStr;
}

//通过类名获取元素的 兼容写法
function getElementsByClassName(node, className) {
    if (node.getElementsByClassName) {
        // 使用现有方法
        return node.getElementsByClassName(className);
    } else {
        // 循环遍历所有标签，返回带有相应类名的元素
        var results = [],
            elems = node.getElementsByTagName("*");
        for (var i = 0, len = elems.length; i < len; i++) {
            if (elems[i].className.indexOf(className) != -1) {
                results[results.length] = elems[i];
            }
        }
        return results;
    }
}
// 数组去重
function arr_unique(arr) {
    var res = [];
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
            res.push(arr[i]);
            obj[arr[i]] = 1;
        } else {
            obj[arr[i]]++
        }
    }

    return res;
}

//去除两端空格
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//截取地址栏
function Request3(strName) {
    var strHref = decodeURI(window.document.location.href);
    var intPos = strHref.indexOf("?");
    var endPos = strHref.indexOf("#");
    var strRight = endPos == -1 ? strHref.substr(intPos + 1) : strHref.substring(intPos + 1, endPos);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        // console.log(arrTmp[i].replace(/=/,' '))
        var arrTemp = arrTmp[i].replace(/=/,' ').split(" ");
        if (arrTemp[0] == strName) {
            return arrTemp[1];
        }
    }
    return "";
}

//判断是不是汉字
function isChinese(val) {
    // var reg = /[^/u4e00-/u9fa5]/;
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(val)) return true;
    return false;
}

//取文件名 带后缀
function GetFileName(filepath) {
    if (filepath != "") {
        var names = filepath.split("\\");
        return names[names.length - 1];
    }
}

//取文件后缀名
function GetFileExt(filepath) {
    if (filepath != "") {
        var pos = "." + filepath.replace(/.+\./, "");
        return pos;
    }
}

//阻止冒泡的兼容函数
function stopPropagation(e) {
    if (e.stopPropagation) {
        e.stopPropagation()
    } else {
        e.cancelBubble = true;
    }
}

// 判断是否为空
function isHasValue(id, str) {
    var str2 = str || '';
    $(id).parent().siblings('.hints').hide();
    $(id).parent().removeClass('warning_border');

    if ($(id).val()) {
        return true;
    } else {
        $(id).next('i').hide();
        $(id).parent().siblings('.hints').find('span').text(str2);
        $(id).parent().siblings('.hints').show();
        $(id).parent().addClass('warning_border');
        return false;
    }
}

//注册页文本框输入错误提示
function inputFalse(id, str) {
    var str2 = str || '';
    $(id).next('i').hide();
    $(id).parent().siblings('.hints').find('span').text(str2);
    $(id).parent().siblings('.hints').show();
    $(id).parent().addClass('warning_border');
}

//注册页文本框输入正确提示
function inputTrue(id) {
    $(id).next('i').show();
    $(id).parent().siblings('.hints').find('span').text('');
    $(id).parent().siblings('.hints').hide();
    $(id).parent().removeClass('warning_border');
}

//找回密码页文本框输入错误提示
function CP_inputFalse(id, str) {
    var str2 = str || '';
    $(id).siblings('i').hide();
    $(id).parent().siblings('.hints').find('span').text(str2);
    $(id).parent().siblings('.hints').css('visibility', 'visible');
    $(id).parent().addClass('warning_border');
}

//找回密码页文本框输入正确提示
function CP_inputTrue(id) {
    $(id).siblings('i').show();
    $(id).parent().siblings('.hints').find('span').text('');
    $(id).parent().siblings('.hints').css('visibility', 'hidden');
    $(id).parent().removeClass('warning_border');

}