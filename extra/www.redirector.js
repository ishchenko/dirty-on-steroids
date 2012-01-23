// redirect from www.dirty.ru to dirty.ru
d3.addModule(
{
	type: "Прочее",
	name: 'Редирект с www.dirty.ru на dirty.ru',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:true}},
	run: function()
	{
		with(window.location)
			if(hostname=='www.dirty.ru')
				href=href.replace(/www.dirty.ru/, 'dirty.ru');
	}
});