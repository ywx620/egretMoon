var MOON_FTP:number=24;
module moon
{
	export class Image extends MoonContainer{
        protected skinName:string;
        protected skinImage:Scale9Image;
        protected position:Point;
        public bgWidth:number;
        public bgHeight:number;
		public constructor(skinName:string="")
        {
            super();
            if(skinName!=""){
                this.skinName=skinName;
                this.position=new Point();
                this.addBitmap();
                this.bgWidth=this.width;
                this.bgHeight=this.height;
            }
        }
        public addBitmap():void
        {
            if(RES.hasRes(this.skinName)){
                this.skinImage=new Scale9Image(this.skinName);
                this.addChild(this.skinImage);
            }else{
                trace("找不到资源："+this.skinName)
                //egret.error("找不到key"+this.skinName);
            }
        }
	}
    export class BasicAnimation extends Image{
        protected items:string[]=[];
        protected index:number=0;
        protected skinImage:Scale9Image;
        public constructor(skinName:string="",start:number,end:number){
            super();
            for(var i:number=start;i<=end;i++){
                this.items.push(skinName+i+"_png");
            }
            this.skinName=this.getItem(0);
            this.addBitmap();
        }
        public hasItem(index:number):boolean
		{
			return this.items.length>0&&(index>=0&&index<this.items.length);
		}
		public getItem(index:number):string
		{
			return this.items[index];
		}
		public getNextItem():string
		{
			return this.items[this.index++]; 
		}
		public reset():void
		{
			this.index=0;
		}
    }
    export class ImageAnimation extends BasicAnimation{
        protected timer:egret.Timer;
        protected _ftp:number=MOON_FTP;
        public loop:boolean;
        public constructor(skinName:string="",start:number,end:number){
            super(skinName,start,end);
            this.createTime();
        }
        protected createTime():void
        {
            if(this.timer==null){
                this.timer=new egret.Timer(1000/this.ftp,0);
                this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
            }
        } 
        protected onTimer():void
        {
            if(this.hasItem(++this.index)){
                this.gotoAndStop(this.index);
            }else{
                if(this.loop){
                    this.reset();
                    this.gotoAndStop(this.index);
                }else{
                    this.timer.stop();
                }
            }
        }
        public gotoAndStop(index:number):void{
            if(this.hasItem(index)){
                this.index=index;
                this.skinName=this.getItem(index);
                this.update();
            }else{
                trace("gotoAndStop的参数请保持在0到"+this.items.length,"当前index="+index)
            }
        }
        public gotoAndPlay(index:number):void{
            this.index=index;
            this.play();
        }
        public play():void{
            this.timer.start();
        }
        public stop():void{
            this.timer.stop();
        }
        public update():void
        {
            if(RES.hasRes(this.skinName)){
                this.skinImage.texture=RES.getRes(this.skinName);
            }else{
                trace("找不到资源："+this.skinName)
            }
        }
        public get currentFrame():number{return this.index}
        public get ftp(){return this._ftp}
        public set ftp(value:number){
            this._ftp=value;
            this.removeTime();
            this.createTime();
        }
        protected removeTime():void
        {
            if(this.timer!=null){
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimer,this);
                this.timer=null;
            }
        }
        public dispose():void
        {
            super.dispose();
            this.removeTime();
        }
    }
    export class ImageLayout{
        private tw:number;
        private th:number;
        private image:DisplayObject;
        private static instance:ImageLayout;
		public static getIns():ImageLayout{
			if(this.instance == null) this.instance = new ImageLayout();
			return this.instance;
		}
        public setImage(image:DisplayObject):void{
            this.image=image;
        }
		public setStageWH(w:number,h:number):void{
            this.tw=w;this.th=h;
        }
        public setTop(distance:number){
            this.image.y=distance;
        }
        public setBottom(distance:number):void{
            this.image.y=this.th-this.image.height-distance;
        }
        public setLeft(distance:number):void{
            this.image.x=distance;
        }
        public setRight(distance:number):void{
            this.image.x=this.tw-this.image.width-distance;
        }
        public setCenterX():void{
            this.image.x=(this.tw-this.image.width)>>1;
        }
        public setCenterY():void{
            this.image.y=(this.th-this.image.height)>>1;
        }
        public setCenterXByPanent(image:DisplayObject):void{
            if(image.parent instanceof Image) image.x=(image.parent.bgWidth-image.width)>>1;
            else image.x=(image.parent.width-image.width)>>1;
        }
        public setCenterYByPanent(image:DisplayObject):void{
            if(image.parent instanceof Image) image.y=(image.parent.bgHeight-image.height)>>1;
            else image.y=(image.parent.height-image.height)>>1;
        }
    }
}