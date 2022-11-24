/**
 * 时间工具类
 */
var util = {};
util.getTargetTimezone = function(val) {
	if (typeof val === "number") {
		return val;
	}
	let vk = uni.vk;
	let defaultValue = 8;
	let targetTimezone = defaultValue;
	try {
		const config = vk.callFunctionUtil.getConfig();
		targetTimezone = config.targetTimezone;
		if (typeof targetTimezone !== "number") {
			targetTimezone = defaultValue;
		}
	} catch (err) {}
	return targetTimezone;
};

// 尽可能的将参数转成正确的时间对象
util.getDateObject = function(date) {
	if (!date) return "";
	let nowDate;
	// 如果是字符串，且纯数字，则强制转数值
	if (typeof date === "string" && !isNaN(date)) date = Number(date);
	if (typeof date === "number") {
		if (date.toString().length == 10) date *= 1000;
		nowDate = new Date(date); // 转时间对象
	} else if (typeof date === "object") {
		nowDate = new Date(date.getTime()); // 新建一个时间对象
	} else if (typeof date === "string") {
		//nowDate = new Date(date.replace(/-/g,"/")); // 新建一个时间对象
	}
	return nowDate;
};
// 获取时间在不同时区下的时间对象
util.getTimeByTimeZone = function(date, targetTimezone) {
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	let timezoneOffset = nowDate.getTimezoneOffset();
	let offset = timezoneOffset * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	let targetTime = nowDate.getTime() + offset;
	nowDate = new Date(targetTime);
	return nowDate;
};


/**
 * 日期格式化
 * @param {Date || Number} date 需要格式化的时间
 * vk.pubfn.timeFormat(new Date(),"yyyy-MM-dd hh:mm:ss");
 */
