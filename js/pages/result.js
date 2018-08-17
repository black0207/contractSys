/**
 * Created by Arther on 2017/11/3.
 */
/********************变量**************************/

var result = {                                 //搜索条件组
		"condition": {
			"andcondition": {},
			"orcondition": {}
		}
};
var searchflag=2;
//点击事件
$(document).click(function () {
	$('.law_detail').remove();
	$(".dropDown_box").slideUp(300);
	$(".search_menu").addClass('hide');
	$('.search_select').children('i').replaceWith('<i class="fa fa-lg fa-angle-down" style="margin-left: 6px;"></i>');
});

//按键事件
$(document).keydown(function (e) {
	e = e || window.event;
	var keyCode = e.keyCode || e.which;
	if (keyCode == 13) {
		$search('.searchRig .result_search');
        searchflag=2;
		$('.dropDown_box').slideUp(300);
		setTimeout(function () {
			$(".dropDown_box ul").empty()
		}, 500);
	}
	/*     if (keyCode == 38) { //上
     if(!$('.mask_drow ul li').hasClass('drop-li-active')){
     $('.mask_drow ul li').eq(li_end--).addClass('drop-li-active');
     }else{
     $('.mask_drow ul li').eq(li_end--).addClass('drop-li-active').siblings().removeClass('drop-li-active');
     li_end=li_end==0?li_end:li_end;
     }
     }
     if (keyCode == 40) { //下
     if(!$('.mask_drow ul li').hasClass('drop-li-active')){
     $('.mask_drow ul li').eq(eqs++).addClass('drop-li-active');
     }else{
     $('.mask_drow ul li').eq(eqs++).addClass('drop-li-active').siblings().removeClass('drop-li-active');
     eqs=eqs==(li_end-1)?0:eqs;
     }
     }*/
});

$(document).ready(function () {

	/********************事件响应**************************/
	body_on('click', '.nav_li .province i', function (e) {
		var text = $(this).parent().attr('title');
		var obj = $(this).parents('.nav_li');
		if (obj.find('.under_ul_1').is(':empty')) {
			var messeage = $get_court(text);
			add_court(messeage, obj);
		}
		if ($(this).hasClass('fa-plus')) {
			$(this).removeClass('fa-plus').addClass('fa-minus');
			obj.find('.under_ul_1').slideDown(300);
		}
		else {
			$(this).removeClass('fa-minus').addClass('fa-plus');
			obj.find('.under_ul_1').slideUp(300);
		}
		e.stopPropagation();
	});
	body_on('click', '.li_level_1 a i', function (e) {
		if ($(this).hasClass('fa-plus')) {
			$(this).removeClass('fa-plus').addClass('fa-minus');
			$(this).parent().siblings('ul').slideDown(300);
		}
		else {
			$(this).removeClass('fa-minus').addClass('fa-plus');
			$(this).parent().siblings('ul').slideUp(300);
		}
		e.stopPropagation();
	});
	body_on("click", ".navs ul li a", function () {

		if ($(this).parent().hasClass('active0')) {
			$(this).parents().removeClass('active0');
			$(this).parent().find('.nav_corner i').removeClass("fa-angle-up").addClass("fa-angle-down");
			$(this).parent().find('.items').slideUp(600);
		}
		else {
			$(this).parent().addClass('active0');
			$(this).parent().find('.nav_corner i').removeClass("fa-angle-down").addClass("fa-angle-up");
			$(this).parent().find('.items').slideDown(600);
		}
	});


	//zxf添加
    body_on("click", ".result_item_cont a", function () {
        if ($(this).parent().find('p').hasClass("result_item_cont_p")) {
            $(this).parent().find('p').removeClass("result_item_cont_p");
            // $(".result_item_cont p").removeAttr("-webkit-line-clamp");
            $(this).parent().find('.nav_corner i').removeClass("fa-angle-double-down").addClass("fa-angle-double-up");
        }else {
            $(this).parent().find('p').addClass("result_item_cont_p");
            // $(".result_item_cont p").removeAttr("-webkit-line-clamp");
            $(this).parent().find('.nav_corner i').removeClass("fa-angle-double-up").addClass("fa-angle-double-down");
		}
    });

    // $(".result_item_cont .nav_corner1 i").click(function(){
    //     $(".result_item_cont p").removeAttr("-webkit-line-clamp");
    //     // $(".result_item_cont p").attr("-webkit-line-clamp","10");
    //     $('.result_item_cont .nav_corner').children('i').replaceWith('<i class="fa fa-lg fa-angle-double-up" ></i>');
    // });



	/*nav事件*/
	body_on("click", ".nav_li a", function () {
		//nav_click($(this));
        if ($(this).parent().hasClass('active')) {
            $(this).parents().removeClass('active');
        }
        else {
            $(this).parent().addClass('active');

        }


	});
	/*搜索点击事件*/
	body_on("click", ".searchRig .search_glass", function () {
		arr = [];
		//    if (checkdata($('.search_ipt').val())) {
		if ($('.search_ipt').val() != "") {
            result={"condition":{
            	"andcondition":{},
				"orcondition":{},
                "issecondquery":"false"
			}};
			//result["condition"].andcondition = {};
			//result["condition"].orcondition = {};
			//result["issecondquery"] = "false";
			$('.selectedObj').empty();
           // store.set('CONDITION_' + caa_id.caa_id[0], result);
			sessionCont.setSession('CONDITION_' + caaCase_id.caa_id[0], result);

			searchflag=1;
			$search(this);
			$('.dropDown_box').slideUp(300);
			setTimeout(function () {
				$(".dropDown_box ul").empty()
			}, 500);
		}
		else {
		}
		//    }
	});
	body_on("click", ".searchRig .result_search", function () {
        searchflag=2;
		$search(this);
		$('.dropDown_box').slideUp(300);
		setTimeout(function () {
			$(".dropDown_box ul").empty()
		}, 500);
	});

	/*排序*/
	body_on("click", ".ar_chose .taga", function () {
		if ($(this).hasClass('arr_chose')) {
		}
		else {
			$(this).addClass('arr_chose').siblings().removeClass('arr_chose');
			$(this).find('img').attr('src', '../images/ico_down_s.png');
			$(this).siblings().find('img').attr('src', '../images/ico_down.png');
			$array($(this).find('span').text());
		}
	});
	/*result词条切换*/
	body_on("click", ".result_item_tabs li", function () {
		if (!$(this).hasClass('tab_chose')) {
			$(this).addClass('tab_chose').siblings().removeClass('tab_chose');
			var drr = $(this).index();
			var cont = $(this).parent().parent().siblings('.result_item_cont');
			cont.eq(drr).addClass("cont_select").siblings('.result_item_cont').removeClass('cont_select');
		}

	});
	/*悬停详情*/
	$fade();
	/*删除词条*/
	body_on("click", ".selectedObj span i", function () {
		Del_span($(this));
	});
	/*nav栏更多显示*/
	body_on("click", ".nav_foldBtn", function () {
		// $(this).siblings('div').slideToggle(700);
		/*        if ($(this).text() == "更多") {
         $(this).text("收起");
         $(this).parent().addClass('slide');
         $(this).siblings('div').slideDown(700);
         }
         else {
         $(this).siblings('div').slideUp(700);
         //$(this).parent().removeClass('slide');
         $(this).text("更多");
         setTimeout(function () {
         $(this).parent().removeClass('slide')
         }, 1000);
         }*/
		var that = $(this);
		if (that.text() == "更多") {
			that.siblings().addClass('slide');
			that.siblings().find('div').slideDown(700);
			that.text("收起");
		}
		else {
			that.siblings().find('div').slideUp(700);
			//$(this).parent().removeClass('slide');
			setTimeout(function () {
				that.siblings().removeClass('slide');
				that.text("更多");
			}, 700);
		}
	});
	body_on("mouseenter", ".mask_drow ul li", function () {     //鼠标下拉事件
		$(this).addClass("drop-li-active").siblings().removeClass("drop-li-active");
	});
	body_on("mouseenter", ".search_select", function (e) {
		$(".dropDown_box").slideUp(300);
		$(this).find('i').removeClass('fa-angle-down').addClass('fa-angle-up');
		$(this).children('.search_menu').removeClass("hide");
		e.stopPropagation();
	});
	body_on("mouseleave", ".search_select", function (e) {
		$(this).find('i').removeClass('fa-angle-up').addClass('fa-angle-down');
		$(this).children('.search_menu').addClass("hide");
		e.stopPropagation();
	});
	body_on("click", ".search_menu ul li", function () {
		var select = $(this).parents('.search_select');
		select.children('span').text($(this).text());
		select.children('i').removeClass('fa-angle-up').addClass('fa-angle-down');
	});

//	全文内容
	$(".search_ipt").on('input propertychange', function () {
		if (!trim($(this).val())) {
			$(".dropDown_box").slideUp(300);
		}
		// $(".dropDown_box ul").empty();
		if (trim($(this).val()) && isChinese(trim($(this).val()))) {
			var jsonData = {
					'keyword': trim($(this).val()),
					"queryfields": ["casecause", "case_feature", "dispute_focus", "involved_person", "lawyer", "judge"]
			};
			if ($('.search_select span').text() == '全文内容') {

				$Associative(jsonData);
			}
		}
	});
//	全文内容下拉列表点击
	$('.dropDown_box').on('click', 'a span', function () {
		var key = $(this).parent().siblings('span').text();
		var key_li = $(this).parents('li').attr('class');
		var key_li_new;
		if (key_li.lastIndexOf("drop-li-active") != -1)
			key_li_new = key_li.substring(0, key_li.lastIndexOf(" "));
		var value = $(this).attr('title');
		var cc = key + "：" + value.substring(value.lastIndexOf('/') + 1);
		if ($.inArray(cc, arr) != -1) {
			updata(result);
			return;
		}
		addresult(key_li_new, value);
		$('.search_ipt').val("");
		$('.dropDown_box').hide();
	});

	/*******************函数调用**********************/
	Init();

	$('.sl').click(function () {
		if ($(this).val() == "收起") {
			$('.ay_showBox').children('ul').slideUp(700);
			$(this).val("展开");
			$('body,html').animate({'scrollTop': 0}, 700)
		}
		else {
			$(this).val("收起");
			$('.ay_showBox').children('ul').slideDown(700);
		}
	});
	body_on("click", "h4", function () {
		produce_doc($(this));
	});
	body_on("click", ".downWord", function () {
		// console.log(121);
		if (user.userid == "" || user.userid == undefined) {
			$('.loginA').click();
			return;
		}
		else {
			downWord($(this));
		}
	});
	body_on("click", ".collectWord", function () {
		if (user.userid == "" || user.userid == undefined) {
			$('.loginA').click();
			return;
		}
		else {
			collectWord($(this));
		}
	});
	//加载数据
	body_on("click", ".load_more", function () {
		var id = $('.result_item').last().attr('id').substring($('.result_item').last().attr('id').lastIndexOf("_") + 1);
		var num = parseInt(id) + 1;
		load_more(result, array_type, num);
	});

	//返回顶部
	$(".backTop").click(function () {
		$('html ,body').animate({scrollTop: 0}, 300);
		return false;
	});
	$('body').on('click', '.law_detail', function (e) {
		e.stopPropagation();
	});
});
/*******************初始化**********************/
var user = {};
var Init = function () {
	//取用户id
	user.userid = getUidByCookie() == undefined ? "": getUidByCookie().id;

	//取数据
	var data = $getdata();
	add_search();
	if (data) {
		/*词条栏*/
		if (detail.filename != "") {
			add_selectedObj(detail.filename, "filename_tag");
			if (result["condition"]["andcondition"] == undefined) {
				result["condition"]["andcondition"] = {};
			}
		}
		if (result["condition"]["andcondition"] != undefined) {
			var dataca = get_data["condition"]["andcondition"];
			for (var i in dataca) {
				if (typeof dataca[i] == "object") {
					for (var j= 0,lenj=dataca[i].length;j<lenj;j++) {
						add_selectedObj(dataca[i][j], i + "_tag");
					}
				}
				else {
					add_selectedObj(dataca[i], i + "_tag");
				}
			}
		}
		//取文书
		array_type = "_score";
		//var qwq = JSON.stringify(result["condition"]["andcondition"]);
		if (result["condition"]["andcondition"] != undefined) {
			//     var copy_s = lawycopy(result);
			// } else {
			var copy_s = result;
		}
		//限制以文检索/空检索
		if(detail.flag==1&&JSON.stringify(result.condition.orcondition)=="{}"||
            detail.flag==1&&result.condition.orcondition==""||
			detail.flag==0&&JSON.stringify(result.condition.andcondition)=="{}"
		) {
			$('.png ').removeClass('hide');
			if ($('#footer').is(":empty")) {
				add_foot();
			}
			return;
		}

		$get_document(copy_s, 0, array_type).then(function () {
			//条件统计
			getstatisCondition(copy_s, "simple", user.userid);

			if (document_count > 0) {
				add(0);
				$('.js_number').find('span').text(document_count);
				//生成nav栏
				$get_statis(copy_s);
				add_nav(count);
				if (document_count <= 20) {
					$('.load_more').addClass('hide');
				}
			}
			else {
				$('.png ').removeClass('hide');
				if ($('#footer').is(":empty")) {
					add_foot();
				}
			}
		});
	}
};
/**************************************获取数据********************************************/

