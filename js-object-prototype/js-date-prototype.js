/**
 * 扩展Date对象的功能
 * @param format
 * @returns
 * @example
 *      (new Date()).format('yyyy-MM-dd hh:mm:ss')
 *      结果是 2018-08-13 08:42:34 这样的格式 ;
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

/**
 * 扩展Date对象的功能
 * 获取上一个月日期对象
 * @param date
 * @returns {Date}
 */
Date.prototype.getPreMonth = function() {
    var year = this.getFullYear();
    var month = this.getMonth()+1;
    var day = this.getDate();
    var hour = this.getHours();
    var minute = this.getMinutes();
    var second = this.getSeconds();

    var y = year;
    var m = parseInt(month) - 1;
    if (m == 0) {    // 如果是一月
        y = parseInt(y) - 1;
        m = 12;
    }

    var monthDays = new Date(y, m, 0).getDate(); //获取 m 月的天数
    var d = day;
    if (d > monthDays) {
        d = monthDays;
    }
    return new Date(y, m-1, d, hour, minute, second);
}


/**
 * 扩展Date对象的功能
 * 获取下一个月的日期
 * @param date
 * @returns {Date}
 */
Date.prototype.getNextMonth = function(){
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();

    var y = year;
    var m = parseInt(month) + 1;
    if (m == 13) {
        y = parseInt(y) + 1;
        m = 1;
    }

    var d = day;
    var monthDays = new Date(y, m, 0).getDate(); // 获取 m 月的天数
    if (d > monthDays) {
        d = monthDays;
    }
    return new Date(y, m-1, d, hour, minute, second);
}