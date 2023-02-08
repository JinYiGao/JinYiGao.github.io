# Webpack5学习笔记


## 1. WebPack简介

WebPack是一种前端资源构建工具，一个静态模块打包器。

**插一句：所有构建工具都是基于nodejs平台运行的，默认采用commonjs模块规范。**



**五大核心概念：**

**1.1 Entry**

入口，指示Webpack以哪个文件为入口起点开始打包，构建内部依赖图。

**1.2 Output**

输出指示Webpack打包后的资源输出到哪里，以及如何命名。

**1.3 Loader**

Loader让Webpack能够去处理那些非Javascript文件(Webpack自身只理解Javascript, json)，如css，图片等文件，类似翻译官。

**1.4 Plugins**

插件可以用于执行范围更广的任务。插件范围包括：从打包优化到压缩，重新定义环境中的变量等。

**1.5  Mode**

模式(Mode)指示Webpack使用相应模式的配置。

**development**：能让代码本地调试运行的环境。

**production**：能让代码优化上线运行的环境。

两者均会启用不同的插件(Plugins)



**Loader和Plugins的区别**

**1. 从功能角度区分**

Loader虽然扩展了Webpack，但它**只专注于转化文件**这一领域，完成压缩，打包，翻译。从字面意思上也能看出来，loader是用于加载文件的，将文件转化并加载进来。

如：

​	css-loader和style-loader模块是为了打包css的

​	babel-loader和babel-core模块时为了把ES6的代码转成ES5

​	url-loader和file-loader是把图片进行打包的。

Plugins也是扩展了Webpack功能，但是它是作用于Webpack本身的，功能要更加丰富，用于处理loader不能处理的事。从打包优化和压缩，到重新定义环境变量，功能强大到可以用来处理各种各样的任务。

**2. 从运行时角度区分**

loader运行在打包文件之前；

plugins在整个编译周期都起作用



## 2. Webpack初体验

### 2.1 运行指令

```shell
#初始化一个npm项目
	npm init
	
#本地安装
	npm i webpack webpack-cli -D
	# -D 会将包信息写入到package.json中的devDependencies中
	# devDependencies 里面的插件只用于开发环境，不用于生产环境，而 dependencies 是需要发布到生产环境的。
	
#开发环境打包
	webpack --entry ./src/index.js -o ./build --output-filename built.js --mode=development
#webpack会以./src/index.js为入口，开始打包，打包后输出到./build/built.js
#整体打包环境是开发环境。

#生产环境打包
	webpack --entry ./src/index.js -o ./build --output-filename built.js --mode=production
```

**小结：**

1. Webpack能处理js/json资源，不能处理css/img等其他资源
2. 生产环境和开发环境将ES6模块编译成浏览器能识别的模块
3. 生产环境比开发环境多一个压缩js代码



## 3. 打包样式资源

上一章实践可知，Webpack无法处理css/img等样式资源，因此需要借助Loader进行文件的转化与加载处理。

### 3.1 webpack配置文件

**webpack.config.js :** webpack的配置文件

作用：指示Webpack干哪些活(当运行Webpack指令时，会加载里面的配置)

```js
// resolve 是nodejs path模块中用来拼接绝对路径的方法
const { resolve } = require('path');

module.exports = {
    // Webpack配置
    // 入口起点
    entry: './src/index.js',
    // 输出
    output:{
        // 输出文件名
        filename: 'built.js',
        // 输出路径
        // __dirname是nodejs变量，代表当前文件所在目录
        path: resolve(__dirname, 'build')
    },
    // loader的配置
    module:{
        rules:[
            // 详细地loader配置
            // *** 不同文件 需要配置不同loader ***
            {
                //匹配哪些文件
                test: /\.css$/,
                // 使用哪些loader去处理
                use:[
                    // use数组中loader执行顺序是从尾部到前面依次执行
                    // 2. 创建style标签，将js中的样式资源插入，添加到页面head中生效
                    'style-loader',
                    // 1. 将css文件以字符串的形式编成commonjs模块加载到js中，里面内容是样式字符串
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                use:[
                    'style-loader',
                    'css-loader',
                    // 将less文件编译成css文件
                    'less-loader'
                ]
            }
        ]
    },
    // plugins的配置
    plugins:[
        // 详细plugins配置

    ],
    // 模式
    mode: 'development', // 开发模式
    // mode: 'production'
}
```

## 4. 打包html资源

借助plugin实现打包, 这里使用html-webpack-plugin实现.

**loader使用：1. 下载； 2. 使用(配置loader)**

**plugins使用：1. 下载； 2. 引入； 3. 使用**

