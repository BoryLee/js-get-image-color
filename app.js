~function () {
    var x_input = getDOMElement('x_input');
    var y_input = getDOMElement('y_input');
    var colorBtn = getDOMElement('color-btn');
    var colorContent = getDOMElement('color');
    var colorArea = getDOMElement('color-area');
    var imageContainer = getDOMElement('left');
    var imageDOM = getDOMElement('img');
    var x;
    var y;
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var image = new Image();
    image.src = imageDOM.src;
    canvas.setAttribute('width', image.width);
    canvas.setAttribute('height', image.height);
    image.onload = function () {
        ctx.drawImage(image, 0, 0)
    }
    imageDOM.addEventListener('click', function (e) {
        x = e.clientX - imageContainer.scrollLeft;
        y = e.clientY - imageContainer.scrollTop;
        if (e.target.offsetParent) {
            x = x - e.target.offsetLeft;
            y = y - e.target.offsetTop;
        }
        x_input.value = x;
        y_input.value = y;
    }, false);

    colorBtn.addEventListener('click', function () {
        getRGBA();
    }, false);

    function getRGBA() {
        if (x && y) {
            var ctxData = ctx.getImageData(x, y, 1, 1);
            var data = ctxData.data;
            var r = data[0],
                g = data[1],
                b = data[2],
                a = data[3] / 255;
            getDOMElement('r').value = r;
            getDOMElement('g').value = g;
            getDOMElement('b').value = b;
            getDOMElement('a').value = a;
            getDOMElement('hex').textContent = '#' + addZero(r) + addZero(g) + addZero(b);
            colorContent.textContent = 'rgba:(' + r + ',' + g + ',' + b + ',' + a + ')';
            colorArea.style.backgroundColor = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
        } else {
            alert('请选择图片位置')
        }
    }

    function addZero(num) {
        return num.toString(16).length < 2 ? '0' + num.toString(16) : num.toString(16);
    }

    function getDOMElement(selector) {
        return document.getElementById(selector);
    }

}()