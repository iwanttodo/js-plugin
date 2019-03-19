## 概述
二代(18位)身份证号码校验与信息获取

## 使用步骤
* 1.引入 idcardno-util.js
```html
<script type="text/javascript" src="idcardno-util.js"></script>
```

* 2.通用方法说明
```javascript


/**
 * 校验身份证号
 * @param idCardNo 18位身份证号
 * @returns boolean
 */
IdCardNoUtil.validate(idCardNo);
		
/**
* 根据身份证号获取省市区
* 要获取市区县，需要先引入 district-util.js 
* @param idCardNo 身份证号
* @param separator 分隔符，如逗号,、减号-、空格 等，默认为空
* @returns {string}，如 河北省石家庄市长安区、河北省石家庄市、河北省
*/
IdCardNoUtil.getAddress(idCardNo, separator);

/**
* 根据身份证号获取出生日期
* @param idCardNo 身份证号
* @param separator 分隔符，如减号-、反斜杠等，默认为空
* @returns {date|string}
*/
IdCardNoUtil.getBirthday(idCardNo, separator);

/**
 * 根据身份证号获取性别
 * @param idCardNo 身份证号
 * @param opt 键必须是0和1，0是女，1是男，
 *          如 {0: "girl", 1: "boy"}
 *          也可以是数组形式 ["女生", "男生"]
 * @returns {date|string}
 */
IdCardNoUtil.getSex(idCardNo, opt);


```

* 3.使用说明
```javascript

var idcardno = "371321199212293110";

// 校验身份证号真假，返回 true
IdCardNoUtil.validate(idcardno);

// 返回山东，如果事先引入了 district-util.js ，会返回 山东省临沂市沂南县
IdCardNoUtil.getAddress(idcardno);

// 返回 1992-12-29
IdCardNoUtil.getBirthday(idcardno, "-");

// 返回 男
IdCardNoUtil.getSex(idcardno, {0: "女", 1: "男"});

```

详情参看demo.html