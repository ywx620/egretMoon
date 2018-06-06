class TestProgress extends BView
{
    private progressBar:moon.ProgressBar;
    protected render():void
    {
        
        this.label="测试Progress";
        super.render();
        this.colorBottom=0X333333;
        this.createCloseBtn();

        this.progressBar=new moon.ProgressBar();
        this.addChild(this.progressBar);
        this.progressBar.x=this.progressBar.y=100;
        egret.startTick(this.loop,this);

    }
    protected loop():boolean{
        this.progressBar.value+=0.002;
        this.progressBar.value=this.progressBar.value>=1?0:this.progressBar.value;
        var v:string=Math.round(this.progressBar.value*100)+"%";
        this.progressBar.showText(v);
        return false
    }
    public displose():void
    {
        egret.stopTick(this.loop,this);
        super.dispose();
    }
}
class TestScrollBar extends BView
{
    private progressBar:moon.ProgressBar;
    protected render():void
    {
        
        
        this.label="测试ScrollBar";
        super.render();
        this.colorBottom=0X444444;
        this.createCloseBtn();

        var scrollBar:moon.ScrollBar=new moon.ScrollBar();
        var bitmap:moon.Scale9Image=new moon.Scale9Image("bg_jpg");
        scrollBar.target=bitmap;
        scrollBar.setSize(400,400);
		scrollBar.layout(moon.Const.VERTICAL);
        this.addChild(scrollBar);
        scrollBar.x=scrollBar.y=100;

        var scrollBar:moon.ScrollBar=new moon.ScrollBar();
        var bitmap:moon.Scale9Image=new moon.Scale9Image("bg_jpg");
        scrollBar.target=bitmap;
        scrollBar.setSize(400,400);
        scrollBar.layout(moon.Const.HORIZONTAL);
        this.addChild(scrollBar);
        scrollBar.x=100;
        scrollBar.y=550;
    }
}

