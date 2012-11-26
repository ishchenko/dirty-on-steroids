// Redirect from / to /new
d3.addModule(
{
	type: "Прочее",
	name: 'Переход с / на /new',
	author: 'Stasik0',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		if(document.location.pathname == '/')
			document.location.href = document.location.href+"new";
	}

});
