// Предпросмотр для комментариев
d3.addModule(
{
	type: "Содержание",
	name: 'Добавлять предпросмотр для инбоксов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:1}},

	run: function()
	{
		var inboxSubminButtonDiv = document.getElementById('js-new_inbox_submit');
		if ( inboxSubminButtonDiv )
		{
    		this.addPreview( inboxSubminButtonDiv );
		}
	},
	addPreview: function( buttonDiv )
	{		
		var previewInput = document.createElement('input');
		previewInput.type = 'image';
		previewInput.setAttribute('name', 'previewButton');
		previewInput.src = 'http://g2.std3.ru/G/1/F7/FE/28284-441f5b868a323f46a2e3f10cd2fdc028.gif';
		previewInput.setAttribute('style', 'margin-left: 50px;');
		buttonDiv.appendChild( previewInput );

		$j(previewInput).click( function(e){
				//$j(commentNode).parent().css("max-height", "");
				//var previewCont = e.target.parentNode.parentNode.parentNode;
				var previewTextArea = document.getElementById('js-new_inbox_body');
				if ( previewTextArea )
				{
					var previewDiv = document.querySelector('div.sp3previewDiv');
					if ( previewDiv == null )
					{
						previewDiv = document.createElement('div');
						previewDiv.setAttribute('style', 'padding: 5px; margin: 5px 0px 0px 0px !important; border: 1px dashed grey;');
						previewDiv.setAttribute('class', 'sp3previewDiv');
						previewTextArea.parentNode.parentNode.appendChild( previewDiv );
					}
					previewDiv.innerHTML = previewTextArea.value.replace(/\n/g,'<br>');
				}
				e.preventDefault();
				return false;
			});
	}
});
	