class G2048 extends BView
{
    protected render():void
    {
        this.label="测试2048界面";
        super.render();
        this.colorBottom=0XFFF8EE;
        this.createCloseBtn();
        
        var w:number=this.stageWidth-20;
        var dis:number=(this.stageWidth-w)>>1;
        var bgy:number=(this.stageHeight-w)-dis;
        var node:Sprite=this.createRoundRect(0XBDAB9D,w,w);
        node.x=dis;
        node.y=bgy;

        w=200;
        node=this.createRoundRect(0XECC400,w,w);
        node.x=dis
        node.y=(this.stageHeight-w)-w*3.3;
        this.createTextBySprite("2048",node,90);

        w=150;
        var y:number=node.y;
        node=this.createRoundRect(0XBCAC9F,w+40,w);
        node.x=240;
        node.y=y;
        this.createTextBySprite("当前分:99",node,30);

        node=this.createRoundRect(0XBCAC9F,w+40,w);
        node.x=440;
        node.y=y;
        this.createTextBySprite("最高分:999",node,30);

        var colors:any[]=[0XEFE5DB,0XEDE1CB,0XF0B37D,0XEB8E53,0XEF8168,0XF75431,0XF6D76D];
        var values:any[]=[2,4,8,16,32,64,128];
        w=(this.stageWidth-60)/4;
        var nodes:any[]=[];
        for(var i:number=0;i<16;i++){
            var index:number=Math.floor(Math.random()*colors.length);
            var c:number=colors[index];
            node=this.createRoundRect(c,w,w);
            nodes.push(node);
            this.createTextBySprite(values[index],node);
        }
        moon.SimpleLayout.displayRank(nodes,4,5,5,20,bgy+10);
    }
    protected createRoundRect(c:number,w:number,h:number):Sprite
    {
        var node:Sprite=moon.MoonUI.getRoundRect(w,h,c,10,10);
        this.addChild(node);
        return node;
    }
    protected createTextBySprite(value:string,node:Sprite,size:number=80):void
    {
        var label:moon.Label=new moon.Label(value);
        var text:TextField=label.textField;
        text.size=size;
        text.x=(node.width-text.width)>>1;
        text.y=(node.height-text.height)>>1;
        
        node.addChild(text);
    }
}
class Draw extends BView
{
    protected posStart:egret.Point;
    protected posMove:egret.Point;
    protected prevColor:number=0;
    protected color:number=0;
    protected size:number=1;
    protected select:Sprite;
    protected render():void
    {
        
        this.label="测试画图";
        super.render();
        this.colorBottom=0X333333;
        this.createCloseBtn();
        this.canvasY=300;
        this.createColors();
        this.createCanvas();
        this.createButtons();
        this.createSliderBar();
       
        this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        
    }
    protected createButtons():void
    {
        var names:any[]=["铅笔","橡皮","清空"];
        var tabbar:moon.TabbarBar=new moon.TabbarBar;
        this.addChild(tabbar);tabbar.x=380;tabbar.y=220;
        for(var i:number=0;i<names.length;i++){
            var skins:any[]=[moon.Skin.buttonNormal,moon.Skin.buttonDown,moon.Skin.buttonDown,moon.Skin.buttonDown]
            var btn:moon.MoreSkinButton=new moon.MoreSkinButton(skins);
            btn.label=names[i];
            tabbar.addItem(btn);
        }
        tabbar.layout(moon.Const.HORIZONTAL);
        tabbar.selectIndex=0;
        tabbar.addEvent(moon.MoonEvent.CHANGE,this.change,this)
    }
    protected change(e:moon.MoonEvent):void
    {
        var tabbar:moon.TabbarBar=e.currentTarget as moon.TabbarBar;
        switch(tabbar.selectIndex){
            case 0: this.color=this.prevColor;     break;
            case 1: this.color=moon.Color.white;   break;
            case 2: 
                this.canvas.graphics.clear();
                this.color=this.prevColor;
                tabbar.selectIndex=0;
                break;
        }
    }
    protected createSliderBar():void
    {
        var sliderBar:moon.SliderBar=new moon.SliderBar();
        sliderBar.value=0;
        this.addChild(sliderBar);sliderBar.x=40;sliderBar.y=250;
        sliderBar.addEvent(moon.MoonEvent.MOVE,this.changeSize,this);
    }
    protected changeSize(e:moon.MoonEvent):void
    {
        var sliderBar:moon.SliderBar=e.currentTarget as moon.SliderBar;
        this.size=sliderBar.value*99+1;
    }
    protected createColors():void
    {
        var total:number=20;
        var rects:any[]=[];
        var w:number=40;
        for(var i:number=0;i<total;i++){
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_RECT_ROUND;
            rect.data={w:w,h:w,c:moon.Color.random,ew:10,eh:10};
            rect.setBackground(0,5);
            this.addChild(rect);
            rect.touchEnabled=true;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onColor,this)
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects,10,5,5,20,80);

