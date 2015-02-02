// Цветной рейтинг
d3.addModule(
{
	type: "Социализм",
	name: 'Цветной рейтинг',
	author: 'crimaniak',
	config: 
		{active:{type:'checkbox',value:0}
		,ratingPower: {type:'text',value:1,caption:'Коэффициент увеличения шрифта'}
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
		
	onComment: function (comment) {
		this.process(comment);
	},

	onPost: function (post) {
		this.process(post);
	},

	process: function (item) {
		var container = item.ratingContainer();
		var rating = item.ratingValue();

		if (rating > 0) {
			container.css('font-size',
				Math.min(16, 9 + Math.round(0.3 * Math.sqrt(Math.abs(rating * this.config.ratingPower.value)))) + "px");
		}

		for (var i in this.colors) {
			var color = this.colors[i];
			if (rating < color.l) {
				container.css('color', color.c);
				break;
			}
		}
	}
});