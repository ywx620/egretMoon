class BView extends moon.BasicView
{
    protected createCloseBtn():void
    {
        var btn:moon.BasicButton=new moon.BasicButton();
        btn.label="关闭";
        this.addChild(btn);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.close,this)
    }
    protected close(e:egret.TouchEvent):void
    {
        this.dispEvent(moon.MoonEvent.CLOSE)
        this.removeFromParent(true);
    }
}
