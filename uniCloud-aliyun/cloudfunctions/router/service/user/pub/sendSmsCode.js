module.exports = {
  /**
   * 发送短信的验证码
   * @url user/pub/sendSmsCode 前端调用的url参数地址
   * @description 发送验证码
	 * data 请求参数 说明
	 * @params {String} mobile 手机号
	 * @params {String} type  验证码类型
	 * res 返回参数说明
	 * @params {Number} code 错误码，0表示成功
	 * @params {String} msg 详细信息
	 * @params {Object} requestRes 原始返回数据
	 * @params {Object} requestParam 包含服务供应商和发送的手机号
	 */
	main: async (event) => {
		let { data = {}, userInfo, util, originalParam } = event;
		let { uniID, config, pubFun, vk , db, _ } = util;
		let { uid } = data;
		let res = { code : 0, msg : '' };
		// 业务逻辑开始-----------------------------------------------------------
		let { mobile, type } = data;
		const code = vk.pubfn.random(6,"0123456789");
		let param = {
			code,
			type,
			mobile
		};
		let provider = "unicloud";
		if(vk.pubfn.getData(config, "vk.service.sms.aliyun.enable")){
			provider = "aliyun";
		}
		res = await vk.system.smsUtil.sendSmsVerifyCode({
			provider : provider,
			code : code,
			type : type,
			phone : mobile
		});
		// 业务逻辑结束-----------------------------------------------------------
		return res;
	}
}
