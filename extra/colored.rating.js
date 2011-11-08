// Цветной рейтинг
d3.addModule(
{
	type: "Содержание",
	name: 'Цветной рейтинг',
	author: 'crimaniak',
	config: 
		{active:{type:'checkbox',value:true}
		,ratingPower: {type:'text',value:3,caption:'Коэффициент увеличения шрифта'}
		},
	colors:
		[{l:-250, c:'#993333'}
		,{l:-150, c:'#aa5533'}
		,{l:-100, c:'#aa7733'}
		,{l: -42, c:'#bb8833'}	
		,{l:  -5, c:'#aaaa33'}
		,{l:  64, c:'#666666'}
		,{l: 156, c:'#333333'}
		,{l: 255, c:'#000000'}
		,{l: 512, c:'#990000'}
		,{l: 999, c:'#cc0000'}
		,{l:64000,c:'#ff0000'}
		],
	run: function()
	{
		var items = d3.get.items();

		for(var i=0;i<items.length;++i)
			this.process(items[i]);
		
		d3.content.onNewComment(this.process);
	},

	process: function(item)
	{
		var container=item.ratingContainer();
		var rating=item.ratingValue();
		
		if(rating > 0)
			container.css('font-size', Math.min(16,9+Math.round(0.3*Math.sqrt(Math.abs(rating*this.config.ratingPower.value)))) + "px");

		for(var i=0;i<this.colors.length;++i) with(this.colors[i])
			if(rating < l)
			{
				container.css('color',c);
				break;
			}
	}
});