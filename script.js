/**
 * Created by Sunshine on 16/8/14.
 */


$(function(){
    input();
    changeSkin();
    nav();
    hot();
    ad();
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

//导航效果
function nav(){
    $(".nav li").hover(function(){
       $(this).find(".jnNav").show();
    },function(){
        $(this).find(".jnNav").hide();
    });
}

//添加hot显示
function hot(){
    $(".jnCatainfo .promoted").append("<s class='hot'></s>");
}

//首页大屏广告效果
function ad(){
    var index = 0;
    var $imagerolls = $("#jnImageroll div a");
    $imagerolls.mouseover(function(){
        index = $("#jnImageroll div a").index(this);
        showImg(index);
    }).eq(0).mouseover();

    var adTimer = null;
    var len = $imagerolls.length;
    $("#jnImageroll").hover(function(){
       if(adTimer){
           clearInterval(adTimer);
       }
    },function(){
       adTimer = setInterval(function(){
           showImg(index);
           index++;
           if(index == len){
               index = 0;
           }
       },3000);
    }).trigger("mouseleave");
}

function showImg(index){
    var $rollobj = $("#jnImageroll");
    var $rolllist = $rollobj.find("div a");
    var newhref = $rolllist.eq(index).attr("href");
    $("#JS_imgWrap").attr("href",newhref)
        .find("img").eq(index).stop(true,true).fadeIn()
        .siblings().fadeOut();
    $rolllist.removeClass("chos").css("opacity","0.7")
        .eq(index).addClass("chos").css("opacity","1");
}

//超链接文字提示
function tooltip(){

}