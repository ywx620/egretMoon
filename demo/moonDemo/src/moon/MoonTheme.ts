class TextField extends egret.TextField {};
class Sprite extends egret.Sprite {};
class Shape extends egret.Shape {};
class DisplayObject extends egret.DisplayObject {};
class DisplayObjectContainer extends egret.DisplayObjectContainer {};
class Point extends egret.Point{};
class Rectangle extends egret.Rectangle{};
class Bitmap extends egret.Bitmap{};
class BitmapData extends egret.BitmapData{};
class Stage extends egret.Stage{};
class Tween extends egret.Tween{};
class Ease extends egret.Ease{};
//----------------------------------------------
var trace=function(...arg):void
{
    var str:string="";
	for(let i:number=0;i<arg.length;i++){
         str+=arg[i]+",";
    }
	str=str.substr(0,str.length-1);
	moon.showLog.getIns().logMessage(str)
}
var traceSimple=function(...arg):void
{
	var str:string="";
	for(let i:number=0;i<arg.length;i++){
         str+=arg[i]+",";
    }
	str=str.substr(0,str.length-1);
    moon.showLog.getIns().log(str);
}
//----------------------------------------------
module moon
{
	export class FONT{
		public static fontName:string="黑体";
	}
	export class Const{
		/**布局 横版*/
		public static readonly HORIZONTAL:string="horizontal";
		/**布局 竖版*/
		public static readonly VERTICAL:string="vertical";

		/**形状 方块*/
		public static readonly SHAPE_RECT:string="shape rect";
		/**形状 圆角方块*/
		public static readonly SHAPE_RECT_ROUND:string="shape rect round";
		/**形状 圆块*/
		public static readonly SHAPE_CIRCLE:string="shape circle";
	}
	export interface IItem{
		update():void;
		addItem(item:DisplayObject):void;
		removeItem(item:DisplayObject):void;
		hasItem(index:number):boolean;
		getItem(index:number):DisplayObject;
		getNextItem():DisplayObject;
		reset():void;
    }
	export interface ILayout{  
		layout(type:string,interval:number):void;
    }
	export interface IOnoff{
		open():void;
		close():void;
	}
	/**颜色 */
	export class Color
	{
		public static get random():number{return Math.random()*0XFFFFFF};
		public static get white():number {return 0XFFFFFF};
		public static get black():number {return 0X000000};
		public static get gray():number {return 0X666666};
		public static get red():number {return 0XFF0000};
		public static get green():number {return 0X00FF00};
		public static get bule():number {return 0X0000FF};
		public static get skinNormal():number{return 0X15191C};
		public static get skinDown():number{return 0X999999};
		public static get titleBackground():number{return 0X20262B};
		public static getRandomArray(count:number):number[]{
			var colors:number[]=[];
			for(var i:number=0;i<count;i++) colors.push(Math.random()*0XFFFFFF);
			return colors;
		};
		/** 可改变颜色的亮暗,value值是-255到255*/
		public static lightenDarkenColor(color:number, value:number):number {  
			var r = (color >> 16) + value;
			if (r > 255) r = 255;
			else if (r < 0) r = 0;
			var b = ((color >> 8) & 0x00FF) + value;
			if (b > 255) b = 255;
			else if (b < 0) b = 0;
			var g = (color & 0x0000FF) + value;
			if (g > 255) g = 255;
			else if (g < 0) g = 0;
			return (g | (b << 8) | (r << 16));
		}
	}
	/**皮肤 */
	export class Skin
	{
		public static get randomRect():Sprite{return moon.MoonUI.getRect(60,60,moon.Color.random)};
		public static get randomCircle():Sprite{return moon.MoonUI.getCircle(50,moon.Color.random)};
		/**默认点 */
		public static get pointNormal():Sprite{return moon.MoonUI.getCircle(6,moon.Color.black)};
		public static get pointDown():Sprite{return moon.MoonUI.getCircle(6,moon.Color.gray)};
		/**默认按钮 */
		public static get buttonNormal():Sprite{return moon.MoonUI.getRect(60,60,moon.Color.skinNormal)};
		public static get buttonDown():Sprite{return moon.MoonUI.getRect(60,60,moon.Color.skinDown)};
		/**默认单选框 */
		public static get radioOff():Sprite{return moon.MoonUI.getRadioCircle(moon.Color.white,moon.Color.white)};
		public static get radioOn():Sprite{return moon.MoonUI.getRadioCircle(moon.Color.white,moon.Color.black,1)};
		/**默认复选框 */
		public static get checkBoxOff():Sprite{return moon.MoonUI.getCheckBoxRect(moon.Color.white,moon.Color.white)};
		public static get checkBoxOn():Sprite{return moon.MoonUI.getCheckBoxRect(moon.Color.white,moon.Color.black,1)};
		/**默认开关 */
		public static get switchOff():Sprite{return moon.MoonUI.getSwitch(moon.Color.skinNormal,moon.Color.white)};
		public static get switchOn():Sprite{return moon.MoonUI.getSwitch(moon.Color.skinNormal,moon.Color.white,1)};
		/**默认进度条 */
		public static get progressBackground():Sprite{return moon.MoonUI.getRect(300,20,moon.Color.skinNormal);}
		public static get progressValue():Sprite{return moon.MoonUI.getRect(300,20,moon.Color.skinDown);}
		/**默认滑动器 */
		public static get sliderBackground():Sprite{return moon.MoonUI.getRect(300,10,moon.Color.skinNormal);}
		public static get sliderValue():Sprite{return moon.MoonUI.getRect(300,10,moon.Color.skinDown);}
		public static get sliderBar():Sprite{return moon.MoonUI.getCircle(15,moon.Color.white);}
		/**默认滚动条 */
		public static get scrollBar():Sprite{return moon.MoonUI.getRect(10,10,moon.Color.skinNormal);}

