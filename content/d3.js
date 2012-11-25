// content interface module for *.d3.ru

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
	leftNavigation: function(){return $j('#leftNavigator');},
	items: function(){return d3.content.items();}
};

d3.addContentModule(/(.*\.)?d3.ru/i,
{
	type: "Ядро",
	author: 'crimaniak',
	name: 'Интерфейс к содержимому d3.ru',
	variant: 'd3.ru',
	posts: [],
	comments: [],
	commentListeners: [],
	postListeners: [],
	run: function()
	{
		var me=this;

		this.countItems();

		//d3.window.d3=d3;
		d3.content=this;

		function processPost($post) {
			var post = new Post($post);
			me.countPost(post);
			me.postListeners.forEach(function (listener) {
				try {
					listener(post);
				} catch (e) {
					if(console) console.log(e);
				}
			});
		}

		function processComment($comment) {
			var comment = new Comment($comment);
			me.countComment(comment);
			me.commentListeners.forEach(function (listener) {
				try {
					listener(comment);
				} catch (e) {
					if(console) console.log(e);
				}
			});
		}

		$j(document).on('DOMNodeInserted', function (event) {
			var $current = $j(event.target);
			if ($current.is(".comment")) processComment($current);
			if ($current.is(".post")) processPost($current);

			$j("div.post", event.target).each(
				function () {
					processPost($j(this));
				}
			);
			$j("div.comment", event.target).each(
				function () {
					processComment($j(this));
				}
			);
		});

		this.createLeftNavigator();
	},
	
	countItems: function()
	{
		this.posts=[];
		this.comments=[];
		var me=this;
		$j('.post').each(function () {
			me.countPost(new Post($j(this)));
		});
		$j('.comment').each(function () {
			me.countComment(new Comment($j(this)));
		});
	},

	countPost: function(post) {
		this.posts.push(post);
	},

	countComment: function(comment) {
		this.comments.push(comment);
	},
	
	items: function(){return this.comments.length ? this.comments : this.posts.length ? this.posts : [];},
	
	onNewComment: function(fn){this.commentListeners.push(fn);},
	onNewPost: function(fn){this.postListeners.push(fn);},

	addItemsProcessor: function(processor)
	{
		var items = this.items();

		for(var i=0;i<items.length;++i)
			processor(items[i]);
		
		this.onNewComment(processor);
	},
	
	addToHeaderNav: function(item, after)
	{
		var nav = $j('#js-header_nav_user_menu');
		var list = $j('ul', nav);
		if(after !== undefined)
		{
			after = $j('li:contains("'+after+'")',list);
			console.log(after);
			console.log(after.text());
			item.insertAfter(after);
		} else
			list.append(item);
		nav.height(nav.height()+item.height());
		
	},
	
	addToLeftNav: function(item, after)
	{
		var nav = $j('#leftNavigator');
		var list = $j('ul', nav);
		if(after !== undefined)
		{
			after = $j('li:contains("'+after+'")',list);
			console.log(after);
			console.log(after.text());
			item.insertAfter(after);
		} else
			list.append(item);
	},

	addConfigLink: function(id)
	{
		this.addToLeftNav($j('<li class="b-header_nav_user_menu_item"><a href="#" id="'+id+'">сервис-пак</a></li>'));
	},
	
	// collect user info
	findUser: function()
	{
		return {id: 0, name: d3.window.globals.current_user};
	},
	
	createLeftNavigator: function()
	{
		$j('div.l-content_aside').append('<div id="leftNavigator"><ul style="list-style-type: none;"></ul></div>');
	}
	
});
