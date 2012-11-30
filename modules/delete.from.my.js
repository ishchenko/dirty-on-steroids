// Показывать кнопку удаления из моих вещей в списке моих вещей
d3.addModule(
{
	type: "Содержание",
	name: 'Показывать кнопку удаления из моих вещей',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	onPost: function(post) {
		if ( d3.page.my && !d3.page.inbox)
		{
			this.addDeleteButton(post)
		}
	},

	addDeleteButton: function( baseElement )
	{
		var postBottom = baseElement.container.get(0).querySelector('div.dd');
		if ( postBottom )
		{
			var newLink = document.createElement('a');
			newLink.href = '#';
			newLink.title = 'удалить из моих вещей';
			newLink.setAttribute('class', 'b-controls_button b-fui_icon_button_close');			
			newLink.setAttribute('onclick', "myPostsHandler.togglePost(this, '"+baseElement.id+"', 'interests', 'out'); return false;");
			newLink.appendChild( document.createElement('span'));
			postBottom.appendChild( newLink );
			$j(newLink).bind('click', function(e) {
				e.target.parentNode.parentNode.parentNode.parentNode.removeChild( e.target.parentNode.parentNode.parentNode );
			});
		}
	},
});

