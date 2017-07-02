/**
 * Created by zhu_yeqing on 2017/6/30.
 */


window.onload = function () {
    var tab = document.getElementById('tab');
    var tabCon = document.getElementById('tab-con');
    var tabNavi = document.getElementById('tab-navi');
    var normalTr = tabCon.getElementsByTagName('tr');
    var fixedTr = document.getElementById('fixed');
    var availWidth = screen.availWidth;
    var availHeight = screen.availHeight;
    var rectNavi = tabNavi.getBoundingClientRect();//动态获取ul元素到视窗的距离，这是一个集合，有上下左右等的距离
    var rectCon = tabCon.getBoundingClientRect();


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
        if (document.body.scrollTop < rectCon.top) {
            tab.style.position = '';
            fixedTr.style.position = '';
            fixedTr.style.top = '';
            tabCon.style.position = '';
            tabCon.style.top = '';
            tabNavi.style.position = '';
            tabNavi.style.top = '';
            tabNavi.style.height = availHeight - rectNavi.top - 135 + document.body.scrollTop + 'px';//availHeight - rectNavi就是tabnavi应该显示的高度
            tabNavi.style.overflow = 'scroll';
        } else if (document.body.scrollTop >= rectCon.top) {
            tabNavi.style.height = availHeight -135 + 'px';
            tab.style.position = 'relative';
            tabCon.style.position = 'absolute';
            tabCon.style.top = '50px';
            // fixedTr.style.width =  rectCon.right - rectCon.left + 'px';
            // fixedTr.style.width = availWidth - rectCon.left - (availWidth - rectCon.right) + 'px';
            fixedTr.style.position = 'fixed';
            fixedTr.style.top = '0';
            tabNavi.style.position = 'fixed';
            tabNavi.style.top = '0';
        }
    }


    /**
     * 绑定时间函数，为了浏览器的兼容而生
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

}
