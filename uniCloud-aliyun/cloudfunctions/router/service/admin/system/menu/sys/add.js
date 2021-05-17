const formRules = require("../util/formRules.js");
module.exports = {
  /**
   * 新增
   * @url admin/system/menu/sys/add 前端调用的url参数地址
   * data 请求参数 说明
	 * @params {String} menu_id 					菜单Id，唯一标识
	 * @params {String} name 							菜单名称
	 * @params {String} comment 					备注
	 * @params {String} url 							页面路径
	 * @params {String} icon 							菜单图标
	 * @params {Number} sort 							排序(越大越在前面)
	 * @params {String} parent_id 				父级id
	 * @params {Boolean} enable 					是否启用
   * res 返回参数说明
   * @params {Number} code 错误码，0表示成功
   * @params {String} msg 详细信息
   */
  main: async (event) => {
		let { data = {}, userInfo, util, filterResponse, originalParam } = event;
		let { customUtil, uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
    // 业务逻辑开始-----------------------------------------------------------
		let {
			menu_id,
			name,
			comment,
			url,
			icon,
			sort = 0,
			parent_id,
			enable = true,
			hidden_menu
		} = data;

		// 参数合法校验开始-----------------------------------------------------------
		let formRulesRes = await formRules.add(event);
		if(formRulesRes.code !== 0){
			return formRulesRes;
		}
		// 参数合法校验结束-----------------------------------------------------------
		let dbName = "opendb-admin-menus";
		// 检测menu_id是否存在
		let num = await vk.baseDao.count({
			dbName,
			whereJson:{
				menu_id
			}
		});
		if(num > 0){
			return { code : -1, msg : `标识【${menu_id}】不能重复!` };
		}
		let dataJson = {
			menu_id,
			name,
			comment,
			url,
			icon,
			sort,
			parent_id,
			enable,
			hidden_menu
		};
		// 检测parent_id是否不存在
		if(vk.pubfn.isNotNull(parent_id)){
			let num = await vk.baseDao.count({
				dbName,
				whereJson:{
					menu_id : parent_id
				}
			});
			if(num <= 0){
				return { code : -1, msg : `父标识【${parent_id}】不存在!` };
			}
		}else{
			delete dataJson.parent_id;
		}
		// 执行数据库API请求
		res.id = await vk.baseDao.add({
			dbName,
			dataJson
		});
    return res;
  }

}
