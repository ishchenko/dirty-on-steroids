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
	postsUpdatedHandler: new DelayedEventHandler(),
	commentsUpdatedHandler: new DelayedEventHandler(),
	itemsUpdatedHandler: new DelayedEventHandler(),

	run: function()
	{

		var isInbox = document.location.pathname.substr(0,10)=="/my/inbox/";
		d3.page=
		{
			inbox: isInbox,
			my: document.location.pathname.substr(0, 4) == "/my/" && !isInbox,
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
		this.onCommentsUpdated(function () {
			me.itemsUpdatedHandler.trigger();
		});
		this.onPostsUpdated(function () {
			me.itemsUpdatedHandler.trigger();
		});

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
			me.postsUpdatedHandler.trigger();
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
	onPostsUpdated: function(fn){this.postsUpdatedHandler.addListener(fn);},
	onCommentsUpdated: function(fn){this.commentsUpdatedHandler.addListener(fn);},
	onItemsUpdated: function(fn){this.itemsUpdatedHandler.addListener(fn);},

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
			item.insertAfter(after);
		} else
			list.append(item);
	},

	addConfigLink: function(id)
	{
		this.addToLeftNav($j('<li><a href="#" id="'+id+'"><div style="background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRF+vn6aFxd6OfnVEpLZlpb2tjYuba2ioSFXFJTycbHq6enmpWWenJzc2tsbGNkX1VWTkRFg319kYuMY1dYoJydWU9PzszMsq6vpKCgRz0+4d/g09HRSkBBwL2+8PDw////r/uAYAAAACB0Uk5T/////////////////////////////////////////wBcXBvtAAACRklEQVR42tSW25KjIBCGUUDwRHMI4oDC+7/lgmaMyWxtTNXezF+5Afmgu+lugtKHQr8HQFP8EOjoh0D/IVB/zdcBpAdH2TrpMVwDnJRCc6VAAroGLDQh3qbE7DUgqohQtSa0NhedbtjcqVunVX0RoFb1QvV8uBrWWuKipf8rEJvpx6T3vvaUvmRHnP0OSO2fD5rGcRhGPYozER0e682kKLAdOxoPKFhDiL0lz79vDtUrM3gJm0nORcUNcDL07bZjJKSqKkLUAHKICdGOCQDDTQhNAdZRhTkvIRmCNQM9VJvyKTolP3Aw+bNRwS2uAGiVMO5LKoM1iuXzTuAmrdzcB4JIFTcfELP3yTzNVQePge/4QRts6/0eUJztsagyB1x2fewEePQlLvlXixA0qf4tM6xeuftNKzywN+srMjC73E1KNbfmLWDs0hy5lEP3ziRit5B/Jx/t3p1gWItOwCTf2ERg0U/p3WCe82fTy8pNhkuFnuuBDhhbazF+8oaAxWVSQoPOBURnh5Bfb1rf1gbOltum61nvAnqqOK+FOMo9no0CcSoURP0OtDjnI1dtbhVF7OQ/aEpDmKa2XZ3mUrKcq7niKyZMSe6fTufZuwxYVjdyLumdD5ngERHyI0Z7oGzubErdoxRNDggvspbDkdGQhw+JOim2AXHSALmulWK6KFcYKZsD1vOhXuEF87oA84Itlv2jQzjLhQFRYf3yKE17PSA6M/3Um5gMgJtbha52vugS+8rN7JMXKAj04Rvnf/8/gf8H/BFgANVQwTgRI2RUAAAAAElFTkSuQmCC) 4px 1px no-repeat; height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><span style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</span></div></a></li>'));
	},
	
	// collect user info
	findUser: function()
	{
		var user = d3.window.globals.user;
		user.name = user.login;
		return user;
	},
	
	createLeftNavigator: function()
	{
		$j('div.l-content_aside').append('<div id="leftNavigator"><ul style="list-style-type: none; padding: 0px 0px 0px 5px; font-size: 0.85em;"></ul></div>');
	}
	
});
