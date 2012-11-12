
// Hidden authors
d3.addModule(
{
	type: "Социализм",
	name: 'Анонимные авторы постов',
	author: 'crimaniak',
	config: {posts:   {type:'checkbox',value:false,caption:"Анонимные авторы постов"}
			,comments:{type:'checkbox',value:false,caption:"Анонимные комментаторы"}
			,mark:	  {type:'text',value:'?????',caption:"Менять никнеймы на:"}
			},
	run: function()
	{
		// anonymize posts 
		if(this.config.posts.value)
			$j('.post .dd a[href^="/user/"]').html(this.config.mark.value);

		var mark=this.config.mark.value;
		
		// anonymize comments
		if(this.config.comments.value)
		{
			// footers
			$j('.comment .c_footer a[href^="/user/"]').html(mark);
			// bodies
			d3.xpath.each("//div[contains(@class,'c_body')]//text()", //text()[matches(string(),'[^ ]+:[\\s\\S]*')]", 
					function(node)
					{
						if(node.data != undefined) ///< opera fix
							node.data=node.data.replace(/^[^ ]+:/,mark+':');
					});

			// remove ?????: from answer form
			var searchMask=new RegExp(RegExp.escape(mark)+': ','g');
			with(d3.window.commentsHandler)
			{
				var old=toggleCommentForm;
				toggleCommentForm=function(button,id)
				{
					old(button,id);
					with($j('#comment_textarea').get(0))
						value=value.replace(searchMask,'');
				};
			}
		}
		
		// Don't work! I don't know why.
		// replace ????? back to nickname before sending form
		/*
		var mask2=new RegExp('^'+RegExp.escape(mark)+':','g');
		$j('#js-comments_reply_form').submit(function(event)
			{
				with(event.target)
				{
					var r=elements['replyto'].value;
					if(r)
					{
						var u=$j('#'+r).get(0).comment.userName;
						elements['comment'].value=elements['comment'].value.replace(mask2,u+':');
					}
				}
			});
			*/
	}
});