/**
 * Created by zhu_yeqing on 2017/7/7.
 */


//跨浏览器事件处理程序
var eventUntil = {
    //添加事件
    addHandler: function (elem, type, handler) {
        if (elem.addEventListener) {
            elem.addEventListener(type, handler, false);
        } else if (elem.attachEvent) {
            elem.attachEvent(type, handler);
        } else {
            elem['on' + type] = handler;
        }
    },
    //删除事件
    removeHandler: function (elem, type, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, handler, false);
        } else if (elem.detachEvent) {
            elem.detachEvent(type, handler);
        } else {
            elem['on' + type] = null;
        }
    },
    //添加滑轮事件
    addScroll: function (handler) {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', handler, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = handler;//IE/Opera/Chrome
    },
    //删除滑轮事件
    removeScroll: function (handler) {
        if (document.removeEventListener) {
            document.removeEventListener('DOMMouseScroll', handler, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = null;//IE/Opera/Chrome
    },
    //获取事件
    getEvent: function (e) {
        return e ? e: window.event;
    },
    //获得事件的类型
    getType: function (e) {
        return e.type;
    },
    //获得元素
    getElement: function (e) {
        return e.target || e.srcElement;
    },
    //阻止事件的默认行为
    preventDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault(e);
        } else {
            e.returnValue = false;
        }
    },
    //阻止事件冒牌
    stopPropagation: function (e) {
        if (e.stopPropagation) {
            e.stopPropagation(e);
        } else {
            e.cancelBubble = true;
        }
    }
}