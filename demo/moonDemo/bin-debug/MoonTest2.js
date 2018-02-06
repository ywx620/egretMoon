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
        _super.prototype.render.call(this);
        this.createBackground(0XFFCC00);
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
        _super.prototype.render.call(this);
        this.createBackground(0XFFCC00);
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
//# sourceMappingURL=MoonTest2.js.map