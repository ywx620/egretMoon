class MButton extends moon.BasicButton {};
class MImage extends moon.Image{};
class ImageAnimation extends moon.ImageAnimation{};
class Layout extends moon.ImageLayout{};
class Scale9Image extends moon.Scale9Image{};
class MoonEvent extends moon.MoonEvent{};
module moon
{
    /**游戏模版 */
	export class BasicGamePanel extends moon.GameView
    {
        protected panelStart:BasicGameStart;
        protected panelOver:BasicGameOver;
        protected panelSet:BasicGameSet;
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
            

            this.panelStart=new BasicGameStart;
            this.panelStart.addEvent(moon.MoonEvent.START,this.start,this)
            this.addChild(this.panelStart);

            this.panelOver=new BasicGameOver;
            this.panelOver.addEvent(moon.MoonEvent.START,this.start,this)

            

            this.panelSet=new BasicGameSet;
            this.panelSet.setBtnPos(4,200);
            this.panelSet.addEvent(MoonEvent.PAUSE,this.onSetHandler,this);
            this.panelSet.addEvent(MoonEvent.PLAY,this.onSetHandler,this);
            this.panelSet.addEvent(MoonEvent.CHANGE,this.onSetHandler,this);
            this.parent.parent.addChild(this.panelSet);

            this.initGame();
        }
        protected initGame():void
        {
            this.level=1;
            this.score=0;
            this.blood=200;
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
            this.panelOver.alpha=0;
            Tween.get(this.panelOver).to({alpha:1},300)
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
        protected onSetHandler(e:MoonEvent):void
        {
            if(e.type==MoonEvent.PAUSE){
                this.stop();
            }else if(e.type==MoonEvent.PLAY){
                this.play();
            }else{
                var value:number=e.data as number;
                if(e.dataType="soundBg"){

                }else if(e.dataType="soundEffect"){

                }
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
    /**游戏设置面板*/
    export class BasicGameSet extends moon.GameView
    {
        private btnSet:Button;
        private btnClose:Button;
        private container:Sprite;
        private btnSoundBg:MoreSkinButton;
        private btnSoundEffect:MoreSkinButton;
        private btnSetPos:Point;
        protected render():void
        {
            super.render();
            this.initView();
        }
        protected initView():void
        {
           var skin:Sprite=this.getSkin();
           skin.filters=[new egret.GlowFilter(0)];
           this.btnSet=new Button(skin,this.getSkin());
           this.btnSet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
           this.addChild(this.btnSet);
           if(this.btnSetPos){
               this.btnSet.x=this.btnSetPos.x;
               this.btnSet.y=this.btnSetPos.y;
           }           

           this.container=new Sprite;
           var containerBg=this.createBackground(0,0.5);
           this.container.addChild(containerBg);

           var setbg:MoonDisplayObject=new MoonDisplayObject;
           var bgWidth:number=this.stageWidth>>1;
           var colorBg:number=0XFF9900;
           setbg.type=Const.SHAPE_RECT_ROUND;
           setbg.data={w:bgWidth*1.1,h:bgWidth,ew:100,eh:100,c:colorBg};
           setbg.setBackground(0XFFFFFF,5);
           setbg.x=(containerBg.width-bgWidth)>>1;
           setbg.y=(containerBg.height-bgWidth)>>1;
           this.container.addChild(setbg);

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

           var button:Button=new Button();
           button.label="关  闭";
           button.x=(setbg.width-button.width)>>1;
           button.y=240;
           button.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
           setbg.addChild(button);
           this.btnClose=button;

        }
        /**设置 */
        public setBtnPos(x:number=0,y:number=0):void{
            this.btnSetPos=new Point(x,y)
        }
        protected getSkin():Sprite
        {
            var colorBg:number=0XFF9900;
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
        private getToggleSwitch():MoreSkinButton
        {
            var normal:Sprite=moon.Skin.switchOn;
            var down:Sprite=moon.Skin.switchOn;
            var normal2:Sprite=moon.MoonUI.getSwitch(moon.Color.bule,moon.Color.white)
            var down2:Sprite=moon.MoonUI.getSwitch(moon.Color.bule,moon.Color.white)
            var btn:MoreSkinButton=new MoreSkinButton([normal,down,normal2,down2]);
            btn.toggleSwitch=true;
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
            return btn;
        }
        private onClick(e:egret.TouchEvent):void
        {
            var btn:Button=e.currentTarget as Button;
            if(btn==this.btnSet){
                this.addChild(this.container);
                this.dispEvent(MoonEvent.PAUSE);
            }else if(btn==this.btnSoundBg){
                traceSimple("背景音乐"+this.btnSoundBg.currentPage);
                this.dispEvent(MoonEvent.CHANGE,this.btnSoundBg.currentPage,"soundBg");
            }else if(btn==this.btnSoundEffect){
                traceSimple("游戏音效"+this.btnSoundEffect.currentPage);
                this.dispEvent(MoonEvent.CHANGE,this.btnSoundEffect.currentPage,"soundEffect");
            }else if(btn==this.btnClose){
                this.removeChild(this.container);
                this.dispEvent(MoonEvent.PLAY);
            }
        }
    }
}
