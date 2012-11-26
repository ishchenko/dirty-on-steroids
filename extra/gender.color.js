// Половой вопрос
d3.addModule(
{
	type: "Социализм",
	name: 'Цветовая дифференциация полов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},
	
	onPost: function(post){
		this.processElements(post.container.get(0).querySelectorAll('a.c_user'));
	},

	onComment: function(comment){
		this.processElements(comment.container.get(0).querySelectorAll('a.c_user'));
	},

	//expecting array of a.c_user DOM elements
	processElements: function(elemArray){
		if(!elemArray)return;
		for(var i = 0; i < elemArray.length; i++)
		{
			if (elemArray[i].previousSibling.nodeValue.indexOf('Написала') > -1 )
					{
						//female
						elemArray[i].style.borderBottom = '1px solid #ff78f7';
						//females++;
					}
					else
					{
						//male
						elemArray[i].style.borderBottom = '1px solid #5086ff';
						//males++;
					}
					elemArray[i].style.textDecoration = 'none';
			}
	},

	run: function()
	{
		if ( document.getElementById('js-commentsHolder') || document.getElementById('js-posts_holder'))
		{
			//var males = 0;
			//var females = 0;
			this.processElements(document.querySelectorAll('a.c_user'));
			
/** seems to be broken anyways
			var headerInner = document.querySelector('div.comments_header_threshhold_inner');
			if ( headerInner )
			{
				headerInner.appendChild( document.createTextNode('м: '+males+' / ж: '+females));
			}
**/
		}
	},
});
	
