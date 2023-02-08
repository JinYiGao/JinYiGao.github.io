# MySQL学习笔记


## 1. MySQL基础

### 1.1. 服务启动与停止

```shell
net start mysql80
net stop mysql80
```

### 1.2. 客户端连接

- MySQL自带client command

- `mysql [-h 127.0.0.1] [-P 3306] -u root -p [database -e sql_statement]` 

### 1.3. SQL

#### 1.3.1. SQL通用语法

- SQL语句可以单行或多行书写，以分号结尾
- SQL语句可以使用空格/缩进来增强可读性
- MySQL的SQL语句不区分大小写，关键字建议使用大写

#### 1.3.2. SQL分类

| 分类 | 全称                       | 说明                                                 |
| :--: | :------------------------- | :--------------------------------------------------- |
| DDL  | Data Definition Language   | 数据定义语言，用来定义数据库对象（数据库、表、字段） |
| DML  | Data Manipulation Language | 数据操作语言，用来对数据库表中的数据进行增删改       |
| DQL  | Data Query Language        | 数据查询语言，用来查询数据库中表的记录               |
| DCL  | Data Control Language      | 数据控制语言，用来管理数据库用户、控制数据库访问权限 |

#### 1.3.3. DDL

- **数据库操作**

  - **查询**

    ```mysql
    # 查询所有数据库
    SHOW DATABASES;
    # 查询当前数据库
    SELECT DATABASE();
    ```

  - **创建**

    ```mysql
    # 创建数据库
    CREATE DATABASE [IF NOT EXISTS] 数据库名 [DEFAULT CHARSET 字符集] [COLLATE 排序规则]
    ```

  - **删除**

    ```mysql
    DROP DATABASE [IF EXISTS] 数据库名 
    ```

  - **使用**

    ```mysql
    USE 数据库名
    ```

- **表操作**

  - **查询**

    ```mysql
    # 查询当前数据库所有表
    SHOW TABLES;
    # 查询表结构
    DESC 表名;
    # 查询指定表的建表语句
    SHOW CREATE TABLE 表名;
    ```

  - **创建**

    ```mysql
    # 创建表
    CREATE TABLE 表名(
        字段1 type [COMMENT 字段1注释],
        字段2 type [COMMENT 字段2注释],
        ......
        字段n type [COMMENT 字段n注释]
    ) [ENGINE=INNODB COMMENT 表注释];
    ```

  - **修改**

    ```mysql
    # 添加字段
    ALTER TABLE 表名 ADD 字段名 类型(长度) [COMMENT 注释][约束]
    # 修改字段数据类型
    ALTER TABLE 表名 MODIFY 字段名 新数据类型(长度)
    # 修改字段名和数据类型
    ALTER TABLE 表名 CHANGE 旧字段名 新字段名 类型(长度) [COMMENT 注释][约束]
    # 修改表名
    ALTER TABLE 表名 RENAME TO 新表名;
    ```

  - **删除**

    ```mysql
    # 删除表
    DROP TABLE [IF EXISTS] 表名;
    # 删除指定表,并重新创建该表(数据清空)
    TRUNCATE TABLE 表名;
    ```

#### 1.3.4. DML

- **添加数据**

  ```mysql
  # 给指定字段添加一行数据
  INSERT INTO 表名(字段名1, 字段名2, ...) VALUES(值1, 值2, ...);
  # 给全部字段添加一行数据
  INSERT INTO 表名 VALUES(值1, 值2, ...);
  # 批量添加多行数据
  INSERT INTO 表名(字段名1, 字段名2, ...) VALUES(值1, 值2, ...),(值1, 值2, ...);
  INSERT INTO 表名 VALUES(值1, 值2, ...),(值1, 值2, ...);
  ```

  **注意**:

  - 插入数据时，指定字段顺序需要与值的顺序一一对应
  - 字符串和日期数据应包含在引号中
  - 插入的数据大小，应该在字段的规定范围内

- **修改数据**

  ```mysql
  UPDATE 表名 SET 字段名1=值1, 字段名2=值2,...[WHERE 条件];
  ```

  **注意**:

  - 修改语句的条件可选，如果没有条件，则会修改整张表所有数据

- **删除数据**

  ```mysql
  DELETE FROM 表名 [WHERE 条件]
  ```

  **注意**:

  - DELETE语句如果没有条件，则会删除整张表所有数据
  - DELETE语句不能删除某一个字段的值(可以使用UPDATE)

#### 1.3.5. DQL

- **查询语法**

  ```mysql
  SELECT
  	字段列表
  FROM
  	表名列表
  WHERE
  	条件列表
  GROUP BY
  	分组字段列表
  HAVING
  	分组后条件列表
  ORDER BY
  	排序字段列表
  LIMIT
  	分页参数
  ```

- **基础查询**

  - **查询多个字段**

    ```mysql
    SELECT 字段1,字段2,字段3,... FROM 表名;
    SELECT * FROM 表名;
    ```

  - **对查询的字段设置别名**

    ```mysql
    SELECT 字段1 [AS 别名1], 字段2 [AS 别名2] ... FROM 表名;
    ```

  - **查询并去除重复记录**

    ```mysql
    SELECT DISTINCT 字段列表 FROM 表名;
    ```

- **条件查询（WHERE）**

  ```mysql
  SELECT 字段列表 FROM 表名 WHERE 条件列表;
  ```

  |     比较运算符      |                       功能                        |
  | :-----------------: | :-----------------------------------------------: |
  |          >          |                       大于                        |
  |         >=          |                     大于等于                      |
  |          <          |                       小于                        |
  |         <=          |                     小于等于                      |
  |          =          |                       等于                        |
  |      <> 或 !=       |                      不等于                       |
  | BETWEEN ... AND ... |          在某个范围之内(含最小、最大值)           |
  |       IN(...)       |           在in之后的列表中的值，多选一            |
  |     LIKE 占位符     | 模糊匹配（ ’_‘ 匹配单个字符，’%‘ 匹配任意个字符） |
  |       IS NULL       |                   条件值为 null                   |

  | 逻辑运算符 |  功能  |
  | :--------: | :----: |
  | AND 或 &&  | 逻辑与 |
  | OR 或 \|\| | 逻辑或 |
  | NOT 或 ！  |   非   |

