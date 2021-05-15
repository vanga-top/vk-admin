const debug =  process.env.NODE_ENV !== 'production';
var menus;
var devMenus;
try {
	// 开发环境和正式环境中都会显示的静态菜单
	menus = require('./static_menu/menu.json');
	// 只在开发环境中显示的静态菜单
	devMenus = require('./static_menu/menu-dev.json');
	if(debug && devMenus){
		menus = menus.concat(devMenus);
	}
} catch (err) {}
module.exports = menus;