/*******************取案由id**********************/

var get_data = {};
var detail = {"flag": "", "filename": "", "caseid": ""};
var caaCase_id = Request();
var $getdata = function () {
	/*从第一页获取数据*/
	if(caaCase_id.caa_id!=undefined) {
		//get_data = store.get('CONDITION_' + caa_id.caa_id[0]);
		get_data=sessionCont.getSession('CONDITION_' + caaCase_id.caa_id[0]);
	}
	else if(caaCase_id.caa_id_back!=undefined){
		//get_data = store.get('CONDITION_' + caa_id.caa_id_back[0]);
		get_data = sessionCont.getSession('CONDITION_' + caaCase_id.caa_id_back[0]);

		caaCase_id.caa_id=caaCase_id.caa_id_back;
		if(get_data){

		}else{

			var aj={
				"uniqid":caaCase_id.caa_id_back[0]
			};
			$.ajax(
				{
					url:'http://' + ip + '/caa_v3.0/search/querystorecondition',
					type: 'post',
					data: JSON.stringify(aj),
					dataType: 'json',
					async:false,
					contentType: 'application/json;charset=UTF-8',
					timeout: 60000 //超时时间设置，单位毫秒
				}
			).then(function(data){
					if(data.result=="0015"||
						data.result=="0016"||
						data.result=="0017"){
						alert(data.message);
						window.location.href="index.html";
					}else{
						get_data={};
						get_data.condition=data.condition.condition;
						get_data.flag=0;
						get_data.court=data.condition.court!=undefined?data.condition.court:"";
						get_data.judge=data.condition.judge!=undefined?data.condition.judge:"";
					}
				},function(){
					window.location.href="index.html";
				});
		}
	}
	else if(caaCase_id.ajbs!=undefined){

		var ajbs=caaCase_id.ajbs[0]||"";
		//区域
		var area=caaCase_id.area!=undefined?caaCase_id.area[0]:"cq";
		caaCase_id.caa_id=["ajbs"];
		if(ajbs==""){

		}else{

			var aj={
				"ajbs":ajbs,
				"area":area
			};
			$.ajax(
				{
					url:'http://' + ip + '/caa_v3.0/search/HGdocDetail',
					type: 'post',
					data: JSON.stringify(aj),
					dataType: 'json',
					async:false,
					contentType: 'application/json;charset=UTF-8',
					timeout: 60000 //超时时间设置，单位毫秒
				}
			).then(function(data){
					if(data.result=="0015"||
						data.result=="0016"||
						data.result=="0017"){
						alert(data.message);
						window.location.href="index.html";
					}else{
						get_data={};
						var fileCondition=data.condition;
						var caseid = '';
						if(fileCondition!=undefined&&fileCondition.caseid!=undefined){
							caseid = fileCondition.caseid[0];
							delete fileCondition.caseid;
						}
						if(fileCondition.caa_id!=undefined){
							delete fileCondition.caa_id;
						}
						if(fileCondition.court!=undefined){
							var court=fileCondition.court||"";
							delete fileCondition.court;
						}
						get_data={
							condition: {
								orcondition: fileCondition
							},
							flag: 1,
							filename: "bs|"+caseid,
							caseid: caseid,
							court:court
						};
						for(var g in get_data){
							if(get_data[g]==""||get_data[g]==undefined){
								delete get_data[g];
							}
						}
					sessionCont.setSession('CONDITION_' + "ajbs",get_data);
					}
				},function(){
					window.location.href="index.html";
				});
		}
	}
	else{
		window.location.href="index.html";
		return;
	}
	if (get_data.flag == 1) {
		detail.flag = 1;
		detail.filename = get_data["filename"];
		detail.caseid = get_data["caseid"];

		//get_data["caseid"] = get_data["condition"]["orcondition"]["caseid"];
		//delete get_data.flag;
		//delete get_data["filename"];
		//delete get_data["condition"]["orcondition"]["caseid"];

		get_data["issecondquery"] = "true";
	} else {
		delete get_data["condition"].flag;
		get_data["issecondquery"] = "false";
	}
	result = JSON.parse(JSON.stringify(get_data));
	// console.log(result);
	/*   if (get_data)
     detail.flag = get_data.flag;
     if (detail.flag == 1) {
     detail.filename = get_data.filename;
     delete get_data.flag;
     delete get_data.filename;

     for (var s in get_data) {
     if (s == "caseid" && get_data[s] != undefined) {
     result["caseid"] = get_data[s][0];
     } else {
     if (typeof get_data[s] == "object") {
     result["condition"].orcondition[s] = get_data[s];
     }
     else {
     result["condition"].orcondition[s] = [];
     result["condition"].orcondition[s].push(get_data[s]);
     }
     }
     }
     result["issecondquery"] = "true";
     }
     else {
     delete get_data.flag;
     delete result["condition"].orcondition;
     for (var s in get_data) {
     if (typeof result["condition"].andcondition[s] == "undefined") {
     if (typeof get_data[s] == "object") {
     result["condition"].andcondition[s] = get_data[s];
     }
     else {
     result["condition"].andcondition[s] = [];
     result["condition"].andcondition[s].push(get_data[s]);
     }
     }
     else {
     }
     }
     result["issecondquery"] = "false";

     }
	 */
	if (typeof get_data != "undefined" && get_data != "") {
		return true;
	}
	else {
		return false;
	}
};

/*******************取统计数据**********************/

var count = {};      //总数

