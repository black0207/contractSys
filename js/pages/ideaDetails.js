function getUserInfoByCookie() {
    if ($.cookie('USERINFO')=='null') {
        // console.log('为空')
    }else if($.cookie('USERINFO')==undefined){
        // console.log('为空');
    }else{
        return JSON.parse(($.cookie('USERINFO')));
    }
}
getUserInfoByCookie();
var userInfo=getUserInfoByCookie()==undefined?'':getUserInfoByCookie();
var userid=userInfo.id;
var username=userInfo.username;
var condition = {};
var index = 0;
var similiarCondition = {};
var uniqId = "";
var issecondquery = "";
var caseid = '';
var caa_id = Request2("caa_id");
var title = '', casecause = '', court = '', judgedate = '', caseid = '',judge='';
//目录
//目录显示、隐藏
/*******************目录开始**************************************/



/*******************目录结束**************************************/

function Request2(strName) {
    var strHref = decodeURI(window.document.location.href);
    var intPos = strHref.indexOf("?");
    var endPos = strHref.indexOf("#");
    var strRight = endPos == -1 ? strHref.substr(intPos + 1) : strHref.substring(intPos + 1, endPos);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0] == strName) {
            return arrTemp[1];
        }
    }
    return "";
}

//var arrayArr = ["commonfields", "case_feature", "dispute_focus", "applicable_law",
//                "court", "courtlevel", "judgedate", "doctype", "casetype", "proceduretype",
//                "defender_opinion", "defender_opinion", "third_opinion", "trialprocess", "trialprocess", "court_ascertained",
//                "court_consider", "judge_decision", "prosecutor", "appellant_opinion", "plaintiff", "defendant", "thirdparty", "appellant",
//                "appellee", "proposer", "respondent", "executor", "executee", "chiefjudge", "judge", "assistantjudge",
//                "chiefexecutiveofficer", "executiveofficer", "executiveofficer", "assistantofficer", "plaintiff_lawyer",
//                //"uniqid",
//                "defendant_lawyer"];//所有查询字段
//var stringArr = ["casecause", "caseid"];
//
//function Request() {
//	var strHref = decodeURI(window.document.location.href);
//	var intPos = strHref.indexOf("?");
//	var strRight = strHref.substr(intPos + 1);
//	var result = {};
//	var arrTmp = strRight.split("&");
//	for (var i = 0; i < arrTmp.length; i++) {
//		var eqIndex = arrTmp[i].indexOf("=");
//		var conname = arrTmp[i].substring(0, eqIndex);//键
//		var con = arrTmp[i].substr(eqIndex + 1);//值
//		if (conname == "andcondition") {
//			result["andcondition"] = {};
//			var innerArr = con.substring(1, con.length - 1).split("*");
//			for (var j in innerArr) {
//				var innerArrTemp = innerArr[j].split("=");
//				if (result["andcondition"][innerArrTemp[0]] == undefined) {
//
//					result["andcondition"][innerArrTemp[0]] = [];
//				}
//				// console.log(innerArrTemp[1])
//				var newArr = innerArrTemp[1].split(',');
//				for (var k in newArr) {
//					result["andcondition"][innerArrTemp[0]].push(newArr[k]);
//				}
//			}
//
//		}
//		if (conname == "orcondition") {
//			result["orcondition"] = {};
//			var innerArr = con.substring(1, con.length - 1).split("*");
//			for (var j in innerArr) {
//				var innerArrTemp = innerArr[j].split("=");
//				if (result["orcondition"][innerArrTemp[0]] == undefined) {
//					result["orcondition"][innerArrTemp[0]] = [];
//				}
//				var newArr = innerArrTemp[1].split(',');
//				for (var k in newArr) {
//					result["orcondition"][innerArrTemp[0]].push(newArr[k]);
//				}
//			}
//
//		}
//	}
//	// console.log(result)
//	return result;
//}

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

