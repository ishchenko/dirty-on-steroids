// Предпросмотр для комментариев
d3.addModule(
{
	type: "Содержание",
	name: 'Добавлять предпросмотр для комментариев',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:1}},

	run: function()
	{
		var me = this;
		document.addEventListener("DOMNodeInserted", function(e){
			if ( e.target.nodeName == "DIV" && e.target.className.indexOf('b-comments_reply_block') == 0 )
    		{
    			me.addPreview( e.target );
			}
		});

		var commentBox = document.querySelector('div.b-comments_reply_block');
		if ( commentBox )
		{
    		me.addPreview( commentBox );
		}
	},
	addPreview: function( commentNode )
	{
		var addPreviewButton = true;		
		var yarrButton = commentNode.querySelector('input.b-comments_reply_block_yarrr');
		if ( yarrButton.previousSibling != null && yarrButton.previousSibling.nodeName != "INPUT")
		{
			var previewInput = document.createElement('input');
			previewInput.type = 'image';
			previewInput.setAttribute('name', 'previewButton');
			previewInput.src = 'http://g2.std3.ru/G/1/F7/FE/28284-441f5b868a323f46a2e3f10cd2fdc028.gif';
			previewInput.setAttribute('style', 'margin-right: 10px;');
			
			$j(previewInput).insertBefore( yarrButton );

			var cancelButton = commentNode.querySelector('a.b-comments_reply_block_delete_file');
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
	},
});
	