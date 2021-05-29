## 万能表单使用方式

```js
{ key:"switch", title:"switch类型", type:"switch", activeValue:true, inactiveValue:false }
```

## API

### 属性

[点击查看『公共属性』](https://gitee.com/vk-uni/vk-uni-cloud-router/wikis/pages?sort_id=4051177&doc_id=975983)

### 组件属性

| 参数             | 说明                           | 类型    | 默认值  | 可选值 |
|------------------|-------------------------------|---------|--------|-------|
| activeText            | switch 打开时的文字描述 | String  | - | -  |
| inactiveText            | switch 关闭时的文字描述 | String  | - | -  |
| activeValue            | switch 打开时的值 | Boolean/Number/String  | true | -  |
| inactiveValue            | switch 关闭时的值 | Boolean/Number/String  | false | -  |
| activeColor            | switch 打开时的背景色 | String  | - | -  |
| inactiveColor            | switch 关闭时的背景色 | String  | - | -  |
| validateEvent            | 改变 switch 状态时是否触发表单的校验 | Boolean  | true | false |

## 万能表格使用方式

```js
{ key: "switch", title: "switch类型", type: "switch", activeValue:true, inactiveValue:false, width: 100 }
```


## template 使用方式
```html
<el-switch v-model="switch" :active-value="true" :inactive-value="false"></el-switch>
```
