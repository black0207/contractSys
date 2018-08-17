// var ip = '192.168.10.204';
// var ip = '192.168.10.111:8083';
//var ip = '192.168.10.111:8084';
var ip = document.location.host;
var arrayArr = ["commonfields", "case_feature", "dispute_focus", "applicable_law",
    "court", "courtlevel", "judgedate", "doctype", "casetype", "proceduretype",
    "defender_opinion", "defender_opinion", "third_opinion", "trialprocess", "trialprocess", "court_ascertained",
    "court_consider", "judge_decision", "prosecutor", "appellant_opinion", "plaintiff", "defendant", "thirdparty", "appellant",
    "appellee", "proposer", "respondent", "executor", "executee", "chiefjudge", "assistantjudge",
    "chiefexecutiveofficer", "executiveofficer", "executiveofficer", "assistantofficer", "plaintiff_lawyer",
    "defendant_lawyer", "flag", "casecause", "caseid", "filename", "involved_person", "lawyer", "judge", "caa_id"
]; //ËÑË÷´ÊÌõ
var stringArr = ["casecause", "caseid"];
var loacal = ["caa_id", "caa_id_back","ajbs","area"];

// ÓÃ»§ÊÖ²áÏÂÔØ
$(function() {
    $('#userManual').attr('href', 'http://' + ip + '/caa_v3.0/search/downloadGuide');
})


// sessionStorage操作
var sessionCont = {
    // 设置session
    setSession: function(key, value) {
        window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    // 获取session
    getSession: function(key) {
        if (window.sessionStorage.getItem(key)) {
            return JSON.parse(window.sessionStorage.getItem(key));
        } else {
            return '';
        }
    },
    // 删除session
    removeSession: function(key) {
        if (window.sessionStorage.getItem(key)) {
            window.sessionStorage.removeItem(key)
        }
    },
    // 清除session
    clearSession: function() {
        window.sessionStorage.clear();
    }
}


function Request() {
    var strHref = decodeURI(window.document.location.href);
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var result = {};
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp != undefined && arrTemp[0] != "") {
            if ($.inArray(arrTemp[0], loacal) != -1) {
                result[arrTemp[0]] = stringToArray(arrTemp[1]);
            }
            /*           if ($.inArray(arrTemp[0], stringArr) != -1) {
                           result[arrTemp[0]] = arrTemp[1];
                       } else if ($.inArray(arrTemp[0], arrayArr) != -1) {
                           result[arrTemp[0]] = stringToArray(arrTemp[1]);
                       }*/
        }
    }
    return result;
}

function stringToArray(string) {
    var arr = new Array();

    if (string.indexOf(',') == -1) {
        arr.push(string);
        return arr;
    } else {
        arr = string.split(',');
        return arr;
    }
}

function replaceBTag(str) {
    return str.replace(/<b>|<\/b>/g, "");
}

//È¥±êÇ©
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//¼ì²âÎªºº×Ö
function isChinese(val) {
    // var reg = /[^/u4e00-/u9fa5]/;
    var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
    if (reg.test(val)) return true;
    return false;
}

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

function isString(str) {
    return (typeof str == 'string') && str.constructor == String;
}

function BTagFilter(obj) {
    var result = {};
    if (isArray(obj)) {
        result = obj;
    }
    if (isString(obj)) {
        var obj_noB = replaceBTag(obj).replace(/\s/g, "");
        var obj_arr = (obj_noB.substring(1, obj_noB.length - 1)).split(",");
        result = obj_arr;
    }
    return result;
}

function checkdata(string) {
    var re = /[\u4e00-\u9fa5_a-zA-Z0-9]+/;
    if (re.test(string)) {
        return true;
    } else {
        return false;
    }
}


var down_type;

