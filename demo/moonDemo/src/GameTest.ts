class Button extends moon.BasicButton {};
/**游戏模版 */
class GameTest extends BView
{
    protected render()
    {
        this.label="游戏模版";
        super.render();
        this.colorBottom=0X999999;
        this.createCloseBtn();
        this.createView();
    }
    protected createView():void
    {
        this.addItem(new moon.BasicGameMain);
    }
}
/**游戏动画模版 */
class GameAnimation extends BView
{
    private body:moon.ImageAnimation;
    protected render()
    {
        this.label="动画模版";
        super.render();
        this.colorBottom=0XCCCCCC;
        this.createCloseBtn();
        this.createView();
    }
    protected createView():void
    {
        //背景为贴图
        var chartlet:moon.ImageChartlet=new moon.ImageChartlet("wallMin_jpg",40);
        //chartlet.layout(moon.Const.VERTICAL);//竖版
        chartlet.setMultiLine(4);//多行版，一行有4个
        this.addItem(chartlet);

        //图像动画
        var animation:moon.ImageAnimation=new moon.ImageAnimation("body",1,13);
        animation.loop=true;
        animation.ftp=6;
        animation.play();
        this.addItem(animation,100,100);
        this.body=animation;

        this.addItem(new moon.Label("控制速度",0XFFFFFF),100,10);
        var s:moon.SliderBar=new moon.SliderBar;
        s.value=0;
        this.addItem(s,50,50);
        s.addEvent(moon.MoonEvent.OVER,this.onSlider,this);
    }
    private onSlider(e:moon.MoonEvent):void
    {
        var s:moon.SliderBar=e.currentTarget as moon.SliderBar;
        this.body.ftp=6+s.value*54;
        this.body.play();
    }
}
/**游戏提示模版 */
class GameAlert extends BView
{
    private body:moon.ImageAnimation;
    protected render()
    {
        this.label="提示模版";
        super.render();
        this.colorBottom=0XFFCCCC;
        this.createCloseBtn();
        this.createView();
    }
    protected createView():void
    {
        this.setButton("提示自动关闭",100,100);
        this.setButton("提示手动关闭",100,200);
        this.setButton("提示滚动关闭",100,300);
    }
    protected onClick(e:egret.TouchEvent):void
    {
        var btn:Button=e.currentTarget as Button;
        switch(btn.label){
            case "提示自动关闭": alertAuto("只显示2秒然后自动关闭",2);      break;
            case "提示手动关闭": alertHand("这是一个需要手动\n关闭的提示框");break;
            case "提示滚动关闭": alertRoll("恭喜子乐获得了99级神器");       break;
        }
    }
}
/**游戏残影跟随模版 */
class GameImageFollow extends BView
{
    private image:moon.ImageFollow;
    protected render()
    {
        this.label="图像残影跟随模版";
        super.render();
        this.colorBottom=0XFFCCCC;
        this.createCloseBtn();
        this.createView();
        egret.startTick(this.loop, this);
    }
    protected createView():void
    {
        this.image=new moon.ImageFollow("tips_png",10);
        this.addChild(this.image);
	}
    private vx:number=1;
    private vy:number=1;
    private vs:number=5
    protected loop(n:number):boolean
    {
         this.image.update(this.vx*this.vs,this.vy*this.vs);
        if(this.image.headItem.y>this.stageHeight){
           this.vy=-1;
        }else if(this.image.headItem.y<0){
            this.vy=1;
        }
         if(this.image.headItem.x>this.stageWidth){
           this.vx=-1;
        }else if(this.image.headItem.x<0){
            this.vx=1;
        }
        return true;
    }
}
/**游戏残影跟随模版 */
class GameImageLoop extends BView
{
    private image:moon.ImageLoopPlay;
    private slider:moon.SliderBar;
    protected render()
    {
        this.label="背景图循环播放模版";
        super.render();
        this.colorBottom=0XFFCCCC;
        this.createCloseBtn();
        this.createView();

        this.setButton("向左移动",100,100);
        this.setButton("向右移动",100,200);
        this.setButton("向上移动",100,300);
        this.setButton("向下移动",100,400);

        this.addItem(new moon.Label("控制速度",0XFFFFFF),200,10);
        var s:moon.SliderBar=new moon.SliderBar;
        s.value=0.5;
        this.addItem(s,50,50);
        s.addEvent(moon.MoonEvent.OVER,this.onSlider,this);
        this.slider=s;
    }
    protected onClick(e:egret.TouchEvent):void
    {
        var btn:Button=e.currentTarget as Button;
        switch(btn.label){
            case "向左移动": this.layout(moon.Const.HORIZONTAL,-1);     break;
            case "向右移动": this.layout(moon.Const.HORIZONTAL,1);      break;
            case "向上移动": this.layout(moon.Const.VERTICAL,-1);       break;
            case "向下移动": this.layout(moon.Const.VERTICAL,1);        break;
        }
    }
    protected layout(type:string=moon.Const.HORIZONTAL,interval:number=-1):void
	{
        this.slider.value=0.5;
        this.image.stop();
        this.image.speed=5*interval;
        this.image.layout(type,interval);
        this.image.play();
    }
    protected createView():void
    {
        this.image=new moon.ImageLoopPlay("loopBg_jpg");
        this.addItem(this.image);
        this.image.play();
	}
    private onSlider(e:moon.MoonEvent):void
    {
        var s:moon.SliderBar=e.currentTarget as moon.SliderBar;
        var vector:number=this.image.speed/Math.abs(this.image.speed);//取得速度向量
        this.image.speed=vector*(1+s.value*10);
    }
}