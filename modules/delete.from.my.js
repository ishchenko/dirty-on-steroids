// Показывать кнопку удаления из моих вещей в списке моих вещей
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать кнопку удаления из моих вещей',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	onPost: function(post) {
		if ( document.location.href.indexOf('/my/') > -1 )
		{
			this.addDeleteButton(post)
		}
	},

	addDeleteButton: function( baseElement )
	{
		var postBottom = baseElement.container.get(0).querySelector('div.dd');
		var postId = baseElement.id;
		//console.log( postId );
		if ( postBottom )
		{
			var newLink = document.createElement('a');
			newLink.href = '#';
			newLink.title = 'удалить из моих вещей';
			newLink.textContent = 'удалить';
			newLink.setAttribute('style', 'margin-left: 15px;');
			newLink.setAttribute('onclick', "myPostsHandler.togglePost(this, '"+baseElement.id+"', 'interests', 'out'); return false;");
			postBottom.appendChild( newLink );
			$j(newLink).bind('click', function(e) {
				e.target.parentNode.parentNode.parentNode.removeChild( e.target.parentNode.parentNode );
			});
		}
	},
});

