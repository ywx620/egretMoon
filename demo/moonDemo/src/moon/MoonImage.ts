var MOON_FTP:number=24;
module moon
{
    /**图像类 */
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
        /**设置锚点在中心 */
        public setAnchorCenter():void
        {
            this.anchorOffsetX=this.width>>1;
            this.anchorOffsetY=this.height>>1;
        }
	}
    /**图像容器类 */
    export class BasicContainer extends Image{
        protected items:any[]=[];
        protected index:number=0;
        protected skinImage:Scale9Image;
        public addItem(item:any):void{
            this.items.push(item);
        }
        public removeItem(index:number):void{
            if(this.hasItem(index)){
                this.items.splice(index,1);
            }
        }
		public getItem(index:number):any{
			return this.items[index];
		}
        public hasItem(index:number):boolean{
			return this.items.length>0&&(index>=0&&index<this.items.length);
		}
		public getNextItem():any{
			return this.items[this.index++]; 
		}
        public get itemsLength():number{return this.items.length}
		public reset():void{
			this.index=0;
		}
    }
    /**图像贴图类 */
    export class ImageChartlet extends BasicContainer implements ILayout{
        public constructor(skinName:string,count:number=1){
            super();
            this.skinName=skinName;
            for(var i:number=0;i<count;i++){
                this.items.push(this.getBitmap());
            }
        }
        protected getBitmap():Scale9Image
        {
            var skin:Scale9Image;
            if(RES.hasRes(this.skinName)){
                skin=new Scale9Image(this.skinName);
                this.addChild(skin);
            }else{
                trace("找不到资源："+this.skinName)
            }
            return skin;
        }
        /**竖排获横排 */
        public layout(type:string,interval:number=0):void
        {
            if(type==Const.VERTICAL)        SimpleLayout.displayRank(this.items,1,interval,interval,0,0);
            else if(type==Const.HORIZONTAL) SimpleLayout.displayRank(this.items,this.items.length,interval,interval,0,0);
        }
        /**多行排列，xNum是一排排几个 */
        public setMultiLine(xNum:number,interval:number=0):void
        {
            SimpleLayout.displayRank(this.items,xNum,interval,interval,0,0);
        }
    }
     /**图像残影跟随 */
    export class ImageFollow extends ImageChartlet{
        protected head:DisplayObject;
        /**跟随速度 */
        public speed:number=4;
        public constructor(skinName:string,count:number=1){
            super(skinName,count);
            this.head=this.items[0];
            this.addChild(this.head);
            this.reset()
            while(this.hasItem(this.index)){
                var item:DisplayObject=this.getNextItem();
                item.alpha=(this.itemsLength-(this.index-1))/this.itemsLength;
            }
            egret.startTick(this.loop,this);
        }
        /**更新位置 */
        public update(x:number,y:number):void{
            this.head.x+=x;
            this.head.y+=y;
        }
        /**循环函数*/
        private loop(num:number):boolean
        {
           
            var len:number=this.items.length-1;
            var endItem=this.items[len];
            if(GameUtils.twoDistance(this.headItem,endItem)>0.1){
                //当头尾间的距离小于0.1时，就不在执行循环跟随。
                var v:number=this.speed;
                for(var i=0;i<len;i++){
                    var item1=this.items[i];
                    var item2=this.items[i+1];
                    item2.x+=(item1.x-item2.x)/v;
                    item2.y+=(item1.y-item2.y)/v;
                }
            }
            return true;
        }
        public get headItem():DisplayObject{return this.head};
    }
    /**图像动画类 */
    export class ImageAnimation extends BasicContainer{
        protected timer:egret.Timer;
        protected _ftp:number=MOON_FTP;
        public loop:boolean;
        public constructor(skinName:string="",start:number,end:number,type:string="png"){
            super();
            for(var i:number=start;i<=end;i++){
                this.items.push(skinName+i+"_"+type);
            }
            this.skinName=this.getItem(0);
            this.addBitmap();
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
                trace("找不到资源："+this.skinName);
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
    /**图像布局类 */
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
        public setCenterX(distance:number=0):void{
            this.image.x=((this.tw-this.image.width)>>1)+distance;
        }
        public setCenterY(distance:number=0):void{
            this.image.y=((this.tw-this.image.width)>>1)+distance;
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