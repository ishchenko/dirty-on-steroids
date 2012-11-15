// Показывать все комментарии в посте, даже если зашли по ссылке с #new
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать все комментарии в посте',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		if(!d3.page.inbox && d3.page.onlyNew) d3.window.commentsHandler.switchNew();
	},
	
});
	