var $get_statis = function (search_result) {
	var data = JSON.parse(JSON.stringify(search_result));
	data["category"] = ["case_feature", "dispute_focus", "casecause", "courtlevel", "province", "judgeyear", "proceduretype", "doctype", "casetype", "referencetype"];
	count = {};

	var search_data = JSON.parse(JSON.stringify(data));
	//数据处理 律师+法院
	var judge_member = [];
	var court = [];
	var involved_person = [];
	var involved_ = [];
	var involved_court = [];
	var data_judge = search_data["condition"]["andcondition"]["judge"];  //法院转换
	var data_involved_person = search_data["condition"]["andcondition"]["lawyer"];  //律师转换
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

	$.ajax({
		type: 'POST',
		url: 'http://' + ip + '/caa_v3.0/search/statis',
		async: false,
		data: JSON.stringify(search_data),
		dataType: 'json',
		contentType: 'application/json;charset=UTF-8',
		//crossDomain: true == !(document.all),   //IE8兼容
		success: function (data) {
			count = JSON.parse(data.result);
		},
		complete: function (data) {
		},
		error: function () {
			// console.log("统计获取失败！");
		}
	});
};

/*******************取结果数据**********************/
var document_content;       //搜索结果
var document_count; //文书数量
var $get_document = function (search_result, from, sort_type, size) {
	var dtd = $.Deferred();
	var search_data = JSON.parse(JSON.stringify(search_result));
	search_data["sort"] = sort_type;
	search_data["from"] = from;
	search_data["size"] = 20;
	search_data["isAscending"] = false;
	//(search_data);
	//console.dir($.ajax());
	//数据处理
	var newdata=law_trans(search_data);
	var ddr = $.ajax({
		type: 'POST',
		url: 'http://' + ip + '/caa_v3.0/search/document',
		data: JSON.stringify(newdata),
		dataType: 'json',
		timeout: 45000, //超时时间设置，单位毫秒
		contentType: 'application/json;charset=UTF-8',
		//crossDomain: true == !(document.all),   //IE8兼容
		beforeSend: function () {
			$('.shade').fadeIn(200);
			document_content={};
			document_count=0;
		}
	})
	.then(function (data) {
		//时间过渡
		setTimeout(function () {
			$('.shade').fadeOut(200);
			document_content = JSON.parse(data.result);   //取数据
			document_count = data.count;          //取数量
			dtd.resolve(data);
		}
		, 200);
	}, function (data) {
		$('.shade').fadeOut(200);
		$('.png ').removeClass('hide');
		dtd.resolve(data);
		// console.log("文书获取失败！");
	})
	.always(function () {
		//ddr.abort(); //取消请求
	});
	return dtd.promise();
};

var $Associative = function (jsonData) {

	$.ajax({
		type: 'post',
		url: 'http://' + ip + '/caa_v3.0/search/relatedWord',
		data: JSON.stringify(jsonData),
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			var sortArr = [{
				'casecause': '案由'
			}, {'dispute_focus': '争议焦点'}, {'case_feature': '案情特征'}, {'involved_person': '当事人'}, {'lawyer': '律师'}, {'judge': '法官'}];

			var li = '';
			var kong = 0; //避免没数据还显示
			for (var i = 0, l = sortArr.length; i < l; i++) {
				for (var k in sortArr[i]) {
					var arr = data[k];

					if (arr.length > 0) {
						var arr_five = arr_unique(arr).slice(0, 5);

						for (var j = 0, n = arr_five.length; j < n; j++) {
							var arr_indexof = arr_five[j].substring(arr_five[j].lastIndexOf('/') + 1);

							if (k == "case_feature") { //案情特征插入到争议焦点中，先显示争议焦点的数据，不够5个用案情特征凑
								if (arr_five[j].length > 19) {
									li += '<li class="' + k + '"><span>' + '案情特征' + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_indexof.substring(0, 19) + "..." + '</span></a></li>';
								}
								else {
									li += '<li class="' + k + '"><span>' + '案情特征' + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_indexof + '</span></a></li>';
								}
							}
							else if (k == "dispute_focus") {
								if (arr_five[j].length > 19) {
									li += '<li class="' + k + '"><span>' + '案情特征' + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_indexof.substring(0, 19) + "..." + '</span></a></li>';
								} else {
									li += '<li class="' + k + '"><span>' + '案情特征' + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_indexof + '</span></a></li>';
								}
							} else {
								if (arr_five[j].length > 19) {
									li += '<li class="' + k + '"><span>' + sortArr[i][k] + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_indexof.substring(0, 19) + "..." + '</span></a></li>';
								} else {
									li += '<li class="' + k + '"><span>' + sortArr[i][k] + '</span><a href="javascript:void(0);">' + '<span class="item" title="' + arr_five[j] + '">' + arr_five[j] + '</span></a></li>';
								}
							}
						}
					} else {
						kong++;
					}
				}
			}
			$('.dropDown_box ul').html(li);

			var dispute_focus_li = [];
			for (var i = 0; i < $('.mask_drow li').length; i++) {
				if ($('.mask_drow li').eq(i).children('span').text() == '案情特征') {
					dispute_focus_li.push($('.mask_drow li').eq(i));
				}
			}
			for (var i = 0, l = dispute_focus_li.length; i < l; i++) {
				if (i > 4) {
					dispute_focus_li[i].remove();
				}
			}
			if (!$('.dropDown_box div ul').is(":empty")) {
				$(".dropDown_box").slideDown(300);
			}
			else {
				$(".dropDown_box").hide();
			}
		},
		error: function (error) {
			// console.log('网络错误')
		}
	})

};
/**************************************获取end********************************************/



/************************************拼接页面*************************************************/

/*******************插入search栏**********************/

var add_search = function () {
	var html = "";

	html += '<div class="inner">' +
	'<div class="entry">' +
	'<div class="crumbs fl">' +
	'<a href="javascript:void(0);">已选条件：</a>' +
	'<span></span>' +
	'</div>' +
	'<div class="selectedObj fl">' +
	'</div>' +
	'</div>' +
	'</div>'
	;
	$('.search_condition ').append(html);
};

/******************插入nav***************************/

var id_trans = function (string) {
	var trans_its = [
	                 {"type": "casecause", "name": "案由", "icon": "icon_caseCause"},
	                 {"type": "case_feature", "name": "案情特征", "icon": "icon_caseFeature"},
	                 {"type": "courtlevel", "name": "法院层级", "icon": "icon_courtLevel"},
	                 {"type": "referencetype", "name": "参考类型", "icon": "icon_referencetype"},

	                 /*
         {"type": "court", "name": "审理法院", "icon": "icon_court"},
	                  */
	                 {"type": "province", "name": "审理法院", "icon": "icon_province"},
	                 {"type": "judgeyear", "name": "审判年份", "icon": "icon_judgeYear"},
	                 {"type": "proceduretype", "name": "审理程序", "icon": "icon_procedure"},
	                 {"type": "doctype", "name": "文书性质", "icon": "icon_docType"}
	                 ];
	var j;
	for (var i in trans_its) {
		if (trim(string) == trans_its[i]["type"]) {
			j = i;
		}
	}
	return [trans_its[j].name, trans_its[j].icon];
};

