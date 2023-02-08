# IDEA 2017 安装教程(附安装包资源)


## · 软件介绍
IDEA 全称 IntelliJ IDEA，是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工具，尤其在智能代码助手、代码自动提示、重构、J2EE支持、各类版本工具(git、svn等)、JUnit、CVS整合、代码分析、 创新的GUI设计等方面的功能可以说是超常的。

## · 软件下载
为了方便大家下载，博主已将全版本的IDEA完整安装文件整理至网盘，由于某些原因，分享网盘链接容易失效，到时候一篇篇博文的链接改过来太麻烦了。所以全版本链接统一放在公众号，如有需要的朋友微信搜索关注公众号: 【**呆呆外卖生活助手**】，并在后台回复关键词: 【**IDEA**】(建议复制)即可。

(特别声明: 安装包获取方式有很多，这一步非必须，大家凭喜好关注即可！)

![image-20211016221608184](https://img.gujin.store/img/image-20211016221608184.png)

## · 安装教程

**一、JDK的安装**

> 温馨提示：若已经安装好java jdk且已经配置好环境变量，请忽略“一”步，直接进行“二”步。安装包中带的jdk版本为 1.8。

1.鼠标右键解压到“IDEA 2017”

![img](https://img.gujin.store/img/v2-595a766c167bbbe3754f75d14a0ec636_720w.png)

2.双击打开【Java jdk 1.8】文件夹

![img](https://img.gujin.store/img/v2-a30509c07ce5371a6f11377c1e45334e_720w.png)



3.选择与自己电脑位数相同的jdk，32位系统安装jdk-8u144-windows-x32,64位系统安装jdk-8u144-windows-x64，选中jdk-8u144-windows，鼠标右键点击“以管理员身份运行”

![img](https://img.gujin.store/img/v2-088455f85c816799ab16af3c13f03498_720w.png)

4.点击“下一步”

![img](https://img.gujin.store/img/v2-91dcec37a537faa7d92959e733063483_720w.png)

5.选择软件安装路径，点击“下一步”

![img](https://img.gujin.store/img/v2-aa8f79552834c231205a5c0baccb1573_720w.png)

6.点击“下一步”

![img](https://img.gujin.store/img/v2-dab271c8652b98bcd06aa1434a3fd9bf_720w.png)

7.点击“关闭”

![img](https://img.gujin.store/img/v2-4e02bf4e5e23545fd5d752740efde605_720w.png)

8.选中此电脑，鼠标右键点击“属性”

![img](https://img.gujin.store/img/v2-9b4ff889a59419249af1000455fa333a_720w.png)

9.点击“高级系统设置”

![img](https://img.gujin.store/img/v2-1b1959aa41a877ba93ea6558f919d5b5_720w.png)

10.点击“环境变量”

![img](https://img.gujin.store/img/v2-38921c33142bd2e939eb405ff054d834_720w.png)

11.在系统变量下，点击“新建”

![img](https://img.gujin.store/img/v2-0c7ab221f36e170e7533e2f1b7034d5c_720w.png)

12.变量名输入：JAVA_HOME，变量值输入jdk的安装路径（第一步，第5步设置的路径），点击“确定”

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

17.在变量值的最后面加上：;%JAVA_HOME%\bin，点击“确定”

![img](https://img.gujin.store/img/v2-2412e53e4edffd8ae4f03ee1d9fbfb3e_720w.png)

18.点击“确定”

![img](https://img.gujin.store/img/v2-ba44e1c3d83c1c1d7053349aa8fb5377_720w.png)

19.点击“确定”

![img](https://img.gujin.store/img/v2-5b3929ad6207f17670e30cc3f3ec146d_720w.png)

20.按下Windows键+R键，打开运行，输入cmd，点击“确定”

![img](https://img.gujin.store/img/v2-8162e5fce4e658c0819b011d5d5da912_720w.png)

21.输入：java，按下回车，会出现如下图所示的信息

![img](https://img.gujin.store/img/v2-5070fe557e456598b8495d4834781212_720w.png)

22.输入：javac，按下回车，出现如下图所示的信息

![img](https://img.gujin.store/img/v2-d14e5fcfa784ce8a8d3dcaf0f6102c48_720w.png)

> 温馨提示：若22、23步输入的命令，均出现如图所示的信息，说明JDK安装且环境变量配置成功。

**二、IDEA 的安装**

1.双击打开【idea 2017】文件夹

![img](https://img.gujin.store/img/v2-69c78b6fc786b54b020411218c8a88bf_720w.png)

2.选中ideaIU-2017.3.5，鼠标右键点击“以管理员身份运行”

![img](https://img.gujin.store/img/v2-cc9d70ed4c6f472d48f3c97d1b62af3c_720w.png)

3.点击“Next”

![img](https://img.gujin.store/img/v2-97780cd014a37103db30cdbc3c428cea_720w.png)

4.可更改软件安装路径，点击“Next”

![img](https://img.gujin.store/img/v2-b58019dc6351a19f7b791ce028cbcac2_720w.png)

5.勾选与计算机系统相对应的位数，64位操作系统选择64-bit launcher，32位操作系统选择32-bit launcher，Create Associations栏目下面的全部勾选，点击“Next”

![img](https://img.gujin.store/img/v2-c76579968740797cca04825a54787516_720w.png)

6.点击“Install”

![img](https://img.gujin.store/img/v2-103ef1683d64e4477ec1dcd4098fd2b5_720w.png)

7.软件正在安装，请耐心等待

8.点击“Finish”

![img](https://img.gujin.store/img/v2-9ed20441b0c3e73d76b33cbd27cb94a5_720w.png)

9.复制JetbrainsCrack.jar文件

![img](https://img.gujin.store/img/v2-202743c414a882ee9a78617136929282_720w.png)



10.选中IDEA的图标，鼠标右键点击“打开文件所在的位置”

![img](https://img.gujin.store/img/v2-625fc5b210239040396970268799f30e_720w.png)

11.将刚刚复制的文件，粘贴到打开的文件夹中

![img](https://img.gujin.store/img/v2-d862722a96ea1416211bb08efe0fa551_720w.png)

12.在该目录下找到idea.exe.vmoptions，鼠标右键点击“打开方式”

![img](https://img.gujin.store/img/v2-0ce7de19e8f6018acc77142fbd4fad03_720w.png)



13.选择记事本，点击“确定”

![img](https://img.gujin.store/img/v2-2b4f7a75d81acc71bd4fc08301a154c4_720w.png)

14.在文档的尾部加上：`-javaagent:D:\IntelliJ IDEA 2017.3.5\bin\JetbrainsCrack.jar`。其中【D:\IntelliJ IDEA 2017.3.5】是软件的安装目录（第二步，第4步设置的路径），然后按下快捷键Ctrl+S保存该文档

![img](https://img.gujin.store/img/v2-9f783bf3217436cdf415203812f16bdd_720w.png)

> 温馨提示：其中【D:\IntelliJ IDEA 2017.3.5】是软件的安装目录（第二步，第4步设置的路径）。请根据自己设置的路径更改。

15.以同样的方法编辑idea64.exe.vmoptions

![img](https://img.gujin.store/img/v2-619570f9de82ca3073ec042a3ec775b1_720w.png)

16.在文档的尾部加上：`-javaagent:D:\IntelliJ IDEA 2017.3.5\bin\JetbrainsCrack.jar`。其中【D:\IntelliJ IDEA 2017.3.5】是软件的安装目录（第二步，第4步设置的路径），然后按下快捷键Ctrl+S保存该文档

![img](https://img.gujin.store/img/v2-f52883dd6041440719a5f4cdfb152105_720w.png)

17.双击图标，打开软件

![img](https://img.gujin.store/img/v2-878e46245f23946250d8cf040bf7a47c_720w.png)

18.点击“OK”

![img](https://img.gujin.store/img/v2-5bf3a1f212527a1d4d2dccee1fddc69b_720w.png)

19.滑块拉倒底部，点击“Accept”

![img](https://img.gujin.store/img/v2-3ad4a79eb3226e3b75d7cbc25b5d9685_720w.png)

20.选择“Activation code”

![img](https://img.gujin.store/img/v2-838e4c1f511fd8d2090e7bb499898cc7_720w.png)

21.双击打开Activation code

![img](https://img.gujin.store/img/v2-7a54fd952349352b1319c72e0ec51d10_720w.png)



22.将激活码全部复制并粘贴到Activation code对话框内，点击“OK”

![img](https://img.gujin.store/img/v2-77b8870aee6022e0d05f0d532954d30b_720w.png)

23.点击“Skip Remaining and Set Defaults”

![img](https://img.gujin.store/img/v2-b9fca808e66bed96490715874f533b7f_720w.png)

24.点击“Create New Project”

![img](https://img.gujin.store/img/v2-c2481a852229b8a5079dc2743d3c782a_720w.png)

25.点击New选择jdk的安装路径（第一步，第5步设置的路径），点击“Next”

![img](https://img.gujin.store/img/v2-02e85935a4d69f02b739b06f8f81bc50_720w.png)

![img](https://img.gujin.store/img/v2-4217ceec723b814dfcb0118f4e337a29_720w.png)

26.点击“Next”

![img](https://img.gujin.store/img/v2-013d5f7a590938ed26aae4ccabc43a04_720w.png)

27.点击“Finish”

![img](https://img.gujin.store/img/v2-1c352952374c66b6be231762f1fee1ad_720w.png)

28.取消勾选Show tips on startup，点击“Close”

![img](https://img.gujin.store/img/v2-26eee7562fd7edbb4f3aa214ebeb2ff9_720w.png)

29.关闭软件，复制resources_cn_IntelliJIDEA_2017.3.5_r1.jar文件

![img](https://img.gujin.store/img/v2-d2853befa5e0f23e1e3a1955c741ec65_720w.png)



30.粘贴到软件安装目录（第二步，第4步设置的路径）下的lib文件夹中

![img](https://img.gujin.store/img/v2-41d75fc751829592dfef93ad370c4b97_720w.png)



31.双击图标，打开软件

![img](https://img.gujin.store/img/v2-a3277feb961fef25a4bd90594a40006f_720w.png)



32.安装结束




> 声明: 
>
> 1. 本篇文章所提供的下载文件均在网络收集，不可用于商业用途，请于下载后24小时之内删除，如需体验更多乐趣，请支持正版！
>
> 2. 欢迎关注公众号：【**呆呆外卖生活助手**】 ，ID:『DDZhuSh』，获取更多生活帮助！
>
> 3. 更多实用软件请  [点我查看](/tools)

---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/tools/package/idea-2017/  

