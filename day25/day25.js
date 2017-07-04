/**
 * Created by zhu_yeqing on 2017/6/30.
 */


window.onload = function () {
    var tab = document.getElementById('tab');
    var tabCon = document.getElementById('tab-con');
    var tabNavi = document.getElementById('tab-navi');
    var normalTr = tabCon.getElementsByTagName('tr');
    var availHeight = screen.availHeight;
    var rectNavi = tabNavi.getBoundingClientRect();//动态获取ul元素到视窗的距离，这是一个集合，有上下左右等的距离
    var rectCon = tabCon.getBoundingClientRect();
    var fixedTab = document.getElementById('tab-fixed');


    //给表格添加背景色
    for (var i = 2;i < normalTr.length;i += 2) {
        normalTr[i].className = 'grey';
    }


    addEvent(window, 'mousewheel', winScroll);
    addEvent(window, 'DOMMouseScroll', winScroll);


    /**
     * 滚动条函数
     * 表格标题固定：
     * document.body.scrollTop表示滚动条离初始位置（滑动条页面最顶部）的距离，这个是一个变化的值
     * tabCon.offsetTop是表格顶部离页面最顶部的距离
     * 当滚动条离初始位置的距离 < 表格顶部离页面最顶部的距离时，表格标题正常显示，否则，将固定
     */
    function winScroll(){
        if (getScrollXY().y < rectCon.top) {
            tab.style.position = '';
            fixedTab.style.display = 'none';
            tabCon.style.position = '';
            tabCon.style.top = '';
            tabNavi.style.position = '';
            tabNavi.style.top = '';
            tabNavi.style.height = innerHeight - rectNavi.top + getScrollXY().y + 'px';//availHeight - rectNavi就是tabnavi应该显示的高度
            tabNavi.style.overflow = 'scroll';
        } else if (getScrollXY().y >= rectCon.top) {
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
    function addEvent(obj,xEvent,fn) {
        if(obj.attachEvent){
            obj.attachEvent('on'+xEvent,fn);
        }else{
            obj.addEventListener(xEvent,fn,false);
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

}
