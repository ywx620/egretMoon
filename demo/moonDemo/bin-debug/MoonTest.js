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
var MoonTest = (function (_super) {
    __extends(MoonTest, _super);
    function MoonTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoonTest.prototype.init = function () {
        this.panelMore = new moon.PanelMoreManager();
        var names = [];
        names.push("moon组件一，基本按钮展示");
        names.push("moon组件二，进度条与滑动器展示");
        names.push("moon组件三，TIPS展示");
        names.push("moon组件四， MoonDisplay展示");
        names.push("moon组件五， Tabbar展示");
        for (var i = 0; i < names.length; i++) {
            var panel = new moon.PanelBar();
            panel.label = names[i];
            panel.addEvent(moon.MoonEvent.RENDER_COMPLETE, this.onAddStage.bind(this));
            //panel.addItem(moon.MoonUI.getCircle(200,moon.Color.random,Math.random()*200,Math.random()*200))
            this.panelMore.addItem(panel);
        }
        this.panelMore.addEvent(moon.MoonEvent.START, this.start, this);
        this.panelMore.addEvent(moon.MoonEvent.OVER, this.over, this);
        this.addChild(this.panelMore);
        this.showButton(0);
        this.showProgresBar(1);
        this.showTipsBar(2);
        this.showMoonDisplay(3);
        this.showTabbar(4);
        //this.panelMore.once(egret.Event.ADDED_TO_STAGE,this.addToStageMore,this);
        this.createCloseBtn();
    };
    MoonTest.prototype.createCloseBtn = function () {
        var btn = new moon.BasicButton();
        btn.label = "关闭";
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    };
    MoonTest.prototype.close = function (e) {
        this.dispEvent(moon.MoonEvent.CLOSE);
        this.removeFromParent(true);
    };
    MoonTest.prototype.addToStageMore = function (e) {
        this.panelMore.close();
    };
    MoonTest.prototype.start = function (e) {
        //traceSimple("翻页开始");
    };
    MoonTest.prototype.over = function (e) {
        //traceSimple("翻页结束");
    };
    MoonTest.prototype.onAddStage = function (e) {
        var panel = e.currentTarget;
        panel.colorBottom = 0XFCDF7C;
    };
    //------屏幕1-----
    MoonTest.prototype.showButton = function (index) {
        var panel = this.panelMore.getItem(index);
        //-----------
        var btn1 = new moon.BasicButton();
        btn1.label = "默认皮肤按钮";
        panel.addItem(btn1, 10, 10);
        //-----------
        var normal = moon.Skin.randomRect;
        var down = moon.Skin.randomRect;
        var btn1 = new moon.BasicButton(normal, down);
        btn1.label = "随机颜色皮肤按钮";
        panel.addItem(btn1, 10, 90);
        //-----------
        var normal = moon.Skin.randomCircle;
        var down = moon.Skin.randomCircle;
        var btn1 = new moon.BasicButton(normal, down);
        btn1.labelCircle = "圆按钮";
        panel.addItem(btn1, 100, 220);
        //-----------
        var normal3 = new moon.Scale9Image("btn1_png");
        var down3 = new moon.Scale9Image("btn2_png");
        var btn1 = new moon.BasicButton(normal3, down3);
        btn1.label = "外部加载的皮肤";
        panel.addItem(btn1, 300, 100);
        //---------
        var normal3 = new moon.Scale9Image("btn1_png");
        var down3 = new moon.Scale9Image("btn2_png");
        normal3.width = down3.width = 280;
        normal3.height = down3.height = 100;
        var btn1 = new moon.BasicButton(normal3, down3);
        btn1.skinAutoScale = false; //不自动改变大小
        btn1.label = "外部加载的皮肤";
        panel.addItem(btn1, 300, 200);
        //-----------
        var normal = moon.Skin.switchOn;
        var down = moon.Skin.switchOn;
        var normal2 = moon.Skin.switchOff;
        var down2 = moon.Skin.switchOff;
        var btn4 = new moon.MoreSkinButton([normal, down, normal2, down2]);
        btn4.toggleSwitch = true;
        panel.addItem(new moon.Label("toggleSwitch按钮", 0), 10, 300);
        panel.addItem(btn4, 10, 340);
        //-----------
        var items = ["我帅", "我很帅", "我双酷双帅", "我帅得惊动上帝"];
        var radioButton = new moon.RadioButtonBar;
        for (var i = 0; i < items.length; i++) {
            radioButton.addItemLabel(items[i]);
        }
        radioButton.layout();
        panel.addItem(new moon.Label("单选框按钮", 0), 10, 500);
        panel.addItem(radioButton, 10, 540);
        radioButton.addEvent(moon.MoonEvent.CHANGE, onHandlerRadion.bind(this));
        function onHandlerRadion(e) {
            moon.TipsManager.getIns().simpleTips("选择了" + radioButton.selectIndex, new Point(150, 550));
        }
        //-------------------
        var items = ["A", "B", "C", "D"];
        var radioButton_1 = new moon.RadioButtonBar;
        for (var i = 0; i < items.length; i++) {
            radioButton_1.addItemLabel(items[i]);
        }
        radioButton_1.layout(moon.Const.HORIZONTAL, 10);
        panel.addItem(new moon.Label("单选框按钮横排版", 0), 10, 800);
        panel.addItem(radioButton_1, 10, 840);
        //-----------
        var items = ["我帅", "我很帅", "我双酷双帅", "我帅得惊动上帝"];
        var checkBox = new moon.CheckBoxBar;
        var len = items.length;
        for (var i = 0; i < len; i++) {
            checkBox.addItemLabel(items[i]);
        }
        checkBox.layout();
        panel.addItem(new moon.Label("复选框按钮", 0), 300, 500);
        panel.addItem(checkBox, 300, 540);
        checkBox.addEvent(moon.MoonEvent.CHANGE, onHandlerCheckBox, this);
        function onHandlerCheckBox(e) {
            moon.TipsManager.getIns().simpleTips("选择了" + checkBox.selectIndexs, new Point(300, 550));
        }
    };
    //------屏幕2-----
    MoonTest.prototype.showProgresBar = function (index) {
        var panel = this.panelMore.getItem(index);
        //------默认皮肤-----
        var progressBar = new moon.ProgressBar();
        progressBar.value = 0.5;
        panel.addItem(progressBar, 50, 300);
        var v = Math.round(progressBar.value * 100) + "%";
        progressBar.showText(v, -1, -40);
        //------随机颜色皮肤-----
        var width = 400;
        var height = 30;
        var skinOut = moon.MoonUI.getRect(width, height, moon.Color.random);
        var skinIn = moon.MoonUI.getRect(width, height, moon.Color.random);
        var progressBar = new moon.ProgressBar(skinOut, skinIn);
        panel.addItem(progressBar, 100, 50);
        progressBar.value = 0.8;
        var v = Math.round(progressBar.value * 100) + "%";
        progressBar.showText(v);
        //----------------------
        var sliderBar = new moon.SliderBar();
        panel.addItem(sliderBar, 300, 500);
        sliderBar.value = 0.2;
        sliderBar.addEvent(moon.MoonEvent.START, onStartOver, this);
        sliderBar.addEvent(moon.MoonEvent.MOVE, onStartOver, this);
        sliderBar.addEvent(moon.MoonEvent.OVER, onStartOver, this);
        var sliderBar = new moon.SliderBar();
        panel.addItem(sliderBar, 50, 650);
        sliderBar.layout(moon.Const.VERTICAL);
        sliderBar.value = 0.2;
        function onStartOver(e) {
            if (e.type == moon.MoonEvent.START) {
                this.panelMore.close();
            }
            else if (e.type == moon.MoonEvent.MOVE) {
            }
            else {
                this.panelMore.open();
            }
        }
    };
    //------屏幕3-----
    MoonTest.prototype.showTipsBar = function (index) {
        var panel = this.panelMore.getItem(index);
        var xNum = 2;
        var disX = 400;
        var disY = 500;
        panel.addItem(new moon.Label("单击按钮显示TIPS，TIPS显示始终都在屏幕内", 0), 10, 100);
        for (var i = 0; i < 6; i++) {
            var btn = new moon.BasicButton();
            btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, onTouch, this);
            btn.label = "单击显示TIPS" + i;
            var x = Math.floor(i % xNum) * disX;
            var y = Math.floor(i / xNum) * disY;
            panel.addItem(btn, x, y);
        }
        function onTouch(e) {
            var btn = e.currentTarget;
            moon.TipsManager.getIns().simpleTips(btn.label, new Point(e.stageX, e.stageY));
        }
    };
    //------屏幕4-----
    MoonTest.prototype.showMoonDisplay = function (index) {
        var panel = this.panelMore.getItem(index);
        //方形
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_RECT;
        rect.data = { w: 100, h: 100, c: moon.Color.random };
        panel.addItem(rect, 100, 100);
        //圆角方形
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_RECT_ROUND;
        rect.data = { w: 100, h: 100, c: moon.Color.random, ew: 50, eh: 50 };
        panel.addItem(rect, 100, 300);
        //圆形
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_CIRCLE;
        rect.data = { r: 50, c: moon.Color.random };
        panel.addItem(rect, 100, 600);
        //有边框的方形
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_RECT;
        rect.data = { w: 100, h: 100, c: moon.Color.random };
        panel.addItem(rect, 300, 100);
        rect.setBackground(moon.Color.random, 10);
        //有边框圆角方形
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_RECT_ROUND;
        rect.data = { w: 100, h: 100, c: moon.Color.random, ew: 50, eh: 50 };
        panel.addItem(rect, 300, 300);
        rect.setBackground(moon.Color.random, 10);
        //有边框圆形
        var rect = new moon.MoonDisplayObject;
        rect.type = moon.Const.SHAPE_CIRCLE;
        rect.data = { r: 50, c: moon.Color.random };
        panel.addItem(rect, 300, 600);
        rect.setBackground(moon.Color.random, 10);
        // var rect=new moon.MoonDisplayObject;
        // rect.type=moon.Const.SHAPE_RECT_ROUND
        // rect.data={w:100,h:100,c:moon.Color.random,ew:20,eh:20}
        // panel.addItem(rect,300,100);
        //rect.setBackground(moon.Color.random,10);
        //rect.color=0XFF0000;
    };
    //------屏幕5-----
    MoonTest.prototype.showTabbar = function (index) {
        var panel = this.panelMore.getItem(index);
        var names = ["标题1", "标题2", "标题3", "标题4", "标题5"];
        var tabbar = new moon.TabbarBar;
        panel.addItem(tabbar, 100, 100);
        for (var i = 0; i < names.length; i++) {
            var skins = [moon.Skin.buttonNormal, moon.Skin.buttonDown, moon.Skin.buttonDown, moon.Skin.buttonDown];
            var btn = new moon.MoreSkinButton(skins);
            btn.label = names[i];
            tabbar.addItem(btn);
        }
        tabbar.selectIndex = 0;
        tabbar.layout(moon.Const.HORIZONTAL, 10);
        var names = ["标题一", "标题二", "标题三", "标题四", "标题五"];
        var tabbar = new moon.TabbarBar;
        panel.addItem(tabbar, 100, 300);
        for (var i = 0; i < names.length; i++) {
            var skins = [moon.Skin.buttonNormal, moon.Skin.buttonDown, moon.Skin.buttonDown, moon.Skin.buttonDown];
            var btn = new moon.MoreSkinButton(skins);
            btn.label = names[i];
            tabbar.addItem(btn);
        }
        tabbar.layout(moon.Const.VERTICAL, 10);
    };
    return MoonTest;
}(moon.MoonContainer));
__reflect(MoonTest.prototype, "MoonTest");
//# sourceMappingURL=MoonTest.js.map