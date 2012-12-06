// Добавляет видео плеер по клику на ссылках и на картинках
d3.addModule(
{
	type: "Содержание",
	name: 'Просмотр видео по клику на ссылке',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:1}},

	onPost: function(post) {
		this.setPlayer(post.container.get(0));
	},

	onComment: function(comment) {
		this.setPlayer(comment.container.get(0));
	},

	setPlayer: function( container )
	{
		if(!container.getElementsByTagName) return;
		var me = this;
		var allLinksArray = container.getElementsByTagName('a');
		for (var i = 0; i < allLinksArray.length; i++)
		{
			if (allLinksArray[i].href.match(/(youtube\.com|youtu\.be|vimeo\.com)/i))
			{
				$j(allLinksArray[i]).bind( 'click', function( event ) { me.clickOnVideoLink( event )});
			}
		}
	},

	clickOnVideoLink: function( e )
	{
		var thisObject = e.target;
		if ( thisObject.nodeName != 'A') {
			thisObject = $j(thisObject).parents("a").get(0);
		}
		var videoId;
		if (( thisObject.href.search(/youtube.com/i) > -1 ) && ( thisObject.href.search(/v=/i) > -1 ))
		{
			videoTime = 0;
			videoId = thisObject.href.slice(  thisObject.href.search(/v=/i) + 2 );
			if ( videoId.indexOf('&') > 1 )
			{
				if ( videoId.indexOf('&t=') > -1 )
				{
					videoTime = videoId.slice( videoId.indexOf('&t=') + 3 );
					if ( videoTime.indexOf('&') > -1 )
					{
						videoTime = videoTime.slice( 0, videoTime.indexOf('&'));
					}
				}
				else if ( videoId.indexOf('&start=') > -1 )
				{
					videoTime = videoId.slice( videoId.indexOf('&start=') + 7 );
					if ( videoTime.indexOf('&') > -1 )
					{
						videoTime = videoTime.slice( 0, videoTime.indexOf('&'));
					}
				}
				videoId = videoId.slice( 0, videoId.indexOf('&'));
			}
			videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1&start=' + videoTime;
		}
		else if ( thisObject.href.search(/youtu.be/i) > -1 )
		{
			videoId = thisObject.href.slice( thisObject.href.search(/youtu.be/i) + 9 );
			videoId = 'http://www.youtube.com/embed/' + videoId + '?autoplay=1&fs=1';
		}
		else if ( thisObject.href.search(/vimeo.com/i) > -1 )
		{
			videoId = thisObject.href.slice( thisObject.href.search(/vimeo.com/i) + 10 );
			if (!isNaN(parseFloat(videoId)) && isFinite(videoId))
			{
				videoId = 'http://player.vimeo.com/video/' + videoId + '?autoplay=1';
			}
			else
			{
				videoId = '';
			}
		}

		if ( videoId.length > 0 )
		{			
			var playerMainDiv = document.createElement('div');
			var newIframeDiv = document.createElement('div');
			newIframeDiv.setAttribute('style', 'width: 640px; height: 400px;' );
			var newDivToolbar = document.createElement('div');
			$j(newDivToolbar).css('width','640px');
			
			var videoTargetId = 'vi' + (new Date()).getTime().toString();
			thisObject.id = videoTargetId;

			var iframeObj =  document.createElement('iframe');
			iframeObj.width = '100%';
			iframeObj.height = '100%';
			iframeObj.frameBorder = '0';
			iframeObj.class = 'inlineVideo';
			iframeObj.src = videoId;
	
			newIframeDiv.appendChild( iframeObj );

			newDivToolbar.appendChild( document.createTextNode(' размер видео: '));

			var newA = document.createElement('a');
			newA.href = '#';
			newA.appendChild( document.createTextNode('нормальный'));
			$j(newA).bind('click', function (e) {
				$j(newDivToolbar).css('width','640px');
				e.target.parentNode.nextSibling.setAttribute('style', 'width: 640px; height: 400px;' );
			 	e.preventDefault(); return false; 
			});
			newDivToolbar.appendChild( newA );
			newDivToolbar.appendChild( document.createTextNode(' | ') );

			newA = document.createElement('a');
			newA.href = '#';
			newA.appendChild( document.createTextNode('большой'));
			$j(newA).bind('click', function (e) {
				$j(newDivToolbar).css('width','860px');
				e.target.parentNode.nextSibling.setAttribute('style', 'width: 860px; height: 500px;' );
			 	e.preventDefault(); return false; 
			});
			newDivToolbar.appendChild( newA );


			newA = document.createElement('a');
			$j(newA).css('float','right');
			newA.href = '#';
			newA.setAttribute('orgObj', videoTargetId );
			newA.appendChild( document.createTextNode('закрыть плеер'));
			$j(newA).bind('click', function (e) { var orgObj = document.getElementById( e.target.getAttribute('orgObj')); orgObj.setAttribute('style', orgObj.getAttribute('bkpstyle')); orgObj.setAttribute('class', orgObj.getAttribute('bkpclass')); orgObj.parentNode.removeChild( e.target.parentNode.parentNode ); orgObj.parentNode.setAttribute('class', orgObj.parentNode.getAttribute('bkpclass')); e.preventDefault(); return false;});
			newDivToolbar.appendChild( newA );			

			playerMainDiv.appendChild( newDivToolbar );
			playerMainDiv.appendChild( newIframeDiv );


			$j(playerMainDiv).insertAfter( thisObject );

			thisObject.setAttribute('bkpstyle', thisObject.getAttribute('style'));
			thisObject.parentNode.setAttribute('bkpclass', thisObject.parentNode.getAttribute('class'));
			thisObject.parentNode.setAttribute('class', 'dti');
			thisObject.setAttribute('style', 'display: none');
			thisObject.setAttribute('bkpclass', thisObject.getAttribute('class'));
		
			e.preventDefault();
			return false;
		}
	}
});
