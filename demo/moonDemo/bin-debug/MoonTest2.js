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
        this.createLevel();
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
            this.createLevel();
        }
    };
    GameSelectColor.prototype.createLevel = function () {
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
            this.createAlert("   游戏结束\n点击确定可继续");
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
var DestoryStar = (function (_super) {
    __extends(DestoryStar, _super);
    function DestoryStar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.select = 0;
        _this.value = 100;
        return _this;
    }
    DestoryStar.prototype.render = function () {
        this.label = "消灭星星界面";
        _super.prototype.render.call(this);
        this.colorBottom = 0X333333;
        this.createCloseBtn();
        this.createLevel();
    };
    DestoryStar.prototype.createLevel = function () {
        var total = 104;
        var rects = [];
        var half = 8;
        var w = (this.stageWidth - 16) / half;
        var c;
        var colors = moon.Color.getRandomArray(3);
        for (var i = 0; i < total; i++) {
            c = colors[Math.floor(Math.random() * colors.length)];
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT;
            rect.data = { w: w, h: w, c: c, ew: 10, eh: 10 };
            rect.setBackground(0, 1);
            this.addItem(rect);
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects, half, 0, 0);
    };
    return DestoryStar;
}(BView));
__reflect(DestoryStar.prototype, "DestoryStar");
var GameBackpack = (function (_super) {
    __extends(GameBackpack, _super);
    function GameBackpack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameBackpack.prototype.render = function () {
        this.label = "游戏背包";
        _super.prototype.render.call(this);
        this.colorBottom = 0X333333;
        this.createCloseBtn();
        this.createBackpack();
    };
    GameBackpack.prototype.createBackpack = function () {
        var names = ["装备", "材料", "消耗品", "时装"];
        var tabbar = new moon.TabbarBar;
        this.addItem(tabbar, 60, 100);
        for (var i = 0; i < names.length; i++) {
            var skins = this.getSkins();
            var btn = new moon.MoreSkinButton(skins);
            btn.labelColor = 0X502200;
            btn.skinAutoScale = false;
            btn.label = names[i];
            tabbar.addItem(btn);
        }
        tabbar.selectIndex = 0;
        tabbar.layout(moon.Const.HORIZONTAL, 1);
        var w = this.stageWidth - 100;
        var h = this.stageHeight - 300;
        var c = 0XE4C0A4;
        var bc = 0XC99769;
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_RECT_ROUND;
        rect.data = { w: w, h: h, c: c, ew: 20, eh: 20 };
        rect.setBackground(bc, 3);
        this.addItem(rect, 50, 150);
        var rects = [];
        w = 90;
        for (i = 0; i < 35; i++) {
            var c = 0XCC9D79;
            var bc = 0XC99769;
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT_ROUND;
            rect.data = { w: w, h: w, c: c, ew: 15, eh: 15 };
            rect.setBackground(bc, 5);
            this.addItem(rect);
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects, 5, 5, 5, 63, 170);
        var names = ["1", "2", "3", "4"];
        var tabbar = new moon.TabbarBar;
        this.addItem(tabbar, 80, 920);
        for (var i = 0; i < names.length; i++) {
            var skins = this.getCircleSkins();
            var btn = new moon.MoreSkinButton(skins);
            btn.labelColor = 0X502200;
            btn.skinAutoScale = false;
            btn.label = names[i];
            tabbar.addItem(btn);
        }
        tabbar.selectIndex = 0;
        tabbar.layout(moon.Const.HORIZONTAL, 1);
    };
    GameBackpack.prototype.getSkins = function () {
        var values = [];
        var c1 = 0XD79565;
        var c2 = 0XFFC64E;
        var bc = 0X502200;
        for (var i = 0; i < 4; i++) {
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_RECT_ROUND;
            rect.data = { w: 120, h: 60, c: i == 0 ? c1 : c2, ew: 10, eh: 10 };
            rect.setBackground(bc, 3);
            values.push(rect);
        }
        return values;
    };
    GameBackpack.prototype.getCircleSkins = function () {
        var values = [];
        var c1 = 0XD79565;
        var c2 = 0XFFC64E;
        var bc = 0X502200;
        for (var i = 0; i < 4; i++) {
            var rect = new moon.MoonDisplayObject;
            rect.type = moon.Const.SHAPE_CIRCLE;
            rect.data = { r: 20, c: i == 0 ? c1 : c2 };
            rect.anchorOffsetX = rect.anchorOffsetY = -25;
            rect.setBackground(bc, 3);
            values.push(rect);
        }
        return values;
    };
    return GameBackpack;
}(BView));
__reflect(GameBackpack.prototype, "GameBackpack");
var TextInput = (function (_super) {
    __extends(TextInput, _super);
    function TextInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextInput.prototype.render = function () {
        this.label = "输入框测试";
        _super.prototype.render.call(this);
        this.colorBottom = 0X99FF99;
        this.createCloseBtn();
        this.createView();
    };
    TextInput.prototype.createView = function () {
        this.createTitle("单行自由输入", 5);
        var input = new moon.InputBar(this.stageWidth, 50);
        this.addChild(input);
        input.y = 100;
        this.createTitle("单行只能输入十个字", 105);
        input = new moon.InputBar(this.stageWidth, 50);
        this.addChild(input);
        input.maxChars = 10;
        input.y = 200;
        this.createTitle("单行只能输入数字与字母", 205);
        input = new moon.InputBar(this.stageWidth, 50);
        this.addChild(input);
        input.y = 300;
        input.color = 0X333333;
        input.restrict = "a-zA-Z0-9";
        this.createTitle("多行自由输入", 305);
        var input = new moon.InputBar(this.stageWidth, 300);
        this.addChild(input);
        input.setMultiline();
        input.y = 400;
    };
    return TextInput;
}(BView));
__reflect(TextInput.prototype, "TextInput");
/**城市背景地图 */
var HouseMapTest = (function (_super) {
    __extends(HouseMapTest, _super);
    function HouseMapTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HouseMapTest.prototype.render = function () {
        this.label = "城市背景地图";
        _super.prototype.render.call(this);
        this.colorBottom = 0X999999;
        this.createCloseBtn();
        this.createView();
    };
    HouseMapTest.prototype.createView = function () {
        var rect = new egret.Rectangle(0, 0, this.stageWidth, this.stageHeight);
        var home = new egret.Rectangle(10, 200, 20, 200);
        var map = new MapHorizontalHouse(rect, home, 0);
        this.addChild(map);
        var rect = new egret.Rectangle(0, 0, this.stageWidth, this.stageHeight);
        var home = new egret.Rectangle(10, 100, 40, 100);
        var map = new MapHorizontalHouse(rect, home);
        this.addChild(map);
    };
    return HouseMapTest;
}(BView));
__reflect(HouseMapTest.prototype, "HouseMapTest");
/**城市背景地图 */
var MapHorizontalHouse = (function (_super) {
    __extends(MapHorizontalHouse, _super);
    function MapHorizontalHouse(rect, house, color) {
        if (color === void 0) { color = -1; }
        var _this = _super.call(this) || this;
        _this.rect = rect;
        _this.house = house;
        _this.color = color;
        return _this;
    }
    MapHorizontalHouse.prototype.render = function () {
        var house = this.house;
        var bg = moon.MoonUI.getRect(this.rect.width, this.rect.height);
        bg.alpha = 0.1;
        this.addChild(bg);
        var count = this.rect.width / house.width;
        var prevx = 0;
        for (var i = 0; i < count; i++) {
            var color = this.color == -1 ? Math.random() * 0XFFFFFF : this.color;
            var width = house.width + Math.random() * house.x;
            var height = house.height + Math.random() * house.y;
            var rect = moon.MoonUI.getRect(width, height, color);
            this.addChild(rect);
            rect.y = this.rect.height - rect.height;
            rect.x = prevx;
            prevx = rect.x + rect.width;
        }
    };
    return MapHorizontalHouse;
}(moon.MoonContainer));
__reflect(MapHorizontalHouse.prototype, "MapHorizontalHouse");
//# sourceMappingURL=MoonTest2.js.map