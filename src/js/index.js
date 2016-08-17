//展播初始化
var officialWebsiteSwiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    spaceBetween: 30,
    paginationClickable: true,
    centeredSlides: true,
    autoplay: 3000,
    autoplayDisableOnInteraction: false
});

//banner点击统计
$$('.swiper-container').on('click',function(){
    _hmt.push(['_trackEvent', 'swiper', 'click', 'banner']);
});

////导航按钮
//$$('.open-panel-button').on('click',function(){
//    myApp.openPanel('left');
//});

//setTimeout(function(){
//    myApp.addNotification({
//        message: 'Simple message'
//    });
//
//    //myApp.addNotification({
//    //    title: '真是个酷炫狂拽的App',
//    //    subtitle: '来自土豆的消息',
//    //    message: '地瓜地瓜，土豆呼叫地瓜。在9点方向发现如花，BalaBalaBala',
//    //    media: '<img width="44" height="44" style="border-radius:100%" src="assets/icon/goddness.png">'
//    //});
//},3000);


window.onload = function(){
    //展播图片锚点设置
    var pHeight1 = $$('#index-swiper-pic1').offset().top;//‘独创语音球’
    var pHeight2 = $$('#index-swiper-pic2').offset().top;//‘万人工会开黑’
    var pHeight3 = $$('#index-swiper-pic3').offset().top;//‘千万福利礼包’
    var pHeight4 = $$('#index-swiper-pic4').offset().top;// '最IN游戏中心'

    //console.log('1',pHeight1,'2',pHeight2,'3',pHeight3,'4',pHeight4);
    $$('.index-swiper-pic1').on('click',function(){
        $$('.official-index-content').scrollTop(pHeight1,300);
    });
    $$('.index-swiper-pic2').on('click',function(){
        $$('.official-index-content').scrollTop(pHeight2,480);
    });
    $$('.index-swiper-pic3').on('click',function(){
        $$('.official-index-content').scrollTop(pHeight3,660);
    });
    $$('.index-swiper-pic4').on('click',function(){
        $$('.official-index-content').scrollTop(pHeight4,800);
    });

    //footer返回首页顶部锚点
    $$('.index-back-top').on('click',function(){
        $$('.official-index-content').scrollTop(0,500);
    });
}

//下拉滚动，底部按钮样式变化
$$('.official-index-content').scroll(function(){
    var t = $$('.official-index-content').scrollTop();
    if(t >= 200){
        $$('.download-notification').show();
    }
    if(t < 200){
        $$('.download-notification').hide();
    }
});

//下载按钮
$$('.download-button').on('click',function(){
    myApp.downloadTT();
});
$$('.download-notification').on('click',function(){
    myApp.downloadTT();
});

