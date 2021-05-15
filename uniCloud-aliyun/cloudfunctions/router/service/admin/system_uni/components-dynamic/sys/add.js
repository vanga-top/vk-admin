module.exports = {
	/**
	 * 添加
	 * @url admin/system_uni/components-dynamic/sys/add 前端调用的url参数地址
	 * data 请求参数 说明
	 * @params {String} data_id 	组件数据id
	 * @params {String} title 		数据标题
	 * @params {Object} data 			组件数据
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
			data_id,
			title,
			description,
			data : components_dynamic_data
		} = data;
		// 参数非空检测
		if(vk.pubfn.isNullOne(data_id, data)){
			return { code : -1, msg : '参数错误' };
		}
		let dbName = "opendb-components-dynamic";
		// 检测key是否已存在
		let num = await vk.baseDao.count({
			dbName:dbName,
			whereJson:{
				data_id,
			}
		});
		if(num > 0){
			return { code : -1, msg : `组件数据id不能重复!` };
		}
		// 执行数据库API请求
		res.id = await vk.baseDao.add({
			dbName:dbName,
			dataJson:{
				data: components_dynamic_data,
				data_id,
				title,
				description
			}
		});
		return res;
	}

}
