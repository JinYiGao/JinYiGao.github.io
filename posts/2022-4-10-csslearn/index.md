# Css学习笔记




## 1. Html常用标签

- `<h1></h1> —— <h6></h6>`

  标题标签，独占一行

- `<strong></strong>`

  标签内内容加粗

- `<em></em>`

  标签内内容斜体

- `<hr>`

  页面添加水平线

- `<div></div>`

  独占一行

- `<img src="" alt="" title="">`

  src图像路径；alt无图片时显示文字；title鼠标经过提示文字

- `<a href="跳转目标" target="目标窗口弹出方式"></a>`

  超链接，href：外部链接、内部链接、空链接(#)、下载链接、网页元素链接、锚点链接(#id)；target：_sefl默认打开在当前页面跳转，__blank新建页面打开

- `&nbsp;`

  空格

- `&lt`

  小于号

- `&gt`

  大于号

- `<p></p>`

  段落标签，有段间距

- `<br>`

  换行

- **表格**

  ```html
  <table>
      <tr><th>表头单元格(table head)</th></tr>
      <tr><td>单元格内容(table data)</td></tr>
  </table>
  
  <!--表格语义标签 为了结构更清晰 -->
  <thead></thead>
  <tbody></tbody>
  
  <!-- 合并单元格 -->
  <!-- 1. 找到目标单元格 -->
  <!-- 2. 指定合并单元格数量 -->
  <!-- 3. 删除多余单元格 -->
  <td colspan="2"></td>
  <td rowspan="2"></td>
  ```

- **列表**

  ```html
  <!-- 无序列表 -->
  <ul>
      <li></li>
      <li></li>
  </ul>
  
  <!-- 有序列表 -->
  <ol>
      <li></li>
      <li></li>
  </ol>
  
  <!-- 自定义列表 -->
  <dl>
      <dt>自定义列表标题</dt>
      <dd>自定义列表数据</dd>
      <dd></dd>
  </dl>
  ```

- **表单**

  `<input type="button">`和 `<button>`的区别：

  表单提交时在IE浏览器中button会提交标签间的值，而其他浏览器会提交value属性值；

  并且在form标签内，`<button>`点击后会自动提交表单，而`<input type="button">`点击后如果不定义js事件，则什么也不会发生

  因此，在表单内建议使用`<input type="button">`

  tips：`<label for="id">` ：for属性指定id，点击label后自动转到id指定input元素，增加用户体验

  ```html
  <form action="url地址" method="提交方式" name="表单域名称">
      <imput type="text/button/radio/checkbox/passward/submit" name="input元素名称" value="input元素的值"></imput>
  </form>
  ```

- `<select>`

  下拉选择

  ```html
  <select>
      <option>选项1</option>
      <option selected="selected">选项2</option>
  </select>
  ```

- `<textarea>`

  文本域

## 2. CSS基础选择器

### 2.1. 标签选择器

根据标签名选择元素，选择所有标签设置统一样式，不可差异化设置

```css
p {
    color:green
}
```

### 2.2. 类选择器

根据类名选择元素，差异化选择不同标签，设置类名，实现差异化样式设置

一个标签可以指定多个类名

```css
.red{
    color: red;
}

<ul>
    <li class="red">列表1</li>
    <li>列表2</li>
    <li>列表3</li>
    <li>列表4</li>
</ul>
```

### 2.3. id选择器

根据id名选择元素实现样式设置

**只能设置一个标签元素样式**，因为标签id应该是唯一的

```css
#pink {
    color: pink;
}

<div id="pink">我是DIV</div>
```

### 2.4. 通配符选择器

通配符选择器不需要调用，自动给所有元素使用样式

```css
 * {
     color: pink;
}
```



## 3. CSS字体属性

字体属性用于定义字体系列，大小，粗细和文字样式

- `font-family`

  设置字体，可以指定多个字体，逗号分隔，前面的找不到就启用后面的字体

- `font-size`

  设置文字大小

- `font-weight`

  设置字体粗细，lighter | normal (400) | bold (700) | bolder | number

- `font-style`

  文本风格，normal | italic (斜体)

- `font: font-style font-weight font-size/line-height font-family`

  复合属性，不可颠倒顺序

```css
.font{
    font-family: '宋体','Microsoft YaHei';
    font-size: 30px;
    font-weight: bold;
    font-style: italic;
}
.font2 {
    font: italic 700 20px 'Microsoft YaHei'
}

<p class="font">我是宋体</p>
<p class="font2">我是微软雅黑</p>
```



## 4. CSS文本属性

文本属性定义文本的外观，比如文本的颜色，对齐文本，装饰文本，文本缩进，行间距等

- `color`

  设置文本颜色

- `text-align`

  设置元素内文本内容**水平对齐**方式，不可设置垂直对齐  left | right | center  （**对于img图片同样有效**）

- `text-decoration`

  装饰文本，可以给文本添加下划线，上划线，删除线等  none | overline | underline | line-through

- `text-indent`

  设置文本第一行缩进 (2em：缩进两个字符大小，em：相对单位，当前元素一个文字大小，若当前没设置，则继承父元素一个文字大小)

- `line-height`

  行间距 （行间距 = 上间距 + 文本高度 + 下间距）

```CSS
.text {
    color: deeppink;
    text-align: left;
    text-decoration: none;
    text-indent: 2em;
    line-height: 30px;
}

<div class="text">我是文本</div>
<div >我是文本2</div>
```



## 5. CSS引入方式

### 5.1. 内部样式表

在html内通过 `<style></style` 标签包裹css样式

### 5.2. 行内样式表

直接在html标签元素内通过style属性设置css样式

### 5.3. 外部样式表

`<link>`标签引入

```html
<link rel="stylesheet" href="./index.css">
```



## 6. CSS复合选择器

复合选择器是建立在基础选择器之上的，对基础选择器进行组合形成的

### 6.1. 后代选择器

后代选择器又称为包含选择器，可以选择父元素里面的子元素(样式设置不包括父元素)，可以选择所有子元素，以空格分隔

元素1必须为元素2父元素，但是可以是任意基础选择器组合

```html
元素1 元素2 { 样式声明 }

ol li {
    color: pink;
}

ol li a {
    color: red;
}

.nav li a {
    color: blue;
}

<ol>
    <li>我是ol的孩子</li>
    <li>我是ol的孩子</li>
    <li><a>我是ol的孩子</a></li>
</ol>

<ul class="nav">
    <li>我是ul的孩子</li>
    <li>我是ul的孩子</li>
    <li><a>我是ul的孩子</a></li>
</ul>
```

### 6.2. 子选择器

子元素选择器只能选择某元素**最近一级**子元素(亲儿子)，如果是兄弟标签则全部选择(不选择孙子元素)

```html
元素1 > 元素2 { 样式声明 }

<style>
    div>a {
        color: pink;
        text-decoration: none;
    }
</style>

<div>
    <a href="">我是亲儿子</a>
    <br>
    <a href="">我是亲儿子</a>
    <p><a href="">我是孙子</a></p>
</div>
```

### 6.3. 并集选择器

并集选择器可以选择多种标签，定义相同样式，以逗号分隔

```html
<style>
    div,
    p,
    span,
    ul li {
        color: pink;
    }
</style>

<body>
    <div>熊大</div>
    <p>熊二</p>
    <span>光头强</span>
    <ul>
        <li>儿子1</li>
        <li>儿子2</li>
        <li>儿子3</li>
    </ul>
</body>
```

### 6.4. 伪类选择器

伪类选择器用于向某些选择器添加特殊效果，比如给链接添加特殊效果

- **链接伪类选择器**

  ```js
  a:link      // 未访问的链接
  a:visited   // 已访问的链接
  a:hover     // 鼠标位于链接上(经过)
  a:active    // 鼠标按下但是还没有弹起
  ```

- **`:focus`伪类选择器**

  获取鼠标焦点时，一般只有表单input元素可以获取焦点，因此该样式主要针对表单元素



## 7. CSS元素显示模式

元素显示模式就是元素(标签)以什么方式进行显示，比如 `<div>` 自己占一行，而 `<span>`一行可以放好几个

Html元素一般分为**块元素**和**行内元素**两种类型

### 7.1. 块元素

常见块元素有 `<h1> —— <h6>`、`<div>`、`<p>`、`<ul>`、`<ol>`、`<li>` 等，其中 `<div>` 是最典型的块元素

**块元素特点：**

- 自己独占一行
- 高度，宽度，外边距以及内边距都可以控制
- 宽度默认是容器(父元素宽度)的100%
- 是一个容器及盒子，内部可以放行内元素或者块级元素

**注意：**

- 文字类元素内不允许放块级元素

### 7.2. 行内元素

常见行内元素 `<span>`、`<strong>` 、`<em>` 等

**行内元素特点：**

- 相邻行内元素在一行上，一行可以有多个行内元素
- 高度，宽度设置是无效的
- 默认宽度是它内容本身宽度
- 行内元素只能容纳文本或者其他行内元素

**注意：**

- 链接内不能再放链接
- 特殊情况链接 `<a>` 里面可以放块级元素，但是`<a>`转换一下块级模式更安全

`<a>`标签转换块级元素：

```css
a {
    width: 100px;
    height: 100px;
    display: block;
}
```

### 7.3. 行内块元素

在行内元素中有几个**特殊标签**，比如 `<img/>`、`<input>`、`<td>` ，它们同时具有行内元素和块元素的特点

**行内块元素特点：**

- 和相邻行内元素(行内块)在一行上，但是它们之间会有空白缝隙，一行可以显示多个（行内元素特点）
- 默认宽度是它本身内容宽度（行内元素特点）
- 高度，行高，外边距以及内边距都可以控制（块元素特点）

### 7.4. 显示模式转换

利用display属性进行行内元素，块元素，行内块元素进行转换

但是相邻元素间会有空隙

```css
div {
    display: block/inline/inline-block;
}
```



## 8. CSS背景

- `background-color`

  背景颜色，默认为 transparent

- `background-image`

  背景图片

- `background-repeat`

  背景平铺, 默认情况下是重复平铺的 ，repeat | no-repeat | repeat-x | repeat-y

- `background-position`

  设置背景图片位置

  1. 若参数为方位名词，则参数顺序无关，若第二个参数省略，则第二个参数默认为居中(水平或者垂直，根据第一个参数名词来判断)
  2. 若参数为精确值，则第一个必须为x坐标，第二个必须为y坐标
  3. 若参数为混合单位，则第一个必须为x，第二个必须为y

  ```css
  background-position: center right;
  
  background-position: 50px 60px;
  
  background-position: center 60px;
  ```

- `background-attachment`

  设置背景图像是否固定或者随着页面内容滚动

  ```css
  background-attachment: scroll | fixed;
  ```

- `background: 背景颜色 图片地址 背景平铺 图像附着 图片位置 `

  背景图片复合写法，顺序无要求

- `background: rgba(0, 0, 0, 0.5)`

  设置背景色半透明

**页面元素可以同时添加背景颜色和背景图片.**



## 9. CSS三大特性

- **层叠性**

  相同选择器设置相同样式时，后面的样式会覆盖前面的

- **继承性**

  子标签会继承父标签的某些样式，如文本颜色和字号，一般都是继承文字相关的属性，但是高度宽度边距等不会继承

- **优先级**

  **选择器权重**：!important > 行内样式style=“ ” >  id选择器 > 类选择器，伪类选择器，属性选择器 > 元素选择器 > 继承或者 *通配符选择



## 10. CSS盒子模型

### 10.1. 盒子模型组成

border边框；content内容；padding内边距；margin外边距

1. **边框**

   - `border-width` 

     边框粗细

   - `border-style` 

     边框样式，实线虚线等，solid 实线；dashed虚线

   - `border-color` 

     边框颜色

   - `border`

     复合写法，无顺序要求

   - `border-radius`

     圆角边框，参数可以为数值或者百分比

     可指定一个参数或者四个参数，按照顺时针顺序，也可跟两个数值，按照对角线顺序

     原理：圆或者椭圆与矩形边框相切形成圆角效果

   边框会影响盒子实际大小

   

2. **内边距**

   即盒子边框与内容之间的距离

   - `padding-top | left | right | bottom`

     设置盒子内边距

   - `padding`

     复合写法

   padding会影响盒子实际大小

   当不指定宽度时，padding不会撑开盒子，利用了块级元素独占一行的特性

   

3. **外边距**

   - `margin-left | right | top | bottom`

     设置盒子外边距，即盒子与盒子之间的距离

   - `margin`

     复合写法

   **典型应用：块级盒子水平居中**（必要条件：指定width）

   对于行内元素或者行内块元素，只需要给父元素添加 `text-align: center`即可实现水平居中

   ```html
   <style>
       div {
           width: 200px;
           height: 200px;
           margin: auto;
           background-color: pink;
       }
   </style>
   ```

   **外边距合并：**

   当上下相邻两个块元素相遇时，如果上面元素有下外边距，下面元素有上外边距，则他们之间垂直间距不是top+bottom，而是取两者中的较大值，这种现象被称为相邻块元素垂直外边距的合并。

   **外边距塌陷：**

   对于两个嵌套关系（父子关系）的块元素，父元素有上外边距同时子元素也有上外边距，则此时父元素会塌陷较大的外边距值。

   解决：

   - 可以为父元素定义上边框 `border: 1px solid transparent`
   - 可以为父元素定义上内边距 `padding-top: 1px`
   - 可以为父元素添加 `overflow: hidden `属性（建议使用这个）

   **清除网页元素内外边距：**

   ```html
   <style>
           * {
               padding: 0;
               margin: 0;
           }
       </style>
   ```

   

   ***行内元素为了兼容性，尽量只设置左右内外边距**

## 11. CSS阴影

- `box-shadow: h-shadow w-shadow blur spread color inset`

  盒子阴影，必选：水平阴影 垂直阴影 ；可选：模糊距离 阴影尺寸 阴影颜色  内部阴影 | 外部阴影

  盒子阴影不占用空间，不影响其他盒子排列

- `text-shadow: h-shadow v-shadow blur color`

  文字阴影

## 12. CSS浮动(float)

### 12.1. 传统网页布局三种方式

- **普通流（标准流）**

  所谓标准流，就是标签按照规定好的默认方式排列

  如块级元素独占一行，从上向下排列；行内元素按照顺序，从左到右排列，碰到父元素则自动换行

- **浮动**

- **定位**

网页布局第一准则：**多个块级元素纵向排列找标准流，横向排列找浮动**

### 12.2. 浮动概念

float属性用于创建浮动框，将其移动到一边，直到左边缘或右边缘触及到包含块或另一个浮动框的边缘

`float: none | left | right`

### 12.3. 浮动特性

- **浮动元素会脱离标准流（脱标）**

  脱离标准流的盒子浮动到指定位置，不再保留原先的位置

- **浮动的元素会在一行内显示并且元素顶部对齐**

- **浮动的元素会具有行内块元素的特性**

  如果行内元素有了浮动，则不需要再display转换为行内块元素

- **相邻浮动的盒子中间没有缝隙**

- **如果盒子没有设置宽度，默认宽度和父级一样宽，但是添加浮动以后，它的大小根据内容来决定**

为了约束浮动元素位置，网页布局一般采取策略：

**采用标准流父元素排列上下位置，之后内部子元素采取浮动排列左右位置。**

### 12.4. 清除浮动

对于有些情况，我们希望父元素不要指定高度，让子元素自动撑开父元素。

但是如果不指定父元素高度，子元素浮动以后，因为脱离标准流，父元素高度则会变为0，这不是我们希望的情况。

清除浮动主要是利用 `clear:both`属性来做的

**清除浮动方法：**

- **额外标签法**

  在浮动元素末尾添加一个空标签(必须为块元素)，如：`<div style="clear: both"></div>`

  缺点：增加许多额外标签，结构化较差

- **父级添加overfloaw属性**

  `overflow: hidden`

  优点：代码简洁；缺点：无法显示溢出部分

- **父级添加after伪元素**

  优点：没有增加标签，结构更简单

  ```html
  .clearfix:after {
  	content: "";
  	display: block;
      height: 0;
      clear: both;
      visibility: hidden;
  }
  
  .clearfix {
      *zoom: 1;
  }
  ```

- **父级添加双伪元素**

  ```html
  .clearfix:before,
  .clearfix:after {
      content: "";
      display: table;
  }
  
  .clearfix:after {
      clear: both;
  }
  
  .clearfix {
      *zoom: 1;
  }
  ```

   

## 13. CSS定位

定位可以让盒子自由地在某个盒子内移动位置或者固定屏幕中某个位置，并且可以压出其他盒子

**定位 = 定位模式 + 边偏移**

### 13.1. 定位模式

`position: static | relative | absolute | fixed | sticky`

**静态定位**：默认定位方式，无定位的意思，按照标准流特性摆放位置，它没有边偏移

**相对定位**：相对定位在元素移动位置时，是相对于它原来的位置来说的；原来在标准流的位置继续占有，后面的盒子仍然以标准流方式对待它（不脱标，继续保留原来位置）

**绝对定位**：绝对定位元素在移动位置时，是相对于它祖先元素来说的；如果没有父元素或者**父元素没有定位**，则以**浏览器**为父元素进行定位；如果祖先元素有定位，则以**最近一级有定位祖先元素**为准进行位置移动；**绝对定位脱标**，不再占用原来位置

**固定定位**：以浏览器可视窗口为参照进行位置移动；不随滚动条滚动

**粘性定位**：可以被认为相对定位和固定定位的混合；以浏览器可视窗口为参照点移动元素（固定定位特点）；占有原有位置（相对定位特点）；必须添加top，bottom，left，right属性才生效，否则相当于相对定位

### 13.2. 边偏移

`top | bottom | left | right`

相对于父元素某一边线的距离

### 13.3. 定位叠放顺序

`z-index`

控制盒子前后顺序，数值越大，盒子越靠上

### 13.4. 定位的特殊性

- 行内元素添加绝对或者固定定位，可以直接设置高度和宽度
- 块级元素添加绝对或者固定定位，如果不给宽度或者高度，默认大小是内容大小
- 浮动定位不会压住下面标准流的文字，但是绝对定位和固定定位会压住下面所有内容包括文字

## 14. CSS元素显示与隐藏

- `display: none`

  隐藏对象，不再占用原来位置

  `display: block`也有显示元素的意思

- `visibility: visible | hidden`

  隐藏或者显示对象，继续占用原来的位置

- `overflow: visible | auto | hidden | scroll`

  对溢出的部分设置显示或者隐藏（比如div内超出文本框部分的文字），默认为visible

## 15. 精灵图

多张图片整合到一张大图片上，减少服务器请求压力，主要针对小的背景图片

主要借助背景位置 `background-position` 来实现

## 16. CSS用户界面样式

- `cursor: default | pointer | move ...`

  用于指定鼠标样式

- `outline`

  none 表示取消表单轮廓

- `resize`

  none 表示文本域取消拖曳

## 17. 单行文字垂直居中

**技巧一：**

让文字行高等于盒子高度（原理：文字行高上间距等于下间距）

## 18. 盒子水平垂直居中

- 绝对定位方法配合margin设置

  设置了绝对定位的盒子无法通过`margin: auto`属性设置水平居中

```css
.box {
    position: absolute;
    width: 300px;
    height: 300px;
    left: 50%;
    top: 50%;
    margin-left: -150px;
    margin-top: -150px;
    background-color: pink;
}
```

- 绝对定位方法配合translate设置

```html
<style>
    div {
        position: absolute;
        width: 200px;
        height: 200px;
        background-color: pink;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
</style>
```



## 19. CSS三角画法

![image-20220418223320212](https://img.gujin.store/img/image-20220418223320212.png)

![image-20220418223913244](https://img.gujin.store/img/image-20220418223913244.png)

```html
 <style>
     .box1 {
         width: 0;
         height: 0;
         border-top: 10px solid pink;
         border-right: 10px solid transparent;
         border-bottom: 10px solid transparent;
         border-left: 10px solid transparent;
     }
</style>

<style>
    .box1 {
        position: absolute;
        top: -20px;
        left: 80px;
        width: 0;
        height: 0;
        border-bottom: 10px solid pink;
        border-right: 10px solid transparent;
        border-top: 10px solid transparent;
        border-left: 10px solid transparent;
    }

    .jd {
        position: relative;
        width: 120px;
        height: 249px;
        background-color: pink;
        margin: 100px auto;
    }
</style>
```

## 20. 图片和文字垂直居中对齐

`vertical-align: center` 属性设置行内块和文字垂直居中对齐，效果如下图所示：

![image-20220418225051563](https://img.gujin.store/img/image-20220418225051563.png)

`vertical-align`应用：解决图片底部空白缝隙，原因：图片默认和文字基线对齐。设置为bottom对齐则可以解决空白缝隙



## 21. 溢出文字省略号显示

- 单行文本溢出省略号显示

  ```html
  <style>
      .single {
          width: 150px;
          height: 80px;
          background-color: pink;
          margin: 100px auto;
          /* 强制一行显示 */
          white-space: nowrap;
          /* 溢出部分隐藏 */
          overflow: hidden;
          /* 溢出时省略号显示 */
          text-overflow: ellipsis;
      }
  </style>
  ```

- 多行文本溢出省略号显示

  ```css
  .multi {
      overflow: hidden;
      text-overflow: ellipsis;
    	display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
  }
  ```

  

## 22. HTML5新特性

主要针对以前的不足，增加了一些新的标签，新的表单，新的表单属性等

- `<header>` 头部标签
- `<nav>` 导航标签
- `<artical>` 内容标签
- `<aside>` 侧边栏标签
- `<section>` 定义文档某个区域
- `<footer>` 尾部标签
- `<audio src="文件地址">` 音频标签
- `<video src="文件地址">` 视频标签，支持MP4，webM，Ogg
- `<input type="search | email | url | data | time | tel | number ...">` 新增表单类型，当点击提交时自动验证

## 23. CSS3新特性

### 23.1. 新增选择器

- **属性选择器**

  ```html
  <style>
      /* 根据属性选择 */
      input[value] {
          color: pink;
      }
  
      /* 根据属性=值选择 */
      input[type=password] {
          color: red;
      }
  
      /* 根据属性=以val开头的选择 */
      div[class^=ico] {
          color: blue;
      }
  
      /* 根据属性=以val结尾的选择 */
      div[class$=ico] {
          color: blue;
      }
  
      /* 根据属性=包含val的选择 */
      div[class*=ico] {
          color: blue;
      }
  </style>
  ```

- **结构伪类选择器**

  `nth-child`会把所有孩子都排个序号，再去判断类型

  `nth-of-type`会先按照指定类型选择，再排序

  ```html
  <style>
      /* 选择第一个 */
      ul li:first-child {
          color: pink;
      }
  
      /* 选择最后一个 */
      ul li:last-child {
          color: blue;
      }
  
      /* 选择第n个 */
      ul li:nth-child(3) {
          color: red;
      }
  
      /* 公式: 选择第偶数个 */
      ul li:nth-child(2n) {
          color: green;
      }
  
      /* 关键字: 选择第奇数个 */
      ul li:nth-child(odd) {
          color: skyblue;
      }
  </style>
  ```

- **伪元素选择器**

  `::before` 在元素前面插入元素

  `::after` 在元素后面插入内容

  新创建的元素在DOM树中是找不到的，所以称为伪元素

  必须有 `content` 属性

  使用场景：伪元素清除浮动

### 23.2. 盒子模型

`box-sizing` 指定盒子模型，有两个值：`content-box`、`border-box`，这样计算盒子大小的方式就发生了改变

默认 `content-box` = border + padding + width（传统盒子模型）

指定为 `border-box` 后指定的width/height就是盒子大小（前提border和padding小于width/height）

### 23.3. 其他特性

- `filter: 函数()`

  模糊图片，如 `filter: blur(5px)`

- `clal函数`

  计算函数，如 `width: calc(80% - 50px)`

- `transition: 要过渡的属性 花费时间 运动曲线 延时时间, (第二个属性)...`

  过渡属性：宽度高度背景颜色内外边距等；花费时间：秒；运动曲线：easy | linear | easy-in | easy-out | easy-in-out

  如果有更多属性需要变化，则属性写成 `all` 就可

- `transform`

  2D、3D转换



## 24. CSS 2D转换

- `translate` 平移

  `transform: translate(x, y)`，translate中百分比单位是相对于自身的

  translate最大优点：不会影响其他盒子位置；

  对行内标签没有效果

- `rotate` 旋转

  `transform: rotate(度数)`

- `scale` 缩放

  `transform: scale(x, y)`

  优点：可以设置缩放中心点，不影响其他盒子位置

- `transform-origin: x y` 

  设置转换中心点，可以跟方位名词left right top bottom；默认为50% 50%，等价于center；也可以跟精确单位

- `transform: translate rotate scale`

  2D转换综合写法，顺序有关

**2D转换通常配合过渡属性一起使用**

## 25. CSS动画

1. **先定义动画**

   用 `keyframe` 定义动画

   ```css
    @keyframes move {
        /* 开始帧 */
        0% {
            transform: translate(0, 0);
        }
        /* 结束帧 */
        100% {
            transform: translate(100px, 0);
        }
   }
   ```

2. **再使用动画**

   ```css
   div {
       width: 200px;
       height: 200px;
       background-color: pink;
       /* 调用动画 */
       animation-name: move;
       /* 持续时间 */
       animation-duration: 2s;
       /* 持续次数 */
       animation-iteration-count: infinite;
       /* 运动曲线 */
       animation-timing-function: linear;
       /* 何时开始 */
       animation-delay: 0s;
       /* 是否逆向播放 */
       animation-direction: normal;
   }
   ```

   `steps()` 指定动画步长，不可与运动曲线同时存在，一般用于制作定格动画

## 26. CSS 3D转换

- `perspective`

  透视，必须定义在3D物体父元素上

- `translate3d(x, y, z)`

  z轴一般使用px单位

- `rotate3d`

  3d旋转 `rotate3d(1, 0, 0, 45deg)` 沿X轴旋转

- `transform-style`

  3d呈现

  `transform-style: flat` 子元素不开启立体空间，默认

  `transform-style: preserve-3d` 子元素开启立体空间 

  

## 27.CSS移动端布局

### 27.1. 视口

视口就是浏览器显示页面内容的屏幕区域

视口分为布局视口，视觉视口和理想视口

移动端布局想要的是理想视口就是手机屏幕有多宽，我们的布局视口就有多宽

想要理想视口，需要给移动端页面添加meta视口标签

### 27.2. 背景缩放

`background-size: cover | contain`

cover：图片完全覆盖背景（可能超出背景）；contain：图片有一边充满背景为止（背景可能留空）

### 27.3. 移动端技术选型

- **单独制作移动端页面**
  - 流式布局（百分比布局）
  - flex弹性布局
  - less+rem+媒体查询布局
  - 混合布局
- **响应式页面兼容移动端**
  - 媒体查询
  - bootstrap

### 27.4. 流式布局

通过盒子宽度设置成百分比来根据屏幕宽度进行伸缩，不受固定像素的限制，内容向两侧填充

### 27.5. flex布局

- **布局原理**

  弹性布局，用来为盒子模型提供最大的灵活性，任何一个容器都可以指定为flex布局

  当我们为父盒子设置flex布局以后，子元素的float，clear，vertical-align属性将失效

  采用flex布局的元素，称为flex容器，它的所有子元素自动成为容器成员，子容器可以横向排列也可以纵向排列

  总结：通过个父盒子添加flex属性，来控制子盒子的位置和排列方式

- **flex布局父项常见属性**

  默认主轴方向：x轴；默认侧轴方向：y轴

  **元素是跟着主轴进行排列**

  - `flex-direction`

    设置主轴方向：`row | row-reverse | column | column-reverse `

  - `justify-content`

    设置主轴上子元素排列方式：

    `flex-start(从首部开始) | flex-end(从尾部开始) | center(居中排列) | space-around(平分剩余空间) | space-between(两边贴边,中间平分) `

  - `flex-wrap`

    设置子元素是否换行

  - `align-content`

    设置侧轴上子元素排列方式（在子项为多行时使用）

     `flex-start(从首部开始) | flex-end(从尾部开始) | center(居中排列) | space-around(平分剩余空间) | space-between(两边贴边,中间平分)  | streth(拉伸，子项在侧轴平分父元素高度)`

  - `align-items`

    设置侧轴上子元素排列方式（在子项为单行时使用） 

    `flex-start(从首部开始) | flex-end(从尾部开始) | center(居中排列) | streth(拉伸,默认值)`

  - `flex-flow`

    `flex-direction` 和 `flex-wrap` 的复合写法

- **flex布局子项常见属性**

  - `flex`

    子项占的份数（在剩余空间中）

  - `align-self`

    控制子项自己在**侧轴**的排列方式

  - `order`

    定义子项的排列顺序:`order: number` 数字越小越靠前

### 27.6. rem适配布局

针对问题：

1. 页面布局文字能否随屏幕大小变化而变化？
2. 流式布局和flex布局主要针对宽度布局，那高度如何设置？
3. 怎么样让屏幕变化时元素高度和宽度等比例缩放？

**rem是一个相对单位，类似于em，em是相对于父元素字体大小，而rem基准是相对于html根元素字体大小**

rem优势：可以通过修改html根元素字体大小进行整体大小控制

### 27.7. 媒体查询

- 使用 `@media` 查询，可以针对**不同媒体类型**定义不同样式
- `@media` 可以针对**不同屏幕尺寸**设置不同样式

**语法规范：**

- `mediatype`：媒体类型
- `and | not | only`：关键字
- `media-feature`：媒体特性

```css
@media mediatype and | not | only (media-feature) {
    
}

@media print, screen and (max-width: 2000px) and (min-width: 100px){
    div {
        width: 100px;
        height: 100px;
        background-color: pink;
    }
}
```

**引入资源：**

当样式比较繁多的时候，可以针对不同媒体引入不同css样式资源

```html
<link rel="stylesheet" href="index.css" media="screen and (max-width: 200px)">
```

### 27.8. less

less是CSS的预处理器

官方手册：[点我查看](https://less.bootcss.com/#%E6%A6%82%E8%A7%88)

### 27.9. 响应式布局

**原理：** 就是使用媒体查询针对不同宽度设备进行布局和样式的设置，从而适配不同设备

## 28. vw和vh

类似于em和rem，vw和vh也是一个相对单位，相对于当前视口

**1vw = 1/100视口宽度**

**1vh = 1/100视口高度**



---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/posts/2022-4-10-csslearn/  