/******************************文书详情*************************************/
$(document).ready(function () {
    getUidByCookie();
    if (caa_id != undefined && caa_id != "") {
        // condition["condition"] = store.get(caa_id);
        condition["condition"] = window.sessionStorage.getItem(caa_id);
        issecondquery = condition["condition"]["issecondquery"];
    } else {
        condition["condition"] = {};
    }
    uniqId = Request2("uniqid");
    // console.log(condition["condition"])
    if (JSON.stringify(condition['condition']) == '{}') {
        $(".currentPage").text('1');
        $(".allPages").text('1');
    } else {
        var paramUrl = combineCondition(condition);
        // console.log(condition)
        // var adjoinCon = $.extend({}, condition.condition);
        var adjoinCon = JSON.parse(condition.condition);
        adjoinCon["from"] = Request2("offset") - 1;
        adjoinCon["size"] = 3;
        adjoinCase(adjoinCon, paramUrl, issecondquery);
        // console.log(adjoinCon)
    }
    var obj = {};
    var url = 'http://' + ip + '/caa_v3.0/search/documentDetail';
    if(JSON.stringify(condition['condition'])=='{}'){
        obj = {
            'uniqid': uniqId,
        };
    }else{
        if (JSON.stringify(condition['condition']).indexOf('orcondition') == -1) {
            // console.log(condition);
            obj = {
                'condition': adjoinCon["condition"],
                'uniqid': uniqId,
                'issecondquery': adjoinCon["issecondquery"]
            };
        } else {
            caseid = adjoinCon["caseid"];
            obj = {
                'condition': adjoinCon["condition"],
                'uniqid': uniqId,
                'issecondquery': adjoinCon["issecondquery"],
                'caseid': adjoinCon["caseid"]
            };
        }
    }
    //console.log(obj)
    // law_trans(obj)
    jQuery.support.cors = true;
    // $.ajax({
    //     type: 'POST',
    //     url: url,
    //     dataType: 'json',
    //     contentType: "application/json",
    //     // scriptCharset: "UTF-8",
    //     async: false,
    //     data: JSON.stringify(law_trans(obj)),
    //     success: function (data) {
    //
    //         var documentData = JSON.parse(data.result);
    //         // console.log(documentData);
    //         statisDocument(documentData);
    //
    //         title =(documentData.title==undefined|| documentData.title=='')?'':documentData.title;
    //         casecause = (documentData.casecause==undefined||documentData.casecause=='')?'':replaceBTag(documentData.casecause);
    //         // console.log(casecause)
    //         if (casecause == '{}') {
    //             casecause = '';
    //         }
    //         var arrLaw = [];
    //         var html = '';
    //         court = (documentData.court==undefined||documentData.court=='')?'':documentData.court;
    //         judgedate = (documentData.judgedate==undefined||documentData.judgedate=='')?'':documentData.judgedate;
    //         caseid = (documentData.caseid==undefined||documentData.caseid=='')?'':documentData.caseid;
    //         if (documentData.case_feature != undefined && documentData.case_feature.length != 0) {
    //             similiarCondition["case_feature"] = BTagFilter(documentData.case_feature);
    //         }
    //         if (documentData.applicable_law != undefined && documentData.applicable_law.length != 0) {
    //             html += '<p>' + documentData.applicable_law + '</p>';
    //             $(".lawBox").html(html);
    //             var rule = '', article = '';
    //             $(".fg").each(function (key, value) {
    //                 rule = $(value).attr('rule');
    //                 article = $(value).attr('article');
    //                 arrLaw.push(rule + article);
    //             });
    //
    //             similiarCondition["applicable_law"] = arrLaw;
    //
    //         }
    //         if (documentData.dispute_focus != undefined && documentData.dispute_focus.length != 0) {
    //             similiarCondition['dispute_focus'] = BTagFilter(documentData.dispute_focus);
    //
    //         };
    //         if (casecause != undefined && casecause.length != 0) {
    //             similiarCondition['casecause'] = stringToArray(replaceBTag(casecause));
    //
    //         };
    //         // console.log(similiarCondition);
    //         dataDetail(documentData);
    //     },
    //     error: function (error) {
    //         alert("无法获取文书！");
    //     }
    // });

    //判断收藏下载
    if (userid!=undefined) {
        var obj = {"userid": userid, "uniqid": uniqId, "type": "collect"};
        var url = 'http://' + ip + '/caa_v3.0/search/checkDownloadOrCollect';
        jQuery.support.cors = true;
        $.ajax({
            type: 'post',
            url: url,
            data: JSON.stringify(obj),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                // console.log(data);
                if (data.result != '') {
                    $(".collects a").text("已  收藏").css({'lineHeight': '', 'paddingTop': '3px'});
                }
                else {
                    $(".collects a").text("收藏").css({'lineHeight': '40px', 'paddingTop': ''});
                }
                //点击收藏
                $(".collects").click(function () {
                    var obj = {"userid": userid, "uniqid": uniqId, "type": "collect"};
                    var url = 'http://' + ip + '/caa_v3.0/search/checkDownloadOrCollect';
                    jQuery.support.cors = true;
                    $.ajax({
                        type: 'post',
                        url: url,
                        data: JSON.stringify(obj),
                        dataType: 'json',
                        contentType: 'application/json;charset=UTF-8',
                        success: function (data) {
                            if(data.result!=''&&$(".collects a").text()=='收藏'){
                                $(".collects a").text("已  收藏").css({'lineHeight': '', 'paddingTop': '3px'});
                            }else if(data.result!=''&&$(".collects a").text()=='已  收藏'){
                                var url = 'http://' + ip + '/caa_v3.0/search/collectDocument';
                                var recordid = data.result[0].id;
                                var obj = {
                                    "recordid": recordid,
                                    "type": "discollect",
                                    "userid": userid
                                };
                                jQuery.support.cors = true;
                                $.ajax({
                                    type: 'POST',
                                    url: url,
                                    data: JSON.stringify(obj),
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    success: function (data) {
                                        $(".collects a").text("收藏").css({'lineHeight': '40px', 'paddingTop': ''});
                                    },
                                    error: function (error) {
                                        // console.log(error)
                                    }
                                })

                            }
                            else{
                                var url = 'http://' + ip + '/caa_v3.0/search/collectDocument';
                                var params = {
                                    'userid': userid,
                                    'uniqid': uniqId,
                                    'title': title,
                                    'casecause': casecause==undefined?'':casecause,
                                    'court': court==undefined?'':court,
                                    'judgedate': judgedate==undefined?'':judgedate,
                                    'caseid': caseid==undefined?'':caseid,
                                    "type": "collect"
                                };
                                jQuery.support.cors = true;
                                $.ajax({
                                    type: 'POST',
                                    url: url,
                                    data: JSON.stringify(params),
                                    dataType: 'json',
                                    contentType: 'application/json',
                                    success: function (data) {
                                        // console.log(data);
                                        $(".collects a").text("已  收藏").css({'lineHeight': '', 'paddingTop': '3px'});
                                    },
                                    error: function (error) {
                                        // console.log(error)
                                    }
                                });
                            }
                        }
                    });
                });
                //
            }
        })
    }
    else {
        $(".collects a").click(function () {

            $(".loginA").click();
        });
        $(".downloads a").click(function () {
            $(".loginA").click();
        });
    }
});

