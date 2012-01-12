// Спрятать КДПВ
d3.addModule(
{
	type: "Содержание",
	name: 'Спрятать картинки в постах',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:false}},
		
	run: function()
	{
		var items=d3.content.posts;
		
		if(items.length>1)
			for(var i=0;i<items.length;++i)
				this.process(items[i]);
	},

	process: function(item)
	{
		var img=$j('p img',item.container).first();
		var p=img.parent();
		var opener=$j('<a href="#">Показать картинку</a>');
		img.css('display','none');
		opener.prependTo(p);
		p.click(function(){img.css('display','');opener.remove();return false;});
	}
});