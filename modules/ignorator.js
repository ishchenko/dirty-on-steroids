
// Ignore posts by ...
d3.addModule(
{
	type: "Социализм",
	name: 'Игноратор',
	author: 'crimaniak,Stasik0',
	variant: ['d3.ru'],
	config: {active:{type:'checkbox',value:1, description: 'Рядом с постами появляется кнопка [игнорировать]. Нажав на нее, Вы можете скрыть пост совсем или минимизировать до полоски статуса.'}
			,ignored:{type:'hidden',value:{}}
			,hideAtAll:{type:'checkbox',value:1,caption:'скрывать посты совсем'}
//			,moderation:{type:'checkbox',value:0,caption:'модерация от d3search'}
//			,postByAuthor:{type:'text'}
//			,commentByAuthor:{type:'text'}
			},
			
	run: function()
	{
		if(Math.random()<0.05)
		{
			var rubicon=Number(new Date())-5184000000;
			for(var i in this.config.ignored)
				if(this.config.ignored[i]<rubicon)
					this.config.ignored[i]=undefined;
		}
/*		
		if(this.config.moderation.value)
		{
		    var moderation = document.createElement('script');
		    moderation.setAttribute('type', 'text/javascript');
		    moderation.setAttribute('src', 'http://api.d3search.ru/moderation/list?t=' + new Date().getTime());
		    $j('head').get(0).appendChild(moderation);
		}
*/	},

	onPost: function(post)
	{
		if (d3.content.comments.length == 0) { // main page //TODO replace this with user location in d3.content issue #31
			var footer = post.getFooter();
			var me = this;
			var id = '' + post.id;

			if (this.config.ignored.value[id] != undefined)
				(this.config.hideAtAll.value ? post.container : $j('div.dt', post.container)).hide();

			footer.append('&nbsp; <a class="ignorator" href="#" style="font-weight: bold">[игнорировать]</a>');
			$j('.ignorator', footer).click(function () {
				return me.processClick(post);
			});
		}
	},
	
	processClick: function(post)
	{
		var content=$j('div.dt',post.container);
		var id=''+post.id;

		with(this.config.ignored)
		{
			if(value[id]!=undefined)
			{
				value[id]=undefined;
				content.show();
			}else
			{
				value[id]=Number(new Date());
				content.hide();
			}
			_control.update();
		}
		d3.config.save();
		return false;
	}
});
