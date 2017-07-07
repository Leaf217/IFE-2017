/**
 * Created by zhu_yeqing on 2017/6/30.
 */


window.onload = function () {
    var tab = document.getElementById('tab');
    var tabCon = document.getElementById('tab-con');
    var tabNavi = document.getElementById('tab-navi');
    // var normalTr = tabCon.getElementsByTagName('tr');
    var rectNavi = tabNavi.getBoundingClientRect();//动态获取导航列表到视窗的距离，这是一个集合，有上下左右等的距离
    var fixedTab = document.getElementById('tab-fixed');
    var naviLi = tabNavi.getElementsByClassName('level-1');
    var cover =document.getElementById('cover');


    addEvent(window, 'mousewheel', winScroll);
    addEvent(window, 'DOMMouseScroll', winScroll);
    addSubtitle();
    addTableData();




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

    // console.log(naviData.length);//naviData即有几个一级标题需要添加二级标题
    // console.log(naviData[0]["subtitle"]["length"]);//第一个元素的一级标题下二级标题下元素的个数
    // console.log(naviData[0].title);//获得第一个元素的一级标题
    // console.log(naviData);
    // console.log(naviData[0].subtitle);//获得第一个元素的二级标题
    // console.log(naviData[0].subtitle[0]);//获得第一个元素的二级标题的第一个元素
    // console.log(naviData[0]["index"]);//获得第一个元素的index
    // var del = naviLi.getElementsByTagName('li');

    // var m = 'ul-3';
    // var ms = m.split('-');
    // console.log(ms[1]);



    /**
     * 一级导航的添加事件
     * 这个函数与clickLevel1函数是一起的，用于解决读取不到i的问题
     */
    function addSubtitle() {
        for (var i = 0; i < naviData.length; i++) {
            clickLevel1(i);
        }
    }


    /**
     * 一级导航的点击事件
     * @param i 表示第i个一级导航
     */
    function clickLevel1(i) {
        var count = 0;
        eventUntil.addHandler(naviLi[i], "click", function () {
            count++; //用于记录点击次数，以便判断是否收起二级导航
            if (count % 2 == 1){
                var index = naviData[i].index; //index值跟i值相同
                var ul = document.createElement('ul'); //创建ul标签
                var len = naviData[index].subtitle.length; //获取每个一级标题下二级导航元素的个数
                var str = ''; //初始化str，用于存放二级导航
                for (var j = 0; j < len; j++) {
                    str += '<li>' + naviData[index].subtitle[j] + '</li>'; //将二级导航以li标签的形式放入str中
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
        });
    }



    // console.log(Object.keys(tableData[0]).length);//返回每个对象中key-value对的个数
    // var str = '';  for-in
    // for (var i in tableData[0]) {
    //     str += tableData[0][i];
    // }
    // console.log(str);

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
        for (var j in tableData[0]) {
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


    eventUntil.addHandler(tabCon, "click", clickButtons);


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
                +  '<p><input type="button" value="确定"><input type="button" value="取消"></p>';

            popup(str, 75, 120, 'submission', 'editDiv');

            var editDiv = document.getElementById('editDiv');
            var rowId = eventUntil.getElement(e).parentNode.parentNode.id;
            var rowIndex = rowId.split('-')[1]; //点击的删除键对应数据的index值

            eventUntil.addHandler(editDiv, 'click', editConfirm);

            function editConfirm(e) {
                var e = eventUntil.getEvent(e);
                if (eventUntil.getElement(e).value == "确定") {
                    var inName = document.getElementById('in-name').value;
                    var inContent = document.getElementById('in-content').value;
                    var inValue = document.getElementById('in-value').value;

                    tableData[rowIndex].Name = inName;
                    tableData[rowIndex].Content = inContent;
                    tableData[rowIndex].Value = inValue;

                    tabCon.innerHTML = '';
                    fixedTab.innerHTML = ''; //将表格清空
                    addTableData(); //重新添加表格数据

                    cover.style.display = 'none';
                    editDiv.parentNode.removeChild(editDiv); //删除弹出的确认框

                } else if (eventUntil.getElement(e).value == "取消") {
                    cancel(editDiv);
                }
                mouseWheel(); // 删除绑定的禁止滚轮事件
            }

            // // document.body.style.overflow = 'hidden';
            // cover.style.height = innerHeight + 'px';
            // cover.style.width = innerWidth + 'px';
            // cover.style.display = 'block';
            // disabledMouseWheel();
            // var addDiv = document.createElement('div');
            // var str = '';
            // str += '<p><label>Name<input type="text"></label></p>' +
            //     '<p><label>Content<input type="text"></label></p>' +
            //     '<p><label>Value<input type="text"></label></p>' +
            //     '<p><input type="button" value="确定"><input type="button" value="取消"></p>'
            // addDiv.innerHTML = str;
            // addDiv.className = 'submission';
            // addDiv.style.top = innerHeight/2 - 75 + 'px';
            // addDiv.style.left = (document.body.clientWidth || document.documentElement.clientWidth)/2 -120 + 'px';//由于clientWidth不包含滚动条，所以用了这个
            // document.body.appendChild(addDiv);
            // eventUntil.stopPropagation(e);
        }

        if (eventUntil.getElement(e).value == "删除") {
            var str = '';
            var rowId = eventUntil.getElement(e).parentNode.parentNode.id;
            var rowIndex = rowId.split('-')[1]; //点击的删除键对应数据的index值
            str += '<p>确定要删除'+ tableData[rowIndex].Id +'?</p>' +
                '<p><input type="button" value="确定"><input type="button" value="取消"></p>';

            popup(str, 40, 120, 'delete', 'delDiv');

            // console.log(eventUntil.getElement(e).parentNode.parentNode.id); //获取点击的删除键对应行的id

            var delDiv = document.getElementById('delDiv');
            eventUntil.addHandler(delDiv, 'click', delConfirm);

            function delConfirm(e) {
                var e = eventUntil.getEvent(e);
                if (eventUntil.getElement(e).value == "确定") {
                    tabCon.innerHTML = '';//将表格清空
                    fixedTab.innerHTML = '';
                    tableData.splice(rowIndex, 1);
                    addTableData(); //重新添加表格数据

                    cover.style.display = 'none';
                    delDiv.parentNode.removeChild(delDiv); //删除弹出的确认框

                } else if (eventUntil.getElement(e).value == "取消") {
                    cancel(delDiv);
                }
                mouseWheel();
            }

            // // document.body.style.overflow = 'hidden';
            // cover.style.height = innerHeight + 'px';
            // cover.style.width = innerWidth + 'px';
            // cover.style.display = 'block';
            // disabledMouseWheel();
            // var addDiv = document.createElement('div');
            // var str = '';
            // str += '<p>确定要删除****</p>' +
            //     '<p><input type="button" value="确定"><input type="button" value="取消"></p>';
            // addDiv.innerHTML = str;
            // addDiv.className = 'delete';
            // addDiv.style.top = innerHeight/2 - 40 + 'px';
            // addDiv.style.left = (document.body.clientWidth || document.documentElement.clientWidth)/2 -120 + 'px';//由于clientWidth不包含滚动条，所以用了这个
            // document.body.appendChild(addDiv);
            // eventUntil.stopPropagation(e);
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
        // document.body.style.overflow = 'hidden';
        cover.style.height = innerHeight + 'px';
        cover.style.width = innerWidth + 'px';
        cover.style.display = 'block';

        disabledMouseWheel();

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
        cover.style.display = 'none';
        elem.parentNode.removeChild(elem);
    }

    /**
     * 禁止滚轮滑动
     */
    function disabledMouseWheel() {
        if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', preventDefault, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = preventDefault;//IE/Opera/Chrome
    }


    /**
     * 取消禁止滚轮滑动
     */
    function mouseWheel() {
        if (document.removeEventListener) {
            document.removeEventListener('DOMMouseScroll', preventDefault, false);
        }//W3C
        window.onmousewheel = document.onmousewheel = null;//IE/Opera/Chrome
    }


    function preventDefault(e) {
        var e = eventUntil.getEvent(e);
        eventUntil.preventDefault(e);
    }


}
