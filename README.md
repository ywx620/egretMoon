# egretMoon
这是为白鹭引擎制作的一套纯代码的UI方案,用户可以通过修改颜色值得到自己喜欢的主题
此套方案有自己的一套独立moon.MoonEvent事件来管理组件的变化数据
使用时只要用addEvent()来帧听变化就可以得到数据

# 此套方案有一些常用的组件如
* moon.BasicView				基础窗
* moon.BasicButton 		基础按钮（只有两个皮肤）
* moon.MoreSkinButton 	多个皮肤按钮
* moon.RadioButtonBar 	单选框（默认是竖版，可以通过layout方法设置为横版）
* moon.CheckBoxBar			多先框（默认是竖版，可以通过layout方法设置为横版）
* moon.SliderBar				滚动条（默认是竖版，可以通过layout方法设置为横版）
* moon.ProgressBar			进度条（默认是不显示进度的百分比，可以通过showText方法显示）
* moon.PanelBar				面板（有标题栏与内容栏组成）
* moon.PanelMoreManager面板控制器（可以左右滑动来切换不同面板）
* moon.MoonUI					里面有很多方法可以直接得到Sprite形状，如getRect,getCircle,getRoundRect等等
* moon.showLog					显示LOG工具提供两种方法log只显示最新的一条,logMessage可显示多条
* moon.TipsManager			TIPS显示管理，如单击按钮可在按钮上方显示一条TIPS说明
* moon.MoonEvent				事件管理,提供事件广播dispEvent,事件帧听addEvent,删除事件removeEvent
* moon.Label						统一文本类型字体等

所有设置排版的方法都继承了接口ILayout，接受两个参数type类型与interval间隔
类型提供了两种竖版Const.VERTICAL和横版Const.HORIZONTAL
MoreSkinButton
		（同一个按钮可以使用多个皮肤,如开始游戏，再来一次等，就可用一个按钮不同皮肤）
		此外MoreSkinButton可以设置toggleSwitch为true来使用两种状态自动切换

