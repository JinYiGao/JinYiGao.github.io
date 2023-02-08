# IDEA 2018 安装教程(附安装包资源)


## · 软件介绍
IDEA 全称 IntelliJ IDEA，是java编程语言开发的集成环境。IntelliJ在业界被公认为最好的java开发工具，尤其在智能代码助手、代码自动提示、重构、J2EE支持、各类版本工具(git、svn等)、JUnit、CVS整合、代码分析、 创新的GUI设计等方面的功能可以说是超常的。

## · 软件下载
为了方便大家下载，博主已将全版本的IDEA完整安装文件整理至网盘，由于某些原因，分享网盘链接容易失效，到时候一篇篇博文的链接改过来太麻烦了。所以全版本链接统一放在公众号，如有需要的朋友微信搜索关注公众号: 【**呆呆外卖生活助手**】，并在后台回复关键词: 【**IDEA**】(建议复制)即可。

(特别声明: 安装包获取方式有很多，这一步非必须，大家凭喜好关注即可！)

![image-20211016221608184](https://img.gujin.store/img/image-20211016221608184.png)

## · 安装教程

**一、JDK的安装**

> 温馨提示：若已经安装好java jdk且已经配置好环境变量，请忽略“一”步，直接进行“二”步。安装包中带的jdk版本为 1.8。

1.鼠标右键解压到“IDEA 2018”

![img](https://img.gujin.store/img/v2-e990c9996aec5a5720b6ee4a5605fa78_720w.png)

2.双击打开【Java jdk 1.8】文件夹

![img](https://img.gujin.store/img/v2-f0dd65f1cfcb6ac75512eb872ae9d57e_720w.png)



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

![img](https://img.gujin.store/img/v2-5b3929ad6207f17670e30cc3f3ec146d_720w.png)

20.按下Windows键+R键，打开运行，输入cmd，点击“确定”

![img](https://img.gujin.store/img/v2-8162e5fce4e658c0819b011d5d5da912_720w.png)

21.输入：java，按下回车，会出现如下图所示的信息

![img](https://img.gujin.store/img/v2-5070fe557e456598b8495d4834781212_720w.png)

22.输入：javac，按下回车，出现如下图所示的信息

![img](https://img.gujin.store/img/v2-d14e5fcfa784ce8a8d3dcaf0f6102c48_720w.png)

> 温馨提示：若22、23步输入的命令，均出现如图所示的信息，说明JDK安装且环境变量配置成功。

**二、IDEA 的安装**

1.双击打开【idea 2018】文件夹

![img](https://img.gujin.store/img/v2-171eb013bda951518785e3355fa447fd_720w.png)

2.选中ideaIU-2018.2.4，鼠标右键点击“以管理员身份运行”

![img](https://img.gujin.store/img/v2-4590d0b57cc6765098fddeb51df9c6df_720w.png)

3.点击“Next”

![img](https://img.gujin.store/img/v2-97780cd014a37103db30cdbc3c428cea_720w.png)

4.可更改软件安装路径，点击“Next”

![img](https://img.gujin.store/img/v2-58eb16a0d8989119b961b78da0bd99e7_720w.png)

5.勾选与计算机系统相对应的位数，64位操作系统选择64-bit launcher，32位操作系统选择32-bit launcher，Create Associations栏目下面的全部勾选，点击“Next”

![img](https://img.gujin.store/img/v2-c2c0af597d7b5aace5bcc97a0a27459d_720w.png)

6.点击“Install”

![img](https://img.gujin.store/img/v2-b8c8a2ed05c2f2ddf949ddd5e18c68b2_720w.png)

7.软件正在安装，请耐心等待

8.点击“Finish”

![img](https://img.gujin.store/img/v2-9ed20441b0c3e73d76b33cbd27cb94a5_720w.png)

9.复制JetbrainsCrack.jar文件

![img](https://img.gujin.store/img/v2-f1650cfe9c4003ed012e2054f3bf39e4_720w.png)



10.选中IDEA的图标，鼠标右键点击“打开文件所在的位置”

![img](https://img.gujin.store/img/v2-8523759e17432cace2a5295a70b733a3_720w.png)

11.将刚刚复制的文件，粘贴到打开的文件夹中

![img](https://img.gujin.store/img/v2-82463c7a85c1c0ee2aacd55dec579126_720w.png)

12.在该目录下找到idea.exe.vmoptions，鼠标右键点击“打开方式”

![img](https://img.gujin.store/img/v2-acf09acdf5623d0e633411b5d3fcc9db_720w.png)



13.选择记事本，点击“确定”

![img](https://img.gujin.store/img/v2-ca597b647a090d9cee9890d70832ee31_720w.png)

14.在文档的尾部加上：`-javaagent:D:\IntelliJ IDEA 2018.2.4\bin\JetbrainsCrack.jar`。其中【D:\IntelliJ IDEA2018.2.4】是软件的安装目录（第二步，第4步设置的路径），然后按下快捷键Ctrl+S保存该文档

![img](https://img.gujin.store/img/v2-55d4e68e36080052b11d453a93a3f1a0_720w.png)

> 温馨提示：其中【D:\IntelliJ IDEA 2018.2.4】是软件的安装目录（第二步，第4步设置的路径）。请根据自己设置的路径更改。

15.以同样的方法编辑idea64.exe.vmoptions

![img](https://img.gujin.store/img/v2-3d0a851b0b40d7cf307bc38022538fe7_720w.png)

16.在文档的尾部加上：`-javaagent:D:\IntelliJ IDEA 2018.2.4\bin\JetbrainsCrack.jar`。其中【D:\IntelliJ IDEA 2018.2.4】是软件的安装目录（第二步，第4步设置的路径），然后按下快捷键Ctrl+S保存该文档

![img](https://img.gujin.store/img/v2-083743e0d1ec5528a99040e67e39c215_720w.png)

17.双击图标，打开软件

![img](https://img.gujin.store/img/v2-187d4fe24b627bfe4a4a8b0beb6ec5f8_720w.png)

18.点击“OK”

![img](https://img.gujin.store/img/v2-454bf73a3cbf4bad6059288bf0cb2232_720w.png)

19.点击“Skip Remaining and Set Defaults”

![img](https://img.gujin.store/img/v2-30f2fa8885902610ccd45a016ea803e1_720w.png)

20.选择“Activation code”

![img](https://img.gujin.store/img/v2-c1f1cb2fa343471938cdadd3f46b411f_720w.png)

21.双击打开Activation code

![img](https://img.gujin.store/img/v2-b27b2c86dbe0f193aee0a5482816aa1a_720w.png)



22.将激活码全部复制并粘贴到Activation code对话框内，点击“OK”

![img](https://img.gujin.store/img/v2-997a4b72930ba5e80312f7f16f59a6d3_720w.png)

23.点击“Create New Project”

![img](https://img.gujin.store/img/v2-39ad93bc8f26dd9a5ba705c12eda1d95_720w.png)

24.点击New选择jdk的安装路径（第一步，第5步设置的路径），点击“Next”

![img](https://img.gujin.store/img/v2-ce93854dc2d948a4a2d213718ad82150_720w.png)

![img](https://img.gujin.store/img/v2-2b2286d044e4172fcc10c5fd20cf9d50_720w.png)

25.点击“Next”

![img](https://img.gujin.store/img/v2-b1ce4654a341c22b9f4925c46a01e718_720w.png)

26.点击“Next”

![img](https://img.gujin.store/img/v2-09cbbedf93669bffbfa5a55cdee61cab_720w.png)

27.取消勾选Show tips on startup，点击“Close”

![img](https://img.gujin.store/img/v2-5d6e468605211dc1062d9c80cd97632a_720w.png)

28.关闭软件，复制resources_cn_IntelliJIDEA_2018.1_r2.jar文件

![img](https://img.gujin.store/img/v2-c0837d20ae4fea7d125c765ec4df7d0f_720w.png)



29.粘贴到软件安装目录（第二步，第4步设置的路径）下的lib文件夹中

![img](https://img.gujin.store/img/v2-e0888ece93b19f94b716f55cee4d425c_720w.png)



30.双击图标，打开软件

![img](https://img.gujin.store/img/v2-6e4b7594ad3c9e50e3c6e22dc4919d04_720w.png)



31.安装结束




> 声明: 
>
> 1. 本篇文章所提供的下载文件均在网络收集，不可用于商业用途，请于下载后24小时之内删除，如需体验更多乐趣，请支持正版！
>
> 2. 欢迎关注公众号：【**呆呆外卖生活助手**】 ，ID:『DDZhuSh』，获取更多生活帮助！
>
> 3. 更多实用软件请  [点我查看](/tools)

---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/tools/package/idea-2018/  

