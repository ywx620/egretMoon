class Button extends moon.BasicButton {};
/**城市背景地图 */
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
        this.addItem(new Game)
    }
}
/**游戏模版 */
class Game extends moon.GameView
{
    private panelStart:PanelStart;
    private panelOver:PanelOver;
    private score:number;//分数
    private level:number;//等级
    private blood:number;//血量
    private txtScore:TextField;
    private txtLevel:TextField;
    private txtBlood:TextField;
    /**加载到舞台之后调用 */
    protected render():void
    {
        super.render();
        moon.showLog.getIns().init(this.stage);
        this.createBgGradientFill();

        this.txtScore=this.createText();
        this.txtLevel=this.createText(200);
        this.txtBlood=this.createText(400);
        

        this.panelStart=new PanelStart;
        this.panelStart.addEvent(moon.MoonEvent.START,this.start,this)

        this.panelOver=new PanelOver;
        this.panelOver.addEvent(moon.MoonEvent.START,this.start,this)

        this.addChild(this.panelStart);

        this.initGame();
    }
    protected initGame():void
    {
        this.level=1;
        this.score=0;
        this.blood=300;
        this.updateBlood();
        this.updateLevel();
        this.updateScore();
    }
    protected start(e:moon.MoonEvent):void
    {
        this.initGame();
        this.play();
    }
    protected loop(n:number):boolean
    {
        this.blood--;
        this.score+=10;
        this.updateScore();
        this.updateBlood();
        return true;
    }
    protected over():void
    {
        this.addChild(this.panelOver);
        this.panelOver.update({score:this.score,level:this.level});
        this.stop();
    }
    protected updateLevel():void
    {
        this.txtLevel.text="level:"+this.level;
    }
    protected updateScore():void
    {
        this.txtScore.text="score:"+this.score;
        if(this.score>0&&this.score%200==0){
            this.level++;
            this.updateLevel();
        }
    }
    protected updateBlood():void
    {
        this.txtBlood.text="blood:"+this.blood;
        if(this.blood==0){
            this.over();
        }
    }
    public dispose():void
	{
        this.stop();
        super.dispose();
    }
}
/**游戏开始界面 */
class PanelStart extends moon.GameView
{
    /**加载到舞台之后调用 */
    protected render():void
    {
        super.render();
        var bg:Sprite=this.createBackground();
        bg.alpha=0.5;
        
        this.initView();
    }
    protected initView():void
    {
        this.createBtn("开始游戏");
        this.createTitle("游戏标题")
    }
    protected createBtn(value:string):Button
    {
        var btn:moon.BasicButton=this.createButton(value);
        btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
        btn.x=(this.stageWidth-btn.width)>>1;
        btn.y=(this.stageHeight-btn.height)>>1;
        return btn;
    }
    protected createTitle(value:string):TextField
    {
        var title:TextField=this.createText(0,0,value);
        title.x=(this.stageWidth-title.width)/2;
        title.y=(this.stageHeight-title.height)/2-100;
        return title;
    }
    protected onClick(e:egret.TouchEvent):void
    {
        this.removeFromParent();
        this.dispEvent(moon.MoonEvent.START);
    }
}
/**游戏结束界面 */
class PanelOver extends PanelStart
{
    private txtScore:TextField;
    private txtLevel:TextField;
    protected initView():void
    {
        this.createBtn("再来一次");
        this.txtScore=this.createText();
        this.txtLevel=this.createText();
    }
    public update(data:Object):void
    {
        this.txtScore.text="score:"+data["score"];
        this.txtLevel.text="level:"+data["level"];
        this.txtScore.x=(this.stageWidth-this.txtScore.width)/2;
        this.txtLevel.x=(this.stageWidth-this.txtLevel.width)/2;
        this.txtScore.y=(this.stageHeight-this.txtScore.height)/2-60;
        this.txtLevel.y=this.txtScore.y-60;
    }
}
