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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Button;
}(moon.BasicButton));
__reflect(Button.prototype, "Button");
;
/**游戏模版 */
var GameTest = (function (_super) {
    __extends(GameTest, _super);
    function GameTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameTest.prototype.render = function () {
        this.label = "游戏模版";
        _super.prototype.render.call(this);
        this.colorBottom = 0X999999;
        this.createCloseBtn();
        this.createView();
    };
    GameTest.prototype.createView = function () {
        this.addItem(new moon.BasicGameMain);
    };
    return GameTest;
}(BView));
__reflect(GameTest.prototype, "GameTest");
/**游戏动画模版 */
var GameAnimation = (function (_super) {
    __extends(GameAnimation, _super);
    function GameAnimation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameAnimation.prototype.render = function () {
        this.label = "动画模版";
        _super.prototype.render.call(this);
        this.colorBottom = 0XCCCCCC;
        this.createCloseBtn();
        this.createView();
    };
    GameAnimation.prototype.createView = function () {
        //背景为贴图
        var chartlet = new moon.ImageChartlet("wallMin_jpg", 40);
        //chartlet.layout(moon.Const.VERTICAL);//竖版
        chartlet.setMultiLine(4); //多行版，一行有4个
        this.addItem(chartlet);
        //图像动画
        var animation = new moon.ImageAnimation("body", 1, 13);
        animation.loop = true;
        animation.ftp = 6;
        animation.play();
        this.addItem(animation, 100, 100);
        this.body = animation;
        this.addItem(new moon.Label("控制速度", 0XFFFFFF), 100, 10);
        var s = new moon.SliderBar;
        s.value = 0;
        this.addItem(s, 50, 50);
        s.addEvent(moon.MoonEvent.OVER, this.onSlider, this);
    };
    GameAnimation.prototype.onSlider = function (e) {
        var s = e.currentTarget;
        this.body.ftp = 6 + s.value * 54;
        this.body.play();
    };
    return GameAnimation;
}(BView));
__reflect(GameAnimation.prototype, "GameAnimation");
/**游戏提示模版 */
var GameAlert = (function (_super) {
    __extends(GameAlert, _super);
    function GameAlert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameAlert.prototype.render = function () {
        this.label = "提示模版";
        _super.prototype.render.call(this);
        this.colorBottom = 0XFFCCCC;
        this.createCloseBtn();
        this.createView();
    };
    GameAlert.prototype.createView = function () {
        this.setButton("提示自动关闭", 100, 100);
        this.setButton("提示手动关闭", 100, 200);
        this.setButton("提示滚动关闭", 100, 300);
    };
    GameAlert.prototype.onClick = function (e) {
        var btn = e.currentTarget;
        switch (btn.label) {
            case "提示自动关闭":
                alertAuto("只显示2秒然后自动关闭", 2);
                break;
            case "提示手动关闭":
                alertHand("这是一个需要手动\n关闭的提示框");
                break;
            case "提示滚动关闭":
                alertRoll("恭喜子乐获得了99级神器");
                break;
        }
    };
    return GameAlert;
}(BView));
__reflect(GameAlert.prototype, "GameAlert");
/**游戏残影跟随模版 */
var GameImageFollow = (function (_super) {
    __extends(GameImageFollow, _super);
    function GameImageFollow() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vx = 1;
        _this.vy = 1;
        _this.vs = 5;
        return _this;
    }
    GameImageFollow.prototype.render = function () {
        this.label = "图像残影跟随模版";
        _super.prototype.render.call(this);
        this.colorBottom = 0XFFCCCC;
        this.createCloseBtn();
        this.createView();
        egret.startTick(this.loop, this);
    };
    GameImageFollow.prototype.createView = function () {
        this.image = new moon.ImageFollow("tips_png", 10);
        this.addChild(this.image);
    };
    GameImageFollow.prototype.loop = function (n) {
        this.image.update(this.vx * this.vs, this.vy * this.vs);
        if (this.image.headItem.y > this.stageHeight) {
            this.vy = -1;
        }
        else if (this.image.headItem.y < 0) {
            this.vy = 1;
        }
        if (this.image.headItem.x > this.stageWidth) {
            this.vx = -1;
        }
        else if (this.image.headItem.x < 0) {
            this.vx = 1;
        }
        return true;
    };
    return GameImageFollow;
}(BView));
__reflect(GameImageFollow.prototype, "GameImageFollow");
/**游戏残影跟随模版 */
var GameImageLoop = (function (_super) {
    __extends(GameImageLoop, _super);
    function GameImageLoop() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameImageLoop.prototype.render = function () {
        this.label = "背景图循环播放模版";
        _super.prototype.render.call(this);
        this.colorBottom = 0XFFCCCC;
        this.createCloseBtn();
        this.createView();
        this.setButton("向左移动", 100, 100);
        this.setButton("向右移动", 100, 200);
        this.setButton("向上移动", 100, 300);
        this.setButton("向下移动", 100, 400);
        this.addItem(new moon.Label("控制速度", 0XFFFFFF), 200, 10);
        var s = new moon.SliderBar;
        s.value = 0.5;
        this.addItem(s, 50, 50);
        s.addEvent(moon.MoonEvent.OVER, this.onSlider, this);
        this.slider = s;
    };
    GameImageLoop.prototype.onClick = function (e) {
        var btn = e.currentTarget;
        switch (btn.label) {
            case "向左移动":
                this.layout(moon.Const.HORIZONTAL, -1);
                break;
            case "向右移动":
                this.layout(moon.Const.HORIZONTAL, 1);
                break;
            case "向上移动":
                this.layout(moon.Const.VERTICAL, -1);
                break;
            case "向下移动":
                this.layout(moon.Const.VERTICAL, 1);
                break;
        }
    };
    GameImageLoop.prototype.layout = function (type, interval) {
        if (type === void 0) { type = moon.Const.HORIZONTAL; }
        if (interval === void 0) { interval = -1; }
        this.slider.value = 0.5;
        this.image.stop();
        this.image.speed = 5 * interval;
        this.image.layout(type, interval);
        this.image.play();
    };
    GameImageLoop.prototype.createView = function () {
        this.image = new moon.ImageLoopPlay("loopBg_jpg");
        this.addItem(this.image);
        this.image.play();
    };
    GameImageLoop.prototype.onSlider = function (e) {
        var s = e.currentTarget;
        var vector = this.image.speed / Math.abs(this.image.speed); //取得速度向量
        this.image.speed = vector * (1 + s.value * 10);
    };
    return GameImageLoop;
}(BView));
__reflect(GameImageLoop.prototype, "GameImageLoop");
//# sourceMappingURL=GameTest.js.map