function download(url, params, params_new) { //ÏÂÔØÎÄÊé
    var dts = $.Deferred();

    var $get_statisDownloadDocument = function() {
        var dtd = $.Deferred();
        $.ajax({
            type: "POST",
            url: url,
            data: params
        }).then(function(data, response, status, request) { //success

            /*    var form = $('<form method="POST" action="' + url + '">');
                $.each(params, function (k, v) {
                    form.append($('<input type="hidden" name="' + k + '" value="' + v + '">'));
                });
                $('body').append(form);
                form.submit(); //×Ô¶¯Ìá½»*/
            //window.open(url+"?uniqid="+encodeURI(encodeURI("0b1a9a0b-ee8b-4688-a6fd-4825e286d09a"))+"&userid=eaec7c71095d4f269f2a826b5d30edb9");
            //window.open(url + "?uniqid=" + encodeURI(encodeURI(params.uniqid)) + "&userid=" + params.userid);
            var urls=url + "?uniqid=" + encodeURI(encodeURI(params.uniqid)) + "&userid=" + params.userid;
            var a = document.createElement("a");
            a.setAttribute("href", urls);
            a.setAttribute("target", "_self");
            a.setAttribute("id", "openwin");
            document.getElementById('iframe').appendChild(a);
            a.click();
            down_type = data;
            dtd.resolve(data);
        }, function(data) { //error
            // console.log("ÏÂÔØÊ§°Ü!");
        });
        return dtd.promise();
    };
    $.when($get_statisDownloadDocument())
        .then(function(data) {
            $.ajax({
                    type: "POST",
                    url: 'http://' + ip + '/caa_v3.0/search/statisDownloadDocument',
                    data: JSON.stringify(params_new),
                    dataType: 'json',
                    contentType: 'application/json'
                })
                .then(function(data) {
                    down_type = data.resultcode;
                    dts.resolve(data);
                }, function(data) {
                    var er = data;
                })
        }, function() {
            /*error*/
        });
    return dts.promise();
}

var down_de = function(obj) {
    var id = $(obj).parents('.result_item').attr('id').substring($(obj).parents('.result_item').attr('id').lastIndexOf("_") + 1);
    var new_param = {};
    var itss = ["uniqid", "title", "casecause", "court", "judgedate", "caseid"];
    for (var fe in result_item_s[id]) {
        if (fe == "casecause") {
            result_item_s[id][fe] = result_item_s[id][fe].replace(/<b>|<\/b>/g, "");
        }
        if ($.inArray(fe, itss) != -1) {
            new_param[fe] = result_item_s[id][fe];
        }
    }
    new_param.userid = user.userid;
    return new_param;
};

var collect_type;

function collect(url, params) {
    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(params),
        async: false,
        dataType: 'json',
        contentType: 'application/json',
        success: function(data) {
            collect_type = data.resultcode;
        }
    });
}

// Êý×éÈ¥ÖØ
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

function getUserMFromStorage() {
    if (window.localStorage.getItem('userInfo')) {
        return JSON.parse(window.localStorage.getItem('userInfo'));
    } else {
        return {};
    }
}

function getstatisCondition(condition, type, user) {

    var condi = JSON.parse(JSON.stringify(condition));
    condi.type = type;
    if (user != undefined)
        condi.userid = user;
    else {
        condi.userid = "-1";
    }
    $.ajax({
        type: 'POST',
        url: 'http://' + ip + '/caa_v3.0/search/statisCondition',
        async: false,
        data: JSON.stringify(condi),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function(data) {
            /* console.log(data);*/
        },
        complete: function(data) {},
        error: function() {
            // console.log("²éÑ¯Ìõ¼þÍ³¼ÆÊ§°Ü£¡");
        }
    });
}

function getUidByCookie() {
    if ($.cookie('USERINFO') == 'null') {
        // console.log('Îª¿Õ')
    } else if ($.cookie('USERINFO') == undefined) {
        // console.log('Îª¿Õ');
    } else {
        return JSON.parse($.cookie('USERINFO'));
        // return JSON.parse(decodeURI($.cookie('USERINFO')));
    }
}

//Î¯ÍÐ
var body = $('body');
var body_on = function(operate, selector_name, function_name) {
    $(body).on(operate, selector_name, function_name);
};

