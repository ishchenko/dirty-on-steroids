// Спрятать рейтинг постов
d3.addModule(
{
	type: "Социализм",
	name: 'Пряталки рейтинга',
	author: 'crimaniak',
	config:
		{postRating:   {type:'checkbox',value:false,caption:'Спрятать рейтинг постов'}
		,commentRating:{type:'checkbox',value:false,caption:'Спрятать рейтинг комментариев'}
		,voteButtons:  {type:'checkbox',value:false,caption:'Спрятать кнопки голосования'}
		},
		
	run: function()
	{
		with(this.config)
		{
			if(postRating.value    || d3.page.inbox) $j('.post .vote_result').html('');
			if(commentRating.value || d3.page.inbox) $j('.c_vote .vote_result').html('');
			if(voteButtons.value) $j('.vote_button').remove();
		}
	}

});