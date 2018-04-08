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
        this.addItem(new moon.BasicGamePanel);
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
        var animation:moon.ImageAnimation=new moon.ImageAnimation("body",1,13);
        animation.loop=true;
        animation.ftp=6;
        animation.play();
        this.addItem(animation,100,100);
        this.body=animation;

        this.addItem(new moon.Label("控制速度",0),100,10);
        var s:moon.SliderBar=new moon.SliderBar;
        s.value=0;
        this.addItem(s,50,50);
        s.addEvent(moon.MoonEvent.OVER,this.onSlider,this);
    }
    private onSlider(e:moon.MoonEvent):void
    {
        var s:moon.SliderBar=e.currentTarget as moon.SliderBar;
        this.body.ftp=6+s.value*53;
        this.body.play();
    }
}