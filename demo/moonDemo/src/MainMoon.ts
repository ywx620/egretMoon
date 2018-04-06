class MainMoon extends moon.BasicView
{
    private father:DisplayObjectContainer
    protected render():void
    {
        super.render();
        var isMobile:boolean=egret.Capabilities.isMobile;
        if(isMobile){//运行在移动端时模式设置下面这个
            this.stage.scaleMode=egret.StageScaleMode.FIXED_WIDTH;
        }
        moon.TipsManager.getIns().init(this.stage);
        moon.showLog.getIns().init(this.stage);
        this.createBackground(0XFFCC00);
        var names:string[]=["基础组件","组件Progress","组件ScrollBar","游戏2048界面","画画","选色游戏","别踩白块","消灭星星界面","游戏背包"];
        names.push("组件输入框","城市背景","游戏模版","动画模版")
        var btns:any[]=[];
        for(var i:number=0;i<names.length;i++){
            var btn:moon.BasicButton=new moon.BasicButton(moon.MoonUI.getRoundRect(300,60,moon.Color.black),moon.MoonUI.getRoundRect(300,60,moon.Color.gray));
            btn.skinAutoScale=false;
            btn.label=names[i];
            btn.name=i.toString();
            btn.x=(this.stageWidth-btn.width)>>1;
            btn.y=i*(btn.height+20);
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.click,this);
            this.addChild(btn);
        }
        this.father=this.parent;

        // var c2:number=moon.Color.lightenDarkenColor(moon.Color.bule,255)
        // this.addChild(moon.MoonUI.getMatrixRect(400,400,moon.Color.bule,c2,0.5))

        // var n:Sprite=moon.MoonUI.getRect(100,100);
        // this.addChild(n);
        // var tw:Tween=Tween.get(n);
		// tw.to({y:500},2000,Ease.sineOut);

        //this.addChild(new moon.AlertBar("-请点确定按钮-\n然后再点其它按钮"))

    }
    protected click(e:egret.TouchEvent):void
    {
        var btn:moon.BasicButton=e.currentTarget;
        this.removeFromParent();
        var view:moon.MoonContainer;
        switch(parseInt(btn.name)){
            case 0:view=new MoonTest;           break;
            case 1:view=new TestProgress;       break;
            case 2:view=new TestScrollBar;      break;
            case 3:view=new G2048;              break;
            case 4:view=new Draw;               break;
            case 5:view=new GameSelectColor;    break;
            case 6:view=new DonotTouchWhiteRect;    break;
            case 7:view=new DestoryStar;        break;
            case 8:view=new GameBackpack;       break;
            case 9:view=new TextInput;          break;
            case 10:view=new HouseMapTest;      break;
            case 11:view=new GameTest;          break;
            case 12:view=new GameAnimation;     break;
         }
        this.father.addChild(view);
        view.addEvent(moon.MoonEvent.CLOSE,this.onClose,this);
    }
    private onClose(e:moon.MoonEvent):void
    {
         this.father.addChild(this);
    }
}
