/*nav栏更多显示*/
var str = "";
$(document).ready(function(){

   $.get("../resources/data.json",function (data) {
       console.log("获取数据======="+data.contractdata[0].name);

       //data.contractdata.sort(sortData);
       sortArray(data.contractdata);
       
       for(var i=0;i<data.contractdata.length;i++){
           str += '<div class="result_item" id="item_'+i+'">'+
                      '<div class="result_item_title">'+
                         '<h4 title="合同名称" onclick="toContractDetai(this)">'+data.contractdata[i].name+'</h4>'+
                         '<div style="display: inline-block;float: right;font-size: 16px;">'+
                            '<span class="security">'+data.contractdata[i].security+'</span>'+
                        '</div>'+

                         '<div class="result_item_keywords">'+
                           '<div style="width:205px;display: inline-block;">'+
                                '<span>'+data.contractdata[i].code+'</span>'+
                           '</div>'+
                           '<div style="width:70px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;margin-right: 15px;">'+
                                '<span>'+data.contractdata[i].person+'</span>'+
                           '</div>'+
                           '<div style="width:235px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;margin-right: 15px;">'+
                                '<span>'+data.contractdata[i].company+'</span>'+
                           '</div>'+
                           '<div style="width:170px;display: inline-block;">'+
                                '<span>'+data.contractdata[i].startdate+'-'+data.contractdata[i].enddate+'</span>'+
                           '</div>'+
                           '<div style="width:80px;display: inline-block;">'+
                                '<span>'+data.contractdata[i].price+'万</span>'+
                           '</div>'+
                         '</div>'+
                      '</div>'+
                       '<div class="result_item_txt">'+
                           '<div class="result_item_tabs clearfix">'+
                               '<ul>'+
                               '<li id="court_consider_'+i+'" class="tab_chose">合同摘要</li>'+
                               '</ul>'+
                           '</div>'+
                           '<div class="result_item_cont cont_select" id="court_consider_'+i+'" >'+
                              '<p class="">'+data.contractdata[i].abstract+'</p>'+
                               '<a href="javascript:void(0)" style="margin-left: 98%;margin-top: 10px;">'+
                                   '<span class="nav_corner">'+
                                   '<i class="fa fa-angle-double-down fa-lg" style="margin-top: 15px;"></i>'+
                                   '</span>'+
                               '</a>'+
                            '</div>'+

                       '</div>'+
                      '<div class="dowd_num">'+(i+1)+'</div>'+
               '</div>'

       };
       //console.log(str);

       $('.result_box1').html('');
       $('.result_box1').html(str);
       str = '';
   });

    // $(".result_item_cont .nav_corner1 i").click(function(){
    //     $(".result_item_cont p").removeAttr("-webkit-line-clamp");
    //     // $(".result_item_cont p").attr("-webkit-line-clamp","10");
    //     $('.result_item_cont .nav_corner').children('i').replaceWith('<i class="fa fa-lg fa-angle-double-up" ></i>');
    // });


});

$(window).load(function(){
    $(".result_item_cont p").each(function () {
        if ($(this).height()<114){

            $(this).parent().find("a").remove();
        }else {
            $(this).addClass("result_item_cont_p");
        }
    })
})


function searchData(key) {
    $('.result_box1').html('');
    $.get("../resources/data.json",function (data) {
        console.log("获取数据======="+data.contractdata[0].name);

        //data.contractdata.sort(sortData);
        sortArray(data.contractdata,key);

        for(var i=0;i<data.contractdata.length;i++){
            str += '<div class="result_item" id="item_'+i+'">'+
                '<div class="result_item_title">'+
                '<h4  title="合同名称" onclick="toContractDetai(this)">'+data.contractdata[i].name+'</h4>'+
                '<div style="display: inline-block;float: right;font-size: 16px">'+
                '<span class="security">'+data.contractdata[i].security+'</span>'+
                '</div>'+

                '<div class="result_item_keywords">'+
                    '<div style="width:205px;display: inline-block;">'+
                        '<span>'+data.contractdata[i].code+'</span>'+
                    '</div>'+
                    '<div style="width:70px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;margin-right: 15px;">'+
                        '<span>'+data.contractdata[i].person+'</span>'+
                    '</div>'+
                    '<div style="width:235px;display: inline-block;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;vertical-align: middle;margin-right: 15px;">'+
                        '<span>'+data.contractdata[i].company+'</span>'+
                    '</div>'+
                    '<div style="width:170px;display: inline-block;">'+
                        '<span>'+data.contractdata[i].startdate+'-'+data.contractdata[i].enddate+'</span>'+
                    '</div>'+
                    '<div style="width:80px;display: inline-block;">'+
                        '<span>'+data.contractdata[i].price+'万</span>'+
                    '</div>'+
                '</div>'+
                '</div>'+
                '<div class="result_item_txt">'+
                '<div class="result_item_tabs clearfix">'+
                '<ul>'+
                '<li id="court_consider_'+i+'" class="tab_chose">合同摘要</li>'+
                '</ul>'+
                '</div>'+
                '<div class="result_item_cont cont_select" id="court_consider_'+i+'" >'+
                '<p class="">'+data.contractdata[i].abstract+'</p>'+
                '<a href="javascript:void(0)" style="margin-left: 98%;margin-top: 10px;">'+
                '<span class="nav_corner">'+
                '<i class="fa fa-angle-double-down fa-lg" style="margin-top: 15px;"></i>'+
                '</span>'+
                '</a>'+
                '</div>'+
                '</div>'+
                '<div class="dowd_num">'+(i+1)+'</div>'+
                '</div>'

        };
        //console.log(str);

        $('.result_box1').html(str).change();
        str = '';
    })

    var num = 0;
    $('.result_box1').change(function () {

        $(".result_item_cont p").each(function () {
            num++;
            if ($(this).height()<114){

                $(this).parent().find("a").remove();
            }else {
                $(this).addClass("result_item_cont_p");
            }
            console.log("次数是===="+num)
        })
    })

}

//根据相关性排序
function sortData(item1,item2) {
    var value1 =item1.correlation,
        value2 = item2.correlation;

    if(value1 < value2){
        return 1;
    }else if(value1 == value2){
        return 0;
    }else{
        return -1;
    }
}

//根据价款排序
function sortDataByPrice(item1,item2) {
    var value1 =item1.price,
        value2 = item2.price;

    if(value1 < value2){
        return 1;
    }else if(value1 == value2){
        return 0;
    }else{
        return -1;
    }
}

//根据启动日期排序
function sortDataByDate(item1,item2) {
    var value1 =item1.startdate,
        value2 = item2.startdate;

    if(value1 < value2){
        return 1;
    }else if(value1 == value2){
        return 0;
    }else{
        return -1;
    }
}


function sortArray(data,key) {

    if(key){
        switch (key){
            case "相关性":
                return data.sort(sortData);
                break;
            case "启动时间":
                return data.sort(sortDataByDate);
                break;
            case "合同价款":
                return data.sort(sortDataByPrice);
                break;
            default:
                return data.sort(sortData);
                break;
        }
    }else{
        return data.sort(sortData);
    }

}


