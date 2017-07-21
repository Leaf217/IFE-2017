/**
 * Created by zhu_yeqing on 2017/7/19.
 */
import _ from 'lodash';
require('../main.less');
function component() {
    var element = document.createElement('div');

    // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
}

document.body.appendChild(component());