function adjoinCase(con, param, issecondquery) {
    // console.log(con)
    var url = "http://" + ip + "/caa_v3.0/search/document";
    $(".currentPage").html(con["from"] + 2);
    var isfirst = false;
    if (con["from"] == -1) {
        con["from"] = 0;
        isfirst = true;
    }
    jQuery.support.cors = true;
    $.ajax({
        type: 'POST',
        url: url,
        dataType: 'json',
        contentType: "application/json",
        data: JSON.stringify(law_trans(con)),
        success: function (data) {
            var searchData = JSON.parse(data.result);
            // console.log(data);
            var prevId = "";
            var nextId = "";
            var nextOffset = 0;
            var prevOffset = 0;
            $(".allPages").html(data.count);
            if (isfirst) {
                if (searchData.length > 1) {
                    prevId = searchData[0].uniqid;
                    prevOffset = con["from"];
                    nextId = searchData[1].uniqid;
                    nextOffset = con["from"] + 1;
                } else {
                    prevId = searchData[0].uniqid;
                    prevOffset = con["from"];
                    nextId = searchData[0].uniqid;
                    nextOffset = con["from"];
                }
            } else {
                if (searchData.length > 2) {
                    prevId = searchData[0].uniqid;
                    prevOffset = con["from"];
                    nextId = searchData[2].uniqid;
                    nextOffset = con["from"] + 2;
                } else {
                    prevId = searchData[0].uniqid;
                    prevOffset = con["from"];
                    nextId = searchData[1].uniqid;
                    nextOffset = con["from"] + 1;
                }
            }

            // 点击下一篇
            $("body").on("click", ".next", function () {
                window.location.href = encodeURI("./docDetails.html" + param + "offset=" + nextOffset + "&uniqid=" + nextId);
            });

            // 点击上一篇
            $("body").on("click", ".prev", function () {
                window.location.href = encodeURI("./docDetails.html" + param + "offset=" + prevOffset + "&uniqid=" + prevId);
            });
        }
        , error: function (error) {
            alert("无法获取文书！");
        }
    });
}

