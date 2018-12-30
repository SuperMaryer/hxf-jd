// swiper 滑动初始化
// 注意左右要分开  分别初始化

var swiper = new Swiper('.jd-category-tab .swiper-container', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical',
    slidesPerView: 'auto',
    mousewheelControl: true,
    freeMode: true,
    roundLengths: true, //防止文字模糊
});


var swiper = new Swiper('.jd-category-content .swiper-container', {
    scrollbar: '.swiper-scrollbar',
    direction: 'vertical', //垂直, 默认是水平,这个要写
    slidesPerView: 'auto', //不可省略
    mousewheelControl: true,
    freeMode: true, // 是否添加滑动的惯性
    roundLengths: true, //防止文字模糊
    scrollbar: {
        el: '.swiper-scrollbar',
    },
});




//给左边栏添加点击事件: 点到哪个li标签就让li标签吸顶
//计算出内容盒子要向上滚动的距离: 每个li的高度*第N个li  用自定义属性index记录下标

//1.获取元素
var lis = document.querySelectorAll('.jd-category-tab li');
// 获取分类左侧的swiper-wrapper 真正滑动的元素
// var swiperWrapper = document.querySelector('.jd-category-tab .swiper-wrapper');
//2.获取每个li的高度
var liHeight = lis[0].offsetHeight;
console.log(liHeight);


//求滚出的最远距离 ,负数, 作为最小值   = 内容盒子高度 - 显示盒子的高度
var container = document.querySelector('.jd-category-tab .swiper-container');
var swiperSlide =document.querySelector('.jd-category-tab  .swiper-slide')
var minSlide = container.offsetHeight-swiperSlide.offsetHeight;
console.log(minSlide);

//3.给每个li添加点击事件
for (var i = 0; i < lis.length; i++) {
    // 给每个li添加自定义属性,记录下标
    // lis[i].setAttribute['index']=i;  //三种方法都可以, 用对应的方法进行取值
    // lis[i].index = i;
    lis[i].dataset['index']=i
    lis[i].addEventListener('click', function () {

        //获取到当前点击的li的下标
        // var index = this.getAttribute['index'];
        // var index = this.index;
        var index = this.dataset['index'];
        //求出要滚动的距离  //要转换成负数,,,往上移动
        var translateY = -index * liHeight;
        console.log(translateY);
        

        //判断: 如果滚动距离超过了最低边, 设为最大滚动距离即可
        if (translateY<=minSlide) {
            translateY = minSlide;
        }

        //赋值给页面元素swiper-slide
        swiperSlide.style.transform  = "translateY("+translateY+"px)";

        //给动画一个过度
        swiperSlide.style.transition = 'all 0.2s';

        //active 类的重新赋值:  先移除所有li的active . 再给当前的li加上
         for(var i =0;i<lis.length;i++){
             lis[i].classList.remove('active');
        }
        this.classList.add('active');
    })
}





/*
//用原生js实现触摸滚动事件:  核心:内容盒子滚动的距离= 触摸结束时手clientY-触摸开始是手clientY

//获取触摸开始的位置
    //记录滑动开始的位置
    var startY = 0;
    //记录滑动时的位置
    var  moveY = 0;
    //记录话滑动的距离
    var slideY = moveY - startY;
    //记录滑动之前的距离
    var currentY = 0;

//获取左边栏
var jdTab = document.querySelector('.jd-category-tab');
//获取内容盒子
var swiperSlide = document.querySelector('.jd-category-tab .swiper-slide');

//给左边栏添加滑动触摸事件
//开始滑动是获取滑动开始的位置
jdTab.addEventListener('touchstart',function (e) {  
    //只会触发一次, 在手摁下的时候触发, 事件对象e.touches[0].clientY可以获取到位置
    e = e || window.event;
    startY = e.touches[0].clientY;

})
//获取滑动时的位置
jdTab.addEventListener('touchmove',function (e) {  
    //会不断触发这个事件
    e = e || window.event;
    moveY = e.touches[0].clientY;
    //计算出滑动的距离\
    slideY = moveY - startY;
    //把计算的结果赋值给页面的元素, 要让内容盒子滑动
    swiperSlide.style.transform = "translateY("+(currentY+slideY)+"px)";
})

//触摸结束后要把当前滑动的距离存到currentY
jdTab.addEventListener('touchend',function (e) {  
    currentY+=slideY;
})
*/
