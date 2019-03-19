## 概述
中国行政区域编码的通用查询方法

## 使用步骤
* 1.引入 district-util.js
```html
<script type="text/javascript" src="district-util.js"></script>
```

* 2.通用方法说明
```javascript

/**
 * 根据编码获取省
 * @param code，如 110100 或 1101 或 11
 * @returns string
 */
DistrictUtil.getProvince(code);

 /**
 * 根据编码获取市
 * @param code，如 120100 或 1201
 * @returns string
 */
DistrictUtil.getCity(code);
        
        
/**
* 根据编码获取区县
* @param code，如 130100
* @returns string
*/
DistrictUtil.getDistrict(code);

/**
* 根据编码获取省市区
* @param code，如 130102 或 1301 或 13
* @param separator 分隔符，如逗号,、减号-、空格 等，默认为空
* @returns {string}，如 河北省石家庄市长安区、河北省石家庄市、河北省
*/
DistrictUtil.getAddress(code, separator);


/**
* 根据地区获取编码
* @param area 必须是全称，如 北京市 或 东城区 或 澳门
* @returns {number}
*/
DistrictUtil.getCode(area);

/**
* 根据区域编码获取下级区域
* @param code为空时，返回所有的省级行政区，
*       比如 37 返回山东省所有的地级市，
*       3713 返回临沂市所有区县，
*       371321 返回临沂市所有区县。
* @return object 
*/
DistrictUtil.getChildren(code);

/**
* 根据区域名称获取下级区域
* @param area 必须是区域全称，如 香港特别行政区、新疆维吾尔自治区
* @return object
*/
DistrictUtil.getChildrenByArea(area);


```

* 3.使用说明
```javascript

// 会返回 山东省-临沂市-沂南县
DistrictUtil.getAddress(371321, "-");

// 会返回 371321
DistrictUtil.getCode("沂南县");

// 会返回 {371300: "临沂市", 371301: "市辖区", 371302: "兰山区", 371311: "罗庄区", 371312: "河东区", 371321: "沂南县", 371322: "郯城县", 371323: "沂水县", 371324: "兰陵县", 371325: "费县", 371326: "平邑县", 371327: "莒南县", 371328: "蒙阴县", 371329: "临沭县"}
DistrictUtil.getChildren(3713);

```

详情参看demo.html