/**********************************相似案例*******************************/
//相似案例
////显示隐藏
$(".more_al").on("click", function (e) {
    uniqId = Request2("uniqid");
    issecondquery = condition["condition"]["issecondquery"];
    var paramUrl = "andcondition=" + condition["condition"]["andcondition"];
//	遮罩
    $(".mask").removeClass('hide');
    var w1 = $(window).width();
    $('html').addClass('fancybox-lock-test');
    var w2 = $(window).width();
    $('head').find('style').remove();
    $("<style type='text/css'>.fancybox-right{margin-right:" + (w2 - w1) + "px;}</style>").appendTo("head");
    $('body').addClass('fancybox-right');
    if($(".case_list").text()==''){
        similiarCaseShow(paramUrl);
    }
    //similiarCaseShow(paramUrl);

    $("#case_info").show();
    e.stopPropagation();

});
$("body").on("click", ".closed", function (e) {
    $(".mask").addClass('hide');
    $("#case_info").hide();
    e.stopPropagation();
    $('body').removeClass('fancybox-right');
    $('html').removeClass('fancybox-lock-test');
});

//获取相似案例
function similiarCaseShow() {
    var obj = {
        "condition": {
            "orcondition": similiarCondition
        },
//			"sort": "judgedate",
        "issecondquery": 'true'

    };
    var similiar_caa_id = "CONDITION_" + new Date().getTime();
    // store.set(similiar_caa_id, obj);
    window.sessionStorage.setItem(similiar_caa_id, JSON.stringify(obj));
    obj["from"] = 0;
    obj["size"] = 11;
    // console.log(obj)
    var html = "", html_case_feature = "", html_dispute_focus = "", html_applicable_law = "",
        html_title = "", html_judgedate = "", html_court = "";
    var its = ["title", "case_feature", "dispute_focus", "highlight", "uniqid", "judgedate", "court"];
    var url = 'http://' + ip + '/caa_v3.0/search/similiarCase';
    jQuery.support.cors = true;
    $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: "application/json",
        scriptCharset: "UTF-8",

        beforeSend:function () {
            $(".loading").show();
        },

        complete:function () {
            $(".loading").hide();
        },
        success: function (dataReturn) {
            var dataArr = JSON.parse(dataReturn.result);
            var li = "";
            var data = [];
            var uniqids = uniqId;
            for (var k=0;k<dataArr.length;k++) {
                if (dataArr[k].uniqid != uniqids) {//判断是否有和当前文章一样的uniqid
                    dataArr[k]["offset"] = k;
                    data.push(dataArr[k]);
                    if (data.length >= 10) {
                        break;
                    } else {
                        continue;
                    }
                }
            }
            var index = 1;
            if (dataArr.length <= '1') {
                $("#case_info .case_text").html("暂无相似案例");
                return false;
            }
            // console.log(data)
            for (var i=0;i<data.length;i++) {
                var caseResult = "";//案情特征
                var focusResult = "";//争议焦点
                var title = '';   //标题
                var judgedate = '';//裁判日期
                var court = '';//法院
                if (data[i].case_feature != undefined && data[i].case_feature != "[]" && data[i].case_feature.length != 0) {

                    //案情特征拼接
                    var re_new = new Array();
                    if (typeof data[i].case_feature == 'object') {
                        var rt = new Array();
                        for (var k=0;k< data[i].case_feature.length;k++) {
                            var reitem = data[i].case_feature[k].trim();//去除空白符
                            if ($.inArray(reitem, rt) == -1) {
                                rt.push(reitem);
                                caseResult += '<p>' + reitem.substring(reitem.lastIndexOf('/') + 1) + '</p>'
                            }
                        }
                    }
                    else {
                        var reitem = data[i].case_feature.substring(data[i].case_feature.indexOf('[')+1, data[i].case_feature.indexOf(']'));
                        var reitem_ay = stringToArray(reitem);
                        for (var k=0;k< reitem_ay.length;k++) {
                            var reitem_tri = reitem_ay[k].trim();
                            if (reitem_tri.lastIndexOf('<b>') != -1) {
                                var new_reitem = replaceBTag(reitem_tri);
                                if ($.inArray(new_reitem, re_new) == -1) {
                                    re_new.push(new_reitem);
                                    // console.log('case_feature='+new_reitem.substring(new_reitem.lastIndexOf('/') + 1))
                                    caseResult += '<p><b>' + new_reitem.substring(new_reitem.lastIndexOf('/') + 1) + '</b></p>'
                                }
                            }
                            else {
                                if ($.inArray(reitem_tri, re_new) == -1) {
                                    re_new.push(reitem_tri);
                                    caseResult += '<p>' + reitem_tri.substring(reitem_tri.lastIndexOf('/') + 1) + '</p>'
                                }
                            }
                        }
                    }
                }
                //争议焦点
                if (data[i].dispute_focus != undefined && data[i].dispute_focus != "[]" && data[i].dispute_focus.length != 0) {
                    var re_new = new Array();
                    if (typeof data[i].dispute_focus == 'object') {
                        var rt = new Array();
                        for (var k =0;k< data[i].dispute_focus.length;k++) {
                            var reitem = data[i].dispute_focus[k].trim();//去除空白符
                            if ($.inArray(reitem, rt) == -1) {
                                rt.push(reitem);
                                caseResult += '<p>' + reitem.substring(reitem.lastIndexOf('/') + 1) + '</p>'
                            }
                        }
                    } else {
                        var reitem = data[i].dispute_focus.substring(data[i].dispute_focus.indexOf('['), data[i].dispute_focus.indexOf(']'));
                        var reitem_ay = stringToArray(reitem);
                        for (var k=0;k< reitem_ay.length;k++) {
                            var reitem_tri = reitem_ay[k].trim();
                            if (reitem_tri.lastIndexOf('<b>') != -1) {
                                var new_reitem = replaceBTag(reitem_tri);
                                if ($.inArray(new_reitem, re_new) == -1) {
                                    re_new.push(new_reitem);
                                    new_reitem = new_reitem.substring(new_reitem.lastIndexOf('[') + 1)
                                    focusResult += '<p><b>' + new_reitem.substring(new_reitem.lastIndexOf('/') + 1) + '</b></p>'

                                }
                                else {
                                    if ($.inArray(reitem_tri, re_new) == -1) {
                                        re_new.push(reitem_tri);
                                        reitem_tri = reitem_tri.substring(reitem_tri.lastIndexOf('[') + 1)
                                        focusResult += '<p>' + reitem_tri.substring(reitem_tri.lastIndexOf('/') + 1) + '</p>'
                                    }
                                }
                            }
                        }
                    }
                }
                if (data[i].judgedate != undefined && data[i].judgedate.length != 0) {
                    judgedate += data[i].judgedate;
                }
                if (typeof data[i].court != 'undefined' && data[i].court.length != 0) {
                    court += data[i].court;
                }
                if (typeof data[i].title != 'undefined' && data[i].title.length != 0) {
                    title += data[i].title;
                }

                li += '<li class="clearfix" >' +
                    '    <div class="fl" style="width:100%;height:20px">' +
                    '        <a href=' + encodeURI('./docDetails.html?caa_id=' + similiar_caa_id + '&offset=' + data[i].offset + '&uniqid=' + data[i].uniqid) + '  title="' + title + '" class="titles" target="_blank"  >' + index + '.  ' + title + '</a>' +
                    '        <span class=" timer ">' + judgedate + '</span>' +
                    '        <span class="placer ">' + court + '</span>' +
                    '    </div>' +
                    '    <div class="fl">' + caseResult + focusResult + '</div>' +
                    '</li>';
                index++;
            }
            $(".case_list").html(li);
            if ($("#case_info").height() > 528) {
                $("#case_info").css({"overflowY": 'scroll', 'height': '530px'});
            }
            $(".case_list").children('li:last-child').css("borderBottom",'none')
        },
        error: function (error) {
            $(".case_list").html("暂无相似案例");
            // console.log(error);
        }

    });
}

