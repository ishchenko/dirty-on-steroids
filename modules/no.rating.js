// Спрятать рейтинг постов
d3.addModule(
{
	type: "Социализм",
	name: 'Пряталки рейтинга',
	author: 'crimaniak',
	config:
		{postRating:   {type:'checkbox',value:0,caption:'Спрятать рейтинг постов'}
		,commentRating:{type:'checkbox',value:0,caption:'Спрятать рейтинг комментариев'}
		,voteButtons:  {type:'checkbox',value:0,caption:'Спрятать кнопки голосования'}
		},

	onPost: function(post) {
		if(d3.page.inbox || this.config.postRating.value) {
			$j('.vote_result', post.container).remove();
		}
		if(d3.page.inbox || this.config.voteButtons.value) {
			$j('.vote_button', post.container).remove();
		}
	},

	onComment: function(comment) {
		if(d3.page.inbox || this.config.commentRating.value) {
			$j('.c_vote .vote_result', comment.container).remove();
		}
		if(d3.page.inbox || this.config.voteButtons.value) {
			$j('.vote_button', comment.container).remove();
		}
	}
});
