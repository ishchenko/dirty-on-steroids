/**
 * 
 */

// content interface module
d3.addModule(
{
	type: "Ядро",
	author: 'crimaniak',
	name: 'Интерфейс к содержимому страницы',
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
	}
});