function openSimiliarPage() {
    // var its = [{'key': 'case_feature'}, {'key': 'dispute_focus'}];
    var its = [{'key': 'case_feature'}, {'key': 'dispute_focus'}, {'key': 'applicable_law'},{'key':'casecause'}];
    var condition = "orcondition=(";
    var html = "";

    for (var i in its) {
        var item = its[i];

        if (similiarCondition[item.key] != '' && similiarCondition[item.key] != undefined && similiarCondition[item.key] != null) {
            html += item.key + '=' + similiarCondition[item.key] + '*';
        } else {
            html += '';
        }
    }
    condition += html.substring(0, html.length - 1) + ')';
    // console.log(condition)
    return condition;

}


/************************详情拼接函数******************************/
//详情
function dataDetail(json) {
    spellStr(json);
}

function spellStr(obj) {
    // console.log(obj);
    var html = "";
    html += '<h2>' + obj.title + '</h2>';
    $(".docTitle").html(html);
    var html = ' ';
    var cf = BTagFilter(obj.case_feature);
    for (var i=0;i<cf.length;i++) {
        if(cf[i].charAt(cf[i].length-1)=='/'){
            cf[i]=cf[i].substring(0,cf[i].length-1)
        }
        if (cf[i].lastIndexOf('/')) {
            var str = cf[i].lastIndexOf('/');
            var result = cf[i].substring(str + 1, cf[i].length);

        }
        html += '<span>' + result + '</span>';
    }
    var df = BTagFilter(obj.dispute_focus)
    for (var k=0;k<df.length;k++) {
        if(df[k].charAt(df[k].length-1)=='/'){
            df[k]=df[k].substring(0,df[k].length-1)
        }
        if (df[k].lastIndexOf('/')) {
            var resultFoucs = df[k].substring(df[k].lastIndexOf('/') + 1, df[k].length);
        }
        html += '<span>' + resultFoucs + '</span>'
    }
    $(".antistop").html(html);
    $(".antistop").children("span:last-child").css("borderRight","none");
    var basicBox = [{"key": "caseid", "value": "案号："}, {"key": "court", "value": "审理法院："}, {
        "key": "casecause",
        "value": "案由："
    },
        {"key": "casetype", "value": "案件类型："}, {"key": "proceduretype", "value": "审判程序："}, {
            "key": "closetype",
            "value": "结案方式："
        },
        {"key": "judgedate", "value": "裁判日期："}, {"key": "judge", "value": "审判人员："}
    ];

    html = " ";
    for (var i = 0,len=basicBox.length; i < len; i++) {
        var item = basicBox[i];
        //console.log(obj[item.key])
        // obj[item.key]=obj[item.key].replace(/(\s)|(\t)/g, "");
        if (obj[item.key]!= "" && obj[item.key] != undefined && obj[item.key] != null) {
            var isKong='';
            if(obj[item.key].indexOf('')||obj[item.key].indexOf('/\t')){
                isKong=obj[item.key].replace(/(\s)|(\t)/g, "")

            }
            if(obj[item.key].length>20){
                obj[item.key]=obj[item.key].substr(0,20)+'...';
            }
            if(isKong!='' ) {
                html += '    <tr>' +
                    '        <td>' +
                    '            <span class="title-area">' + item.value + '</span>' +
                    '            <span class="info-area" title="' + replaceBTag(isKong) + '">' + obj[item.key] + '</span>' +
                    '        </td>' +
                    '    </tr>';
            }
        }
    }
    $("#basic_info tbody").html(html);

    var detailBox = [
        {"key": "involved_person", "value": "当事人"}, {
            "key": "trialprocess",
            "value": "审理经过"
        }, {"key": "prosecutor_opinion", "value": "公诉机关称"},
        {"key": "appellant_opinion", "value": "诉称"}, {
            "key": "defender_opinion",
            "value": "辩称"
        }, {"key": "third_opinion", "value": "第三人称"}, {"key": "court_ascertained", "value": "本院查明"},
        {"key": "court_consider", "value": "本院认为"}, {"key": "judge_decision", "value": "裁判结果"}, {
            "key": "judge_member",
            "value": "审判人员"
        }, {"key": "first_instance", "value": "一审经过"},
        {"key": "before_instance", "value": "前审经过"}, {"key": "ps_clerk", "value": "书记员"}, {
            "key": "ps_judgedate",
            "value": "裁判日期"
        }, {"key": "attach", "value": "附"}
    ];
    html = '';
    // console.log(obj.全文);
    var contDetail = obj.全文;
    if(contDetail!=undefined){
        var catalog = ' <li class="catalog_current"><a href="#basic_info" >基本信息</a></li> ';
        for (var k=0;k< contDetail.length;k++) {
            for (var j in contDetail[k]) {
                html += '<div id="item' + k + '" class="infos">' +
                    '<h3>' + j + '</h3>' +
                    '<div class="con_text">' +
                    '<p>' + contDetail[k][j] + '</P>' +
                    '</div>' +
                    '</div>';
                catalog += '<li><a href="#item' + k + '" >' + j + '</a></li>';
            }
        }
        $(".detail_info").html(replaceBr(html));
        var sideLength = (($('.infos').length == undefined) ? 0 : (30 * ($(".infos")).length));
        $(".sideBar").css("height", sideLength - 30 + 'px');
        $(".catalog_list").html(catalog);
    }else{
        $(".detail_info").html();
    }
}

