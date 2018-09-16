var vm = new Vue({
    el: '#content',
    data: {
        BASE_COLORS: [
            '#cebf94',
            '#cccccc',
        ],
        STYLE_FILE_MAPS: [
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
        ],
        canvasHeight: 1080,
        canvasWidth: 1920,
        staNumber: 5000,
        staScale: 1.0,
        colorIndex: 0,
        canvas: null,
        context: null,
        styleImages: [],
    },
    created: function () {
        this.STYLE_FILE_MAPS.forEach((styleFileMap) => {
            var images = [];

            styleFileMap.forEach((file) => {
                var img = new Image();
                img.src = file;
                images.push(img);
            });

            this.styleImages.push(images);
        });
    },
    methods: {
        generate: function () {
            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');

            var images = this.styleImages[this.colorIndex];

            this.context.fillStyle = this.BASE_COLORS[this.colorIndex];
            this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

            for (var i = 0; i < this.staNumber; i++) {
                var image = images[this.getRandom(images.length)];

                var x = this.getRandom(this.canvasWidth + image.width) - image.width;
                var y = this.getRandom(this.canvasHeight + image.height) - image.height;

                var inverse = Math.round(Math.random()) === 1 ? -1 : 1;

                this.context.save();
                this.context.scale(this.staScale * inverse, this.staScale);
                this.context.drawImage(image, (x * inverse) / this.staScale, y / this.staScale);
                this.context.restore();
            }
        },
        getRandom: function (value) {
            return Math.floor(Math.random() * value);
        },
    },
});
