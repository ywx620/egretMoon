class MainMoon extends moon.BasicView
{
    private father:DisplayObjectContainer
    protected render():void
    {
        super.render();
        moon.TipsManager.getIns().init(this.stage);
        moon.showLog.getIns().init(this.stage);
        this.createBackground(0XFFCC00);
        var names:string[]=["基础组件","组件Progress","组件ScrollBar"]
        var btns:any[]=[];
        for(var i:number=0;i<names.length;i++){
            var btn:moon.BasicButton=new moon.BasicButton();
            btn.label=names[i];
            btn.name=i.toString();
            btn.x=(this.stageWidth-btn.width)>>1;
            btn.y=i*(btn.height+20);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this)
            this.addChild(btn);
        }
        this.father=this.parent;
    }
    protected click(e:egret.TouchEvent):void
    {
        var btn:moon.BasicButton=e.currentTarget;
        this.removeFromParent();
        var view:BView;
        switch(parseInt(btn.name)){
            case 0:view=new MoonTest;           break;
            case 1:view=new TestProgress;       break;
            case 2:view=new TestScrollBar;      break;
        }
        this.father.addChild(view);
        view.addEvent(moon.MoonEvent.CLOSE,this.onClose,this)
    }
    private onClose(e:moon.MoonEvent):void
    {
         this.father.addChild(this);
    }
}
