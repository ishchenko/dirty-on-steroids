// Показывать посты целиком, без дебильной ссылки - свернуть/развернуть
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать посты целиком без свернуть/развернуть',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		if( d3.content.posts.length > 0 )
		{
			var script2run = document.createElement('script');
			script2run.type = 'text/javascript';
			script2run.text = 'postsCutHandler.max_lines = 5000;';
			document.body.appendChild( script2run );
		}
	},
});
