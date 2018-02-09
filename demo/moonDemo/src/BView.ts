class BView extends moon.PanelBar
{
    protected canvasY:number;
    protected canvas:Sprite;
    public constructor()
    {
        super(0,0);
    }
    protected render():void
    {
        super.render();
        this.canvasY=this.topHeight;
    }
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
    protected createCanvas():void
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
    public getRandomArray(array:any[]):any[]
    {
        let value:any[]=[];
        let copy:any[]=array.concat();
        while(copy.length>0){
            let index:number=Math.floor(Math.random()*copy.length);
            value.push(copy.splice(index,1)[0]);
        }
        return value;
    }
}
