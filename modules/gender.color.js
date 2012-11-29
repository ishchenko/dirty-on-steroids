// Половой вопрос
d3.addModule(
{
	type: "Социализм",
	name: 'Цветовая дифференциация полов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true},
			 sexyHeader: {type:'checkbox', value:true, caption:'Показывать общее количество м/ж'}},
	malesCount: 0,
	femalesCount: 0,
	
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
						this.femalesCount++;
					}
					else
					{
						//male
						elemArray[i].style.borderBottom = '1px solid #5086ff';
						this.malesCount++;
					}
					elemArray[i].style.textDecoration = 'none';
			}
	},

	run: function()
	{
		if (this.config.sexyHeader.value && (document.getElementById('js-commentsHolder') || document.getElementById('js-posts_holder')))
		{
			this.processElements(document.querySelectorAll('a.c_user'));
			var headerInner = document.querySelector('div.b-comments_controls_new_nav');
			if ( headerInner )
			{
				headerInner.appendChild( document.createTextNode('м: '+this.malesCount+' / ж: '+this.femalesCount));
			}
		}
	},
});
	
