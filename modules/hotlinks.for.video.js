// Добавляет видео плеер по клику на ссылках и на картинках
d3.addModule(
{
	type: "Содержание",
	name: 'Просмотр видео по клику на ссылке',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:true,caption:'Просмотр видео прямо на сайте',description:'Просмотр видео прямо на сайте, не переходя на youtube'}			
			,bigwindow:{type:'checkbox',value:false,caption:'открывать в большом размере',description:'видео будет открываться в большом окне 1024px иначе 800px'}
			,addimages:{type:'checkbox',value:false,caption:'добавлять превью видео к ссылкам',description:'добавлять автоматически картинку-превью ко всем ссылкам на видео без оной'}
			},

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
			if (allLinksArray[i].href.match(/(youtube\.com|youtu\.be|vimeo\.com|coub\.com)/i))
			{
				if ( this.config.addimages.value )
				{
					this.addImage4VideoLinks(allLinksArray[i]);
				}
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
			videoId = location.protocol + '//www.youtube.com/embed/' + videoId + '?autoplay=1&hd=1&fs=1&start=' + videoTime;
		}
		else if ( thisObject.href.search(/youtu.be/i) > -1 )
		{
			videoId = thisObject.href.slice( thisObject.href.search(/youtu.be/i) + 9 );
			videoId = location.protocol + '//www.youtube.com/embed/' + videoId + '?autoplay=1&hd=1&fs=1';
		}
		else if ( thisObject.href.search(/vimeo.com/i) > -1 )
		{
			videoId = thisObject.href.slice( thisObject.href.search(/vimeo.com/i) + 10 );
			if (!isNaN(parseFloat(videoId)) && isFinite(videoId))
			{
				videoId = location.protocol + '//player.vimeo.com/video/' + videoId + '?autoplay=1';
			}
			else
			{
				videoId = '';
			}
		}

		else if ( thisObject.href.search(/coub.com/i) > -1 )
		{
			videoId = thisObject.href.slice( thisObject.href.search(/view/i) + 5 );
			videoId = location.protocol + '//coub.com/embed/' + videoId + '?muted=false&amp;autostart=true&originalSize=false&hideTopBar=false&noSiteButtons=false&startWithHD=true';
		}

		if ( videoId.length > 0 )
		{
			divCi = thisObject.parentNode;
			do			
			{
				if ( divCi == undefined || divCi == null || divCi.nodeName != "DIV")
				{
					break;
				}
				attrb = divCi.getAttribute("class");
				if ( attrb != null && attrb != undefined )
				{
					if ( attrb.indexOf("c_i") > -1 )
					{
						divCi.setAttribute("class","c_i_bkp");
						
						divToDel = divCi.querySelector("div.b-c_o");
						if ( divToDel )
						{
							divToDel.parentNode.removeChild( divToDel );
						}
						break;
					}
					if ( attrb.indexOf("comment") > -1 )
					{
						break;
					}
				}
				divCi = divCi.parentNode;
			}while( divCi );

			var playerMainDiv = document.createElement('div');
			var newIframeDiv = document.createElement('div');
			var playerWidth = '800px';
			var playerHeight = '470px';
			if ( this.config.bigwindow.value )
			{
				playerWidth = '1024px';
				playerHeight = '600px';
			}

			var newDivToolbar = document.createElement('div');
			$j(newDivToolbar).css('width','100%');
			$j(newDivToolbar).css('font-size','13px');
			$j(newDivToolbar).css('font-face','verdana,tahoma');
			$j(newDivToolbar).css('margin','7px');

			var topToolbar = document.createElement('div');
			$j(topToolbar).css('width', playerWidth );
			$j(topToolbar).css('font-size','13px');
			$j(topToolbar).css('font-face','verdana,tahoma');
			$j(topToolbar).css('margin','7px');
			
			var videoTargetId = 'vi' + (new Date()).getTime().toString();
			thisObject.id = videoTargetId;

			var iframeObj =  document.createElement('iframe');
			$j(iframeObj).css('width',playerWidth);
			$j(iframeObj).css('height',playerHeight);
			iframeObj.frameBorder = '0';
			iframeObj.setAttribute('allowfullscreen', '1');
			iframeObj.class = 'inlineVideo';
			iframeObj.src = videoId;

			// top toolbar
			topToolbar.appendChild( document.createTextNode(' размер видео: '));
			var newA = document.createElement('a');
			newA.href = '#';
			newA.appendChild( document.createTextNode('нормальный'));
			$j(newA).bind('click', function (e) {
				$j(topToolbar).css('width','800px');
				$j(iframeObj).css('width','800px');
				$j(iframeObj).css('height','470px');				
			 	e.preventDefault(); return false; 
			});
			topToolbar.appendChild( newA );
			topToolbar.appendChild( document.createTextNode(' | ') );

			newA = document.createElement('a');
			newA.href = '#';			
			newA.appendChild( document.createTextNode('большой'));
			$j(newA).bind('click', function (e) {
				$j(topToolbar).css('width','1024px');
				$j(iframeObj).css('width','1024px');
				$j(iframeObj).css('height','600px');				
			 	e.preventDefault(); return false; 
			});
			topToolbar.appendChild( newA );

			var newA = document.createElement('a');
			newA.href = '#';
			$j(newA).css('float','right');
			newA.setAttribute('orgObj', videoTargetId );
			newA.appendChild( document.createTextNode('закрыть плеер'));
			$j(newA).bind('click', function (e) { 
				var orgObj = document.getElementById( e.target.getAttribute('orgObj')); 
				orgObj.setAttribute('style', orgObj.getAttribute('bkpstyle')); 
				orgObj.setAttribute('class', orgObj.getAttribute('bkpclass')); 
				playerMainDiv.parentNode.removeChild( playerMainDiv );
				e.preventDefault(); return false;});
			topToolbar.appendChild( newA );

			newA = document.createElement('a');
			newA.href = '#';
			newA.setAttribute('orgObj', videoTargetId );
			newA.appendChild( document.createTextNode('закрыть плеер'));
			$j(newA).bind('click', function (e) { 
				var orgObj = document.getElementById( e.target.getAttribute('orgObj')); 
				orgObj.setAttribute('style', orgObj.getAttribute('bkpstyle')); 
				orgObj.setAttribute('class', orgObj.getAttribute('bkpclass')); 
				playerMainDiv.parentNode.removeChild( playerMainDiv );
				e.preventDefault(); return false;});
			newDivToolbar.appendChild( newA );

			newIframeDiv.appendChild( topToolbar );
			newIframeDiv.appendChild( iframeObj );
			newIframeDiv.appendChild( newDivToolbar );
			playerMainDiv.appendChild( newIframeDiv );
			$j(playerMainDiv).insertAfter( thisObject );

			thisObject.setAttribute('bkpstyle', thisObject.getAttribute('style'));
			thisObject.parentNode.setAttribute('bkpclass', thisObject.parentNode.getAttribute('class'));
			thisObject.parentNode.setAttribute('class', 'dti');
			var outliner = thisObject.parentNode.parentNode.querySelector('div.b-comment_outline');
			if ( outliner )
			{
				outliner.setAttribute('style', 'display: none');
			}
			thisObject.setAttribute('style', 'display: none');
			thisObject.setAttribute('bkpclass', thisObject.getAttribute('class'));
		
			e.preventDefault();
			return false;
		}
	},

	addImage4VideoLinks: function( linkObject )
    {
		videoId = '';
		if (( linkObject.href.search(/youtube.com/i) > -1 ) && ( linkObject.href.search(/v=/i) > -1 ))
        {
            videoTime = 0;
            videoId = linkObject.href.slice(  linkObject.href.search(/v=/i) + 2 );
            if ( videoId.indexOf('&') > 1 )
            {
                videoId = videoId.slice( 0, videoId.indexOf('&'));
            }
            if ( videoId.indexOf('#') > -1 )
            {
                videoId = videoId.slice( 0, videoId.indexOf('#'));
            }            
        }
        else if ( linkObject.href.search(/youtu.be/i) > -1 )
        {
            videoId = linkObject.href.slice( linkObject.href.search(/youtu.be/i) + 9 );
        }
        if ( videoId.length > 0 )
        {
            var insertPreview = true;
            var imgs = linkObject.parentNode.getElementsByTagName('img');
            if ( imgs )
            {
                for ( var cnt =0; cnt < imgs.length; cnt++)
                {
                    if ( imgs[cnt].src.indexOf( videoId ) > -1 )
                    {
                        insertPreview = false;
                        break;
                    }
                }
            }
            if ( insertPreview )
            {
	            if ( linkObject.parentNode.nodeName == "H3")
	            {
	            	insertPreview = false;
	            }
        	}
            if ( insertPreview )
            {
                if ( linkObject.innerHTML.indexOf('<img') > -1 )
                {
                    insertPreview = false;
                }
            }

            if ( insertPreview )
            {
                newImg = document.createElement('img');
                newImg.setAttribute('src',  location.protocol + '//img.youtube.com/vi/' + videoId + '/0.jpg');
                linkObject.appendChild( document.createElement('br'));
                linkObject.appendChild( newImg );
                linkObject.appendChild( document.createElement('br'));
            }
        }
    }    	
});
