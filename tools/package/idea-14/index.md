# IDEA 14 安装教程(附安装包资源)


## · 软件介绍
IDEA 全称 IntelliJ IDEA，是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工具，尤其在智能代码助手、代码自动提示、重构、J2EE支持、各类版本工具(git、svn等)、JUnit、CVS整合、代码分析、 创新的GUI设计等方面的功能可以说是超常的。

## · 软件下载
为了方便大家下载，博主已将全版本的IDEA完整安装文件整理至网盘，由于某些原因，分享网盘链接容易失效，到时候一篇篇博文的链接改过来太麻烦了。所以全版本链接统一放在公众号，如有需要的朋友微信搜索关注公众号: 【**呆呆外卖生活助手**】，并在后台回复关键词: 【**IDEA**】(建议复制)即可。

(特别声明: 安装包获取方式有很多，这一步非必须，大家凭喜好关注即可！)

![image-20211016221608184](https://img.gujin.store/img/image-20211016221608184.png)

## · 安装教程

**一、JDK的安装**

> 温馨提示：若已经安装好java jdk且已经配置好环境变量，请忽略“一”步，直接进行“二”步。安装包中带的jdk版本为 1.8。

1.鼠标右键解压到“IDEA 14”

![img](https://img.gujin.store/img/v2-839873d1cb50ee31c95439abdbb56340_720w.png)

2.双击打开【Java jdk 1.8】文件夹

![img](https://img.gujin.store/img/v2-84c36fcdcd85ff70ac90739afaaa53a5_720w.png)



3.选择与自己电脑位数相同的jdk，32位系统安装jdk-8u144-windows-x32,64位系统安装jdk-8u144-windows-x64，选中jdk-8u144-windows，鼠标右键点击“以管理员身份运行”

![img](https://img.gujin.store/img/v2-088455f85c816799ab16af3c13f03498_720w.png)

4.点击“下一步”

![img](https://img.gujin.store/img/v2-e8a164ab4639d52cd6b67b837e3b7919_720w.png)

5.选择软件安装路径，点击“下一步”

![img](https://img.gujin.store/img/v2-aa8f79552834c231205a5c0baccb1573_720w.png)

6.点击“下一步”

![img](https://img.gujin.store/img/v2-b848204a5cff301ceddb953f1af05b72_720w.png)



7.点击“关闭”

![img](https://img.gujin.store/img/v2-5e137fd25d858a9f46d421d317a9f033_720w.png)

8.选中此电脑，鼠标右键点击“属性”

![img](https://img.gujin.store/img/v2-9b4ff889a59419249af1000455fa333a_720w.png)

9.点击“高级系统设置”

![img](https://img.gujin.store/img/v2-847275cb178ee14caedb6a74941807b9_720w.png)

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

17.在变量值的最后面加上：;%JAVA_HOME%\bin，点击“确定”

![img](https://img.gujin.store/img/v2-2412e53e4edffd8ae4f03ee1d9fbfb3e_720w.png)

18.点击“确定”

![img](https://img.gujin.store/img/v2-ba44e1c3d83c1c1d7053349aa8fb5377_720w.png)

19.点击“确定”

![img](https://img.gujin.store/img/v2-98eb397c91133c66e6d16002f3c32c08_720w.png)

20.按下Windows键+R键，打开运行，输入cmd，点击“确定”

![img](https://img.gujin.store/img/v2-8162e5fce4e658c0819b011d5d5da912_720w.png)

21.输入：java，按下回车，会出现如下图所示的信息

![img](https://img.gujin.store/img/v2-5070fe557e456598b8495d4834781212_720w.png)

22.输入：javac，按下回车，出现如下图所示的信息

![img](https://img.gujin.store/img/v2-d14e5fcfa784ce8a8d3dcaf0f6102c48_720w.png)

> 温馨提示：若22、23步输入的命令，均出现如图所示的信息，说明JDK安装且环境变量配置成功。

**二、IDEA 的安装**

1.双击打开【idea 14】文件夹

![img](https://img.gujin.store/img/v2-08a5252d8a4bdc611b7581c760ad4c3e_720w.png)

2.选中ideaIU-14.1.7，鼠标右键点击“以管理员身份运行”

![img](https://img.gujin.store/img/v2-b3dd08fd243e226a7e7fc15d5b1e8131_720w.png)

3.点击“Next”

![img](https://img.gujin.store/img/v2-ba7e6bbd147efb767eaf42b6db18da9b_720w.png)

4.点击“I Agree”

![img](https://img.gujin.store/img/v2-b27dc1ffa79a33424068e2365efac0af_720w.png)

5.可更改软件安装路径，点击“Next”

![img](https://img.gujin.store/img/v2-f3446c0100bd956529bc260c882e1166_720w.png)



6.全部勾选，点击“Next”

![img](https://img.gujin.store/img/v2-0fad16633b48dec46b1948ca94d29ed2_720w.png)

7.点击“Install”

![img](https://img.gujin.store/img/v2-c7b218861f27eb633e09e92d621687c8_720w.png)

8.软件正在安装，请耐心等待

![img](https://img.gujin.store/img/v2-7da9b15512f284ef3d8ed77a28149f4f_720w.png)

9.点击“Finish”

![img](https://img.gujin.store/img/v2-7a4112e928186a9aa9740891c141ab64_720w.png)

10.双击图标，打开软件

![img](https://img.gujin.store/img/v2-3da8d029c029e5b575a06c3e3da1a447_720w.png)

11.点击“OK”

![img](https://img.gujin.store/img/v2-9dbff2d8779a69df2bb7274b6c2df61e_720w.png)

12.选择“License key”

![img](https://img.gujin.store/img/v2-31b6d9131c6776c4d9bffb6799cfec04_720w.png)

13.name下输入：IDEA，Licese key下输入:61156-YRN2M-5MNCN-NZ8D2-7B4EW-U12L4，点击“OK”

![img](https://img.gujin.store/img/v2-c900575fda8653952b970a3ec6d1076e_720w.png)

14.勾选Accept all terms of the license，然后点击“OK”

![img](https://img.gujin.store/img/v2-2588842cb34ad1215792d0b888c2c769_720w.png)

15.点击“Skip Remaining and Set Defaults”

![img](https://img.gujin.store/img/v2-77616276f5cc10a26fca3252a9a4a58a_720w.png)

16.点击“Create New Project”

![img](https://img.gujin.store/img/v2-456f0d98ba21a7a737540fc98cc27e03_720w.png)

17.点击New选择jdk的安装路径（第一步，第5步设置的路径），点击“Next”

![img](https://img.gujin.store/img/v2-a5a9b22af29be90667005fd5e6cb6ae7_720w.png)

![img](https://img.gujin.store/img/v2-d9bfd7ea5606f00aa3069e6bf37a5504_720w.png)

18.点击“Next”

![img](https://img.gujin.store/img/v2-43f5666b91eecca7eb0170964fb06708_720w.png)

19.点击“Finish”

![img](https://img.gujin.store/img/v2-8bbbf52e35f69e3fbc5aa1a80b5bba4f_720w.png)

20.取消勾选Show tips on startup，点击“Close”

![img](https://img.gujin.store/img/v2-74e5c140bc1c4be18bf9a25205e688ce_720w.png)

21.关闭软件，复制resources_cn.jar文件

![img](https://img.gujin.store/img/v2-c8035fb0763d75631b1ee1eb12fe9330_720w.png)

22.粘贴到软件安装目录（第二步，第5步设置的路径）下的lib文件夹中

![img](https://img.gujin.store/img/v2-586d56660eaa0c6968e2deb94dc52363_720w.png)



23.双击图标，打开软件

![img](https://img.gujin.store/img/v2-40946608437b2996bdde5323358cd5bb_720w.png)



24.安装结束




> 声明: 
>
> 1. 本篇文章所提供的下载文件均在网络收集，不可用于商业用途，请于下载后24小时之内删除，如需体验更多乐趣，请支持正版！
>
> 2. 欢迎关注公众号：【**呆呆外卖生活助手**】 ，ID:『DDZhuSh』，获取更多生活帮助！
>
> 3. 更多实用软件请  [点我查看](/tools)

---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://gujin.store/tools/package/idea-14/  

