## 万能表单使用方式
#### 静态数据方式
#### 应用场景：选项数据为静态数据的情况。
```js
{
  key:"cascader1", title:"本地数据级联", type:"cascader",
  data:[
    {
      value:1,
      label:"数学",
      children:[
        { value:11,label:"奥数" },
        { value:12,label:"微积分" }
      ]
    },
    {
      value:2,
      label:"语文",
      children:[
        { value:21, label:"文言文" },
        { value:22, label:"古诗" }
      ]
    },
  ]
}
```

#### 远程数据方式
#### 应用场景：需要从数据库中获取选项的情况。
```js
{
  key:"cascader2", title:"云端数据级联", type:"cascader",
  action:"admin/system/permission/sys/getAll",
  props:{
    list:"rows",
    value:"permission_id",
    label:"label",
    children:"children",
    // multiple:true
  }
}
```


## API

### 属性

[点击查看『公共属性』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4051177&doc_id=975983)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| data            | 静态模式数据源 | Array  | - | -  |
| action          | 动态模式 - 远程请求的云函数地址 | String  | - | -  |
| props          | 数据源的属性匹配规则 | Object  | { list:'list', value:'value', label:'label', children:'children' } | -  |
| showAllLevels      | 输入框中是否显示选中值的完整路径 | Boolean  | true | false  |
| collapseTags      | 多选模式下是否折叠Tag | Boolean  | false | true  |
| separator        | 选项分隔符 | String  | 斜杠' / ' | -  |
| filterable        | 是否可搜索选项 | Boolean  | - | -  |
| filterMethod          | 自定义搜索逻辑 | function(node, keyword)  | -| - |
| debounce          | 搜索关键词输入的去抖延迟，毫秒 | Number  | 300 | -  |
| beforeFilter          | 筛选之前的钩子，若返回 false 或者返回 Promise 且被 reject，则停止筛选 | function(value)  | -| - |

## 万能表格使用方式

#### 无


## template 使用方式
#### 静态数据方式
#### 应用场景：选项数据为静态数据的情况。
```html
<vk-data-input-cascader
  v-model="form1.value"
  :localdata="[
    {
      value:1,
      label:'数学',
      children:[
        { value:11,label:'奥数' },
        { value:12,label:'微积分' }
      ]
    },
    {
      value:2,
      label:'语文',
      children:[
        { value:21, label:'文言文' },
        { value:22, label:'古诗' }
      ]
    },
  ]"
  placeholder="请选择"
></vk-data-input-cascader>
```
#### 远程数据方式
#### 应用场景：需要从数据库中获取选项的情况。
```html
<vk-data-input-cascader
  v-model="form1.value"
  action="admin/system/permission/sys/getAll"
  :props="{ list:'rows', value:'permission_id', label:'label', children:'children' }"
  placeholder="请选择"
></vk-data-input-cascader>
```
