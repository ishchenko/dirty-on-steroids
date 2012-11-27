// Активные ссылки для картинок
d3.addModule(
{
	type: "Содержание",
	name: 'Раскрытие картинок по клику на ссылке',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},
	
	onPost: function(post) {
		this.imagesPreview(post.container.get(0))
	},

	onComment: function(comment) {
		this.imagesPreview(comment.container.get(0))
	},

	clickOnImageLink: function(e)
	{
		var newImageForPreview = new Image();
		newImageForPreview.src = e.target.href;

		var posx = 0;
		var posy = 0;
		if (!e) var e = window.event;
		if (e.pageX || e.pageY)
		{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY) 	
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		$j(newImageForPreview).bind('load', {x: posx, y: posy}, function(e)
		{
			if ( e.target.complete )
			{
				var data = e.data;
				var imgPreview = document.createElement('img');
				imgPreview.setAttribute('src', e.target.src );
				var posy = data.y - (e.target.height / 2 );
				if (posy < 0) 
				{
					posy = d3.window.getScroll().y;
				}
				var posx = data.x - (e.target.width /2 );
				if (posx < 0) 
				{
					posx = d3.window.getScroll().x;
				}				
				imgPreview.setAttribute('style', 'position: absolute; cursor: pointer; z-index: 2; zoom: 1; left:' + posx + 'px ; top:' + posy + 'px; width:' + e.target.width + 'px; height:' + e.target.height + 'px;');
				document.body.appendChild( imgPreview );

				$j(imgPreview).bind('click', function(e)
					{
						e.target.parentNode.removeChild( e.target );
					});
			}
		});
		$j(newImageForPreview).bind('error', {href: e.target.href}, function(e)
		{
			window.location.href = e.data.href;
		});
		e.preventDefault();
		return false;
	},

	imagesPreview: function( baseElement )
	{
		var me = this;
		$j("a", baseElement).each(function(){
			var a = this;
			if(a.href.match(/\.(gif|png|jpg|jpeg)$/i))
			{
				if (a.href.match(/(img\.youtube\.com|vimeocdn\.com)/i) == null )
				{
						$j(a).click(
							function(e){
								me.clickOnImageLink(e);
							});
				}
			}
		});
	}
});
	
