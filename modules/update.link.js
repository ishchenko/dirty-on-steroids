// Update link in config
// not completed
d3.addModule(
{
	type: "Сервис-пак",
	name: 'Линк на последнюю версию',
	author: 'crimaniak',
	config: {
		checkUpdates:{type:'checkbox', value: 1, caption: 'проверять наличие новых версий', description: 'Если эта опция активна, время от времени сервис-пак проверяет наличие обновлений и сообщает о них, а также спрашивает разрешение на обновление.'},
		ver:{type:'html', value:'Текущая версия: '+d3.buildNumber+' '+d3.buildMode+' от '+d3.buildTime},
		link:{type:'html',value:'<a href="https://github.com/crimaniak/dirty-on-steroids/raw/master/result/d3.user.js">Установить последнюю версию скрипта</a>'}
	},
	lastCheckName: 'lastUpdateCheck',
	interval: 3600000*6,
	jsonLink: 'https://api.github.com/repos/crimaniak/dirty-on-steroids/contents/result/pack.version.json?callback=checkUpdate',
	run: function(){
		if(!this.config.checkUpdates.value) return;
		var lastCheck = d3.storage.get(this.lastCheckName, {time: 0, result: ''});
		var now = Date.now();
		var me = this;
//		console.log(now, lastCheck.time, this.interval, lastCheck.time+this.interval);
		if (now > lastCheck.time + this.interval) {
			window.addEventListener('update-info', function (event) {
				me.updateListener(event);
			});

			d3.service.embedScript("	\
			checkUpdate = function(data) { \
				var content = data.data.content.replace(/\\s/g, ''); \
				var contentDecoded = JSON.parse(atob(content));\
				var event;\
				if (document.createEvent) {\
					event = document.createEvent('CustomEvent');\
					event.initCustomEvent(\
					'update-info',  \
					false,\
					false,\
					contentDecoded\
					);\
					event.eventName = 'update-info';\
					event.buildInfo = contentDecoded || { };\
					event.data = contentDecoded || { };\
					window.dispatchEvent(event);\
				}\
			}; \
		");

			d3.service.attachScript(this.jsonLink);
		}
	},

	updateListener: function (event) {
//		console.log('update listener called:', event);
		var now = Date.now();
		var buildTime = event.detail.buildTime;
		if (!buildTime || buildTime == undefined) {
			if (console) console.log("Undefined build time received!", event);
		}
		d3.storage.set(this.lastCheckName, {time:now, result:buildTime});
		if(buildTime > d3.buildTime &&
			confirm('Доступна новая версия сервис-пака. Попробуем поставить?')) {
			document.location = 'https://github.com/crimaniak/dirty-on-steroids/raw/master/result/d3.user.js';
		}
	}

});