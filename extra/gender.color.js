// Половой вопрос
d3.addModule(
{
	type: "Социализм",
	name: 'Цветовая дифференциация полов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},
	
	run: function()
	{
		if ( document.getElementById('js-commentsHolder') || document.getElementById('js-posts_holder'))
		{
			var males = 0;
			var females = 0;
			var allusers = document.querySelectorAll('a.c_user');
			if ( allusers )
			{
				for( var i = 0; i < allusers.length; i++)
				{
					if ( allusers[i].previousSibling.nodeValue.indexOf('Написала') > -1 )
					{
						//female
						allusers[i].style.borderBottom = '1px solid #ff78f7';
						females++;
					}
					else
					{
						//male
						allusers[i].style.borderBottom = '1px solid #5086ff';
						males++;
					}
					allusers[i].style.textDecoration = 'none';
				}
			}
			var headerInner = document.querySelector('div.comments_header_threshhold_inner');
			if ( headerInner )
			{
				headerInner.appendChild( document.createTextNode('м: '+males+' / ж: '+females));
			}
		}
	},
});
	