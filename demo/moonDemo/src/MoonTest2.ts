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
        this.createTextBySprite("2048",node,100);

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
    protected canvas:Sprite;
    protected posStart:egret.Point;
    protected posMove:egret.Point;
    protected canvasY:number=300;
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
        tabbar.layout(moon.Const.HORIZONTAL,90);
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
    private createCanvas():void
    {
        var canvasBg:Sprite=this.createRect(this.stage.stageWidth,this.stage.stageHeight-this.canvasY,moon.Color.white);
        canvasBg.y=this.canvasY;
        this.addChild(canvasBg);

        var maskRect:Sprite=this.createRect(this.stage.stageWidth,this.stage.stageHeight-this.canvasY,moon.Color.white);
        maskRect.y=this.canvasY;
        this.canvas=this.createRect(this.stage.stageWidth,this.stage.stageHeight,moon.Color.white);
        this.addChild(this.canvas);
        this.canvas.mask=maskRect;

        
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