document.addEventListener("DOMContentLoaded", function () {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var BASE_COLORS = [
        '#cebf94',
        '#cccccc',
    ];

    var STYLE_FILE_MAPS = [
        [
            'image/c0/p11.png',
            'image/c0/p21.png',
            'image/c0/p31.png',
            'image/c0/p41.png',
            'image/c0/p51.png',
            // 'image/c0/p61.png',

            'image/c0/p12.png',
            'image/c0/p22.png',
            'image/c0/p32.png',
            'image/c0/p42.png',
            'image/c0/p52.png',
            // 'image/c0/p62.png',

            'image/c0/p13.png',
            'image/c0/p23.png',
            'image/c0/p33.png',
            'image/c0/p43.png',
            'image/c0/p53.png',
            // 'image/c0/p63.png',

            'image/c0/p14.png',
            'image/c0/p24.png',
            'image/c0/p34.png',
            'image/c0/p44.png',
            'image/c0/p54.png',
            // 'image/c0/p64.png',
        ],
        [
            'image/c1/p11.png',
            'image/c1/p21.png',
            'image/c1/p31.png',
            'image/c1/p41.png',
            'image/c1/p51.png',
            // 'image/c1/p61.png',

            'image/c1/p12.png',
            'image/c1/p22.png',
            'image/c1/p32.png',
            'image/c1/p42.png',
            'image/c1/p52.png',
            // 'image/c1/p62.png',

            'image/c1/p13.png',
            'image/c1/p23.png',
            'image/c1/p33.png',
            'image/c1/p43.png',
            'image/c1/p53.png',
            // 'image/c1/p63.png',

            'image/c1/p14.png',
            'image/c1/p24.png',
            'image/c1/p34.png',
            'image/c1/p44.png',
            'image/c1/p54.png',
            // 'image/c1/p64.png',
        ],
    ];

    var styleImages = [];

    init();

    function init() {
        STYLE_FILE_MAPS.forEach((styleFileMap) => {
            var images = [];

            styleFileMap.forEach((file) => {
                var img = new Image();
                img.src = file;
                images.push(img);
            });

            styleImages.push(images);
        });
    }

    function generate() {
        var num = document.getElementById('number').value;
        var scale = document.getElementById('scale').value;
        var colorIndex = getRadioValue('color');

        var images = styleImages[colorIndex];

        context.fillStyle = BASE_COLORS[colorIndex];
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < num; i++) {
            var image = images[getRandom(images.length)];

            var x = getRandom(canvas.width + image.width) - image.width;
            var y = getRandom(canvas.height + image.height) - image.height;

            var inverse = Math.round(Math.random()) === 1 ? -1 : 1;

            context.save();
            context.scale(scale * inverse, scale);
            context.drawImage(image, (x * inverse) / scale, y / scale);
            context.restore();
        }
    }

    function getRadioValue(name) {
        var elements = document.getElementsByName(name);

        for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked) return elements[i].value;
        }

        return 0;
    }

    function getRandom(value) {
        return Math.floor(Math.random() * value);
    }

    document.getElementById('generate').addEventListener('click', function () {
        generate();
    });
});