        this.select=this.createCircle(5,moon.Color.white)
        this.addChild(this.select);
        this.selectColor(rects[0]);
    }
    private onColor(e:egret.TouchEvent):void
    {
        var rect:moon.MoonDisplayObject=e.currentTarget as moon.MoonDisplayObject;
        this.selectColor(rect);
    }
    private selectColor(rect:moon.MoonDisplayObject):void
    {
        this.color=rect.color;
        this.prevColor=rect.color;
        this.select.x=rect.x+10;
        this.select.y=rect.y+10;
    }

    protected onTouch(e: egret.TouchEvent){
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                this.posStart=new egret.Point(e.stageX,e.stageY);
                this.controlStart();
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                this.posMove=new egret.Point(e.stageX,e.stageY);
                this.controlMove();
                break;
            case egret.TouchEvent.TOUCH_END:
                this.controlEnd();
                break;
        }
    }
    /** 手指按下*/
    protected controlStart(): void {
        this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);

        this.canvas.graphics.lineStyle(this.size,this.color);
        this.canvas.graphics.moveTo(this.posStart.x,this.posStart.y);
        this.canvas.graphics.lineTo(this.posStart.x,this.posStart.y);
    }
    /** 手指移动*/
    protected controlMove(): void {
        this.canvas.graphics.lineTo(this.posMove.x,this.posMove.y);
    }
    /** 手指离开*/
    protected controlEnd(): void {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
    }
    public dispose():void
    {
        this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
        super.dispose();
    }
}
class GameSelectColor extends BView
{
    protected select:number=0;
    protected total:number=4;
    protected level:number=2;
    protected value:number=100;
    protected render():void
    {
        this.label="选色游戏";
        super.render();
        this.colorBottom=0X333333;
        this.createCloseBtn();
        this.createLevel();
    }
    protected createColors():void
    {
        var total:number=this.total;
        var rects:any[]=[];
        var half:number=Math.sqrt(total);
        var w:number=(this.stageWidth-100)/half;
        var c:number=moon.Color.random;
        var j:number=Math.floor(Math.random()*total);
        var c2:number=moon.Color.lightenDarkenColor(c,this.value)
        for(var i:number=0;i<total;i++){
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_RECT_ROUND;
            rect.data={w:w,h:w,c:i==j?c2:c,ew:10,eh:10};
            rect.setBackground(0,1);
            this.addItem(rect);
            rect.touchEnabled=true;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onColor,this);
            rect.name=""+i;
            rects.push(rect);
        }
        
