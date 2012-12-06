// Показывать все комментарии в посте, даже если зашли по ссылке с #new
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать все комментарии в посте',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:1}},

	run: function()
	{
		if(d3.page.onlyNew)
		{
			var script2run = document.createElement('script');
			script2run.type = 'text/javascript';
			script2run.text = 'commentsHandler.switchNew(); document.location.hash = "new";';
			document.body.appendChild( script2run );
		}
	},
	
});
	
