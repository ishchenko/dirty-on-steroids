// Активные ссылки для картинок

/**
 * @todo: во-первых, доделать под фичи сервис-пака, во-вторых, расширение еще не значит картинку, например:
 * http://en.wikipedia.org/wiki/File:8863-Project-Whirlwind-CRMI.JPG
 * По-хорошему надо запрашивать HEAD для ресурса и смотреть возвращаемый mime-тип. И если image/*, тогда переделывать
 * @todo: сделать опцию не подменять линк картинкой, а показывать каринку в попапе.
 */

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
			me.imagesPreview(comment.container);
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

	imagesPreview: function( baseElement )
	{
		var me = this;
		d3.xpath.each('//a', function(a){
			if(a.href.match(/\.(gif|png|jpg|jpeg)$/i))
			{
				if (a.href.match(/(img\.youtube\.com|vimeocdn\.com)/i) == null )
				{
						$j(a).click(
							function(e){
								me.clickOnImageLink(e);
							});
				}
			}
		}, baseElement);
	},
});
	