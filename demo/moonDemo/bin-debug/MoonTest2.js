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
var TestProgress = (function (_super) {
    __extends(TestProgress, _super);
    function TestProgress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestProgress.prototype.render = function () {
        this.label = "测试Progress";
        _super.prototype.render.call(this);
        this.colorBottom = 0X333333;
        this.createCloseBtn();
        this.progressBar = new moon.ProgressBar();
        this.addChild(this.progressBar);
        this.progressBar.x = this.progressBar.y = 100;
        egret.startTick(this.loop, this);
    };
    TestProgress.prototype.loop = function () {
        this.progressBar.value += 0.002;
        this.progressBar.value = this.progressBar.value >= 1 ? 0 : this.progressBar.value;
        var v = Math.round(this.progressBar.value * 100) + "%";
        this.progressBar.showText(v);
        return false;
    };
    TestProgress.prototype.displose = function () {
        egret.stopTick(this.loop, this);
        _super.prototype.dispose.call(this);
    };
    return TestProgress;
}(BView));
__reflect(TestProgress.prototype, "TestProgress");
var TestScrollBar = (function (_super) {
    __extends(TestScrollBar, _super);
    function TestScrollBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestScrollBar.prototype.render = function () {
        this.label = "测试ScrollBar";
        _super.prototype.render.call(this);
        this.colorBottom = 0X444444;
        this.createCloseBtn();
        var scrollBar = new moon.ScrollBar();
        var bitmap = new moon.Scale9Image("bg_jpg");
        scrollBar.target = bitmap;
        scrollBar.setSize(400, 400);
        scrollBar.layout(moon.Const.VERTICAL);
        this.addChild(scrollBar);
        scrollBar.x = scrollBar.y = 100;
        var scrollBar = new moon.ScrollBar();
        var bitmap = new moon.Scale9Image("bg_jpg");
        scrollBar.target = bitmap;
        scrollBar.setSize(400, 400);
        scrollBar.layout(moon.Const.HORIZONTAL);
        this.addChild(scrollBar);
        scrollBar.x = 100;
        scrollBar.y = 550;
    };
    return TestScrollBar;
}(BView));
__reflect(TestScrollBar.prototype, "TestScrollBar");
var G2048 = (function (_super) {
    __extends(G2048, _super);
    function G2048() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    G2048.prototype.render = function () {
        this.label = "测试2048界面";
        _super.prototype.render.call(this);
        this.colorBottom = 0XFFF8EE;
        this.createCloseBtn();
        var w = this.stageWidth - 20;
        var dis = (this.stageWidth - w) >> 1;
        var node = this.createRoundRect(0XBDAB9D, w, w);
        node.x = dis;
        node.y = (this.stageHeight - w) - dis;
        w = 200;
        node = this.createRoundRect(0XECC400, w, w);
        node.x = dis;
        node.y = (this.stageHeight - w) - w * 3.3;
        this.createTextBySprite("2048", node, 100);
        w = 150;
        var y = node.y;
        node = this.createRoundRect(0XBCAC9F, w + 40, w);
        node.x = 240;
        node.y = y;
        this.createTextBySprite("当前分:99", node, 30);
        node = this.createRoundRect(0XBCAC9F, w + 40, w);
        node.x = 440;
        node.y = y;
        this.createTextBySprite("最高分:999", node, 30);
        var colors = [0XEFE5DB, 0XEDE1CB, 0XF0B37D, 0XEB8E53, 0XEF8168, 0XF75431, 0XF6D76D];
        var values = [2, 4, 8, 16, 32, 64, 128];
        w = (this.stageWidth - 60) / 4;
        var nodes = [];
        for (var i = 0; i < 16; i++) {
            var index = Math.floor(Math.random() * colors.length);
            var c = colors[index];
            node = this.createRoundRect(c, w, w);
            nodes.push(node);
            this.createTextBySprite(values[index], node);
        }
        moon.SimpleLayout.displayRank(nodes, 4, 5, 5, 20, 520);
    };
    G2048.prototype.createRoundRect = function (c, w, h) {
        var node = moon.MoonUI.getRoundRect(w, h, c, 10, 10);
        this.addChild(node);
        return node;
    };
    G2048.prototype.createTextBySprite = function (value, node, size) {
        if (size === void 0) { size = 80; }
        var label = new moon.Label(value);
        var text = label.textField;
        text.size = size;
        text.x = (node.width - text.width) >> 1;
        text.y = (node.height - text.height) >> 1;
        node.addChild(text);
    };
    return G2048;
}(BView));
__reflect(G2048.prototype, "G2048");
var Draw = (function (_super) {
    __extends(Draw, _super);
    function Draw() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.canvasY = 300;
        _this.prevColor = 0;
        _this.color = 0;
        _this.size = 1;
        return _this;
    }
    Draw.prototype.render = function () {
        this.label = "测试画图";
        _super.prototype.render.call(this);
        this.colorBottom = 0X333333;
        this.createCloseBtn();
        this.createColors();
        this.createCanvas();
        this.createButtons();
        this.createSliderBar();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    Draw.prototype.createButtons = function () {
        var names = ["铅笔", "橡皮"];
        var rects = [];
        for (var i = 0; i < names.length; i++) {
            var btn = new moon.BasicButton();
            btn.label = names[i];
            this.addChild(btn);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.change, this);
            rects.push(btn);
        }
        moon.SimpleLayout.displayRank(rects, 2, 5, 5, 400, 200);
    };
    Draw.prototype.change = function (e) {
        var btn = e.currentTarget;
        if (btn.label == "铅笔") {
            this.color = this.prevColor;
        }
        else {
            this.color = moon.Color.white;
        }
    };
    Draw.prototype.createSliderBar = function () {
        var sliderBar = new moon.SliderBar();
        sliderBar.value = 0;
        this.addChild(sliderBar);
        sliderBar.x = 40;
        sliderBar.y = 250;
        sliderBar.addEvent(moon.MoonEvent.MOVE, this.changeSize, this);
    };
    Draw.prototype.changeSize = function (e) {
        var sliderBar = e.currentTarget;
        this.size = sliderBar.value * 99 + 1;
    };
    Draw.prototype.createColors = function () {
        var total = 20;
        var rects = [];
        for (var i = 0; i < total; i++) {
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT_ROUND;
            rect.data = { w: 40, h: 40, c: moon.Color.random, ew: 10, eh: 10 };
            rect.setBackground(0, 5);
            this.addChild(rect);
            rect.touchEnabled = true;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onColor, this);
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects, 10, 5, 5, 20, 80);
    };
    Draw.prototype.onColor = function (e) {
        var rect = e.currentTarget;
        this.color = rect.color;
        this.prevColor = rect.color;
    };
    Draw.prototype.createCanvas = function () {
        var maskRect = this.createRect(this.stage.stageWidth, this.stage.stageHeight - this.canvasY, moon.Color.white);
        maskRect.y = this.canvasY;
        this.addChild(maskRect);
        this.canvas = this.createRect(this.stage.stageWidth, this.stage.stageHeight, moon.Color.white);
        this.addChild(this.canvas);
        this.canvas.mask = maskRect;
    };
    Draw.prototype.onTouch = function (e) {
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.posStart = new egret.Point(e.stageX, e.stageY);
                this.controlStart();
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.posMove = new egret.Point(e.stageX, e.stageY);
                this.controlMove();
                break;
            case egret.TouchEvent.TOUCH_END:
                this.controlEnd();
                break;
        }
    };
    /** 手指按下*/
    Draw.prototype.controlStart = function () {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
        this.canvas.graphics.lineStyle(this.size, this.color);
        this.canvas.graphics.moveTo(this.posStart.x, this.posStart.y);
    };
    /** 手指移动*/
    Draw.prototype.controlMove = function () {
        this.canvas.graphics.lineTo(this.posMove.x, this.posMove.y);
    };
    /** 手指离开*/
    Draw.prototype.controlEnd = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    };
    Draw.prototype.dispose = function () {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
        _super.prototype.dispose.call(this);
    };
    return Draw;
}(BView));
__reflect(Draw.prototype, "Draw");
//# sourceMappingURL=MoonTest2.js.map