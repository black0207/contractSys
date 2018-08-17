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


var title='',casecause='',court='',judgedate='',caseid='';

$(document).ready(function () {
    if(!userid){
        window.location.href = '../jsp/index.html';
    }
    myCollects();
});
function myCollects() {
    var url='http://'+ip+'/caa_v3.0/search/showMytList';
    // var url='http://192.168.10.204/caa_v3.0/search/showMytList';
    var obj={'userid':userid,'type':'collect','from':0,'size':10};
    // var obj={'userid':'eaec7c71095d4f269f2a826b5d30edb9','type':'collect','from':0,'size':10};
    jQuery.support.cors = true;
    $.ajax({
        type:'post',
        url:url,
        data:JSON.stringify(obj),
        dataType:'json',
        contentType:'application/json',
        success:function (data) {
            var data=eval(data);
            // console.log(data);
            var dataLength=data.count;
            var page=function (totalData) {
                $(".M-box").pagination({
                    totalData: totalData,
                    showData: 10,
                    pageCount: ~~(totalData / 10) + 1,
                    count: 2,
                    isHide: true,
                    keepShowPN: true,
                    jump: false,
                    callback: function (api) {
                        spellPage((api.getCurrent() - 1) * 10);
                    }
                },function(api){
                    spellPage(api.getCurrent()-1);

                });
            }
            page(dataLength);

        },
        error:function () {
            $(".collect_lists").html('<p style="color: red;text-align: left">页面加载失败!</p>');
        }
    });
    }

// //拼接页面详情
function spellPage(index) {
    var url = 'http://' + ip + '/caa_v3.0/search/showMytList';
    var obj = { 'userid': userid, 'type': 'collect', 'from': index, 'size': 10 };
    // var obj = { 'userid': 'eaec7c71095d4f269f2a826b5d30edb9', 'type': 'collect', 'from': index, 'size': 10 };
    jQuery.support.cors = true;
    $.ajax({
        type: 'post',
        url: url,
        data: JSON.stringify(obj),
        dataType: 'json',
        contentType: 'application/json',
        success: function(res) {
            var data= eval(res);
            // console.log(data);
            renderHtml(data,++index);
        },
        error: function(error) {
            // console.log(error);
        }
    })
}

//

function renderHtml(obj,index) {
    var html='';
    if(obj.count=='0'){//判断收藏篇数
        html+=' <h3 class="main_title">我的收藏</h3> ';
        $(".title_box").html(html);
        $(".emptyBox").show();
        $(".collect_lists").hide();
    }else{
        $(".emptyBox").hide();
        html+=' <h3 class="main_title">我的收藏</h3> ' +
            '<span style="color: #273352">（您已收藏'+obj.count+'篇案例）</span>' +
            '<span class="fr clearBtn"><i class="fa fa-trash-o"></i> 清空收藏</span>';
        $(".title_box").html(html);
        $(".collect_lists").show();
    }
    var li='';
    //下收藏时间倒序
    obj.result.sort(function (a, b) {
        return Date.parse(b.operatetime) - Date.parse(a.operatetime);
    });
    //循环得到的数据，拼接
    //单独拼接一个li
    // console.log(obj)
    // for(var i in obj.result){
    for(var i=0;i<obj.result.length;i++){
        var info=JSON.parse(obj.result[i].info);
        li+='<li class="clearfix collect_list" id="item'+i+'">' +
            '    <div>' +
            '        <a href="'+encodeURI('./docDetails.html?uniqid='+obj.result[i].uniqid)+'" title="'+title+'" class="titles" target="_blank">'+index+'.'+info.title +'</a>' +
            // '        <span class=" timer">'+ fmtDate(obj.result[i].operatetime) +'</span>' +
            '        <span class=" timer">'+ formatDate(obj.result[i].operatetime) +'</span>' +
            '        <span class=" collectBtn" title="取消收藏" onclick="deletes(\''+obj.result[i].id+'\');"><i></i>取消收藏</span>' +
            '        <span class=" reDownload" onclick="downWord(\'' + obj.result[i].uniqid+'\',\'' + info.title+'\',\'' + info.casecause+'\',\'' + info.court+'\',\'' + info.judgedate+'\',\'' + info.caseid+'\')" title="下载" ><i></i>下载</span>' +
            '    </div>' +
            '    <div><p>'+info.casecause+'</p><p>'+info.court+'</p><p>'+info.judgedate+'</p><p>'+info.caseid+'</p></div>' +
            '</li>'
            index++;
    }

    $(".collect_lists").html(li);

}

