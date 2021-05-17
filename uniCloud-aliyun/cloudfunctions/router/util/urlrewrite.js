/**
 * URL重写
 * 如让 https://xxx.bspapp.com/http/router/aaa 指向云函数 template/db_api/pub/select
 */
module.exports = {
	"rule":{
		"^findById/(.+)": "template/db_api/pub/findById?_id=$1",
		"^aaa$": "template/db_api/pub/select"
	}
};