var add_nav = function (data_nav) {
	var html = "", html_content = "", html_li = "", html_more = "", html_btn = "";
	var nav_ij;  //对象列表项
	var re_nav_old = data_nav;
	var re_nav = focustofeature(re_nav_old);

	var its_nav = ["case_feature", "referencetype", "casecause", "courtlevel", "province", "judgeyear", "proceduretype", "doctype"];
	for (var f= 0,lenf=its_nav.length;f<lenf;f++) { //顺序插入对象组
		for (var i  in re_nav) {
			html_btn = "";    //
			if (i == its_nav[f]) {
				html_li = "";
				if (re_nav[i] == "") {
					continue;
				}
				for (var j= 0,lenj=re_nav[i].length;j<lenj;j++) {
					nav_ij=re_nav[i][j];
					if (i == "case_feature") {
                        var nav_ij_key_str = nav_ij.key;
                        if(nav_ij_key_str.charAt(nav_ij_key_str.length-1)=='/'){
                            nav_ij_key_str=nav_ij_key_str.substring(0,nav_ij_key_str.length-1)
                        }
                        var doc_feature = nav_ij_key_str.substring(nav_ij_key_str.lastIndexOf('/') + 1).length > 12 ? nav_ij_key_str.substring(nav_ij_key_str.lastIndexOf('/') + 1).substring(0, 11) + "..." : nav_ij_key_str.substring(nav_ij_key_str.lastIndexOf('/') + 1);

						if (j < 10) {
							html_li += '<li class="nav_li" name="' + nav_ij.type + '">' +
							'<a href="javascript:void(0);" title="' + nav_ij.key.substring(nav_ij.key) + '">' +
							doc_feature + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'</li>';
						}
						else if (j >= 10 && re_nav[i].length > 10) {
							html_more += '<li class="nav_li" name="' + nav_ij.type + '">' +
							'<a href="javascript:void(0);" title="' + nav_ij.key.substring(nav_ij.key) + '">' +
							doc_feature + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'</li>';
							if (j == re_nav[i].length - 1) {
								html_li += '<div style="display: none;">' + html_more + '</div>';
								html_btn = '<span class="foldBtn nav_foldBtn">更多</span>';
								html_more = "";
							}
						}
					}

					else if (i == "casecause") {
						var doc_cause =nav_ij.key.length > 12 ?nav_ij.key.substring(0, 11) + "..." : nav_ij.key;
						if (j < 10) {
							html_li += '<li class="nav_li">' +
							'<a href="javascript:void(0);"title="' + nav_ij.key + '">' +
							doc_cause + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'</li>';
						}
						else if (j >= 5 && re_nav[i].length > 5) {
							html_more += '<li class="nav_li">' +
							'<a href="javascript:void(0);" title="' + nav_ij.key + '">' +
							doc_cause + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'</li>';
							if (j == re_nav[i].length - 1) {
								html_li += '<div style="display: none;">' + html_more + '</div>';
								html_btn = '<span class="foldBtn nav_foldBtn">更多</span>';
								html_more = "";
							}
						}
					}
					else if (i == "province") {
						var doc_province = nav_ij.key.length > 12 ? nav_ij.key.substring(0, 11) + "..." : nav_ij.key;
						if (j < 5) {
							html_li += '<li class="nav_li">' +
							'<a class="province" href="javascript:void(0);"title="' + nav_ij.key + '">' +
							'<i class="fa fa-plus wq"></i> ' +
							doc_province + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'<ul class="under_ul_1"></ul>' +
							'</li>';
						}
						else if (j >= 5 && re_nav[i].length > 5) {
							html_more += '<li class="nav_li">' +
							'<a class="province" href="javascript:void(0);" title="' + nav_ij.key + '">' +
							'<i class="fa fa-plus wq"></i> ' +
							doc_province + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'<ul class="under_ul_1"></ul>' +
							'</li>';
							if (j == re_nav[i].length - 1) {
								html_li += '<div style="display: none;">' + html_more + '</div>';
								html_btn = '<span class="foldBtn nav_foldBtn">更多</span>';
								html_more = "";
							}
						}
					}
					else if (i == "judgeyear") {
						var doc_judgeyear = nav_ij.key.length > 11 ? nav_ij.key.substring(0, 11) + "..." : nav_ij.key;
						if (j < 5) {
							html_li += '<li class="nav_li">' +
							'<a href="javascript:void(0);"title="' + nav_ij.key + '">' +
							doc_judgeyear + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'</li>';
						}
						else if (j >= 5 && re_nav[i].length > 5) {
							html_more += '<li class="nav_li">' +
							'<a href="javascript:void(0);" title="' + nav_ij.key + '">' +
							doc_judgeyear + '（' + nav_ij.doc_count + '）' +
							'</a>' +
							'</li>';
							if (j == re_nav[i].length - 1) {
								html_li += '<div style="display: none;">' + html_more + '</div>';
								html_more = "";
								html_btn = '<span class="foldBtn nav_foldBtn">更多</span>';
							}
						}
					}
					else {
						var doc = nav_ij.key.length > 12 ? nav_ij.key.substring(0, 11) + "..." : nav_ij.key;
						html_li += '<li class="nav_li">' +
						'<a href="javascript:void(0);"title="' + nav_ij.key + '">' +
						doc + '（' + nav_ij.doc_count + '）' +
						'</a>' +
						'</li>';
					}
				}
				html_content += '<li class="nav active" id=nav_' + i + '>' + /*id*/
				'<a href="javascript:void(0)">' +
				'<span class="' + id_trans(i)[1] + ' icon"></span>' + /*icon-id*/
				'<span class="lp_2">' +
				id_trans(i)[0] + /*name*/
				'</span>' +
				'<span class="nav_corner">' +
				'<i class="fa fa-angle-up fa-lg"></i>' +
				'</span>' +
				'</a>' +
				'<div class="items">' +
				'<ul>' +
				html_li +
				'</ul>' +
				html_btn +
				'</div>';
			}
		}
	}
	if (html_content != "") {
		html = '<ul>' +
		html_content +
		'</ul>'
		;
		$('.navs').html(html);
	}

	var nav_li = $('#nav_province .items .nav_li');
	for (var z = 0, lenz = nav_li.length; z < lenz; z++) {
		if (nav_li.eq(z).children('a').attr('title') == "最高人民法院") {
			nav_li.eq(z).find('i').remove();
			nav_li.eq(z).find('a').css("margin-left", "25px");
		}
	}

};

/******************添加结果***************************/

var add = function (num) {
	if ($('.result_top ').is(":empty")) {
		add_content_top(document_count);
	}
	add_content_main(document_content, num);
	if ($('#footer').is(":empty")) {
		add_foot();
	}
	if ($('.search_result').find(".load_more").length < 1) {
		add_load();
	}
};
var add_load = function () {
	var html_result = "";
	html_result += '<div class="load_more">加载更多</div>';
	$('.search_result').append(html_result);
};
var add_content_top = function (count) {
	var html_result = "", html_count = "";
	count == undefined ? html_count = "" : html_count = count;

	if (html_count != "" && html_count != 0) {
		html_result +=
			'<div class="array fl">' +
			'<p class="px">排序方式：</p>' +
			'<div class="ar_chose">' +
			'<div class="taga arr_chose">' +
			'<span>相关性</span>' +
			'<img class="array_up " src="../images/ico_down_s.png">' +
			'</div>' +
			'<div class="taga">' +
			'<span>裁判日期</span>' +
			'<img class="array_up" src="../images/ico_down.png">' +
			'</div>' +
			'</div>' +
			'<p class="fl" style="color: #b3b3b3">|</p>' +
			'</div>' +
			'<p class="js_number fl">共检索到&nbsp;' +
			'<span class="blues">' + html_count + '</span>' +
			'&nbsp;篇文书</p>' +
			'</div>'
			;
		$('.result_top').html(html_result);
	}
};
/*结果拼接*/

var nav_click = function (obj) {
	if (obj.attr('name') == "courts") {
		ul_slide(obj);
		return;
	}
	var nav_name = obj.parents('.nav').children('a').find('span').text();
	var nav_type = nav_trans(nav_name, "encode");
	var nav_text = obj.attr("title");
	if ($(obj).parent().attr('name') == "dispute_focus") {
		nav_name = "争议焦点";
	}
	if ($.inArray(nav_name + '：' + nav_text.substring(nav_text.lastIndexOf("/") + 1), arr) == -1) {
		if (nav_type != undefined && nav_type != "" && nav_text != undefined && nav_text != "") {
			if (nav_type == "case_feature") {
				var obj_type = $(obj).parent().attr('name');
				if (typeof result.condition.andcondition[obj_type] == "undefined") {
					result.condition.andcondition[obj_type] = [];
					result.condition.andcondition[obj_type].push(nav_text);
					updata(result);
					add_selectedObj(nav_text, obj_type + "_tag");
				}
				else {
					result.condition.andcondition[obj_type].push(nav_text);
					updata(result);
					add_selectedObj(nav_text, obj_type + "_tag");
				}
			}
			else if (nav_type == "province") {

				var cor = obj.attr('name');
				if (cor == "court") {
					if (typeof result.condition.andcondition[cor] == "undefined") {
						result.condition.andcondition[cor] = [];
						result.condition.andcondition[cor].push(nav_text);
						updata(result);
						add_selectedObj(nav_text, cor + "_tag");
					}
					else {
						result.condition.andcondition[cor].push(nav_text);
						updata(result);
						add_selectedObj(nav_text, cor + "_tag");
					}
				} else {
					if (typeof result.condition.andcondition[nav_type] == "undefined") {
						result.condition.andcondition[nav_type] = [];
						result.condition.andcondition[nav_type].push(nav_text);
						updata(result);
						add_selectedObj(nav_text, nav_type + "_tag");
					}
					else {
						result.condition.andcondition[nav_type].push(nav_text);
						updata(result);
						add_selectedObj(nav_text, nav_type + "_tag");
					}
				}
			}
			else {
				if (typeof result.condition.andcondition[nav_type] == "undefined") {
					result.condition.andcondition[nav_type] = [];
					result.condition.andcondition[nav_type].push(nav_text);
					updata(result);
					add_selectedObj(nav_text, nav_type + "_tag");
				}
				else {
					result.condition.andcondition[nav_type].push(nav_text);
					updata(result);
					add_selectedObj(nav_text, nav_type + "_tag");
				}
			}
		}
	}
	else {
		updata(result);
	}
};

