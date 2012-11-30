// content interface module for *.d3.ru

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

		d3.page=
		{
			inbox: document.location.pathname.substr(0,10)=="/my/inbox/",
			my: document.location.pathname.substr(0,4)=="/my/",
			postComments: (window.location.pathname.indexOf("/comments/") >= 0),
			inboxComments: (( document.location.pathname.indexOf("/inbox/") > 0 ) && ( window.location.pathname.length > 15 )),
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
		this.addToLeftNav($j('<li><a href="#" id="'+id+'"><div style="background: url(data:image/png;base64,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) 7px 4px no-repeat; height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><span style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</span></div></a></li>'));
	},
	
	// collect user info
	findUser: function()
	{
		return {id: 0, name: d3.window.globals.current_user};
	},
	
	createLeftNavigator: function()
	{
		$j('div.l-content_aside').append('<div id="leftNavigator"><ul style="list-style-type: none; padding: 0px 0px 0px 5px; font-size: 0.85em;"></ul></div>');
	}
	
});
