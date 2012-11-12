// Показывать все комментарии в посте, даже если зашли по ссылке с #new
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать все комментарии в посте',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		if ( document.location.href.indexOf('inbox') < 0 && document.location.href.indexOf('#new') > -1)
		{
			var script2run = document.createElement('script');
			script2run.type = 'text/javascript';
			script2run.text = 'commentsHandler.switchNew();';
			document.body.appendChild( script2run );
		}
	},	
	
});
	