var nav_trans = function (string, code) {
	var navType = "defender_opinion";
	var nav_its = [
	               {"nav_type": "casecause", "name": "案由"},
	               {"nav_type": "dispute_focus", "name": "争议焦点"},
	               {"nav_type": "case_feature", "name": "案情特征"},
	               {"nav_type": "referencetype", "name": "参考类型"},
	               {"nav_type": "courtlevel", "name": "法院层级"},
	               {"nav_type": "province", "name": "审理法院"},
	               {"nav_type": "court", "name": "法院"},
	               {"nav_type": "judgeyear", "name": "审判年份"},
	               {"nav_type": "proceduretype", "name": "审理程序"},
	               {"nav_type": "doctype", "name": "文书性质"},
	               {"nav_type": "court_consider", "name": "本院认为"},
	               {"nav_type": "court_ascertained", "name": "本院查明"},
	               {"nav_type": "applicable_law", "name": "适用法条"},
	               {"nav_type": "commonfields", "name": "全文内容"},   		//关键字
	               {"nav_type": "court_consider", "name": "本院认为"},
	               {"nav_type": "judge_decision", "name": "裁判结果"},
	               {"nav_type": "court_ascertained", "name": "本院查明"},
	               {"nav_type": "involved_person", "name": "当事人"},
	               {"nav_type": "trialprocess", "name": "审理经过"},
	               {"nav_type": "appellant_opinion", "name": "诉称"},
	               {"nav_type": "defender_opinion", "name": "辩称"},
	               {"nav_type": "filename", "name": "文档搜索"},
	               {"nav_type": "lawyer", "name": "律师"},
	               {"nav_type": "judge", "name": "法官"}

	               ];
	var j;
	switch (code) {
	case "encode":
		for (var e in nav_its) {
			if (string == nav_its[e].name) {
				j = e;
			}
		}
		return nav_its[j].nav_type;
		break;
	case "decode":
		for (var s in nav_its) {
			if (string == nav_its[s].nav_type) {
				j = s;
			}
		}
		return nav_its[j].name;
		break;
	}
};
var tab_trans = function (string) {
	var nav_its = [
	               {"nav_type": "court_consider", "name": "本院认为"},
	               {"nav_type": "court_ascertained", "name": "本院查明"},
	               {"nav_type": "applicable_law", "name": "适用法条"}
	               ];
	var j;
	for (var t in nav_its) {
		if (string == nav_its[t].nav_type) {
			j = t;
		}
	}
	return nav_its[j].name;
};
var result_item;            //一页数据
var result_item_s = [];    //当前加载所有数据
var add_content_main = function (data_result, num) {

	result_item = data_result;

	for (var fg = 0, lenf = data_result.length; fg < lenf; fg++) {
		result_item_s.push(data_result[fg]);
	}

	var html = "", html_item = "", html_nav = "", html_case_feature = "", html_dispute_focus = "",
	html_court_consider = "", html_court_ascertained = "", html_applicable_law = "", html_title = "", html_down = "", html_cont = "",
	html_collet = "", html_referencetype = "";
	var its = ["title", "case_feature", "dispute_focus", "highlight",
	           "court_consider", "court_ascertained", "applicable_law",
	           "casecause", "court", "judgedate", "caseid", "casetype", "proceduretype", "referencetype"];          //数据处理组
	var itst = ["court_consider", "court_ascertained", "applicable_law"];                   //nav切换栏
	var itsd = ["casecause", "court", "judgedate", "caseid", "casetype", "proceduretype"];  //下方基本信息

	/*处理*/
	var collect_cheak = [];
	if (user.userid !=""&&user.userid!=undefined) {
		var cheackdata = collectcheck(collects());
		for (var gh in cheackdata) {
			collect_cheak.push(cheackdata[gh].uniqid);
		}
	}
	for (var i= 0,leni=result_item.length;i<leni;i++) {
		//循环插入词条，清空缓存组
		html_case_feature = "";
		html_dispute_focus = "";
		html_court_consider = "";
		html_court_ascertained = "";
		html_applicable_law = "";
		html_down = "";
		html_nav = "";
		html_cont = "";
		html_title = "";
		html_referencetype = "";

		for (var s in its) {
			var its_key = its[s];
			var re_item = result_item[i][its_key];     //数据组
			if (its_key == "case_feature" && typeof re_item != 'undefined') {   //案情特征处理
				var feature_new = [];
				if (typeof re_item == "object") {
					var feature_obj = [];     //重复数据筛选组
					for (var cj= 0,lencj=re_item.length;cj<lencj;cj++) {
						re_item[cj]=re_item[cj]==undefined?"":re_item[cj];
						re_item[cj]=re_item[cj]==null?"":re_item[cj];
						var item_case_tri = trim(re_item[cj]); //取去空数据
						if ($.inArray(item_case_tri, feature_obj) == -1) {
							feature_obj.push(item_case_tri);
                            if(item_case_tri.charAt(item_case_tri.length-1)=="/")
                            {
                                item_case_tri = item_case_tri.substring(0,item_case_tri.length-1);
                            }
							html_case_feature += '<span>' + item_case_tri.substring(item_case_tri.lastIndexOf("/") + 1) + '</span>';
						}
					}
				}
				else {
					var feature_str = re_item.substring(re_item.indexOf("[") + 1, re_item.indexOf("]"));
					var feature_str_obj = stringToArray(feature_str);

					for (var js= 0,lenjs=feature_str_obj.length;js<lenjs;js++) {
						feature_str_obj[js]=feature_str_obj[js]==undefined?"":feature_str_obj[js];
						feature_str_obj[js]=feature_str_obj[js]==null?"":feature_str_obj[js];
						var re_item_tri_1 = trim(feature_str_obj[js]); //移除空白符
						if (re_item_tri_1.lastIndexOf("<b>") != -1) {
							var re_item_new = replaceBTag(re_item_tri_1);
							if ($.inArray(re_item_new, feature_new) == -1) {
								feature_new.push(re_item_new);
                                if(re_item_new.charAt(re_item_new.length-1)=="/")
                                {
                                    re_item_new = re_item_new.substring(0,re_item_new.length-1);
                                }
								html_case_feature += '<span class="b_chose">' + re_item_new.substring(re_item_new.lastIndexOf("/") + 1) + '</span>';
							}
						}
                        else {
                            if ($.inArray(re_item_tri_1, feature_new) == -1) {
                                feature_new.push(re_item_tri_1);
                                if(re_item_tri_1.charAt(re_item_tri_1.length-1)=="/")
                                {
                                    re_item_tri_1 = re_item_tri_1.substring(0,re_item_tri_1.length-1);
                                }
                                html_case_feature += '<span>' + re_item_tri_1.substring(re_item_tri_1.lastIndexOf("/") + 1) + '</span>';
                            }
                        }
                    }
                }
            }
			else if (its_key == "dispute_focus" && typeof re_item != 'undefined' && re_item != "") {

				var focus_new = [];

				if (typeof re_item == "object") {
					var focus_obj = [];
					for (var jv= 0,lenjv=re_item.length;jv<lenjv;jv++) {
						re_item[jv]=re_item[jv]==undefined?"":re_item[jv];
						re_item[jv]=re_item[jv]==null?"":re_item[jv];
						var item_foc_tri = trim(re_item[jv]);
						if ($.inArray(item_foc_tri, focus_obj) == -1) {
							focus_obj.push(item_foc_tri);
							html_dispute_focus += '<span>' + item_foc_tri.substring(item_foc_tri.lastIndexOf("/") + 1) + '</span>';
						}
					}
				}
				else {
					var focus_str = re_item.substring(re_item.indexOf("[") + 1, re_item.indexOf("]"));
					var focus_str_obj = stringToArray(focus_str);

					for (var j= 0,lenj=focus_str_obj.length;j<lenj;j++) {
						focus_str_obj[j]=focus_str_obj[j]==undefined?"":focus_str_obj[j];
						focus_str_obj[j]=focus_str_obj[j]==null?"":focus_str_obj[j];
						var re_item_tri = trim(focus_str_obj[j]); //移除空白符
						if (re_item_tri.lastIndexOf("<b>") != -1) {
							var new_reitem = replaceBTag(re_item_tri);
							if ($.inArray(new_reitem, focus_new) == -1) {
								focus_new.push(new_reitem);
								html_dispute_focus += '<span class="b_chose">' + new_reitem + '</span>';
							}
						}
						else {
							if ($.inArray(re_item_tri, focus_new) == -1) {
								focus_new.push(re_item_tri);
								html_dispute_focus += '<span>' + re_item_tri + '</span>';
							}
						}
					}
				}

			}
			else if (its_key == "title" && typeof re_item != "undefined" && re_item != "") {
				if (re_item.length > 25) {
					html_title = re_item.substr(0, 25) + "...";
				}
				else {
					html_title = re_item;
				}
				if (result_item[i].referencetype == "指导性案例") {
					html_referencetype = '<span class="referencetype">' + result_item[i].referencetype + '</span>';
				}
				else if (result_item[i].referencetype == "公报案例") {
					html_referencetype = '<span class="referencetype_g">' + result_item[i].referencetype + '</span>';

				}
				else {
					html_referencetype = "";
				}
			}
			else if ($.inArray(its_key, itst) != -1) {    //nav处理
				re_item = typeof re_item == "undefined" ? "" : re_item;
				if (re_item == "") {
				}
				else {
					html_nav += '<li id="' + its_key + '">' + tab_trans(its_key) + '</li>';
					if (its_key == "applicable_law") {
						var cc = re_item.split("<span");
						for (var c = 1, len = cc.length; c < len; c++) {
							html_applicable_law += "<span" + cc[c];
						}
						html_cont += '<div class="result_item_cont" id="' + its_key + '">' +
						html_applicable_law +
						'</div>'
					}
					else {
						html_cont += '<div class="result_item_cont" id="' + its_key + '">' +
						"<p>" +
						re_item +
						'</p>' +
						'</div>'
					}
				}
			}
			else {
				re_item = typeof re_item == "undefined" ? "" : re_item;
				result_item[i][its_key] = re_item;
				if ($.inArray(its_key, itsd) != -1) {
					if (re_item == "") {
					} else {
						if (its_key == "casecause") {
							if (re_item.length > 9) {
								html_down += '<span class="case" title="' + re_item + '">' + re_item.substr(0, 9) + "..." + '</span>';
							}
							else {
								html_down += '<span class="case">' + re_item + '</span>';
							}
						}
						else if (its_key == "court") {
							if (re_item.length > 13) {
								html_down += '<span title="' + re_item + '">' + re_item.substr(0, 13) + "..." + '</span>';
							}
							else {
								html_down += '<span>' + re_item + '</span>';
							}
						}
						else if (its_key == "caseid") {
							if (re_item.substring(re_item.lastIndexOf("\\") + 1).length > 18) {
								html_down += '<span title="' + re_item.substring(re_item.lastIndexOf("\\") + 1) + '">' + re_item.substring(re_item.lastIndexOf("\\") + 1).substr(0, 18) + "..." + '</span>';
							}
							else {
								html_down += '<span>' + re_item.substring(re_item.lastIndexOf("\\") + 1) + '</span>';
							}
						}
						else {
							html_down += '<span>' + re_item + '</span>';
						}
					}
				}
			}
		}

		if (JSON.stringify(user) != "{}") {

			if ($.inArray(result_item[i].uniqid, collect_cheak) == -1) {
				html_collet = '<i></i><span>收藏</span>';
			}
			else {
				html_collet = '<i class="collect_i"></i><span class="collect">已收藏</span>';
			}
		}
		else {
			html_collet = '<i></i><span>收藏</span>';
		}

		/*插入*/
		html_item += ' <div class="result_item" id="item_' + parseInt(num + parseInt(i)) + '">' +
		'<div class="result_item_title">' +
		html_referencetype +
		'<h4 title="' + result_item[i].title + '">' + html_title + '</h4>' +
		'<div class="result_item_keywords">' +
		html_case_feature +
		html_dispute_focus +
		'</div>' +
		'</div>' +
		'<div class="result_item_txt">' +
		'<div class="result_item_tabs clearfix">' +
		'<ul>' +
		html_nav +
		'</ul>' +
		'</div>' +
		html_cont +
		'</div>' +
		'<div class="result_item_bot clearfix">' +
		'<div class="result_item_bot_l fl">' +
		html_down +
		'</div>' +
		'</div>' +
		'<div class="result_item_bot_r fr">' +
		'<a href="javascript:void(0);" class="downWord" title="下载该文档">' +
		'<i></i><span>下载</span>' +
		'</a>&nbsp;&nbsp;|&nbsp;&nbsp;' +
		'<a href="javascript:void(0);" class="collectWord" title="收藏该文档">' +
		html_collet +
		'</a>' +
		'</div>' +
		'<div class="dowd_limit hide">' +
		'<span>每天最多下载20篇案例！</span>' +
		'</div>' +
		'<div class="dowd_num">' +
		parseInt(num + parseInt(i) + 1) +
		'</div>' +
		'</div>';
	}
	if (num == 0) {
		$('.result_box').html(html_item);
	}
	else {
		$('.result_box').append(html_item);
	}
	for (var t = 0 + num, lent = $('.result_item').length; t < lent; t++) {
		$('.result_item').eq(t).find('.result_item_tabs ul li').eq(0).addClass("tab_chose");
		$('.result_item').eq(t).find('.result_item_txt .result_item_cont').eq(0).addClass("cont_select");
		for (var g = 0, leng = $('.ti').length; g < leng; g++) {
			var ti = $('.result_item').eq(t).find('.ti').eq(g);
			ti.text('《' + ti.text().replace('《', '<').replace('》', '>') + '》');
			if (g > 0) {
				ti.before('<br>');
			}
		}
		var tr_result=$('.result_item').eq(t).find('.result_item_cont');
		for(var gh =0,lengh=tr_result.length;gh<lengh;gh++)
		{
			if(tr_result.eq(gh).text()==""){
				tr_result.eq(gh).remove();
				$('.result_item').eq(t).find('#applicable_law').eq(0).remove();
			}
		}
	}
};

