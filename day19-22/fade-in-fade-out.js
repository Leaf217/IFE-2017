/**
 * Created by zhu_yeqing on 2017/6/26.
 */

setInterval(function () {
    play()
},3000)
function fadeIn(elem) {
    elem.className = "image fade-in";
}
function fadeOut(elem) {
    elem.className = "image";
}
var imgNum = 0;
function play() {
    var imgs = document.getElementById('images').getElementsByTagName('img');
    var buttons = document.getElementById('buttons').getElementsByTagName('span');
    if (imgNum == 3) {
        fadeOut(imgs[imgNum]);
        buttons[imgNum].className = "off";
        imgNum = 0;
        fadeIn(imgs[imgNum]);
        buttons[imgNum].className = "on";
    } else {
        fadeOut(imgs[imgNum]);
        buttons[imgNum].className = "off";
        fadeIn(imgs[imgNum + 1]);
        buttons[imgNum + 1].className = "on";
        imgNum++;
    }
}