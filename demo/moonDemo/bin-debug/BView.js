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
var BView = (function (_super) {
    __extends(BView, _super);
    function BView() {
        return _super.call(this, 0, 0) || this;
    }
    BView.prototype.render = function () {
        _super.prototype.render.call(this);
        this.canvasY = this.topHeight;
    };
    BView.prototype.setButton = function (label, x, y) {
        var btn = new Button();
        btn.label = label;
        this.addItem(btn, x, y);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
    };
    BView.prototype.onClick = function (e) {
    };
    BView.prototype.createCloseBtn = function () {
        var btn = new moon.BasicButton();
        btn.label = "关闭";
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    BView.prototype.close = function (e) {
        this.dispEvent(moon.MoonEvent.CLOSE);
        this.removeFromParent(true);
    };
    BView.prototype.createCanvas = function () {
        var canvasBg = this.createRect(this.stage.stageWidth, this.stage.stageHeight - this.canvasY, moon.Color.white);
        canvasBg.y = this.canvasY;
        this.addChild(canvasBg);
        var maskRect = this.createRect(this.stage.stageWidth, this.stage.stageHeight - this.canvasY, moon.Color.white);
        maskRect.y = this.canvasY;
        this.canvas = this.createRect(this.stage.stageWidth, this.stage.stageHeight, moon.Color.white);
        this.addChild(this.canvas);
        this.canvas.mask = maskRect;
    };
    BView.prototype.createAlert = function (value) {
        var alert = new moon.AlertBar(value);
        alert.addEvent(moon.MoonEvent.CLOSE, this.closeAlert, this);
        this.addChild(alert);
    };
    BView.prototype.closeAlert = function (e) {
    };
    BView.prototype.createTitle = function (title, y, x) {
        if (y === void 0) { y = 0; }
        if (x === void 0) { x = 0; }
        this.addItem(new moon.Label(title, 0), x, y);
    };
    BView.prototype.getRandomArray = function (array) {
        var value = [];
        var copy = array.concat();
        while (copy.length > 0) {
            var index = Math.floor(Math.random() * copy.length);
            value.push(copy.splice(index, 1)[0]);
        }
        return value;
    };
    return BView;
}(moon.PanelBar));
__reflect(BView.prototype, "BView");
//# sourceMappingURL=BView.js.map