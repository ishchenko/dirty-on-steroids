// Favicons
d3.addModule(
{
	type: "Прочее",
	name: 'Показывать favicons доменов',
	author: 'Stasik0, NickJr',
	config: {
		active:{type:'checkbox',value:true},
		mouseover:{type:'radio',options:{"перед ссылками":"false","при навидении":"true"},caption:'Показывать иконки',value:"false"},
		domainWhitelist:{caption:'Список доменов', type: 'text', value:'dirty.ru,d3.ru,d3search.ru,livejournal.com,lenta.ru,flickr.com,google.com,google.ru,yandex.ru,yandex.net,rian.ru,wikipedia.org,wikimedia.org,futurico.ru,leprosorium.ru,lepra.ru,facebook.com,twitter.com,gazeta.ru,vedomosti.ru,1tv.ru,fontanka.ru,kommersant.ru,vesti.ru,kp.ru,blogspot.com,narod.ru,vimeo.com,rbc.ru,korrespondent.net,youtube.com'
		},
	},
	faviconService: 'http://favicon.yandex.net/favicon/',

	extractDomain: function(domain){
		if(typeof(domain) === 'undefined'){
			return "";
		}
		//cut off protocol 
		domain = domain.toLowerCase().replace(/^([a-zA-Z]+):\/\//, "");
		//extract domain
		if(domain.indexOf('/')>0)domain = domain.split('/')[0];
		//normalize, 'www.ru' will not work ;)
		domain = domain.toLowerCase().replace(/^www\./, "");
		//more work, extract root domain
		var s = domain.split('.');
		//let us hope that it works, do not want to check all TLDs
		if(s.length > 2){
			if(s[s.length-2].length == 2){
				//form like blabla.**.blabla
				//domain has 3 segments
				domain = s.slice(-3).join('.');
			}else{
				domain = s.slice(-2).join('.');
			}
		}
		return domain;		
	},

	hideFavicon: function(e){
		$j(e.target).css('background-image', 'none');
	},

	showFavicon: function(e, me){
		var faviconUrl = me.faviconService+me.extractDomain(e.target.toString());
		$j(e.target).css('padding-top', '16px');
		$j(e.target).css('background-image', 'url('+faviconUrl+')');
		$j(e.target).css('background-repeat', 'no-repeat');
	},
	
	inWhiteList: function(domain){
		if(domain.length==0)return false;
		if(this.config.domainWhitelist == "*")return true;

		var whitelist = this.config.domainWhitelist.value.replace(/\s+/g, '');
		whitelist = whitelist+",";
		
		if(whitelist.indexOf(domain+",")>-1) {
			return true;
		}

		return false;
	},

	run: function(){
		if(d3.page.user)return;
		var me=this;
		var links = $j('div.dt > a, div.c_body > a');
		//iterate over links
		var domain = "";
		for(var i=0;i<links.length;i++)
		{
			domain = this.extractDomain(links[i].toString());
			if(links[i].toString().indexOf('http://')!=-1 && this.inWhiteList(domain)){
				if(this.config.mouseover.value == 'true'){
					$j(links[i]).mouseover(function(e){me.showFavicon(e,me);})
					.mouseout(this.hideFavicon);
				}else{
					$j(links[i]).css('padding-left', '19px')
					.css('background-repeat', 'no-repeat')
					.css('background-image', 'url('+this.faviconService+domain+')');
				}
			}
		}
	}
});