//点击清空收藏

$("body").on("click",".clearBtn",function () {
    // if(confirm('确定要清空收藏吗？')){
        // var url='http://192.168.10.204/caa_v3.0/search/showMytList';
        var url='http://'+ip+'/caa_v3.0/search/collectDocument';
        var obj={'userid':userid,'type':'discollectall'};
        // var obj={'userid':'eaec7c71095d4f269f2a826b5d30edb9','type':'discollectall'};
    jQuery.support.cors = true;
        $.ajax({
            type:'post',
            url:url,
            async:false,
            data:JSON.stringify(obj),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                //
                // console.log(data);
                // window.location.reload();
                $(".title_box").html(' <h3 class="main_title">我的收藏</h3> ');
                $(".collect_lists").hide();
                $(".emptyBox").show();
                myCollects()
            }
        });
    // }else{
    //     return false;
    // }
});

    //点击下载
//点击下载
function downWord(uniqid,title,casecause,court,judgedate,caseid) {
    var url = 'http://' + ip + '/caa_v3.0/search/downloadDocument';
    var param = { "uniqid": uniqid, "userid": userid };
    var new_params={
        'userid':userid,
        'uniqid': uniqid,
        'title':title==undefined?'':title,
        'casecause': casecause==undefined?'':casecause,
        'court':court==undefined?'':court,
        'judgedate':judgedate==undefined?'':judgedate,
        'caseid': caseid==undefined?'':caseid
    };
    var obj={
        'userid':userid
    };
    jQuery.support.cors = true;
    // $.ajax({
    //     type: 'post',
    //     url: 'http://' + ip + '/caa_v3.0/search/checkDayDownloadCount',
    //     data: JSON.stringify(obj),
    //     dataType: 'json',
    //     async:false,
    //     contentType: 'application/json;charset=UTF-8',
    //     success: function (data) {
    //         // console.log(data);
    //         if (data.resultcode == '0000') {
                // console.log(obj)
                download(url, param, new_params);
                // window.location.reload();
                myCollects();
    //         } else{
    //             alert('每天最多下载20次，明天再来吧')
    //         }
    //     }
    // })
}


//点击取消收藏

function deletes(id) {
    // if (confirm("确定要取消收藏吗？")) {
        var url='http://'+ip+'/caa_v3.0/search/collectDocument';
        var obj = {'recordid': id,'type':'discollect','userid':userid};
    jQuery.support.cors = true;
        $.ajax({
            type:'post',
            url:url,
            data:JSON.stringify(obj),
            dataType:'json',
            contentType:'application/json',
            success:function (data) {
                // console.log(data);
                if(data.resultcode=='0000'){
                    // window.location.reload();
                    myCollects()
                    // alert("取消收藏成功！");
                }else{
                    return false;
                }
            },
            error:function (error) {
                // console.log(error);
            }
        });
    // }
}

//去除'\'
function replaceBLine(str) {
    return str.replace(/\\/g, "");

}
//转化时间2017/10/10 上午12:00格式
function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/,' ');
}


function formatDate(obj){//2017-12-02 10:10:10
    var date =new Date(obj);
    var year=date.getFullYear();
    var month=(date.getMonth() + 1)>9?(date.getMonth() + 1):"0" + (date.getMonth() + 1);

    var day=date.getDate()>9?date.getDate():"0" + date.getDate();
    var hour=date.getHours()>9?date.getHours():"0"+date.getHours();
    var minute=date.getMinutes()>9?date.getMinutes():"0"+date.getMinutes();
    var second=date.getSeconds()>9?date.getSeconds():"0"+date.getSeconds();
    return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}

//退出登录
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

String.prototype.trim = function () {
    return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}