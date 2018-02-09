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
        var bgy = (this.stageHeight - w) - dis;
        var node = this.createRoundRect(0XBDAB9D, w, w);
        node.x = dis;
        node.y = bgy;
        w = 200;
        node = this.createRoundRect(0XECC400, w, w);
        node.x = dis;
        node.y = (this.stageHeight - w) - w * 3.3;
        this.createTextBySprite("2048", node, 90);
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
        moon.SimpleLayout.displayRank(nodes, 4, 5, 5, 20, bgy + 10);
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
        this.canvasY = 300;
        this.createColors();
        this.createCanvas();
        this.createButtons();
        this.createSliderBar();
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    };
    Draw.prototype.createButtons = function () {
        var names = ["铅笔", "橡皮", "清空"];
        var tabbar = new moon.TabbarBar;
        this.addChild(tabbar);
        tabbar.x = 380;
        tabbar.y = 220;
        for (var i = 0; i < names.length; i++) {
            var skins = [moon.Skin.buttonNormal, moon.Skin.buttonDown, moon.Skin.buttonDown, moon.Skin.buttonDown];
            var btn = new moon.MoreSkinButton(skins);
            btn.label = names[i];
            tabbar.addItem(btn);
        }
        tabbar.layout(moon.Const.HORIZONTAL);
        tabbar.selectIndex = 0;
        tabbar.addEvent(moon.MoonEvent.CHANGE, this.change, this);
    };
    Draw.prototype.change = function (e) {
        var tabbar = e.currentTarget;
        switch (tabbar.selectIndex) {
            case 0:
                this.color = this.prevColor;
                break;
            case 1:
                this.color = moon.Color.white;
                break;
            case 2:
                this.canvas.graphics.clear();
                this.color = this.prevColor;
                tabbar.selectIndex = 0;
                break;
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
        var w = 40;
        for (var i = 0; i < total; i++) {
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT_ROUND;
            rect.data = { w: w, h: w, c: moon.Color.random, ew: 10, eh: 10 };
            rect.setBackground(0, 5);
            this.addChild(rect);
            rect.touchEnabled = true;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onColor, this);
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects, 10, 5, 5, 20, 80);
        this.select = this.createCircle(5, moon.Color.white);
        this.addChild(this.select);
        this.selectColor(rects[0]);
    };
    Draw.prototype.onColor = function (e) {
        var rect = e.currentTarget;
        this.selectColor(rect);
    };
    Draw.prototype.selectColor = function (rect) {
        this.color = rect.color;
        this.prevColor = rect.color;
        this.select.x = rect.x + 10;
        this.select.y = rect.y + 10;
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
        this.canvas.graphics.lineTo(this.posStart.x, this.posStart.y);
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
var GameSelectColor = (function (_super) {
    __extends(GameSelectColor, _super);
    function GameSelectColor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.select = 0;
        _this.total = 4;
        _this.level = 2;
        _this.value = 100;
        return _this;
    }
    GameSelectColor.prototype.render = function () {
        this.label = "选色游戏";
        _super.prototype.render.call(this);
        this.colorBottom = 0X333333;
        this.createCloseBtn();
        this.nextLevel();
    };
    GameSelectColor.prototype.createColors = function () {
        var total = this.total;
        var rects = [];
        var half = Math.sqrt(total);
        var w = (this.stageWidth - 100) / half;
        var c = moon.Color.random;
        var j = Math.floor(Math.random() * total);
        var c2 = moon.Color.lightenDarkenColor(c, this.value);
        for (var i = 0; i < total; i++) {
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT_ROUND;
            rect.data = { w: w, h: w, c: i == j ? c2 : c, ew: 10, eh: 10 };
            rect.setBackground(0, 1);
            this.addItem(rect);
            rect.touchEnabled = true;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onColor, this);
            rect.name = "" + i;
            rects.push(rect);
        }
        var x = (this.stageWidth - ((w + 5) * half)) >> 1;
        moon.SimpleLayout.displayRank(rects, half, 5, 5, x, 200);
        this.select = j;
    };
    GameSelectColor.prototype.onColor = function (e) {
        var rect = e.currentTarget;
        if (rect.name == this.select.toString()) {
            this.nextLevel();
        }
    };
    GameSelectColor.prototype.nextLevel = function () {
        this.total = this.level * this.level;
        this.value -= 2;
        this.reset();
        while (this.hasItem(this.index)) {
            var rect = this.getItem(this.index);
            rect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onColor, this);
            this.removeItem(rect);
        }
        this.createColors();
        this.level++;
        if (this.level > 7)
            this.level = 7;
    };
    return GameSelectColor;
}(BView));
__reflect(GameSelectColor.prototype, "GameSelectColor");
var DonotTouchWhiteRect = (function (_super) {
    __extends(DonotTouchWhiteRect, _super);
    function DonotTouchWhiteRect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.select = 0;
        _this.level = 2;
        _this.value = 100;
        _this.rects = [];
        return _this;
    }
    DonotTouchWhiteRect.prototype.render = function () {
        this.label = "别踩白块";
        _super.prototype.render.call(this);
        this.colorBottom = 0X333333;
        this.createCloseBtn();
        this.createCanvas();
        this.createLevel();
    };
    DonotTouchWhiteRect.prototype.play = function () {
        egret.startTick(this.loop, this);
    };
    DonotTouchWhiteRect.prototype.stop = function () {
        egret.stopTick(this.loop, this);
    };
    DonotTouchWhiteRect.prototype.createLevel = function () {
        var total = 6;
        for (var i = 0; i < total; i++) {
            var node = this.createSprite();
            this.canvas.addChild(node);
            this.rects.push(node);
        }
        var y = this.stageHeight - total * this.rectHeight;
        moon.SimpleLayout.displayRank(this.rects, 1, 0, 0, 0, y);
    };
    DonotTouchWhiteRect.prototype.createSprite = function () {
        var total = 4;
        var node = new Sprite;
        var w = this.stageWidth / total;
        var h = w * 1.5;
        var j = Math.floor(Math.random() * total);
        var c1 = moon.Color.white;
        var c2 = moon.Color.black;
        this.rectHeight = h;
        for (var i = 0; i < total; i++) {
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT;
            rect.data = { w: w, h: h, c: i == j ? c2 : c1 };
            rect.setBackground(moon.Color.gray, 1);
            rect.name = i == j ? "1" : "0";
            rect.touchEnabled = true;
            rect.x = i * w;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onClick, this);
            node.addChild(rect);
        }
        return node;
    };
    DonotTouchWhiteRect.prototype.onClick = function (e) {
        var r = e.currentTarget;
        if (r.name == "1") {
            this.play();
            var total = this.rects.length;
            for (var i = 0; i < total; i++) {
                var rect = this.rects[i];
                var h = rect.y + this.rectHeight;
            }
        }
        else {
        }
    };
    DonotTouchWhiteRect.prototype.loop = function (n) {
        var total = this.rects.length;
        for (var i = 0; i < total; i++) {
            var rect = this.rects[i];
            rect.y += 20;
            if (rect.y >= this.stageHeight) {
                this.stop();
                this.randomSeat(rect);
                var h = this.rects[0].y - this.rectHeight;
                rect.y = h;
                this.rects.pop();
                this.rects.unshift(rect);
            }
        }
        return true;
    };
    DonotTouchWhiteRect.prototype.randomSeat = function (rect) {
        var rects = [];
        for (var i = 0; i < 4; i++) {
            rects.push(rect.getChildAt(i));
        }
        rects = this.getRandomArray(rects);
        moon.SimpleLayout.displayRank(rects, 4);
    };
    DonotTouchWhiteRect.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.stop();
    };
    return DonotTouchWhiteRect;
}(BView));
__reflect(DonotTouchWhiteRect.prototype, "DonotTouchWhiteRect");
//# sourceMappingURL=MoonTest2.js.map