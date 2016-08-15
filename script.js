/**
 * Created by Sunshine on 16/8/14.
 */


$(function(){
    input();
    changeSkin();
});

//搜索文本框效果
function input(){
    $("#inputSearch").focus(function(){
        $(this).addClass("focus");
        if($(this).val() == this.defaultValue){
            $(this).val("");
        }
    }).blur(function(){
        $(this).removeClass("focus");
        if($(this).val() == ''){
            $(this).val(this.defaultValue);
        }
    }).keyup(function(e){
        if(e.which == 13){
            alert("回车提交表单");
        }
    });
}

//修改皮肤样式
function changeSkin(){
    var $li = $("#skin li");
    $li.click(function(){
       switchSkin(this.id);
    });
    var cookie_skin = $.cookie("MyCssSkin");
    if(cookie_skin){
        switchSkin(cookie_skin);
    }
}

function switchSkin(skinNmae){
    $("#"+skinNmae).addClass("selected")
        .siblings().removeClass("selected");
    $("#cssfile").attr("href","styles/skin/" + skinNmae + ".css");
    $.cookie("MyCssSkin",skinNmae,{path:'/',expires:10});
}