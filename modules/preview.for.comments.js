// Предпросмотр для комментариев
d3.addModule(
{
	type: "Содержание",
	name: 'Добавлять предпросмотр для комментариев',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:1}},

	run: function()
	{
		var previewCont = document.querySelector('div.b-comments_reply_block');
		if ( previewCont )
		{
			var previewInput = document.createElement('input');
			previewInput.type = 'image';
			previewInput.src = 'http://g2.std3.ru/G/1/F7/FE/28284-441f5b868a323f46a2e3f10cd2fdc028.gif';
			previewInput.setAttribute('style', 'margin-right: 10px;');
			var yarrButton = previewCont.querySelector('input.b-comments_reply_block_yarrr');
			
			$j(previewInput).insertBefore( yarrButton );

			$j(yarrButton).click( function(e){
				var previewDiv = e.target.parentNode.parentNode.querySelector('div.sp3previewDiv');
				if ( previewDiv )
				{
					previewDiv.parentNode.removeChild( previewDiv );					
				}
				return true;
			});

			$j(previewInput).click( function(e){
				var previewCont = e.target.parentNode.parentNode; 
				var previewTextArea = previewCont.querySelector('textarea.i-form_text_input');
				if ( previewTextArea && previewCont )
				{
					var previewDiv = previewCont.querySelector('div.sp3previewDiv');
					if ( previewDiv == null )
					{
						previewDiv = document.createElement('div');
						previewDiv.setAttribute('style', 'padding: 5px; margin: 5px 0px 0px 0px !important; border: 1px dashed grey;');
						previewDiv.setAttribute('class', 'comment sp3previewDiv');
						previewCont.appendChild( previewDiv );
					}
					previewDiv.innerHTML = previewTextArea.value.replace(/\n/g,'<br>');
				}
				e.preventDefault();
				return false;
			});
		}

		document.addEventListener("DOMNodeInserted", function(e){
    		if ( e.target.tagName == "DIV")
    		{
    			var previewCont = e.target.querySelector('div.b-textarea_editor');
    			if ( previewCont )
    			{
					var previewInput = document.createElement('input');
					previewInput.type = 'image';
					previewInput.src = 'http://g2.std3.ru/G/1/F7/FE/28284-441f5b868a323f46a2e3f10cd2fdc028.gif';
					previewInput.setAttribute('style', 'margin-right: 10px;');

					var yarrButton = e.target.querySelector('input.b-comments_reply_block_yarrr');
					$j(previewInput).insertBefore( yarrButton );

					var cancelButton = e.target.querySelector('a.b-comments_reply_block_delete_file');
					if (cancelButton)
					{
						cancelParent = cancelButton.parentNode;
						cancelParent.removeChild( cancelButton );
						cancelParent.appendChild( cancelButton );
						cancelButton.setAttribute('style', 'position: relative;font-size: 13px; margin-left: 15px; right: 0px; top: 0px;');
					}

					$j(previewInput).click( function(e){
					var previewCont = e.target.parentNode.parentNode.parentNode;
					var previewTextArea = previewCont.querySelector('textarea.i-form_text_input');
					if ( previewTextArea && previewCont )
					{
						var previewDiv = previewCont.querySelector('div.sp3previewDiv');
						if ( previewDiv == null )
						{
							previewDiv = document.createElement('div');
							previewDiv.setAttribute('style', 'padding: 5px; margin: 5px 0px 0px 0px !important; border: 1px dashed grey;');
							previewDiv.setAttribute('class', 'comment sp3previewDiv');
							previewCont.appendChild( previewDiv );
						}
						previewDiv.innerHTML = previewTextArea.value.replace(/\n/g,'<br>');
					}
					e.preventDefault();
					return false;
					});
				}
    		}
		});
	},
});
	