//ÎÊÌâÖ¸ÄÏÌø×ªÐÂÒ³Ãæ
$(".questions a").attr("target", '_blank');

var bigger = function(array) {
    var n = 0;
    var a = array[n];
    for (var i = 0; i < 4; i++) {
        if (array[i] < a) {
            n = i;
            a = array[i];
        }
    }
    return n;
};
/*
document.onselectstart = function(){
    event.returnValue = false;
document.oncopy = function () {
    event.returnValue = false;
}
}*/

var law_trans = function(search_data) {
    var judge_member = [];
    var court = [];
    var involved_person = [];
    var involved_ = [];
    var involved_court = [];
    if (search_data['condition'] != undefined) {
        if (search_data["condition"]["orcondition"] != undefined) {
            var data_judge = search_data["condition"]["orcondition"]["judge"]; //·¨Ôº×ª»»
            var data_involved_person = search_data["condition"]["orcondition"]["lawyer"];
        } else {
            var data_judge = search_data["condition"]["andcondition"]["judge"]; //·¨Ôº×ª»»
            var data_involved_person = search_data["condition"]["andcondition"]["lawyer"]; //ÂÉÊ¦×ª»»

        }
    } else {
        search_data['condition'] = {};
    }
    if (data_involved_person != undefined) {
        for (var c = 0, lenc = data_involved_person.length; c < lenc; c++) {
            involved_.push(data_involved_person[c].substring(0, data_involved_person[c].lastIndexOf("(")));
            involved_court.push(data_involved_person[c].substring(data_involved_person[c].lastIndexOf("(") + 1, data_involved_person[c].lastIndexOf(")")));
        }
        delete search_data["condition"]["andcondition"]["lawyer"];
        involved_person = involved_.concat(involved_court);
        if (search_data["condition"]["andcondition"].involved_person != undefined) {
            search_data["condition"]["andcondition"].involved_person = search_data["condition"]["andcondition"].involved_person.concat(involved_person);
        } else {
            search_data["condition"]["andcondition"].involved_person = involved_person
        }
    }
    if (data_judge != undefined) {
        for (var b = 0, lenb = data_judge.length; b < lenb; b++) {
            judge_member.push(data_judge[b].substring(0, data_judge[b].lastIndexOf("(")));
            court.push(data_judge[b].substring(data_judge[b].lastIndexOf("(") + 1, data_judge[b].lastIndexOf(")")));
        }
        delete search_data["condition"]["andcondition"]["judge"];
        search_data["condition"]["andcondition"].judge_member = judge_member;
        search_data["condition"]["andcondition"].court = court;
    }
    return search_data;
};

//È¥³ýÁ½¶Ë¿Õ¸ñ
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(elt /*, from*/ ) {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0) ?
            Math.ceil(from) :
            Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++) {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

if (!Array.prototype.lastIndexOf) {
    Array.prototype.lastIndexOf = function(searchElement /*,fromIndex*/ ) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var n, k,
            t = Object(this),
            len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }

        n = len - 1;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) {
                n = 0;
            } else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        for (k = n >= 0 ?
            Math.min(n, len - 1) :
            len - Math.abs(n); k >= 0; k--) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}