var add_foot = function () {
	var html = '<div class="inner">' +
	'<div class="footerLfet fl">' +
	'<a href="javascript:void(0);"><img src="../images/logo_n.png" alt=""></a>' +
	'</div>' +
	'<div class="footerMid fl">' +
	'<p>版权所有 中国司法大数据研究院 京ICP备10011865号-1 京公网安备11010502022735</p>' +
	'<p>地址：北京市海淀区北四环中路211号太极大厦15层 邮编：100083</p>' +
	'<p>咨询电话：010-89055055 官方邮箱：info@cjbdi.com</p>' +
	'</div>' +
	'<div class="footerRig fr">' +
	'<img src="../images/QRcode.jpg" alt="">' +
	'<p>研究院微信公众号</p>' +
	'</div>' +
	'</div>'
	;
	$('#footer').append(html);
};

/*******加载更多**********/
var load_more = function (doc_result, array_type, num) {

	$get_document(doc_result, num, array_type).then(function () {
		add_content_main(document_content, num);
		var id = $('.result_item').last().attr('id').substring($('.result_item').last().attr('id').lastIndexOf("_") + 1);
		if (document_count - id - 1 == 0) {
			$('.load_more').addClass("hide");
		}
	});
};
/************************拼接end*****************************/

/************************************功能模块*************************************************/

/*******************插入词条**********************/
/*插入数据*/
var arr = [];
var add_selectedObj = function (DCkey, type) {
	var name_type = nav_trans(type.slice(0, -4), "decode");
	var txt = name_type + '：' + DCkey.substring((DCkey.lastIndexOf('/') + 1));
	if ($.inArray(txt, arr) == -1) {
		arr.push(txt);
		if (typeof DCkey == "object") {
			if (type == "case_feature_tag") {
				for (var i in DCkey) {
					if ($.inArray(DCkey[i], arr) == -1) {
						$('.selectedObj').append(add_span(DCkey[i].substring(DCkey[i].lastIndexOf("/") + 1), type, name_type));
					}
				}
			}
			else {
				for (var j in DCkey) {
					if ($.inArray(key[j], arr) == -1) {
						$('.selectedObj').append(add_span(DCkey[j].substring(DCkey[j].lastIndexOf("/") + 1), type, name_type));
					}
				}
			}
		}
		else {
			if (type == "dispute_focus_tag") {
				$('.selectedObj').append(add_span(DCkey, type, "案情特征"));
			}
			else {
				if(DCkey.lastIndexOf("bs|")!=-1&&type=="filename_tag"){
					$('.selectedObj').append(add_span(DCkey.substring(DCkey.lastIndexOf("|")+1), type, "案号"));

				}else{
				$('.selectedObj').append(add_span(DCkey, type, name_type));
				}
			}
		}
	} else {

	}
};
/*拼接词条*/
var obj_array = [];
var add_span = function (text, text_id, text_type) {
	var string;
	if(text_id=="dispute_focus_tag"||text_id=="case_feature_tag"){
		string = text.substring(text.lastIndexOf('/') + 1).length > 13 ? text.substring(text.lastIndexOf('/') + 1).substr(0, 10) + ".." : text.substring(text.lastIndexOf('/') + 1);
	}else{
		string = text.length > 13 ? text.substr(0, 10) + ".." : text;
	}
	if (text_id == "dispute_focus_tag") {
		var type = "争议焦点";
		if ($.inArray(type + "：" + text, obj_array) == -1) {
			obj_array.push(type + "：" + text);
		}
	}
	else if ($.inArray(text_type + "：" + text, obj_array) == -1) {
		if(text.lastIndexOf("bs|")!=-1&&text_type=="文档搜索"){
			obj_array.push("案件标识" + "：" + text.substring(text.lastIndexOf("|")+1));
		}else{
		obj_array.push(text_type + "：" + text);
		}
	}
	var html = "";
	html +=
		'<span class="' + text_id + '" title="' + text_type + "：" + text + '">' +
		text_type +
		"：" +
		string +
		'<i class="fa fa-times mar_l"></i>' +
		'</span>';
	return html;
};
/******************删除词条***************************/

var Del_span = function (key) {
	var that = key.parent();
	var txt = that.attr('title');
	if (that.attr('class') == "dispute_focus_tag") {
		txt = txt.replace("案情特征", "争议焦点");
	}
	obj_array.splice(obj_array.lastIndexOf(txt), 1);
	var type = that.attr("class").slice(0, -4);
	var Del_its = [
	               "commonfields", "case_feature", "dispute_focus", "court_consider", "judge_decision",
	               "court_ascertained", "involved_person", "trialprocess", "appellant_opinion",
	               "defender_opinion", "courtlevel", "court", "judgeyear",
	               "proceduretype", "doctype", "casetype", "filename", "casecause", "lawyer", "judge", "province", "referencetype"
	               ];
	var arr_del;
	if ($.inArray(type, Del_its) != -1) {
		if (type == "filename") {
			delete result["condition"].orcondition;
			delete result.caseid;
			delete result.filename;
			result.issecondquery = "false";
		}
		else {
			if (JSON.stringify(result["condition"]["andcondition"]) != "{}") {
				var conditions = result["condition"]["andcondition"][type];
				var condition_del = conditions.lastIndexOf(txt.substring(txt.lastIndexOf("：") + 1));
				conditions.splice(condition_del, 1);
				if (txt.indexOf('/') != -1) {
					arr_del = arr.lastIndexOf(txt.substring(0, txt.lastIndexOf('：') + 1) + txt.substring(txt.lastIndexOf('/') + 1));
				} else {
					arr_del = arr.lastIndexOf(txt);
				}
				arr.splice(arr_del, 1);
				if (result["condition"]["andcondition"][type] == "") {
					delete result["condition"]["andcondition"][type];
				}
			}
		}
	}
	that.remove();
	if ($('.selectedObj').is(':empty')) {
		$('.crumbs span').empty();
	}

	//var datas = JSON.parse(JSON.stringify(result));
	//for (var i in datas["condition"]) {
	//	if (JSON.stringify(datas["condition"][i]) == "{}") {
	//		delete datas["condition"][i];
	//	}
	//if (result["condition"]["andcondition"]!=undefined&&JSON.stringify(result["condition"]["andcondition"]) == "{}") {
	//	delete result["condition"]["andcondition"];
	//}
	//result=JSON.parse(JSON.stringify(datas));
//	}

	//(JSON.stringify(datas["condition"]["orconditon"]=="{}"))
    //var flag= store.get('CONDITION_' + caa_id.caa_id[0]);
	var flag={};
	if(		caaCase_id.caa_id!=undefined
			&&sessionCont.getSession('CONDITION_' + caaCase_id.caa_id[0])!=undefined
			&&JSON.stringify(sessionCont.getSession('CONDITION_' + caaCase_id.caa_id[0])!="{}"))
			{
		 flag= sessionCont.getSession('CONDITION_' + caaCase_id.caa_id[0]);
			}else if(location.href.lastIndexOf("ajbs")!=-1){
				flag.flag=1;
			}else{
				flag.flag=0;
			}

    if (JSON.stringify(result["condition"]["andcondition"]) == "{}"&&flag.flag==0) {
		$('.search_condition .inner').hide();
		$('.result_top').empty();
		$('.result_box').empty();
		$('.navs').empty();
		$('.load_more').addClass('hide');
		$('.png').removeClass('hide');
	} else {
		if(JSON.stringify(result["condition"]["orcondition"]) != "{}"){
			$('.search_condition .inner').show();
			$('.png').addClass('hide');
		}else{

		}
		/*$('.search_condition .inner').show();
		$('.png').addClass('hide');*/
	}
	updata(result);

	/*$search*/
};

