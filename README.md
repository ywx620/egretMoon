# egretMoon
这是为白鹭引擎制作的一套纯代码的UI方案,用户可以通过修改颜色值得到自己喜欢的主题
此套方案有自己的一套独立moon.MoonEvent事件来管理组件的变化数据
使用时只要用addEvent()来帧听变化就可以得到数据

# 此套方案有一些常用的组件（可独立使用）
# 类文件MoonTheme.ts
* moon.BasicView				基础窗
* moon.BasicButton 			基础按钮（只有两个皮肤）
* moon.MoreSkinButton 	多个皮肤按钮
* moon.RadioButtonBar 	单选框（默认是竖版，可以通过layout方法设置为横版）
* moon.CheckBoxBar			多选框（默认是竖版，可以通过layout方法设置为横版）
* moon.SliderBar				滚动条（默认是竖版，可以通过layout方法设置为横版）
* moon.ProgressBar			进度条（默认是不显示进度的百分比，可以通过showText方法显示）
* moon.PanelBar					面板（有标题栏与内容栏组成）
* moon.TabbarBar				选项（子文件必须是MoreSkinButton）
* moon.PanelMoreManager	面板控制器（可以左右滑动来切换不同面板）
* moon.MoonUI						里面有很多方法可以直接得到Sprite形状，如getRect,getCircle,getRoundRect等等
* moon.LogManager					显示LOG工具提供两种方法log只显示最新的一条,logMessage可显示多条
* moon.TipsManager			TIPS显示管理，如单击按钮可在按钮上方显示一条TIPS说明
* moon.AlertManager			提示管理，提供三种方案，自动，手动，滚动
* moon.MoonEvent				事件管理,提供事件广播dispEvent,事件帧听addEvent,删除事件removeEvent
* moon.Label						统一文本类型字体等
* moon.TabbarBar				tabbar按钮组件
* moon.AlertBar					手动关闭的提示或警告
* moon.AlertAutoBar			自动关闭的提示或警告
* moon.AlertRollBar			滚动关闭的提示或警告
* moon.GameLoad					游戏素材加载时的界面
* moon.GameData					游戏中预先保存数据如,stageWidth,stageHeight
* moon.MoonDisplayObject 可示对象(可修改背景色与边框)

# 图片的管理模块（需要MoonTheme类支持）
# 类文件MoonImage.ts
* moon.Image					  基本的图片管理类
* moon.BasicContainer		基础图片容器（统一的增加删除查找下一个等方法）
* moon.ImageChartlet		图片贴图类（用一张小图拼成一个大的背景图）
* moon.ImageFollow		  图像残影跟随类（当图片运动时后面有残影跟随着）
* moon.ImageAnimation		图片动画类（使用一张张独立图片制作动画的类）
* moon.ImageLayout		  图像布局类（图片上下局中或离舞台上下左右多小像素点）
* moon.ImageLoopPlay    控制图像循环播放（一般用于两张相同的背景一直循环使用）

# 基本小游戏各个模块（需要MoonTheme类支持）
# 类文件MoonGame.ts
* moon.BasicGamePanel		基本的游戏逻辑处理类
* moon.BasicGameStart		基本的游戏开始处理类
* moon.BasicGameOver		基本的游戏结束处理类
* moon.BasicGameSet			基本的游戏设置处理类
* moon.BasicGameRank		基本的游戏分数排名处理类

# 接口
* ILayout 所有设置排版的方法都继承了接口ILayout，接受两个参数type类型与interval间隔
类型提供了两种竖版Const.VERTICAL和横版Const.HORIZONTAL
* IItem 所有需要增加或删除自己子文件的接口都继承此接口
* IOnoff 开关接口

# 其它说明
* MoreSkinButton同一个按钮可以使用多个皮肤,如开始游戏，再来一次等，就可用一个按钮不同皮肤
此外MoreSkinButton可以设置toggleSwitch为true来使用两种状态自动切换
* LogManager使用时先在Main主类中调用一次moon.LogManager.getIns().init(this.stage);
然后可以直接使用trace,与traceSimple来分别调用logMessage方法与log方法
* TipsManager使用时先在Main主类中调用一次moon.TipsManager.getIns().init(this.stage);
然后才可以使用moon.TipsManager.getIns().simpleTips()
* AlertManager使用时先在Main主类中调用一次moon.AlertManager.getIns().init(this.stage);
AlertManager中有三个提示方法alertAuto()可设定几秒自动关闭的提示，alertHand()需要手动点关闭的提示，alertRoll()滚动显示完后再自己动关闭的提示
