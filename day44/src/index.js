/**
 * Created by zhu_yeqing on 2017/7/23.
 */
import $ from 'jquery';
import {data} from './data.js';
var style = require('./css/main.less');
var boots = require('../bootstrap/css/bootstrap.css');
// var data = require('./data.js');

$(document).ready((function () {

    function basic() {
        var elem = document.createElement('div');

        var ongoing = require('../images/play.png');
        var waiting = require('../images/suspend.png');
        var finished = require('../images/task_fill.png');


        elem.id = 'elem';
        elem.innerHTML = '<div id="top">'
                       + '<p>Title</p> '
                       + '<button type="button" id="add">Add</button>'
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
                       + '<div class="flex"><img src="' + ongoing + '" alt="ongoing">'
                       + '<div class="text">进行中</div></div>'
                       + '<div class="flex"><img src="' + waiting + '" alt="waiting"> '
                       + '<div class="text">待办</div></div> '
                       + '<div class="flex"><img src="' + finished + '" alt="finished"> '
                       + '<div class="text">已完成</div></div>'
                       + '</div>'

                       + '<div id="content"></div>'
                       + '<div id="bottom">'
                       + '<p id="onething">OneThing</p> '
                       + '<p id="all">All</p> '
                       + '</div>';

        return elem;
    }
    $(document.body).append(basic());
    // document.body.appendChild(basic());
    // $("#top button").remove();

    //require图标
    var high_on = require('../images/play_fill_red.png');
    var middle_on = require('../images/play_fill_yellow.png');
    var low_on = require('../images/play_fill_green.png');

    var high_wa = require('../images/suspend_red.png');
    var middle_wa = require('../images/suspend_yellow.png');
    var low_wa = require('../images/suspend_green.png');

    var high_fi = require('../images/task_fill_red.png');
    var middle_fi = require('../images/task_fill_yellow.png');
    var low_fi = require('../images/task_fill_green.png');


    //判断json数据的优先级和状态，并添加相应图标和内容
    function import_data() {
        $.each(data, function (i, obj) {
            var item = '';
            if (obj["priority"] == "high" && obj["status"] == "ongoing") {
                item += '<div><img src="' + high_on + '"alt="high_on"><p>' + obj["con"] + '</p></div>';
            }
            if (obj["priority"] == "high" && obj["status"] == "waiting") {
                item += '<div><img src="' + high_wa + '"alt="high_wa"><p>' + obj["con"] + '</p></div>';
            }
            if (obj["priority"] == "high" && obj["status"] == "finished") {
                item += '<div><img src="' + high_fi + '"alt="high_fi"><p>' + obj["con"] + '</p></div>';
            }


            if (obj["priority"] == "middle" && obj["status"] == "ongoing") {
                item += '<div><img src="' + middle_on + '"alt="middle_on"><p>' + obj["con"] + '</p></div>';
            }
            if (obj["priority"] == "middle" && obj["status"] == "waiting") {
                item += '<div><img src="' + middle_wa + '"alt="middle_wa"><p>' + obj["con"] + '</p></div>';
            }
            if (obj["priority"] == "middle" && obj["status"] == "finished") {
                item += '<div><img src="' + middle_fi + '"alt="middle_fi"><p>' + obj["con"] + '</p></div>';
            }


            if (obj["priority"] == "low" && obj["status"] == "ongoing") {
                item += '<div><img src="' + low_on + '"alt="low_on"><p>' + obj["con"] + '</p></div>';
            }
            if (obj["priority"] == "low" && obj["status"] == "waiting") {
                item += '<div><img src="' + low_wa + '"alt="low_wa"><p>' + obj["con"] + '</p></div>';
            }
            if (obj["priority"] == "low" && obj["status"] == "finished") {
                item += '<div><img src="' + low_fi + '"alt="low_fi"><p>' + obj["con"] + '</p></div>';
            }
            $("#content").append(item);
        });
    }

    $(document.body).append(import_data());

    //给add绑定点击事件
    $("#add").bind("click",function () {
        var $add_button = $("#top button").detach();
        $("#top p").after("<button type='button' id='done'>Done</button>");
        $("#top p").prepend("<button type='button' id='cancel'>Cancel</button>");
        $("#priority, #status").css("background-color", "#fff");
        $(".flex").css("border-color", "#bfbfbf");
        $("#status").after("<div id='ttt'><form action='' id='new-task'><textarea name='newtask' id='new-input'>This is a new task</textarea></form></div>");
        //之前把cancel写出来不行，必须要这里边才生效
        //给cancel绑定点击事件
        $("#cancel").bind("click",function () {
            $("div").remove();
            $(document.body).append(basic());
            $("#add").replaceWith($add_button);
        })
    })

    //给onething添加事件
    $("#onething").bind("click",function () {
        $("#onething").css("font-weight", "500");
        $("#all").css("font-weight", "normal");
        var $priority = $("#priority").detach();
        var $status = $("#status").detach();
        var $content = $("#content").detach();
        var one = '';

        $("#top").after("<p>Now! The OneThing is</p>");
    })



}))


