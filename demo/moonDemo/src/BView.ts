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
    protected setButton(label:string,x:number,y:number):void
    {
        var btn:Button=new Button();
        btn.label=label;
        this.addItem(btn,x,y);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
    }
    protected onClick(e:egret.TouchEvent):void
    {
        
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
    protected createAlert(value:string):void
    {
        var alert:moon.AlertBar=new moon.AlertBar(value);
        alert.addEvent(moon.MoonEvent.CLOSE,this.closeAlert,this)
        this.addChild(alert);
    }
    protected closeAlert(e:moon.MoonEvent):void
    {

    }
    protected createTitle(title:string,y:number=0,x:number=0):void
    {
        this.addItem(new moon.Label(title,0),x,y);
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
