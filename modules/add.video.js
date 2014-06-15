// Добавляет функцию видео к коробке комментария
d3.addModule(
{
	type: "Содержание",
	name: 'Добавление видео к комментариям',
	author: 'Stasik0, crea7or',
	config: {active:{type:'checkbox',value:1}},
	youtube_id: "",
	textarea_id: "",
	
	run: function()
	{
		if ( d3.page.postComments || d3.page.inboxComments)
		{
			var me = this;

			var width = 750;
			var height = 320;
	
			document.body.appendChild( d3.newDiv(
			{innerHTML: '<div id="youtube_preview" style="display:none;position:fixed;top:'+((me.viewarea_size().y-height)/2)+'px;left:'+((me.viewarea_size().x-width)/2)+'px;width:'+width+'px;height:'+height+'px;z-index:2999"><table cellspacing="0" cellpadding="0" border="1" width="'+width+'" height="'+height+'" style="background-color: #fff"><tr><td style="font-size:10px;padding:0 10px 15px 0;line-height:16px" align="center" valign="center">'
			+'<div id="youtube_preview_close" style="float: right; background-color: #999; width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div>'
			+'<table><tr><td><div style="font-size:180%;color:#5880af; padding-bottom: 10px;">Youtube preview</div></td><td><div style="float: left";>Картинка в посте</div></td></tr>'
			+'<tr><td><div id="youtube_embed" style="width: 340px; float:left;"></div></td>'
			+'<td><div id="youtube_thumbs"></div></td></tr></table>'
			+'<div id="youtube_time" style="width: 340px; float:left;">Перемотайте на нужное время. Позиция сейчас: 0 cек. Ссылка будет поставлена именно на эту секунду ролика.</div>'
			+'<div id="youtube_yarrr" style="cursor: pointer; float: right; background-image: url(data:image/gif;base64,R0lGODlhNgAUAMQAAPf39ePj4be3tcfHxYCAgHp6eD09PNbW1ZeXlSwsK6enpv7+/l1dXExMSouLiQICAfHx7/T08jAwLvLy8Pb29B4eHBERDyAgHuXl47+/vT8/PuXl5bKysO7u7IiIhujo5iH/C1hNUCBEYXRhWE1QPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS4wLWMwNjAgNjEuMTM0Nzc3LCAyMDEwLzAyLzEyLTE3OjMyOjAwICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1IFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QjZGRkQ2MzZFMTE3MTFFMzk5NkQ4MDg2M0E3QTBGMkMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QjZGRkQ2MzdFMTE3MTFFMzk5NkQ4MDg2M0E3QTBGMkMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpCNkZGRDYzNEUxMTcxMUUzOTk2RDgwODYzQTdBMEYyQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpCNkZGRDYzNUUxMTcxMUUzOTk2RDgwODYzQTdBMEYyQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgH//v38+/r5+Pf29fTz8vHw7+7t7Ovq6ejn5uXk4+Lh4N/e3dzb2tnY19bV1NPS0dDPzs3My8rJyMfGxcTDwsHAv769vLu6ubi3trW0s7KxsK+urayrqqmop6alpKOioaCfnp2cm5qZmJeWlZSTkpGQj46NjIuKiYiHhoWEg4KBgH9+fXx7enl4d3Z1dHNycXBvbm1sa2ppaGdmZWRjYmFgX15dXFtaWVhXVlVUU1JRUE9OTUxLSklIR0ZFRENCQUA/Pj08Ozo5ODc2NTQzMjEwLy4tLCsqKSgnJiUkIyIhIB8eHRwbGhkYFxYVFBMSERAPDg0MCwoJCAcGBQQDAgEAACH5BAAAAAAALAAAAAA2ABQAAAX/4BKMZGmeaKqeixgAcCzPdG3f8ijifO/PAcLrRywChcZkMThUOnHMW+AQOwQoVthhwIUADplBxrsNewGNgRRpO0gaFIjFAWEMIl9JgWH4JvYaeYAwFmo2UTcHFRgKBRGKDBMAAQYCGw+TGpaYlAIBmAAGhjWINhAODQ0RFAgeFpIBmgd9sQIHgbW3MKJrTW0XChETDQwXCJMGDBIKyMrMsQwJzGijNKVtlREBqgga2pUCFyOaAhUj4OYAx708AhIOAQwFcQ8IAQkOHQjLCR4R+wre/VtWiB0OBxw4YBBwhwIHAR8ECAAAYQCHDAJWiUkIgMIAhlDYPBlpTSTJk5NMIKIcycTXSiUjCLhYQbOmTRIEZC7IybOnz59AgwoFuiAEADs=); width: 54px; height: 20px;"></div>'
			+'</td></tr></table></div>'
			}));
	
			$j('#youtube_preview_close').click( function(e) { me.close(); });
			$j('#youtube_yarrr').click( function(e) { me.yarr(); });

			var head = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    		var script1 = document.createElement( 'script' );
	   		script1.type = 'text/javascript';
	    	script1.textContent = 'function vimeoProcessThumb(data)'
					+ '{'
	    			+ '	var id_img = "#vimeo" + data[0].id;'
	    			+ '	var textAreas = document.getElementsByTagName("textarea");'
	    			+ '	if ( textAreas )'
	    			+ '	{'
	    			+ '		for ( var i = 0; i < textAreas.length; i++)'
				    + '		{'
				    + '			var valInd = textAreas[i].value.indexOf( id_img );'
				    + '			if ( valInd > -1 )'
				    + '			{'	
				    + '				var txtValPre = textAreas[i].value.slice(0, valInd );'
				    + '				var txtValPost = textAreas[i].value.slice( valInd + id_img.length, textAreas[i].value.length );'
				    + '				textAreas[i].value = txtValPre + data[0].thumbnail_large + txtValPost;'
				    + '				break;'
				    + '			}'
				    + '		}'
				    + '	}'
					+ '}';
			head.appendChild( script1 );

			var commentBox = document.querySelector('a.b-textarea_editor_image');
			if ( commentBox )
			{
				me.addVideoLink( commentBox );
			}

			$j(document).on('DOMNodeInserted', function (e) {				
			    if ( e.target.nodeName == "A" && e.target.className.indexOf("b-textarea_editor_image") > -1 )
			    {
		    		me.addVideoLink( e.target );
				}
			});
		}
	},

	addVideoLink: function( textareaEditorImage )
	{
		var me = this;
		var videoLink = document.createElement('a');
		videoLink.href = '#';
		videoLink.textContent = 'Video';
		textareaEditorImage.parentNode.appendChild( document.createTextNode(' '));
		textareaEditorImage.parentNode.appendChild( videoLink );
			$j(videoLink).click( function(e)
			{
				me.addVideo( e.target );
				e.preventDefault();
				return false;
			}
		);
		var txtArea = textareaEditorImage.parentNode.parentNode.getElementsByTagName('textarea');					
		if ( txtArea && txtArea.length == 1 )
		{
			if ( txtArea[0].getAttribute('id') == null )
			{
				txtArea[0].setAttribute('id', new Date().getTime());
			}
		}
	},


	viewarea_size: function()
	{
		var y = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight:(document.parentWindow||document.defaultView).innerHeight);
		var x = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth:(document.parentWindow||document.defaultView).innerWidth);
		return {x:x,y:y};
	},

	toggle_div: function(name,param)
	{
		with(document.getElementById(name).style)
			display = (param && param==1 || display=='none')?'block':'none';
	},
	
	close: function()
	{
		var me = this;

 		var script1 = document.createElement( 'script' );
	   	script1.type = 'text/javascript';
	    script1.textContent = "if(interval){window.clearInterval(interval);}";
		document.body.appendChild( script1 );

		$j('#youtube_embed').html("");
		me.toggle_div('youtube_preview',0);
	},

	insertTag: function (startTag, endTag) 
	{
		var me = this;
		var txtarea = document.getElementById( me.textarea_id );

		txtarea.focus();

		var scrtop = txtarea.scrollTop;

		var cursorPos = me.getCursor(txtarea);
		var txt_pre = txtarea.value.substring(0, cursorPos.start);
		var txt_sel = txtarea.value.substring(cursorPos.start, cursorPos.end);
		var txt_aft = txtarea.value.substring(cursorPos.end);

		if (cursorPos.start == cursorPos.end)
		{
			var nuCursorPos = cursorPos.start + startTag.length;
		}
		else
		{
			var nuCursorPos=String(txt_pre + startTag + txt_sel + endTag).length;
		}
		txtarea.value = txt_pre + startTag + txt_sel + endTag + txt_aft;
		me.setCursor(txtarea,nuCursorPos,nuCursorPos);

		if (scrtop) txtarea.scrollTop=scrtop;
	},

	getCursor: function (input) {
		var result = {start: 0, end: 0};
		if (input.setSelectionRange){
			result.start= input.selectionStart;
			result.end = input.selectionEnd;
		} else if (!document.selection) {
			return false;
		} else if (document.selection && document.selection.createRange) {
			var range = document.selection.createRange();
			var stored_range = range.duplicate();
			stored_range.moveToElementText(input);
			stored_range.setEndPoint('EndToEnd', range);
			result.start = stored_range.text.length - range.text.length;
			result.end = result.start + range.text.length;
		}
		return result;
	},

	setCursor: function (txtarea, start, end) {
		if(txtarea.createTextRange) {
			var range = txtarea.createTextRange();
			range.move("character", start);
			range.select();
		} else if(txtarea.selectionStart) {
			txtarea.setSelectionRange(start, end);
		}
	},


 	yarr: function()
 	{
		var me = this;

		var radios = document.getElementsByName('thumb');
		for (var i=0; i < radios.length; i++)
		{
			if (radios[i].checked)
			{
				var val = radios[i].value;
			}
	  	}
		tagpref = '<a href="' + location.protocol + '//www.youtube.com/watch?v='+me.youtube_id+'&t='+d3.window.seconds+'">';
		taginf = '<img src="' + location.protocol + '//img.youtube.com/vi/'+me.youtube_id+'/'+val+'.jpg">';
		tagpost = '</a>';

		if(val == 4)
		{
			me.insertTag( tagpref,tagpost );
		}
		else
		{
			me.insertTag(tagpref+taginf+tagpost,'');
		}
		me.close();
	},

	addVideo: function( target )
	{
		var me = this;

		var url = prompt("Введите URL video с youtube или vimeo", "");
		if ( url == null )
		{
			return false;
		}
		if ( url.match(/(youtube\.com|youtu\.be|vimeo\.com)/i) == -1)
		{
			alert("Поддерживаются только youtube и vimeo видео");
			return false;
		}

		var videoId = me.getVideoId(url);

		var textAreas = target.parentNode.parentNode.getElementsByTagName('textarea');
		if ( textAreas && textAreas.length == 1 && videoId != -1 )
		{
			me.textarea_id = textAreas[0].getAttribute('id');
			var head = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);

			if ( url.search(/vimeo.com/i) > -1)
			{
				var id_img = '#vimeo' + videoId;

				textAreas[0].value += '<a href="' + url + '"><img src="' + id_img + '"></a>';
				
	    		var url2l = location.protocol + '//vimeo.com/api/v2/video/' + videoId + '.json?callback=vimeoProcessThumb';
			    var script2 = document.createElement( 'script' );
		    	script2.type = 'text/javascript';
		    	script2.src = url2l;
		    	head.appendChild( script2 );
			}
			else
			{
				me.youtube_id = videoId;
				var id = videoId;

				var inject = "";
				inject += 'var player; var interval; var seconds = 0; ';
  				inject += 'function onYouTubePlayerReady(playerId) { player=document.getElementById(\'yembed\');';
				inject += ' interval=setInterval(statechange, 250); };';
				inject += 'function statechange(){if(player){seconds = Math.round(player.getCurrentTime()); document.getElementById(\'youtube_time\').innerHTML = "Перемотайте на нужное время. Позиция сейчас: "+seconds+" cек. Ссылка будет поставлена именно на эту секунду ролика.";}}';

			    var script3 = document.createElement( 'script' );
		    	script3.type = 'text/javascript';
		    	script3.textContent = inject;
		    	document.body.appendChild( script3 );

				$j('#youtube_embed').html('<object width="311" height="200" id="yobject"><param name="movie" value="'+location.protocol+'//www.youtube.com/v/'+id+'?enablejsapi=1&playerapiid=player"></param><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><embed id="yembed" src="'+location.protocol+'//www.youtube.com/v/'+id+'?enablejsapi=1&playerapiid=player" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="311" height="200"></embed></object>');
				temp = "<table><tr><td width=\"150\">";
				temp += '<label><input type="radio" name="thumb" value="0" style="position:relative; top: -40px;" checked="checked"/><img src="'+location.protocol+'//img.youtube.com/vi/'+id+'/0.jpg" width="120" height="90"/></label>';
				temp += "</td><td width=\"150\">";
				temp += '<label><input type="radio" name="thumb" value="1" style="position:relative; top: -40px;" /><img src="'+location.protocol+'//img.youtube.com/vi/'+id+'/1.jpg" width="120" height="90"/></label>';
				temp += "</td></tr><tr><td>";
				temp +=  '<label><input type="radio" name="thumb" value="2" style="position:relative; top: -40px;" /><img src="'+location.protocol+'//img.youtube.com/vi/'+id+'/2.jpg" width="120" height="90"/></label>';
				temp +=  "</td><td>";
				temp +=  '<label><input type="radio" name="thumb" value="3" style="position:relative; top: -40px;" /><img src="'+location.protocol+'//img.youtube.com/vi/'+id+'/3.jpg" width="120" height="90"/></label>';
				temp +=  '</td></tr><tr><td colspan="2"><label><input type="radio" name="thumb" value="4" />Без картинки</label></td></tr></table>';
				$j('#youtube_thumbs').html( temp );

				me.toggle_div('youtube_preview',1);
				return false;
			}
		}
	},

	getVideoId: function(url)
	{
		var videoId = -1;
		if (( url.search(/youtube.com/i) > -1 ) && ( url.search(/v=/i) > -1 ))
		{
			videoTime = 0;
			videoId = url.slice(  url.search(/v=/i) + 2 );
			if ( videoId.indexOf('&') > 1 )
			{
				videoId = videoId.slice( 0, videoId.indexOf('&'));
			}
			if ( videoId.indexOf('#') > 1 )
			{
				videoId = videoId.slice( 0, videoId.indexOf('#'));
			}			
		}
		else if ( url.search(/youtu.be/i) > -1 )
		{
			videoId = url.slice( url.search(/youtu.be/i) + 9 );
			if ( videoId.indexOf('&') > 1 )
			{
				videoId = videoId.slice( 0, videoId.indexOf('&'));
			}
			if ( videoId.indexOf('#') > 1 )
			{
				videoId = videoId.slice( 0, videoId.indexOf('#'));
			}			
		}
		else if ( url.search(/vimeo.com/i) > -1 )
		{
			var preVideoId = url.slice( url.search(/vimeo.com/i) + 10 );
			if (!isNaN(parseFloat(preVideoId)) && isFinite(preVideoId))
			{
				videoId = preVideoId;
			}
		}
		return videoId;
	},
});
