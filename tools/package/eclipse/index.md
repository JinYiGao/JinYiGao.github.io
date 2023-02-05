# eclipse 安装教程(附安装包资源)


## · 软件介绍
Eclipse 是一个开放源代码的、基于Java的可扩展开发平台。就其本身而言，它只是一个框架和一组服务，用于通过插件组件构建开发环境。幸运的是，Eclipse 附带了一个标准的插件集，包括Java开发工具

## · 软件下载
为了方便大家下载，博主已将eclipse完整安装文件整理至网盘，由于某些原因，分享网盘链接容易失效，到时候一篇篇博文的链接改过来太麻烦了。所以全版本链接统一放在公众号，如有需要的朋友微信搜索关注公众号: 【**呆呆外卖生活助手**】，并在后台回复关键词: 【**VC**】(建议复制)即可。

(特别声明: 安装包获取方式有很多，这一步非必须，大家凭喜好关注即可！)

## · 安装教程

1.鼠标右键解压安装包

![img](https://img.gujin.store/img/v2-ac94f9da3951eb1d43cdf26383f62d66_720w.png)



2.双击打开【Java jdk 1.8】文件夹

![img](https://img.gujin.store/img/v2-24be589a22d6231e45cf90945beea6ce_720w.png)

3.选择与自己电脑位数相同的jdk，32位系统安装jdk-8u144-windows-x32,64位系统安装jdk-8u144-windows-x64，选中jdk-8u144-windows，鼠标右键点击“以管理员身份运行”

![img](https://img.gujin.store/img/v2-088455f85c816799ab16af3c13f03498_720w.png)

4.点击“下一步”

![img](https://img.gujin.store/img/v2-ee32db053df039e77c6191747d40762e_720w.png)

5.选择软件安装路径，点击“下一步”

![img](https://img.gujin.store/img/v2-aa8f79552834c231205a5c0baccb1573_720w.png)

6.点击“下一步”

![img](https://img.gujin.store/img/v2-514e12d4a0dc6e99f3b1567c24274037_720w.png)



7.点击“关闭”

![img](https://img.gujin.store/img/v2-e737495305e23e28b41b8eb4237e1b04_720w.png)

8.选中此电脑，鼠标右键点击“属性”

![img](https://img.gujin.store/img/v2-9b4ff889a59419249af1000455fa333a_720w.png)

9.点击“高级系统设置”

![img](https://img.gujin.store/img/v2-6411ac3c0ba1c9437199ffaa853fe94e_720w.png)

10.点击“环境变量”

![img](https://img.gujin.store/img/v2-38921c33142bd2e939eb405ff054d834_720w.png)

11.在系统变量下，点击“新建”

![img](https://img.gujin.store/img/v2-0c7ab221f36e170e7533e2f1b7034d5c_720w.png)

12.变量名输入：`JAVA_HOME`，变量值输入jdk的安装路径（第一步，第5步设置的路径），点击“确定”

![img](https://img.gujin.store/img/v2-061947ab156a64893337816f0054f651_720w.png)



13.再次在系统变量下，点击“新建”

![img](https://img.gujin.store/img/v2-0c7ab221f36e170e7533e2f1b7034d5c_720w.png)

14.变量名输入：`CLASSPATH`，变量值输入：`.;%JAVA_HOME%\lib\tools.jar;%JAVA_HOME%\lib\dt.jar`,点击“确定”

![img](https://img.gujin.store/img/v2-47e588fe2fe08cc6440a1bef140481e3_720w.png)

15.在系统变量下，选中Path，点击“编辑”

![img](https://img.gujin.store/img/v2-acd0966091d4b6c598d6599d45493253_720w.png)

16.点击编辑文件，点击“确定”

![img](https://img.gujin.store/img/v2-a8555cc7015e2ce852d8c0fdd8ad353f_720w.png)

> 温馨提示：Windows 7系统没有此步骤，忽略该步骤，进行下一步即可。

17.在变量值的最后面加上：`;%JAVA_HOME%\bin`，点击“确定”

![img](https://img.gujin.store/img/v2-2412e53e4edffd8ae4f03ee1d9fbfb3e_720w.png)

18.点击“确定”

![img](https://img.gujin.store/img/v2-ba44e1c3d83c1c1d7053349aa8fb5377_720w.png)

19.点击“确定”

![img](https://img.gujin.store/img/v2-6de78beb8920a164407b965446520fd8_720w.png)

20.按下Windows键+R键，打开运行，输入cmd，点击“确定”

![img](https://img.gujin.store/img/v2-8162e5fce4e658c0819b011d5d5da912_720w.png)

21.输入：java，按下回车，会出现如下图所示的信息

![img](https://img.gujin.store/img/v2-5070fe557e456598b8495d4834781212_720w.png)

22.输入：javac，按下回车，出现如下图所示的信息

![img](https://img.gujin.store/img/v2-d14e5fcfa784ce8a8d3dcaf0f6102c48_720w.png)

> 温馨提示：若22、23步输入的命令，均出现如图所示的信息，说明JDK安装且环境变量配置成功。

23.双击打开【eclipse】文件夹

![img](https://img.gujin.store/img/v2-1e04a036118997d6fb04c4b1ae9dc2c4_720w.png)

24.选中eclipse，鼠标右键发送到，选择“桌面快捷方式”

![img](https://img.gujin.store/img/v2-cddf3de290d3a2c64a80a67775d88586_720w.png)

25.双击图标，打开软件

![img](https://img.gujin.store/img/v2-7f3f7cb2a2471377149b8d4ac55902f5_720w.png)

26.安装结束




> 声明: 
>
> 1. 本篇文章所提供的下载文件均在网络收集，不可用于商业用途，请于下载后24小时之内删除，如需体验更多乐趣，请支持正版！
>
> 2. 欢迎关注公众号：【**呆呆外卖生活助手**】 ，ID:『DDZhuSh』，获取更多生活帮助！
>
> 3. 更多实用软件请  [点我查看](/tools)

---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://gujin.store/tools/package/eclipse/  