### 4.1 webpack配置

```js
 const {resolve} = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 
 module.exports={
     entry: './src/index.js',
     output:{
         filename:'built.js',
         path: resolve(__dirname, 'build')
     },
     module:{
         rules:[
            // loader配置
            {

            }
         ]
     },
     plugins:[
         // 功能: 默认会创建一个空的html，自动引入打包输出的所有资源(JS/CSS)
         // 需要有自己写的结构的html文件
         // template参数: 复制index.html文件, 并自动引入所有资源(js等)
         new HtmlWebpackPlugin({
             template: './src/index.html'
         })
     ],
     mode:'development'
 }
```

## 5. 打包图片资源

使用loader处理图片资源

**1. 处理css中图片资源**

在Webpack5中url-loader以及file-loader已经废弃，如果一定要使用需要加上一些参数，见下面代码：

***在Webpack5中使用asset来实现图片资源打包（type:'asset/resource'）**

**2. 处理html中img标签内的图片**

使用html-loader处理, 负责引入img，从而能被url-loader进行处理

```js
 const {resolve} = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: './src/index.js',
     output: {
         filename: 'built.js',
         path: resolve(__dirname, 'build')
     },
     module:{
         rules:[
             {
                 test: /\.less$/,
                 // 使用多个loader使用use, 从数组最后往前依次使用
                 use:[
                     'style-loader',
                     'css-loader',
                     'less-loader'
                 ]
             },
             {
                 test: /\.(jpg|png|gif)$/,
                 // 只是用一个loader
                 // 需要下载url-loader和file-loader
                 loader: 'url-loader',
                 options: {
                     // 图片大小小于8kb, 就会被当成base64处理
                     // 优点: 减少请求数量(减轻服务器压力)
                     // 缺点: 图片体积更大
                     limit: 30 * 1024,
                     // webpack5使用要加
                     // 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                     // 需要关闭utl-loader的es6模块化，使用commonjs解析
                     esModule: false,
                     // 给图片重命名
                     // [ext]取文件原扩展名
                     name: '[hash:10].[ext]'
                 },
                 // Webpack5使用要加
                 type: 'javascript/auto'
                //  use: [
                //      'url-loader'
                //  ]
             },
             // Webpack5打包图片资源
             // {
             //     test: /\.(jpg|png|gif)$/,
             //     type:'asset/resource'
             // {
                 test: /\.html$/,
                 loader: 'html-loader'
             }
         ]
     },
     plugins:[
         new HtmlWebpackPlugin({
             template: './src/index.html'
         })
     ],
     mode: 'development'
 }
```

## 6. 打包其他资源

打包如**字体**等不需要做任何处理，原封不动处理的资源

使用file-loader处理除html/js/css以外的其他资源

**Webpack5貌似不需要使用file-loader也可以直接打包**

**或者使用type:'asset/resource'来处理字体文件**

