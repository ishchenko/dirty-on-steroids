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
		this.addToLeftNav($j('<li><a href="#" id="'+id+'"><div style="background: #fff url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC4AAAAqCAMAAAD79pkTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGBQTFRF1Y4gt3kezZtS6ejo////0Lid38iv1NDPyHkD5+v9mYl0rqSZ8fHx6fL+7tjBkHdS7OTa8fP9+Pj48/n+4Of7+f7/4dzt3t7e/fz0+fn++Pb87e38/Pz8qH48+/Xv3rV8NTFhnAAAAtBJREFUeNqklYuy4iAQRCdweeQBCSaIGCL//5c7QxKN0drarTuWlpaHzkA3AD//VfArPO31D3hK8bJX/D7ihSPbHepy+TYAjjDnPAiRpR2skDjic8CGpwIHK4fH43a7pfSwWYQupm94QpqEs715nCa+o/fxYS0/87Bp8xCkHHwkMHk/jvE+epvDF7zQKtsfn2L0I7e283HEumc48bBrZ4ma0XcCdKV1Hsa7c6MEdknfcAmDf4x+QLhv20WzYXRYGcQZj9QK5Dt22zHdq4A/BUiiDYele8eLuGB8dCM+fFEdtaZYns04uzlXb90XPAQmvEPesqbbcOnM3LmaaXH5wBWgOjY7MFZwpdhgzGyM0LrtDubuuBZId84ygX5xXFVXm7lGWjfHMDzxjGq1czZnIYQcTI1FNBusfIXhpe7mejYoiTnjxky1M1eGeE43NHdf/X2qml2Nc/Xs6r1mo5AGi6Gwedj0YXdJgyJmftLTKu7TPfqbtGv/5CqtHP5ViZo6NjhmmgRjmAUg9Yj+JaHSMQTYPfLTVQl5nZDWVFD1lZaUtWgZT2+JrGgZ6PlMqI1eeqUAMD330UKxC/bdEdSi96o26TYELkGiI+MAC8m/dlNQ7QKwDQCAvlGUBsUshW3OWux44WnCbYMcYwx3d14CJ1wyjuIG09emw0mw8jhjVtcjxoXj1i60RbsxbBaaA743hHMVxhUDlFS4TkP5buqs+/h2iq1+4UTRL3LXGD50pvhLeaiad3zdVijPil2rvzMFc8q4VtWx9zd5gUaRuzV9OjORG7rvzidwLKuDPC6OuJZn7DlG8XjGt9mui88wDIqxVghyreqfITjxod14WcDV5/4ZsTNP54IG/SqMQxPSN3y3S7AKqCgO1dK0/Lk9zvx60CvVNsuy9H3ftCI8N/fnVYb20jVCVwO+qC4x/e3mK3fU69KJb+fM10qH+sW9+keAAQCgNU1m/YtzgwAAAABJRU5ErkJggg==) 7px 4px no-repeat; height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><span style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</span></div></a></li>'));
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
