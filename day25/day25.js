/**
 * Created by zhu_yeqing on 2017/6/30.
 */


window.onload = function () {
    var tab = document.getElementById('tab');
    var tabCon = document.getElementById('tab-con');
    var tabNavi = document.getElementById('tab-navi');
    var normalTr = tabCon.getElementsByTagName('tr');
    var fixedTr = document.getElementById('fixed');
    // var availWidth = screen.availWidth;
    var availHeight = screen.availHeight;
    var rectNavi = tabNavi.getBoundingClientRect();//动态获取ul元素到视窗的距离，这是一个集合，有上下左右等的距离
    // var rectCon = tabCon.getBoundingClientRect();
    var naviHei = rectNavi.bottom - rectNavi.top;
    console.log(naviHei)

    //给表格添加背景色
    for (var i = 2;i < normalTr.length;i += 2) {
        normalTr[i].className = 'grey';
    }

    document.addEventListener('scroll',winScroll,false);
    /**
     * 滚动条函数
     * 表格标题固定：
     * document.body.scrollTop表示滚动条离初始位置（滑动条页面最顶部）的距离，这个是一个变化的值
     * tabCon.offsetTop是表格顶部离页面最顶部的距离
     * 当滚动条离初始位置的距离 < 表格顶部离页面最顶部的距离时，表格标题正常显示，否则，将固定
     */
    function winScroll(){
        if (document.body.scrollTop < tabCon.offsetTop) {
            tab.style.position = '';
            fixedTr.style.position = '';
            tabCon.style.position = '';
            tabCon.style.top = '';
        } else if (document.body.scrollTop >= tabCon.offsetTop) {
            tab.style.position = 'relative';
            tabCon.style.position = 'absolute';
            tabCon.style.top = '50px';
            // fixedTr.style.width = availWidth - rectCon.left - (availWidth - rectCon.right) + 'px';
            fixedTr.style.position = 'fixed';
            fixedTr.style.top = '0';
        }
        if (tabNavi.style.height <= naviHei + 'px') {
            tabNavi.style.height = availHeight - rectNavi.top - 140 + document.body.scrollTop + 'px';//availHeight - rectNavi就是tabnavi应该显示的高度
            tabNavi.style.overflow = 'scroll';
        } else {
            tabNavi.style.height = naviHei + 'px';
            tabNavi.style.overflow = 'none';
        }

    }




}