![image-20220323154928880](https://img.gujin.store/img/image-20220323154928880.png)

```js
 const {resolve} = require('path');
 const HtmlWebpaclPlugin = require('html-webpack-plugin');
 
 module.exports = {
     entry: './src/index.js',
     output: {
         filename: 'built.js',
         path: resolve(__dirname, 'build')
     },
     module:{
         rules:[
             {
                 test: /\.css$/,
                 use: [
                     'style-loader',
                     'css-loader'
                 ]
             },
             // 打包其他资源，除了html/js/css 以外的其他资源
             {
                 exclude: /\.(css|js|html)/,
                 loader: 'file-loader'
             }
         ]
     },
     plugins:[
         new HtmlWebpaclPlugin({
             template: './src/index.html'
         })
     ],
     mode: 'development'
 }
```

## 7. devServer

**开发服务器 devServer:  (用来自动化编译，自动打开浏览器，自动刷新浏览器)，即热更新**

**特点: 只在内存中编译打包, 而不会输出**

**启动指令: npx webpack-dev-Server**

需要下载包webpack-dev-server

```js
 const {resolve} = require('path');
 const HtmlWebpaclPlugin = require('html-webpack-plugin');
 
 module.exports = {
     entry: './src/index.js',
     output: {
         filename: 'built.js',
         path: resolve(__dirname, 'build')
     },
     module:{
         rules:[
             {
                 test: /\.css$/,
                 use: [
                     'style-loader',
                     'css-loader'
                 ]
             },
             // 打包其他资源，除了html/js/css 以外的其他资源
             // Webpack5用法
             {
                 exclude: /\.(css|js|html)/,
                 type: 'asset/resource'
             }
         ]
     },
     plugins:[
         new HtmlWebpaclPlugin({
             template: './src/index.html'
         })
     ],
     mode: 'development',

     // 开发服务器 devServer: (用来自动化编译，自动打开浏览器，自动刷新浏览器)
     // 特点: 只会在内存中编译打包, 不会有任何输出
     devServer:{
         // Webpack4用法
         // contentBase: resolve(__dirname, 'build'),
         // Webpack5用法
         static: resolve(__dirname, 'build'),
         //启动gzip压缩, 使代码体积更小，启动更快
         compress: true,
         //端口号
         port: 3000,
         // 自动打开浏览器
         open: true
     }
 }
```

## 8. 开发环境基本配置

整合前面几个章节学习内容, 集成为统一开发环境

**输出资源到指定目录:**

Webapck4中使用options.outputPath来实现

Webpack5中使用generator.outputPath来实现

```js
 const { resolve } = require('path');
 const HtmlWebpackPlugin = require('html-webpack-plugin');

 module.exports = {
     entry: './src/js/index.js',
     output: {
         filename: 'js/built.js',
         path: resolve(__dirname, 'build')
     },
     module: {
         rules: [
             // loader配置
             {
                 // 处理less资源
                 test: /\.less$/,
                 use: [
                     'style-loader',
                     'css-loader',
                     'less-loader'
                 ]
             },
             {
                // 处理css资源
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                // 处理图片资源
                test: /\.(jpg|png|gif)$/,
                // 在Webpack5中借助内置asset-module来实现
                type: 'asset/resource',
                generator:{
                    filename: 'asset/[hash:6][ext]',
                }
                // 或者借助url-loader来实现
                // loader: 'url-loader',
                // options: {
                //     // 图片大小小于8kb, 就会被当成base64处理
                //     // 优点: 减少请求数量(减轻服务器压力)
                //     // 缺点: 图片体积更大
                //     limit: 30 * 1024,
                //     // webpack5使用要加
                //     // 因为url-loader默认使用es6模块化解析，而html-loader引入图片是commonjs
                //     // 需要关闭utl-loader的es6模块化，使用commonjs解析
                //     esModule: false,
                //     // 给图片重命名
                //     // [ext]取文件原扩展名
                //     name: '[hash:10].[ext]'
                // },
                // // Webpack5使用要加
                // type: 'javascript/auto'
            },
            {
                // 处理html中的img资源
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                // 处理其他资源
                exclude: /\.(html|js|css|less|jpg|png|jpg|gif)/,
                // 在Webpack5中借助内置asset-module来实现
                type: 'asset/resource',
                generator:{
                    filename: 'asset/[hash:6].[ext]'
                }
                // Webpack4用法
                // loader: 'file-loader'
            }
         ]
     },
     plugins: [
         new HtmlWebpackPlugin({
             template: './src/index.html'
         })
     ],
     mode: 'development',

     devServer:{
        // Webpack4用法
        // contentBase: resolve(__dirname, 'build'),
        // Webpack5用法
        static: resolve(__dirname, 'build'),
        // 启动gzip压缩, 使代码体积更小，启动更快
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开浏览器
        open: true
    }
 }
```

## 9. 提取CSS成单独文件

### 9.1. mini-css-extract-plugin插件提取CSS

通常Webpack会将CSS样式文件打包进js文件中, 这样会造成js文件体积过大, 加载缓慢, 不利于生产环境上线使用

**使用mini-css-extract-plugin**来进行提取

**注意：**css-loader将css处理整合进js文件中，style-loader创建style标签并插入到html中，因此处理css文件时，不能使用style-loader，

使用MiniCssExtractPlugin.loader取代style-loader，作用是提取js中的css成单独文件。

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports={
    entry: './src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    // 'style-loader',
                    // 这个loader取代style-loader，作用是提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            // 对输出文件进行重命名并指定目录
            filename: 'css/built.css'
        })
    ],
    mode:'development'
}
```

### 9.2. CSS兼容性处理

使用postcss-loader 以及 postcss-preset-env两个包

**具体用法可以去[github](https://github.com/postcss/postcss/blob/main/docs/README-cn.md)上看**

在package.json中编写browserlist配置,postcss-preset-env插件帮助postcss找到对应browserlist配置，并进行css兼容性处理

```js
"browserslist":{
    "development":[
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production":[
      ">0.2%",
      "no dead",
      "not op_mini all"
    ]
  }
