module.exports = {
	/**
	 * 登录日志
	 */
	 add: async (event,util) => {
		let { uniID, config, pubFun, vk , db, _ } = util;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始-----------------------------------------------------------
		let {
			type,
			login_type,
			user_id,
			ip,
			ua,
			os,
			platform,
			context={},
			state=1
		} = event;
		if(context){
			ip = context.CLIENTIP;
			ua = context.CLIENTUA;
			os = context.OS;
			platform = context.PLATFORM;
		}
		try {
			if(vk.pubfn.getData(config, "vk.service.log.login.status")){
				// 增加登录日志
				await vk.baseDao.add({
					dbName:"uni-id-log",
					dataJson:{
						type, login_type, user_id,
						ip, ua, os, platform, state
					}
				});
			}else{
				console.log("已关闭登录日志");
			}
		}catch(err){
			console.log("日志写入错误");
		}
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
