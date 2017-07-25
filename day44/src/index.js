/**
 * Created by zhu_yeqing on 2017/7/23.
 */
// import _ from 'lodash';
var style = require('./css/main.less');

function basic() {
    var elem = document.createElement('div');

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
                   + '</div>';
    return elem;
}

document.body.appendChild(basic());

