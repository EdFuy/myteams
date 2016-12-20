/**
 * 轮询组件封装
 */
define(function(require, exports, module) {
	
	var utils = require('teams/utils');
	var ReloginView = require('teams/core/relogin');

	var polling = {

		pushlets : [],

		init : function() {
			var self = this;
			var pushlets = this.pushlets;
			var relogin = true;
			// 页面点击后将pushlet重置
			$('body').on('click.Polling', function(event) {
				var now = new Date(); 
				var lastActionTime = $('body').data('lastActionTime') || now;
				$('body').data('lastActionTime',now);
				var isBefore = lastActionTime.getTime() < (now.getTime() - 1000*10);
				if(isBefore){
					for (var i = 0; i < pushlets.length; i++) {
						self.reset(pushlets[i]);
					}
				}
			});
		},

		/**
		 * pushlet:Pushlet对象 {id:ID, url:请求URL, param：请求参数, callback：回调函数}
		 */
		register : function(pushlet) {
			pushlet['count'] = 1;// 计数器设置为1
			pushlet['errorCount'] = 0;// 错误次数统计
			this.pushlets.push(pushlet);
			this.start(pushlet);
			pushlet['started'] = true;
		},

		/**
		 * 计数器置为1,重新启动Pushlet
		 */
		reset : function(pushlet) {
			if(!pushlet.started)	return;
			var self = this;
			//计数器重启
			clearTimeout(pushlet.timer);
			pushlet['count'] = 1;
			setTimeout(function() {
				self.start(pushlet);
			}, 3000);
		},

		/**
		 * 删除一个pushlet ID：pushlet的ID
		 */
		destory : function(id) {
			var self = this;
			var pushlet = self.pushlets.find(function(n) {
				return n['id'] == id;
			});
			if (pushlet.timer) {
				clearTimeout(pushlet.timer);
			}
			self.pushlets.remove(function(n) {
				return n['id'] == id;
			});
		},

		/**
		 * 启动一个Pushlet对象,向服务器发起请求
		 */
		start : function(pushlet) {
			if (pushlet.timer) {
				clearTimeout(pushlet.timer);
			}
			var self = this;
			var count = pushlet.count;
			
			var doNext = function(){
				pushlet.count++;
				// 按计数器衰减，前5次间隔线性增长，5次之后以n平方延长增长
				// 页面点击之后，计数器重置,页面长时间没有动作的用户延长刷新时间
				var timeDelay = count < 5 ? 1000 * 45 * count : 1000 * 45 * (count - 3) * count;
				var timer = setTimeout(function() {
					self.start(pushlet);
				}, timeDelay);
				pushlet.timer = timer;
			};
			var param = pushlet.param ? pushlet.param : {};
			param['count'] = count;
			$.ajax({
				type : 'get',
				global: false,
				url : pushlet.url,
				dataType : 'json',
				data : param,
				success : function(data) {
					//登录超时
					if(!data.actionMsg || data.actionMsg.code!=-1){
						if (pushlet.callback) pushlet.callback(data);
						pushlet['errorCount'] = 0;//成功执行一次之后将错误次数置为0
						pushlet['lastActionTime'] = new Date();//最后一次执行时间
						self.relogin  =true; //成功执行后 relogin复原  下次超时就可以重新弹出
						doNext();
					}else if (self.relogin && data.actionMsg && data.actionMsg.code == -1 ) {
						var reloginView = new ReloginView({
							'currentUser':TEAMS.currentUser
						});
						reloginView.render();
						self.relogin = false ;//只执行一次弹出超时
					} 
				},
				error : function (request, status, error) {
					pushlet.errorCount++;
					if(pushlet.errorCount<3){//连续发生3次错误将不再执行
						doNext();
					}
				}
			});

		}
	};
	module.exports = function(){
		polling.init();
		return polling;
	};
});