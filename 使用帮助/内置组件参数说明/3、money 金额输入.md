## 万能表单使用方式

```js
{ key:"balance", title:"金额类型", type:"money" }
```

## API

### 属性

[点击查看『公共属性』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4051177&doc_id=975983)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| max            | 最大输入 | Number  | - | -  |
| rightText          | 右侧文字后缀 | String  | 元 | - |
| precision            | 精度（小数点位数） | Number  | 2 | -  |
| readonly          | 原生属性，是否只读  | boolean|  false | true |

## 万能表格使用方式

```js
{ key:"balance" , title:"用户余额" , type:"money" , width:100 }
```


## template 使用方式
```html
<vk-data-input-money v-model="form1.balance" placeholder="请输入金额" width="300px"></vk-data-input-money>
```
