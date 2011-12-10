// Redirect search to d3search.ru
d3.addModule(
{
	type: "Поиск",
	name: 'Поиск на d3search.ru',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:true}},
	run: function()
	{
		$j('form[name="simple-search"]').attr('action','http://d3search.ru/search');
	}
});
