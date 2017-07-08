/**
 * Created by zhu_yeqing on 2017/6/30.
 */


window.onload = function () {
    var tab = document.getElementById('tab');
    var tabCon = document.getElementById('tab-con');
    var tabNavi = document.getElementById('tab-navi');
    var rectNavi = tabNavi.getBoundingClientRect();//动态获取导航列表到视窗的距离，这是一个集合，有上下左右等的距离
    var fixedTab = document.getElementById('tab-fixed');
    var cover =document.getElementById('cover'); //用作遮罩的div
    var factor = true; //判断点击一级标题是否折叠的因子


    eventUntil.addHandler(window, 'mousewheel', winScroll);
    eventUntil.addHandler(window, 'DOMMouseScroll', winScroll);
    addTableData();
    eventUntil.addHandler(tabNavi, 'click', clickNavi);
    eventUntil.addHandler(tabCon, "click", clickButtons);



    /**
     * 滚动条函数
     * 表格标题固定：
     * document.body.scrollTop表示滚动条离初始位置（滑动条页面最顶部）的距离，这个是一个变化的值
     * tabCon.offsetTop是表格顶部离页面最顶部的距离
     * 当滚动条离初始位置的距离 < 表格顶部离页面最顶部的距离时，表格标题正常显示，否则，将固定
     */
    function winScroll() {
        if (getScrollXY().y <= rectNavi.top) { //判断是否需要表头及导航的吸附
            // 不需要吸附，即表头此时是可见的
            tab.style.position = '';
            fixedTab.style.display = 'none';
            tabCon.style.position = '';
            tabCon.style.top = '';
            tabNavi.style.position = '';
            tabNavi.style.top = '';
            tabNavi.style.height = innerHeight - rectNavi.top + getScrollXY().y + 'px';//innerHeight - rectNavi.top就是tabnavi应该显示的高度
            tabNavi.style.overflow = 'scroll';
        } else {
            //不需要吸附
            tabNavi.style.height = innerHeight + 'px';
            fixedTab.style.display = 'block';
            tabNavi.style.position = 'fixed';
            tabNavi.style.top = '0';
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


    /**
     * 点击一级导航事件
     * @param e
     */
    function clickNavi(e) {
        var e = eventUntil.getEvent(e);
        var title = eventUntil.getElement(e); //获得被点击的元素
        var titleId = title.id;
        var titleIndex = titleId.split('-')[1]; //点击的一级导航对应数据的index值
        if (naviData[titleIndex]) { //判断一下是否有二级导航的数据
            if (naviData[titleIndex].subtitle && factor) { //判断是否二级导航数据里有没有subtitle键值
                var ul = document.createElement('ul'); //创建ul标签
                var str = ''; //初始化str，用于存放二级导航
                var len = naviData[titleIndex].subtitle.length;
                for (var i = 0; i < len; i++) {
                    str += '<li>' + naviData[titleIndex].subtitle[i] + '</li>'; //将二级导航以li标签的形式放入str中
                }
                ul.innerHTML = str; //将str写入ul
                ul.id = 'ul-' + titleIndex; //给ul加id
                ul.style.paddingLeft = '40px'; //设置ul的padding-left值
                ul.style.backgroundColor = '#fff'; //设置ul的背景颜色
                title.appendChild(ul); //将设置好的ul写入一级导航下
                factor = !factor;
            } else if (naviData[titleIndex].subtitle && !factor) {
                var thisNode = document.getElementById('ul-' + titleIndex);
                thisNode.parentNode.removeChild(thisNode); //删除ul节点，即二级导航收起
                factor = true;
            }
        }


    }


    /**
     * 添加表头和表格中的内容
     * 两个表格，一个用于显示，一个用于表头吸附
     */
    function addTableData() {
        addThead(tabCon);
        addThead(fixedTab);
        createTab(tabCon);
        createTab(fixedTab);
    }

    /**
     * 添加表头
     * @param elem 表格
     */
    function addThead(elem) {
        var row = document.createElement('tr'); //创建行
        var str = '';
        for (var j in tableData[0]) { //依次取出键对应的值
            if (j != "index") {
                str += '<th>' + j + '</th>';
            }
        }
        str += '<th>More</th>';
        row.innerHTML = str;
        elem.appendChild(row);
    }


    /**
     * 添加表格内容
     * @param elem 表格
     */
    function createTab(elem) {
        for (var i = 0;i < tableData.length;i++) {
            var row = document.createElement('tr'); //创建行
            var str = '';
            for (var j in tableData[i]) {
                if (j != "index") {
                    str += '<td>' + tableData[i][j] + '</td>';
                }
            }
            str += '<td><input type="button" value="编辑">'
                +      '<input type="button" value="删除"></td>';
            row.innerHTML = str;
            row.id = 'tr-' + i;
            elem.appendChild(row);
        }
    }


    /**
     * 点击按钮事件：编辑按钮和删除按钮
     * @param e
     */
    function clickButtons(e) {
        var e = eventUntil.getEvent(e);
        if (eventUntil.getElement(e).value == "编辑") {
            var str = '';
            str += '<p><label>Name<input type="text" id="in-name"></label></p>'
                +  '<p><label>Content<input type="text" id="in-content"></label></p>'
                +  '<p><label>Value<input type="text" id="in-value"></label></p>'
                +  '<p><input type="button" value="确定"><input type="button" value="取消"></p>'; //点击编辑后弹出的div里的内容

            popup(str, 75, 120, 'submission', 'editDiv');
            eventUntil.addScroll(preventScroll);

            var editDiv = document.getElementById('editDiv');
            var rowId = eventUntil.getElement(e).parentNode.parentNode.id; //所点击的行的id
            var rowIndex = rowId.split('-')[1]; //点击的删除键对应数据的index值

            eventUntil.addHandler(editDiv, 'click', editConfirm);

            function editConfirm(e) {
                var e = eventUntil.getEvent(e);
                if (eventUntil.getElement(e).value == "确定") {
                    //取得input中输入的内容
                    var inName = document.getElementById('in-name').value;
                    var inContent = document.getElementById('in-content').value;
                    var inValue = document.getElementById('in-value').value;

                    //将input中输入的内容填入数据
                    tableData[rowIndex].Name = inName;
                    tableData[rowIndex].Content = inContent;
                    tableData[rowIndex].Value = inValue;

                    tabCon.innerHTML = '';
                    fixedTab.innerHTML = ''; //将表格清空
                    addTableData(); //重新添加表格数据

                    cover.style.display = 'none'; //隐藏遮罩
                    editDiv.parentNode.removeChild(editDiv); //删除弹出的确认框

                } else if (eventUntil.getElement(e).value == "取消") {
                    cancel(editDiv);
                }
                eventUntil.removeScroll(preventScroll); // 删除绑定的禁止滚轮事件
            }
        }

        if (eventUntil.getElement(e).value == "删除") {
            var str = '';
            var rowId = eventUntil.getElement(e).parentNode.parentNode.id;
            var rowIndex = rowId.split('-')[1]; //点击的删除键对应数据的index值
            str += '<p>确定要删除'+ tableData[rowIndex].Id +'?</p>' +
                '<p><input type="button" value="确定"><input type="button" value="取消"></p>'; //点击删除后弹出的div里的内容

            popup(str, 40, 120, 'delete', 'delDiv');
            eventUntil.addScroll(preventScroll);


            var delDiv = document.getElementById('delDiv');
            eventUntil.addHandler(delDiv, 'click', delConfirm);

            function delConfirm(e) {
                var e = eventUntil.getEvent(e);
                if (eventUntil.getElement(e).value == "确定") {
                    tabCon.innerHTML = '';//将表格清空
                    fixedTab.innerHTML = '';
                    tableData.splice(rowIndex, 1); //删除数据
                    addTableData(); //重新添加表格数据

                    cover.style.display = 'none';
                    delDiv.parentNode.removeChild(delDiv); //删除弹出的确认框

                } else if (eventUntil.getElement(e).value == "取消") {
                    cancel(delDiv);
                }
                eventUntil.removeScroll(preventScroll);
            }
        }
    }


    /**
     * 确认框的弹出
     * @param str 确认框的内容
     * @param top 定位的top值
     * @param left 定位的left值
     * @param className 类名
     * @param id id名
     */
    function popup(str, top, left, className,id) {
        cover.style.height = innerHeight + 'px';
        cover.style.width = innerWidth + 'px';
        cover.style.display = 'block';

        eventUntil.addScroll(preventScroll);

        var addDiv = document.createElement('div');
        addDiv.innerHTML = str;
        addDiv.className = className;
        addDiv.id = id;
        addDiv.style.top = innerHeight/2 - top + 'px';
        addDiv.style.left = (document.body.clientWidth || document.documentElement.clientWidth)/2 -left + 'px';//由于clientWidth不包含滚动条，所以用了这个

        document.body.appendChild(addDiv);
    }


    /**
     * 确认框点击取消后的动作
     * @param elem 编辑确认框 or 删除确认框
     */
    function cancel(elem) {
        cover.style.display = 'none'; //隐藏遮罩
        elem.parentNode.removeChild(elem); //删除弹出框
    }


    /**
     * 禁止滚轮默认行为
     */
    function preventScroll(e) {
        var e = eventUntil.getEvent(e);
        eventUntil.preventDefault(e);
    }
}