        var x=(this.stageWidth-((w+5)*half))>>1;
        moon.SimpleLayout.displayRank(rects,half,5,5,x,200);
        this.select=j;
    }
    private onColor(e:egret.TouchEvent):void
    {
        var rect:moon.MoonDisplayObject=e.currentTarget as moon.MoonDisplayObject;
        if(rect.name==this.select.toString()){
            this.createLevel()
        }
    }
    private createLevel():void
    {
        this.total=this.level*this.level;
        this.value-=2;
        this.reset();
        while(this.hasItem(this.index)){
            var rect:DisplayObject=this.getItem(this.index)
            rect.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onColor,this);
            this.removeItem(rect);
        }
        this.createColors();
        this.level++;
        if(this.level>7) this.level=7;
    }
}
class DonotTouchWhiteRect extends BView
{
    protected select:number=0;
    protected level:number=2;
    protected value:number=100;
    protected rects:any[]=[];
    protected rectHeight:number;
    protected isMove:Boolean;
    protected render():void
    {
        this.label="别踩白块";
        super.render();
        this.colorBottom=0X333333;
        this.createCloseBtn();
        this.createCanvas();
        this.createLevel();
    }
    protected play():void
    {
        egret.startTick(this.loop, this);
    }
    protected stop():void
    {
        egret.stopTick(this.loop, this);
    }
    private createLevel():void
    {
        var total:number=6;
        for(var i:number=0;i<total;i++){
            var node:Sprite=this.createSprite();
            this.canvas.addChild(node);
            this.rects.push(node);
        }
        var y=this.stageHeight-total*this.rectHeight;
        moon.SimpleLayout.displayRank(this.rects,1,0,0,0,y);
    }
    private createSprite():Sprite
    {
        var total:number=4;
        var node:Sprite=new Sprite;
        var w:number=this.stageWidth/total;
        var h:number=w*1.5;
        var j:number=Math.floor(Math.random()*total);
        var c1:number=moon.Color.white;
        var c2:number=moon.Color.black;
        this.rectHeight=h;
        for(var i:number=0;i<total;i++){
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_RECT;
            rect.data={w:w,h:h,c:i==j?c2:c1};
            rect.setBackground(moon.Color.gray,1);
            rect.name=i==j?"1":"0";
            rect.touchEnabled=true;
            rect.x=i*w;
            rect.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onClick,this);
            node.addChild(rect);
        }
        return node;
    }
    protected onClick(e:egret.TouchEvent):void
    {
        var r:moon.MoonDisplayObject=e.currentTarget as moon.MoonDisplayObject;
        if(r.name=="1"){
            this.play();
            var total:number=this.rects.length;
            for(var i:number=0;i<total;i++){
                var rect:Sprite=this.rects[i];
                var h:number=rect.y+this.rectHeight;
            }
        }else{//游戏结束
            this.createAlert("   游戏结束\n点击确定可继续");
        }
    }
    protected loop(n:number):boolean
    {
        var total:number=this.rects.length;
        for(var i:number=0;i<total;i++){
            var rect:Sprite=this.rects[i];
            rect.y+=20;
            if(rect.y>=this.stageHeight){
                this.stop();
                this.randomSeat(rect);
                var h:number=this.rects[0].y-this.rectHeight;
                rect.y=h;
                this.rects.pop();
                this.rects.unshift(rect);
            }
        }
        return true;
    }
    protected randomSeat(rect:Sprite):void
    {
        var rects:any[]=[];
        for(var i:number=0;i<4;i++){
            rects.push(rect.getChildAt(i));
        }
        rects=this.getRandomArray(rects);
        moon.SimpleLayout.displayRank(rects,4);
    }
    public dispose():void
    {
        super.dispose();
        this.stop();
    }
}
class DestoryStar extends BView
{
    protected select:number=0;
    protected value:number=100;
    protected render():void
    {
        this.label="消灭星星界面";
        super.render();
        this.colorBottom=0X333333;
        this.createCloseBtn();
        this.createLevel();
    }
    private createLevel():void
    {
        var total:number=104;
        var rects:any[]=[];
        var half:number=8;
        var w:number=(this.stageWidth-16)/half;
        var c:number;
        var colors:number[]=moon.Color.getRandomArray(3);
        for(var i:number=0;i<total;i++){
            c=colors[Math.floor(Math.random()*colors.length)];
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_RECT;
            rect.data={w:w,h:w,c:c,ew:10,eh:10};
            rect.setBackground(0,1);
            this.addItem(rect);
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects,half,0,0);
    }
}
class GameBackpack extends BView
{
    protected render():void
    {
        this.label="游戏背包";
        super.render();
        this.colorBottom=0X333333;
        this.createCloseBtn();
        this.createBackpack();
    }
    protected createBackpack():void
    {
        var names:any[]=["装备","材料","消耗品","时装"];
        var tabbar:moon.TabbarBar=new moon.TabbarBar;
        this.addItem(tabbar,60,100);
        for(var i:number=0;i<names.length;i++){
            var skins:any[]=this.getSkins()
            var btn:moon.MoreSkinButton=new moon.MoreSkinButton(skins);
            btn.labelColor=0X502200;
            btn.skinAutoScale=false;
            btn.label=names[i];
            tabbar.addItem(btn);
        }
        tabbar.selectIndex=0;
        tabbar.layout(moon.Const.HORIZONTAL,1);

        var w:number=this.stageWidth-100;
        var h:number=this.stageHeight-300;
        var c:number=0XE4C0A4;
        var bc:number=0XC99769;
        var rect=new moon.MoonDisplayObject;
        rect.type=moon.Const.SHAPE_RECT_ROUND;
        rect.data={w:w,h:h,c:c,ew:20,eh:20};
        rect.setBackground(bc,3);
        this.addItem(rect,50,150);

        var rects:any[]=[];
        w=90
        for(i=0;i<35;i++){
            var c:number=0XCC9D79;
            var bc:number=0XC99769;    
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_RECT_ROUND;
            rect.data={w:w,h:w,c:c,ew:15,eh:15};
            rect.setBackground(bc,5);
            this.addItem(rect);
            rects.push(rect);
        }
        moon.SimpleLayout.displayRank(rects,5,5,5,63,170);

        var names:any[]=["1","2","3","4"];
        var tabbar:moon.TabbarBar=new moon.TabbarBar;
        this.addItem(tabbar,80,920);
        for(var i:number=0;i<names.length;i++){
            var skins:any[]=this.getCircleSkins();
            var btn:moon.MoreSkinButton=new moon.MoreSkinButton(skins);
            btn.labelColor=0X502200;
            btn.skinAutoScale=false;
            btn.label=names[i];
            tabbar.addItem(btn);
        }
        tabbar.selectIndex=0;
        tabbar.layout(moon.Const.HORIZONTAL,1);
    }
    protected getSkins():any[]
    {
        var values:any[]=[];
        var c1:number=0XD79565;
        var c2:number=0XFFC64E;
        var bc:number=0X502200;
        for(var i:number=0;i<4;i++){
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_RECT_ROUND;
            rect.data={w:120,h:60,c:i==0?c1:c2,ew:10,eh:10};
            rect.setBackground(bc,3);
            values.push(rect);
        }
        return values;
    }
    protected getCircleSkins():any[]
    {
        var values:any[]=[];
        var c1:number=0XD79565;
        var c2:number=0XFFC64E;
        var bc:number=0X502200;
        for(var i:number=0;i<4;i++){
            var rect=new moon.MoonDisplayObject;
            rect.type=moon.Const.SHAPE_CIRCLE;
            rect.data={r:20,c:i==0?c1:c2};
            rect.anchorOffsetX=rect.anchorOffsetY=-25;
            rect.setBackground(bc,3);
            values.push(rect);
        }
        return values;
    }
}
class TextInput extends BView
{
    protected render():void
    {
        this.label="输入框测试";
        super.render();
        this.colorBottom=0X99FF99;
        this.createCloseBtn();
        this.createView();
    }
    protected createView():void
    {
        this.createTitle("单行自由输入",5);
        var input:moon.InputBar=new moon.InputBar(this.stageWidth,50);
        this.addChild(input);
        input.y=100;

        this.createTitle("单行只能输入十个字",105);
        input=new moon.InputBar(this.stageWidth,50);
        this.addChild(input);
        input.maxChars=10;
        input.y=200;

        this.createTitle("单行只能输入数字与字母",205);
        input=new moon.InputBar(this.stageWidth,50);
        this.addChild(input);
        input.y=300;
        input.color=0X333333;
        input.restrict="a-zA-Z0-9";

        this.createTitle("多行自由输入",305);
        var input:moon.InputBar=new moon.InputBar(this.stageWidth,300);
        this.addChild(input);
        input.setMultiline();
        input.y=400;
    }
}
/**城市背景地图 */
class HouseMapTest extends BView
{
    protected render()
    {
        this.label="城市背景地图";
        super.render();
        this.colorBottom=0X999999;
        this.createCloseBtn();
        this.createView();
    }
    protected createView():void
    {
        var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageWidth,this.stageHeight);
        var home:egret.Rectangle=new egret.Rectangle(10,200,20,200);
        var map:MapHorizontalHouse=new MapHorizontalHouse(rect,home,0);
        this.addChild(map);

