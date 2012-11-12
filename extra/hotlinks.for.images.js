// Активные ссылки для картинок
d3.addModule(
{
	type: "Содержание",
	name: 'Раскрытие картинок по клику на ссылке',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true}},
	
	run: function()
	{
		var me = this;
		this.imagesPreview( document.body );

		d3.content.onNewComment(function(comment){
			me.imagesPreview(comment);
		});
	},

	clickOnImageLink: function(e)
	{
		var imgPreview = document.createElement('img');
		imgPreview.setAttribute('src', e.target.href );
		var imgLink = document.createElement('a');
		imgLink.setAttribute('href', '#');
		imgLink.setAttribute('onclick', "this.previousSibling.setAttribute('style', this.previousSibling.getAttribute('bkpstyle')); this.parentNode.removeChild(this); return false;");
		imgLink.appendChild( imgPreview );
		e.target.parentNode.insertBefore(imgLink, e.target.nextSibling);
		e.target.setAttribute('bkpstyle', e.target.getAttribute('style'));
		e.target.setAttribute('style', 'display: none');
		e.preventDefault();
		return false;
	},

	imagesPreview: function( baseelement )
	{
		var me = this;
		var allLinksArray = baseelement.getElementsByTagName('a');
		for (var i = 0; i < allLinksArray.length; i++)
		{
			if (allLinksArray[i].href.length > 5)
			{
				addEvent = false;
				linkext3 = allLinksArray[i].href.substr(allLinksArray[i].href.length - 4);
				if (linkext3.search(/\.gif/i) == 0)
				{
					addEvent = true;
				}
				else if (linkext3.search(/\.jpg/i) == 0)
				{
					addEvent = true;
				}
				else if (linkext3.search(/\.png/i) == 0)
				{
					addEvent = true;
				}
				else if (linkext3.search(/jpeg/i) == 0)
				{
					addEvent = true;
				}
				if ( addEvent )
				{
					$j(allLinksArray[i]).click(
					function(e){
						me.clickOnImageLink(e);
					});
				}
			}
		}	
	},
});
	