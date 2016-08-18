/**
 * Created by Sunshine on 16/8/14.
 */


$(function(){
    input();
    changeSkin();
    nav();
    hot();
    ad();
    tooltip();
    imgSlide();
    imgHover();
    use_jqzoom();
    switchImg();
    switchColor();
    sizeAndprice();
    star();
    finish();
});

//index

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
    var x = 10;
    var y = 20;
    $("a.tooltip").mouseover(function(e){
        this.myTitle = this.title;
        this.title = "";
        var tooltip = "<div id='tooltip'>" + this.title + "</div>";
        $("body").append(tooltip);
        $("#tooltip").css({
            "top":(e.pageY + y) + "px",
            "left":(e.pageX + x) + "px"
        }).show("fast");
    }).mouseout(function(){
        this.title = this.myTitle;
        $("#tooltip").remove();
    }).mousemove(function(e){
        $("#tooltip").css({
            "top":(e.pageY + y) + "px",
            "left":(e.pageX + x) + "px"
        });
    });
}

//品牌活动模块横向滚动
function imgSlide(){
    var $jnBrandTabA = $("#jnBrandTab li a");
    $jnBrandTabA.click(function(){
        $(this).parent().addClass("chos").siblings().removeClass("chos");
        var index = $jnBrandTabA.index(this);
        showBrandList(index);
        return false;
    }).eq(0).click();
}

function showBrandList(index){
    var $rollobj = $("#jnBrandList");
    var rollWidth = $rollobj.find("li").outerWidth();
    rollWidth = rollWidth*4;
    $rollobj.stop(true,false).animate({
        left:-rollWidth*index
    },1000);
}

//滑过图片出现放大镜效果
function imgHover(){
    $("#jnBrandList li").each(function(index){
        var spanHtml = '<span style="position:absolute;top:0;left:5px; width: 183px;height: 164px;" class="imageMask"></span>';
        $(spanHtml).appendTo(this);
    });
    $("#jnBrandList").delegate(".imageMask","hover",function(){
        $(this).toggleClass("imageOver");
    });

    //最后一段或者
    //$("#jnBrandList").find(".imageMask").live("hover",function(){
    //    $(this).toggleClass("imageOver");
    //});
}


//detail

//产品缩略图
function use_jqzoom(){
    $('.jqzoom').jqzoom({
        zoomType: 'standard',
        lens:true,
        preloadImages: false,
        alwaysOn:false,
        zoomWidth: 340,
        zoomHeight: 340,
        xOffset:10,
        yOffset:0,
        position:'right'
    });
}

//产品小图切换大图
function switchImg(){
    $("#jnProitem ul.imgList li a").bind("click",function(){
        var imgSrc = $(this).find("img").attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0,i);
        var imgSrc_big = imgSrc + "_big" + unit;
        $("#thickImg").attr("href",imgSrc_big);
    });
}

//产品换颜色
function switchColor(){
    $(".color_change ul li img").click(function(){
        $(this).addClass("hover")
            .parent().siblings().find("img").removeClass("hover");
        var imgSrc = $(this).attr("src");
        var i = imgSrc.lastIndexOf(".");
        var unit = imgSrc.substring(i);
        imgSrc = imgSrc.substring(0,i);
        var imgSrc_small = imgSrc + "_one_small"+ unit;
        var imgSrc_big = imgSrc + "_one_big"+ unit;
        $("#bigImg").attr({"src": imgSrc_small });
        $("#thickImg").attr("href", imgSrc_big);
        var alt = $(this).attr("alt");
        $(".color_change strong").text(alt);
        var newImgSrc = imgSrc.replace("images/pro_img/","");
        $("#jnProitem .imgList li").hide();
        $("#jnProitem .imgList").find(".imgList_" + newImgSrc).show();
        $("#jnProitem .imgList").find(".imgList_" + newImgSrc).eq(0).find("a").click();
    });
}

//产品尺寸和价格计算
function sizeAndprice(){
    $(".pro_size li").click(function(){
        $(this).addClass("cur").siblings().removeClass("cur");
        $(this).parents("ul").siblings("strong").text($(this).text());
    });

    var $span = $(".pro_price strong");
    var price = $span.text();
    $("#num_sort").change(function(){
        var num = $(this).val();
        var amount = num*price;
        $span.text(amount);
    }).change();
}

//星级评分
function star(){
    $("ul.rating li a").click(function(){
        var title = $(this).attr("title");
        alert("您给此商品的评分是："+title);
        var cl = $(this).parent().attr("class");
        $(this).parent().parent().removeClass().addClass("rating " + cl + "star");
        $(this).blur();
        return false;
    });
}

//内容提交
function finish(){
    var $product = $(".jnProDetail");
    $("#cart a").click(function (e) {
        var pro_name = $product.find("h4:first").text();
        var pro_size = $product.find(".pro_size strong").text();
        var pro_color =  $(".color_change strong").text();
        var pro_num = $product.find("#num_sort").val();
        var pro_price = $product.find(".pro_price strong").text();
        var dialog = "感谢您的购买。" +
            "<div style='font-size:12px;font-weight:400;'>" +
            "您购买的产品是："+pro_name+"；"+
            "尺寸是："+pro_size+"；"+
            "颜色是："+pro_color+"；"+
            "数量是："+pro_num+"；"+
            "总价是："+pro_price +"元。" +
            "</div>";
        $("#jnDialogContent").html(dialog);
        $('#basic-dialog-ok').modal({
            overlayClose:true
        });
        return false;//避免页面跳转
    });
}