- **聚合函数（count，max，min，avg，sum）**

  将一列数据作为一个整体，进行纵向计算

  ```mysql
  SELECT 聚合函数(字段) FROM 表名;
  ```

  **注意**: null值不参与聚合函数运算

- **分组查询（GROUP BY）**

  ```mysql
  SELECT 字段列表 FROM 表名 [WHERE 条件] GROUP BY 分组字段名 [HAVING 分组后过滤条件]
  ```

  **where和having区别**：

  - 执行时机不同：where是分组之前进行过滤；而having是分组之后对结果进行过滤
  - 判断条件不同：where不能对聚合函数进行判断，而having可以（如sum(age) > 10）

  分组之后查询的字段一般为聚合函数或分组字段，查询其他字段无任何意义。

- **排序查询（ORDER BY）**

  ```mysql
  SELECT 字段列表 FROM 表名 ORDER BY 字段1 排序方式1, 字段2 排序方式2;
  ```

  **排序方式**：

  - ASC：升序（默认方式）
  - DESC：降序

- **分页查询（LIMIT）**

  ```mysql
  SELECT 字段列表 FROM 表名 LIMIT 起始索引,查询记录数;
  ```

  **起始索引从0开始** 

#### 1.3.6. DCL

- **管理用户**

  - **查询用户**

    ```mysql
    # 查询user表获取用户
    USE mysql;
    SELECT * FROM user;
    ```

  - **创建用户**

    ```mysql
    CREATE USER '用户名@主机名' IDENTIFIED BY '密码';
    ```

    **例子**：

    ```mysql
    # 创建用户test 只能够在当前主机localhost访问
    create user 'test@localhost' identified by '123456';
    # 创建用户test 可以在任意主机访问
    create user 'test@%' identified by '123456';
    ```

  - **修改用户密码**

    ```mysql
    ALTER USER '用户名@主机名' IDENTIFIED WITH mysql_native_password BY '新密码';
    ```

  - **删除用户**

    ```mysql
    DROP USER '用户名@主机名';
    ```

- **权限控制**

  **MySQL定义的常用权限**

  |        权限         |        说明        |
  | :-----------------: | :----------------: |
  | ALL, ALL PRIVILEGES |      所有权限      |
  |       SELECT        |      查询数据      |
  |       INSERT        |      插入数据      |
  |       UPDATE        |      修改数据      |
  |       DELETE        |      删除数据      |
  |        ALTER        |       修改表       |
  |        DROP         | 删除数据库/表/视图 |
  |       CREATE        |   创建数据库/表    |

  - **查询用户权限**

    ```mysql
    SHOW GRANTS FOR '用户名@主机名';
    ```

  - **授予用户权限**

    ```mysql
    GRANT 权限列表 ON 数据库名.表名 TO '用户名@主机名';
    # 数据库名和表名可以用 * 进行通配
    ```

  - **撤销用户权限**

    ```mysql
    REVOKE 权限列表 ON 数据库名.表名 FROM '用户名@主机名';
    ```

### 1.4. MySQL数据类型

- **数值类型**：
  -  **TINYINT**（1 byte）；
  - **SMALLINT**（2 byte）;
  - **MEDIUMINT**（3 byte）；
  - **INT**（4 byte）；
  - **BIGINT**（8 byte）；
  - **FLOAT**（4 byte）；
  - **DOUBLE**（8 byte）;
  - **DECIMAL**
- **字符串类型**：
  - **CHAR**（0 - 255 bytes 定长字符串）；
  - **VARVHAR**（0 - 65535 bytes 变长字符串）；
  - **TINYBLOB**（0- 255 bytes 二进制数据）；
  - **TINYTEXT**（0 - 255 bytes 文本数据）；
  - **BLOB**（0 - 65535 bytes）；
  - **TEXT**；
  - **MEDIUMBLOB**；
  - **MEDIUMTEXT**；
  - **LONGBLOB**；
  - **LONGTEXT** 
- **日期类型**：
  - **DATE**；年月日
  - **TIME**；时分秒
  - **YEAR**；年
  - **DATETIME**；年月日+时分秒
  - **TIMESTAMP**；时间戳

### 1.5. 函数

- **字符串函数**

  |            函数            |                         功能                         |
  | :------------------------: | :--------------------------------------------------: |
  |    CONCAT(S1,S2,...Sn)     |                      字符串拼接                      |
  |         LOWER(str)         |                    将字符串转小写                    |
  |         UPPER(str)         |                    将字符串转大写                    |
  |     LPAD(str, n, pad)      |  左填充，用pad对str左边进行填充，达到n个字符串长度   |
  |     RPAD(str, n, pad)      |  右填充，用pad对str右边进行填充，达到n个字符串长度   |
  |         TRIM(str)          |               去掉字符串头部和尾部空格               |
  | SUBSTRING(str, start, len) | 返回str从start位置起的len个长度的字符串，索引从1开始 |

  **例子**：

  ```mysql
  # 修改工号workno为5位 不足5为补0
  update emp set workno = lpad(workno, 5, '0');
  ```

- **数值函数**

  |    函数     |               功能               |
  | :---------: | :------------------------------: |
  |   CEIL(x)   |             向上取整             |
  |  FLOOR(x)   |             向下取整             |
  |  MOD(x, y)  |               求模               |
  |   RAND()    |        返回0~1内的随机数         |
  | ROUND(x, y) | 求参数x的四舍五入值，保留y位小数 |

- **日期函数**

  |                函数                |                功能                |
  | :--------------------------------: | :--------------------------------: |
  |             CURDATE()              |            返回当前日期            |
  |             CURTIME()              |            返回当前时间            |
  |               NOW()                |         返回当前日期和时间         |
  |             YEAR(date)             |            获取date的年            |
  |            MONTH(date)             |            获取date的月            |
  |             DAY(date)              |            获取date的日            |
  | DATE_ADD(date, INTERVAL expr type) |  返回date加上时间间隔expr后的时间  |
  |       DATEDIFF(date1, date2)       | 返回起始date1和结束date2中间的天数 |

  **例子**：

  ```mysql
  select YEAR(now());
  select DATE_ADD(now(), INTERVAL 1 YEAR );
  select DATEDIFF('2022-10-1', '2022-10-10'); # -9
  ```

