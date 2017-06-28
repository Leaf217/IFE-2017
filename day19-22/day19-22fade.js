/**
 * Created by zhu_yeqing on 2017/6/26.
 */


window.onload = function () {
    var images = document.getElementById('images');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 4; //图片的张数
    // var animated = false; //用于判断图片是否完全切换完毕，切换完毕后按箭头才起作用
    var interval = 4000;
    var timer;
    var subMenu = document.getElementById('submenu');

    // 导航栏
    subMenu.onmouseover = function showSub() {
        var sub = subMenu.getElementsByTagName("ul")[0];
        sub.style.visibility="visible";
    }
    subMenu.onmouseout = function hidesSub() {
        var sub = subMenu.getElementsByTagName("ul")[0];
        sub.style.visibility="hidden";
    }


    //轮播图

    //滑动效果的轮播图
    function animate(offset) {
        if (offset == 0) {
            return;
        }
        // animated = true;
        // var time = 600;
        // var interval = 10;
        // var speed = offset/(time/interval);

        var left = parseInt(list.style.left) + offset;
        list.style.left = left + 'px';
        if(left > -960){
            list.style.left = -960 * len + 'px';
        }
        if(left < -3840) {
            list.style.left = -3840 + 960 * (len - 1) + 'px';
        }
        fadeIn(list);
    }
    //函数：将bar换成深灰色
    function showButton() {
        for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
                break;
            }
        }
        buttons[index - 1].className = 'on';
    }

    // 函数：图片自动播放
    function play() {
        timer = setTimeout(function () {
            next.onclick();
            play();
        }, interval);
    }

    //函数：图片停止播放
    function stop() {
        clearTimeout(timer);
    }

    //函数：按一下>，就会向右切换一张图片并将对应buttons变为深色
    next.onclick = function () {
        // if (animated) {
        //     return;
        // }
        if (index == 4) {
            index = 1;
        }
        else {
            index += 1;
        }
        animate(-960);
        showButton();
    }

    //函数：按一下>，就会向左切换一张图片并将对应buttons变为深色
    prev.onclick = function () {
        // if (animated) {
        //     return;
        // }
        if (index == 1) {
            index = 4;
        }
        else {
            index -= 1;
        }
        animate(960);
        showButton();
    }

    //点击button，进行图片切换
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function () {
            // if (animated) {
            //     return;
            // }
            if(this.className == 'on') {
                return; //如果当前图片就是所点击的button，那么就不换
            }
            var myIndex = parseInt(this.getAttribute('index')); //按的button的index值，index是自定义属性，不能直接通过.index获取，所以要通过此处的方法获取
            var offset = -960 * (myIndex - index); //index表示此时显示图片的index，由此算出来每次点击button的偏移量
            animate(offset);
            index = myIndex; //切换完毕后将index更新
            showButton();
        }
    }

    //当鼠标移动到图片上时，停止播放，移出图片时，继续播放
    images.onmouseover = stop;
    images.onmouseout = play;

    play();//如果不加这句play()；那么只有在将鼠标移动到图片再移出图片时，才会自动播放


    //设置透明度
    function setOpacity(elem,level){
        if(elem.filters){
            elem.style.filter = "alpha(opacity="+level+")";
        }else{
            elem.style.opacity = level / 100;
        }
    }

    //淡入处理函数
    function fadeIn(elem){
        setOpacity(elem,0); //初始全透明
        for(var i = 0;i<=20;i++){ //透明度改变 20 * 5 = 100
            (function(){
                var level = i * 5;  //透明度每次变化值
                setTimeout(function(){
                    setOpacity(elem, level)
                },i*25); //i * 25 即为每次改变透明度的时间间隔，自行设定
            })(i);     //每次循环变化一次
        }
    }

    //淡出处理函数
    function fadeOut(elem){
        setOpacity(elem,100); //初始不透明
        for(var i = 0;i<=20;i++){ //透明度改变 20 * 5 = 100
            (function(){
                var level = 100 - i * 5; //透明度每次变化值
                setTimeout(function(){
                    setOpacity(elem, level)
                },i*25); //i * 25 即为每次改变透明度的时间间隔，自行设定
            })(i);     //每次循环变化一次
        }
    }

}



