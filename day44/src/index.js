/**
 * Created by zhu_yeqing on 2017/7/23.
 */
// import $ from 'jquery';
var style = require('./css/main.less');
// var boots = require('../bootstrap/css/bootstrap.css');
import 'bootstrap/dist/css/bootstrap.min.css';


function basic() {
    var elem = document.createElement('div');

    var ongoing = require('../images/play.png');
    var waiting = require('../images/suspend.png');
    var finished = require('../images/task_fill.png');

    elem.id = 'elem';
    elem.innerHTML = '<div id="top">'
                   + '<p>Title</p> '
                   + '<button type="button">Add</button>'
                   + '</div>'

                   + '<div id="priority">'
                   + '<div class="flex"><div id="red-circle"></div> '
                   + '<div class="text">高优</div></div>'
                   + '<div class="flex"><div id="yellow-circle"></div> '
                   + '<div class="text">中优</div></div> '
                   + '<div class="flex"><div id="green-circle"></div> '
                   + '<div class="text">低优</div></div>'
                   + '</div>'

                   + '<div id="status">'
                   + '<div class="flex"><span class="icon-pause"></span><img src="'+ongoing+'" alt="ongoing">'
                   + '<div class="text">进行中</div></div>'
                   + '<div class="flex"><img src="'+waiting+'" alt="waiting"> '
                   + '<div class="text">待办</div></div> '
                   + '<div class="flex"><img src="'+finished+'" alt="finished"> '
                   + '<div class="text">已完成</div></div>'
                   + '</div>';
    return elem;
}

document.body.appendChild(basic());