        var rect:egret.Rectangle=new egret.Rectangle(0,0,this.stageWidth,this.stageHeight);
        var home:egret.Rectangle=new egret.Rectangle(10,100,40,100);
        var map:MapHorizontalHouse=new MapHorizontalHouse(rect,home);
        this.addChild(map);
    }
}
/**城市背景地图 */
class MapHorizontalHouse extends moon.MoonContainer
{
    private rect:Rectangle;
    private house:Rectangle;
    private color:number
    public constructor(rect:Rectangle,house:Rectangle,color:number=-1)
    {
        super();
        this.rect=rect;
        this.house=house;
        this.color=color;
    }
    protected render():void
    {
        var house:Rectangle=this.house;
        var bg:Sprite=moon.MoonUI.getRect(this.rect.width,this.rect.height);
        bg.alpha=0.1;
        this.addChild(bg);

        var count:number=this.rect.width/house.width;
        var prevx:number=0;
        for(var i:number=0;i<count;i++){
            var color=this.color==-1?Math.random()*0XFFFFFF:this.color;
            var width:number=house.width+Math.random()*house.x;
            var height:number=house.height+Math.random()*house.y;
            var rect=moon.MoonUI.getRect(width,height,color);
            this.addChild(rect);
            rect.y=this.rect.height-rect.height;
            rect.x=prevx;
            prevx=rect.x+rect.width;
        }
    }
}