/*******************搜索**********************/

var text; //搜索文本
var $search = function (obj) {

	var that = obj;
	text = $('.search_ipt').val();
	var cc = $('.search_select').find('span').text() + "：" + text;

	if ($.inArray(cc, arr) != -1) {
		/*清空input*/
		$('.search_ipt').val("");
		$('.placeholder').show();
		$('.search_condition .inner').show();
		updata(result);
		return;
	}
	if (text != "") {
		var text_type = $(that).parent().siblings('.searchLeft').find('span').text();
		var text_cont = search_trans(text_type);

		if(result["condition"].andcondition==undefined) {
			result["condition"].andcondition = [];
		}
		if (typeof result["condition"].andcondition[text_cont[0]] == "undefined") {
			result["condition"].andcondition[text_cont[0]] = [];
			result["condition"].andcondition[text_cont[0]].push(text);
		}
		else {
			result["condition"].andcondition[text_cont[0]].push(text);
		}

		/*$ajax*/
		add_selectedObj(text, text_cont[1]);
		updata(result);
		/*清空input*/
		$('.search_ipt').val("");
		$('.placeholder').show();
		$('.search_condition .inner').show();

	}
	else {
	}
};

var search_trans = function (string) {
	var its = [
	           {"id": "commonfields", "name": "全文内容", "tag_name": "commonfields_tag"},   		//关键字
	           {"id": "case_feature", "name": "案情特征", "tag_name": "case_feature_tag"}, //案情特征
	           {"id": "court_consider", "name": "本院认为", "tag_name": "court_consider_tag"},
	           {"id": "judge_decision", "name": "裁判结果", "tag_name": "judge_decision_tag"},
	           {"id": "court_ascertained", "name": "本院查明", "tag_name": "court_ascertained_tag"},
	           {"id": "involved_person", "name": "当事人", "tag_name": "involved_person_tag"},
	           {"id": "trialprocess", "name": "审理经过", "tag_name": "trialprocess_tag"},
	           {"id": "appellant_opinion", "name": "诉称", "tag_name": "appellant_opinion_tag"},
	           {"id": "defender_opinion", "name": "辩称", "tag_name": "defender_opinion_tag"},
	           {"id": "casecause", "name": "案由", "tag_name": "casecause_tag"},
	           {"id": "lawyer", "name": "律师", "tag_name": "lawyer_tag"},
	           {"id": "judge", "name": "法官", "tag_name": "judge_tag"}
	           ];
	var j;
	for (var i in its) {
		if (string == its[i].name) {
			j = i;
		}
	}
	return [its[j].id, its[j].tag_name];
};
/*******************更新页面**********************/
//更新condition
var updata = function (result_condition) {

	//var result_copy = lawycopy(result_condition);

	result_item_s = []; //清空数据组

    //var ttr=store.get('CONDITION_' + caa_id.caa_id[0]);
	var ttr=sessionCont.getSession('CONDITION_' + caaCase_id.caa_id[0]);

	var condition_new = {};
	condition_new["condition"] = result_condition.condition;
	if (result_condition.condition.orcondition != undefined&&ttr.flag==1) {
		condition_new['caseid'] = detail['caseid'];
		condition_new['filename'] = detail['filename'];
		condition_new['flag'] = 1;
	} else {
		condition_new['flag'] = 0;
	}
	//store.set('CONDITION_' + caa_id.caa_id[0], condition_new);
	sessionCont.setSession('CONDITION_' + caaCase_id.caa_id[0], condition_new);

	//校验，当条件组为空，或以文检索为空字段时，不进行搜索
	//var flag= store.get('CONDITION_' + caa_id.caa_id[0]);
	var flag= sessionCont.getSession('CONDITION_' + caaCase_id.caa_id[0]);

	if((flag.condition.andcondition!=undefined&&flag.condition.orcondition==""&&flag.flag==1)||
        (flag.condition.andcondition!=undefined&&JSON.stringify(flag.condition.orcondition)=="{}"&&flag.flag==1)||
		(JSON.stringify(flag.condition.orcondition)=="{}"&&JSON.stringify(flag.condition.andcondition)=="{}")){
		//JSON.stringify(flag.condition.andcondition)=="{}"&&flag.flag==0){
		$('.result_top').empty();
		$('.result_box').empty();
		$('.navs').empty();
		$('.png').removeClass('hide');
		$('.load_more').addClass('hide');
		return;
	}

	$get_document(result_condition, 0, array_type).then(function () {

		getstatisCondition(result_condition, "simple", user.userid);

		if (document_count > 0) {

			add(0);
			$('.js_number').find('span').text(document_count);
			$get_statis(result_condition);
			add_nav(count);
			array_type = "_score";
			var select_taga=$('.ar_chose').find('.taga');
			select_taga.eq(0).addClass('arr_chose').siblings().removeClass('arr_chose');
			select_taga.eq(0).children('img').attr('src', '../images/ico_down_s.png');
			select_taga.find('.taga').eq(1).children('img').attr('src', '../images/ico_down.png');
			$('.png').addClass('hide');
			if (document_count <= 20) {
				$('.load_more').addClass('hide');
			} else {
				$('.load_more').removeClass('hide');
			}
		}
		else {
			$('.result_top').empty();
			$('.result_box').empty();
			$('.navs').empty();
			$('.png').removeClass('hide');
			$('.load_more').addClass('hide');
		}

	});
};

/*******************排序**********************/
var array_type;   //排序方式
var $array = function (ranktype) {

	if (ranktype == "相关性") {
		array_type = "_score";
	}
	else {
		array_type = "judgedate";
	}
	//排序
	result_item_s = [];
	$get_document(result, 0, array_type).then(function () {
		add(0);
		$('.js_number').find('span').text(document_count);
		if (document_count >= 20) {
			$('.load_more').removeClass('hide');
		}
		else {
			$('.load_more').addClass('hide');
		}
	});
};

/*******************悬停详情**********************/
var $fade = function () {
	/*悬停详情*/
	body_on('mouseover', '.fg', function (ev) {
		$('.law_detail').remove();
		var html = "";
		var ask_title = {
				rule: $(this).attr("rule"),
				article: $(this).attr("article")
		};
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
		var oEvent = ev || event;
		var oDiv = document.createElement('div');
		var txtp = document.createElement('p');
		txtp.innerHTML = html == "" ? "目前该法条未收录" : html;
		/*偏移量*/
		var offx = 380;
		var offy = $(document).scrollTop() + 16;

		oDiv.className = 'law_detail';              //class
		oDiv.style.left = oEvent.clientX - offx + 'px';  // 指定创建的DIV在文档中距离左侧的位置
		oDiv.style.top = oEvent.clientY + offy + 'px';  // 指定创建的DIV在文档中距离顶部的位置
		oDiv.style.position = 'absolute'; // 为新创建的DIV指定绝对定位

		oDiv.appendChild(txtp);
		document.body.appendChild(oDiv);

		if (!$('body').children().is('.className')) {
			document.body.appendChild(oDiv);
		}
	});
	body_on('mouseleave', '.law_detail', function () {
		$('.law_detail').remove();
	});
};

/*******************传值至详情页**********************/
var produce_doc = function (obj) {
	var index = $(obj).parents('.result_item').attr('id').substring(5);
	//var subStr = '?';
	var pro_data = JSON.parse(JSON.stringify(result));

	/*    for (var i in  pro_data["condition"]) {
     var ss = pro_data["condition"][i];
     if (JSON.stringify(pro_data["condition"][i]) == "{}") {
     delete pro_data["condition"][i];
     }
     }
     for (var key in pro_data["condition"]) {
     subStr += key + '=(';
     for (var w in pro_data["condition"][key]) {
     var str = "";
     for (var r in pro_data["condition"][key][w]) {
     if (pro_data["condition"][key][w].length < 2) {
     str += pro_data["condition"][key][w][r];
     }
     else {
     r == pro_data["condition"][key][w].length - 1 ? str += pro_data["condition"][key][w][r] : str += pro_data["condition"][key][w][r] + ',';
     }
     }
     var stri = w + '=' + str;
     subStr += '*' + stri;
     }
     subStr += ')&';
     }
     subStr = subStr.replace(/\(\*!/g, '(');
     //var ins =index%20;
     var uniqid = result_item_s[index].uniqid;
     var offset = index;
     var issecondquery = result.issecondquery;
     if (result.caseid != undefined) {
     subStr += "uniqid=" + uniqid + "&offset=" + offset + "&issecondquery=" + issecondquery + "&caseid=" + result.caseid;
     } else {
     subStr += "uniqid=" + uniqid + "&offset=" + offset + "&issecondquery=" + issecondquery;
     }
     window.open(encodeURI("./docDetails.html" + subStr));*/
	pro_data.sort = array_type;
	//传值

	//store.set('CONDITION_' + caa_id.caa_id[0], pro_data);
	sessionCont.setSession('CONDITION_' + caaCase_id.caa_id[0], pro_data);

	//window.open("./docDetails.html?caa_id=CONDITION_" + caaCase_id.caa_id[0] + "&offset=" + index + "&uniqid=" + encodeURI(result_item_s[index].uniqid));
	var url="./docDetails.html?caa_id=CONDITION_" + caaCase_id.caa_id[0] + "&offset=" + index + "&uniqid=" + encodeURI(result_item_s[index].uniqid);
	var a = document.createElement("a");
	a.setAttribute("href", url);
	a.setAttribute("target", "_blank");
	a.setAttribute("id", "openwin");
	document.getElementById('iframe').appendChild(a);
	a.click();
};
/**/
var addresult = function (string, value) {

	var cc = nav_trans(string, "decode") + "：" + value.substring(value.lastIndexOf('/') + 1);
	if ($.inArray(cc, arr) != -1) {
		updata(result);
		return;
	}
	if (typeof result["condition"]["andcondition"][string] == "undefined") {
		result["condition"]["andcondition"][string] = [];
		result["condition"]["andcondition"][string].push(value);
	}
	else {
		result["condition"]["andcondition"][string].push(value);
	}
	$('.search_condition .inner').show();
	add_selectedObj(value, string + "_tag");
	updata(result);
};

