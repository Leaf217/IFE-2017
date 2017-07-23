/**
 * Created by zhu_yeqing on 2017/7/23.
 */
import _ from 'lodash';
var style = require('./css/main.less');

// import "main.less";
function component() {
    var element = document.createElement('div');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.id = 'hello';

    return element;
}

document.body.appendChild(component());