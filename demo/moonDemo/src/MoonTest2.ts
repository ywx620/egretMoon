class TestProgress extends BView
{
    private progressBar:moon.ProgressBar;
    protected render():void
    {
        super.render();
        this.createBackground(0XFFCC00);
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
        super.render();
        this.createBackground(0XFFCC00);
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