function combineCondition(cond) {
    var subStr = '?caa_id=' + caa_id + "&";
    return subStr;

}

//法规详情
/*******************悬停详情**********************/

var $fade = function () {
    /*悬停详情*/
    $("body").on("mouseover", ".fg", function (ev) {
        $('.law_detail').remove();
        var html = "";
        var ask_title = {
            rule: $(this).attr("rule"),
            article: $(this).attr("article")
        };
        jQuery.support.cors = true;
        $.ajax({
            type: 'POST',
            url: 'http://' + ip + '/caa_v3.0/search/singleLawDetail',
            async: false,
            data: JSON.stringify(ask_title),
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            success: function (data) {
                if (typeof data.result != 'undefined' && data.result != "[]") {
                    var data_s = data.result.replace(/\\n+/g, '<br>');
                    var detail = JSON.parse(data_s)[0].articleDetail;
                    detail = detail.replace('<br>', '', '$1');
                    html = detail.replace('】', '】<br>');
                }
            },
            complete: function (data) {
            },
            error: function () {
                // console.log("法条获取失败！");
            }
        });
        //console.log(html);
        var oEvent = ev || event;
        var oDiv = document.createElement('div');
        var txtp = document.createElement('p');
        txtp.innerHTML = html == "" ? "目前该法条未收录" : html;
        /*偏移量*/
        var offx = 120;
        var offy = $(document).scrollTop() + 16;

        oDiv.className = 'law_detail';              //class
        oDiv.style.left = oEvent.clientX - offx + 'px';  // 指定创建的DIV在文档中距离左侧的位置
        oDiv.style.top = oEvent.clientY + offy + 'px';  // 指定创建的DIV在文档中距离顶部的位置
        oDiv.style.position = 'absolute'; // 为新创建的DIV指定绝对定位
        //txtp.appendChild(txt);
        oDiv.appendChild(txtp);
        document.body.appendChild(oDiv);

        if (!$('body').children().is('.className')) {
            document.body.appendChild(oDiv);
            //$('body').append(html);
        }
        $(document).click(function (e) {
            var target = $(e.target);
            if (target.closest(".law_detail").length != 0) return;
            $('.law_detail').remove();

        });

    });
    $('body').on("mouseleave", ".law_detail", function () {
        $('.law_detail').remove();
    });
};
$fade();
//返回顶部
$(".backTop").click(function () {
    $('html ,body').animate({scrollTop: 0}, 300);
    return false;
});
//下载
$(".downloads a").click(function () {

    var obj = {'uniqid': uniqId, 'userid': userid};
    if (userid!=undefined) {
        // if (confirm('确定下载该文书吗？')) {
        jQuery.support.cors = true;
        // $.ajax({
        //     type: 'post',
        //     url: 'http://' + ip + '/caa_v3.0/search/checkDayDownloadCount',
        //     data: JSON.stringify(obj),
        //     dataType: 'json',
        //     contentType: 'application/json;charset=UTF-8',
        //     success: function (data) {
        // console.log(data);
        var url = 'http://' + ip + '/caa_v3.0/search/downloadDocument';
        var param = {"uniqid": uniqId, "userid": userid};
        var new_param = {
            'uniqid': uniqId,
            'title': title,
            'casecause': casecause==undefined?'':casecause,
            'court': court==undefined?'':court,
            'judgedate': judgedate==undefined?'':judgedate,
            'caseid': caseid==undefined?'':caseid,
            'userid': userid
        };
        download(url, param, new_param);
        // console.log(new_param)
        // if (data.resultcode == '0000') {
        //     //console.log(obj)
        //     download(url, param, new_param);
        //
        // } else {
        //     alert('每天最多下载20次，明天再来吧')
        // }
        //     }
        //
        // })
    }
});

function statisDocument(data) {

    var obj = {
        'uniqid': uniqId,
        'userid': userid,
        'title': data.title == undefined ? "" : data.title,
        'casecause': data.casecause == undefined ? "" : data.casecause,
        'court': data.court == undefined ? "" : data.court,
        'judgedate': data.judgedate == undefined ? "" : data.judgedate,
        'caseid': data.caseid == undefined ? "" : data.caseid
    };

    // console.log(obj);
    var url = 'http://' + ip + '/caa_v3.0/search/statisDocument';
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json;charset=UTF-8',
        success: function (data) {
            // console.log(data);
        },
        error: function (error) {
            // console.log(error)
        }
    });
}


function replaceBr(text) {
    return text.replace(/\n/g, "<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
}
String.prototype.trim = function () {
    return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}