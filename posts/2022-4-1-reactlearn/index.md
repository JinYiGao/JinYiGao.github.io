# React全家桶学习笔记


## 1. React简介

React 是 Facebook 在 2011 年开发的前端 JavaScript 库。它遵循基于组件的方法，有助于构建可重用的UI组件。

它使用虚拟DOM而非真实DOM

**虚拟DOM与真实DOM比较：**

1. 虚拟DOM本质是一个js的对象
2. 虚拟DOM比较“轻”，真实DOM比较“重”(自带属性很多)
3. 虚拟DOM最终会被转化为真实DOM



## 2. JSX语法规则

JSX 是JavaScript XML 的简写。是 React 使用的一种文件。

1. 定义虚拟DOM时，不要写引号
2. 标签中混入**JS表达式**时要用{ }
3. 样式的类名指定不要用class，要用className
4. 内联样式要用**{{key: value}}**形式去写, 外部花括号表示里面要写js表达式, 内层花括号表示对象
5. 虚拟DOM必须只有一个根标签
6. 标签必须闭合
7. 标签首字母
   1. 若小写字母，则React会将标签转为html同名元素
   2. 若大写字母开头，则react则去渲染同名组件

```react
<script type="text/babel">
    const myID = "title";
    const myData = "Hello React";

    // 1. 创建虚拟DOM
    const VDOM = (  /* 不写引号 */
    <div>
        <h1 className="title" id ={myID}>
            <span style={{color: "white", fontSize:"30px"}}>{myData}</span>
        </h1>
        <h1 className="title" id ={myID + '1'}>
            <span style={{color: "white", fontSize:"30px"}}>{myData}</span>
        </h1>
        <input type="text"></input>
    </div>
    ) 
    // 2. 渲染虚拟DOM到页面
    ReactDOM.render(VDOM, document.getElementById('test'));
</script>
```



## 3. React面向组件编程

### 3.1. 函数式组件

```react
<script type="text/babel">
    // 1. 创建函数式组件
    function Demo(){
        return <h1>Hello React</h1>
    }

    ReactDOM.render(<Demo/>, document.getElementById("test"));
</script>
```