if (!String.prototype.lastIndexOf) {
    String.prototype.lastIndexOf = function(searchElement, fromIndex) {
        'use strict';

        if (this === void 0 || this === null) {
            throw new TypeError();
        }

        var n, k,
            t = Object(this),
            len = t.length >>> 0;
        if (len === 0) {
            return -1;
        }

        n = len - 1;
        if (arguments.length > 1) {
            n = Number(arguments[1]);
            if (n != n) {
                n = 0;
            } else if (n != 0 && n != (1 / 0) && n != -(1 / 0)) {
                n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
        }

        for (k = n >= 0 ?
            Math.min(n, len - 1) :
            len - Math.abs(n); k >= 0; k--) {
            if (k in t && t[k] === searchElement) {
                return k;
            }
        }
        return -1;
    };
}
//var browser=navigator.appName;
//var b_version=navigator.appVersion;
//var version=b_version.split(";");
//var trim_Version=version[1].replace(/[ ]/g,"");
//if(browser=="Microsoft Internet Explorer" && trim_Version<="MSIE9.0" && trim_Version!="MSIE10.0")
//{
//    $(".placeholder").show();
//    var temp="";
//$("body").on("focus","input",function () {
//    $(this).siblings(".placeholder").hide();
//})
//
//    $("body").on("blur",'input',function () {
//        var v=$(this).val();
//        if(temp==v){
//            $(this).siblings(".placeholder").show();
//        }
//    })
//
//$("body").on('click','.placeholder',function () {
//    $(this).siblings("input").trigger('focus');
//});
//
//}
//
////Õë¶ÔÊ×Ò³µÄä¯ÀÀÆ÷¼ì²â
//function myBrowser() {
//    var userAgent = navigator.userAgent; //È¡µÃä¯ÀÀÆ÷µÄuserAgent×Ö·û´®
//    var isOpera = userAgent.indexOf("Opera") > -1; //ÅÐ¶ÏÊÇ·ñOperaä¯ÀÀÆ÷
//    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera; //ÅÐ¶ÏÊÇ·ñIEä¯ÀÀÆ÷
//    var isFF = userAgent.indexOf("Firefox") > -1; //ÅÐ¶ÏÊÇ·ñFirefoxä¯ÀÀÆ÷
//    var isSafari = userAgent.indexOf("Safari") > -1; //ÅÐ¶ÏÊÇ·ñSafariä¯ÀÀÆ÷
//    if (isIE) {
//        var IE5 = IE55 = IE6 = IE7 = IE8 = IE9 = IE10 = false;
//        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
//        reIE.test(userAgent);
//        var fIEVersion = parseFloat(RegExp["$1"]);
//        IE55 = fIEVersion == 5.5;
//        IE6 = fIEVersion == 6.0;
//        IE7 = fIEVersion == 7.0;
//        IE8 = fIEVersion == 8.0;
//        IE9 = fIEVersion == 9.0;
//        IE10 = fIEVersion == 10.0;
//        if (IE55) {
//            return "IE55";
//        }
//        if (IE6) {
//            return "IE6";
//        }
//        if (IE7) {
//            return "IE7";
//        }
//        if (IE8) {
//            return "IE8";
//        }
//        if (IE9) {
//            return "IE9";
//        }
//        if (IE10) {
//            return "IE10";
//        }
//
//
//    } //isIE end
//    if (isFF) {
//        return "FF";
//    }
//    if (isOpera) {
//        return "Opera";
//    }
////}
//function isIE(){
//  var brotype = myBrowser();
//    if ( brotype == "IE8" || brotype == "IE9") {
var temp = "";
$("body").on("focus", "input", function() {
    $(this).siblings(".placeholder").hide();
})

$("body").on("blur", 'input', function() {
    var v = $(this).val();
    if (temp == v) {
        $(this).siblings(".placeholder").show();
    }
})

$("body").on('click', '.placeholder', function() {
    $(this).siblings("input").trigger('focus');
});

$("body").on('click', '.closeBtn', function() {
    $(".login_cont .placeholder").show();
});
//}
//}
//isIE();
function IEVersion() {
    var userAgent = navigator.userAgent; //È¡µÃä¯ÀÀÆ÷µÄuserAgent×Ö·û´®
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //ÅÐ¶ÏÊÇ·ñIE<11ä¯ÀÀÆ÷
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //ÅÐ¶ÏÊÇ·ñIEµÄEdgeä¯ÀÀÆ÷
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 7) {
            return 7;
        } else if (fIEVersion == 8) {
            return 8;
        } else if (fIEVersion == 9) {
            return 9;
        } else if (fIEVersion == 10) {
            return 10;
        } else {
            return 6; //IE°æ±¾<=7
        }
    } else if (isEdge) {
        return 'edge'; //edge
    } else if (isIE11) {
        return 11; //IE11
    } else {
        return -1; //²»ÊÇieä¯ÀÀÆ÷
    }
}