```

postcss.config.js编写

```js
module.exports={
    plugins:[
        require('postcss-preset-env')
    ]
}
```

webpack.config.js编写

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置node环境变量
process.env.NODE_ENV = 'production'

module.exports={
    entry: './src/js/index.js',
    output:{
        filename:'js/built.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    // 'style-loader',
                    // 这个loader取代style-loader，作用是提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    'css-loader',

                    // css兼容性处理: postcss --> postcss-loader postcss-preset-env
                    // 帮postcss找到package.json中browserslist里面的配置,通过配置加载指定的css兼容样式
                    // "browserslist":{
                    // 开发环境  指node环境变量
                    //     "development":[
                    //         "last 1 chrome version",
                    //         "last 1 firefox version",
                    //         "last 1 safari version"
                    //     ],
                    // 默认生产环境
                    //     "production":[
                    //         ">0.2%",
                    //         "no dead",
                    //         "not op_mini all"
                    //     ]
                    // }

                    // 方法一 使用loader的默认配置
                    // 'postcss-loader',
                    // 方法二 修改loader的配置
                    {
                        loader:'postcss-loader',
                    }
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            // 对输出文件进行重命名并指定目录
            filename: 'css/built.css'
        })
    ],
    mode:'development'
}
```

也可以将postcss.config.js的内容写入webpack配置

```js
 {
     	 loader: 'postcss-loader',
         options: {
             postcssOptions: {
                 plugins: [
                     require('postcss-preset-env')()
                 ]
             }
         }
 }
```



### 9.3. 压缩CSS

一般类似于兼容性处理，文件转换都是靠loader来完成，而压缩等都是靠插件plugin来实现的

主要使用**optimize-css-assets-webpack-plugin**这一插件

```js
plugins:[
    new HtmlWebpackPlugin({
        template: './src/index.html'
    }),
    // 提取css成单独文件
    new MiniCssExtractPlugin({
        // 对输出文件进行重命名并指定目录
        filename: 'css/built.css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin()
]
```



## 10. JS语法检查

下载**eslint, eslint-webpack-plugin, eslint-config-airbnb-base, eslint-plugin-import**四个包

**eslint-webpack-plugin** 用于替代eslint-loader(即将废弃)

在package.json中eslintConfig属性进行设置, eslint-plugin-import用于导入该设置, 利用**airbnb-base**用于规则设置

```js
"eslintConfig":{
    "extends": "airbnb-base"
}
```

webpack.config.js配置

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports={
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ESLintWebpackPlugin({
            // 自动修复
            fix: true,
            // 检查文件
            extensions: ['js'],
            // 排除文件夹
            exclude: '/node_modules/'
        })
    ],
    mode: 'development'
}
```

```shell
// eslint-disable-next-line
#上述注释可以用于忽略eslint检查
```

问题: eslint不认识window, navigator等浏览器全局变量, 需要修改配置

```json
  "eslintConfig": {
    "extends": "airbnb-base",
    "env":{
      "browser": true
    }
  }
```



## 11. JS兼容性处理

JS兼容性问题，例如：下述代码在IE浏览器会报错

```js
const add = (x, y) => x + y;

// eslint-disable-next-line
console.log(add(2, 3));
```

利用**babel-loader**进js的兼容性处理

### 11.1. 选用**@babel/preset-env**进行**基本**js兼容性处理

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports={
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设,指示babel做怎样的兼容性处理
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ESLintWebpackPlugin({
            fix: true,
            extensions: ['js'],
            exclude: '/node_modules/'
        })
    ],
    mode: 'development'
}
```

### 11.2. 利用**@babel/polyfill**进行**全部**的js兼容性处理

在js文件内引入即可

```js
import '@babel/polyfill';
```

### 11.3. 按需加载兼容性处理core-js

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports={
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    // 预设,指示babel做怎样的兼容性处理
                    presets: [
                        ['@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                //指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new ESLintWebpackPlugin({
            fix: true,
            extensions: ['js'],
            exclude: '/node_modules/'
        })
    ],
    mode: 'development'
}
```

## 12. JS和html压缩

### 12.1. JS压缩

在生产环境下js自动压缩

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    // 生产环境下自动压缩js代码
    mode: 'production'
}
```

### 12.2. Html压缩

