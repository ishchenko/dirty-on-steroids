// Update link in config
d3.addModule(
{
	type: "Прочее",
	name: 'Линк на последнюю версию',
	author: 'crimaniak',
	config: {link:{type:'html',value:'<a href="https://github.com/crimaniak/dirty-on-steroids/raw/master/result/d3.user.js">Установить последнюю версию скрипта</a>'}},
	lastCheckName: 'lastUpdateCheck',
	interval: 3600000*6,
	jsonLink: 'https://github.com/crimaniak/dirty-on-steroids/raw/master/result/pack.version.json',
	run: function(){
		var lastCheck = d3.storage.get(this.lastCheckName, {time:0, result:''});
		var now = Date.now();
		var me = this;
//		console.log(now, lastCheck.time, this.interval, lastCheck.time+this.interval);
		if(now > lastCheck.time + this.interval)
		{
			$j.get(this.jsonLink, function(data, status, x){
				data = d3.json.decode(data);
//				console.log(data, status, x);
				d3.storage.set(me.lastCheckName, {time:now, result:data.buildTime});

				if(data.buildTime > d3.buildTime &&
					confirm('Доступна новая версия сервис-пака. Попробуем поставить?'))
					{
						document.location = 'https://github.com/crimaniak/dirty-on-steroids/raw/master/result/d3.user.js';
					}
			});
		}
	}
});