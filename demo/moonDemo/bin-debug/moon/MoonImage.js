var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * ...2017-4-28
 * @author vinson
 * 图片处理类，需要MoonTheme支持
 */
var MOON_FTP = 24;
var moon;
(function (moon) {
    /**图像类 */
    var Image = (function (_super) {
        __extends(Image, _super);
        function Image(skinName) {
            if (skinName === void 0) { skinName = ""; }
            var _this = _super.call(this) || this;
            if (skinName != "") {
                _this.skinName = skinName;
                _this.position = new Point();
                _this.addBitmap();
                _this.bgWidth = _this.width;
                _this.bgHeight = _this.height;
            }
            return _this;
        }
        Image.prototype.addBitmap = function () {
            if (RES.hasRes(this.skinName)) {
                this.skinImage = new moon.Scale9Image(this.skinName);
                this.addChild(this.skinImage);
            }
            else {
                trace("找不到资源：" + this.skinName);
                //egret.error("找不到key"+this.skinName);
            }
        };
        /**设置锚点在中心 */
        Image.prototype.setAnchorCenter = function () {
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
        };
        return Image;
    }(moon.MoonContainer));
    moon.Image = Image;
    __reflect(Image.prototype, "moon.Image");
    /**图像容器类 */
    var BasicContainer = (function (_super) {
        __extends(BasicContainer, _super);
        function BasicContainer() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.items = [];
            _this.index = 0;
            return _this;
        }
        BasicContainer.prototype.addItem = function (item) {
            this.items.push(item);
        };
        BasicContainer.prototype.removeItem = function (index) {
            if (this.hasItem(index)) {
                this.items.splice(index, 1);
            }
        };
        BasicContainer.prototype.getItem = function (index) {
            return this.items[index];
        };
        BasicContainer.prototype.hasItem = function (index) {
            return this.items.length > 0 && (index >= 0 && index < this.items.length);
        };
        BasicContainer.prototype.getNextItem = function () {
            return this.items[this.index++];
        };
        Object.defineProperty(BasicContainer.prototype, "itemsLength", {
            get: function () { return this.items.length; },
            enumerable: true,
            configurable: true
        });
        BasicContainer.prototype.reset = function () {
            this.index = 0;
        };
        return BasicContainer;
    }(Image));
    moon.BasicContainer = BasicContainer;
    __reflect(BasicContainer.prototype, "moon.BasicContainer");
    /**图像贴图类 */
    var ImageChartlet = (function (_super) {
        __extends(ImageChartlet, _super);
        function ImageChartlet(skinName, count) {
            if (count === void 0) { count = 1; }
            var _this = _super.call(this) || this;
            _this.skinName = skinName;
            for (var i = 0; i < count; i++) {
                _this.items.push(_this.getBitmap());
            }
            return _this;
        }
        ImageChartlet.prototype.getBitmap = function () {
            var skin;
            if (RES.hasRes(this.skinName)) {
                skin = new moon.Scale9Image(this.skinName);
                this.addChild(skin);
            }
            else {
                trace("找不到资源：" + this.skinName);
            }
            return skin;
        };
        /**竖排获横排 */
        ImageChartlet.prototype.layout = function (type, interval) {
            if (interval === void 0) { interval = 0; }
            if (type == moon.Const.VERTICAL)
                moon.SimpleLayout.displayRank(this.items, 1, interval, interval, 0, 0);
            else if (type == moon.Const.HORIZONTAL)
                moon.SimpleLayout.displayRank(this.items, this.items.length, interval, interval, 0, 0);
        };
        /**多行排列，xNum是一排排几个 */
        ImageChartlet.prototype.setMultiLine = function (xNum, interval) {
            if (interval === void 0) { interval = 0; }
            moon.SimpleLayout.displayRank(this.items, xNum, interval, interval, 0, 0);
        };
        return ImageChartlet;
    }(BasicContainer));
    moon.ImageChartlet = ImageChartlet;
    __reflect(ImageChartlet.prototype, "moon.ImageChartlet", ["moon.ILayout"]);
    /**图像残影跟随 */
    var ImageFollow = (function (_super) {
        __extends(ImageFollow, _super);
        function ImageFollow(skinName, count) {
            if (count === void 0) { count = 1; }
            var _this = _super.call(this, skinName, count) || this;
            /**跟随速度 */
            _this.speed = 4;
            _this.head = _this.items[0];
            _this.addChild(_this.head);
            _this.reset();
            while (_this.hasItem(_this.index)) {
                var item = _this.getNextItem();
                item.alpha = (_this.itemsLength - (_this.index - 1)) / _this.itemsLength;
            }
            egret.startTick(_this.loop, _this);
            return _this;
        }
        /**更新位置 */
        ImageFollow.prototype.update = function (x, y) {
            this.head.x += x;
            this.head.y += y;
        };
        /**循环函数*/
        ImageFollow.prototype.loop = function (num) {
            var len = this.items.length - 1;
            var endItem = this.items[len];
            if (moon.GameUtils.twoDistance(this.headItem, endItem) > 0.1) {
                //当头尾间的距离小于0.1时，就不在执行循环跟随。
                var v = this.speed;
                for (var i = 0; i < len; i++) {
                    var item1 = this.items[i];
                    var item2 = this.items[i + 1];
                    item2.x += (item1.x - item2.x) / v;
                    item2.y += (item1.y - item2.y) / v;
                }
            }
            return true;
        };
        Object.defineProperty(ImageFollow.prototype, "headItem", {
            get: function () { return this.head; },
            enumerable: true,
            configurable: true
        });
        ;
        return ImageFollow;
    }(ImageChartlet));
    moon.ImageFollow = ImageFollow;
    __reflect(ImageFollow.prototype, "moon.ImageFollow");
    /**图像循环播放（一般用于两张相同的背景一直循环使用） */
    var ImageLoopPlay = (function (_super) {
        __extends(ImageLoopPlay, _super);
        function ImageLoopPlay(skinName) {
            var _this = _super.call(this, skinName, 2) || this;
            _this._speed = -5; //速度
            _this.layout();
            return _this;
        }
        Object.defineProperty(ImageLoopPlay.prototype, "speed", {
            get: function () { return this._speed; },
            set: function (v) { this._speed = v; },
            enumerable: true,
            configurable: true
        });
        /**横竖版布局，默认是横版布局 interval在此表示需要移动的左右还是上下的方向*/
        ImageLoopPlay.prototype.layout = function (type, interval) {
            if (type === void 0) { type = moon.Const.HORIZONTAL; }
            if (interval === void 0) { interval = -1; }
            this.type = type;
            this.reset();
            while (this.hasItem(this.index)) {
                var item = this.getItem(this.index);
                item.x = item.y = 0;
                if (type == moon.Const.HORIZONTAL) {
                    if (interval < 0)
                        item.x = this.index * item.width;
                    else
                        item.x = this.index * item.width * -1;
                }
                else {
                    if (interval < 0)
                        item.y = this.index * item.height;
                    else
                        item.y = this.index * item.height * -1;
                }
                this.index++;
            }
        };
        ImageLoopPlay.prototype.play = function () {
            egret.startTick(this.loop, this);
        };
        ImageLoopPlay.prototype.stop = function () {
            egret.stopTick(this.loop, this);
        };
        /**循环函数*/
        ImageLoopPlay.prototype.loop = function (num) {
            var len = this.items.length;
            for (var i = 0; i < len; i++) {
                var item = this.items[i];
                if (this.type == moon.Const.HORIZONTAL) {
                    item.x += this.speed;
                    if (this.speed < 0) {
                        if (item.x <= -item.width) {
                            var x = item.x + item.width;
                            item.x = item.width + x;
                        }
                    }
                    else {
                        if (item.x >= item.width) {
                            var x = item.x - item.width;
                            item.x = -item.width + x;
                        }
                    }
                }
                else {
                    item.y += this.speed;
                    if (this.speed < 0) {
                        if (item.y <= -item.height) {
                            var y = item.y + item.height;
                            item.y = item.height + y;
                        }
                    }
                    else {
                        if (item.y >= item.height) {
                            var y = item.y - item.height;
                            item.y = -item.height + y;
                        }
                    }
                }
            }
            return true;
        };
        return ImageLoopPlay;
    }(ImageChartlet));
    moon.ImageLoopPlay = ImageLoopPlay;
    __reflect(ImageLoopPlay.prototype, "moon.ImageLoopPlay");
    /**图像动画类 */
    var ImageAnimation = (function (_super) {
        __extends(ImageAnimation, _super);
        function ImageAnimation(skinName, start, end, type) {
            if (skinName === void 0) { skinName = ""; }
            if (type === void 0) { type = "png"; }
            var _this = _super.call(this) || this;
            _this._ftp = MOON_FTP;
            for (var i = start; i <= end; i++) {
                _this.items.push(skinName + i + "_" + type);
            }
            _this.skinName = _this.getItem(0);
            _this.addBitmap();
            _this.createTime();
            return _this;
        }
        ImageAnimation.prototype.createTime = function () {
            if (this.timer == null) {
                this.timer = new egret.Timer(1000 / this.ftp, 0);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            }
        };
        ImageAnimation.prototype.onTimer = function () {
            if (this.hasItem(++this.index)) {
                this.gotoAndStop(this.index);
            }
            else {
                if (this.loop) {
                    this.reset();
                    this.gotoAndStop(this.index);
                }
                else {
                    this.timer.stop();
                }
            }
        };
        ImageAnimation.prototype.gotoAndStop = function (index) {
            if (this.hasItem(index)) {
                this.index = index;
                this.skinName = this.getItem(index);
                this.update();
            }
            else {
                trace("gotoAndStop的参数请保持在0到" + this.items.length, "当前index=" + index);
            }
        };
        ImageAnimation.prototype.gotoAndPlay = function (index) {
            this.index = index;
            this.play();
        };
        ImageAnimation.prototype.play = function () {
            this.timer.start();
        };
        ImageAnimation.prototype.stop = function () {
            this.timer.stop();
        };
        ImageAnimation.prototype.update = function () {
            if (RES.hasRes(this.skinName)) {
                this.skinImage.texture = RES.getRes(this.skinName);
            }
            else {
                trace("找不到资源：" + this.skinName);
            }
        };
        Object.defineProperty(ImageAnimation.prototype, "currentFrame", {
            get: function () { return this.index; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ImageAnimation.prototype, "ftp", {
            get: function () { return this._ftp; },
            set: function (value) {
                this._ftp = value;
                this.removeTime();
                this.createTime();
            },
            enumerable: true,
            configurable: true
        });
        ImageAnimation.prototype.removeTime = function () {
            if (this.timer != null) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this.timer = null;
            }
        };
        ImageAnimation.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            this.removeTime();
        };
        return ImageAnimation;
    }(BasicContainer));
    moon.ImageAnimation = ImageAnimation;
    __reflect(ImageAnimation.prototype, "moon.ImageAnimation");
    /**图像布局类 */
    var ImageLayout = (function () {
        function ImageLayout() {
        }
        ImageLayout.getIns = function () {
            if (this.instance == null)
                this.instance = new ImageLayout();
            return this.instance;
        };
        ImageLayout.prototype.setImage = function (image) {
            this.image = image;
        };
        ImageLayout.prototype.setStageWH = function (w, h) {
            this.tw = w;
            this.th = h;
        };
        ImageLayout.prototype.setTop = function (distance) {
            this.image.y = distance;
        };
        ImageLayout.prototype.setBottom = function (distance) {
            this.image.y = this.th - this.image.height - distance;
        };
        ImageLayout.prototype.setLeft = function (distance) {
            this.image.x = distance;
        };
        ImageLayout.prototype.setRight = function (distance) {
            this.image.x = this.tw - this.image.width - distance;
        };
        ImageLayout.prototype.setCenterX = function (distance) {
            if (distance === void 0) { distance = 0; }
            this.image.x = ((this.tw - this.image.width) >> 1) + distance;
        };
        ImageLayout.prototype.setCenterY = function (distance) {
            if (distance === void 0) { distance = 0; }
            this.image.y = ((this.tw - this.image.width) >> 1) + distance;
        };
        ImageLayout.prototype.setCenterXByPanent = function (image) {
            if (image.parent instanceof Image)
                image.x = (image.parent.bgWidth - image.width) >> 1;
            else
                image.x = (image.parent.width - image.width) >> 1;
        };
        ImageLayout.prototype.setCenterYByPanent = function (image) {
            if (image.parent instanceof Image)
                image.y = (image.parent.bgHeight - image.height) >> 1;
            else
                image.y = (image.parent.height - image.height) >> 1;
        };
        return ImageLayout;
    }());
    moon.ImageLayout = ImageLayout;
    __reflect(ImageLayout.prototype, "moon.ImageLayout");
})(moon || (moon = {}));
//# sourceMappingURL=MoonImage.js.map