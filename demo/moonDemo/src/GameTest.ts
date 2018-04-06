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
     protected render()
    {
        this.label="动画模版";
        super.render();
        this.colorBottom=0X999999;
        this.createCloseBtn();
        this.createView();
    }
    protected createView():void
    {
        var animation:moon.ImageAnimation=new moon.ImageAnimation("body",1,13);
        animation.loop=true;
        //animation.ftp=12;
        animation.play();
        this.addItem(animation,100,100);
    }
}