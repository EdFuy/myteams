define(function(require, exports, module) {
	
	var App = require('teams/core/app');
	var AppRouter = Backbone.Router.extend({
		//初始化
		initialize : function(options) {
			this.app = new App();
			
		},

		routes : {
			
			""								: "home",				//用户首页（门户）
			"home"							: "home",				//用户首页（门户）
			"home/:userId" 					: "home",				//指定用户的首页
			"portal"						: "home",				//用户首页（门户）
			"portal/:userId" 				: "home",				//指定用户的首页
			";jsessionid=:session"			: "home_session",		//默认显示当前用户主页--------------我的工作中心
			"tasks" 						: "task_tasks",			//任务主页------------------------我的工作中心->选择任务
			"tasks/" 						: "task_tasks",			//任务主页------------------------我的工作中心->选择任务
			"tasks/:userId/:type"			: "tasks_nav", 			//任务左侧导航
			"tasks/calendar" 				: "task_calendar",		//时间视图
			"tasks/calendar/:userId"		: "task_calendar",		//指定用户的时间视图
			//带ID的映射需要放在后面
			"tasks/:userId" 				: "task_tasks",			//指定用户的任务页面----------------他的工作中心->选择任务
			"tasks/:userId/:id" 			: "task_tasks",			//指定用户的任务主页点击任务明细------他（我）的工作中心->选择任务->任务明细
			//工作报告
			"workreport"			        : "workReport",			//报告主页
			"workreport/:type"                :"workReport_type",
			"workreport/:type/:id"                :"workReport_type",
			"workreport/unreadComment"		: "workReport_unreadComment",//评论我的并且未读的报告
			"workreport/unreadComment/:id"		: "workReport_unreadComment",//查看指定评论我的并且未读的报告
			"workreport/unreadReplay"		: "workReport_unreadReplay", //回复我的并且未读的报告
			"workreport/unreadReplay/:id"		: "workReport_unreadReplay", //指定回复我的并且未读的报告
			"workreport/:userId"			: "workReport",	//指定用户的报告
			"workreport/:userId/:year/:type"	: "workReport",	//查看半年，年度报告
			"workreport/:userId/:year/:type/:serialNumber"	: "workReport", //查看周报 月报 年报
			
		
			
			//搜索
			"search/keywords/:keywords" 				: "search_keywords",		//按关键字搜索
			"search/keywords/:keywords/:module" 		: "search_keywords",		//按关键字搜索
			"search/keywords/:keywords/:module/:objId" 	: "search_keywords",		//按关键字搜索
			
			"feed/watched"							    : "feed_watched",			//关注事项
			"feed/watched/:module" 						: "feed_watched",			//关注事项
			"feed/watched/:module/:objId" 				: "feed_watched",			//关注事项明细
			"feed/unfinish"							    : "feed_unfinish",			//未读事项
			"feed/unfinish/:module" 					: "feed_unfinish",			//未读事项
			"feed/unfinish/:module/:objId" 				: "feed_unfinish",			//关注事项明细
			"feed/:type" 								: "feed_newitem",		//最新事项
			"feed/:type/:module" 						: "feed_newitem",		//最新事项
			"feed/:type/:module/:objId" 				: "feed_newitem",		//最新事项明细
			
			"search/mainline/:searchId"					: "search_mainline",//主线查询
			"search/mainline/:searchId/:module" 		: "search_mainline",		//主线查询
			"search/mainline/:searchId/:module/:objId" 	: "search_mainline",		//主线查询
			"search/tag/:searchId"						: "search_tag",		//标签查询
			"search/tag/:searchId/:module" 				: "search_tag",		//标签查询
			"search/tag/:searchId/:module/:objId" 		: "search_tag",		//标签查询
			//微博
			"blog"					        		: "blog",			//当前用户工作日志
			"blog/"					        		: "blog",			//当前用户工作日志
			"blog/:userId" 							: "blog",			//他的日志
			"blog/:userId/:type" 					: "blog",//日志左侧导航
			"blog/:userId/:type/:id" 				: "blog",			//他的工作日志 日志明细
			"blog/:userId/:type/:id/:param" 		: "blog",			//他的工作日志 日志明细
			"users/myfollow" 						: "user_myfollow",		//我关注的人
			"users/myfollow/:id" 					: "user_myfollow",		//他关注的人
			"users/myfollow/:id/:type" 				: "user_myfollow",		//他关注的人
			//团队成员
			"organization" 							: "user_organization",	//团队成员管理
			"organization/:id" 						: "user_organization",	//团队成员管理
			"organization/:id/:type" 				: "user_organization",	//团队成员管理
			"organization/:id/:type/:operation" 	: "user_organization",	//团队成员管理
			"organization/:id/:type/:operation/:userOrg" 	: "user_organization",	//团队成员管理
			"organization/:id/:type/:operation/:userOrg/:creator" 	: "user_organization",	//团队成员管理(选择群组后用creator判断是否显示【设置群组成员】按钮
			"info" 									: "info",				//系统消息
			"info/:type" 							: "info_navigation",	//系统消息左侧导航
			"profile" 								: "profile",			//用户详细页
			"profile/:id" 							: "profile",			//用户详细页
			"profile/:id/:type" 					: "profile",			//用户详细页
			"messages"	 							: "messages",			//消息中心
			"messages/wechat"	 					: "messagesWechat",			//消息中心
			"messages/wechat/:userId"	 			: "messagesWechatChat",			//消息中心
			"messages/wechat/channel/:channelId"	: "messagesWechatChannel",			//消息中心
			"messages/follow"	 					: "messagesFollow",			//消息中心
			"messages/applyJoin"	 					: "messagesApplyJoin",			//消息中心
			"messages/shareJoin"	 					: "messagesShareJoin",			//消息中心
			"messages/applyReceive"	 					: "messagesApplyReceive",			//消息中心
			"messages/remind" 						: "messagesRemind",			//消息中心--右侧明细
			//主线
			"mainlines"	 							: "mainline",			//主线列表
			"mainline"	 							: "mainline",			//主线列表
			"mainlines/:userId" 					: "mainline",			//主线列表
			"mainlines/:userId/:id" 				: "mainline",			//主线列表
			"mainlines/:userId/:filterType"			: "mainline",			//主线列表
			"mainlines/:userId/:filterType/:id"		: "mainline",			//主线列表
			
			
			
			"mainline/link/:userId/:id"						: "mainlinelink",      //主线相关事项列表
			"mainline/link/:userId/:id/:mainlineType"						: "mainlinelink",      //主线相关事项列表	
			"mainline/link/:userId/:id/:mainlineType/:filterType"		                : "mainlinelink",
			"mainline/link/:userId/:id/:mainlineType/:filterType/:module"				: "mainlinelink",      //主线相关事项列表
			"mainline/link/:userId/:id/:mainlineType/:filterType/:module/:objId"		: "mainlinelink",      //主线相关事项列表
			"tag"									: "tag",				//标签列表
			"tag/:type/:id"								: "tag",
			//报表
			"report/taskstatistics" 				: "task_statistics",	// 任务统计报表
			"report/task" 							: "task_reports",		// 多人工作报表
			"report/task/:userId" 					: "task_reports",		// 指定用户的多人报表
			"report/flow" 							: "flow_reports",		// 审批申请统计
			"report/flowstat" 						: "flowStat",			// 审批综合统计
			"report/logs"							: "logs",				// 登录日志
			"report/logs/:type"						: "logs",				// 登录日志
			"report/logs/:type/:employeeId"			: "logs",				// 登录日志
			"report/timecard"						: "timecard",			// 考勤
			"report/timecard/:id"					: "timecard",			// 考勤
			"report/blog"							: "blog_reports",		// 日报报表
			"report/workhour"						: "workhour",
			"workdays"								: "workdays",			//工作日设定
			"documents"								: "documents",			//文档管理
			"documents/"							: "documents",			//文档管理
			"documents/:userId"						: "documents",			//文档管
			"documents/:userId/:type/"				: "document",	 		//分类
			"documents/:userId/:id"					: "documents",			//文档管
			"documents/:userId/:type/:folderId"		: "document",	 		//文件夹
			
			//审批管理
			"workflows"								: "workflows_navigation",
			"workflows/"							: "workflows_navigation",
			"workflows/:userId"						: "workflows_navigation",
			"workflows/:userId/"					: "workflows_navigation",
			"workflows/:userId/:type"				: "workflows_navigation", //审批左侧导航
			"workflows/:userId/:type/"				: "workflows_navigation",
			//"workflows/:userId/:requestId" 		: "workflows",
			"workflows/:userId/:type/:formId"		: "workflows_navigation",
			"workflows/:userId/:type/:formId/"		: "workflows_navigation",
			
			"wechat/:id"							: "wechats_chat"	,	//和用户聊		
			"wechat/channel/:id"					: "wechats_channel"	,	//群聊
			"wechat"								: "wechats"	,			//微信主界面
			"wechat/"								: "wechats"	,			//微信主界面
			//反馈
			"comment/unreadall"						: "unread_feedback",	//未读反馈
			"comment/unreadall/"					: "unread_feedback",	//未读反馈
			"comment/unreadall/:module/:id" 		: "unread_feedback",	//未读反馈
			//时间轴
			"versioninfo" 							: "versioninfo",			//
			"versioninfo/" 							: "versioninfo"	,	//
			"calendar/:userId"						: "calendar",
			"calendar/"								: "calendar",
			"calendar"								: "calendar",
			//表单管理
			"forms"									: "forms",
			"forms/"								: "forms",
			"forms/:userId"							: "forms",
			"forms/:userId/"						: "forms",
			"forms/:userId/:type"					: "forms", 
			"forms/:userId/:type/"					: "forms",
			"forms/:userId/:type/:formId"			: "forms",
			"forms/:userId/:type/:formId/"			: "forms",
			//打印
			"print/:id/:module" 					: "print",		//打印页面
			
			// 目前给CRM用	
		    "crms" : "showCrmPage",
			"crms/:param" : "showCrmPage",
			
			"crmapp" : "showCrmPage",
			"crmapp/:param" : "showCrmPage",
			"synchronizeddata/syncData"				: "syncData_channel"	//将groups表的数据同步到channel表
		},
		
		home : function(userId){
		    console.log(89);
			this.app.renderHome(userId);
		},
		//解决第一次登陆进来url后带;jsessionid=8B6186D456DADE8CBED1F39AF2AD5C5F的问题
		home_session : function(){
			this.home();
		},
		
		task_tasks:function(userId,id){
			this.app.renderTask(userId,id);
		},
		tasks_nav:function(userId,type){
			this.app.renderTaskByType(userId,type);
		},
		task_calendar:function(userId){
			this.app.renderTasksCalendar(userId);
		},
		
		task_report:function(userId){
			this.app.renderTaskreport(userId);
		},
		
		task_reports:function(userId){
			this.app.renderTaskreports(userId);
		},
		
		task_statistics : function(userId) {
			this.app.renderTaskStatistics(userId);
		},
		
		blog_reports:function(userId){
			this.app.renderBlogreports(userId);
		},
		flow_reports: function(){
			this.app.renderFlowreports();
		},
		flowStat: function(){
			this.app.renderFlowStat();
		},
		
		//工作报告
		workReport:function(userId,year,type,serialNumber){
			this.app.renderWorkReport(userId,year,type,serialNumber);
		},
		workReport_type:function(type,id){
			isNaN(type)?this.app.renderWorkReportType(type,id):this.app.renderWorkReport(type);
		},
		workReport_unreadComment:function(id){
			this.app.renderWorkReportType("comment",id,true);
		},
		workReport_unreadReplay:function(id){
			this.app.renderWorkReportType("replay",id,true);
		},
		
		//搜索
		search_keywords:function(keywords,module,objId){
			this.app.renderSearch("keywords",keywords,module,objId);
		},
		
		feed_watched:function(module,objId){
			module = module?module:'all';
			this.app.renderWatched(module,objId);
		},
		feed_unfinish:function(module,objId){
			module = module?module:'all';
			this.app.renderUnfinish(module,objId);
		},
		feed_newitem:function(type,module,objId){
//			module = module?module:'all';
//			this.app.renderFeedSearch(type,module,objId);
			this.app.renderHome(type);
		},
		search_mainline:function(searchId, module,objId){
			this.app.renderSearch("mainline",searchId,module,objId);
		},
		search_tag:function(searchId, module,objId){
			this.app.renderSearch("tag",searchId,module,objId);
		},
		blog:function(userId,type,id,param){
			this.app.renderBlog(userId,type,id,param);
		},
		user_myfollow:function(userId,type){
			this.app.renderMyfollow(userId,type);
		},
		user_organization:function(id,type,operation,userOrg,creator){
			this.app.renderOrganization(id,type,operation,userOrg,creator);
		},
		profile:function(id,type){
			this.app.renderProfile(id,type);
		},
		
		info:function(){
			this.app.renderInfo();
		},
		info_navigation:function(type){
			this.app.renderInfoByType(type);
		},
		messages:function(type){
			this.app.messages(type);
		},
		messagesRemind:function(){
//			this.app.messages('remind');
			this.app.renderHome('remind');
		},
		messagesWechat:function(){
//			this.app.messages('wechat');
			this.app.renderHome('portal');
		},
		messagesWechatChat:function(id){
			this.app.messages('wechat',{userId:id, chatType:'chat'});
		},
		messagesWechatChannel:function(id){
			this.app.messages('wechat',{channelId:id, chatType:'channel'});
		},
		messagesFollow:function(){
//			this.app.messages('follow');
			this.app.renderHome('follow');
		},
		messagesApplyJoin:function(){
//			this.app.messages('applyJoin');
			this.app.renderHome('applyJoin');
		},
		messagesShareJoin:function(){
//			this.app.messages('shareJoin');
			this.app.renderHome('shareJoin');
		},
		messagesApplyReceive:function(){
//			this.app.messages('applyReceive');
			this.app.renderHome('applyReceive');
		},
		
		mainline:function(userId,filterType,  id){
			this.app.mainline(userId, filterType, id);
		},
		mainlinelink:function(userId, id,mainlineType,filterType, module,objId){
			this.app.mainlinelink(userId, id, mainlineType,filterType,module,objId);
		},
		tag:function(type,id){
			this.app.tag(type,id);
		},
		showCrmPage:function(param){
			if(!param) param="customer";
			this.app.showCrmPage(param);
		},
		logs: function(type, employeeId){
			this.app.renderLog(employeeId, type);
		},
		timecard: function(id){
			this.app.renderTimecard(id);
		},
		workhour:function(){
			this.app.renderWorkhour();
		},
		workdays: function(){
			this.app.renderWorkdays();
		},
		documents: function(userId,id,type){
			userId=userId?userId:TEAMS.currentUser.id;
			this.app.documents(userId, id, type);
		},
		document: function(userId,type,folderId){
			userId=userId?userId:TEAMS.currentUser.id;
			this.app.documents(userId, null, type, folderId);
		},
		
		workflows_navigation : function(userId, type, formId){
			this.app.renderWorkflowByType(userId, type, formId);
		},
		wechats_chat:function(id){
			this.app.chat(id);
		},
		wechats_channel:function(id){
			this.app.channel(id);
		},
		wechats: function(){
			this.app.wechats();
		},
		unread_feedback: function(module, id){
			this.app.unreadfeedback(module, id);
		},
		versioninfo: function(type){
			this.app.versioninfo(type);
		},
		calendar: function(userId){
			this.app.renderCalendar(userId);
		},
		forms : function(userId,type,formId){
			this.app.renderForms(userId,type,formId);
		},
		print : function(id,module){
			this.app.print(id,module);
		},
		syncData_channel : function(){
			this.app.syncData_channel();
		}
	});

	module.exports = AppRouter;
});