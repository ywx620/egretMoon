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
        return _super !== null && _super.apply(this, arguments) || this;
    }
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
    return BView;
}(moon.BasicView));
__reflect(BView.prototype, "BView");
//# sourceMappingURL=BView.js.map