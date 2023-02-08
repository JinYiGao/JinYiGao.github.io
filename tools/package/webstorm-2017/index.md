# WebStrom 2017 安装教程(附安装包资源)


## · 软件介绍
WebStorm 是jetbrains公司旗下一款JavaScript 开发工具。已经被广大中国JS开发者誉为“Web前端开发神器”、“最强大的HTML5编辑器”、“最智能的JavaScript IDE”等。与IntelliJ IDEA同源，继承了IntelliJ IDEA强大的JS部分的功能。

## · 软件下载
为了方便大家下载，博主已将全版本的WebStorm完整安装文件整理至网盘，由于某些原因，分享网盘链接容易失效，到时候一篇篇博文的链接改过来太麻烦了。所以全版本链接统一放在公众号，如有需要的朋友微信搜索关注公众号: 【**呆呆外卖生活助手**】，并在后台回复关键词: 【**WS**】(建议复制)即可。

(特别声明: 安装包获取方式有很多，这一步非必须，大家凭喜好关注即可！)

![image-20211016230827769](https://img.gujin.store/img/image-20211016230827769.png)

## · 安装教程

1.鼠标右键解压到“WebStorm 2017.3.6”

![img](https://img.gujin.store/img/v2-0ed78ad2054002ffa9a1d21ff5646fb7_720w.png)

2.选中WebStorm-2017.3.6，鼠标右击选择“以管理员身份运行”

![img](https://img.gujin.store/img/v2-0243be070f2a6a4fa2bb3f5e97bdbae2_720w.png)

3.点击“Next”

![img](https://img.gujin.store/img/v2-9c3d0b79cf00b2cc9312e7771c01f4d5_720w.png)

4.选择软件安装路径，点击“Next”

![img](https://img.gujin.store/img/v2-86fe4496291e197e44b6c1f8c3ddd4f4_720w.png)

5.勾选与计算机系统相对应的位数，64位操作系统选择64-bit launcher，32位操作系统选择32-bit launcher，勾选Create Associations栏下的内容，勾选Download and install JRE x86 by JetBrains，点击“Next”

![img](https://img.gujin.store/img/v2-b7655774a4f256d42d5b875d6e134d02_720w.png)

6.点击“Install”

![img](https://img.gujin.store/img/v2-c85af73ee93a814496042b3ea971882e_720w.png)

7.软件正在安装，请耐心等待

![img](https://img.gujin.store/img/v2-66e8fb8408e4be0d482d147891935da8_720w.png)

8.点击“Finish”

![img](https://img.gujin.store/img/v2-7f7d3ba0a057006f755421dadefede1b_720w.png)

9.复制JetbrainsCrack.jar文件

![img](https://img.gujin.store/img/v2-13e571880c725c60f5aff456a7e6e515_720w.png)

10.打开软件安装路径（第4步设置的路径）下的【bin】文件夹

![img](https://img.gujin.store/img/v2-00570e825189c982a998004ad0d386cd_720w.png)

11.将刚刚复制的文件，粘贴到bin文件夹内

![img](https://img.gujin.store/img/v2-80fe68cf3a97e0b99671d006068dcef1_720w.png)

12.在该目录下找到webstorm.exe.vmoptions，鼠标右键选择“打开方式”

![img](https://img.gujin.store/img/v2-d5f08c458728b1f1b9072787f7d84dd8_720w.png)

13.选择记事本，点击“确定”

![img](https://img.gujin.store/img/v2-154b0f97a3168c3b419a1be21804412d_720w.png)

14.在文档的尾部加上：`-javaagent:D:\WebStrom 2017.3.6\bin\JetbrainsCrack.jar`。其中【D:\WebStrom 2017.3.6】是软件的安装目录（第4步设置的路径），然后按下快捷键Ctrl+S保存该文档

![img](https://img.gujin.store/img/v2-0dbaad7f3d31fc5bb83de67884fc6009_720w.png)

15.以同样的方法编辑webstorm64.exe.vmoptions

![img](https://img.gujin.store/img/v2-7e5870eed956bcf291ccf7b96bda943f_720w.png)

16.在文档的尾部加上：`-javaagent:D:\WebStrom 2017.3.6\bin\JetbrainsCrack.jar`。其中【D:\WebStrom 2017.3.6】是软件的安装目录（第4步设置的路径），然后按下快捷键Ctrl+S保存该文档

![img](https://img.gujin.store/img/v2-f5ec1d26ec507627ce2a7ab3bdd071e1_720w.png)

17.双击图标，运行软件

![img](https://img.gujin.store/img/v2-1c68437ad5a31dc2c4aa5922d0ec7925_720w.png)

18.选择Do not import settings，点击“OK”

![img](https://img.gujin.store/img/v2-3d9bc1d850b0afa0a13522c4b0750c43_720w.png)

19.选择“Activation code”

![img](https://img.gujin.store/img/v2-a083949fe6bf6ccf9ff803b3d3d89779_720w.png)

20.双击打开“激活码”

![img](https://img.gujin.store/img/v2-6ae83cd400497051f726e5d4f34b8086_720w.png)

21.将激活码全部复制并粘贴到Activation code对话框内，点击“OK”

![img](https://img.gujin.store/img/v2-567737511ecf24191217dcead37d09a3_720w.png)

22.点击“Skip Remaining and Set Defaults”

![img](https://img.gujin.store/img/v2-4ed04422ea8c7d9492358f2254c4fd0a_720w.png)

23.点击右上角的×，关闭软件

![img](https://img.gujin.store/img/v2-a93ca9002be62a319e34a27337602f26_720w.png)

24.复制resources_zh_CN.jar文件

![img](https://img.gujin.store/img/v2-e365c5805b8d40091e03de36a457167b_720w.png)

25.打开软件安装路径（第4步设置的路径）下的【lib】文件夹

![img](https://img.gujin.store/img/v2-049327dc9db57104b205af215b39381c_720w.png)

26.将刚刚复制的文件，粘贴到lib文件夹内

![img](https://img.gujin.store/img/v2-e8826cd28a29c7d229618d0874e66df8_720w.png)

27.双击图标，运行软件

![img](https://img.gujin.store/img/v2-4f37a51f6379dea2dfe7cf11aed2b8b7_720w.png)

28.安装结束




> 声明: 
>
> 1. 本篇文章所提供的下载文件均在网络收集，不可用于商业用途，请于下载后24小时之内删除，如需体验更多乐趣，请支持正版！
>
> 2. 欢迎关注公众号：【**呆呆外卖生活助手**】 ，ID:『DDZhuSh』，获取更多生活帮助！
>
> 3. 更多实用软件请  [点我查看](/tools)

---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/tools/package/webstorm-2017/  

