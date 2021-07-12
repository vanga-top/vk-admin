## vk.baseDao.getTableData 

#### 用法与vk.baseDao.selects相似，区别是 vk.baseDao.getTableData  多了一个data参数

[vk.baseDao.selects万能连表文档](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=3028633&doc_id=975983)

### data参数详解
#### data参数的作用是让前端可以直接传查询条件和排序条件。同时为了控制安全性，getTableData的whereJson参数可以设置强制where条件
#### Ta的优势是：
##### 1、条件查询很方便，且减少了很多代码量。
##### 2、在云函数端写强制条件，不用担心用户看到不该看的数据。
##### 3、代码结构比较清晰，容易阅读与理解。

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| pageIndex        | 第几页            | Number | 1      | - |
| pageSize         | 每页查询数量 | Number  | - | -  |
| sortRule         | 排序规则 | Array  | - | -  |
| formData         | 查询条件数据源 | Object  | - | -  |
| columns          | 静态模式 - 总记录数 | Array  | - | -  |

#### mode
#### columns 中 mode 参数详情
| 值         | 说明              
|------------|-------------------|
| =          | 完全匹配 |
| !=          | 不等于 |
| %%          | 模糊匹配 |
| %*          | 以xxx开头 |
| *%          | 以xxx结尾 |
| >          | 大于 |
| >=          | 大于等于 |
| <          | 小于 |
| <=          | 小于等于 |
| in          | 在数组里 |
| nin          | 不在数组里 |
| []          | 范围 arr[0] <= x <= arr[1] |
| [)          | 范围 arr[0] <= x <  arr[1]|
| (]          | 范围 arr[0] <  x <= arr[1] |
| ()          | 范围 arr[0] <  x <  arr[1] |

```js
// 通常data是前端传过来的数据
let data = {
  pageIndex:1,
  pageSize:20,
  sortRule:[
    { name:"_add_time", type:"desc" }
  ],
  formData:{
    
  },
  columns:[
    { key:"nickname", title:"昵称", type:"text", width:160, mode:"%%" },
    { key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
  ]
};
let dbName = "表名";
vk.baseDao.getTableData({
  dbName,
  data,
  // 强制where条件，比如这里设置了只能查询当前登录用户的数据
  whereJson: {
    user_id:uid
  }, 
  // 强制字段显示规则
  fieldJson: {
    
  }, 
  // 默认排序规则
  sortArr: [
    
  ], 
  // 副表列表
  foreignDB:[
    
  ], 
  // 聚合结束后的where条件
  lastWhereJson: {
    
  } 
});

```

### 前端条件查询
#### 可搭配表格搜索组件`vk-data-table-query` 进行条件查询
```html
<!-- 表格搜索组件开始 -->
<vk-data-table-query
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  @search="search"
></vk-data-table-query>
<!-- 表格搜索组件结束 -->
<!-- 表格组件开始 -->
<vk-data-table
 ...其他参数
  :query-form-param="queryForm1"
 ...其他参数
></vk-data-table>
<!-- 表格组件结束 -->
```

```js
queryForm1:{
  // 查询表单数据源，可在此设置默认值
  formData:{

  },
  // 查询表单的字段规则 fieldName:指定数据库字段名,不填默认等于key
  columns:[
    { key:"nickname", title:"昵称", type:"text", width:160, mode:"%%" },
    { key:"_add_time", title:"添加时间", type:"datetimerange", width:400, mode:"[]" },
  ]
}

```

#### queryForm1.columns 参数说明

| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   组件类型    | String  | 无    | -  |
| width   |  组件宽度    | Number  | 无    | -  |
| placeholder   |   输入前的提示    | String  | - | -  |
| mode   |  查询模式    | String  | = |  [查看mode](#mode) |
| fieldName   |  数据库字段名称，默认=key的值    | String  | key的值  | -  |
| lastWhereJson   |  是否是连表后的where条件 | Boolean  | false | true  |
| hidden   |  是否隐藏组件 | Boolean  | false | true  |


#### fieldName 参数的用处
##### 如余额按金额范围查询
```js
columns:[
  { 
    key:"balance1", title:"金额范围", type:"money", width:160, placeholder:"请输入最小金额", 
    mode:">=", fieldName:"balance", 
  },
  { 
    key:"balance2", title:"-", type:"money", width:160, placeholder:"请输入最大金额", 
    mode:"<=", fieldName:"balance", 
  }
]
```
#### lastWhereJson 参数的用处
##### 如userInfo是连表字段的as的值，想要根据 userInfo.mobile 进行查询
```js
columns:[
  { 
    key:"mobile", title:"手机号", type:"text", width:160,
    mode:"=", fieldName:"userInfo.mobile", lastWhereJson:true
  }
]
```


