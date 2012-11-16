// content interface module for dirty.ru

d3.page=
{
	inbox: document.location.pathname.substr(0,10)=="/my/inbox/",
	onlyNew: (document.location.href.indexOf('#new') > -1),
	user: (window.location.pathname.indexOf("/user/")>=0) || (window.location.pathname.indexOf("/users/")>=0)
};

/// Get element(s) of page
d3.get =
{
	logoutLink: function(){return $j('#js-header_logout_link');},
	leftNavigation: function(){return $j('.left_col_nav');},
	items: function(){return d3.content.items();}
};

d3.addContentModule(/(.*\.)?dirty.ru/i,
{
	type: "Ядро",
	author: 'crimaniak',
	name: 'Интерфейс к содержимому dirty.ru',
	variant: 'dirty.ru',
	posts: [],
	comments: [],
	listeners: [],
	run: function()
	{
		var me=this;

		this.countItems();

		//d3.window.d3=d3;
		d3.content=this;
		$j(document).bind("DOMNodeInserted",function(event)
		{
			var container=$j(event.target);
			if(container.hasClass('comment'))
			{
				var comment=new Comment(container);
				me.countItems();
				for(var i=0;i<me.listeners.length;++i)
					me.listeners[i](comment);
			}
		});
	},
	
	countItems: function()
	{
		this.posts=[];
		this.comments=[];
		var me=this;
		$j('.post').each(function(){me.posts.push(new Post($j(this)));});
		$j('.comment').each(function(){me.comments.push(new Comment($j(this)));});
	},
	
	items: function(){return this.comments.length ? this.comments : this.posts.length ? this.posts : [];},
	
	onNewComment: function(fn){this.listeners.push(fn);},
	
	addItemsProcessor: function(processor)
	{
		var items = this.items();

		for(var i=0;i<items.length;++i)
			processor(items[i]);
		
		this.onNewComment(processor);
	},
	
	addConfigLink: function(id)
	{
		d3.get.leftNavigation().append($j('<li><a href="#" id="'+id+'"><span>Сервис-пак</span></a></li>'));
	},
	
	// collect user info
	findUser: function()
	{
		var e=$j('.header_tagline_inner>a[href^="http://dirty.ru/users/"]');
		if(e.length)
		{
			return {id: Math.floor(e.attr('href').replace(/[^\d]+/,'')), name: e.get(0).firstChild.data};
		}
		return {};
	}
});
