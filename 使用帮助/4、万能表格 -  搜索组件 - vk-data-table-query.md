## 万能表格搜索组件 `vk-data-table-query`

#### columns属性的写法与万能表单相似(但部分表单组件搜索不支持)

[万能表单文档](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4003878&doc_id=975983)

## template 使用方式
```html
<vk-data-table-query
  ref="tableQuery1"
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  @search="search"
></vk-data-table-query>
```


## template 使用方式（折叠抽屉弹窗模式）
```html
<vk-data-table-query
  ref="tableQuery1"
  v-model="queryForm1.formData"
  :columns="queryForm1.columns"
  :main-columns="['user_id','_add_time']"
  @search="search"
></vk-data-table-query>
```

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| v-model            | 绑定查询表单数据源 | Object  | - | -  |
| columns            | 字段渲染规则  | Array  | - |  [查看columns](#columns)   |
| show-reset            | 是否显示重置按钮 | Boolean  | false | true |
| main-columns            | 在页面上直接显示的字段名数组，此值若不为空，则会显示高级搜索按钮 | Array  | - | -  |
| drawer            | 高级搜索的抽屉弹窗的属性（详情见element的drawer文档）| Object | -  |
| search-text            | 搜索按钮的文本 | String  | 搜索 | -  |
| senior-search-text            | 高级搜索按钮的文本 | String  | 高级搜索 | -  |

### columns
### columns与万能表单的columns相似


| 参数   | 说明       | 类型    | 默认值  | 可选值 |
|------- |-----------|---------|-------|-------|
| key    |   键名    | String  | 无    | - |
| title  |   标题    | String  | 无    | -  |
| type   |   组件类型    | String  | 无    | -  |
| width   |  组件宽度    | Number  | 无    | -  |
| placeholder   |   输入前的提示    | String  | - | -  |
| mode   |  查询模式    | String  | = | [查看mode](#mode)  |
| fieldName   |  数据库字段名称，默认=key的值    | String  | key的值  | -  |
| lastWhereJson   |  是否是连表后的where条件 | Boolean  | false | true  |
| hidden   |  是否隐藏该字段 | Boolean  | false | true  |
| show     | 显示规则,page代表显示在页面上，drawer代表显示在高级搜索中 | Array  | ["page"] |  ["page","drawer"] |


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