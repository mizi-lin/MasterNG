# MasterNG

### JS代码规范

#### 参数命名

1. 常量: 两个单词之间下划线连接，必须全大写；USER_NAME
2. 变量: 两个单词之间下划线连接，必须全小写 user_name

> 在类里面，private 私有变量以'_'下划线开头区分private 和 public; 如 _user_info;

> 只有 jQuery DOM 对象可使用'$'开头，如 $div

3. 方法名: 骆驼命名法, 首字母小写; 动名词 如 getUserName
4. 类，angular模块：Pascal 命名法，首字母大写；名词 如 UserModule, UserDetailComponent

##### 其余规则遵循 jslint 配置

### CSS规范

1. 尽量少使用ID选择器
2. 选择器命名使用中划线链接，.user-name
3. 若有使用第三方样式库，则选择器命名需要带上前缀以区分，.mn-user-name

------

其他的遵循 ant-design 给出的一些 [规范标准](https://ant.design/docs/spec/introduce-cn)