var downWord = function (obj) {
//	checkDayDownloadCount();
//	if (Downcheck.resultcode == "0000") {
		var uni_index = $(obj).parents('.result_item').attr('id').substring($(obj).parents('.result_item').attr('id').lastIndexOf("_") + 1);
		var uniqid = result_item_s[uni_index].uniqid;
		var url = 'http://' + ip + '/caa_v3.0/search/downloadDocument';
		var param = {"uniqid": uniqid, "userid": user.userid};
		var new_param = down_de(obj);
		download(url, param, new_param);
//	}
//	else {
//		$(obj).parents('.result_item').find('.dowd_limit').removeClass('hide');
//	}
};

var collectWord = function (obj) {
	var new_param = down_de(obj);
	//收藏校验
	var uni_index = $(obj).parents('.result_item').attr('id').substring($(obj).parents('.result_item').attr('id').lastIndexOf("_") + 1);
	var uniqid = result_item_s[uni_index].uniqid;
	var back_id = "";
	back_id=collectcheck(uniqid);
	if ($(obj).text() == "收藏") {


		if (back_id.length > 0) {
			$(obj).find('i').addClass('collect_i');
			$(obj).find('span').addClass('collect');
			$(obj).find('span').text("已收藏");
		}
		else {
			var url = 'http://' + ip + '/caa_v3.0/search/collectDocument';
			new_param.type = "collect";
			collect(url, new_param);
			if (collect_type == "0000") {
				$(obj).find('i').addClass('collect_i');
				$(obj).find('span').addClass('collect');
				$(obj).find('span').text("已收藏");
			}
		}
	} else {
		var url = 'http://' + ip + '/caa_v3.0/search/collectDocument';
		var old_param = {};
		for (var i in collectcheck_array) {
			if (new_param.uniqid == collectcheck_array[i].uniqid) {
				old_param.recordid = collectcheck_array[i].id;
			}
		}
		old_param.userid = new_param.userid;
		old_param.type = "discollect";
		collect(url, old_param);
		if (collect_type == "0000") {
			$(obj).find('i').removeClass('collect_i');
			$(obj).find('span').removeClass('collect');
			$(obj).find('span').text("收藏");
			collectcheck(collects());
		}
	}
};

var collectcheck_array = [];
var collects = function () {
	var arr = [];
	for (var d in result_item_s) {
		arr.push(result_item_s[d].uniqid);
	}
	return arr;
};

var collectcheck = function (id) {
	var params = {"userid": user.userid, "uniqid": id, "type": "collect"};
	var url = 'http://' + ip + '/caa_v3.0/search/checkDownloadOrCollect';
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(params),
		async: false,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			collectcheck_array = data.result;
		}
	});
	return collectcheck_array;
};
var Downcheck;
var checkDayDownloadCount = function () {
	var params = {"userid": user.userid};
	var url = 'http://' + ip + '/caa_v3.0/search/checkDayDownloadCount';
	$.ajax({
		type: "POST",
		url: url,
		data: JSON.stringify(params),
		async: false,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			Downcheck = data;
		}
	});
};

/*var lawycopy = function (result_condition) {
 var result_condition_copy = JSON.parse(JSON.stringify(result_condition));
 var lawyer_old = result_condition_copy["condition"]["andcondition"]["lawyer"];
 var lawyer_new = [];
 if (JSON.stringify(lawyer_old) != "{}" && lawyer_old != undefined) {
 for (var qe in lawyer_old) {
 var old_law = lawyer_old[qe];
 lawyer_new.push(old_law.substring(0, old_law.lastIndexOf("(")));
 lawyer_new.push(old_law.substring(old_law.lastIndexOf("(") + 1, old_law.lastIndexOf(")")));
 }
 result_condition_copy["condition"]["andcondition"]["lawyer"] = lawyer_new;
 }
 return result_condition_copy;
 };*/

var focustofeature = function (obj) {   //归并数组
	var old_result = JSON.parse(JSON.stringify(obj));
	var old_case_feature = old_result.case_feature;
	var old_dispute_focus = old_result.dispute_focus;
	for (var i in old_case_feature) {
		old_case_feature[i].type = "case_feature";
	}
	for (var j in old_dispute_focus) {
		old_dispute_focus[j].type = "dispute_focus";
	}
	var new_case = [];
	new_case.length = old_case_feature.length + old_dispute_focus.length;
	var m = 0, n = 0;
	for (var g = 0, leng = new_case.length; g < leng; g++) {
		if (m == old_case_feature.length) {
			new_case[g] = old_dispute_focus[n++];
		}
		else if (n == old_dispute_focus.length) {
			new_case[g] = old_case_feature[m++];
		}
		else {
			if (old_case_feature[m].doc_count > old_dispute_focus[n].doc_count) {
				new_case[g] = old_case_feature[m++];
			}
			else {
				new_case[g] = old_dispute_focus[n++];
			}
		}
	}
	old_result.case_feature = new_case;
	delete old_result.dispute_focus;
	return old_result;
};

var $get_court = function (nav_text) {
	var messeage_new = [];
	var pro_result = JSON.parse(JSON.stringify(result));
	pro_result.province = nav_text;
	pro_result["category"] = ["court"];
	$.ajax({
		type: "POST",
		url: 'http://' + ip + '/caa_v3.0/search/statis',
		data: JSON.stringify(pro_result),
		async: false,
		dataType: 'json',
		contentType: 'application/json',
		success: function (data) {
			var messeage = JSON.parse(data.result).court;
			messeage_new = [];
			for (var i in messeage) {
				if (messeage[i].level == 1) {
					if (messeage[i].name.lastIndexOf("高级人民法院") != -1) {
						messeage_new.push(messeage[i]);
						messeage[i].children = [];
						var h_new = {
								name: messeage[i].name,
								count: messeage[i].count,
								pid: messeage[i].id,
								id: "20008" + Math.ceil(Math.random() * 10),
								level: 2
						};
						messeage[i].children.push(h_new);
					}
					for (var j  in messeage) {
						if (messeage[j].pid == messeage[i].id) {
							if ($.inArray(messeage[i], messeage_new) == -1) {
								messeage_new.push(messeage[i]);
								messeage[i].children = [];
							}
							messeage[i].children.push(messeage[j]);
						}
					}
				}
			}
		}
	});
	return messeage_new;
};
var add_court = function (message, obj) {
	var html_li_1 = "", html_li_2 = "";
	for (var i = 0, leni = message.length; i < leni; i++) {
		html_li_2 = "";
		if (message[i].children != {} && message[i].children != undefined) {    //有下级节点
			for (var j = 0, lenj = message[i].children.length; j < lenj; j++) {
				if (message[i]["children"][j].name.length > 14) {
					html_li_2 += '<li class="nav_li li_level_2">' +
					'<a href="javascript:void(0);" name="court" title="' + message[i]["children"][j].name + '">' +
					message[i]["children"][j].name.substring(0, 13) + ".." + '（' + message[i]["children"][j].count + '）' +
					'</a>' +
					'</li>';
				} else {
					html_li_2 += '<li class="nav_li li_level_2">' +
					'<a href="javascript:void(0);" name="court" title="' + message[i]["children"][j].name + '">' +
					message[i]["children"][j].name + '（' + message[i]["children"][j].count + '）' +
					'</a>' +
					'</li>';
				}
			}
			if (message[i].name.lastIndexOf("高级人民法院") != -1) {
				html_li_1 += '<li class="nav_li li_level_2 high_court">' +
				'<a href="javascript:void(0);" name="court" title="' + message[i].name + '">' +
				message[i].name + '（' + message[i].count + '）' +
				'</a>' +
				'</li>';
			} else {
				html_li_1 += '<li class="nav_li li_level_1">' +
				'<a href="javascript:void(0);" name="courts" title="' + message[i].name + '">' +
				'<i class="fa fa-plus wq"></i> ' +
				message[i].name + '（' + message[i].count + '）' +
				'</a>' +
				'<ul class="under_ul_2">' +
				html_li_2 +
				'</ul>' +
				'</li>';
			}
		}
		else {
			html_li_1 += '<li class="nav_li li_level_1">' +
			'<a href="javascript:void(0);" name="courts" title="' + message[i].name + '">' +
			'<i class="fa fa-plus wq"></i> ' +
			message[i].name + '（' + message[i].count + '）' +
			'</a>' +
			'</li>';
		}
	}
	$(obj).find('.under_ul_1').html(html_li_1);
};
var ul_slide = function (obj) {
	var obj_new = obj.children();
	if ($(obj_new).hasClass('fa-plus')) {
		$(obj_new).removeClass('fa-plus').addClass('fa-minus');
		$(obj_new).parent().siblings('ul').slideDown(300);
	}
	else if ($(obj_new).hasClass('fa-minus')) {
		$(obj_new).removeClass('fa-minus').addClass('fa-plus');
		$(obj_new).parent().siblings('ul').slideUp(300);
	}
};

/**********************功能模块end******************************/
