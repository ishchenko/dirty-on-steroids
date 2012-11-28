// Добавляет коробку нового комментария в конце страницы
d3.addModule(
    {
        type: "Содержание",
        name: 'Новый комментарий в конце страницы',
        author: 'crea7or',
        config: {
            active: {type: 'checkbox', value: true}
        },

        run: function () {

        	var commentsDiv = document.getElementById('js-commentsHolder');
        	var fakeBottomComment = document.getElementById('js-comments_add_block_bottom');
        	var newCommentButton = document.querySelector('a.b-comments_controls_new_comment');
        	if ( commentsDiv && fakeBottomComment && newCommentButton )
        	{
        		var fakeBottomParent = fakeBottomComment.parentNode;
        		fakeBottomParent.removeChild( fakeBottomComment );
        		fakeBottomParent.appendChild( fakeBottomComment );
        		var newCommentA = document.createElement('a');
        		newCommentA.href ='#';
        		newCommentA.setAttribute('class', 'b-comments_controls_new_comment');
        		newCommentA.setAttribute('onclick', newCommentButton.getAttribute('onclick'));
        		newCommentA.textContent = "написать новый";
        		fakeBottomComment.parentNode.appendChild( newCommentA );
			}
		},
	}
);