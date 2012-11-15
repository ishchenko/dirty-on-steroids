// Показывать посты целиком, без дебильной ссылки - свернуть/развернуть
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать посты целиком без свернуть/развернуть',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		if( document.getElementById('js-posts_holder'))
		{
			var script2run = document.createElement('script');
			script2run.type = 'text/javascript';
			script2run.text = 'postsCutHandler = null;';
			document.body.appendChild( script2run );

			var cutPosts = document.querySelectorAll('div.post_cut');
			if ( cutPosts )
			{
				for ( var i = 0; i < cutPosts.length; i++)
				{
					cutPosts[i].querySelector('.dt').setAttribute('style', '');
					cutPosts[i].removeChild( cutPosts[i].querySelector('.b-cut'));
				}
			}
		}
	},
});
