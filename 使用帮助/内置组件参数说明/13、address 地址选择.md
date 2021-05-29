## 万能表单使用方式

```js
{ key:"address", title:"address类型", type:"address" }
```

## API

### 属性

[点击查看『公共属性』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4051177&doc_id=975983)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| level            | 层级（最大3级，省市区） | Number  | 3 | 1 、 2  |


## 万能表格使用方式

```js
{ key: "address", title: "地址", type: "address", width: 120 }
```


## template 使用方式
```html
<vk-data-input-address v-model="address" placeholder="请选择省市区" :level="3"></vk-data-input-address>
```
