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
});

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