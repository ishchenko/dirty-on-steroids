// Широкая главная
d3.addModule(
{
	type: "Навигация",
	name: 'Широкая главная',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},
	
	run: function()
	{
		var postHolder = document.getElementById('js-posts_holder');
		if ( postHolder )
		{
			var banner = document.getElementById('js-random_interests');
			if ( banner )
			{
				banner.parentNode.removeChild( banner );
			}
			postHolder.setAttribute('style', 'padding-right: 30px;');
			postHolder.setAttribute('class', '');
		}
	},
});
	