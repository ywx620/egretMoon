/**
 * ...2017-4-28
 * @author vinson
 * 基础游戏类，需要MoonTheme支持
 */
class MButton extends moon.BasicButton {};//按钮
class MBasicView extends moon.BasicView {};//窗口
class MImage extends moon.Image{};//图片
class MContainer extends moon.BasicContainer{};//图片容器
class MAnimation extends moon.ImageAnimation{};//图片动画
class MChartlet extends moon.ImageChartlet{};//图片贴图
class MFollow extends moon.ImageFollow{};//图片跟随
class MILayout extends moon.ImageLayout{};//单个对象的多种方法布局
class MSLayout extends moon.SimpleLayout{};//多个对象的简单布局
class M9Image extends moon.Scale9Image{};//九宫格
class MoonEvent extends moon.MoonEvent{};//事件
class MGameData extends moon.GameData{};//游戏数据
class MConst extends moon.Const{};//常量
class MColort extends moon.Color{};//颜色常量

module moon
{
    /**游戏模版 */
	export class BasicGameMain extends moon.GameView
    {
        protected panelGame:BasicGamePanel;
        protected panelStart:BasicGameStart;
        protected panelOver:BasicGameOver;
        protected panelSet:BasicGameSet;
        protected setBtn:SetButton;
        /**加载到舞台之后调用 */
        protected render():void
        {
            super.render();
            this.initView();
        }
        protected initView():void
        {
            this.createBgGradientFill();
            
            this.panelGame=new BasicGamePanel;
            this.panelGame.addEvent(MoonEvent.OVER,this.onOver,this);
            this.addChild(this.panelGame);

            this.setBtn=new SetButton;
            this.setBtn.x=100;
            this.setBtn.y=100;
            this.setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openSetPanel,this);
            this.addChild(this.setBtn);

            this.panelSet=new BasicGameSet;
            this.panelSet.addEvent(MoonEvent.PLAY,this.onSetHandler,this);
            this.panelSet.addEvent(MoonEvent.CHANGE,this.onSetHandler,this);

            this.panelStart=new BasicGameStart;
            this.panelStart.addEvent(moon.MoonEvent.START,this.start,this);
            this.addChild(this.panelStart);