只需要配置**HtmlWebpackPlugin**

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports={
    entry: './src/js/index.js',
    output: {
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module:{
        rules:[
            
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                // 移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        })
    ],
    // 生产环境下自动压缩js代码
    mode: 'production'
}
```

## 13. 生产环境配置

包含了：

1. CSS代码处理
2. CSS兼容性配置
3. CSS代码压缩
4. JS语法检查
5. js兼容性处理
6. 图片处理
7. js和html压缩

**注意：**正常来讲，一个文件只能被一个loader处理，当一个文件要被多个loader处理时，那么一定要指定loader的执行先后顺序

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonCssLoader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: [
                require('postcss-preset-env')()
            ]
        }
    }
}
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const { Generator } = require('webpack');

module.exports = {
    entry: './src/js/index.js',
    output:{
        filename: 'js/built.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // css兼容性处理
                    commonCssLoader
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    commonCssLoader,
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_module/,
                loader: 'babel-loader',
                options:{
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                // 按需加载
                                useBuiltIns: 'usage',
                                //指定core-js版本
                                corejs: {
                                    version: 3
                                },
                                // 指定兼容性做到哪个浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: '9',
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]
                    ]
                }
            },
            {
                test: /\.(jpg|png|gif)/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash:6][ext]'
                }
            },
            // html中图片处理
            {
                test: /\.html/,
                loader: 'html-loader'
            },
            // 其他文件处理
            {
                exclude: /\.(js|css|less|html|jpg|jpg|gif)/,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/[hash:6][ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/built.css'
        }),
        new OptimizeCssAssetsWebpackPlugin(), // CSS压缩
        new ESLintWebpackPlugin({
            fix: true,
            extensions: ['js'],
            exclude: '/node_modules/'
        })
    ],
    mode: 'production'
}
```

## 14. Webpack性能优化

### 14.1. 开发环境性能优化

1. 优化Webpack打包构建速度 (HMR)

   **HMR**: hot module replacement 热更新

   作用: 一个模块变化, 只会重新打包这一个模块，而不是打包所有

   ***Webpack5自动开启***

   Webpack4开启:

   ```js
   devServer:{
           // Webpack4用法
           // contentBase: resolve(__dirname, 'build'),
           // Webpack5用法
           static: resolve(__dirname, 'build'),
           // 启动gzip压缩, 使代码体积更小，启动更快
           compress: true,
           // 端口号
           port: 3000,
           // 自动打开浏览器
           open: true,
           // HMR
           hot: true
       }
   ```

   

   **样式文件**: 可以使用HMR功能，因为'style-loader'内部实现了~

   **js文件**: js文件变化时devServer会重新编译所有文件，虽然也能实现更新，但是默认不能使用HMR功能，即无法实现局部打包-- > 需要修改代码，添加支持	HMR功能

   修改：

   ```js
    if(module.hot){
       // 为true说明开启了hmr功能
       module.hot.accept('./print.js', function(){
          // 方法会监听print.js文件变化,一但发生变化,其它默认不会重新打包构建
          // 会执行后面的回调函数
          print();
       })
    }
   ```

   **html文件**： 默认不能使用HMR功能，同时会导致问题：修改html文件后浏览器并未自动刷新热更新 (不用做HMR)

   修改：

   ```js
   // Entry更改为数组, 添加html文件
   entry: ['./src/js/index.js', './src/index.html']
   ```

   

2. 优化代码调试(source-map)

   **source-map**:  一种提供源代码到构建后代码映射的技术 (如果构建后代码出错, 通过构建关系可以追踪到源代码错误)

   配置：

   ```js
   module.exports = {
       ...
       devtool: 'source-map' // 能够提示错误代码准确信息 和 源代码错误位置
       ...
   }
   
   // source-map 参数
   // [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
   // inline-source-map    // source-map内联嵌入到js文件中,内联速度更快    * 能够提示错误代码准确信息 和 源代码错误位置
   // hidden-source-map    // 外部生成   * 能够提示错误代码原因 和 但是没有错误位置,只能提示到构建后代码错误位置
   // eval-source-map      // 内联,每一个js文件后会追加一个sourceMapURL,在eval函数中   * 能够提示错误代码准确信息 和 源代码错误位置
   // nosources-source-map // 外部生成   * 能够提示错误代码准确信息 和 但是没有任何源代码信息
   // cheap-source-map     // 外部生成   * 能够提示错误代码准确信息 和 源代码错误位置(只能精确到行)
   // module-source-map    // 外部生成   * 能够提示错误代码准确信息 和 源代码错误位置
   
   /*  --- 开发环境 ---
   	速度快(eval>inline>cheap...)
   		eval-cheap-source-map
   		eval-source-map     一般用这个性价比最好
   	调试更友好
   		source-map
   		cheap-module-source-map
   		module会将loader的source-map加入
   		cheap-source-map
   	
   	--- 生产环境 ---
   	考虑代码隐藏
   	nosources-source-map
   	hidden-source-map
   	
   	不考虑inline 会使文件体积变大
   */
   ```

   

### 14.2. 生产环境性能优化

1. 优化Webpack打包构建速度

   oneOf

   babel缓存

   多进程打包

   externals

   dll

2. 优化代码运行性能

   缓存(hash - chunkhash - contenthash)

   tree shaking

   code split

   懒加载/预加载

   pwa

## 15. 缓存

当生产环境构建编译时，缓存文件，下次编译时不变的代码直接使用缓存即可，加快构建速度

### 15.1. babel缓存

babel构建代码时，避免重复构建，可以使用babel缓存, 下次构建时针对不变的部分直接使用缓存

`cacheDirectory: true`

```js
{
    test: /\.js$/,
    exclude: /node_module/,
    loader: 'babel-loader',
    options:{
        presets: [
        	[
                '@babel/preset-env',
                {
                    // 按需加载
                    useBuiltIns: 'usage',
                    //指定core-js版本
                    corejs: {
                        version: 3
                    },
                    // 指定兼容性做到哪个浏览器
                    targets: {
                        chrome: '60',
                        firefox: '60',
                        ie: '9',
                        safari: '10',
                        edge: '17'
                    }
                }
        	]
        ],
        // 开启babel缓存
        cacheDirectory: true
    }
}
```

### 15.2. 文件资源缓存

假如开启node server, 由于浏览器文件资源缓存, 重新打包后刷新浏览器并不会显示新打包的效果

解决办法：

1. hash: webpack配置内文件名添加hash值

   ```js
   output:{
           filename: 'js/built.[hash:10].js',  // chunkhash ; contenthash
           path: resolve(__dirname, 'build')
       }
   ```

   问题: js和css同时使用一个hash值，如果重新打包, 所有缓存都将失效, 因为不管文件变没变, 都会重新生成hash值

2. chunkhash: 根据chunk生成hash值, 如果打包来源于同一个chunk, 那么hash值一样

   存在问题: css和js文件hash值还是一样, 因为css被js引入, 属于同一个chunk, 因此两者hash值还是一样

3. contenthash: 根据文件内容生成hash值, 不同文件hash值一定不一样, 内容不变, hash值不变

## 16. Tree Shaking

**含义: 去除应用程序中没有使用到的代码**

前提: 

1. 必须使用ES6模块化
2. 开启production模式

则 webpack自动启用

在package.json中配置:

代表所有代码都没有副作用(都可以进行tree shaking)

可能会把css文件去除

```js
"sideEffects": false
```

改进:

```js
"sideEffects":["*.css"]
```

## 17. code split 代码分割

**将代码打包输出分割为多个js文件**

demo1: 多入口: 一个入口输出一个bundle

```js
entry: {
    main: './src/js/index.js',
    test: './src/js/test.js'
},
output:{
    filename: 'js/[name].[contenthash:10].js', // 输出名字为entry指定的key
    path: resolve(__dirname, 'build')
}
```



demo2: 引入的node_modules代码单独打包输出, 多个库会合并打包成一个文件

自动分析多入口文件中有没有公共依赖, 如果有, 则打包成单独chunk

```js
optimization:{
    splitChunks:{
        chunks:'all'
    }
}
```



demo3: 通过js代码让某个文件单独打包成一个chunk

import 动态导入语法

```js
// 导入test文件内两个函数
// webpackChunkName 指定打包后文件名
import(/* webpackChunkName: 'test' */'./test').then(({mul, count}) => {
  console.log(mul(2,3));
  console.log(count(6,2));
})
```



**小结:**

一般多入口不常用，通常使用单入口 + optimization + import动态导入



## 18. JS文件懒加载

需要时才加载

懒加载必然需要将js拆分为单独bundle, 因此可以使用import动态导入

```js
import(/* webpackChunkName: 'test' */ './test').then(({mul, count})=>{
    console.log(mul(2, 3));
})
```

预加载:

会在使用前, 提前加载js文件

会等其他资源加载完毕, 再加载

有兼容性问题, 慎用!

```js
import(/* webpackChunkName: 'test' , webpackPrefetch: true */'./test').then(({mul, count})=>{
    console.log(mul(2, 3));
})
```



## 19. PWA

渐进式网页开发应用程序

加载的网页离线也能访问

利用**workbox-webpack-plugin**插件

**注意: **serviceWorker必须运行在服务器端, 可以通过nodejs启动

webpack.config.js配置

```js
new WorkboxWebpackPlugin.GenerateSW({
    // 帮助serviceWorker快速启动
    // 删除旧的 serviceWorker
    // 生成一个serviceWorker的配置文件
    clientsClaim: true,
    skipWaiting: true
})
```

js代码注册serviceWorker代码运行

```js
// 注册serviceWorker
// 处理兼容性问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(() => {
      console.log('注册成功!');
    }).catch(() => {
      console.log('注册失败');
    });
  });
}
```



## 20. 多进程打包

使用**thread-loader**进行, 需要给哪一类文件开启多进程打包, 就在对应loader下面使用

只有总体打包消耗工作时间比较长才需要使用多进程打包

一般可以在babel打包的时候使用

```js
{
    test: /\.js$/,
    exclude: /node_module/,
    use: [
        // 开启多进程打包
        'thread-loader',
        {
            loader: 'babel-loader',
            options:{
                presets: [
                    [
                        '@babel/preset-env',
                        {
                            // 按需加载
                            useBuiltIns: 'usage',
                            //指定core-js版本
                            corejs: {
                                version: 3
                            },
                            // 指定兼容性做到哪个浏览器
                            targets: {
                                chrome: '60',
                                firefox: '60',
                                ie: '9',
                                safari: '10',
                                edge: '17'
                            }
                        }
                    ]
                ],
                cacheDirectory: true
            }
        }
    ],
}
```



指定进程数量:

```js
{
    loader:'thread-loader',
    options:{
        workers: 2
    }
}
```



## 21. externals

阻止指定module打包进bundle中, 比如希望通过cdn引入时

例如: 防止js中引入的jquery被打包:

```js
externals: {
    // 忽略库名 -- npm包名
    jquery: 'jQuery'
}
```



## 22. dll

将多个库分别打包为单独chunk

*解决重复打包第三方库的问题*

*optimization虽然也分离第三方库, 但是仍需要重新打包*



webpack.dll.js配置编写

作用: 将第三方库单独输出为js

```js
const {resolve} = require('path');
const webpack = require('webpack');

/*
    使用dll技术对某些库(第三方库)进行单独打包
    运行指令: webpack --config webpack.dll.js
*/
module.exports = {
    entry: {
        // 最终打包生成的[name] --> jquery
        // ['jquery'] --> 要打包的库是jquery
        jquery: ['jquery']
    },
    output:{
        filename: '[name].js',
        path: resolve(__dirname, 'dll'),
        library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // 打包生成一个manifest.json文件，提供和jquery的映射
        new webpack.DllPlugin({
            name: '[name]_[hash]', // 映射库的暴露的内容
            path: resolve(__dirname, 'dll/manifest.json')
        })
    ],
    mode: 'production'
}
```



webpack.config.js配置

作用: 

1. 告诉webpack哪些库不需要打包(之前已经导出为dll的库)
2. 将第三方库输出到build下, 并在html中自动引入该第三方资源

```js
// 告诉webpack哪些库不参与打包,同时使用时名称也需要修改,但是最终并未引入包
new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
}),
// 将某个文件打包输出出去,并在html中自动引入该资源
new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js'),
    outputPath: 'auto'
})
```



## 23. entry详细配置

1. string写法  --> './src/index.js'

   打包形成一个chunk，输出一个bundle文件

   ```js
   const {resolve} = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports = {
       entry: './src/index.js',
       output: {
           filename: 'built.js',
           path: resolve(__dirname, 'build')
       },
       plugins:[
           new HtmlWebpackPlugin()
       ],
       mode: 'development'
   }
   ```

2. Array写法

   多入口, 所有入口文件最终只会生成一个chunk, 输出只有一个bundle

   **-->通常来说, 只有在HMR功能中, 通过多入口让html热更新生效**

   ```js
   const {resolve} = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports = {
       entry: ['./src/index.js' , './src/add.js'],
       output: {
           filename: '[name].js',
           path: resolve(__dirname, 'build')
       },
       plugins:[
           new HtmlWebpackPlugin()
       ],
       mode: 'development'
   }
   ```

   

3. object写法

   多入口, 有几个入口文件就形成几个chunk，输出几个bundle文件

   此时[name]为key值

   特殊用法: 与数组结合

   ```js
   const {resolve} = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   
   module.exports = {
       entry: {
           index: ['./src/index.js', './src/count.js'],
           add: './src/add.js'
       },
       output: {
           filename: '[name].js',
           path: resolve(__dirname, 'build')
       },
       plugins:[
           new HtmlWebpackPlugin()
       ],
       mode: 'development'
   }
   ```

   

## 24. output详细配置

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称(可以指定名称 + 目录)
        filename: 'js/[name].js',
        // 指定输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build'),
        // 所有资源引入的公共路径前缀 --> 补充到path的前面 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
        publicPath: '/',
        // 非入口chunk的名称 如import动态导入或者optimization分割的chunk
        chunkFilename: '[name]_chunk.js',
        // js文件整个库向外暴露出去的变量名
        library: '[name]',
        libraryTarget: 'window' // 变量名添加到哪个上 browser
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}
```



## 25. module详细配置

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        // 文件名称(可以指定名称 + 目录)
        filename: 'js/[name].js',
        // 指定输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                // 多个loader用use
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                // 排除文件
                exclude: /node_modules/,
                // 只检查src下的js文件
                include: resolve(__dirname, 'src'),
                // 优先执行
                enforce: 'pre',
                // 延后执行
                // enforce: 'post',
                // 单个loader用loader
                loader: 'eslint-loader'
            },
            {
                // 通常每个不同类型的文件在loader转换时，都会被命中，遍历module中rules中所有loader
                // oneOf 只要匹配即退出, 根据文件类型选择对应的loader
                // 不能有两个loader处理同一种文件
                oneOf:[]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode: 'development'
}
```



## 26. resolve解析模块详细配置

解析模块的规则设置

```js
const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/js/index.js',
    output: {
        // 文件名称(可以指定名称 + 目录)
        filename: 'js/[name].js',
        // 指定输出文件目录(将来所有资源输出的公共目录)
        path: resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode: 'development',
    
    // 解析模块的规则
    resolve: {
        // 配置解析模块路径别名
        // 例如 将src/css 替换为 $css
        // 优点: 简写路径 
        // 缺点: 没有提示
        alias: {
            $css: resolve(__dirname, 'src/css')
        },
        
        // 配置省略文件路径的后缀名 --> './css/index'
        // 文件名一样则匹配第一个遇到的, 命名时需要注意
        extensions: ['.js', '.json', '.css'],

        // 告诉webpack解析模块时是去找哪个目录
        modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
    }
}
```



## 27. devServer详细配置

```js
     // 开发服务器 devServer: (用来自动化编译，自动打开浏览器，自动刷新浏览器)
     // 特点: 只会在内存中编译打包, 不会有任何输出
     devServer:{
         // --- 运行代码的目录 --- 
         // Webpack4用法
         // contentBase: resolve(__dirname, 'build'),
         // Webpack5用法
         static: resolve(__dirname, 'build'),
         // 监视运行目录下的所有文件
         watchcontentBase: true,
         watchOptions: {
             // 忽略监视的文件
             ignored: /node_modules/
         },
         // 启动gzip压缩, 使代码体积更小，启动更快
         compress: true,
         // 端口号
         port: 3000,
         // 域名
         host: 'localhost',
         // 自动打开浏览器
         open: true,
         // 开启HMR功能 webpack5自动开启
         hot: true,
         // 不需要显示启动服务器日志
         clientLogLevel: 'none',
         // 除了一些基本启动信息以外,其他内容都不要打印
         quiet: 'true',
         // 如果出现错误,不要全屏提示~
         overlay: false,
         // 服务器代理 --> 解决开发环境下跨域问题
         proxy: {
             // 一旦devServer(port:5000)服务器接收到/api/xxx的请求, 就会把请求转发到另外一个服务器(port:3000)
             '/api': {
                 target: 'http://localhost:3000',
                 // 发送请求时,请求路径重写: 将api/xxx --> /xxx(去掉/api)
                 pathRewrite: {
                     '^/api' : ''
                 }
             }
         }
     }
```



## 28. optimization详细配置

优化配置选项

```js
    optimization: {
        splitChunks: {
            chunks: 'all',
            // 下面所有的都默认就行, 通常不需要配置
            minSize: 30 * 1024, // 分割的chunk最小为30kb
            maxSize: 0, // 最大没有限制
            minChunks: 1, // 要提取的chunk最少要被引用1次
            maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量
            maxInitialRequests: 3, // 入口js文件最大并行请求数量
            automaticNameDelimiter: '~', // 名称连接符
            name: true, // 可以使用命名规则
            cacheGroup: { // 分割chunk的组
                // node_modules中的文件会被打包到vendors组的chunk中 --> vecdors~0.js
                // 满足上面的公共规则
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    // 被提取的chunk最少要被引用2次
                    minChunks: 2,
                    priority: -20,
                    // 如果当前要打包的模块和之前已经被提取的模块是同一个,就会复用,而不是重新打包模块
                    reuseExistingChunk: true
                }
            }
        }
        // 解决: 修改a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: entrypoint => `runtime-$(entrypoint.name)`
        },
        minimizer: [
            // 配置生产环境的压缩方案: js和css
            new TerserWebpackPluging({
                // 开启缓存
                cache: true,
                // 并行打包
                parallel: true,
                // 启用source-map 否则会被压缩
                sourceMap: true,
            })
        ]
    }
```



---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/posts/2022-3-17-webpacklearn/  

