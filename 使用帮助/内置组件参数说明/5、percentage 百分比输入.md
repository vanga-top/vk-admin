## 万能表单使用方式

```js
{ key:"percentage", title:"百分比类型", type:"percentage" }
```

## API

### 属性

[点击查看『公共属性』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4051177&doc_id=975983)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| max            | 最大输入 | Number  | - | -  |
| rightText          | 右侧文字后缀 | String  | % | - |
| precision            | 精度（小数点位数） | Number  | 2 | -  |

## 万能表格使用方式

```js
{ key:"percentage" , title:"百分比类型" , type:"percentage" , width:100 }
```


## template 使用方式
```html
<vk-data-input-percentage
  v-model="form1.value1"
  placeholder="请输入百分比"
  :precision="2"
  :max="100"
  width="300px"
></vk-data-input-percentage>
```
