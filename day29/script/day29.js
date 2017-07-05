/**
 * Created by zhu_yeqing on 2017/6/30.
 */


window.onload = function () {
    var tab = document.getElementById('tab');
    var tabCon = document.getElementById('tab-con');
    var tabNavi = document.getElementById('tab-navi');
    var normalTr = tabCon.getElementsByTagName('tr');
    var rectNavi = tabNavi.getBoundingClientRect();//动态获取导航列表到视窗的距离，这是一个集合，有上下左右等的距离
    var fixedTab = document.getElementById('tab-fixed');
    var naviLi = tabNavi.getElementsByClassName('level-1');


    //给表格添加背景色
    for (var i = 2; i < normalTr.length; i += 2) {
        normalTr[i].className = 'grey';
    }


    addEvent(window, 'mousewheel', winScroll);
    addEvent(window, 'DOMMouseScroll', winScroll);
    addSubtitle();


    /**
     * 滚动条函数
     * 表格标题固定：
     * document.body.scrollTop表示滚动条离初始位置（滑动条页面最顶部）的距离，这个是一个变化的值
     * tabCon.offsetTop是表格顶部离页面最顶部的距离
     * 当滚动条离初始位置的距离 < 表格顶部离页面最顶部的距离时，表格标题正常显示，否则，将固定
     */
    function winScroll() {
        if (getScrollXY().y <= rectNavi.top) {
            tab.style.position = '';
            fixedTab.style.display = 'none';
            tabCon.style.position = '';
            tabCon.style.top = '';
            tabNavi.style.position = '';
            tabNavi.style.top = '';
            tabNavi.style.height = innerHeight - rectNavi.top + getScrollXY().y + 'px';//availHeight - rectNavi就是tabnavi应该显示的高度
            tabNavi.style.overflow = 'scroll';
        } else {
            tabNavi.style.height = innerHeight + 'px';
            fixedTab.style.display = 'block';
            tabNavi.style.position = 'fixed';
            tabNavi.style.top = '0';
        }
    }


    /**
     * 绑定事件函数，解决浏览器兼容问题
     * @param obj 元素名称
     * @param xEvent 事件名称
     * @param fn 函数名称
     */
    function addEvent(obj, xEvent, fn) {
        if (obj.attachEvent) {
            obj.attachEvent('on' + xEvent, fn);
        } else {
            obj.addEventListener(xEvent, fn, false);
        }
    }


    /**
     * 解决scrillTop火狐浏览器的兼容问题
     * getScrollXY.y = scrollTop
     * getScrollXY.x = scrollLeft
     * @returns {{x: *, y: *}}
     */
    function getScrollXY() {
        var x, y;
        if (document.body.scrollTop) { //非标准写法,chrome能识别
            x = document.body.scrollLeft;
            y = document.body.scrollTop;
        }
        else { //符合标准规范的标准写法
            x = document.documentElement.scrollLeft;
            y = document.documentElement.scrollTop;
        }
        return {x: x, y: y};
    }

    // console.log(data.length);//data即有几个一级标题需要添加二级标题
    // console.log(data[0]["subtitle"]["length"]);//第一个元素的一级标题下二级标题下元素的个数
    // console.log(data[0].title);//获得第一个元素的一级标题
    // console.log(data);
    // console.log(data[0].subtitle);//获得第一个元素的二级标题
    // console.log(data[0].subtitle[0]);//获得第一个元素的二级标题的第一个元素
    // console.log(data[0]["index"]);//获得第一个元素的index
    // var del = naviLi.getElementsByTagName('li');

    // var m = 'ul-3';
    // var ms = m.split('-');
    // console.log(ms[1]);




    /**
     * 一级导航的添加事件
     * 这个函数与clickLevel1函数是一起的，用于解决读取不到i的问题
     */
    function addSubtitle() {
        for (var i = 0; i < data.length; i++) {
            clickLevel1(i);
        }
    }

    /**
     * 一级导航的点击事件
     * @param i 表示第i个一级导航
     */
    function clickLevel1(i) {
        var count = 0;
        naviLi[i].addEventListener("click", function () {
            count++; //用于记录点击次数，以便判断是否收起二级导航
            if (count % 2 == 1){
                var index = data[i].index; //index值跟i值相同
                var ul = document.createElement('ul'); //创建ul标签
                var len = data[index].subtitle.length; //获取每个一级标题下二级导航元素的个数
                var str = ''; //初始化str，用于存放二级导航
                for (var j = 0; j < len; j++) {
                    str += '<li>' + data[index].subtitle[j] + '</li>'; //将二级导航以li标签的形式放入str中
                }
                ul.innerHTML = str; //将str写入ul
                ul.id = 'ul-' + i; //给ul加id
                ul.style.paddingLeft = '40px'; //设置ul的padding-left值
                ul.style.backgroundColor = '#fff'; //设置ul的背景颜色
                naviLi[i].appendChild(ul); //将设置好的ul写入一级导航下
            } else {
                var thisNode = document.getElementById('ul-' + i);
                thisNode.parentNode.removeChild(thisNode); //删除ul节点，即二级导航收起
            }
        })
    }
}