            this.panelOver=new BasicGameOver;
            this.panelOver.addEvent(moon.MoonEvent.START,this.start,this);
            
        }
        protected start(e:moon.MoonEvent):void
        {
            this.panelGame.initGame();
            this.panelGame.start();
        }
        protected onOver(e:MoonEvent):void
        {
            this.addChild(this.panelOver);
            this.panelOver.alpha=0;
            Tween.get(this.panelOver).to({alpha:1},300)
            this.panelOver.update(e.data);
        }
        protected openSetPanel(e:egret.TouchEvent):void
        {
            this.addChild(this.panelSet);
            this.panelSet.alpha=0;
            Tween.get(this.panelSet).to({alpha:1},300);
            this.panelGame.pause();
        }
        protected onSetHandler(e:MoonEvent):void
        {
            if(e.type==MoonEvent.PLAY){
               this.panelGame.start();
            }else{
                var value:number=e.data as number;
                if(e.dataType="soundBg"){

                }else if(e.dataType="soundEffect"){

                }
            }
        }
    }
    /**游戏模版 */
	export class BasicGamePanel extends moon.GameView
    {
        protected score:number;//分数
        protected level:number;//等级
        protected blood:number;//血量
        protected txtScore:TextField;
        protected txtLevel:TextField;
        protected txtBlood:TextField;
        /**加载到舞台之后调用 */
        protected render():void
        {
            super.render();
            this.initView();
        }
        protected initView():void
        {
            this.createBgGradientFill();
            this.txtScore=this.createText();
            this.txtLevel=this.createText(200);
            this.txtBlood=this.createText(400);
            
            this.initGame();
        }
        public initGame():void
        {
            this.level=1;
            this.score=0;
            this.blood=200;
            this.updateBlood();
            this.updateLevel();
            this.updateScore();
        }
        public start():void
        {
            this.play();
        }
        public pause():void
        {
            this.stop();
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
            this.dispEvent(MoonEvent.OVER,{score:this.score,level:this.level})
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
        protected createImageBg(name:string):void
        {
            this.addChild(new MImage(name));
        }
        public dispose():void
        {
            this.stop();
            super.dispose();
        }
    }
    /**游戏开始界面 */
    export class BasicGameStart extends moon.GameView
    {
        /**加载到舞台之后调用 */
        protected render():void
        {
            super.render();
            
            this.initView();
        }
        protected initView():void
        {
            var bg:Sprite=this.createBackground();
            bg.alpha=0.5;
            
            this.createBtn("开始游戏");
            this.createTitle("游戏标题");
        }
        protected createBtn(value:string):MButton
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
             this.dispEvent(MoonEvent.START);
             Tween.get(this).to({alpha:0},300).call(this.backCall,this)
        }
        protected backCall(e:egret.TouchEvent):void
        {
            this.removeFromParent();
        }
        protected createImageBg(name:string):void
        {
            this.addChild(new MImage(name));
        }
    }
    /**游戏结束界面 */
    export class BasicGameOver extends BasicGameStart
    {
        protected txtScore:TextField;
        protected txtLevel:TextField;
        protected btnRestart:MButton;
        protected btnRank:MButton;
        protected rankPanel:BasicGameRank;
        protected initView():void
        {
            var bg:Sprite=this.createBackground();
            bg.alpha=0.5;

            this.btnRestart=this.createBtn("再来一次");
            this.btnRank=this.createBtn("排行榜");
            this.btnRank.y+=100;
            this.txtScore=this.createText();
            this.txtLevel=this.createText();

            this.rankPanel=new BasicGameRank;
        }
        public update(data:Object):void
        {
            this.txtScore.text="score:"+data["score"];
            this.txtLevel.text="level:"+data["level"];
            this.txtScore.x=(this.stageWidth-this.txtScore.width)/2;
            this.txtLevel.x=(this.stageWidth-this.txtLevel.width)/2;
            this.txtScore.y=(this.stageHeight-this.txtScore.height)/2-60;
            this.txtLevel.y=this.txtScore.y-60;
            GameData.score=data["score"];
        }
        protected onClick(e:egret.TouchEvent):void
        {
            var btn:MButton=e.currentTarget as MButton;
            if(btn==this.btnRestart){
                super.onClick(e);
            }else if(btn==this.btnRank){
                if(this.rankPanel){
                    GameData.stage.addChild(this.rankPanel);
                }
            }
        }
    }
    /**游戏设置面板*/
    export class BasicGameSet extends moon.BasicView
    {
        protected btnClose:MButton;
        protected btnSoundBg:MoreSkinButton;
        protected btnSoundEffect:MoreSkinButton;
        public static SOUND_BG:string="sound bg";
        public static SOUND_EFFECT:string="sound effect";
        protected render():void
        {
            super.render();
            this.initView();
        }
        protected initView():void
        {
           var containerBg=this.createBackground(0,0.5);
           this.addChild(containerBg);

           var setbg:MoonDisplayObject=new MoonDisplayObject;
           var bgWidth:number=this.stageWidth>>1;
           var colorBg:number=0XFF9900;
           setbg.type=Const.SHAPE_RECT_ROUND;
           setbg.data={w:bgWidth*1.1,h:bgWidth,ew:100,eh:100,c:colorBg};
           setbg.setBackground(0XFFFFFF,5);
           setbg.x=(containerBg.width-bgWidth)>>1;
           setbg.y=(containerBg.height-bgWidth)>>1;
           this.addChild(setbg);

           var label1:Label=new Label("背景音乐",0XFFFFFF);
           var label2:Label=new Label("游戏音效",0XFFFFFF);
           label1.textField.size=40;
           label2.textField.size=40;
           label1.x=label2.x=50;
           label1.y=50;label2.y=150;
           setbg.addChild(label1);
           setbg.addChild(label2);

           var btn=this.getToggleSwitch();
           btn.x=label1.x+label1.width+10;
           btn.y=label1.y-5;
           setbg.addChild(btn);
           this.btnSoundBg=btn;

           var btn=this.getToggleSwitch();
           btn.x=label2.x+label2.width+10;
           btn.y=label2.y-5;
           setbg.addChild(btn);
           this.btnSoundEffect=btn;

           var button:MButton=new MButton();
           button.label="关  闭";
           button.x=(setbg.width-button.width)>>1;
           button.y=240;
           button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
           setbg.addChild(button);
           this.btnClose=button;

        }        
        protected getToggleSwitch():MoreSkinButton
        {
            var normal:Sprite=moon.Skin.switchOn;
            var down:Sprite=moon.Skin.switchOn;
            var normal2:Sprite=moon.MoonUI.getSwitch(moon.Color.bule,moon.Color.white)
            var down2:Sprite=moon.MoonUI.getSwitch(moon.Color.red,moon.Color.white)
            var btn:MoreSkinButton=new MoreSkinButton([normal,down,normal2,down2]);
            btn.toggleSwitch=true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
            return btn;
        }
        protected onClick(e:egret.TouchEvent):void
        {
            var btn:MButton=e.currentTarget as MButton;
            var value:number;
            if(btn==this.btnSoundBg){
                value=this.btnSoundBg.currentPage;
                alertAuto("背景音乐"+(value==1?"开":"关"),1);
                BasicGameStorage.localWrite(BasicGameSet.SOUND_BG,value.toString());
                this.dispEvent(MoonEvent.CHANGE,this.btnSoundBg.currentPage,"soundBg");
            }else if(btn==this.btnSoundEffect){
                value=this.btnSoundEffect.currentPage;
                alertAuto("游戏音效"+(value==1?"开":"关"),1);
                BasicGameStorage.localWrite(BasicGameSet.SOUND_EFFECT,value.toString());
                this.dispEvent(MoonEvent.CHANGE,this.btnSoundEffect.currentPage,"soundEffect");
            }else if(btn==this.btnClose){
                this.removeFromParent();
                this.dispEvent(MoonEvent.PLAY);
            }
        }
        protected setValue():void
        {
           var value:string=BasicGameStorage.localRead(BasicGameSet.SOUND_BG)||"1";
           this.btnSoundBg.updatePage(parseInt(value));

           var value:string=BasicGameStorage.localRead(BasicGameSet.SOUND_EFFECT)||"1";
           this.btnSoundEffect.updatePage(parseInt(value));
        }
    }
        /**游戏积分排行板*/
    export class BasicGameRank extends moon.BasicView
    {
        protected txtRank:TextField;
        protected items:RankItem[]=[];
        protected conatiner:Sprite;
        protected max:number=100;
        protected render():void
        {
            super.render();
            this.initView();
        }
        protected initView():void
        {
           this.createBackground(0,0.5);
           var rankBg=MoonUI.getRect(this.stageWidth-100,this.stageHeight-200,0);
           rankBg.alpha=0.8;
           this.addChild(rankBg);
           MILayout.getIns().setCenterXByPanent(rankBg);
           MILayout.getIns().setCenterYByPanent(rankBg);
           var rect:Rectangle=new Rectangle(rankBg.x,rankBg.y,rankBg.width,rankBg.height);
           var dis:number=60;
           var line:Sprite=new Sprite;
           line.graphics.lineStyle(2,0XFFFFFF);
           line.graphics.moveTo(rect.x,rect.y+dis);
           line.graphics.lineTo(rect.x,rect.y);
           line.graphics.lineTo(rect.right,rect.y);
           line.graphics.lineTo(rect.right,rect.bottom);
           line.graphics.lineTo(rect.x,rect.bottom);
           line.graphics.lineTo(rect.x,rect.y+dis);
           line.graphics.lineTo(rect.right,rect.y+dis);
           this.addChild(line);

           var xnum:number=30;
           var btnSkin=MoonUI.getCircle(xnum,0xffffff);
           var skinX=MoonUI.getX(xnum>>1,xnum>>1,0x00ff00,4);
           skinX.anchorOffsetX=skinX.anchorOffsetY=xnum>>2;
           btnSkin.addChild(skinX);

           var btn:MButton=new MButton(btnSkin,btnSkin);
           btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
           this.addChild(btn);
           btn.x=rankBg.x+rankBg.width;
           btn.y=rankBg.y;

           var txt:TextField=this.createText(0,0,"分数排行榜");
           MILayout.getIns().setCenterXByPanent(txt);
           txt.y=rankBg.y+(dis-txt.height)/2;
           this.addChild(txt);

           var txt:TextField=this.createText(rankBg.x,rankBg.y-dis/2);
           this.addChild(txt);
           this.txtRank=txt;
           this.txtRank.text="你的排名:"

           this.conatiner=new Sprite;
           this.addChild(this.conatiner);
           var itemw:number=rankBg.width-2
           for(var i=0;i<this.max;i++){
                var item:RankItem=new RankItem(itemw,i);
                this.conatiner.addChild(item);
                this.items.push(item);
           }
           SimpleLayout.displayRank(this.items,1);

           var scrollBar:moon.ScrollBar=new moon.ScrollBar();
            scrollBar.target=this.conatiner;
            scrollBar.setSize(rect.width,rect.height-dis-2);
            scrollBar.layout(moon.Const.VERTICAL);
            this.addChild(scrollBar);
            scrollBar.x=rect.x+1
            scrollBar.y=rect.y+dis+2;
        }
        protected onClick(e:egret.TouchEvent):void
        {
            this.removeFromParent();
        }
        public update(data:Object):void
        {
            var len:number=this.max;
            var myRank:number=-1;
            for(var i=0;i<len;i++){
                if(i<=this.max){
                    var score:number=100;
                    var item:RankItem=this.items[i];
                    item.txtScore.text=""+score;
                    if(i<len-1){
                        var next:number=90
                        if(GameData.score>next&&GameData.score<=score){
                            myRank=i;
                        }
                    }
                }
            }
            if(myRank>0) this.txtRank.text="你的排名:"+myRank;
            else         this.txtRank.text="未上榜"
        }
    }
    export class RankItem extends BasicView
    {
        protected w:number;
        protected rank:number;
        protected txtRank:TextField;
        public txtScore:TextField;
        protected colors:number[]=[0,0XDD823B,0XD2A85E,0XDFD164];
        public constructor(w:number,rank:number)
        {
            super();
            this.w=w;
            this.rank=rank+1;
            this.initView();

        }
        protected initView():void
        {
            var bg:Sprite=this.createRect(this.w,80,0);
            bg.alpha=this.rank%2==0?0.6:0.1;
            this.addChild(bg);

            this.txtRank=this.createText(150,0);
            this.txtScore=this.createText(350,0);
            if(this.rank<=3){
               this.txtRank.textColor=this.txtScore.textColor=this.colors[this.rank];
            }
            this.txtRank.text=String(this.rank);
            //this.txtScore.text=String(10000-this.rank);
            this.txtScore.text=String(0);
            MILayout.getIns().setCenterYByPanent(this.txtRank);
            MILayout.getIns().setCenterYByPanent(this.txtScore);
        }
    }
    export class SetButton extends MButton
    {
        protected render():void
        {
            super.render();
            var skin1:Sprite=this.getSkin();
            var skin2:Sprite=this.getSkin(0XFF5500);
            //skin.filters=[new egret.GlowFilter(0)];
            this.statusNormal=skin1;
		    this.statusDown=skin2;
			this.updateSkin(this.statusNormal);    
        }   
        protected getSkin(bgc:number=0XFF9900):Sprite
        {
            var colorBg:number=bgc;
            var colorIcon:number=0X6A4000;
            var container:Sprite=new Sprite;
            var bgWidth:number=90;
            var bg:MoonDisplayObject=new MoonDisplayObject;
            bg.type=Const.SHAPE_RECT_ROUND;
            bg.data={w:bgWidth,h:bgWidth,ew:30,eh:30,c:colorBg};
            bg.anchorOffsetX=bg.anchorOffsetY=bgWidth>>1;
            container.addChild(bg);
            container.addChild(MoonUI.getCircle(30,colorIcon));
            var len:number=8;
            var rotation:number=360/len;
            for(var i:number=0;i<len;i++){
                var line:Sprite=MoonUI.getRect(15,80,colorIcon);
                line.anchorOffsetX=line.width>>1;
                line.anchorOffsetY=line.height>>1;
                line.rotation=rotation*i;
                container.addChild(line);
            }
            container.addChild(MoonUI.getCircle(20,colorBg));
            container.addChild(MoonUI.getCircle(6,colorIcon));
            container.anchorOffsetX=container.anchorOffsetY=-(bgWidth/2+4);
            return container;
        }
    }
    /**游戏数据存储*/
    export class BasicGameStorage
    {
        /**只能内部访问,在外部修改gameId */
        protected static getGameIdKey(key:string):string{return GameData.gameId+key}
        /**本地 数据写入*/
        public static localWrite(key:string,value:string):void{
            egret.localStorage.setItem(this.getGameIdKey(key),value);
        }
        /**本地 数据读取*/
        public static localRead(key:string):string{
            return egret.localStorage.getItem(this.getGameIdKey(key));
        }
        /**本地 数据删除*/
        public static localRemove(key:string):any{
            egret.localStorage.removeItem(this.getGameIdKey(key));
        }
        /**本地 数据清空*/
        public static localClear():any{
            egret.localStorage.clear();
        }
        /**服务器 数据写入*/
        public static serverWrite():void{}
        /**服务器 数据读取*/
        public static serverRead():string{return ""}
        /**服务器 数据删除*/
        public static serverRemove():void{}
    }
    /**初始化游戏*/
    export class GameMoon
    {
        public static init(stage:Stage):void
        {
            //移动端与PC端使用不同模式
            egret.Capabilities.isMobile?stage.scaleMode=egret.StageScaleMode.FIXED_WIDTH:stage.scaleMode=egret.StageScaleMode.SHOW_ALL;
            //保存好舞台数据
            GameData.stageWidth=stage.stageWidth;
            GameData.stageHeight=stage.stageHeight;
            GameData.stage=stage;
            //初始化部分功能
            moon.TipsManager.getIns().init(stage);
            moon.LogManager.getIns().init(stage);
            moon.AlertManager.getIns().init(stage);
        }
    }
    /**游戏间的工具类*/
    export class GameUtils
    {
        /**把数字转换成时间格式,showNum为3时00:00:00,为2时00:00,为1时00*/
		public static getTimeFormatByNum(num:number,type:string=":",showNum:number=3):string{
			var s:string;
			var hour:string;
			var minute:string;
			var second:string;
			if(showNum==1){
				second = this.numberFormat(num);
				return second;
			}else if(showNum==2){
				minute = this.numberFormat((num/60));
				second = this.numberFormat(num%60);
				return minute+type+second;
			}else{
				hour = this.numberFormat(num/60/60>>0);
				minute = this.numberFormat((num/60) % 60);
				second = this.numberFormat(num%60);
				return hour+type+minute+type+second;
			}
		}
        /**数字格式，把小于10的数在前面加个0*/
		public static numberFormat(num:number):string{
            num=Math.floor(num);
			if(num>=10)			return ""+num;
			else				return "0"+num;
		}
        /***两点间的距离 */
        public static twoDistance(a:any,b:any):number
        {
            var x:number=a.x-b.x;
            var y:number=a.y-b.y;
            return Math.sqrt(x*x+y*y);
        }
        /**两个可显示对象的区域碰撞*/
        public static hitTestRect(obj1: egret.DisplayObject,obj2: egret.DisplayObject): boolean {
            var rect1:egret.Rectangle = obj1.getBounds();//获取显示对象的测量边界
            var rect2:egret.Rectangle = obj2.getBounds();//获取显示对象的测量边界
            rect1.x=obj1.x;rect1.y=obj1.y;
            rect2.x=obj2.x;rect2.y=obj2.y;
            //此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
            return rect1.intersects(rect2);
        }
    }
}
//类必须在其基类之后声明。
class MGameMain extends moon.BasicGameMain{};//游戏主控制类（控制几个面板的事件回调）
class MGamePanel extends moon.BasicGamePanel{};//游戏面板逻辑控制类
class MGameStart extends moon.BasicGameStart{};//游戏开始面板类
class MGameOver extends moon.BasicGameOver{};//游戏结束面板类
class MGameSet extends moon.BasicGameSet{};//游戏设置面板类
class MGameRank extends moon.BasicGameRank{};//游戏排名面板类
class MRankItem extends moon.RankItem{};//游戏排行的子对象
class MGameMoon extends moon.GameMoon{};//游戏数据初始化
class MGameUtils extends moon.GameUtils{};//游戏工具类