define(function(require) {
	var Polling = require('teams/core/polling');
	var Setting = require('teams/core/setting');
	var AppRouter = require('teams/core/router');
	
	//全局属性
	var polling = new Polling();
	window.POLLING = polling;
	
	var setting = new Setting();
	window.SETTING = setting;
	
	var router = new AppRouter();
	window.ROUTER = router;
	
	Backbone.history.start({
		pushState : true
	});

	// 给页面中所有的a标签委托事件
	$('body').on('click', '.router', function(event) {
		event.preventDefault();
		var href = $(this).attr('href');
		if (!href || href == "#") {
			return;
		}
		//todo close modal dialog
		$('.modal').trigger("click");
//		$('#entitybox').modal('hide');
		router.navigate(href, {
			trigger : true
		});
	});

	//异步加载crm的js
	if(!window.clickedCrmModule){
		var crmJs="";
		if(TEAMS.runMode=="develop"){
			crmJs=TEAMS.service.crm+"/static/js/crm-dev.js";
		}else{
			crmJs=TEAMS.service.crm+"/static/js/crm.js?v="+TEAMS.version;
		}
		require.async(crmJs);
	}
});