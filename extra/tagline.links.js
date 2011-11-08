
// tagline links
d3.addModule(
{
	type: "Навигация",
	name: 'Линки в таглинии',
	author: 'crimaniak',
	config: {active:{type:'checkbox',value:true}},
	run: function()
	{
		var l=d3.get.logoutLink();
		var links=
			[{innerHTML:'music',attributes:{href:'http://music.dirty.ru/'}}
			,{innerHTML:'banned',attributes:{href:'http://dirty.ru/banned/'}}
			,{innerHTML:'quotes',attributes:{href:'http://www.quotes-dirty.ru/',target:'_blank'}}
			];
		
		for(i in links)
			l.before( d3.newElement('a', 
					{attributes: links[i].attributes
					,style: {marginLeft: '10px', background: 'none', paddingLeft: '0px'}
					,innerHTML: links[i].innerHTML})
			);
	}
});