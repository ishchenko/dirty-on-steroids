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
		var previewCont = document.querySelector('div.comments_add_pics');
		if ( previewCont )
		{
			previewCont.parentNode.insertBefore(d3.newDiv(
				{style:{marginRight: '30px', float: 'right'}
				,innerHTML:'<a href="#" id="prevLink" class="dashed" style="color: black; font-size: 11px;">предпросмотр</a>'
			}), previewCont);

			$j('#prevLink').click( function(e){
				var previewCont = document.getElementById('js-comments_reply_block');
				var previewTextArea = document.getElementById('comment_textarea');
				if ( previewTextArea && previewCont )
				{
					var previewDiv = document.getElementById('sp3previewDiv');
					if ( previewDiv == null )
					{
						previewDiv = document.createElement('div');
						previewDiv.setAttribute('style', 'padding: 5px 5px 5px 5px; margin-left: 0px !important; border: 1px dashed grey;');
						previewDiv.setAttribute('id', 'sp3previewDiv');
						previewDiv.setAttribute('class', 'comment');
						previewCont.appendChild( previewDiv );
					}
					previewDiv.innerHTML = previewTextArea.value.replace(/\n/g,'<br>');
					
				}
				e.preventDefault();
				return false;
			});

			$j('#js-post-yarrr').click( function(e){
  				var previewDiv = document.getElementById('sp3previewDiv');
  				if( previewDiv )
  				{
  					previewDiv.parentNode.removeChild( previewDiv );
  				}
  				return true;
			});
		}
	},
});
	