- **流程函数**

  |                            函数                            |                       功能                       |
  | :--------------------------------------------------------: | :----------------------------------------------: |
  |                      IF(value, t, f)                       |       如果value为true，则返回t，否则返回f        |
  |                   IFNULL(value1, value2)                   |   如果value1不为空，返回value1，否则返回value2   |
  |    CASE WHEN [val1] THEN [res1] ... ELSE [default] END     |  如果val1为true，则返回res1，...否则返回default  |
  | CASE [expr] WHEN [val1] THEN [res1] ... ELSE [default] END | 如果expr等于val1，则返回res1，...否则返回default |

  **例子**：

  ```mysql
  select if(false, 'OK', 'Error'); # Error
  select ifnull('OK', 'default');  # OK
  select ifnull(null, 'default');  # default
  select
  	name,
  	(case workaddress when '北京' then '一线城市' when '上海' then '一线城市' else '二线城市' end as) city
  from emp;
  ```

### 1.6. 约束

- **概念**

  约束是作用于表中字段上的规则，用于限制存储在表中的数据

  **目的**是保证数据库中数据的正确性，有效性和完整性

  约束可以在创建表/修改表的时候指定

- **分类**

  |   约束   |                        描述                        |   关键字    |
  | :------: | :------------------------------------------------: | :---------: |
  | 非空约束 |               限制该字段值不能为null               |  NOT NULL   |
  | 唯一约束 |       保证该字段的所有数据都是唯一、不重复的       |   UNIQUE    |
  | 主键约束 |      主键是一行数据的唯一标识，要求非空且唯一      | PRIMARY KEY |
  | 默认约束 |    保存数据时，如果未指定该字段值，则采用默认值    |   DEFAULT   |
  | 检查约束 |               保证字段值满足某一条件               |    CHECK    |
  | 外键约束 | 用来让两张表的数据建立连接，保证数据一致性和完整性 | FOREIGN KEY |

  **例子**：

  ```mysql
  # 常见约束
  create table user(
      id int primary key auto_increment comment '主键',
      name varchar(10) not null unique,
      age int check ( age > 0 and age <= 120 ),
      status char(1) default '1' comment '状态',
      gender char(1)
  ) comment '用户表';
  ```

- **外键约束**

  **外键的字段在另一个表(父表)中必须为唯一索引**

  ```mysql
  # 创建表时添加外键
  CREATE TABLE 表名(
  	字段名 字段类型,
      ...
      [CONSTRAINT] [外键名称] FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名)
  );
  
  # 修改表添加外键
  ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名);
  
  # 删除外键
  ALTER TABLE 表名 DROP FOREIGN KEY 外键名称;
  ```

  **外键删除/更新行为**

  |    行为     |                             说明                             |
  | :---------: | :----------------------------------------------------------: |
  |  NO ACTION  | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新 |
  |  RESTRICT   | 当在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则不允许删除/更新 |
  |   CASCADE   | 在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则对应删除/更新子表记录 |
  |  SET NULL   | 在父表中删除/更新对应记录时，首先检查该记录是否有对应外键，如果有则设置子表中该外键为null |
  | SET DEFAULT |  父表有变更时，子表将外键列设置为一个默认值（Innodb不支持）  |

  ```mysql
  # 设置更新、删除时的行为
  ALTER TABLE 表名 ADD CONSTRAINT 外键名称 FOREIGN KEY(外键字段名) REFERENCES 主表(主表列名) ON UPDATE CASCADE ON DELETE CASCADE;
  ```

### 1.7. 多表查询

- **内连接**

  相当于查询A、B表交集部分数据

  - **隐式内连接**

    ```mysql
    SELECT 字段列表 FROM 表1,表2 WHERE 条件...;
    ```

  - **显式内连接**

    ```mysql
    SELECT 字段列表 FROM 表1 [INNER] JOIN 表2 ON 连接条件...;
    ```

- **外连接**

  - **左外连接**

    查询左表所有数据，以及两张表交集部分数据

    ```mysql
    SELECT 字段列表 FROM 表1 LEFT [OUTER] JOIN 表2 ON 条件...;
    ```

  - **右外连接**

    查询右表所有数据，以及两张表交集部分数据

    ```mysql
    SELECT 字段列表 FROM 表1 RIGHT [OUTER] JOIN 表2 ON 条件...;
    ```

- **自连接**

  当前表与自身的连接查询，自连接必须使用表别名

  自连接可以是内连接也可以是外连接

  ```mysql
  SELECT 字段列表 FROM 表A 别名A [LEFT RIGHT] JOIN 表A 别名B ON 条件...;
  ```

- **联合查询**

  把多次查询的结果合并起来，形成一个新的查询结果集

  ```mysql
  SELECT 字段列表 FROM 表A ...
  UNION [ALL]
  SELECT 字段列表 FROM 表B ...; 
  ```

  **注意**：

  - 对于联合查询结果的多张表的列数和字段类型必须保持一致
  - UNION ALL 连接所有结果；UNION 连接所有结果并去重

- **子查询**

  SQL语句中嵌套SELECT语句，称为嵌套查询，又称子查询

  ```mysql
  SELECT * FROM t1 WHERE column1=(SELECT column1 FROM t2);
  ```

  - **标量子查询(子查询结果为单个值)**

    常用操作符：>，<，=，<=，>=

    **例子**：

    ```mysql
    select * from emp where depy_id = (select id from dept where name = '销售部');
    ```

  - **列子查询(子查询结果为一列)**

    常用操作符：IN，NOT IN，ANY，SOME，ALL

    **例子**：

    ```mysql
    # 查询销售部和市场部所有员工信息
    select * from emp where dept_id in (select id from dept where name = '销售部' or name = '市场部');
    # 查询比财务部所有员工工资都高的员工信息
    select * from emp where salary > all (select salary from emp where dept_id = (select id from dept where name = '财务部'));
    ```

  - **行子查询(子查询结果为一行)**

    常用操作符：=，<>，IN，NOT IN

    **例子**：

    ```mysql
    # 查询与张三薪资和直属领导相同的员工信息
    select * from emp where (salary, managerid) = (select salary, managerid from emp where name = '张三');
    ```

  - **表子查询(子查询结果为多行多列)**

    常用操作符：IN

    ```mysql
    # 查询与张三和李四职位与薪资相同的员工信息
    select * from emp where (job, salary) in (select job, salary from emp where name = '张三' or name = '李四');
    # 查询入职日期是2006-01-01之后的员工信息及其部门信息
    select * from (select * from emp where entrydate > '2006-01-01') e left join dept d where e.dept_id = d.id;
    ```

