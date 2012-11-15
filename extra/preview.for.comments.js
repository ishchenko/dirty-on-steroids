// Предпросмотр для комментариев
d3.addModule(
{
	type: "Содержание",
	name: 'Добавлять предпросмотр для комментариев',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},

	run: function()
	{
		// div.comments_add_yarrr
		var previewCont = document.querySelector('div.b-textarea_editor');
		if ( previewCont )
		{
			newLink = document.createElement('a');
			newLink.href = '#';
			newLink.id = 'prevLink';
			newLink.innerHTML = 'Preview';
			previewCont.appendChild( newLink );

			if ( document.location.href.indexOf('/inbox/write/') == -1 )
			{
				$j('#prevLink').click( function(e){
					var previewCont = document.querySelector('div.b-comments_reply_block');
					var previewTextArea = document.querySelector('textarea.i-form_text_input');
					if ( previewTextArea && previewCont )
					{
						var previewDiv = document.getElementById('sp3previewDiv');
						if ( previewDiv == null )
						{
							previewDiv = document.createElement('div');
							previewDiv.setAttribute('style', 'padding: 5px; margin: 5px 0px 0px 0px !important; border: 1px dashed grey;');
							previewDiv.setAttribute('id', 'sp3previewDiv');
							previewDiv.setAttribute('class', 'comment');
							previewCont.appendChild( previewDiv );
						}
						previewDiv.innerHTML = previewTextArea.value.replace(/\n/g,'<br>');
						
					}
					e.preventDefault();
					return false;
				});

				$j('input.b-comments_reply_block_yarrr').click( function(e){
	  				var previewDiv = document.getElementById('sp3previewDiv');
	  				if( previewDiv )
	  				{
	  					previewDiv.parentNode.removeChild( previewDiv );
	  				}
	  				return true;
				});
			}
			else // wrinting new inbox
			{
				$j('#prevLink').click( function(e){
					var previewCont = document.getElementById('js-new_inbox_form');
					var previewTextArea = document.getElementById('js-new_inbox_body');
					if ( previewTextArea && previewCont )
					{
						var previewDiv = document.getElementById('sp3previewDiv');
						if ( previewDiv == null )
						{
							previewDiv = document.createElement('div');
							previewDiv.setAttribute('style', 'padding: 5px; margin: 5px 0px 0px 0px !important; border: 1px dashed grey;');
							previewDiv.setAttribute('id', 'sp3previewDiv');
							previewDiv.setAttribute('class', 'comment');
							previewCont.appendChild( previewDiv );
						}
						previewDiv.innerHTML = previewTextArea.value.replace(/\n/g,'<br>');
						
					}
					e.preventDefault();
					return false;
				});

				$j('#js-new_inbox_submit').click( function(e){
	  				var previewDiv = document.getElementById('sp3previewDiv');
	  				if( previewDiv )
	  				{
	  					previewDiv.parentNode.removeChild( previewDiv );
	  				}
	  				return true;
				});
			}
		}
	},
});
	