util.timeFormat = function(date, fmt = 'yyyy-MM-dd hh:mm:ss', targetTimezone) {
	try {
		if (!date) return "";
		let nowDate = util.getTimeByTimeZone(date, targetTimezone);
		let opt = {
			"M+": nowDate.getMonth() + 1, //月份
			"d+": nowDate.getDate(), //日
			"h+": nowDate.getHours(), //小时
			"m+": nowDate.getMinutes(), //分
			"s+": nowDate.getSeconds(), //秒
			//"w+": nowDate.getDay(), //周
			"q+": Math.floor((nowDate.getMonth() + 3) / 3), //季度
			"S": nowDate.getMilliseconds() //毫秒
		};
		if (/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (nowDate.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		for (let k in opt) {
			if (new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (opt[k]) : (("00" + opt[k]).substr(("" + opt[k]).length)));
			}
		}
		return fmt;
	} catch (err) {
		// 若格式错误,则原值显示
		return time;
	}
};


/**
 * 解析日期对象属性
 * @param {Date || Number} date 需要转换的时间
 * vk.pubfn.getDateInfo(new Date());
 */
util.getDateInfo = function(date = new Date(), targetTimezone) {
	let nowDate = util.getTimeByTimeZone(date, targetTimezone);
	let year = nowDate.getFullYear() + '';
	let month = (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1);
	let day = (nowDate.getDate() < 10 ? '0' + (nowDate.getDate()) : nowDate.getDate());
	let hour = (nowDate.getHours() < 10 ? '0' + (nowDate.getHours()) : nowDate.getHours());
	let minute = (nowDate.getMinutes() < 10 ? '0' + (nowDate.getMinutes()) : nowDate.getMinutes());
	let second = (nowDate.getSeconds() < 10 ? '0' + (nowDate.getSeconds()) : nowDate.getSeconds());
	let millisecond = nowDate.getMilliseconds(); //毫秒
	let week = nowDate.getDay(); // 周
	let quarter = Math.floor((nowDate.getMonth() + 3) / 3); //季度
	return {
		year: Number(year),
		month: Number(month),
		day: Number(day),
		hour: Number(hour),
		minute: Number(minute),
		second: Number(second),
		millisecond: Number(millisecond),
		week: Number(week),
		quarter: Number(quarter),
	};
};


/**
 * 获取时间范围
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
 * 返回的是时间戳(防止时区问题)
 * 返回数据如下：
 {
   todayStart     今日开始时间
   todayEnd       今日结束时间
   today12End     今日上午结束时间
   monthStart     本月开始时间
   monthEnd       本月结束时间
   yearStart      本年开始时间
   yearEnd        本年结束时间
   weekStart      本周开始时间
   weekEnd        本周结束时间
	 hourStart      当前小时开始时间
	 hourEnd        当前小时结束时间
	 yesterdayStart 昨天开始时间
	 yesterday12End 昨天上午结束时间
	 yesterdayEnd   昨天结束时间
	 lastMonthStart 上月开始时间
	 lastMonthEnd   上月结束时间
   now        现在的时间点(含月年日时分秒)
   months     本年度每月的开始和结束时间 months[1] 代表1月
 }
 * vk.pubfn.getCommonTime();
 */
util.getCommonTime = function(date = new Date(), targetTimezone) {
	let res = {};
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	const { year, month, day, hour, minute, second, millisecond, week, quarter } = util.getDateInfo(nowDate);
	// 现在的时间
	res.now = {
		year,
		month,
		day,
		hour,
		minute,
		second,
		millisecond,
		week,
		quarter,
		date_day_str: util.timeFormat(nowDate, "yyyy-MM-dd", targetTimezone),
		date_month_str: util.timeFormat(nowDate, "yyyy-MM", targetTimezone)
	};
	// 获取本月最大天数
	let month_last_day = new Date(year, month, 0).getDate();
	// 获取今年12月最大天数
	let year_last_day = new Date(year, 12, 0).getDate();
	// 今日开始时间
	res.todayStart = new Date(`${year}/${month}/${day}`).getTime() - timeDif;
	// 今日12点时间
	res.today12End = new Date(`${year}/${month}/${day}`).getTime() + (12 * 60 * 60 * 1000 - 1) - timeDif;
	// 今日结束时间
	res.todayEnd = new Date(`${year}/${month}/${day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
	// 本月开始时间
	res.monthStart = new Date(`${year}/${month}/1`).getTime() - timeDif;
	// 本月结束时间
	res.monthEnd = new Date(`${year}/${month}/${month_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
	// 本年开始时间
	res.yearStart = new Date(`${year}/1/1`).getTime() - timeDif;
	// 本年结束时间
	res.yearEnd = new Date(`${year}/12/${year_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
	// 当前小时开始时间
	res.hourStart = new Date(`${year}/${month}/${day} ${hour}:00:00`).getTime() - timeDif;
	// 当前小时结束时间
	res.hourEnd = new Date(`${year}/${month}/${day} ${hour}:59:59`).getTime() - timeDif;
	// 计算上月开始-----------------------------------------------------------
	let year_last = year;
	let month_last = month - 1;
	if (month_last === 0) {
		month_last = 12;
		year_last = year - 1;
	}
	let month_last_day_last = new Date(year_last, month_last, 0).getDate();
	// 上月开始时间
	res.lastMonthStart = new Date(`${year_last}/${month_last}/1`).getTime() - timeDif;
	// 上月结束时间
	res.lastMonthEnd = new Date(`${year_last}/${month_last}/${month_last_day_last}`).getTime() + (24 * 60 * 60 *
		1000 - 1) - timeDif;
	// 计算上月结束-----------------------------------------------------------

	// 昨天开始时间
	res.yesterdayStart = res.todayStart - 1000 * 3600 * 24;
	// 昨天上午结束时间
	res.yesterday12End = res.today12End - 1000 * 3600 * 24;
	// 昨天结束时间
	res.yesterdayEnd = res.todayEnd - 1000 * 3600 * 24;

	let weekObj = util.getWeekOffsetStartAndEnd(0, nowDate);
	// 本周开始时间
	res.weekStart = weekObj.weekStart;
	// 本周结束时间
	res.weekEnd = weekObj.weekEnd;
	// 本年1-12月的起止时间
	res.months = [];
	res.months[0] = {
		monthStart: res.monthStart,
		monthEnd: res.monthEnd
	};
	for (let i = 1; i <= 12; i++) {
		// 获取此月最大天数
		let month_last_day = new Date(year, i, 0).getDate();
		// 此月开始时间
		let monthStart = new Date(`${year}/${i}/1`).getTime() - timeDif;
		// 此月结束时间
		let monthEnd = new Date(`${year}/${i}/${month_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
		res.months[i] = {
			monthStart,
			monthEnd
		};
	}
	return res;
};

/**
 * 获得指定年份和月份后的该月的开始时间和结束时间
 * 返回数据如下：(时间戳形式)
 {
   startTime 该月开始时间
   endTime   该月结束时间
 }
vk.pubfn.getMonthStartAndEnd({
	year:2021
	month:1
});
 */
util.getMonthStartAndEnd = function(obj, targetTimezone) {
	targetTimezone = util.getTargetTimezone(targetTimezone);
	let res = {
		startTime: null,
		endTime: null
	};
	let { year, month } = obj;
	if (year > 0 && month > 0) {
		const dif = new Date().getTimezoneOffset();
		const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
		let month_last_day = new Date(year, month, 0).getDate();
		// 开始时间
		res.startTime = new Date(`${year}/${month}/1`).getTime() - timeDif;
		// 结束时间
		res.endTime = new Date(`${year}/${month}/${month_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
	}
	return res;
}

/**
 * 获得相对当前时间的偏移 count 小时的起止日期（返回小时的开始和结束时间戳）
 * @param {Number} count  默认0（0代表当前小时 -1代表上一个小时 1代表下一个小时以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getHourOffsetStartAndEnd(0);
 */
util.getHourOffsetStartAndEnd = function(count = 0, date = new Date(), targetTimezone) {
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	let res = {};
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	// 一天的毫秒数
	let offsetMillisecond = 1000 * 60 * 60;
	// 相对于当前日期count个天的日期
	nowDate = new Date(nowDate.getTime() + (offsetMillisecond * 1 * count));
	let dateInfo = util.getDateInfo(nowDate);
	// 获得当天的起始时间
	res.startTime = new Date(`${dateInfo.year}/${dateInfo.month}/${dateInfo.day} ${dateInfo.hour}:00:00`).getTime() - timeDif;
	// 获得当天的结束时间
	res.endTime = new Date(`${dateInfo.year}/${dateInfo.month}/${dateInfo.day} ${dateInfo.hour}:00:00`).getTime() + (offsetMillisecond - 1) - timeDif;
	return res;
}


/**
 * 获得相对当前时间的偏移 count 天的起止日期（返回日的开始和结束）
 * @param {Number} count  默认0（0代表今日 -1代表昨日 1代表明日以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getDayOffsetStartAndEnd(0);
 */
util.getDayOffsetStartAndEnd = function(count = 0, date = new Date(), targetTimezone) {
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	let res = {};
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	// 一天的毫秒数
	let offsetMillisecond = 1000 * 60 * 60 * 24;
	// 相对于当前日期count个天的日期
	nowDate = new Date(nowDate.getTime() + (offsetMillisecond * 1 * count));
	let dateInfo = util.getDateInfo(nowDate);
	// 获得当天的起始时间
	res.startTime = new Date(`${dateInfo.year}/${dateInfo.month}/${dateInfo.day}`).getTime() - timeDif;
	// 获得当天的结束时间
	res.endTime = new Date(`${dateInfo.year}/${dateInfo.month}/${dateInfo.day}`).getTime() + (offsetMillisecond - 1) - timeDif;
	return res;
}

/**
 * 获得相对当前周count个周的起止日期（返回周的开始和结束）
 * @param {Number} count  默认0（0代表本周 -1代表上周 1代表下周以此类推）
 * vk.pubfn.getWeekOffsetStartAndEnd(0);
 */
util.getWeekOffsetStartAndEnd = function(count = 0, date = new Date(), targetTimezone) {
	let res = {};
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	nowDate.setDate(nowDate.getDate() - nowDate.getDay() + 1 + count * 7);
	let dateInfo1 = util.getDateInfo(nowDate);
	nowDate.setDate(nowDate.getDate() + 7);
	let dateInfo2 = util.getDateInfo(nowDate);
	// 开始时间
	res.startTime = new Date(`${dateInfo1.year}/${dateInfo1.month}/${dateInfo1.day}`).getTime() - timeDif;
	// 结束时间
	res.endTime = new Date(`${dateInfo2.year}/${dateInfo2.month}/${dateInfo2.day}`).getTime() - 1 - timeDif;
	return res;
}

/**
 * 获得相对当前时间的偏移 count 个月的起止日期（月的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本月 -1代表上月 1代表下月以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getMonthOffsetStartAndEnd(0);
 */
util.getMonthOffsetStartAndEnd = function(count = 0, date = new Date(), targetTimezone) {
	let res = {};
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	let dateInfo = util.getDateInfo(nowDate);
	let month = dateInfo.month + count;
	let year = dateInfo.year;
	if (month > 12) {
		year = year + Math.floor(month / 12);
		month = Math.abs(month) % 12;
	} else if (month <= 0) {
		year = year - 1 - Math.floor(Math.abs(month) / 12);
		month = 12 - Math.abs(month) % 12;
	}
	let month_last_day = new Date(year, month, 0).getDate();
	// 开始时间
	res.startTime = new Date(`${year}/${month}/1`).getTime() - timeDif;
	// 结束时间
	res.endTime = new Date(`${year}/${month}/${month_last_day}`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
	return res;
}


/**
 * 获得相对当前时间的偏移 count 个季度的起止日期（季度的开始和结束时间戳）
 * @param {Number} count  默认0（0代表本季度 -1代表上个季度 1代表下个季度以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getQuarterOffsetStartAndEnd(0);
 */
util.getQuarterOffsetStartAndEnd = function(count = 0, date = new Date(), targetTimezone) {
	let res = {};
	let nowDate = util.getDateObject(date);
	nowDate.setMonth(nowDate.getMonth() + count * 3);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	let dateInfo = util.getDateInfo(nowDate);
	let month = dateInfo.month;
	if ([1, 2, 3].indexOf(month) > -1) {
		// 第1季度
		month = 1;
	} else if ([4, 5, 6].indexOf(month) > -1) {
		// 第2季度
		month = 4;
	} else if ([7, 8, 9].indexOf(month) > -1) {
		// 第3季度
		month = 7;
	} else if ([10, 11, 12].indexOf(month) > -1) {
		// 第4季度
		month = 10;
	}
	nowDate.setMonth(month - 1); // 因为0代表1月，所以这里要减1
	let dateInfo1 = util.getDateInfo(nowDate);
	nowDate.setMonth(nowDate.getMonth() + 3);
	let dateInfo2 = util.getDateInfo(nowDate);
	// 开始时间
	res.startTime = new Date(`${dateInfo1.year}/${dateInfo1.month}/1`).getTime() - timeDif;
	// 结束时间
	res.endTime = new Date(`${dateInfo2.year}/${dateInfo2.month}/1`).getTime() - 1 - timeDif;
	return res;
}

/**
 * 获得相对当前时间的偏移 count 年的起止日期（年的开始和结束时间戳）
 * @param {Number} count  默认0 （0代表今年 -1代表去年 1代表明年以此类推）
 * @param {Date || Number} date 指定从哪个时间节点开始计算
 * vk.pubfn.getYearOffsetStartAndEnd(0);
 */
util.getYearOffsetStartAndEnd = function(count = 0, date = new Date(), targetTimezone) {
	let res = {};
	let nowDate = util.getDateObject(date);
	targetTimezone = util.getTargetTimezone(targetTimezone);
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	let dateInfo = util.getDateInfo(nowDate);
	let year = dateInfo.year + count;
	// 开始时间
	res.startTime = new Date(`${year}/1/1`).getTime() - timeDif;
	// 结束时间
	res.endTime = new Date(`${year}/12/31`).getTime() + (24 * 60 * 60 * 1000 - 1) - timeDif;
	return res;
};


/**
 * 获得指定时间偏移 year年 month月 day天 hours时 minutes分 seconds秒前或后的时间戳
 * 返回时间戳
vk.pubfn.getOffsetTime(new Date(), {
	year:0,
	month:0,
	day:0,
	hours:0,
	minutes:0,
	seconds:0,
	mode:"after", // after 之后 before 之前
});

vk.pubfn.getOffsetTime(new Date(), {
	y:0,
	m:0,
	d:0,
	hh:0,
	mm:0,
	ss:0,
	mode:"after" // after 之后 before 之前
});
 */
util.getOffsetTime = function(date = new Date(), obj) {
	let nowDate = util.getDateObject(date);
	let year = obj.year || obj.y;
	let month = obj.month || obj.m;
	let day = obj.day || obj.d;
	let hours = obj.hours || obj.hh;
	let minutes = obj.minutes || obj.mm;
	let seconds = obj.seconds || obj.ss;
	let { mode = "after" } = obj;
	if (mode == "before") {
		year *= -1;
		month *= -1;
		day *= -1;
		hours *= -1;
		minutes *= -1;
		seconds *= -1;
	}
	if (year) {
		nowDate = nowDate.setFullYear(nowDate.getFullYear() + year);
		nowDate = new Date(nowDate);
	}
	if (month) {
		nowDate = nowDate.setMonth(nowDate.getMonth() + month);
		nowDate = new Date(nowDate);
	}
	if (day) {
		nowDate = nowDate.setDate(nowDate.getDate() + day);
		nowDate = new Date(nowDate);
	}
	if (hours) {
		nowDate = nowDate.setHours(nowDate.getHours() + hours);
		nowDate = new Date(nowDate);
	}
	if (minutes) {
		nowDate = nowDate.setMinutes(nowDate.getMinutes() + minutes);
		nowDate = new Date(nowDate);
	}
	if (seconds) {
		nowDate = nowDate.setSeconds(nowDate.getSeconds() + seconds);
		nowDate = new Date(nowDate);
	}
	return nowDate.getTime();
}



/**
 * 判断是否是闰年
 * @param {Number | Date} year 需要计算的年份或时间,默认使用当前时间的年份
 * vk.pubfn.timeUtil.isLeapYear(year);
 */
util.isLeapYear = function(year) {
	if (typeof year === "undefined") {
		let { now } = util.getCommonTime();
		year = now.year;
	} else if (typeof year === "object") {
		let { now } = util.getCommonTime(year);
		year = now.year;
	}
	if (((year % 4) == 0) && ((year % 100) != 0) || ((year % 400) == 0)) {
		return true;
	} else {
		return false;
	}
}


/**
 * 判断是否是清明节
 * @param {Date} date 日期对象 可以指定时间计算节点，默认使用当前时间进行计算
vk.pubfn.timeUtil.isQingming(new Date());
 */
util.isQingming = function(data = new Date()) {
	let { now } = util.getCommonTime(data);
	let { year, month, day } = now;
	let key = false;
	// 清明节的日期是不固定的，规律是：闰年开始的前2年是4月4日，闰年开始的第3年和第4年是4月5日
	if (util.isLeapYear(year) || util.isLeapYear(year - 1)) {
		if (month === 4 && day === 4) {
			key = true;
		}
	} else {
		if (month === 4 && day === 5) {
			key = true;
		}
	}
	return key;
}

/**
 * 日期对象转换（已弃用，建议不要使用此API）
 * @param {Date || Number} date 需要转换的时间
 * @param {Number} type 转换方式
 * type = 0 返回 2020-08-03 12:12:12
 * type = 1 返回 20200803121212
 * type = 2 返回 { YYYY, MM, DD, hh, mm, ss }
 */
util.getFullTime = function(date, type = 0, targetTimezone) {
	if (!date) return "";
	targetTimezone = util.getTargetTimezone(targetTimezone);
	let nowDate = util.getDateObject(date);
	const dif = nowDate.getTimezoneOffset();
	const timeDif = dif * 60 * 1000 + (targetTimezone * 60 * 60 * 1000);
	const east8time = nowDate.getTime() + timeDif;
	nowDate = new Date(east8time);

	let YYYY = nowDate.getFullYear() + '';
	let MM = (nowDate.getMonth() + 1 < 10 ? '0' + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1);
	let DD = (nowDate.getDate() < 10 ? '0' + (nowDate.getDate()) : nowDate.getDate());
	let hh = (nowDate.getHours() < 10 ? '0' + (nowDate.getHours()) : nowDate.getHours());
	let mm = (nowDate.getMinutes() < 10 ? '0' + (nowDate.getMinutes()) : nowDate.getMinutes());
	let ss = (nowDate.getSeconds() < 10 ? '0' + (nowDate.getSeconds()) : nowDate.getSeconds());
	if (type === 2) {
		return {
			YYYY: Number(YYYY),
			MM: Number(MM),
			DD: Number(DD),
			hh: Number(hh),
			mm: Number(mm),
			ss: Number(ss),

			year: Number(YYYY),
			month: Number(MM),
			day: Number(DD),
			hour: Number(hh),
			minute: Number(mm),
			second: Number(ss),
		};
	} else if (type === 1) {
		return YYYY + "" + MM + "" + DD + "" + hh + "" + mm + "" + ss;
	} else {
		return YYYY + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
	}
};


export default util;
