window.addEventListener('load', function () {

  //头部背景颜色渐变
  //获取元素
  var header = document.querySelector('#header');
  var slide = document.querySelector('#slide');
  
  //获得轮播图的高度
  var slideHeigth = slide.offsetHeight;

  //刷新页面时, 也要算出当前高度下的透明度, 所以无条件先调用一次函数获取到透明度
  CurrentOpacity();

  //给window添加滚动事件
  window.addEventListener('scroll', CurrentOpacity)

  //封装透明度函数
  function CurrentOpacity() {
    //获取当前滚动出去的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //算出当前的透明度   当前透明度/1=当前滚出去的高度/轮播图总高度
    var opacity = scrollTop / slideHeigth;
    //把透明度赋值给头部背景
    header.style.backgroundColor = 'rgba(222,24,22,' + opacity + ')';

  }


  // Initialize Swiper 初始化轮播图
  var swiper = new Swiper('.swiper-container', {
    // 
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev',
    //   },
  });



//倒计时秒表
    //1.获取spans列表
    var spans = document.querySelectorAll('.seckill-time i:not(:nth-child(3n))');
    // console.log(spans);
    
    //2.获取后台返回的剩余的秒杀时间   这里假设为2个小时
    var time = 2 * 3600;


    //4.页面加载就要获取当前剩余秒杀时间, 无条件调用一次函数
    setSkillTime();

    //3.设定一个定时器, 每秒钟让总秒杀时间－1
    setInterval(function () {  

      //总时间自减
      time--;
      //计算出-- 之后剩余秒杀时间的时分秒    调用函数
      setSkillTime()

    },1000) 


    //封装剩余秒数设置到页面的函数
    function setSkillTime () {  

      //判断: 如果当前时间小于0, 重新设置
      if(time<=0){
        time=2*3600;
      }

      //计算出-- 之后剩余秒杀时间的时分秒
      //时
      var hour = Math.floor(time/3600);
      //分
      var minute = time%3600/60;
      //秒
      var second = time%3600%60;

      //把算好的时分秒设置到页面上
      spans[0].innerHTML = Math.floor(hour/10);//小时的十位
      spans[1].innerHTML = Math.floor(hour%10);//小时的个位
      spans[2].innerHTML = Math.floor(minute/10);//分的十位
      spans[3].innerHTML = Math.floor(minute%10);//分时的个位
      spans[4].innerHTML = Math.floor(second/10);//秒的十位
      spans[5].innerHTML = Math.floor(second%10);//秒的个位
    }

})