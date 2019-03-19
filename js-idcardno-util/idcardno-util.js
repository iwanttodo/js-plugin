/**
 * 二代身份证（18位）通用方法
 * @author LiuChuanWei
 * @date 2019-03-18
 */
;(function(window,document,undefined){
	// 定义构造函数
	var idCardNoObject = function() {
		// 省编码
		this.provinces = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",
	31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",
	45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",
	65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"};
		
		// 17位系数
		this.powers = ["7","9","10","5","8","4","2","1","6","3","7","9","10","5","8","4","2"];
		
		// 余数对应的校验码
		this.parityBit = ["1","0","X","9","8","7","6","5","4","3","2"];

		// 偶数女，奇数男
		this.gender = {0: "女", 1: "男"};
	};
	
	// 定义方法
    idCardNoObject.prototype = {

        /**
		 * 校验身份证号
         * @param idCardNo 18位身份证号
         * @returns boolean
         */
		validate: function(idCardNo) {
            //18位身份证号码的基本格式校验
            if(!/^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo)) {
            	return false;
			}
            // 验证地区码
            if (!this.checkAddressCode(idCardNo)) {
                return false;
            }
            // 验证出生日期
            if (!this.checkBirthDayCode(idCardNo)) {
            	return false;
			}

            // 验证校验位
            return this.checkParityBit(idCardNo);

		},

		// 验证地区码
		checkAddressCode: function(idCardNo) {
            var address = this.getAddress(idCardNo);
            return !!address;
		},
		
		// 验证出生日期
		checkBirthDayCode: function(idCardNo) {
			var birDayCode = idCardNo.substring(6, 14);
			var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/.test(birDayCode);
			if(!check) return false;
			var yyyy = parseInt(birDayCode.substring(0,4),10);
			var mm = parseInt(birDayCode.substring(4,6),10);
			var dd = parseInt(birDayCode.substring(6),10);
			var xdata = new Date(yyyy,mm-1,dd);
			if(xdata > new Date()){
				//生日不能大于当前日期
				return false;
			}else if (( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd )){
				return true;
			}else{
				return false;
			}
		},

		// 验证校验位
		checkParityBit: function(idCardNo) {
			var parityBit = idCardNo.charAt(17).toUpperCase();
            var sum = 0;
            for(var i=0; i<17; i++) {
                sum += parseInt(idCardNo.charAt(i),10) * parseInt(this.powers[i]);
            }
            var mod = sum % 11;
			return this.parityBit[mod] == parityBit;
		},


        /**
         * 根据身份证号获取省市区
         * @param idCardNo 身份证号
         * @param separator 分隔符，如逗号,、减号-、空格 等，默认为空
         * @returns {string}，如 河北省石家庄市长安区、河北省石家庄市、河北省
         */
		getAddress: function(idCardNo, separator) {
            if(!/^[1-9]\d{5}.*$/.test(idCardNo)) return "";
            if (window.DistrictUtil) {
                return DistrictUtil.getAddress(idCardNo.substring(0,6), separator);
            } else {
                return this.provinces[parseInt(idCardNo.substring(0,2))];
            }
        },

        /**
         * 根据身份证号获取出生日期
         * @param idCardNo 身份证号
         * @param separator 分隔符，如减号-、反斜杠等，默认为空
         * @returns {date|string}
         */
		getBirthday: function(idCardNo, separator) {
            var birDayCode = idCardNo.substring(6, 14);
            var yyyy = birDayCode.substring(0,4);
            var mm = birDayCode.substring(4,6);
            var dd = birDayCode.substring(6);
            if (!separator) {
                return new Date(parseInt(yyyy, 10), parseInt(mm-1), parseInt(dd));
            } else {
                return yyyy + separator + mm + separator + dd;
            }
        },

        /**
         * 根据身份证号获取性别
         * @param idCardNo 身份证号
         * @param opt 键必须是0和1，0是女，1是男，
         *          如 {0: "girl", 1: "boy"}
         *          也可以是数组形式 ["女生", "男生"]
         * @returns {date|string}
         */
		getSex: function(idCardNo, opt) {
           var sexBit = parseInt(idCardNo.charAt(16), 10);
           var mod = sexBit % 2;
           opt = !opt ? this.gender : opt;
           return opt[mod];
        },
	};

    window.IdCardNoUtil = new idCardNoObject();
    console.log(IdCardNoUtil);

})(window,document);