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
        this.addItem(new moon.BasicGamePanel);
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
        this.colorBottom = 0X999999;
        this.createCloseBtn();
        this.createView();
    };
    GameAnimation.prototype.createView = function () {
        var animation = new moon.ImageAnimation("body", 1, 13);
        animation.loop = true;
        //animation.ftp=12;
        animation.play();
        this.addItem(animation, 100, 100);
    };
    return GameAnimation;
}(BView));
__reflect(GameAnimation.prototype, "GameAnimation");
//# sourceMappingURL=GameTest.js.map