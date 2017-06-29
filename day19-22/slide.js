/**
 * Created by zhu_yeqing on 2017/6/24.
 */

window.onload = function () {
    var images = document.getElementById('images');
    var list = document.getElementById('list');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    var index = 1;
    var len = 4; //图片的张数
    var animated = false; //用于判断图片是否完全切换完毕，切换完毕后按箭头才起作用
    var interval = 3000;
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


    //滑动效果的轮播图
    function animate(offset) {
        if (offset == 0) {
            return;
        }
        animated = true;
        var time = 600;
        var interval = 10;
        var speed = offset/(time/interval);
        var left = parseInt(list.style.left) + offset;

        //函数：自动滑动
        var go = function (){
            //若speed<0，那么向右切换图片，left为正好将图片切换完毕时的位移，如果if后的语句计算出的位移值大于left时，是可以继续执行滑动的
            //这其实就是定义了停止的时间
            if ( (speed > 0 && parseInt(list.style.left) < left) || (speed < 0 && parseInt(list.style.left) > left)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, interval);
            }
            else {
                // list.style.left = left + 'px';
                if(left > -960){
                    list.style.left = -960 * len + 'px';
                }
                if(left < -3840) {
                    list.style.left = -3840 + 960 * (len - 1) + 'px';
                }
                animated = false;
            }
        }
        go();
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
        if (animated) {
            return;
        }
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
        if (animated) {
            return;
        }
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
            if (animated) {
                return;
            }
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

    //滑过TAB的边框变化 & 点击TAB的表格切换
    var tab = document.getElementById('tab-title');
    var subTab = tab.getElementsByTagName('li');

    var tabs = document.getElementById('tabs').getElementsByTagName('table');

    for (var i = 0;i < subTab.length;i++) {
        subTab[i].addEventListener("mouseover", function () {
            subTab[0].className = "off";
            this.className = "on";
        })
        subTab[i].addEventListener("mouseout", function () {
            this.className = "off";
        })
        subTab[i].onclick = function(){
            changeTab(this.id);
        }
        function changeTab(obj){
            for(var i = 0;i < subTab.length;i++){
                if(subTab[i].id == obj){
                    tabs[i].style.display = "block";
                } else {
                    tabs[i].style.display = "none";
                }
            }
        }
    }


    //下拉菜单
    var countryDiv = document.getElementById('country-div');
    var cityDiv = document.getElementById('city-div');
    var countryArr = new Array("无", "中国", "美国", "英国");
    var cityArr = new Array();

    var country = countryDiv.getElementsByTagName('p');
    var city = cityDiv.getElementsByTagName('p');
    var notiO = document.getElementById('noti-1');
    var notiT = document.getElementById('noti-2');
    var countries = document.getElementById('countries');
    var cities = document.getElementById('cities');

    cityArr[0] = new Array("无");
    cityArr[1] = new Array("北京", "上海", "广州");
    cityArr[2] = new Array("洛杉矶", "纽约", "旧金山");
    cityArr[3] = new Array("伦敦", "利物浦", "曼彻斯特");

    //动态载入所有国家
    function load() {
        for (var i = 0;i < countryArr.length;i++) {
            var node = document.createElement('p');
            node.innerHTML = countryArr[i];
            countryDiv.appendChild(node);
        }
    }
    load();

    //根据选择的国家，动态显示城市
    for (var i = 0;i < country.length;i++) {
        country[i].addEventListener("click", function () {
            cityDiv.innerHTML = ""; //清除二级列表
            var index = countryArr.indexOf(this.innerHTML); //获取countryArr中的与indexOf后边括号中相同字符串的索引值
            for (var j = 0;j < cityArr[index].length;j++) {
                var node = document.createElement('p');
                node.innerHTML = cityArr[index][j];
                cityDiv.appendChild(node);
                city[j].addEventListener("click", function () {
                    notiT.innerHTML = this.innerHTML; //点击的是哪个城市就会显示哪个城市
                    hidd(cityDiv);
                    disp(notiT);
                    // notiT.style.display = "block";
                })
            }
            notiO.innerHTML = this.innerHTML; //点击的是哪个国家就会显示哪个国家
            notiT.innerHTML = cityDiv.getElementsByTagName('p')[0].innerHTML; //城市列表默认显示第一个城市
            hidd(countryDiv);//国家点击完毕后，隐藏
            disp(notiO);//在框中显示点击的国家名字

        })
    }
    countries.onclick = function () {
        disp(countryDiv);
        hidd(notiO);
    }
    cities.onclick = function () {
        disp(cityDiv);
        hidd(notiT);
    }
    function disp(elem) {
        elem.style.display = "block";
    }
    function hidd(elem) {
        elem.style.display = "none";
    }

}