### 1.8. 事务

**事务**是一组操作的集合，它是一个不可分割的工作单位，事务会把所有操作作为一个整体一起向系统提交或撤销操作请求，即这些操作要么同时成功，要么同时失败。

#### 1.8.1. 事务操作

- **查看/设置事务提交方式**

  ```mysql
  # --- 方式一 ---
  # 查看事务提交方式 0为手动提交 1为自动提交
  SELECT @@autocommit;
  # 设置事务提交方式为手动
  SET @@autocommit=0;
  ```

- **开启事务**

  ```mysql
  # --- 方式二 ---
  # 显式开启事务
  START TRANSACTION; 
  # 或者
  BEGIN;
  ```

- **提交事务**

  ```mysql
  COMMIT;
  ```

- **回滚事务**

  ```mysql
  # 回滚之前所有操作
  ROLLBACK
  ```

#### 1.8.2. 事务四大特性(ACID)

- **原子性（Atomicity）**

  事务是不可分割的最小操作单元，要么全部成功，要么全部失败。

- **一致性（Consistency）**

  事务完成时，必须使所有的数据都保持一致状态

- **隔离性（Isolation）**

  数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。

- **持久性（Durability）**

  事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

#### 1.8.3. 并发事务问题

|    问题    |                             描述                             |
| :--------: | :----------------------------------------------------------: |
|    脏读    |            一个事务读到另一个事务还没有提交的数据            |
| 不可重复读 | 一个事务先后读取同一条记录，但两次读取的数据不同，称为不可重复读 |
|    幻读    | 一个事务按照条件查询数据时，没有对应的数据行，但在插入数据时，又发现这行数据已经存在 |

#### 1.8.4. 事务隔离级别

|       隔离级别        | 脏读 | 不可重复读 | 幻读 |
| :-------------------: | :--: | :--------: | :--: |
|   Read uncommitted    |  √   |     √      |  √   |
|    Read committed     |  ×   |     √      |  √   |
| Repeatable Read(默认) |  ×   |     ×      |  √   |
|     Serializable      |  ×   |     ×      |  ×   |

```mysql
# 查看事务隔离级别
SELECT @@TRANSACTION_ISOLATION;

# 设置事务隔离级别
SET [SESSION|GLOBAL] TRANSACTION ISOLATION LEVEL {READ UNCOMMITTED | READ COMMITTED | REPEATABLE READ | SERIALIZABLE};
```

## 2. MySQL进阶

### 2.1. 存储引擎

```mysql
# 查看当前数据库支持的存储引擎
SHOW ENGINES;
```

- **InnoDB**

  MySQL默认存储引擎

  **特点**：

  - DML操作遵循ACID模型，支持**事务**
  - **行级锁**，提高并发访问性能
  - 支持**外键**约束

- **MyISAM**

  MySQL早期默认的存储引擎

  **特点**：

  - 不支持事务
  - 支持表锁，不支持行锁
  - 访问速度快

- **Memory**

  **特点**：

  - 表数据存储在内存中
  - hash索引（默认）

### 2.2. 索引

#### 2.2.1. 索引结构

|       索引结构        |                             描述                             |
| :-------------------: | :----------------------------------------------------------: |
|        B+Tree         |                   最常见，大部分引擎都支持                   |
|         Hash          | 使用哈希表实现，只有精确匹配索引列的查询才有效，不支持范围查询 |
|  R-Tree（空间索引）   |                   主要用于地理空间数据类型                   |
| Full-text（全文索引） |          是一种通过建立倒排索引，快速匹配文档的方式          |