### 3.2 类式组件

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Demo2 extends React.Component{
        render(){
            return <h1>Hello React!!!</h1>
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Demo2/>, document.getElementById("test"));
</script>
```



## 4. React组件三大核心属性

### 4.1. state

状态(state)不可直接更改，需要借助setState进行更新，且更新是**合并**的形式，不是替换。

**setState()以后组件会调用render()重新渲染**

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Weather extends React.Component{
        constructor(props){
            super(props);
            // 初始化状态
            this.state = {
                isHot: true
            };
			// 改变this指向
            this.changeWeather = this.changeWeather.bind(this);
        }
        render(){
            return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h1>
        }
        changeWeather(){
            // 由于changeWeather是作为onclick的回调,不是通过实例调用的,是直接调用
            // 类中的方法默认开启局部严格模式
            // 所以this为 undefined
            const isHot = this.state.isHot;
            this.setState({
                isHot: !isHot
            });
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Weather/>, document.getElementById("test"));
</script>
```



state简化写法: 

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Weather extends React.Component{
        // 初始化状态
        state = {
            isHot: true,
            wind: '微风'
        };

        render(){
            return <h1 onClick={this.changeWeather}>今天天气很{this.state.isHot ? '炎热' : '凉爽'}, { this.state.wind }</h1>
        }

        // 自定义方法
        // 箭头函数this取决于外部this
        changeWeather = ()=>{
            const isHot = this.state.isHot;
            this.setState({
                isHot: !isHot,
            });
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Weather/>, document.getElementById("test"));
</script>
```



### 4.2. props

props用于外部传值，一但定义不允许在组件内进行更改.

组件标签内以属性定义方式进行传值

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Person extends React.Component{
        render(){
            console.log(this);
            return (
                <ul>
                    <li>姓名: {this.props.name}</li>
                    <li>性别: 女</li>
                    <li>年龄: 18</li>
                </ul>
            )
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Person name="Jin"/>, document.getElementById("test"));
</script>
```



批量传递标签属性:

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Person extends React.Component{
        render(){
            console.log(this);
            return (
                <ul>
                    <li>姓名: {this.props.name}</li>
                    <li>性别: {this.props.sex}</li>
                    <li>年龄: {this.props.age}</li>
                </ul>
            )
        }
    }
    const p = {name: "jin", sex:"男", age: 19};
    // 2. 渲染组件到页面
    ReactDOM.render(<Person {...p}/>, document.getElementById("test"));
</script>
```



props简写形式，标签类型限制，默认属性定义:

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Person extends React.Component{
        // 对标签属性进行限制
        static propTypes = {
            name: PropTypes.string.isRequired, // 限制必传 且为字符串
            sex: PropTypes.string,
            age: PropTypes.number,
            speak: PropTypes.func,
        };
        // 指定默认标签属性
        static defaultProps = {
            sex: "男",
            age: 100
        }

        render(){
            console.log(this);
            return (
                <ul>
                    <li>姓名: {this.props.name}</li>
                    <li>性别: {this.props.sex}</li>
                    <li>年龄: {this.props.age}</li>
                </ul>
            )
        }
    }
    const p = {name: "jin", sex:"男", age: 19};
    // 2. 渲染组件到页面
    ReactDOM.render(<Person {...p}/>, document.getElementById("test"));
    ReactDOM.render(<Person name="Tom"  sex="woman"/>, document.getElementById("test1"));
</script>
```



constructor中props问题

```react
// 不接受props 构造器中可能获取不到props值.
// constructor(){
//     super();
//     console.log(this.props);    -------   undefined
// }
constructor(props){
    super(props);
    console.log(this.props);
}
```



### 4.3. refs

组件内的html标签可以定义ref属性来标识自己，React会将其收集到组件实例的refs属性内.

利用refs可以获取到ref属性标识的dom节点

**不应该过度使用ref**

1. **字符串形式ref (不推荐)**

   ```react
   <script type="text/babel">
       // 1. 创建类式组件
       class Demo extends React.Component{
           render(){
               return (
                   <div>
                       <input ref="input1" type="text" placeholder="点击按钮提示数据" />
                       <button ref="btn1" onClick={this.showData}>点我提示左侧数据</button>
                       <input ref="input2" type="text" placeholder="失去焦点提示数据" />
                   </div>
               )
           }
   
           showData = ()=>{
               console.dir(this.refs.input1);
           }
       }
       // 2. 渲染组件到页面
       ReactDOM.render(<Demo />, document.getElementById("test"));
   </script>
   ```

   

2. **回调形式ref**

   如果回调函数是以内联方式定义的，则在组件更新过程中它会被执行两次，第一次传入参数为null，第二次会传入参数DOM元素.（不是啥大问题）

   通过将ref的回调函数定义成class的绑定函数(实例方法)可以避免上述问题.

   ```react
   <script type="text/babel">
       // 1. 创建类式组件
       class Demo extends React.Component{
           state = {
               isHot: true
           }
           render(){
               console.log(this);
               return (
                   <div>
                       <input ref={(currentNode)=>{
                               // 回调参数为dom节点本身
                               this.input1 = currentNode;
                               console.log('被调用');
                           }} 
                           type="text" placeholder="点击按钮提示数据" />
                       <button ref={(currentNode)=>{
                               // 回调参数为dom节点本身
                               this.btn1 = currentNode;
                           }}
                           onClick={this.showData}>点我提示左侧数据</button>
                       <input ref={(currentNode)=>{
                               // 回调参数为dom节点本身
                               this.input2 = currentNode;
                           }}
                           type="text" placeholder="失去焦点提示数据" />
                       <br />
                       <span>今天天气很{this.state.isHot ? "炎热" : "凉爽"}!!</span>
                   </div>
               )
           }
   
           showData = ()=>{
               console.log(this.input1.value);
               const { isHot } = this.state;
               this.setState({isHot: !isHot});
           }
       }
       // 2. 渲染组件到页面
       ReactDOM.render(<Demo />, document.getElementById("test"));
   </script>
   ```

   

3. **createRef**

   React.createRef()函数调用后返回一个容器, 该容器用于存储ref所标识的dom节点, 需要多少个节点就创建多少个ref容器

   ```react
   <script type="text/babel">
       // 1. 创建类式组件
       class Demo extends React.Component{
           /* 
              React.createRef()调用后可以返回一个容器,该容器用于存储ref所标识的dom节点
              该容器只允许存一个节点
           */
           input1 = React.createRef();
           render(){
               return (
                   <div>
                       <input ref={this.input1} type="text" placeholder="点击按钮提示数据" />
                       <button ref="btn1" onClick={this.showData}>点我提示左侧数据</button>
                       <input ref="input2" type="text" placeholder="失去焦点提示数据" />
                   </div>
               )
           }
   
           showData = ()=>{
               console.log(this.input1);
           }
       }
       // 2. 渲染组件到页面
       ReactDOM.render(<Demo />, document.getElementById("test"));
   </script>
   ```

   

## 5. React中的事件处理

1. 通过onXxx属性指定事件处理函数(注意大小写)

   a. React使用的是自定义(合成)事件，而不是使用原生DOM事件 ————为了更好的兼容性

   b. React中的事件是通过事件委托方式处理的(委托给最外层元素) ————为了高效

2. 通过event.target得到发生事件的DOM元素对象

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Demo extends React.Component{
        input1 = React.createRef();
        render(){
            console.log(this);
            return (
                <div>
                    <input ref={this.input1} type="text" placeholder="点击按钮提示数据" />
                    <button onClick={this.showData}>点我提示左侧数据</button>
                    <input onBlur={this.showData2} type="text" placeholder="失去焦点提示数据" />
                </div>
            )
        }

        showData = ()=>{
            console.log(this.input1.current.value);
        }

        showData2 = (event)=>{
            console.log(event.target.value);
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Demo />, document.getElementById("test"));
</script>
```

### 5.1 非受控组件

顾名思义，非受控组件即不受状态控制，获取数据即操作DOM，即用即取

以做一个用户登录表单提交为例

实现方法可以有利用ref获取dom节点，在登录提交时获取对应节点值，但ref不建议过度使用

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Login extends React.Component{
        render(){
            return (
                <form onSubmit={this.handleSubmit}>
                    用户名: <input ref={(c)=>this.username = c} type="text" name="username"/>
                    密码: <input ref={(c)=>this.password = c} type="password" name="password"/>
                    <button> 登录 </button>
                </form>
            )
        }

        handleSubmit = (event)=>{
            event.preventDefault();
            console.log(this.username.value, this.password.value);
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Login />, document.getElementById("test"));
</script>
```



### 5.2 受控组件

受控组件必须要有value和onChange，onChange用于获取value，保存在状态中，在需要时从状态中去获取值

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Login extends React.Component{
        state = {
            username: "",
            password: ""
        }
        render(){
            console.log(this);
            return (
                <form onSubmit={this.handleSubmit}>
                    用户名: <input value="111" onChange={this.saveUsername} type="text" name="username"/>
                    密码: <input onChange={this.savePassword} type="password" name="password"/>
                    <button> 登录 </button>
                </form>
            )
        }

        handleSubmit = (event)=>{
            event.preventDefault();
            console.log(this.username.value, this.password.value);
        }

        saveUsername = (event)=>{
            console.log(event.target.value);
            this.setState({username: event.target.value});
        }

        savePassword = ()=>{
            this.setState({password: event.target.value});
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Login />, document.getElementById("test"));
</script>
```



### 5.3 函数柯里化

函数柯里化：通过函数调用继续返回函数的方式，实现多次接收参数最后统一处理的函数编码形式。

上述onChange每一个事件都要绑定一个不同函数，显然面对多条input时会造成代码冗余

因此，可以利用函数闭包，接收数据类型参数，返回真正调用的函数，根据数据类型参数来对对应状态进行赋值

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Login extends React.Component{
        state = {
            username: "",
            password: ""
        }
        render(){
            console.log(this);
            return (
                <form onSubmit={this.handleSubmit}>
                    用户名: <input onChange={this.saveFormData('username')} type="text" name="username"/>
                    密码: <input onChange={this.saveFormData('password')} type="password" name="password"/>
                    <button> 登录 </button>
                </form>
            )
        }

        handleSubmit = (event)=>{
            event.preventDefault();
            console.log(this.state.username, this.state.password);
        }

        saveFormData = (dataType)=>{
            // this.setState({username: event.target.value});
            return (event)=>{
                console.log(dataType);
                console.log(event.target.value);
                this.setState({[dataType]: event.target.value});
            }
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<Login />, document.getElementById("test"));
</script>
```



## 6. React组件的生命周期

React组件包含一系列钩子函数(生命周期回调函数)，会在特定的时刻调用。

![image-20220407170133979](https://img.gujin.store/img/image-20220407170133979.png)

### 6.1. React生命周期(旧)

**初始化阶段** —— 由React.render()触发

1. constructor

   构造函数构建组件实例

2. 组件将要被挂载

   componentWillMount(){}

3. 初始化渲染

   render()

4. 组件挂载完毕

   componentDidMount(){}

   **注意：比较常用，一般用于做一些初始化的事，例如：开启定时器，发送网络请求，订阅消息**

5. 组件即将卸载

   componentWillUnmount(){}

   **注意：比较常用，一般用于做一些收尾的事，例如：关闭定时器，取消订阅消息**

6. 卸载组件

   ReactDOM.unmountComponentAtNode(document.getElementById("test"))



**Update**

1. componentWillReceiveProps(props)

   组件将要接收到props，触发后续更新

   **注意：第一次接收到props不会触发**

2. setState()

   设置state，触发后续更新

3. forceUpdate()

   强制更新, 比正常跟新少了一个shouldUpdate

4. 组件是否应该更新

   shouldComponentUpdate(nextProps, nextState){} 

5. 组件将要更新

   componentWillUpdate(){}

6. 组件更新完毕

   componentDidUpdate(){}

   

```react
<script type="text/babel">
    // 1. 创建类式组件
    class Count extends React.Component{
        constructor(props){
            console.log("constructor");
            super(props);
            this.state = {
                count: 0
            }
        }

        componentWillMount(){
            console.log("componentWillMount");
        }

        componentDidMount(){
            console.log("componentDidMount");
        }

        componentWillUnmount(){
            console.log("componentWillUnmount");
        }

        shouldComponentUpdate(){
            console.log("shouldComponentUpdate");
            return true;
        }

        componentWillUpdate(){
            console.log("componentWillUpdate");
        }

        componentDidUpdate(){
            console.log("componentDidUpdate");
        }

        render(){
            console.log("Render");
            return (
                <div>
                    <h2>当前求和: {this.state.count}</h2>
                    <button onClick={this.add}>点我加1</button>
                    <button onClick={this.death}>卸载组件</button>
                    <button onClick={this.force}>强制更新</button>
                </div>
            )
        }

        add = ()=>{
            let count = this.state.count;
            this.setState({count: count + 1})
        }

        death = ()=>{
            ReactDOM.unmountComponentAtNode(document.getElementById("test"));
        }

        force = ()=>{
            this.forceUpdate();
        }
    }

    class A extends React.Component{
        state = {
            carName: "奔驰"
        }

        render(){
            return (
                <div>
                    <div>我是A组件</div>
                    <button onClick={this.changeCar}>换车</button>
                    <B carName={this.state.carName}/>
                </div>
            )
        }

        changeCar = ()=>{
            let carName = this.state.carName;
            this.setState({carName: carName == "奔驰" ? "奥拓" : "奔驰"});
        }
    }

    class B extends React.Component{
        componentWillReceiveProps(props){
            console.log("componentWillReceiveProps", props);
        }

        render(){
            return (
                <div>我是B组件,接收到的车是{this.props.carName}</div>
            )
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<A />, document.getElementById("test"));
</script>
```



### 6.2. React生命周期(新)

新版本生命周期和旧版本没太大区别，主要区别如下：

- **componentWillMount()**
- **componentWillUpdate()**
- **componentWillReceiveProps()**

以上三个在新版本中需要加上UNSAFE_前缀使用，如**UNSAFE_componentWillMount()**

这里的UNSAFE不是指安全性，而是指使用这些生命周期函数的代码在未来版本中可能会出现bug，React未来打算实现异步渲染。



同时新增了下列两个生命周期函数：

- `getDerivedStateFromProps()`: 在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。返回一个state状态对象或者null，根据 shouldComponentUpdate() 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。

  **此方法适用于一些极其特殊的时刻，state的值在任何时候都取决于props**

- `getSnapshotBeforeUpdate()`: 在更新时调用，最近一次渲染输出（提交到 DOM 节点）之前调用，获取快照，此函数任何返回值都将作为参数传递给`componentDidUpdate()`，此方法也不常用



**新版Update调用顺序：**

1. `getDerivedStateFromProps()`
2. `shouldComponentUpdate()`
3. `render()`
4. `getSnapshotBeforeUpdate()`
5. `componentDidUpdate(preProps, preState, snapshotValue)`



`getSnapshotBeforeUpdate()`用法示例：

```react
<script type="text/babel">
    // 1. 创建类式组件
    class NewsList extends React.Component{
        state = {
            newsArr:[]
        }

        componentDidMount(){
            setInterval(() => {
                const newsArr = this.state.newsArr;
                const news = '新闻' + (newsArr.length + 1);
                this.setState({newsArr : [news, ...newsArr]});
            }, 1000);
        }

        getSnapshotBeforeUpdate(){
            // 返回更改前内容区高度
            return this.refs.list.scrollHeight;
        }

        componentDidUpdate(preProps, preState, snapshotVal){
            this.refs.list.scrollTop += this.refs.list.scrollHeight - snapshotVal;
        }

        render(){
            return(
                <div className="list" ref="list">
                    {
                        this.state.newsArr.map((val, index)=>{
                            return <div className="news" key={index}>{val}</div>
                        })
                    }
                </div>
            )
        }
    }
    // 2. 渲染组件到页面
    ReactDOM.render(<NewsList />, document.getElementById("test"));
</script>
```



## 7. DOM的diff算法

1. **虚拟DOM中key的作用**

   a. 简单地说，key是虚拟dom对象的标识

   b. 当状态中的数据发生变化时，React会根据【新数据】生成【新的虚拟dom】随后，React进行【新虚拟dom】和【旧虚拟dom】的diff比较

   ​	比较规则下：

    1. 旧虚拟dom中找到了与新虚拟dom相同的key

       若虚拟dom的内容没变，则直接使用之前的真实dom。

       若虚拟dom的内容变了，则生成新的真实dom，随后替换掉页面中之前的真实dom

    2. 就虚拟dom中没有找到与新的虚拟dom相同的key

       根据数据创建新的真实dom，随后渲染到页面

       

2. **用index作为key可能会引发的问题**

   a. 若对数据进行：逆序添加，逆序删除等破坏顺序的操作(例如，在数组首位添加删除元素)：

   ​	会产生没有必要的真实DOM的更新(因为index变了)

   b. 若结构中还包含输入类的dom：

   ​	会产生错误DOM更新

   c. 若仅用于渲染列表用于展示，则用index没有问题，但是数据量大进行逆序操作会引发效率问题



## 8. React脚手架使用

### 8.1. 创建项目并启动

- 全局安装

  `npm install -g create-react-app`

- 创建项目

  `create-react-app hello-react`

- 启动项目

  `npm start`

- 打包项目

  `npm run build`

  

React项目内组件一般用jsx后缀结尾(用js也能用，一般为了区分)



## 9. React父子组件通信

### 9.1. 父组件给子组件传递数据

通过props方式传递

### 9.2. 子组件给父组件传递数据

也是通过props方式，但是父组件要先定义一个修改数据的函数，将该函数传递给子组件，子组件调用函数对父组件数据进行修改

```react
class App extends React.Component{
    state = {
        todos:[
            {id: '001', name: '吃饭' , done: true},
            {id: '002', name: '睡觉' , done: true},
            {id: '003', name: '敲代码' , done: false},
            {id: '004', name: '逛街' , done: true}
        ]
    }

    addTodo = (todo)=>{
        this.setState({todos: [...this.state.todos, todo]});
    }

    deleteTodo = (id)=>{
        var newTodos = this.state.todos.filter((todo)=>{
            return todo.id !== id;
        })
        this.setState({todos: newTodos});
    }

    changeTodo = (id, done)=>{
        const newTodos = this.state.todos.map((todo)=>{
            if(todo.id === id){
                todo.done = done;
            }
            return todo;
        })
        this.setState({todos: newTodos});
    }

    checkAllTodos = (done)=>{
        const {todos} = this.state;
        const newTodos = todos.map((todo)=>{
            return {...todo, done: done};
        })
        this.setState({todos: newTodos});
    }
    
    clearAllDone = ()=>{
        const {todos} = this.state;
        const newTodos = todos.filter((todo)=>{
            return !todo.done;
        })
        this.setState({todos: newTodos});
    }

    render(){
        return (
            <div className="todo-container">
                <div className="todo-wrap">
                <Header addTodo={this.addTodo}></Header>
                <List todos={this.state.todos} changeTodo={this.changeTodo} deleteTodo={this.deleteTodo}></List>
                <Footer todos={this.state.todos} checkAllTodos={this.checkAllTodos} clearAllDone={this.clearAllDone}>						</Footer>
                </div>
            </div>
        )
    }
}
```



## 10. React兄弟组件通信 

**消息订阅与发布**

**工具库: PubSubJS**

适用于任意组件间通信

```js
import PubSub from 'pubsub-js'

// 消息订阅 用于需要获取数据的组件
var token = PubSub.subscribe('MY TOPIC', mySubscriber);

// 消息发布 用于需要传递数据的组件
PubSub.publish('MY TOPIC', 'hello world!');

// 取消订阅
PubSub.unsubscribe(token);
```



## 11. React代理配置

1. 单个服务器代理

   直接在package.json中加上 `”proxy“:"http://localhost:xxxx"`

2. 多代理配置

   在src下建立setupProxy.js文件

   ```js
   // CommonJS语法
   const {createProxyMiddleware} = require('http-proxy-middleware');
   
   module.exports = function(app){
       app.use(
           createProxyMiddleware('/api1', {        // 遇见前缀为 /api1 的请求, 就会触发该代理配置
               target: 'http://localhost:5000',    // 请求转发给谁
               changeOrigin: true,                 // 控制服务器接受到的请求头中Host字段的值 为true时 服务器收到请求头为localhost:5000 												//								   为flase时 服务器收到请求头为localhost:3000
               pathRewrite: {'^/api1':''}          // 重写请求路径
           })
       ),
       app.use(
           createProxyMiddleware('/api2', {
               target: 'http://localhost:5001',
               changeOrigin: true,
               pathRewrite: {'^/api2':''}
           })
       )
   }
   ```

   

## 12. React路由

### 12.1. SPA概念

1. 单页Web应用（single page web application, SPA） 

2. 整个应用只有一个完整的页面
3. 点击页面中的链接浏览器不会刷新页面，只会做页面的局部更新
4. 数据都需要通过ajax获取，并在前端异步展示



### 12.2. 路由概念

1. 一个路由就是一个映射关系(key: value)
2. key为路径, value可能是function或者component

**路由分类：**

1. 后端路由

   比如node中，value是function，用于处理客户端提交的请求

   app.get(key, function(req, res){})

1. 前端路由

   浏览器路由，value是component，用于展示页面内容



### 12.3. react-router

react-router包括有Web，Native，Any

在这里学习使用web上的react路由使用，需要下载`react-router-dom`

1. **最基本路由使用**

   `<Link>`标签编写路由路径

   `<Route>`标签注册路由组件

   最外部需要包一个 `<BroserRouter>`或者 `<HashRouter>`，路由才会生效

   ```react
   export default class App extends Component {
     render() {
       return (
         <div>
           <div className="row">
             <div className="col-xs-offset-2 col-xs-8">
               <div className="page-header"><h2>React Router Demo</h2></div>
             </div>
           </div>
           <div className="row">
             <div className="col-xs-2 col-xs-offset-2">
               <div className="list-group">
                 {/* 编写路由链接 */}
                 <Link className='list-group-item' to="/about">About</Link>
                 <Link className='list-group-item' to="/home">Home</Link>
               </div>
             </div>
             <div className="col-xs-6">
               <div className="panel">
                 <div className="panel-body">
                   {/* 注册路由 */}
                   <Route path="/about" component={About}/>
                   <Route path="/home" component={Home}/>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )
     }
   }
   ```

   ```react
   const root = createRoot(document.getElementById('root'));
   root.render(<BrowserRouter><App></App></BrowserRouter>);
   ```

   

2. **NavLink使用**

   `<NavLink>`可以看作是 `<Link>`的升级版，在路由被激活时，会追加一个激活后的样式，默认追加类名为`active`

   ```react
   export default class App extends Component {
     render() {
       return (
         <div>
           <Header/>
           <div className="row">
             <div className="col-xs-2 col-xs-offset-2">
               <div className="list-group">
                 {/* 编写路由链接 */}
                 <NavLink activeClassName='active' className='list-group-item' to="/about">About</NavLink>
                 <NavLink activeClassName='active' className='list-group-item' to="/home">Home</NavLink>
               </div>
             </div>
             <div className="col-xs-6">
               <div className="panel">
                 <div className="panel-body">
                   {/* 注册路由 */}
                   <Route path="/about" component={About}/>
                   <Route path="/home" component={Home}/>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )
     }
   }
   ```

   

3. **封装NavLink组件**

   原生NavLink组件每一次编写都要指定activeClassName，className等属性，造成代码冗余，因此需要对其进行封装，每次使用只需要指定to属性即可。

   **注意: React组件标签间值会自动作为key为`children`的属性传入组件props内**

   ```react
   export default class App extends Component {
     render() {
       return (
         <div>
           <Header/>
           <div className="row">
             <div className="col-xs-2 col-xs-offset-2">
               <div className="list-group">
                 <MyNavLink to="/about">About</MyNavLink>
                 <MyNavLink to="/home">Home</MyNavLink>
               </div>
             </div>
             <div className="col-xs-6">
               <div className="panel">
                 <div className="panel-body">
                   {/* 注册路由 */}
                   <Route path="/about" component={About}/>
                   <Route path="/home" component={Home}/>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )
     }
   }
   ```

   封装NavLink：

   ```react
   export default class MyNavLink extends Component {
     render() {
       return (
           <NavLink activeClassName='active' className='list-group-item' {...this.props}></NavLink>
       )
     }
   }
   ```

   

4. **Switch使用**

   如果一个路由路径指定了多个组件，则多个组件会一起展示

   用Switch标签包裹后即可实现单一匹配

   ```react
   <div className="panel-body">
       {/* 注册路由 */}
       <Switch>
           <Route path="/about" component={About}/>
           <Route path="/home" component={Home}/>
           <Route path="/home" component={Test}/>
       </Switch>
   </div>
   ```

   

5. **多级路由路径下刷新浏览器样式丢失问题**

   ```html
   // 1. 采用public绝对路径
   <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
   
   // 2.相对路径不要带. 
   <link rel="stylesheet" href="/css/bootstrap.css">
   
   // 3.采用HashRouter
   const root = createRoot(document.getElementById('root'));
   root.render(<HashRouter><App></App></HashRouter>);
   ```

   

6. **路由的模糊匹配与严格匹配**

   默认模糊匹配

   开启严格匹配：

   严格匹配不建议随意开启，有时会导致无法继续二级路由

   ```react
   export default class App extends Component {
     render() {
       return (
         <div>
           <Header/>
           <div className="row">
             <div className="col-xs-2 col-xs-offset-2">
               <div className="list-group">
                 <MyNavLink to="/about">About</MyNavLink>
                 <MyNavLink to="/home/a/b">Home</MyNavLink>
               </div>
             </div>
             <div className="col-xs-6">
               <div className="panel">
                 <div className="panel-body">
                   {/* 注册路由 */}
                   <Switch>
                     <Route exact={true} path="/about" component={About}/>
                     {/* 不开启严格匹配则该路由对NavLink指定的路径将会生效 */} 
                     <Route exact={true} path="/home" component={Home}/>
                   </Switch>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )
     }
   }
   ```

   

7. **Redirect使用**

   Redirect组件用于重定向，一般用于页面打开时默认展示路由

   当Route一个都没有匹配时，前往Redirect指定的路由路径

   ```react
   export default class App extends Component {
     render() {
       return (
         <div>
           <Header/>
           <div className="row">
             <div className="col-xs-2 col-xs-offset-2">
               <div className="list-group">
                 <MyNavLink to="/about">About</MyNavLink>
                 <MyNavLink to="/home">Home</MyNavLink>
               </div>
             </div>
             <div className="col-xs-6">
               <div className="panel">
                 <div className="panel-body">
                   {/* 注册路由 */}
                   <Switch>
                     <Route path="/about" component={About}/>
                     <Route path="/home" component={Home}/>
                     <Redirect to="/About"></Redirect>
                   </Switch>
                 </div>
               </div>
             </div>
           </div>
         </div>
       )
     }
   }
   ```

   

8. **嵌套路由**

   注意不要随便开启严格模式

   嵌套路由是按照路由注册顺序依次进行匹配的

   

9. **向路由组件传递params参数**

   在定义路由时以模板字符串形式定义参数内容（value）；

   在注册路由时声明接收params参数，以key形式声明

   参数将会保存在路由组件内props属性内

   ```react
   export default class Message extends Component {
     state = {
         messageArr: [
             {id: '001', title: '消息1'},
             {id: '002', title: '消息2'},
             {id: '003', title: '消息3'},
         ]
     }
     render() {
       return (
         <div>
           <ul>
             {
                 this.state.messageArr.map((message)=>{
                     return (
                       <li key={message.id}>
                           {/* 向路由组件传递params参数 */}
                           <Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link>
                       </li>
                     )
                 })
             }
           </ul>
           <hr></hr>
           {/* 声明接收params参数 */}
           <Route path="/home/message/detail/:id/:title" component={Detail}></Route>
         </div>
       )
     }
   }
   ```

   ![image-20220412112955796](https://img.gujin.store/img/image-20220412112955796.png)

   

10. **向路由组件传递search参数**

    以query的形式在路由路径内声明即可，

    参数保存在路由组件props的location内

    **需要通过qs模块进行解析**

    ```react
    export default class Message extends Component {
      state = {
          messageArr: [
              {id: '001', title: '消息1'},
              {id: '002', title: '消息2'},
              {id: '003', title: '消息3'},
          ]
      }
      render() {
        return (
          <div>
            <ul>
              {
                  this.state.messageArr.map((message)=>{
                      return (
                        <li key={message.id}>
                            {/* 向路由组件传递params参数 */}
                            {/* <Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link> */}
                            
                            {/* 向路由组件传递search参数 */}
                            <Link to={`/home/message/detail/?id=${message.id}&title=${message.title}`}>{message.title}</Link>
                        </li>
                      )
                  })
              }
            </ul>
            <hr></hr>
            {/* 声明接收params参数 */}
            {/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}
            
            {/* search参数无需声明接收 */}
            <Route path="/home/message/detail" component={Detail}></Route>
          </div>
        )
      }
    }
    ```

    ```react
    export default class Detail extends Component {
      render() {
        const {id, title} = qs.parse(this.props.location.search.slice(1));
        return (
          <div>
              <ul>
                  <li>{id}</li>
                  <li>{title}</li>
                  <li>Message</li>
              </ul>
          </div>
        )
      }
    }
    
    ```

    ![image-20220412114756638](https://img.gujin.store/img/image-20220412114756638.png)

    

11. **向路由组件传递state参数**

    以对象形式定义 `<Link>` 标签内的to属性，声明pathname以及state

    在路由组件内通过location属性内的state属性获取

    **参数不会在浏览器地址栏上显示，但是刷新可以正常显示，因为location也是作为hostory属性的一部分**

    ```react
    export default class Message extends Component {
      state = {
          messageArr: [
              {id: '001', title: '消息1'},
              {id: '002', title: '消息2'},
              {id: '003', title: '消息3'},
          ]
      }
      render() {
        return (
          <div>
            <ul>
              {
                  this.state.messageArr.map((message)=>{
                      return (
                        <li key={message.id}>
                            {/* 向路由组件传递params参数 */}
                            {/* <Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link> */}
                            
                            {/* 向路由组件传递search参数 */}
                            {/* <Link to={`/home/message/detail/?id=${message.id}&title=${message.title}`}>{message.title}</Link> */}
    
                            {/* 向路由组件传递state参数 */}
                            <Link to={{pathname: '/home/message/detail', state:{id:message.id, title:message.title}}}>{message.title}</Link>
                        </li>
                      )
                  })
              }
            </ul>
            <hr></hr>
            {/* 声明接收params参数 */}
            {/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}
            
            {/* search参数无需声明接收 */}
            <Route path="/home/message/detail" component={Detail}></Route>
          </div>
        )
      }
    }
    
    ```

    

    ![image-20220412115509427](https://img.gujin.store/img/image-20220412115509427.png)

    

12. **push和replace模式**

    默认路由跳转是push模式，可以在 `<Link>` 标签内指定开启replace模式

    ```react
    <Link replace={true} to='/home/message/detail'>{message.title}</Link>
    ```

    

13. **编程式路由导航**

    有时候需要在没有 `<Link>` 标签的情况下实现路由导航

    借助路由组件内 `this.props.history` 属性以编程方式进行路由的跳转

    ```react
    export default class Message extends Component {
      state = {
          messageArr: [
              {id: '001', title: '消息1'},
              {id: '002', title: '消息2'},
              {id: '003', title: '消息3'},
          ]
      }
      render() {
        return (
          <div>
            <ul>
              {
                  this.state.messageArr.map((message)=>{
                      return (
                        <li key={message.id}>
                            {/* 向路由组件传递params参数 */}
                            <Link to={`/home/message/detail/${message.id}/${message.title}`}>{message.title}</Link>
                            <button onClick={()=>{this.pushShow(message.id, message.title)}}>push查看</button>
                            <button onClick={()=>{this.replaceShow(message.id, message.title)}}>replace查看</button>
                            
                            {/* 向路由组件传递search参数 */}
                            {/* <Link to={`/home/message/detail/?id=${message.id}&title=${message.title}`}>{message.title}</Link> */}
    
                            {/* 向路由组件传递state参数 */}
                            {/* <Link to={{pathname: '/home/message/detail', state:{id:message.id, title:message.title}}}>{message.title}</Link> */}
                        </li>
                      )
                  })
              }
            </ul>
            <hr></hr>
            {/* 声明接收params参数 */}
            {/* <Route path="/home/message/detail/:id/:title" component={Detail}></Route> */}
            
            {/* search参数无需声明接收 */}
            <Route path="/home/message/detail" component={Detail}></Route>
    
            <button onClick={this.back}>回退</button>
            <button onClick={this.forward}>前进</button>
          </div>
        )
      }
    
      back = ()=>{
          this.props.history.goBack();
      }
    
      forward = ()=>{
          this.props.history.goForward();
      }
    
      pushShow = (id, title)=>{
        //   this.props.history.push(`/home/message/detail/${id}/${title}`);
        // this.props.history.push(`/home/message/detail/?id=${id}&title=${title}`);
        this.props.history.push(`/home/message/detail`, {id, title});
      }
    
      // 实现replace跳转到Detail组件
      replaceShow = (id, title)=>{
        //   this.props.history.replace(`/home/message/detail/${id}/${title}`);
        // this.props.history.replace(`/home/message/detail/?id=${id}&title=${title}`);
        this.props.history.replace(`/home/message/detail/`, {id, title});
      }
    }
    ```

    

14. **withRouter使用**

    只有路由组件才有 `this.props.history` 属性

    对于一般组件如果想要实现路由跳转，需要使用 `withRouter` 函数进行跳转

    withRouter可以加工一般组件，让以班组间具有路由组件所特有的API，withRouter的返回值是一个新组件

    ```react
    class Header extends Component {
      render() {
          console.log(this);
        return (
            <div className="row">
                <div className="col-xs-offset-2 col-xs-8">
                    <div className="page-header"><h2>React Router Demo</h2></div>
                    <button onClick={this.back}>回退</button>
                    <button onClick={this.forward}>前进</button>
                </div>
            </div>
        )
      }
    
      back = ()=>{
          this.props.history.goBack();
      }
    
      forward = ()=>{
          this.props.history.goForward();
      }
    }
    
    export default withRouter(Header)
    ```

15. **BrowserRouter 和 HashRouter的区别**

    1. **底层原理不一样**

       BrowserRouter使用的是H5的history API，不兼容IE9及以下版本，

       HashRouter使用的是URL的哈希值

    2. **url表现形式不一样**

    3. **刷新后对路由state参数的影响**

       BrowserRouter没有任何影响，因为state保存在hostory对象中

       HashRouter刷新后会导致路由state参数丢失



### 12.4. 路由组件与一般组件的区别

1. 路由组件会默认收到路由器传递的props：**history，location，match**
2. 两者写法不同



## 13. redux

redux是一个专门用于做**状态管理**的JS库（不是react插件库）

作用：集中式管理react应用中多个组件共享的状态

![redux原理图](https://img.gujin.store/img/redux原理图.png)

### 13.1. redux三个核心概念

1. **action**

   - 动作的对象
   - 包含两个属性
     - type：表示属性，值为字符串，唯一
     - data：数据属性，可选
   - 例子：{type: “ADD_STUDENT”, data:{name: "J", age: 18}}

2. **reducer**

   - 用于初始化状态，加工状态
   - 加工时，根据旧的state和action，产生新的state的纯函数

3. **store**

   将state，action，reducer联系在一起的对象



### 13.2. redux核心API

-  **createstore()**

作用：创建包含指定reducer的store对象

- **store对象**

1. 作用: redux库最核心的管理对象

2. 它内部维护着:

   1)   state

   2)   reducer

3. 核心方法:

   1)   getState()

   2)   dispatch(action)

   3)   subscribe(listener)

4. 具体编码:

   1)   store.getState()

   2)   store.dispatch({type:'INCREMENT', number})

   3)   store.subscribe(render)

- **applyMiddleware()**

  作用：应用上基于redux的中间件(插件库)

-  **combineReducers()**

  作用：合并多个reducer函数



## 14. react-redux

一个react的插件库，专门用于简化在react应用中使用redux

react-redux将所有组件分为两大类：

- **UI组件**

  只负责UI呈现

  不使用redux的API

  通过props接收数据

- **容器组件**

  负责管理数据和业务逻辑

  使用redux的API

![react-redux模型图](https://img.gujin.store/img/react-redux模型图.png)



**基本使用：**

1. **如何创建一个容器组件**

   靠react-redux的connect函数

   mapStateToProps  返回store中的state对象传递给UI组件

   mapDispatchToProps 返回操作状态的方法对象dispatch传递给UI组件调用

   ```react
   // 引入Count的UI组件
   import CountUI from "../../components/Count";
   // 引入connect用于连接UI组件和redux
   import { connect } from "react-redux";
   import { createDecrementAction, createIncrementAction, createIncrementAsyncAction } from "../../redux/count_action";
   
   // a函数的返回值作为状态props传递给CountUI组件 state ———— redux保存的状态值
   function mapStateToProps(state){
       return {count: state};
   }
   
   function mapDispatchToProps(dispatch){
       return {
       increment: (data)=>{
           dispatch(createIncrementAction(data));
       },
       decrement:(data)=>{
           dispatch(createDecrementAction(data));
       },
       asyncIncrement: (data, time)=>{
           dispatch(createIncrementAsyncAction(data, time));
       }}
   }
   
   const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);
   
   export default CountContainer;
   ```

   

2. **容器组件中的store是靠props传递进去的**

   ```react
   import React, { Component } from 'react'
   // import Count from './components/Count'
   import CountContainer from './containers/Count'
   import store from './redux/store'
   
   export default class App extends Component {
     render() {
       return (
         <div>
           <CountContainer store={store}></CountContainer>
         </div>
       )
     }
   }
   ```

3. **Provider批量传递store**

   当需要给多个容器组件传递store时，在外部套一个 `<Provider>` 标签，给它传递一个store属性即可对所有容器组件进行传递

   ```react
   const root = createRoot(document.getElementById('root'));
   root.render(<Provider store={store}><App></App></Provider>);
   ```

   

4. **容器组件和UI组件可以整合成一个文件**

5. **combineReducer合并多个reducer**

   ```react
   // 引入createStore,专门用于创建redux中最为核心的store对象
   import { createStore, applyMiddleware, combineReducers } from "redux"
   // 引入为Count组件服务的reducer
   import countReducer from './reducers/count'
   import personReducer from "./reducers/person";
   import thunk from "redux-thunk"
   
   // 保存的对象键值就是以后需要用到的状态对象名
   const allReducer = combineReducers(
       {
           count: countReducer, 
           persons: personReducer
       }
   );
   
   const store = createStore(allReducer, applyMiddleware(thunk));
   
   // 暴露一个全局唯一store对象
   export default store
   ```

6. **redux-devtools-extension**

   redux开发者工具

   ```react
   import {composeWithDevTools} from 'redux-devtools-extension'
   const store = createStore(allReducer, composeWithDevTools(applyMiddleware(thunk)))
   ```

   

## 15. React扩展

### 15.1. setState

**setState更新状态两种方法：**

```shell
	(1). setState(stateObj, [callback])------对象式的setState
            1.stateObj为状态改变对象(该对象可以体现出状态的更改)
            2.callback是可选的回调函数, 它在状态更新完毕、界面也更新后(render调用后)才被调用
					
	(2). setState(updater, [callback])------函数式的setState
            1.updater为返回stateChange对象的函数。
            2.updater可以接收到state和props。
            4.callback是可选的回调函数, 它在状态更新、界面也更新后(render调用后)才被调用。
总结:
		1.对象式的setState是函数式的setState的简写方式(语法糖)
		2.使用原则：
				(1).如果新状态不依赖于原状态 ===> 使用对象方式
				(2).如果新状态依赖于原状态 ===> 使用函数方式
				(3).如果需要在setState()执行后获取最新的状态数据, 
					要在第二个callback函数中读取
```



### 15.2. lazyLoad

**路由组件的lazyLoad**

- **路由组件利用lazy函数动态加载**

```react
const Home = lazy(()=>import('./Home'))
const About = lazy(()=>import('./About'))
```

- **通过 `<Suspense>`标签自定义一个Loading界面**

```react
<div className="panel-body">
    {/* 注册路由 */}
    <Suspense fallback={<h1>Loading...</h1>}>
        <Route path="/about" component={About}/>
        <Route path="/home" component={Home}/>
    </Suspense>
</div>
```



### 15.2. Hooks

React Hooks可以让函数式组件使用state以及其他React特性

- **三个常用Hook**

```shell
(1). State Hook: React.useState()
(2). Effect Hook: React.useEffect()
(3). Ref Hook: React.useRef()
```

- **State Hook**

```shell
(1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
(2). 语法: const [xxx, setXxx] = React.useState(initValue)  
(3). useState()说明:
        参数: 第一次初始化指定的值在内部作缓存
        返回值: 包含2个元素的数组, 第1个为内部当前状态值, 第2个为更新状态值的函数
(4). setXxx()2种写法:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
```

- **Effect Hook**

  Effect Hooks用于模拟类式组件中生命周期钩子

```shell
(1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)
(2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
(3). 语法和说明: 
        useEffect(() => { 
          // 在此可以执行任何带副作用操作
          return () => { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 监测stateValue改变则调用回调, 如果指定的是[], 回调函数只会在第一次render()后执行
    
(4). 可以把 useEffect Hook 看做如下三个函数的组合
        componentDidMount()
        componentDidUpdate()
    	componentWillUnmount() 
```

- **Ref Hook**

```shell
(1). Ref Hook可以在函数组件中存储/查找组件内的标签或任意其它数据
(2). 语法: const refContainer = useRef()
(3). 作用:保存标签对象,功能与React.createRef()一样
```



### 15.3. Fragment

用于忽略节点，最终不会在html中渲染

可以不用必须有一个真实的DOM根标签了

```shell
<Fragment><Fragment>
<></>
```



### 15.4. Context

**一种组件间通信方式, 常用于【祖组件】与【后代组件】间通信（父子组件间props即可）**

```shell
1) 创建Context容器对象：
	const XxxContext = React.createContext()  
	
2) 渲染子组时，外面包裹xxxContext.Provider, 通过value属性给后代组件传递数据：
	<xxxContext.Provider value={数据}>
		子组件
    </xxxContext.Provider>
    
3) 后代组件读取数据：

	//第一种方式:仅适用于类组件 
	  static contextType = xxxContext  // 声明接收context
	  this.context // 读取context中的value数据
	  
	//第二种方式: 函数组件与类组件都可以
	  <xxxContext.Consumer>
	    {
	      value => ( // value就是context中的value数据
	        要显示的内容
	      )
	    }
	  </xxxContext.Consumer>
```

```react
// 创建一个用于保存变量的Context对象
const MyContext = React.createContext();

export default class A extends Component {
    state = {username: 'Tom', age:18}
  render() {
    const {username, age} = this.state;
    return (
      <div>
          <h3>我是A组件</h3>
          <h4>我的用户名是: {this.state.username}</h4>
          <MyContext.Provider value={{username, age}}>
          <B></B>
          </MyContext.Provider>
      </div>
    )
  }
}

class B extends Component {
    render() {
        return (
            <div>
                <h3>我是子组件</h3>
                <h4>我从A组件收到的用户名是: </h4>
                <C></C>
            </div>
        )
    }
}

class C extends Component {
    // 声明接收context
    static contextType = MyContext;

    render() {
        console.log(this);
        return (
            <div>
                <h3>我是孙组件</h3>
                <h4>我从A组件收到的用户名是: {this.context.username}, 年龄是{this.context.age}</h4>
                <h4>我从A组件收到的用户名是:
                <MyContext.Consumer>
                    {value=>{return `${value.username},年龄是${value.age}`}}
                </MyContext.Consumer>
                </h4>
            </div>
        )
    }
}
```

### 15.5. 组件优化

**Component的2个问题** 

1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低

2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低

**效率高的做法**

只有当组件的state或props数据发生改变时才重新render()

**原因**

Component中的shouldComponentUpdate()总是返回true

**解决**

	办法1: 
		重写shouldComponentUpdate()方法
		比较新旧state或props数据, 如果有变化才返回true, 如果没有返回false
	办法2:  
		使用PureComponent
		PureComponent重写了shouldComponentUpdate(), 只有state或props数据有变化才返回true
		** 注意: ** 
			只是进行state和props数据的浅比较, 如果只是数据对象内部数据变了, 返回false  
			不要直接修改state数据, 而是要产生新数据
			
	项目中一般使用PureComponent来优化
	
	    class Demo extends PurComponent{
	    	render(){
	    		return (...)
	    	}
	    }

### 15.6. render props

**如何向组件内部动态传入带内容的结构(标签)?**

	Vue中: 
		使用slot技术, 也就是通过组件标签体传入结构  <A><B/></A>
	React中:
		使用children props: 通过组件标签体传入结构
		使用render props: 通过组件标签属性传入结构,而且可以携带数据，一般用render函数属性

**children props**

	<A>
	  <B>xxxx</B>
	</A>
	{this.props.children}
	问题: 如果B组件需要A组件内的数据, ==> 做不到 

**render props**

	<A render={(data) => <C data={data}></C>}></A>
	A组件: {this.props.render(内部state数据)}
	C组件: 读取A组件传入的数据显示 {this.props.data} 

### 15.7. Error boundary

**理解：**

错误边界(Error boundary)：用来捕获后代组件错误，渲染出备用页面

**特点：**

只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

**使用方式：**

getDerivedStateFromError配合componentDidCatch

```js
// 定义在父组件内
// 生命周期函数，一旦后台组件报错，就会触发
static getDerivedStateFromError(error) {
    console.log(error);
    // 在render之前触发
    // 返回新的state
    return {
        hasError: true,
    };
}

componentDidCatch(error, info) {
    // 统计页面的错误。发送请求发送到后台去
    console.log(error, info);
}
```

### 15.8. 组件通信方式总结

**组件间的关系：**

- 父子组件
- 兄弟组件（非嵌套组件）
- 祖孙组件（跨级组件）

**几种通信方式：**

		1.props：
			(1).children props
			(2).render props
		2.消息订阅-发布：
			pubs-sub、event等等
		3.集中式管理：
			redux、dva等等
		4.conText:
			生产者-消费者模式

**比较好的搭配方式：**

		父子组件：props
		兄弟组件：消息订阅-发布、集中式管理
		祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)



## 16. ReactRouter 6 使用

**与ReactRouter5相比，改变了：**

1. 内置组件变化，移除了 `<Switch/>` ，新增了 `<Routes/>`  ；移除了 `<Redirect>`，新增 `<Navigate>`
2. 语法变化： `component={About}`变为 `element={<About/>}`
3. 新增多个hook：`useParams`、`useNavigate`、`useMatch`、`useLocation` 等
4. **官方明确推荐函数式组件**

### 16.1. NavLink使用以及重定向

```react
export default function App() {
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header"><h2>React Router Demo</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            <NavLink className={(isActive)=>{ return isActive.isActive ? 'list-group-item active' : 'list-group-item' }} to="/home">Home</NavLink>
            <NavLink className="list-group-item" to="/about">About</NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              <Routes>
                <Route path="/home" element={<Home></Home>}></Route>
                <Route path="/about" element={<About></About>}></Route>
                <Route path="/" element={<Navigate to="/about"></Navigate>}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```



### 16.2. 路由表

1. 建立一个单独文件用于存储路由表

```react
import About from "../pages/About";
import Home from "../pages/Home";
import { Navigate } from "react-router-dom";

export default[
    {
      path: '/about',
      element:<About></About>
    },
    {
      path: '/home',
      element:<Home></Home>
    },
    {
      path: '/',
      element:<Navigate to='/about'/>
    }
  ];
```

2. 使用useRoutes创建路由表

```react
export default function App() {
  const element = useRoutes(routes)
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header"><h2>React Router Demo</h2></div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            <NavLink className={(isActive)=>{ return isActive.isActive ? 'list-group-item active' : 'list-group-item' }} to="/home">Home</NavLink>
            <NavLink className="list-group-item" to="/about">About</NavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
             {element}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```



### 16.3. 嵌套路由

路由表

```react
export default[
    {
      path: '/about',
      element:<About></About>
    },
    {
      path: '/home',
      element:<Home></Home>,
      children: [
          {
              path:'news',
              element: <News></News>
          },
          {
            path:'message',
            element: <Message></Message>
        }
      ]
    },
    {
      path: '/',
      element:<Navigate to='/about'/>
    }
  ];
```

二级组件展示

```react
export default function Home() {
  return (
    <div>
        <h2>我是Home组件</h2>
        <ul className="nav nav-tabs">
            <li>
            <NavLink className="list-group-item" to="news">News</NavLink>
            </li>
            <li>
            <NavLink className="list-group-item" to="message">Message</NavLink>
            </li>
        </ul>
        <Outlet></Outlet>
    </div>
  )
}
```

### 16.4. 路由传参

Link指定路由路径传参

```react
export default function Message() {
  
  const [messages] = useState([
        {id: '001', title: '消息1', content: '111'},
        {id: '002', title: '消息2', content: '222'},
        {id: '003', title: '消息3', content: '333'},
        {id: '004', title: '消息4', content: '444'},
    ])
  return (
    <div>
        <h2>Home组件内容</h2>
        <div>
            <div>
                <ul>
                    {
                        messages.map((message)=>{
                            return (
                                <li key={message.id}>
                                    {/* search */}
                                    {/* <Link to={`detail?id=${message.id}&title=${message.title}&content=${message.content}`}>{message.title}</Link> */}
                                    {/* state */}
                                    <Link to='detail' state={{id: message.id, title: message.title, content: message.content}}>{message.title}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Outlet></Outlet>
        </div>
    </div>
  )
}
```

路由组件接收参数

```react

export default function Detail() {
    // params传参
    // const params = useParams();
    
    // search传参
    // const [searchParams, setSearch] = useSearchParams();

    // state传参
    const {id, title, content} = useLocation().state;

  return (
    <div>
        <ul>
            {/* params参数 */}
            {/* <li>{params.id}</li>
            <li>{params.title}</li>
            <li>{params.content}</li> */}

            {/* search参数 */}
            {/* <li>{searchParams.get('id')}</li>
            <li>{searchParams.get('title')}</li>
            <li>{searchParams.get('content')}</li> */}

            {/* state参数 */}
            <li>{id}</li>
            <li>{title}</li>
            <li>{content}</li>
        </ul>
    </div>
  )
}
```

### 16.5. 编程式路由导航

利用useNavigate实现路由跳转

```react
export default function Message() {
  
  const [messages] = useState([
        {id: '001', title: '消息1', content: '111'},
        {id: '002', title: '消息2', content: '222'},
        {id: '003', title: '消息3', content: '333'},
        {id: '004', title: '消息4', content: '444'},
  ])

  const navigate = useNavigate();
  function showData(message){
    navigate('detail', {
        replace: false,
        state: {
            id: message.id, 
            title: message.title, 
            content: message.content
        }
    });
  }

  return (
    <div>
        <h2>Home组件内容</h2>
        <div>
            <div>
                <ul>
                    {
                        messages.map((message)=>{
                            return (
                                <li key={message.id}>
                                    {/* search */}
                                    {/* <Link to={`detail?id=${message.id}&title=${message.title}&content=${message.content}`}>{message.title}</Link> */}
                                    {/* state */}
                                    <Link to='detail' state={{id: message.id, title: message.title, content: message.content}}>{message.title}</Link>
                                    <button onClick={()=>{showData(message)}}>展示详情</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Outlet></Outlet>
        </div>
    </div>
  )
}
```

一般组件内实现路由前进后退

```react
export default function Header() {
  const navigate = useNavigate();
  
  function back(){
    navigate(-1);
  }

  function forward(){
    navigate(1);
  }

  return (
    <div className="col-xs-offset-2 col-xs-8">
        <div className="page-header"><h2>React Router Demo</h2>
        </div>
        <button onClick={back}>后退</button>
        <button onClick={forward}>前进</button>
    </div>
  )
}
```

### 16.6. useInRouterContext()

返回一个bool值，判断当前组件是否处于路由环境中

```react
var s = useInRouterContext()
```

### 16.7. useNavigationType()

返回当前导航类型（用户是如何来到当前页面的）

返回值：`POP` 、`PUSH`、`REPLACE`

### 16.8. useOutlet()

用来呈现当前组件中渲染的嵌套路由

```react
const result = useOutlet();
// 如果当前嵌套路由未挂载 则返回null
// 否则返回当前挂载嵌套路由
```



---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/posts/2022-4-1-reactlearn/  