		public static getRodatioButton(label:string):BasicButton
		{
			var btn:BasicButton=new BasicButton(moon.Skin.radioOff,moon.Skin.radioOn);
			btn.skinAutoScale=false;
			btn.label=label;
			btn.labelColor=moon.Color.black;
            btn.setLabelPoint(40,0);
			return btn;
		}
		public static getCheckBox(label:string):MoreSkinButton
		{
			var skins:any[]=[moon.Skin.checkBoxOff,moon.Skin.checkBoxOff,moon.Skin.checkBoxOn,moon.Skin.checkBoxOn]
            var btn:moon.MoreSkinButton=new moon.MoreSkinButton(skins);
			btn.skinAutoScale=false;
			btn.label=label;
            btn.toggleSwitch=true;
            btn.labelColor=moon.Color.black;
            btn.setLabelPoint(50,2);
			return btn;
		}
	}
	/**
	 * ...
	 * 简单的布局
	 * @author vinson
	 */
	export class SimpleLayout{
		/**参数：数组,X轴个数,X轴距离,Y轴距离,X轴位置,Y轴位置,正排/反排 */
		public static displayRank(array:any[],xNum:number=1,xDis:number=0,yDis:number=0,x:number=0,y:number=0,sign:number=1):void
		{
			var display:egret.DisplayObject;
			for(var i:number=0;i<array.length;i++){
				display=array[i];
				display.x=x+Math.floor(i%xNum)*(display.width+xDis)*sign;
				display.y=y+Math.floor(i/xNum)*(display.height+yDis)*sign;
			}
		}
	}
    /**
	 * ...
	 * 默认参数x轴,y轴,w宽,h高,r半径,c颜色,ew圆角宽,eh圆家高
	 * @author vinson
	 */
    export class MoonUI
	{
        /**得到随机色*/
		public static get randomColor():number{
			return Math.random()*0XFFFFFF;
		}
		/**得到矩形框*/
		public static getLineRect(w:number,h:number,c:number=0,s:number=1,x:number=0,y:number=0):Sprite
		{
			var node:Sprite=new Sprite()
			node.graphics.lineStyle(s,c)
			node.graphics.drawRect(x,y,w,h);
			node.graphics.endFill();
			return node;
		}
		/**得到圆形框*/
		public static getLineCircle(r:number,c:number=0,s:number=1,x:number=0,y:number=0):Sprite
		{
			var node:Sprite=new Sprite();
			node.graphics.lineStyle(s,c)
			node.graphics.drawCircle(x,y,r);
			node.graphics.endFill();
			return node;
		}
		/**得到渐变矩形 a为角度偏移率0,0.5,1,2分别为四个正方向*/
		public static getMatrixRect(w:number,h:number,c1:number=0,c2:number=0,a:number=0):Sprite
		{
			var node = new Sprite();
			var matrix = new egret.Matrix();
			matrix.createGradientBox(w, h, Math.PI * a, 0, 0); 
			node.graphics.beginGradientFill(egret.GradientType.LINEAR, [c1, c2], [1, 1], [0, 255], matrix);
			node.graphics.drawRect(0, 0, w, h);
			node.graphics.endFill();
			return node;
		}
		/**得到矩形*/
		public static getRect(w:number,h:number,c:number=0,x:number=0,y:number=0):Sprite
		{
			var s:Sprite=new Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawRect(x,y,w,h);
			s.graphics.endFill();
			return s;
		}
		/**得到矩形和一个X*/
		public static getRectAndX(w:number,h:number,c:number=0,x:number=0,y:number=0):Sprite
		{
			var s:Sprite=this.getRect(w,h,c,x,y)
			var l1:Sprite=new Sprite;
			l1.graphics.lineStyle(0.1);
			l1.graphics.moveTo(0,0);
			l1.graphics.lineTo(w,h);
			var l2:Sprite=new Sprite;
			l2.graphics.lineStyle(0.1);
			l2.graphics.moveTo(w,0);
			l2.graphics.lineTo(0,h);
			s.addChild(l1);
			s.addChild(l2);
			return s;
		}
		/**得到圆角矩形*/
		public static getRoundRect(w:number,h:number,c:number=0,ew:number=5,eh:number=5,x:number=0,y:number=0):Sprite
		{
			var s:Sprite=new Sprite()
			s.graphics.beginFill(c);
			s.graphics.drawRoundRect(x,y,w,h,ew,eh);
			s.graphics.endFill();
			return s;
		}
		/**得到圆形*/
		public static getCircle(r:number,c:number=0,x:number=0,y:number=0):Sprite
		{
			var s:Sprite=new Sprite();
			s.graphics.beginFill(c);
			s.graphics.drawCircle(x,y,r);
			s.graphics.endFill();
			return s;
		}
		/**得到多边形,side边数,rotation角度*/
		public static getPolygon(side:number=3,r:number=10,c:number=0,rotation:number=0):Sprite
		{
			var s:Sprite = new Sprite;
			s.rotation=rotation;
			s.graphics.beginFill(c);
			for (var i:number =0; i <=side; i++) {
				var lineX:number =  Math.cos((i * (360 / side) * Math.PI / 180)) * r;
				var lineY:number =  Math.sin((i * (360 / side) * Math.PI / 180)) * r;
				if (i == 0) s.graphics.moveTo(lineX,lineY);
				else		s.graphics.lineTo(lineX, lineY);
				
			}
			s.graphics.endFill();
			return s;
		}
		/**得到圆角矩形与三角形合体rc是正方形颜色,pc是三角形颜色*/
		public static getArrowRoundRect(w:number,h:number,rc:number,pc:number=0,rotation:number=0):Sprite
		{
			var s:Sprite = new Sprite;
			s.addChild(this.getRoundRect(w,h,rc));
			var p:Sprite=this.getPolygon(3,w/3,pc,30+rotation);
			p.x=s.width>>1;p.y=s.height>>1;
			s.addChild(p);
			return s;
		}
		/**得到滚动条的bar*/
		public static getScrollLineBar(w:number,h:number,c:number):Sprite
		{
			var s:Sprite = new Sprite;
			var _h:number=h/3;
			for(var i:number=0;i<3;i++){
				var r:Sprite=this.getRect(w,1,c,0,i*_h);
				s.addChild(r);
			}
			return s;
		}
		/**得到圆角矩形-加*/
		public static getAddRoundRect(w:number,h:number,c:number):Sprite
		{
			var s:Sprite = new Sprite;
			s.addChild(this.getRoundRect(w,h,c));
			var r1:Sprite=this.getRect(w/2,2,0,w/4,h/2-1);
			var r2:Sprite=this.getRect(2,h/2,0,w/2-1,h/4);
			s.addChild(r1);
			s.addChild(r2);
			return s;
		}
		/**得到圆角矩形-减*/
		public static getRemoveRoundRect(w:number,h:number,c:number):Sprite
		{
			var s:Sprite = new Sprite;
			s.addChild(this.getRoundRect(w,h,c));
			var r:Sprite=this.getRect(w/2,2,0,w/4,h/2-1);
			s.addChild(r);
			return s;
		}
		/**得到带文字的圆角方形*/
		public static getRoundRectText(w:number,h:number,c:number,str:string="click"):Sprite
		{
			var s:Sprite = new Sprite;
			s.addChild(this.getRoundRect(w,h,c));
			var text:TextField=new TextField;
			text.name="text";
			text.text=str;
			text.x=(s.width-text.width)>>1;
			text.y=(s.height-text.height)>>1;
			s.addChild(text);
			return s;
		}
		/**得到矩形-switchButton bc背景颜色，gc钩选的颜色,type为0是没有钩为1是有钩*/
		public static getSwitch(bc:number=0XFFFFFF,gc:number=0,type:number=0):Sprite
		{
			var node:Sprite=moon.MoonUI.getRoundRect(80,50,bc,60,60);
			node.addChild(moon.MoonUI.getCircle(22,gc,type==0?25:55,25));
			return node;
		}
		/**得到矩形-复选框 bc背景颜色，gc钩的颜色,type为0是没有钩为1是有钩*/
		public static getCheckBoxRect(bc:number=0XFFFFFF,gc:number=0,type:number=0):Sprite
		{
			var s:Sprite = new Sprite;
			s.addChild(this.getRect(40,40,bc));
			if(type==1){
				var r:Sprite=new Sprite;
				r.graphics.beginFill(gc);
				r.graphics.moveTo(0,20);
				r.graphics.lineTo(20,36);r.graphics.lineTo(44,8);r.graphics.lineTo(36,0);r.graphics.lineTo(20,18);
				r.graphics.lineTo(12,8);r.graphics.lineTo(0,20);
				s.addChild(r);
			}
			return s;
		}
		/**得到矩形-单选框 bc背景颜色，gc钩的颜色,type为0是没有圆为1是有圆*/
		public static getRadioCircle(bc:number=0XFFFFFF,gc:number=0,type:number=0):Sprite
		{
			var s:Sprite = new Sprite;
			s.addChild(this.getCircle(16,bc,16,16));
			s.graphics.lineStyle(1,0);
			if(type==1){
				var r:Sprite=this.getCircle(8,gc,16,16)
				s.addChild(r);
			}
			return s;
		}
		/**得到矩形-网格
		 * rect.x是x轴数量
		 * rect.y是y轴数量
		 * rect.width是网格宽
		 * rect.height是网格高
		 * lc网格线颜色
		 * */
		public static getGridding(rect:Rectangle,c:number=0):Sprite
		{
			var s:Sprite=new Sprite;
			s.graphics.lineStyle(0.1,c);
			var disx:number=rect.width/rect.x;
			var disy:number=rect.height/rect.y;
			for(var i:number=0;i<rect.x;i++){
				s.graphics.moveTo(0,i*disy);
				s.graphics.lineTo(rect.width,i*disy);
			}
			for(i=0;i<rect.y;i++){
				s.graphics.moveTo(i*disx,0);
				s.graphics.lineTo(i*disx,rect.height);
			}
			return s;
		}
		/***得到爱心 */
		public static getHeart(r:number=15,c:number=0XFF0000):Sprite
		{
			var s:Sprite=new Sprite;
			s.graphics.beginFill(c);
			s.graphics.moveTo(0,0);
			s.graphics.lineTo(0,-r*2)
			s.graphics.cubicCurveTo(r,-r*2.5,r*2,-r*1.5,0,0);  
			s.graphics.moveTo(0,0);
			s.graphics.lineTo(0,-r*2)
			s.graphics.cubicCurveTo(-r,-r*2.5,-r*2,-r*1.5,0,0);  	
			s.graphics.endFill();
			s.anchorOffsetX=-s.width/2;
			s.anchorOffsetY=-s.height;
			return s;
		}
    }
    //--------------
	export class showLog
	{
		private static instance:showLog;
		private txtSimple:TextField;
		private txtMessage:TextField;
		public static getIns():showLog{
			if(this.instance == null){
					this.instance = new showLog();
			}
			return this.instance;
		}
		public init(stage:Stage):void
		{
			var txt:TextField=(new Label).textField;
			txt.textAlign = egret.HorizontalAlign.LEFT;
			stage.addChild(txt);
			this.txtSimple=txt;

			var txt:TextField=(new Label).textField;
			txt.size=25;
			stage.addChild(txt);
			this.txtMessage=txt;
		}
		/**每次都覆盖上一次信息 */
		public log(value:string):void
		{
			this.txtSimple.text=value;
		}
		/**显示所有信息 */
		public logMessage(value:string):void
		{
			this.txtMessage.appendText(value+"\n");
		}
		public setLogColor(color:number):void
		{
			this.txtSimple.textColor=color;
		}
		public setLogMessageColor(color:number):void
		{
			this.txtMessage.textColor=color;
		}
	}
	export class TipsManager
	{
		private static instance:TipsManager;
		private stage:Stage;
		private tipsView:BasicTips;
		public bgName:string="tips_png";//TIPS的背景图片
		public static getIns():TipsManager{
			if(this.instance == null){
					this.instance = new TipsManager();
			}
			return this.instance;
		}
		public init(stage:Stage):void
		{
			this.stage=stage;
		}
		public simpleTips(value:string,pos:Point):void
		{
			if(this.tipsView==null){
				this.tipsView=new moon.BasicTips(this.bgName);
        		this.tipsView.setValue(value)
        		this.stage.addChild(this.tipsView);
				this.setPosition(pos);
				this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.removeTips,this);
			}
		}
		protected setPosition(pos:Point):void
		{
			if(pos){
				this.tipsView.x=pos.x-(this.tipsView.width>>1);
				this.tipsView.y=pos.y-this.tipsView.height*2;
				if(this.tipsView.y<0){
					this.tipsView.y=pos.y;
				}
				if((this.tipsView.y+this.tipsView.height)>this.stage.stageHeight){
					this.tipsView.y=pos.y-(this.tipsView.height+50);
				}
				if(this.tipsView.x<0){
					this.tipsView.x=pos.x+50
				}
				if((this.tipsView.x+this.tipsView.width)>this.stage.stageWidth){
					this.tipsView.x=pos.x-(this.tipsView.width+50);
				}
			}
		}
		public removeTips():void
		{
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.removeTips,this);
			var parent:DisplayObjectContainer=this.tipsView.parent;
			if(parent!=null){
				parent.removeChild(this.tipsView);
				this.tipsView=null;
			}
		}
	}
	export class MoonEvent extends egret.EventDispatcher
	{
		//button event
		public static readonly MOUSE_OVER:string="event-over";
		public static readonly MOUSE_OUT:string="event-out";
		public static readonly MOUSE_DOWN:string="event-down";
		public static readonly MOUSE_MOVE:string="event-move";
		public static readonly MOUSE_UP:string="event-up";
		public static readonly CLICK:string="event-click";
		
		//tabbar event
		public static readonly CHANGE:string="change";
		public static readonly COMPLETE:string="complete";
		public static readonly RENDER_COMPLETE:string="render complete";
		public static readonly UPDATE:string="update";
		public static readonly START:string="start";
		public static readonly MOVE:string="move";
		public static readonly OVER:string="over";
		public static readonly PAUSE:string="pause";
		public static readonly OPEN:string="open";
		public static readonly CLOSE:string="close";
		
		public currentTarget:Object;
		public type:string;
		public data:Object;
		public dataType:Object;
		public constructor(type:string="",data:Object=null,currentTarget:Object=null)
		{
			super();
			this.type=type;
			this.data=data;
			this.currentTarget=currentTarget;
		}
	}
	export class MoonDisplayObject extends Sprite
	{
		private _type:string=Const.SHAPE_RECT;
		private _color:number=0;
		private _data:any;
		private _hasBg:boolean;
		private display:Sprite;
		private bg:Sprite;
		public constructor()
		{
			super();
			this.display=new Sprite;
			this.bg=new Sprite;
		}
		set type(value:string){this._type=value}
		get type():string{return this._type}
		set color(value:number){this._color=value;this._data.c=value;this.draw();}
		get color():number{return this._color}
		/**{w:1,h:1,r:1,c:1,ew:1,eh:1} */
		set data(value:Object){this._data=value;this.draw();}
		protected draw():void
		{
			this._color=this._data.c;
			this.display.graphics.clear();
			this.display=this.getDisplay(this._data);
			this.addChild(this.display);
			this.setPosition();
		}
		protected setPosition():void
		{
			if(this._hasBg&&this.type!=Const.SHAPE_CIRCLE){
				this.display.x=(this.bg.width-this.display.width)>>1;
				this.display.y=(this.bg.height-this.display.height)>>1;
			}
		}
		public setBackground(color:number,side:number=1)
		{
			this._hasBg=true;
			var d:any=this._data;
			var o:any={};
			for(var i in d){
				o[i]=d[i];
			}
			o.c=color;
			if(o.w) o.w=o.w+side*2;
			if(o.h) o.h=o.h+side*2;
			if(o.r) o.r=o.r+side;
			this.bg.graphics.clear();
			this.bg=this.getDisplay(o);
			this.addChildAt(this.bg,0);
			this.setPosition();
		}
		protected getDisplay(o:any):Sprite
		{
			switch(this.type){
				case Const.SHAPE_RECT:
				return MoonUI.getRect(o.w,o.h,o.c);
				case Const.SHAPE_RECT_ROUND:
				return MoonUI.getRoundRect(o.w,o.h,o.c,o.ew,o.eh);
				case Const.SHAPE_CIRCLE:
				return MoonUI.getCircle(o.r,o.c);
			}
		}
	}
    export class MoonContainer extends DisplayObjectContainer
	{
		private dataEvent:Object=new Object;
		protected stageWidth:number;
		protected stageHeight:number;
        public constructor()
        {
            super();
            this.init();
			this.once(egret.Event.ADDED_TO_STAGE,this.addToStage,this);
        }
        private addToStage():void
        {
            this.render();
        }
        /**加载到舞台之前调用 */
        protected init():void
        {

        }
        /**加载到舞台之后调用 */
        protected render():void
        {
			this.stageWidth=this.stage.stageWidth;
			this.stageHeight=this.stage.stageHeight;
        }
		/**发布事件*/
		public dispEvent(type:string,data:Object=null,dataType:Object=null):void
		{
			if(this.dataEvent){
				var fun:Function=this.dataEvent[type] as Function;
				if(fun!=null){
					var moonEvent:MoonEvent=new MoonEvent;
					moonEvent.currentTarget=this;
					moonEvent.data=data;
					moonEvent.type=type;
					moonEvent.dataType=dataType;
					if(fun["this"]){
						(<Function>fun).apply(fun["this"],[moonEvent]);
					}else{
						fun(moonEvent)
					}
				}
			}
		}
		/**帧听事件*/
		public addEvent(type:string, listener:Function,thisObj:any=null):void
		{
			if(this.dataEvent&&this.dataEvent[type]==null){
				listener["this"]=thisObj
				this.dataEvent[type]=listener;
			}
		}
		/**删除事件*/
		public removeEvent(type:string, listener:Function):void
		{
			if(this.dataEvent&&this.dataEvent[type]){
				delete this.dataEvent[type];
			}
		}
		/**把自己从父级删除*/
		public removeFromParent(value:Boolean=false):void
		{
			var _parent:DisplayObjectContainer=this.parent as DisplayObjectContainer;
			if(value)		this.dispose();
			if(_parent&&_parent.contains(this))		_parent.removeChild(this);
			_parent=null;
		}
		/**删除所有的*/
		public removeChildAll(beginIndex:number=0, endIndex:number=2147483647,dispose:Boolean=false):void
		{
			if (endIndex < 0 || endIndex >= this.numChildren) 
				endIndex = this.numChildren - 1;
			
			for (var i:number=beginIndex; i<=endIndex; ++i)
				this.removeChildIndex(beginIndex, dispose);
		}
		/**删除index层的*/
		public removeChildIndex(beginIndex:number, dispose:Boolean):void
		{
			if (beginIndex >= 0 || beginIndex < this.numChildren){ 
				var basicContent:MoonContainer=this.getChildAt(beginIndex) as MoonContainer;
				if(basicContent instanceof MoonContainer){
					basicContent.removeFromParent(dispose);
				}else{
					var display:DisplayObject=this.getChildAt(beginIndex) as DisplayObject;
					if(display.parent)	display.parent.removeChild(display);
				}
				
			}
		}
		/**销毁*/
		public dispose():void
		{
			this.removeChildAll(0,-1,true);
			this.dataEvent=null;
			this.stageWidth=null;
			this.stageHeight=null;
		}
    }
	export class BasicView extends MoonContainer
	{
		protected createText(x:number=0,y:number=0,s:string=""):TextField
		{
			var text:TextField=(new Label).textField;
			text.x=x;text.y=y;text.text=s;
			this.addChild(text);
			return text;
		}
		protected createRect(w:number,h:number,c:number=0,x:number=0,y:number=0):Sprite
		{
			var sprite:Sprite=moon.MoonUI.getRect(w,h,c,x,y);
			this.addChild(sprite);
			return sprite;
		}
		protected createCircle(r:number,c:number=0,x:number=0,y:number=0):Sprite
		{
			var sprite:Sprite=moon.MoonUI.getCircle(r,c,x,y);
			this.addChild(sprite);
			return sprite;
		}
		protected createRectBySprite(s:Sprite,w:number,h:number,c:number=0,x:number=0,y:number=0):void
		{
			s.graphics.clear();
			s.graphics.beginFill(c);
			s.graphics.drawRect(x,y,w,h);
			s.graphics.endFill();
		}
		/**创建纯色背景 */
		protected createBackground(c:number=0):Sprite
		{
			return this.createRect(this.stageWidth,this.stageHeight,c)
		}
		/**创建渐变色背景 */
		protected createBgGradientFill(c1:number=0X017AC3,c2:number=0XDDDDDD):Sprite
		{
			var w:number=this.stageWidth;
			var h:number=this.stageHeight;
			var matrix:egret.Matrix = new egret.Matrix();
			matrix.createGradientBox(w,h,Math.PI/2);
			var sprite:Sprite=new Sprite;
			sprite.graphics.beginGradientFill(egret.GradientType.LINEAR,[c1,c2],[1,1],[0,255],matrix);
			sprite.graphics.drawRect(0,0,w,h);
			this.addChild(sprite);
			return sprite;
		}
	}
	export class GameView extends BasicView
	{
		protected isPlay:boolean;
		protected play():void
		{
			this.stop();
			this.isPlay=true;
			egret.startTick(this.loop, this);
		}
		protected stop():void
		{
			this.isPlay=false;
			egret.stopTick(this.loop, this);
		}
		protected loop(n:number):boolean
		{
			traceSimple(n);
			return true;
		}
		protected createButton(name:string,x:number=0,y:number=0):moon.BasicButton
		{
			var btn:moon.BasicButton=new moon.BasicButton
			btn.label=name;btn.x=x;btn.y=y;
			this.addChild(btn);
			return btn;
		}
	}
	/**九宫格*/
	export class Scale9Image extends Bitmap
	{
		public constructor(name:string,rect:Rectangle=null)
        {
            super();
			if(RES.hasRes(name)){
				this.texture = RES.getRes(name);
				this.scale9Grid=rect||new Rectangle(8,8,2,2);
			}else{
				 egret.error("找不到资源："+name);
			}
		}
	}
	export class BasicTips extends MoonContainer
	{
		protected image:Scale9Image;
		protected text:TextField;
		public side:number=14;//文字离边框的距离
		public lineSpacing:number=4;//行间距
		public constructor(skinName:string)
        {
            super();
			this.image=new Scale9Image(skinName);
			this.addChild(this.image);

			this.text=(new Label).textField;
			this.text.textAlign = egret.HorizontalAlign.CENTER;
			this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.text.lineSpacing=this.lineSpacing;
			this.addChild(this.text);
		}
		/**设置普通文字*/
		public setValue(value:string):void
		{
			this.text.text=value;
			this.setCenter();
		}
		/**设置富文字 {text:"string",style:{"size":50,"textColor":0}}*/
		public setTextFlow(textFlow:egret.ITextElement[]):void
		{
			this.text.textFlow=textFlow;
			this.setCenter();
		}
		protected setCenter():void
		{
			var image:Scale9Image=this.image;
			var text:TextField=this.text;
			var side:number=this.side;
			var w:number=text.width+side;
			var h:number=text.height+side;
			image.width=w;
			image.height=h;
			text.x=text.y=side>>1;
		}
	}
	export class Label extends MoonContainer
	{
		private text:TextField;
		public constructor(str:string="",c:number=0XFFFFFF)
        {
			super();
			this.text=new TextField;
			this.text.textAlign = egret.HorizontalAlign.LEFT;
			this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
			this.text.text=str;
			this.text.textColor=c;
			this.text.fontFamily=moon.FONT.fontName;
			this.addChild(this.text);
		}
		get textField():TextField
		{
			return this.text;
		}
	}
	export class BasicButton extends MoonContainer implements IOnoff
	{
		protected statusNormal:DisplayObject;
		protected statusDown:DisplayObject;
		protected skinContainer:DisplayObjectContainer;
		protected text:TextField;
		/**皮肤大小随字体大小变化 */
		public skinAutoScale:boolean=true;
		public constructor(normal:DisplayObject=null,down:DisplayObject=null)
        {
			super();
			this.statusNormal=normal||Skin.buttonNormal;
			this.statusDown=down||Skin.buttonDown;
			this.skinContainer=new DisplayObjectContainer;
			this.addChild(this.skinContainer);
			this.updateSkin(this.statusNormal);
			this.text=(new Label).textField;
			this.addChild(this.text);

			this.open();
		}
		public open():void
		{
			this.close();
			this.touchEnabled=true;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
		}
		public close():void
		{
			this.touchEnabled=false;
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
			if(this.stage) this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
		}
		public setLabelPoint(x:number,y:number):void
		{
			this.text.anchorOffsetX=0;
			this.text.anchorOffsetY=0;
			this.text.x=x;this.text.y=y;
		}
		set labelCircle(value:string)
		{
			this.text.text=value;
			this.skinAutoScale=false;
			this.text.x=this.text.y=0;
			this.text.anchorOffsetX=this.text.textWidth>>1;
			this.text.anchorOffsetY=this.text.textHeight>>1;
		}
		set labelColor(value:number)
		{
			this.text.textColor=value;
		}
		set label(value:string)
		{
			this.text.text=value;
			var width:number=this.text.width+20;
			this.setSkinSize();
			this.setTextPosition();
		}
		get label():string
		{
			return this.text.text;
		}
		get textFild():TextField
		{
			return this.text;
		}
		/**设置富文字 {text:"string",style:{"size":50,"textColor":0}}*/
		public setTextFlow(textFlow:egret.ITextElement[]):void
		{
			this.text.textFlow=textFlow;
			this.setSkinSize();
			this.setTextPosition();
		}
		public setSkinNormal():void
		{
			this.updateSkin(this.statusNormal);
		}
		public setSkinDown():void
		{
			this.updateSkin(this.statusDown);
		}
		protected onTouch(e:egret.TouchEvent):void
		{
			if(e.type==egret.TouchEvent.TOUCH_BEGIN){
				this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
				this.updateSkin(this.statusDown);
			}else{
				this.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouch,this);
				this.updateSkin(this.statusNormal);
			}										
		}
		protected get textWidth():number
		{
			return this.text.width+20;
		}
		protected get textHeight():number
		{
			return this.text.height+20;
		}
		protected setSkinSize():void
		{
			if(this.skinAutoScale&&this.text.text!=""){
				var scale:number=this.textWidth/this.statusNormal.width;
				if(this.statusNormal instanceof Bitmap){
					this.statusNormal.width=this.textWidth;
					this.statusDown.width=this.textWidth;
				}else{
					this.statusNormal.scaleX=this.statusDown.scaleX=scale;
				} 
				var height:number=this.textHeight;
				if(height>=this.statusNormal.height){
					scale=height/this.statusNormal.height;
					if(this.statusNormal instanceof Bitmap){
						this.statusNormal.height=this.textHeight;
						this.statusDown.height=this.textHeight;
					}else{ 
						this.statusNormal.scaleY=this.statusDown.scaleY=scale;
					}
				}
			}
		}
		protected setTextPosition():void
		{
			this.text.anchorOffsetX=this.text.width>>1;
			this.text.anchorOffsetY=this.text.height>>1;
			if(this.textWidth>this.statusNormal.width)		this.text.x=this.textWidth>>1;
			else											this.text.x=this.statusNormal.width>>1;
			if(this.textHeight>this.statusNormal.height)	this.text.y=this.textHeight>>1;
			else											this.text.y=this.statusNormal.height>>1;
		}
		protected updateSkin(skin:DisplayObject):void
		{
			this.skinContainer.removeChildren();
			this.skinContainer.addChild(skin);
		}
		public dispose():void
		{
			this.close();
			super.dispose();
		}
	}
	/**类似多个皮肤按钮,构造函数的参数必须大于2个且必须是2的次方
	 * 使用四个皮肤就可以模拟ToggleSwitch了
	*/
	export class MoreSkinButton extends BasicButton
	{
		protected _currentPage:number=0;
		protected skins:any[];
		protected _toggleSwitch:Boolean;
		public constructor(skins:any[])
        {
			super(skins[0],skins[1]);
			this.skins=skins;
		}
		set currentPage(value:number)
		{
			value=value*2==this.skins.length?0:value;
			this._currentPage=value;
			this.statusNormal=this.skins[value*2];
			this.statusDown=this.skins[(value*2)+1];
			this.setSkinSize();
		}
		get currentPage():number
		{
			return this._currentPage;
		}
		set toggleSwitch(value:Boolean)
		{
			this._toggleSwitch=value;
		}
		protected onTouch(e:egret.TouchEvent):void
		{
			if(e.type==egret.TouchEvent.TOUCH_END){
				if(this._toggleSwitch){
					this.currentPage=1-this.currentPage;
				}
			}
			super.onTouch(e);								
		}
	}
	/**基础的组件类*/
	export class BasicBar extends BasicView implements IItem
	{
		protected items:any[]=[];
		protected index:number=0;
		public addItem(item:DisplayObject):void
		{
			this.items.push(item);
		}
		public removeItem(item:DisplayObject):void
		{
			var index:number=this.items.indexOf(item);
			if(index>=0) this.items.splice(index,1);
		}
		public hasItem(index:number):boolean
		{
			return this.items.length>0&&(index>=0&&index<this.items.length);
		}
		public getItem(index:number):DisplayObject
		{
			return this.items[index];
		}
		public getNextItem():DisplayObject
		{
			return this.items[this.index++]; 
		}
		public reset():void
		{
			this.index=0;
		}
		public update():void
		{

		}
		/**销毁*/
		public dispose():void
		{
			this.reset();
			while(this.hasItem(this.index)){
				var item:DisplayObject=this.getItem(this.index) as DisplayObject;
				this.removeItem(item);
				if(item instanceof MoonContainer){
					item.removeFromParent(true);
				}
			}
		}
	}
	/***进度条 */
	export class ProgressBar extends MoonContainer
	{
		protected skinBg:DisplayObject;
		protected skinValue:DisplayObject;
		protected text:TextField;
		protected _value:number=0;
		public constructor(bg:DisplayObject=null,value:DisplayObject=null)
        {
			super();
			this.setSkin(bg,value);
			this.addChild(this.skinBg);
			this.addChild(this.skinValue);
			this.text=(new Label).textField;
			this.addChild(this.text);
		}
		protected setSkin(bg:DisplayObject=null,value:DisplayObject=null)
        {
			this.skinBg=bg||Skin.progressBackground;
			this.skinValue=value||Skin.progressValue;
		}
		/**值只能是0－1之间 */
		set value(v:number)
		{
			v=v<0?0:v>1?1:v;
			this._value=v;
			this.skinValue.scaleX=v;
		}
		get value():number
		{
			return this._value;
		}
		public showText(v:string,x:number=-1,y:number=-1):void
		{
			this.text.text=v;
			if(x==-1)		this.text.x=(this.skinBg.width-this.text.width)>>1
			else			this.text.x=x;
			if(y==-1)		this.text.y=this.skinBg.height+5;
			else			this.text.y=y;
		}
	}
	/***滑动器 */
	export class SliderBar extends ProgressBar implements ILayout
	{
		protected skinBar:DisplayObject;
		protected type:string;
		public constructor(bg:DisplayObject=null,value:DisplayObject=null,bar:DisplayObject=null)
        {
			super(bg,value);
			this.skinBar=bar||Skin.sliderBar;
			this.addChild(this.skinBar);
			this.skinBar.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
			this.skinBar.touchEnabled=true;
			this.layout();
			this.value=1;
		}
		protected setSkin(bg:DisplayObject=null,value:DisplayObject=null)
        {
			this.skinBg=bg||Skin.sliderBackground;
			this.skinValue=value||Skin.sliderValue;
		}
		protected onTouch(e:egret.TouchEvent):void
		{
			switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
					this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.dispEvent(MoonEvent.START);
                    break;
				case egret.TouchEvent.TOUCH_MOVE:
					this.moveDo(e.stageX,e.stageY);
					this.dispEvent(MoonEvent.MOVE);
				break;
                case egret.TouchEvent.TOUCH_END:
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.dispEvent(MoonEvent.OVER);
                    break;
            }
		}
		protected moveDo(x:number,y:number):void
		{
			var p:Point=this.globalToLocal(x,y);
			var v:number;
			if(this.type==Const.HORIZONTAL)	v=p.x/this.skinValue.width;
			else							v=-p.y/this.skinValue.width;
			this.value=v;
		}
		/**值只能是0－1之间 */
		set value(v:number)
		{
			v=v<0?0:v>1?1:v;
			this._value=v;
			this.skinValue.scaleX=v;
			if(this.type==Const.HORIZONTAL)	this.skinBar.x=this.skinValue.width*v;
			else							this.skinBar.y=-this.skinValue.width*v;
		}
		get value():number
		{//get 方法竟然是不能继承的，这个得注意了。
			return this._value;
		}
		/**横竖版布局，默认是横版布局 */
		public layout(type:string=Const.HORIZONTAL,interval:number=0):void
		{
			this.type=type
			if(type==Const.VERTICAL){
				var angle=-90;
				this.skinBar.x=this.skinValue.height>>1;
			}else{
				var angle=0;
				this.skinBar.y=this.skinValue.height>>1;
			}
			this.skinBg.rotation=angle;
			this.skinValue.rotation=angle;
		}
	}
	/***滚动条 */
	export class ScrollBar extends MoonContainer implements ILayout
	{
		protected skinBar:DisplayObject;
		protected _target:DisplayObject;
		protected maskRect:DisplayObject;
		protected type:string;
		protected startPos:Point;
		protected stPos:Point;
		protected startTime:number;
		public constructor(bar:DisplayObject=null)
        {
			super();
			this.skinBar=bar||Skin.scrollBar;
			this.skinBar.alpha=0;
			this.addChild(this.skinBar);
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouch,this);
			this.touchEnabled=true;
			this.startPos=new Point;
			this.stPos=new Point;
			this.setSize();
			this.layout();
		}
		protected onTouch(e: egret.TouchEvent){
			
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
					this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.stPos.x=e.stageX;
					this.stPos.y=e.stageY;
					this.startPos.x=e.stageX-this._target.x;
					this.startPos.y=e.stageY-this._target.y;
					this.hideShow(1);
					this.startTime=egret.getTimer();
                    break;
				case egret.TouchEvent.TOUCH_MOVE:
					this.moveDo(e.stageX,e.stageY);
				break;
                case egret.TouchEvent.TOUCH_END:
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
					this.hideShow(0,100);
					this.timeMove(e.stageX,e.stageY);
                    break;
            }
        }
		//缓动动画
		protected timeMove(x:number,y:number):void
		{
			var time:number=egret.getTimer()-this.startTime;
			if(time<500){
				var target:DisplayObject=this._target;
				var maskRect:DisplayObject=this.maskRect;
				Tween.removeTweens(target);
				var dx:number=x-this.stPos.x;
				var dy:number=y-this.stPos.y;
				var distance:number=Math.sqrt(dx*dx+dy*dy);
				var value:number=(distance/time)*100;
				var tw:Tween=Tween.get(target);
				if(this.type==Const.VERTICAL){
					var sign:number=dy>0?1:-1;
					value*=sign;
					var h:number=target.y+value;
					if(h>0&&target.y+value>0) h=0;
					if(h<0&&target.y+value<(maskRect.height-target.height)) h=maskRect.height-target.height;
					tw.to({y:h},400,Ease.sineOut).call(this.setBarPos,this);
				}else{
					var sign:number=dx>0?1:-1;
					value*=sign;
					var w:number=target.x+value;
					if(w>0&&target.x+value>0) w=0;
					if(w<0&&target.x+value<(maskRect.width-target.width)) w=maskRect.width-target.width;
					tw.to({x:w},400,Ease.sineOut).call(this.setBarPos,this);
				}
				
			}
		}
		protected setBarPos():void
		{
			if(this.type==Const.VERTICAL)
				this.skinBar.y=-this._target.y/(this._target.height-this.maskRect.height)*(this.maskRect.height-this.skinBar.height);
			else
				this.skinBar.x=-this._target.x/(this._target.width-this.maskRect.width)*(this.maskRect.width-this.skinBar.width);
		}
		protected hideShow(alpha:number,time:number=1000):void
		{
			Tween.removeTweens(this.skinBar);
			if(alpha==1){
				this.skinBar.alpha=1;
			}
			var tw:Tween=Tween.get(this.skinBar);
			tw.to({alpha:alpha},time);
		}
		protected moveDo(x:number,y:number):void
		{
			if(this.type==Const.VERTICAL){
				this.canMoveY(y);
			}else if(this.type==Const.HORIZONTAL){
				this.canMoveX(x);
			}
		}
		protected canMoveX(x:number):void
		{
			var dis:number=this.maskRect.width-this._target.width;
			var xx=x-this.startPos.x;
			if(xx>dis&&xx<0){
				this._target.x=xx;
				this.skinBar.x=-xx/(this._target.width-this.maskRect.width)*(this.maskRect.width-this.skinBar.width);
			}
		}
		protected canMoveY(y:number):void
		{
			var dis:number=this.maskRect.height-this._target.height;
			var yy=y-this.startPos.y;
			if(yy>dis&&yy<0){
				this._target.y=yy;
				this.skinBar.y=-yy/(this._target.height-this.maskRect.height)*(this.maskRect.height-this.skinBar.height);
			}
		}
		protected setMask():void
		{
			if(this.maskRect!=null&&this._target!=null){
				this._target.mask=this.maskRect;
			}
		}
		protected setSkinBarPos():void
		{
			this.skinBar.x=this.skinBar.y=0;
			if(this.type==Const.VERTICAL){
				this.skinBar.x=this.maskRect.width-this.skinBar.width;
			}else if(this.type==Const.HORIZONTAL){
				this.skinBar.y=this.maskRect.height-this.skinBar.height;
			}
		}
		public layout(type:string=Const.VERTICAL,interval:number=0):void
		{
			this.type=type;
			this.setSkinBarPos();
		}
		public setSize(w:number=200,h:number=200):void
		{
			this.maskRect=MoonUI.getRect(w,h);
			this.addChild(this.maskRect);
			this.setMask();
			this.setSkinBarPos();
		}
		set target(value:DisplayObject)
		{
			this._target=value;
			this.addChildAt(this._target,0);
			this.setMask();
		} 
	}
	/**复选框按钮 */
	export class CheckBoxBar extends BasicBar implements ILayout
	{
		public addItemLabel(label:string,item:MoreSkinButton=null):void
		{
			if(item==null)		item=Skin.getCheckBox(label);
			else				item.label=label;
			this.addItem(item)
		}
		public addItem(item:BasicButton):void
		{
			super.addItem(item);
			item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
			this.addChild(item);
		}
		public removeItem(item:BasicButton):void
		{
			super.removeItem(item);
			item.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);
			item.removeFromParent(true);
		}
		protected onClick(e:egret.TouchEvent):void
		{
			var item:MoreSkinButton=e.currentTarget as MoreSkinButton;
			this.dispEvent(moon.MoonEvent.CHANGE);
		}
		/**布局 type类型为横或竖，interval为对象间的间隔*/
		public layout(type:string=Const.VERTICAL,interval:number=10):void
		{
			for(var i:number=0;i<this.items.length;i++){
				var item:DisplayObject=this.items[i];
				if(type==Const.VERTICAL) item.y=(item.height+interval)*i;
				else					 item.x=(item.width+interval)*i;
			}
		}
		public get selectIndexs():number[]
		{
			var nums:number[]=[];
			for(var i:number=0;i<this.items.length;i++){
				var btn:MoreSkinButton=this.items[i] as MoreSkinButton;
				if(btn.currentPage==1) nums.push(i);
			}
			return nums;
		}
	}
	/**复选框按钮 */
	export class TabbarBar extends CheckBoxBar
	{
		protected _selectIndex:number=0;
		protected onClick(e:egret.TouchEvent):void
		{
			var curr:MoreSkinButton=e.currentTarget as MoreSkinButton;
			this.selectItem(curr)
		}
		protected selectItem(curr:MoreSkinButton):void
		{
			this.reset();
			while(this.hasItem(this.index)){
				var item:MoreSkinButton=this.getNextItem() as MoreSkinButton;
				item.currentPage=0;
				item.setSkinNormal();
				item.open();
			}
			curr.close();
			curr.currentPage=1;
			curr.setSkinNormal();
			this._selectIndex=this.items.indexOf(curr);
			this.dispEvent(moon.MoonEvent.CHANGE,this._selectIndex);
		}
		set selectIndex(value:number){this._selectIndex=value,this.selectItem(this.getItem(value) as MoreSkinButton)}
		get selectIndex():number{return this._selectIndex}
	}
	/**单选框按钮 */
	export class RadioButtonBar extends CheckBoxBar
	{
		protected _selectIndex:number;
		public isAutoLayout:Boolean=false;
		public addItemLabel(label:string,item:BasicButton=null):void
		{
			if(item==null)				item=Skin.getRodatioButton(label);
			else						item.label=label;
			this.addItem(item)
		}
		protected render():void
		{
			this.update();
		}
		public update():void
		{
			var item:BasicButton;
			if(this.isAutoLayout==true){
				for(var i:number=0;i<this.items.length;i++){
					item=this.items[i];
					item.x=(item.width+10)*i;
				}
			}
		}
		protected onClick(e:egret.TouchEvent):void
		{
			var item:BasicButton=e.currentTarget as BasicButton;
			this.selectIndex=this.items.indexOf(item);
			this.dispEvent(moon.MoonEvent.CHANGE);
		}
		set selectIndex(index:number){
			this._selectIndex=index;
			var item:BasicButton=this.items[index];
			this.items.map(setSkinNormal,this);
			function setSkinNormal(i:BasicButton):void{
				i.setSkinNormal();
			}
			item.setSkinDown();
		}
		get selectIndex(){
			return this._selectIndex;
		}
	}
	/**提示警告框 */
	export class AlertBar extends BasicBar
	{
		private bg:MoonDisplayObject;
		private bgColor:number;
		private text:TextField;
		public constructor(title:string="提示或警告")
        {
			super();
			this.bgColor=Color.gray;
			this.text=(new Label).textField;
			this.text.text=title;
		}
		/**加载到舞台之后调用 */
        protected render():void
        {
			super.render();
			var node:Sprite=this.createBackground(0);
			node.alpha=0.3;
			node.touchEnabled=true
			
			var w:number=this.stageWidth-100;
			var x:number=(this.stageWidth-w)>>1;
			var y:number=(this.stageHeight-w)>>1;
			this.bg=new MoonDisplayObject;
			this.bg.type=Const.SHAPE_RECT_ROUND;
            this.bg.data={w:w,h:w,c:this.bgColor,ew:10,eh:10};
            this.bg.setBackground(0,2);
			this.bg.x=x;this.bg.y=y;
			this.addChild(this.bg);

			var btn:BasicButton=new BasicButton;
			btn.label="确定";
			this.addChild(btn);
			btn.x=(this.stageWidth-btn.width)>>1;
			btn.y=this.bg.y+this.bg.height-100;
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onClick,this);

			this.text.x=(this.stageWidth-this.text.width)>>1;
			this.text.y=this.bg.y+(this.bg.height>>1)-this.text.height;
			this.addChild(this.text);
		}
		private onClick(e:egret.TouchEvent):void
		{
			this.removeFromParent(true);
			this.dispEvent(MoonEvent.CLOSE);
		}
		/**设置背景色 */
		set color(value:number){
			this.bgColor=value;
			if(this.bg)this.bg.color=value;
		};
	}
	/**输入框 */
	export class InputBar extends BasicBar
	{
		private bg:MoonDisplayObject;
		private bgColor:number;
		private text:TextField;
		private inputW:number;
		private inputH:number;
		public constructor(width:number=100,height:number=50)
        {
			super();
			this.text=(new Label).textField;
			this.inputW=width;
			this.inputH=height;
		}
		/**加载到舞台之后调用 */
        protected render():void
        {
			super.render();
			var w:number=this.inputW;
			var h:number=this.inputH;
			this.bg=new MoonDisplayObject;
			this.bg.type=Const.SHAPE_RECT_ROUND;
            this.bg.data={w:w,h:h,c:this.bgColor,ew:10,eh:10};
            this.bg.setBackground(0,2);
			this.addChild(this.bg);

			var side:number=5;
			this.text.x=side;
			this.text.y=side;
			this.text.width=w-side*2;
			this.text.height=h-side*2;
			this.text.type=egret.TextFieldType.INPUT;
			this.addChild(this.text);
		}
		/**设置为多行 */
		public setMultiline():void
		{
			this.text.wordWrap=true;
			this.text.multiline=true;
			this.text.verticalAlign = egret.VerticalAlign.TOP;
		}
		/**设置背景色 */
		set color(value:number){
			this.bgColor=value;
			if(this.bg)this.bg.color=value;
		};
		/**设置最大数量 */
		set maxChars(value:number){this.text.maxChars=value;}
		/**设置输入内容限制（如只输入字母数字 a-zA-Z0-9） */
		set restrict(value:string){this.text.restrict=value}
	}
	/**面板 */
	export class PanelBar extends BasicBar
	{
		protected titleBg:Sprite;
		protected title:TextField;
		protected containerBg:Sprite;
		protected container:MoonContainer;
		protected containerMask:Sprite;
		protected pWidth:number;
		protected pHeight:number;
		protected titleHeight:number=60;
		public constructor(pWidth:number=0,pHeight:number=0)
        {
			super();
			this.pWidth=pWidth;
			this.pHeight=pWidth;
			this.titleBg=new Sprite;
			this.containerBg=new Sprite;
			this.title=(new Label).textField;
			this.container=new MoonContainer;
        }
		/**加载到舞台之后调用 */
        protected render():void
        {
			if(this.pWidth==0&&this.pWidth==0){
				super.render();
			}else{
				this.stageWidth=this.pWidth;
				this.stageHeight=this.pHeight;
			}
			
			this.createRectBySprite(this.titleBg,this.stageWidth,this.titleHeight,moon.Color.titleBackground);
			this.createRectBySprite(this.containerBg,this.stageWidth,this.stageHeight-this.titleHeight,moon.Color.white,0,this.titleHeight);
			this.addChild(this.titleBg);
			this.addChild(this.containerBg);
			this.title.anchorOffsetX=this.title.textWidth>>1;
			this.title.anchorOffsetY=this.title.textHeight>>1;
			this.title.x=this.stageWidth>>1;
			this.title.y=this.titleHeight>>1;
			this.addChild(this.title);
			this.container.y=this.titleHeight;
			this.addChild(this.container);
			this.containerMask=this.createRect(this.stageWidth,this.stageHeight-this.titleHeight,moon.Color.white,0,this.titleHeight);
			this.container.mask=this.containerMask;
			this.touchEnabled=true;//为了阻挡面板下所有事件
			this.dispEvent(MoonEvent.RENDER_COMPLETE);
        }
		public addItem(item:DisplayObject,x:number=0,y:number=0):void
		{
			super.addItem(item);
			if(x!=0)item.x=x;if(y!=0)item.y=y;
			this.container.addChild(item)
		}
		public removeItem(item:DisplayObject):void
		{
			super.removeItem(item);
			if(this.container.contains(item)) this.container.removeChild(item);
		}
		set label(value:string){
			this.title.text=value;
		}
		get label():string{
			return this.title.text;
		}
		set colorTop(c:number){
			var w:number=this.titleBg.width,h:number=this.titleBg.height;
			this.createRectBySprite(this.titleBg,w,h,c);
		}
		set colorBottom(c:number){
			var w:number=this.containerBg.width,h:number=this.containerBg.height;
			this.createRectBySprite(this.containerBg,w,h,c,0,this.titleHeight);
		}
		get windowRect():Rectangle
		{
			var rect:Rectangle=new Rectangle(0,0,this.stageWidth,this.stageHeight);
			return rect;
		}
		get topHeight():number{
			return this.titleHeight;
		}
		public removeAll():void
		{
			this.container.dispose();
		}
	}
	/**多个面板管理 */
	export class PanelMoreManager extends BasicBar implements IOnoff
	{
		protected radioButton:RadioButtonBar=new RadioButtonBar;
		protected container:MoonContainer;
		protected pWidth:number;
		protected pHeight:number;
		protected currentPage:number=0;
		protected posStartX:number=0;
		protected moveItems:PanelBar[]=[];
		protected panelWidth:number;
		public constructor()
        {
			super();
			this.container=new MoonContainer;
			this.addChild(this.container);
			this.radioButton.isAutoLayout=true;
		}
		public open():void
		{
			this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
		}
		public close():void
		{
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
		}
		public update():void
		{
			this.container.removeChildren();
			var itemW:number;
			var itemH:number;
			if(this.items.length>0){
				var item:PanelBar=this.items[0];
				this.container.addChild(item);
				itemW=item.windowRect.width;
				itemH=item.windowRect.height;
				this.panelWidth=itemW;
			}
			var len:number=this.items.length;
			for(var i:number=0;i<len;i++){
				var btn:BasicButton=new BasicButton(moon.Skin.pointNormal,moon.Skin.pointDown);
				this.radioButton.addItem(btn);
			}
			btn=this.radioButton.getItem(0) as BasicButton;
			btn.setSkinDown();
			this.radioButton.x=(itemW-len*22)>>1;
			this.radioButton.y=itemH-20;
			this.addChild(this.radioButton);
		}
		protected render():void
		{
			this.update();
			if(this.items.length>1){
				this.open();
			}
        }
        protected onTouch(e: egret.TouchEvent){
            switch (e.type) {
                case egret.TouchEvent.TOUCH_BEGIN:
					this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.posStartX=e.stageX;
					this.dispEvent(MoonEvent.START)
                    break;
				case egret.TouchEvent.TOUCH_MOVE:
					this.moveDo(e.stageX)
				break;
                case egret.TouchEvent.TOUCH_END:
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouch, this);
					this.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouch, this);
                    this.moveEnd(e.stageX);
                    break;
            }
        }
		protected moveDo(x:number):void
		{
			var disx:number=x-this.posStartX;
			if(Math.abs(disx)>20){
				if(this.moveItems.length==0){
					var item:PanelBar=this.items[this.currentPage];
					var width:number=this.panelWidth;
					this.moveItems.push(item);
					if(this.currentPage==0){
						item=this.items[this.currentPage+1];
						this.container.addChild(item);
						item.x=width;
						this.moveItems.push(item);
					}else if(this.currentPage==this.items.length-1){
						item=this.items[this.currentPage-1];
						this.container.addChild(item);
						item.x=-width;
						this.moveItems.push(item);
					}else{
						item=this.items[this.currentPage-1];
						this.container.addChild(item);
						item.x=-width;
						this.moveItems.push(item);
						item=this.items[this.currentPage+1];
						this.container.addChild(item);
						item.x=width;
						this.moveItems.push(item);
					}
				}
				var boo1:boolean=(this.currentPage==0&&disx>0);
				var boo2:boolean=((this.currentPage==this.items.length-1)&&disx<0)
				if(!boo1&&!boo2){
					this.container.x=disx;
				}
			}
		}
		protected moveEnd(x:number):void
		{
			if(this.container.x==0){
				this.backCall(0);
				return;
			}
			var disx:number=x-this.posStartX;
			var tw:egret.Tween=egret.Tween.get(this.container);
			var currX=this.panelWidth;
			var turnDis:number=this.panelWidth>>2;
			//至少滑动窗口宽的四分之一才可以算翻页
			if(Math.abs(disx)>turnDis){
				currX=this.panelWidth;
				currX*=disx>0?1:-1;
			}else{
				disx=0;
				currX=0;
			}
			var time:number=200;
			tw.to({x:currX},time);
			tw.call(this.backCall,this,[disx]);
		}
		/**结束翻页后的回调函数 */
		protected backCall(disx:number):void
		{
			if(disx>0){
				this.currentPage--;
				this.currentPage=this.currentPage<0?0:this.currentPage;
			}else if(disx<0){
				this.currentPage++;
				this.currentPage=this.currentPage==this.items.length?this.items.length-1:this.currentPage;
			}
			this.container.removeChildren();
			var item:PanelBar=this.items[this.currentPage];
			item.x=0;
			this.container.addChild(item);
			this.radioButton.selectIndex=this.currentPage;
			this.moveItems.length=0;
			this.container.x=0;
			this.dispEvent(MoonEvent.OVER)
		}
		/**销毁*/
		public dispose():void
		{
			super.dispose();
			this.close();
		}
	}
	/**游戏加载模版 */
	export class GameLoad extends moon.GameView
	{
		private txtLoad:TextField;
		private txtName:TextField;
		private progress:Sprite;
		private txtLoadPos:Point;
		private color:number=0XF9AB03;
		private proWidth:number;
		private airFan:Sprite;
		protected render():void
		{
			super.render();
			this.createBgGradientFill();
			var container:Sprite=new Sprite;
			this.addChild(container);
			var sw:number=this.stageWidth;
			var sh:number=this.stageHeight;
			var w:number=80;
			var loadbg:Sprite=MoonUI.getRoundRect(sw-100,w,0XFCE59D,100,100);
			loadbg.x=(sw-loadbg.width)>>1;
			loadbg.y=(sh-loadbg.height)>>1;
			container.addChild(loadbg);

			//--------
			var progress:Sprite=MoonUI.getRect(sw-120,w-10,this.color);
			progress.x=(sw-progress.width)>>1;
			progress.y=(sh-progress.height)>>1;
			container.addChild(progress);
			this.proWidth=progress.width;

			var mask:Sprite=MoonUI.getRoundRect(sw-120,w-10,0,100,100);
			mask.x=(sw-mask.width)>>1;
			mask.y=(sh-mask.height)>>1;
			progress.mask=mask;
			this.progress=progress;
			
			//--------
			var txtbg:MoonDisplayObject=new MoonDisplayObject();
			txtbg.type=moon.Const.SHAPE_CIRCLE
            txtbg.data={r:w/2,c:0XE18E0D};
            txtbg.setBackground(0XFFFFFF,5);
            this.addChild(txtbg);
			txtbg.x=loadbg.x+loadbg.width-w/2;
			txtbg.y=loadbg.y+w/2;
			this.txtLoadPos=new Point(txtbg.x,txtbg.y);
			
			var txtExp:TextField=this.createText(0,0,"");
			txtExp.size=40;
			txtExp.textColor=0xB07300;
			this.txtLoad=txtExp;
			//--------
			var txtTip:TextField=this.createText(0,0,"游戏加载");
			txtTip.size=40;
			txtTip.x=(sw-txtTip.width)>>1;
			txtTip.y=loadbg.y-txtTip.height*2;
			
			var txtName:TextField=this.createText(0,0,"");
			txtName.size=40;
			this.txtName=txtName;
			this.updateName("敬请期待");
			//--------
			this.createAirFan();
			this.airFan.x=txtbg.x;
			this.airFan.y=txtbg.y;

			this.createLogo();
			
			this.update(0);
			this.play();
		}
		protected loop(n:number):boolean
		{
			this.airFan.rotation+=3;
			return true;
		}
		private createAirFan():void
		{
			this.airFan=new Sprite;
			this.addChild(this.airFan);
			for (var i:number=0; i<4; i++)  
			{  
				var shape:Sprite=new Sprite();  
				this.airFan.addChild(shape);  
				shape.graphics.lineStyle(0);  
				shape.graphics.beginFill(0xFFFFFF);  
				shape.graphics.cubicCurveTo(-29,-28,29,-28,0,0);  
				shape.graphics.endFill();  
				shape.rotation = i * 90;  
			}  
		}
		protected createLogo():void
		{
			var sw:number=this.stageWidth;
			var sh:number=this.stageHeight;
			var logo:MoonDisplayObject=new MoonDisplayObject();
			logo.type=moon.Const.SHAPE_CIRCLE;
            logo.data={r:50,c:0XE18E0D};
			logo.setBackground(0XFFFFFF,2);
			logo.x=sw>>1;
			logo.y=logo.height;
			this.addChild(logo);

			var txtName:TextField=this.createText(0,0,"ZL");
			txtName.size=40;
			txtName.x=logo.x-(txtName.width>>1);
			txtName.y=logo.y-(txtName.height>>1)-15;

			txtName=this.createText(0,0,"game");
			txtName.size=30;
			txtName.x=logo.x-(txtName.width>>1);
			txtName.y=logo.y-(txtName.height>>1)+15;

			this.addChild(moon.MoonUI.getHeart(15,0XFFFFFF))
			txtName=this.createText(0,0,"子乐游戏");
			txtName.size=40;
			txtName.textColor=0XE09F21;
			txtName.x=sw-txtName.width-10;
			txtName.y=sh-txtName.height-10;

		}
		/**创建渐变色背景 */
		protected createBgGradientFill(c1:number=0XFDD559,c2:number=0XE09F21):Sprite
		{
			var w:number=this.stageWidth;
			var h:number=this.stageHeight;
			var matrix:egret.Matrix = new egret.Matrix();
			matrix.createGradientBox(w*2,h*2,Math.PI/2);
			var sprite:Sprite=new Sprite;
			sprite.graphics.beginGradientFill(egret.GradientType.RADIAL,[c1,c2],[1,1],[0,255],matrix);
			sprite.graphics.drawRect(0,0,w,h);
			this.addChild(sprite);
			return sprite;
		}
		public updateName(name:string):void
		{
			this.txtName.text=name;
			this.txtName.x=(this.stageWidth-this.txtName.width)>>1;
			this.txtName.y=this.stageHeight/2+this.txtName.height*2;
		}
		public update(value:number):void
		{
			if(value>1) return;
			if(value>0.99) this.stop();
			this.progress.scaleX=value;
			var txtExp:TextField=this.txtLoad;
			var pos:Point=this.txtLoadPos;
			txtExp.text=Math.ceil(value*100)+"%";
			txtExp.x=(this.stageWidth-txtExp.width)>>1;
			txtExp.y=pos.y-txtExp.height/2;
			var exp:Sprite=MoonUI.getCircle(5+Math.random()*5,this.color,pos.x,pos.y);
			exp.y=10-Math.random()*20;
			this.addChildAt(exp,2);
			Tween.get(exp).to({x:-this.proWidth,alpha:0},1000);
		}
	}
}