- **B-Tree（多路平衡查找树）**

  ![image-20220908175835838](https://img.gujin.store/img/image-20220908175835838.png)

- **B+Tree**

  相较于B-Tree区别：

  - 所有数据都会出现在叶子节点
  - 叶子节点形成一个单向链表

  ![image-20220908180815830](https://img.gujin.store/img/image-20220908180815830.png)

  **为什么InnoDB存储引擎选择使用B+Tree？**

  - 相对于二叉树，层级更少，搜索效率更高
  - 对于B-Tree，无论是叶子节点还是非叶子节点，都会保存数据，这样导致一夜中存储的键值减少，指针跟着减少，要同样保存大量数据，只能增加树的高度，导致性能降低
  - 相对于hash索引，B+Tree支持范围匹配及排序操作

#### 2.2.2. 索引分类

|   分类   |                含义                |           特点           |  关键字  |
| :------: | :--------------------------------: | :----------------------: | :------: |
| 主键索引 |       针对表中主键创建的索引       | 默认自动创建，只能有一个 | PRIMARY  |
| 唯一索引 |    避免同一个表中某数据列值重复    |        可以有多个        |  UNIQUE  |
| 常规索引 |          快速定位特定数据          |        可以有多个        |          |
| 全文索引 | 查找文本的关键词，而不是比较索引值 |        可以有多个        | FULLTEXT |

**在InnoDB存储引擎中，根据索引存储形式，又分为以下两种**：

|   分类   |                           含义                           |      特点       |
| :------: | :------------------------------------------------------: | :-------------: |
| 聚集索引 | 将数据存储与索引放到一块，索引结构的叶子节点保存了行数据 | 必须有且只有1个 |
| 二级索引 | 将数据与索引分开存储，索引结构的叶子节点关联的是对应主键 |  可以存在多个   |

**聚集索引选取规则**：

- 如果存在主键，主键索引就是聚集索引
- 如果不存在主键，将使用第一个唯一（UNIQUE）索引作为聚集索引
- 如果没有主键也没有唯一索引，则InnoDB会自动生成一个rowid作为隐藏聚集索引

#### 2.2.3. 索引语法

- **创建索引**

  ```mysql
  CREATE [UNIQUE | FULLTEXT] INDEX index_name ON 表名(index_col_name,...);
  ```

- **查看索引**

  ```mysql
  SHOW INDEX FROM 表名;
  ```

- **删除索引**

  ```mysql
  DROP INDEX index_name ON 表名;
  ```

  **例子**：

  ```mysql
  # 创建常规索引
  create index idx_user_name on tb_user(name);
  # 创建唯一索引
  create index idx_user_phone on tb_user(phone);
  # 创建联合索引
  create index idx_user_pro_age_sta on tb_user(profession, age, status);
  ```

#### 2.2.4. SQL性能分析

- **SQL执行频率**

  ```mysql
  SHOW GLOBAL STATUS LIKE 'COM_______';
  ```

- **慢查询日志**

  慢查询日志记录了所有执行时间超过指定参数（long_query_time）的所有SQL语句的日志

  ```mysql
  # 查询慢查询日志是否开启
  SHOW VARIABLES LIKE 'slow_query_log';
  
  # /etc/my.cnf配置慢查询
  # 开启MySQL慢查询日志开关
  slow_query_log=1
  # 设置慢日志时间为2秒,SQL语句执行超过2秒则视为慢查询
  long_query_time=2
  ```

- **profile详情**

  show profiles能够在做SQL优化时帮助我们了解时间都耗费到哪里去了

  ```mysql
  # 查看当前MySQL是否支持profile操作
  SELECT @@have_profiling;
  
  # 查看profile操作是否开启
  SELECT @@profiling;
  
  # 开启profile操作
  SET profiling=1;
  
  # 查看sql操作耗时
  SHOW profiles;
  
  # 查看指定query_id的SQL语句各个阶段耗时情况
  SHOW PROFILE FOR QUERY query_id;
  
  # 查看指定query_id的SQL语句CPU使用情况
  SHOW PROFILE CPU FOR QUERY query_id;
  ```

- **explain执行计划**

  EXPLAIN或者DESC命令获取MySQL**如何执行**SELECT语句的信息，包括在SELECT语句执行过程中表如何连接和连接的顺序

  ```mysql
  # 直接在select语句之前加上EXPLAIN
  EXPLAIN SELECT 字段列表 FROM 表名 WHERE 条件;
  ```

  **EXPLAIN执行计划各字段含义**：

  - **id**

    select查询的序列号，表示查询中执行select字句或是操作表的顺序（id相同，执行顺序从上到下；id不同，值越大越先执行）

  - **select_type**

    表示SELECT类型，常见取值有SIMPLE（简单表，即不适用表连接或子查询），PRIMARY（主查询，即外层的查询），UNION（联合查询中的第二个或后面的查询语句），SUBQUERY（SELECT/WHERE之后包含的子查询）等

  - **type**

    表示连接类型，性能由好到差的连接类型为NULL、systen、const、eq_ref、ref、range、index、all

  - **possible_key**

    显示可能应用在这张表上的索引，一个或多个

  - **key**

    实际使用的索引，如果为NULL，则没有使用索引

  - **key_len**

    表示索引中使用的字节数，该值为索引字段使用的最大字节数

  - **rows**

    MySQL认为必须要执行查询的行数，是一个估计值

  - **filtered**

    表示返回结果的行数占需读取行数的百分比，filtered值越大越好

#### 2.2.5. 索引使用

- **最左前缀法则**

  如果索引了多列（**联合索引**），要遵循最左前缀法则，指的是查询从索引最左列开始，并且不跳过索引中的列（条件内必须从最左侧开始指定索引字段）。如果跳过某一列索引，则会引起后面的索引失效。

- **范围查询**

  联合索引中，出现范围查询><，范围查询右侧的列索引失效。

- **索引列运算**

  不要在索引列上进行运算，否则索引失效

  **例子**：

  ```mysql
  # 索引字段为phone
  explain select * from tb_user where substring(phone, 10, 2) = '15';
  ```

- **字符串不加引号**

  字符串类型字段使用时，不加引号，索引将失效

  **例子**：

  ```mysql
  # phone为字符串类型
  explain select * from tb_user where phone = 17720000015;
  ```

- **模糊查询**

  如果仅仅是尾部模糊匹配，索引不会失效；如果是头部模糊匹配，索引失效

- **or连接的条件**

  用or分开的条件，如果or前的条件中的列有索引，而后面列没有索引，则索引都失效

- **数据分布影响**

  如果MySQL评估走索引比全表扫描还慢，则不使用索引

- **SQL提示**

  SQL提示是优化数据库的一个重要手段，简单来说，就是在SQL语句中加入一些人为的提示来达到优化操作的目的

  ```mysql
  SELECT * FROM 表名 [use index | ignore index | force index(索引名)] where 条件;
  ```

- **覆盖索引**

  尽量使用覆盖索引（查询使用了索引，并且需要返回的列，在该索引中已经全部能够找到），减少select *

  - using index condition

    查找使用了索引，但是需要回表查询数据

  - using where; using index

    查找使用了索引，但是需要的数据都在索引列中能找到，不需要回表查询

- **前缀索引**

  当字段类型为字符串时，有时需要索引很长的字符串，会让索引变得很大，查询时浪费磁盘IO，影响查询效率。此时可以只将**字符串一部分前缀建立索引**，提高索引效率

  ```mysql
  CREATE INDEX idx_xxxx ON 表名(字段名(n))
  ```

- **单列索引与联合索引**

  单列索引：即一个索引只包含单个列

  联合索引：即一个索引包含了多个列

  在业务场景中，如果存在多个查询条件，考虑针对查询字段建立索引时，建议使用联合索引，而非单列索引。

#### 2.2.6. 索引设计原则

- 针对数据量较大，且查询比较频繁的表建立索引
- 针对常作为查询条件（where）、排序（order by）、分组（group by）操作的字段建立索引
- 尽量选择区分度高的列作为索引，尽量建立唯一索引
- 如果是字符串类型字段，字段长度较长可以建立前缀索引
- 尽量使用联合索引，减少单列索引，查询时，避免回表，提高查询效率
- 控制总的索引数量
- 如果索引列不能存储NULL值，在创建表时需要使用NOT NULL约束。当优化器知道每列是否包含NULL值时，它可以更好地选择合适的索引用于查询。

### 2.3. SQL优化

- **插入数据优化**

  - 批量插入，合并到一条insert语句

  - 手动事务提交

  - 按照主键顺序插入，顺序插入性能高于乱序插入

  - 如果一次性大批量插入，使用insert性能较低，此时可以使用MySQL提供的load指令进行插入

    ```mysql
    # 客户端连接服务端时，加上参数 --local-infile
    mysql --local-infile -u root -p
    # 设置全局参数local_infile为1，开启本地加载开关
    set global local_infile = 1;
    # 执行load指令加载
    load data local infile '/root/sql1.log' into table tb_user fields terminated by ',' lines terminated by '\n';
    ```

- **主键优化**
  - 页分裂
  - 页合并
  - 满足业务需求情况下，尽量**降低主键长度**
  - 插入数据时，尽量选择**顺序插入**，选择使用AUTO_INCREMENT自增主键，减少页分裂
  - 尽量不要使用UUID做主键或其他自然主键，如身份证号
  - 业务操作时，尽量避免对主键修改

- **order by优化**

  - **using filesort**

    通过表的索引或全表扫描，读取满足条件的数据行，然后在排序缓冲区内完成排序操作，而不是通过索引直接返回排序结果。

  - **using index**

    通过有序索引顺序扫描直接返回有序数据，操作效率高。

  - 根据**排序字段建立合适的索引**，多字段排序时，也遵循最左前缀法则

  - **尽量使用覆盖索引**

  - 多字段排序，一个升序一个降序，此时需要注意联合索引在创建时的规则

  - 如果不可避免出现filesort时，大数据量排序时，可以适当增大排序缓冲区大小

- **group by优化**

  - 在分组操作时，可以通过索引来提高效率
  - 分组操作时，索引的使用也是满足最左前缀法则的

  ```mysql
  # using index的例子
  # 建立联合索引, 查询时直接走索引顺序扫描即可得到结果
  create index idx_name_age on tb_user(name, age);
  select name, sum(age) from tb_user group by name, age;
  ```

- **limit优化**
  - 一般分页查询时，可以通过覆盖索引+子查询形式进行优化

- **count优化**
  - InnoDB引擎执行count(*)时，需要把数据一行行读出计数，要优化建议**自己维护计数**

- **update优化**
  - InnoDB的行锁是针对索引加的锁，不是针对记录加的锁，并且该索引不能失效，否则会从行锁升级为表锁
  - **尽量根据主键/索引字段进行数据更新**

### 2.4. 视图/存储过程/存储函数/触发器

#### 2.4.1. 视图（VIEW）

- **概念**

  视图是一种**虚拟存在的表**，视图中的数据并不在数据库中实际存在，视图内行和列的数据来自定义视图的查询中使用的表，并且是在**使用视图时动态生成**的。

  通俗的讲，视图只保存了查询的SQL逻辑，不保存查询结果

- **创建视图**

  ```mysql
  CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT语句 [WITH[CASCADED | LOCAL] CHECK OPTION];
  ```

  **例子**：

  ```mysql
  create or replace view as stu_v_1 as select id, name from student where id <= 10;
  ```

- **查询视图**

  ```mysql
  # 查看创建视图的语句
  SHOW CREATE VIEW 视图名;
  # 查询视图数据
  SELECT * from 视图名;
  ```

- **修改视图**

  ```mysql
  # 方法一 直接创建替换视图
  CREATE [OR REPLACE] VIEW 视图名称[(列名列表)] AS SELECT语句 [WITH[CASCADED | LOCAL] CHECK OPTION]
  # 方法二 
  ALTER VIEW 视图名称[(列名列表)] AS SELECT语句 [WITH[CASCADED | LOCAL] CHECK OPTION];
  ```

- **删除视图**

  ```mysql
  DROP VIEW [IF EXISTS] 视图名称 [,视图名称]...;
  ```

- **视图检查选项**

  使用`WITH CHECK OPTION`创建视图时，MySQL会通过视图检查正在更改的每个行，使其符合视图的定义。MySQL允许基于另一个视图创建视图，它还会检查依赖视图中的规则以保持一致性。为了确定检查范围，MySQL提供了`CASCADED`和`LOCAL`两个选项。

  CASCADED 不仅检查当前修改数据是否满足本身视图，也会递归检查是否满足上级视图条件

  LOCAL也 会递归上级视图，但是仅检查定义有LOCAL的视图的条件是否满足

- **视图的更新**

  要使视图可更新，视图中的行与基础表中的行必须是一对一的关系。如果视图包含一下任何一项，则视图不可更新：

  1. 聚合函数
  2. DISTINCT
  3. GROUP BY
  4. HAVING
  5. UNION 或 UNION ALL

- **视图的作用**

  - **简单**

    视图不仅可以简化用户对数据的理解，也可以简化他们的操作，那些经常被使用的查询可以被定义为视图，从而使得用户不必为以后的操作每次指定全部条件

  - **安全**

    数据库可以授权，但不能授权到数据库特定行和列上，而通过视图用户只能查询和修改他们所能见到的数据

  - **数据独立**

    帮助用户屏蔽真实表结构变化带来的影响(比如列名改变)，相当于针对基表做了一层封装

#### 2.4.2. 存储过程（PROCEDURE）

- **概念**

  存储过程是实现经过编译并存储在数据库中的一段SQL语句的集合，就是数据库SQL语言层面的代码封装与重用。

- **特点**

  - 封装、复用
  - 可以接受参数，也可以返回数据
  - 减少网络交互，提升效率

- **创建存储过程**

  ```mysql
  CREATE PROCEDURE 存储过程名称([IN/OUT/INOUT 参数名 参数类型])
  BEGIN
  	-- SQL语句 [或结合条件控制语句];
  END;
  ```

- **调用存储过程**

  ```mysql
  CALL 名称([参数列表]);
  ```

- **查看存储过程**

  ```mysql
  # 从mysql自带表内查看存储过程xxx及其状态信息
  SELECT * FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA='xxx';
  # 查看某个存储过程定义
  SHOW CREATE PROCEDURE 存储过程名称;
  ```

- **删除存储过程**

  ```mysql
  DROP PROCEDURE [IF EXISTS] 存储过程名称;
  ```

- **变量**

  - **系统变量**

    分为全局变量（GLOBAL）、会话变量（SESSION）

    ```mysql
    # 查看系统变量
    SHOW [SESSION | GLOBAL] VARIABLES;
    SHOW [SESSION | GLOBAL] VARIABLES LIKE '...';
    SELECT @@[SESSION | GLOBAL.]系统变量名;
    
    # 设置系统变量
    SET [SESSION | GLOBAL] 系统变量名=值;
    SET @@[SESSION | GLOBAL] 系统变量名=值;
    ```

  - **用户自定义变量**

    用户变量不用提前声明，在用的时候直接使用“@变量名”即可，其作用域为当前连接

    ```mysql
    # 定义
    SET @var_name=expr [,@var_para1=expr1]...;
    SET @var_name:=expr [,@var_para1:=expr1]...;
    SELECT @var_name:=expr [,@var_para1:=expr1]...;
    SELECT 字段名 INTO @var_name FROM 表名;
    
    # 使用
    SELECT @var_name;
    ```

  - **局部变量**

    访问之前需要`DECLARE`声明，可用作存储过程内的局部变量和输入参数，其作用范围为其内声明的`BEGIN ... END`块

    ```mysql
    # 声明 default指定默认值
    DECLARE 变量名 变量类型[DEFAULT ...];
    
    # 赋值
    SET 变量名=值;
    SET 变量名:=值;
    SELECT 字段名 INTO 变量名 FROM 表名...;
    ```

- **IF条件判断**

  ```mysql
  IF 条件1 THEN
  	...
  ELSEIF 条件2 THEN    
  	...
  ELSE			
  	...
  END IF;
  ```

- **参数**

  | 类型  |                   含义                   |
  | :---: | :--------------------------------------: |
  |  IN   | 该类参数作为输入，也即是需要调用时传入值 |
  |  OUT  |    该类参数作为输出，也就是作为返回值    |
  | INOUT |  既可以作为输入参数，也可以作为输出参数  |

- **CASE**

  ```mysql
  # 方式一 when后为value
  CASE case_value
  	WHEN when_value1 THEN statement_list1
  	[WHEN when_value2 THEN statement_list2]...
  	[ELSE statement_list]
  END CASE;
  
  # 方式二 when后为条件表达式
  CASE 
  	WHEN search_condition1 THEN statement_list1
  	[WHEN search_condition2 THEN statement_list2]...
  	[ELSE statement_list]
  END CASE;
  ```

- **WHILE/REPEAT/LOOP循环**

  ```mysql
  # while  满足条件进行循环
  WHILE 条件 DO
  	SQL逻辑...
  END WHILE;
  
  # repeat 满足条件推出循环
  REPEAT
  	SQL逻辑
  	UNTIL 条件
  END REPEAT;
  
  # loop 可配合LEAVE和ITERATE使用
  # LEAVE    退出循环
  # ITERATE  跳过剩下语句直接进入下一次循环
  [begin_label:] LOOP
  	SQL逻辑
  	[leave begin_label;]
  	[ITERATE begin_label;]
  END LOOP [end_label];
  
  LEAVE label;   -- 退出循环
  ITERATE label; -- 直接进入下一次循环
  ```

- **游标**

  游标是用来存储查询结果集的数据类型，在存储过程和函数中可以使用游标对结果集进行循环处理。游标使用包括游标的声明、OPEN、FETCH和CLOSE

  ```mysql
  # 声明游标
  DECLARE 游标名称 CURSOR FOR 查询语句;
  
  # 打开游标
  OPEN 游标名称;
  
  # 获取游标记录
  FETCH 游标名称 INTO 变量[,变量]
  
  # 关闭游标
  CLOSE 游标名称;
  ```

- **条件处理handler**

  用来定义在流程控制结构中执行过程中遇到问题时对应的处理步骤

  ```mysql
  DECLARE handler_action HANDLER FOR condition_value [,condition_value]... statement;
  
  # handler_action
  	CONTINUE  -- 继续执行当前程序
  	EXIT      -- 终止执行当前程序
  	
  # condition_value
  	SQLSTATE sqlstate_value  -- 状态码，如02000
  	SQLWARNING               -- 所有以01开头的SQLSTATE代码的缩写
  	NOT FOUND                -- 所有以02开头的SQLSTATE代码的缩写
  	SQLEXCEPTION             -- 所有没有被SQLWARNING或NOT FOUND捕获的代码简写
  	
  # 例子 -- 异常处理关闭游标并退出函数
  declare exit handler for SQLSTATE '02000' close u_cursor;
  ```

#### 2.4.3. 存储函数（FUNCTION）

存储函数是有返回值的存储过程，存储函数的参数只能为IN类型

**存储函数使用较少，存储函数可以实现的功能存储过程均可以实现**

```mysql
CREATE FUNCTION 存储函数名称([参数列表])
RETURNS type [characteristic...]
BEGIN
	-- SQL 语句
	RETURN ...;
END;

# characteristic 特性说明
  DETERMINISTIC     -- 相同的输入参数总是产生相同的结果
  NO SQL            -- 不包含SQL语句
  READS SQL DATA    -- 包含读取数据的语句，但不包含写入数据的语句
```

#### 2.4.4. 触发器（TRIGGER）

- **概念**

  触发器是与表有关的数据库对象，指在insert/update/delete之前或之后，触发并执行触发器中定义的SQL语句集合。

  触发器可以用来协助应用在数据库端保证数据的完整性，日志记录，数据校验等工作

  使用别名`OLD`和`NEW`来引用触发器中发生变化的记录内容（行记录）

  现在触发器还**只支持行级触发**，不支持语句级触发器

- **创建触发器**

  ```mysql
  CREATE TRIGGER trigger_name
  BEFORE/AFTER INSEART/UPDATE/DELETE
  ON tb_name FOR EACH ROW            -- 行级触发器
  BEGIN
  	trigger_statement;
  END;
  ```

- **查看触发器**

  ```mysql
  SHOW TRIGGERS;
  ```

- **删除触发器**

  ```mysql
  DROP TRIGGER [schema_name.]trigger_name;  
  -- 如果没有指定数据库名schema_name 默认为当前数据库
  ```

### 2.5. 锁

#### 2.5.1. 全局锁

对整个数据库实例加锁，加锁后整个实例就处于只读状态

典型使用场景是做全库的逻辑备份，对所有表进行锁定，从而获取一致性视图，保证数据的完备性

```mysql
flush tables with read lock;                         -- 上全局锁
mysql dump [-h host] -uroot -pxxxx db > /usr/db.sql  -- 备份
unlock tables;                                       -- 释放全局锁

-- 在InnoDB引擎中，可以在备份时加上 --single-transaction 参数来完成不加锁的数据一致性备份
```

#### 2.5.2. 表级锁

每次锁住整张表，锁定粒度大，发生锁冲突概率最高，并发度最低

- **表锁**

  - 表共享读锁（read lock）

    只能读不能写，允许其他客户端共享读，但会阻塞其他客户端的写

  - 表独占写锁（write lock）

    当前客户端独占，既能读也能写，其他客户端不能读也不能写

  ```mysql
  # 加锁
  lock tables 表名... read / write;
  # 释放锁
  unlock tables;
  ```

- **元数据锁（meta data lock，MDL）**

  MDL加锁过程是系统自动控制，在访问一张表的时候会自动加上。主要作用是维护表元数据的数据一致性，在表上有事务活动时，不可以对元数据进行写入操作（即修改表结构）。为了避免DML和DDL的冲突，保证读写正确性。

  MySQL对一张表进行增删改查的时候，加MDL读锁（共享）；当对表结构进行变更操作时，加MDL写锁（排他）

- **意向锁**

  为了避免DML在执行时，加的行锁与表锁的冲突，在InnoDB中引入了意向锁，是的表锁不用检查每行数据是否加锁，使用意向锁来减少表锁的检查

#### 2.5.3. 行级锁

每次操作锁住对应行数据。锁粒度最小，并发度最高

InnoDB的数据是基于索引组织的，行锁是通过**对索引上的索引项加锁**来实现的，而不是对记录加的锁

- **行锁**

  锁定单个行记录的锁，防止其他事务对此进行update和delete，在RC、RR隔离级别下都支持。

- **间隙锁**

  锁定索引记录间隙（不含该记录），确保索引记录间隙不变，防止其他事务在这个间隙进行insert，产生幻读。在RR隔离级别下支持。

- **临键锁**

  行锁和间隙锁组合，同时锁住数据和间隙，在RR隔离级别下支持

1. 索引上的等值查询（唯一索引），给不存在的记录加锁时，优化为间隙锁
2. 索引上的等值查询（普通索引），向右遍历时最后一个值不满足查询需求时，临键锁退化为间隙锁
3. 索引上的范围查询（唯一索引），会访问到不满足条件的第一个值为止

### 2.6. InnoDB引擎

#### 2.6.1. 架构

- **逻辑存储结构**

  表空间、段、区、页、行

- **内存结构**

- **磁盘结构**

#### 2.6.2. 事务原理

- **redo log**

  重做日志，记录的是事务提交时数据页的物理修改，用来实现事务的**持久性**

- **undo log**

  回滚日志，用于记录数据被修改之前的信息，作用：提供回滚和MVCC（多版本并发控制），保证事务的**原子性**

#### 2.6.3. MVCC（多版本并发控制）

- **基本概念**

  - **当前读**

    读取的是记录的最新版本，读取时还要保证其它并发事务不能修改当前记录，会对读取的记录进行加锁

    select ... lock in share mode(共享锁)，select ... for update、update、insert、delete（排它锁）都是一种当前读

  - **快照读**

    简单的select（不加锁）是快照读，读取的是记录数据的可见版本，有可能是历史数据，不加锁，是非阻塞读

- **记录中的隐藏字段**

  |  隐藏字段   |                         含义                         |
  | :---------: | :--------------------------------------------------: |
  |  DB_TRX_ID  |                    最近修改事务ID                    |
  | DB_ROLL_PTR |          回滚指针，指向这条记录的上一个版本          |
  |  DB_ROW_ID  | 隐藏主键，如果表结构没有指定主键，将会生成该隐藏字段 |

- **ReadView**

  ReadView（读视图）是快照读SQL执行时MVCC提取数据的依据，记录并维护系统当前活跃（未提交）的事务ID

### 2.7. MySQL管理

#### 2.7.1. 系统数据库

|       数据库       |                             含义                             |
| :----------------: | :----------------------------------------------------------: |
|       mysql        | 存储MySQL服务器正常运行所需要的各种信息（时区、主从、用户、权限等） |
| information_schema | 提供访问数据库元数据的各种表和视图，元数据包含数据库，表，字段类型及访问权限等 |
| performance_schema | 为MySQL服务器运行时提供了一个底层监控功能，主要用于收集数据库服务器性能参数 |
|        sys         | 包含一系列方便DBA和开发人员利用performance_schema性能数据库进行性能调优和诊断的视图 |

#### 2.7.2. 常用工具

- **mysqldump**

  用来备份数据库，备份内容包含创建表，及插入表的SQL语句

  导入.sql文件，可以使用mysql的`source`指令

- **mysqlimport**

  用来导入mysqldumo加 -T 参数后导出的文本文件

- **mysqlbinlog**

  用于查看mysql二进制日志

## 3. MySQL运维

### 3.1. 日志

### 3.2. 主从复制

### 3.3. 分库分表

### 3.4. 读写分离

---

> 作者: [Jin](https://img.gujin.store/img/favicon.ico)  
> URL: https://www.gujin.store/posts/2022-8-28-mysqllearn/  

