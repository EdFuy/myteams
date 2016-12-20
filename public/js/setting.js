/**
 * 基础设置
 */
define(function(require, exports, module) {

	var setting = {

		init : function() {
			this.setLocale('zh_CN');
		},

		setLocale : function(locale) {
			bootbox.setLocale(locale);
		}
	};
	module.exports = function(){
		setting.init();
		return setting;
	};
});