// Favicons
d3.addModule(
{
	type: "Прочее",
	name: 'Показывать favicons доменов',
	author: 'Stasik0, NickJr, crimaniak',
	config: {
		active:{type:'checkbox',value:1},
		mouseover:{type:'radio',caption:'Показывать иконки',options:{"перед ссылками":0,"при наведении":1},value:0},
		domainWhitelist:{type: 'text', caption:'Список доменов', value:'dirty.ru,d3.ru,d3search.ru,livejournal.com,lenta.ru,flickr.com,google.com,google.ru,yandex.ru,yandex.net,rian.ru,wikipedia.org,wikimedia.org,futurico.ru,leprosorium.ru,lepra.ru,facebook.com,twitter.com,gazeta.ru,vedomosti.ru,1tv.ru,fontanka.ru,kommersant.ru,vesti.ru,kp.ru,blogspot.com,narod.ru,vimeo.com,rbc.ru,korrespondent.net,youtube.com'
		}
	},
	
	getDomainMasks: function()
	{
		return this.config.domainWhitelist.value
			.split(/[\s,]+/)
			.map(function(item){
				return new RegExp('^(.*\\.)?'+item.replace(/\./g,'\\.').replace(/\*/g,'.*')+'$','i');
			});
	},
	
	inWhiteList: function(domain){
		if(domain.length==0) return false;
		if(this.config.domainWhitelist.value === "*") return true;
		if(this.inWhiteList.masks == undefined) this.inWhiteList.masks = this.getDomainMasks();
		try
		{
			this.inWhiteList.masks.forEach(function(mask){
				if(mask.test(domain)) {	throw true;	}
			});
			return false;
		} catch(e)
		{
			return true;
		}
	},

	showFavicon: function (el, faviconUrl) {
		el.css('background-image','url('+faviconUrl+')').addClass("faviconized");
	},

	hideFavicon: function (el) {
		el.css('background-image','none').removeClass("faviconized");
	},

	run: function(){
		$j("<style type='text/css'> \n\
				.faviconized { \n\
				 	padding-left:19px; \n\
				    background-repeat:no-repeat; \n\
					background-position:left center; \n\
				} \n\
			</style>").appendTo($j('head'));
	},

	onPost: function(post) {
		this.processItem(post.container);
	},

	onComment: function(comment) {
		this.processItem(comment.container);
	},

	processItem: function(container) {
		var me=this;
		//iterate over links
		$j.each($j('div.dt > h3 > a', container)
			.add('div.dt a, div.c_body a, div.dt div.post_video a', container)
			.not('a[class*="b-controls_button"]')
			.not(':has(img)')
			.not('a[href=#]')
//			.not('a[href*="' + window.location.hostname + '"]')
			,
			function (index, link) {
				if (me.inWhiteList(link.hostname)) {
					var faviconUrl;
					if (link.hostname.indexOf('d3.ru', link.hostname.length - 'd3.ru'.length) !== -1) {
						//yandex has no d3.ru icon yet
						faviconUrl = 'http://www.google.com/s2/favicons?domain=' + link.hostname;
					} else {
						faviconUrl = 'http://favicon.yandex.net/favicon/' + link.hostname;
					}

					if (me.config.mouseover.value) {
						$j(link).mouseover(function () {
							me.showFavicon($j(this), faviconUrl);
						}).mouseout(function () {
							me.hideFavicon($j(this));
						});
					} else {
						me.showFavicon($j(link), faviconUrl);
					}
				}
			});
	}
});
