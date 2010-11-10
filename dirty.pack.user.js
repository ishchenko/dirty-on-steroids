//
// ==UserScript==
// @name          Dirty Service Pack 2
// @author        Stasik0, BearOff, crea7or, flashface, slavka123
// @namespace     http://dirty.ru/
// @description   Dirty Service Pack 2
// @require       http://crea7or.spb.ru/scripts/user.js.updater.php?id=88906&days=1
// @include       http://www.dirty.ru/*
// @include       http://dirty.ru/*
// ==/UserScript==

 
/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Funtions and Params


* * * * * * * * * * * * * * * * * * * * * * * * * */


var _$ = { 

	settings: {},
	location: window.location.href.split(window.location.host)[1],

	set_save: function(name,option){

		if(option.toString().indexOf('"')>-1){
			option = option.toString().replace(/"/g,'\\"');
		}

		if(document.cookie.indexOf('dsp.settings=')>-1){
			var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);

			if(param.indexOf(name+':')>0){
			eval("var temp_name = name+':\"'+_$.settings."+name+".split('\"').join('\\\\\"')+'\"';");
				param = param.split(temp_name).join(name+':"'+option+'"');
			}
			else param = param.split('}').join(','+name+':"'+option+'"}');

			document.cookie = "dsp.settings="+escape(param)+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
			eval("_$.settings="+unescape(param));
		}
		else{
			document.cookie = "dsp.settings="+escape('{'+name+':"'+option+'"}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
		}
	},

	set_get: function(){

		if(document.cookie.indexOf('dsp.settings=')>-1){
			var param = unescape(document.cookie.split('dsp.settings=')[1].split(";")[0]);
			eval("_$.settings="+unescape(param));
		}
	},


	browser: function(){

		var string = navigator.userAgent.toLowerCase();
		var params = null;

		if(string.indexOf('opera/')>-1)
			params = {name:'opera',ver:string.split('opera/')[1].split(' ')[0]};

		else if(string.indexOf('firefox/')>-1)
			params = {name:'firefox',ver:string.split('firefox/')[1].split(' ')[0]};

		else if(string.indexOf('chrome/')>-1)
			params = {name:'chrome',ver:string.split('chrome/')[1].split(' ')[0]};

		else if(string.indexOf('safari/')>-1)
			params = {name:'safari',ver:string.split('safari/')[1].split(' ')[0]};

		else if(string.indexOf('msie ')>-1)
			params = {name:'ie',ver:string.split('msie ')[1].split(' ')[0]};

		else params = {name:'unknown',ver:'unknown'};

		return params;
	},

	$: function(id){

		return document.getElementById(id);
	},

	$t: function(name,obj){

		var obj = obj||document;

		return obj.getElementsByTagName(name);
	},

	$c: function(name,obj,tagName){
		if(tagName==null){tagName='*'};
		var obj = obj||document;

		var Array = [];
		var checkArray = obj.getElementsByTagName(tagName);

		for(var i=0; i<checkArray.length; i++){

			if((' '+checkArray[i].className+' ').indexOf(' '+name+' ')>-1){
				Array[Array.length] = checkArray[i];
			}
		}

		return Array;
	},

	$f: function(name,element,val){

		var element = element||false;
		var val = val||false;
		var obj,rtn;

		if(document.forms[name]) obj = document.forms[name];
		else obj = name;

		if(element!==false){

			if(isNaN(element)) el = obj.elements[element];
			else el = obj.elements[parseInt(element)];

			if(val!==false){

				if(el.type) rtn = el.value;
				else rtn = el[el.selectedIndex].value;
			}
			else rtn = el;
		}
		else rtn = obj;

		return rtn;
	},

	toggle_div: function(name,param){

		if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
		else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
	},

	current_scroll: function(){

		var scrollx = (document.scrollX)?document.scrollX:document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft;
		var scrolly = (document.scrollY)?document.scrollY:document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;
		return {x:scrollx,y:scrolly}
	},

	element_position: function(el){

		var x = y = 0;

		if(el.offsetParent){
			x = el.offsetLeft;
			y = el.offsetTop;
			while(el = el.offsetParent){
				x += el.offsetLeft;
				y += el.offsetTop;
			}
		}
		return {x:x,y:y}
	},

	document_size: function(){

		var y = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollHeight:document.documentElement.scrollHeight,_$.viewarea_size().y));
		var x = parseInt(Math.max(document.compatMode!='CSS1Compat'?document.body.scrollWidth:document.documentElement.scrollWidth,_$.viewarea_size().x));
		return {x:x,y:y}
	},

	viewarea_size: function(){

		var y = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientHeight:document.body.clientHeight:(document.parentWindow||document.defaultView).innerHeight);
		var x = parseInt(((document.compatMode||_$.browser().name=='ie')&&!window.opera)?(document.compatMode=='CSS1Compat')?document.documentElement.clientWidth:document.body.clientWidth:(document.parentWindow||document.defaultView).innerWidth);
		return {x:x,y:y}
	},

	scroll_position: function(y,x){

		var x = x||null;
		var y = y||null;

		if(x===null&&y===null){

			y = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;
			x = document.body.scrollTop?document.body.scrollLeft:document.documentElement.scrollLeft;
			return {x:x, y:y}
		}
		else{
			if(y===null){y = document.body.scrollTop?document.body.scrollTop:document.documentElement.scrollTop;};
			if(x===null){x = document.body.scrollTop?document.body.scrollLeft:document.documentElement.scrollLeft;};
			window.scrollTo(x,y);
			//if(y!==null){
			//	if(document.body.scrollTop) document.body.scrollTop = y;
			//	else document.documentElement.scrollTop = y;
			//}

			//if(x!==null){
			//	if(document.body.scrollLeft) document.body.scrollLeft = x;
			//	else document.documentElement.scrollLeft = x;
			//}
		}
	},

	ajaxLoad: function(url,ajaxCallBackFunction,callObject,params,ajaxCallBackErrorFunction){

		if(window.XMLHttpRequest){
			var ajaxObject = new XMLHttpRequest();
			ajaxObject.onreadystatechange = function(){
				_$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
			};
			ajaxObject.open('GET',url,true);
			ajaxObject.send(null);
		}
		else if (window.ActiveXObject){
			var ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');
			if (ajaxObject){
				ajaxObject.onreadystatechange = function(){
					_$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
				};
				ajaxObject.open('GET',url,true);
				ajaxObject.send();
			}
		}
	},

	ajaxLoadPost: function(url, data, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction) {

		var ajaxObject = null;
	
		if(window.XMLHttpRequest) ajaxObject = new XMLHttpRequest();
		else if(window.ActiveXObject) ajaxObject = new ActiveXObject('Microsoft.XMLHTTP');

		if(ajaxObject){

			ajaxObject.onreadystatechange = function(){
				_$.ajaxLoadHandler(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction);
			};
			ajaxObject.open('POST',url,true);
			ajaxObject.setRequestHeader('Content-type','application/x-www-form-urlencoded');
			ajaxObject.setRequestHeader('Content-length',data.length);
			ajaxObject.setRequestHeader('Connection','close');
			ajaxObject.send(data);	
		};
	},

	ajaxLoadHandler: function(ajaxObject, ajaxCallBackFunction, callObject, params, ajaxCallBackErrorFunction){

		if(ajaxObject.readyState==4){
			if(ajaxObject.status==200) ajaxCallBackFunction.call(callObject, ajaxObject, params);
			else{
				if(ajaxCallBackErrorFunction) ajaxCallBackErrorFunction.call(callObject, ajaxObject);	
//				else alert('There was a problem retrieving the XML data:\n'+ajaxObject.statusText);
			}
		}
	},

	addEvent: function(obj,sEvent,sFunc){
		if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
		else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
	},

	removeEvent: function(obj,sEvent,sFunc){
		if(obj.removeEventListener) obj.removeEventListener(sEvent,sFunc,false);
		else if(obj.detachEvent) obj.detachEvent('on'+sEvent,sFunc);
	},

	addCSS: function(cssStr){
		var head = _$.$t('head')[0];
		var styleSheets = head.getElementsByTagName('style');
		var styleSheet = null;
		if(styleSheets.length) styleSheet = styleSheets[styleSheets.length-1];
		else{
			styleSheet = document.createElement('style');
			styleSheet.type = 'text/css';
			head.appendChild(styleSheet);
		}
	
		if(styleSheet.styleSheet) styleSheet.styleSheet.cssText += cssStr;
		else styleSheet.appendChild(document.createTextNode(cssStr));
	},

	js_include: function(script){

		var new_js = document.createElement('script');
		new_js.setAttribute('type','text/javascript');
		new_js.setAttribute('src',script);
		document.getElementsByTagName('head')[0].appendChild(new_js);
	},

	event: function(e){

		e = e||window.event;

		if(e.pageX==null&&e.clientX!=null){
			var html = document.documentElement;
			var body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		}

		if(!e.which&&e.button) e.which = e.button&1?1:(e.button&2?3:(e.button&4?2:0));

		return e;
	},
	
	injectScript: function(source){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.textContent = source;
		_$.$t('head')[0].appendChild(inject);
	},
	
	injectScriptUrl: function(url){
		var inject = document.createElement("script");
		inject.setAttribute("type", "text/javascript");
		inject.setAttribute("src", url);
		_$.$t('head')[0].appendChild(inject);
	},
	
	insertAfter: function (referenceNode, node) {
		referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
	},
	
	getElementsByClassName: function(className, parentElement, tagName) {
		if(tagName==null){tagName='*'};
		if(parentElement==null){parentElement = document.body;}
		var children = parentElement.getElementsByTagName(tagName);
		var elements = [], child;
		for (var i = 0, length = children.length; i < length; i++) {
			child = children[i];
			if (child.className == className || child.className.indexOf(className+" ") > -1 || child.className.indexOf(className+" ") < -1)
				elements.push(child);
		}
		return elements;
	},
	
	$n: function(element){
		return document.getElementsByName(element);
	},
	
	getUsername: function(){
		elem = _$.$c('header_tagline_inner');
		if(elem.length == 1){
			var raw = elem[0].innerHTML.match(/\/users\/[0-9]+">(.*)<\/a>/g);
			if(raw != null){
				return raw[0].split('>')[1].split('<')[0];
			}
		}
		return "";
	},
	
	getNumber: function(){
		elem = _$.$c('header_tagline_inner');
		if(elem.length == 1){
			var raw = elem[0].innerHTML.split('dirty.ru/users/')[1].split('"')[0];
			return raw;
		}
		return "";
	},
	
	fireEvent: function(element,event){
		if (document.createEventObject){
			// dispatch for IE
			var evt = document.createEventObject();
			return element.fireEvent('on'+event,evt)
		}else{
			// dispatch for firefox + others
			var evt = document.createEvent("MouseEvents");
			evt.initEvent(event, true, true ); // event type,bubbling,cancelable
			return !element.dispatchEvent(evt);
		}
	}
		
	//,
	//setInnerText: function(element, text){
	//	var hasInnerText = (_$.$t('body')[0].innerText != undefined) ? true : false;
	//	if(!hasInnerText){
	//		element.textContent = text;
	//	} else{
	//		element.innerText = text;
	//	}
	//}
}

//BEGIN CONFIG
_$.set_get();

if(!_$.settings.use_pictures) _$.set_save('use_pictures',1);
if(!_$.settings.username_replace) _$.set_save('username_replace',0);
if(!_$.settings.posts_average) _$.set_save('posts_average',0);
if(!_$.settings.youtube_fullscreen) _$.set_save('youtube_fullscreen',1);
if(!_$.settings.tooltip_on) _$.set_save('tooltip_on',1);
if(!_$.settings.tooltip_show_self) _$.set_save('tooltip_show_self',1);
if(!_$.settings.favicon_on){_$.set_save('favicon_on',1);_$.set_save('favicon_style',0);}
if(!_$.settings.colors_on) _$.set_save('colors_on',0);
if(!_$.settings.colors_border) _$.set_save('colors_border',1);
if(!_$.settings.colors){_$.set_save('colors','[]');}
//SP2 adding scripts - STEP ONE
if(!_$.settings.inbox_text){_$.set_save('inbox_text',1);}
if(!_$.settings.arrows_on){_$.set_save('arrows_on',1);}
if(!_$.settings.inbox_recreate){_$.set_save('inbox_recreate',1);}
if(!_$.settings.user_stats){_$.set_save('user_stats',1);}
if(!_$.settings.ban_encoding){_$.set_save('ban_encoding',1);}
if(!_$.settings.links_test){_$.set_save('links_test',1);}
if(!_$.settings.d3search){_$.set_save('d3search',1);}
if(!_$.settings.karma_log){_$.set_save('karma_log',1);}
if(!_$.settings.youtube_preview){_$.set_save('youtube_preview',1);}
if(!_$.settings.read_button){_$.set_save('read_button',1);}
if(!_$.settings.comment_scroller){_$.set_save('comment_scroller',1);}
if(!_$.settings.smooth_scroll){
	if(_$.browser().name == "chrome"){
		_$.set_save('smooth_scroll',0);
	}else{
		_$.set_save('smooth_scroll',1);
	}
}
if(!_$.settings.dirty_tags){_$.set_save('dirty_tags',1);}
if(!_$.settings.comment_threshold){_$.set_save('comment_threshold',1);}
if(!_$.settings.post_threshold){_$.set_save('post_threshold',1);}
if(!_$.settings.post_content_filter_layout){_$.set_save('post_content_filter_layout',0);}
if(!_$.settings.post_threshold_use_or){_$.set_save('post_threshold_use_or',0);}
if(!_$.settings.allow_reverse_list){_$.set_save('allow_reverse_list',1);}

if(!_$.settings.own_threshold){_$.set_save('own_threshold',0);}
if(!_$.settings.new_window){_$.set_save('new_window',1);}

if(!_$.settings.quotes){_$.set_save('quotes',1);}
//END CONFIG

if(_$.location.indexOf('/off/')!=0){

	var dsp_general_bar = '';
	var dsp_general_param = '';
	var dsp_check_change_pictures = 1;
	if(_$.getUsername()!=""){
		var dsp_self_name = _$.getUsername();
		var dsp_self_num = _$.getNumber();
	}else{
		var dsp_self_name = "%username%";
		var dsp_self_num = 0;
	}

	function DSP_make_General_Bar(){

		var dsp_output = dsp_bars = dsp_params = '';
		var dsp_left_panel = _$.$c('left_col_nav')[0];

		for(var i=0; i<6; i++){
			dsp_bars += '<div id="dsp_setting_button_'+i+'" style="background-color:#edf1f6;width:140px;height:30px;line-height:30px;border-top:1px solid #edf1f6;border-right:1px solid #b6b6b6">&nbsp;</div>';
			dsp_params += '<div id="dsp_setting_'+i+'" style="padding:10px 0 0 10px;display:none;border-top:1px solid #b6b6b6"></div>';
		}

		dsp_output += '<br><div style="background: #fff url(http://pit.dirty.ru/dirty/1/2010/04/27/11119-033725-660249a537b6f5822a9918ea8835026b.png) 7px 4px no-repeat;height:50px;border-top:1px solid #e9e9e9;border-bottom:1px solid #e9e9e9"><a id="dsp_setting_bar" style="cursor:pointer;text-decoration:underline;line-height:50px;margin-left:62px">Настройки</a></div>';
		dsp_output += '<div id="_$.settings" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-300)/2)+'px;left:'+((_$.viewarea_size().x-500)/2)+'px;width:500px;height:300px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="500" height="300"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
		dsp_output += '<table cellspacing="0" cellpadding="0" width="100%" border="0" style="font-size: 110%;"><tr><td valign="top" colspan="1" height="30" style="font-size:140%;color:#5880af;"><a href="http://userscripts.org/scripts/show/88906">Service Pack 2</a></td><td valign="top" colspan="1" height="30" style="padding-left:5px; font-size:170%;color:#5880af;"></td><td width="40" align="right" valign="top"><div id="dsp_setting_close" style="background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div></td></tr><tr><td valign="top" width="140" style="">'+dsp_bars+'</td><td colspan="2" valign="top">'+dsp_params+'</td></tr></table>';
		dsp_output += '</td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table></div>';

		dsp_left_panel.innerHTML += dsp_output;

		_$.addEvent(_$.$('dsp_setting_bar'),'click',DSP_make_content_settings);
		_$.addEvent(_$.$('dsp_setting_close'),'click',function(){DSP_show_hide_window('_$.settings')});
		dsp_general_bar = _$.$('dsp_settings_panels');
		dsp_general_param = _$.$('dsp_settings_props');
	}



	function DSP_make_Setting_Bar(title,params,init){

		var dsp_setting_id = 0;

		while(dsp_setting_id<6){
			if(_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML.length<10) break;
			else dsp_setting_id++;
		}

		_$.$('dsp_setting_button_'+dsp_setting_id).style.borderTop = '1px solid #b6b6b6';
		_$.$('dsp_setting_button_'+dsp_setting_id).innerHTML += '<span style="margin-left:10px;cursor:pointer" id="dsp_setting_link_'+dsp_setting_id+'">'+title+'</span>';
		_$.$('dsp_setting_'+dsp_setting_id).innerHTML += params;
		eval(init);

		_$.$('dsp_setting_button_'+dsp_setting_id).style.cursor="pointer";
		_$.addEvent(_$.$('dsp_setting_button_'+dsp_setting_id),'click',function(){DSP_show_hide_setting(dsp_setting_id)});
	}

	function DSP_show_hide_window(name){
		var dsp_layer = _$.$(name);
		//dirty hack for opera
		if(dsp_layer.style.display=='block'){
			dsp_layer.style.display ="none";
			if(_$.browser().name=='opera'){
				var x = _$.current_scroll().x;
				var y = _$.current_scroll().y;
				_$.scroll_position(y+1, x);
				_$.scroll_position(y, x);
			}
		}else{
			dsp_layer.style.display ="block";
		}
	}
	
	function DSP_show_hide_menu(name){

		var dsp_layer = _$.$(name);

		if(dsp_layer.style.display=='block') dsp_layer.style.display = 'none';
		else dsp_layer.style.display = 'block';
	}


	function DSP_show_hide_setting(num){

		var dsp_setting_id = 0;

		while(dsp_setting_id<6){

			if(_$.$('dsp_setting_'+dsp_setting_id).style.display=='block'){
				_$.toggle_div('dsp_setting_'+dsp_setting_id,0);
				_$.$('dsp_setting_button_'+dsp_setting_id).style.borderRight = '1px solid #b6b6b6';
				_$.$('dsp_setting_button_'+dsp_setting_id).style.backgroundColor = '#edf1f6';
				_$.$('dsp_setting_button_'+dsp_setting_id).style.fontWeight = 'normal';

				if(dsp_setting_id<5){

					if(_$.$('dsp_setting_button_'+(dsp_setting_id+1)).innerHTML=='&nbsp;'){
						_$.$('dsp_setting_button_'+(dsp_setting_id+1)).style.borderTop = '1px solid #edf1f6';
					}
					else{
						_$.$('dsp_setting_button_'+(dsp_setting_id+1)).style.borderTop = '1px solid #b6b6b6';
					}
				}
			}
			dsp_setting_id++;
		}

		_$.toggle_div('dsp_setting_'+num,1);
		_$.$('dsp_setting_button_'+num).style.borderRight = '1px solid #fff';
		_$.$('dsp_setting_button_'+num).style.backgroundColor = '#fff';
		_$.$('dsp_setting_button_'+num).style.fontWeight = 'bold';

		if(num<5) _$.$('dsp_setting_button_'+(num+1)).style.borderTop = '1px solid #b6b6b6';
	}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Favicons


* * * * * * * * * * * * * * * * * * * * * * * * * */


	function DSP_show_favicon(obj,show){
	if(show==1){
			var favicon = 'http://favicon.yandex.net/favicon/'+obj.toString().split('/')[2];
			obj.style.paddingTop='16px';
			obj.style.backgroundImage = 'url('+favicon+')';//,url(http://pit.dirty.ru/dirty/1/2010/10/31/28281-154853-236c6922bc86581a4d9fbf18719fb16b.png)';
			obj.style.backgroundRepeat = 'no-repeat';//, no-repeat';
		}
		else obj.style.backgroundImage = 'none';
	}


	
/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Username Replace


* * * * * * * * * * * * * * * * * * * * * * * * * */

function DSP_replace_username(option){

	var dsp_content_nodes = _$.$c('dt',_$.$('main'));
	var dsp_first = '%username%';
	var dsp_second = dsp_self_name;

	if(option==0){
		dsp_first = dsp_self_name;
		dsp_second = '%username%';
	}

	for(var i=0; i<dsp_content_nodes.length; i++){
		if(dsp_content_nodes[i].innerHTML.indexOf(dsp_first)>-1){
			dsp_content_nodes[i].innerHTML = dsp_content_nodes[i].innerHTML.split(dsp_first).join(dsp_second);
		}
	}
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Color Picker + User Skiper


* * * * * * * * * * * * * * * * * * * * * * * * * */

var dsp_all_comments;
var dsp_color_user = '';

function DSP_paint_comment(name,color,font){

	if(color!='transparent'){
		color = '#'+color;
		font = '#'+font;
	}

	for(var i=0;i<dsp_all_comments.length;i++){

		if(_$.$t('a',dsp_all_comments[i])[1].innerHTML.toString()==name.toString()){

			if(color.toLowerCase()!='#ffffff'){
				dsp_all_comments[i].parentNode.style.backgroundColor = color;
				dsp_all_comments[i].parentNode.style.color = font;
				dsp_all_comments[i].style.color = font;

				if(color!='transparent') var link_color = (font=='#fff')?'#e3e3e3':'#393939';
				else var link_color = '';

				var div_links = _$.$t('a',dsp_all_comments[i].parentNode.parentNode);

				for(var j=0; j<div_links.length; j++){

					div_links[j].style.color = link_color;
				}

				_$.$t('span',_$.$t('span',dsp_all_comments[i])[0])[0].style.display = (color=='transparent')?'none':'inline';
			}
		}

		if(_$.settings.colors_border=='1'){

			if(dsp_all_comments[i].parentNode.parentNode.className.indexOf(' new ')>0){
				dsp_all_comments[i].parentNode.style.border = '1px solid red';
			}
		}
	}
}

function DSP_color_remove(obj){

	var user = _$.$t('a',obj.parentNode.parentNode.parentNode)[1].innerHTML;

	eval('var temp_array='+_$.settings.colors);

	for(var i=0; i<temp_array.length; i++){
		if(temp_array[i].indexOf(user+',')>-1){
			delete temp_array[i];
		}
	}

	_$.set_save('colors','["'+temp_array.join('","')+'"]');
	DSP_paint_comment(user,'transparent','');
}

function DSP_save_color(){

	var color = dsp_color_user.title.split('#').join('');
	var user = _$.$t('a',dsp_color_user.parentNode.parentNode)[1].innerHTML;
	var font = dsp_color_user.name;
	var checker = 0;

	eval('var temp_array='+_$.settings.colors);

	for(var i=0; i<temp_array.length; i++){
		if(temp_array[i].indexOf(user+',')>-1){

			temp_array[i] = user+','+color+','+font;
			checker = 1;
			break;
		}
	}

	if(checker==0) temp_array.push(user+','+color+','+font);

	_$.set_save('colors','["'+temp_array.join('","')+'"]');
}

var dsp_jscolor = {

	bindClass : 'dsp_color',
	binding : true,


	init : function() {
		if(dsp_jscolor.binding) {
			dsp_jscolor.bind();
		}
	},

	bind : function() {
		var matchClass = new RegExp('(^|\\s)('+dsp_jscolor.bindClass+')\\s*(\\{[^}]*\\})?', 'i');
		var el = _$.$t('a');
		for(var i=0; i<el.length; i+=1) {
			var m;
			if(!el[i].color && el[i].className && (m = el[i].className.match(matchClass))){
				var prop = {};
				if(m[3]) {
					try {
						eval('prop='+m[3]);
					} catch(eInvalidProp) {}
				}
				el[i].color = new dsp_jscolor.color(el[i], prop);
			}
		}
	},


	preload : function() {
		for(var fn in dsp_jscolor.imgRequire) {
			if(dsp_jscolor.imgRequire.hasOwnProperty(fn)) {
				dsp_jscolor.loadImage(fn);
			}
		}
	},


	images : {
		pad : [ 181, 101 ],
		sld : [ 16, 101 ],
		cross : [ 15, 15 ],
		arrow : [ 7, 11 ]
	},


	imgRequire : {},
	imgLoaded : {},


	requireImage : function(filename) {
		dsp_jscolor.imgRequire[filename] = true;
	},


	loadImage : function(filename) {
		if(!dsp_jscolor.imgLoaded[filename]) {
			dsp_jscolor.imgLoaded[filename] = new Image();
			dsp_jscolor.imgLoaded[filename].src = filename;
		}
	},


	fetchElement : function(mixed) {
		return typeof mixed === 'string' ? _$.$(mixed) : mixed;
	},


	fireEvent : function(el, evnt) {
		if(!el) {
			return;
		}
		if(document.createEventObject) {
			var ev = document.createEventObject();
			el.fireEvent('on'+evnt, ev);
		} else if(document.createEvent) {
			var ev = document.createEvent('HTMLEvents');
			ev.initEvent(evnt, true, true);
			el.dispatchEvent(ev);
		} else if(el['on'+evnt]) {
			el['on'+evnt]();
		}
	},


	dsp_getElementPos : function(obj) {
		var e1=obj, e2=obj;
		var x=0, y=0;
		if(e1.offsetParent){
			do{
				x += e1.offsetLeft;
				y += e1.offsetTop;
			} while(e1 = e1.offsetParent);
		}
		while((e2 = e2.parentNode) && e2.nodeName.toUpperCase() !== 'BODY') {
			x -= e2.scrollLeft;
			y -= e2.scrollTop;
		}
		return [x, y];
	},


	getElementSize : function(el) {
		return [el.offsetWidth, el.offsetHeight];
	},


	getMousePos : function(e){
		if(!e) {e = window.event;}
		if(typeof e.pageX === 'number') {
			return [e.pageX, e.pageY];
		} else if(typeof e.clientX === 'number') {
			return [
				e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft,
				e.clientY + document.body.scrollTop + document.documentElement.scrollTop
			];
		}
	},


	getViewPos : function(){
		if(typeof window.pageYOffset === 'number') {
			return [window.pageXOffset, window.pageYOffset];
		} else if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
			return [document.body.scrollLeft, document.body.scrollTop];
		} else if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
			return [document.documentElement.scrollLeft, document.documentElement.scrollTop];
		} else {
			return [0, 0];
		}
	},


	getViewSize : function() {
		if(typeof window.innerWidth === 'number') {
			return [window.innerWidth, window.innerHeight];
		} else if(document.body && (document.body.clientWidth || document.body.clientHeight)) {
			return [document.body.clientWidth, document.body.clientHeight];
		} else if(document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			return [document.documentElement.clientWidth, document.documentElement.clientHeight];
		} else {
			return [0, 0];
		}
	},



	color : function(otarget, prop) {

		this.required = true;
		this.adjust = true;
		this.hash = false;
		this.caps = true;
		this.valueElement = otarget;
		this.styleElement = otarget;
		this.hsv = [0,0,1];
		this.rgb = [1,1,1];

		this.pickerOnfocus = true;
		this.pickerPosition = 'bottom';
		this.pickerFace = 10;
		this.pickerBorder = 0;
		this.pickerInset = 0;


		for(var p in prop) {
			if(prop.hasOwnProperty(p)) {
				this[p] = prop[p];
			}
		}

		this.showPicker = function(){
			if(!isPickerOwner()) {

				var tp = dsp_jscolor.dsp_getElementPos(otarget);
				var ts = dsp_jscolor.getElementSize(otarget);
				var vp = dsp_jscolor.getViewPos();
				var vs = dsp_jscolor.getViewSize();
				var ps = [
					2*this.pickerBorder + 4*this.pickerInset + 2*this.pickerFace + dsp_jscolor.images.pad[0] + 2*dsp_jscolor.images.arrow[0] + dsp_jscolor.images.sld[0],
					2*this.pickerBorder + 2*this.pickerInset + 2*this.pickerFace + dsp_jscolor.images.pad[1]
				];
				var a, b, c;
				switch(this.pickerPosition.toLowerCase()) {
					case 'left':a=1;b=0;c=-1;break;
					case 'right':a=1;b=0;c=1;break;
					case 'top':a=0;b=1;c=-1;break;
					default:a=0;b=1;c=1;break;
				}
				var l = (ts[b]+ps[b])/2;
				var pp = [
					-vp[a]+tp[a]+ps[a] > vs[a] ?
						(-vp[a]+tp[a]+ts[a]/2 > vs[a]/2 && tp[a]+ts[a]-ps[a] >= 0 ? tp[a]+ts[a]-ps[a] : tp[a]) :
						tp[a],
					-vp[b]+tp[b]+ts[b]+ps[b]-l+l*c > vs[b] ?
						(-vp[b]+tp[b]+ts[b]/2 > vs[b]/2 && tp[b]+ts[b]-l-l*c >= 0 ? tp[b]+ts[b]-l-l*c : tp[b]+ts[b]-l+l*c) :
						(tp[b]+ts[b]-l+l*c >= 0 ? tp[b]+ts[b]-l+l*c : tp[b]+ts[b]-l-l*c)
				];

				drawPicker(pp[a]-28, pp[b]+26);

			}
		};


		this.exportColor = function(flags){
			if(!(flags & leaveValue) && valueElement){
				var temp_font = 0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? 'fff':'000';

				var value = this.toString();
				if(this.caps) value = value.toUpperCase();
				valueElement.title = value;
				valueElement.name = temp_font;

			}
			if(!(flags & leaveStyle) && styleElement) {
				var temp_font = 0.213 * this.rgb[0] +
					0.715 * this.rgb[1] +
					0.072 * this.rgb[2]
					< 0.5 ? 'fff':'000';

				var temp_color = this.toString().split('#').join();

				DSP_paint_comment(otarget.parentNode.parentNode.getElementsByTagName('a')[1].innerHTML,temp_color,temp_font);
			}

			if(!(flags & leavePad) && isPickerOwner()) {
				redrawPad();
			}
			if(!(flags & leaveSld) && isPickerOwner()) {
				redrawSld();
			}
		};


		this.fromHSV = function(h, s, v, flags) {
			h<0 && (h=0) || h>6 && (h=6);
			s<0 && (s=0) || s>1 && (s=1);
			v<0 && (v=0) || v>1 && (v=1);
			this.rgb = HSV_RGB(
				h===null ? this.hsv[0] : (this.hsv[0]=h),
				s===null ? this.hsv[1] : (this.hsv[1]=s),
				v===null ? this.hsv[2] : (this.hsv[2]=v)
			);
			this.exportColor(flags);
		};


		this.fromRGB = function(r, g, b, flags) {
			r<0 && (r=0) || r>1 && (r=1);
			g<0 && (g=0) || g>1 && (g=1);
			b<0 && (b=0) || b>1 && (b=1);
			var hsv = RGB_HSV(
				r===null ? this.rgb[0] : (this.rgb[0]=r),
				g===null ? this.rgb[1] : (this.rgb[1]=g),
				b===null ? this.rgb[2] : (this.rgb[2]=b)
			);
			if(hsv[0] !== null) {
				this.hsv[0] = hsv[0];
			}
			if(hsv[2] !== 0) {
				this.hsv[1] = hsv[1];
			}
			this.hsv[2] = hsv[2];
			this.exportColor(flags);
		};


		this.fromString = function(hex, flags) {
			var m = hex.match(/^\W*([0-9A-F]{3}([0-9A-F]{3})?)\W*$/i);
			if(!m) {
				return false;
			} else {
				if(m[1].length === 6) {
					this.fromRGB(
						parseInt(m[1].substr(0,2),16) / 255,
						parseInt(m[1].substr(2,2),16) / 255,
						parseInt(m[1].substr(4,2),16) / 255,
						flags
					);
				} else {
					this.fromRGB(
						parseInt(m[1].charAt(0)+m[1].charAt(0),16) / 255,
						parseInt(m[1].charAt(1)+m[1].charAt(1),16) / 255,
						parseInt(m[1].charAt(2)+m[1].charAt(2),16) / 255,
						flags
					);
				}
				return true;
			}
		};


		this.toString = function() {
			return (
				(0x100 | Math.round(255*this.rgb[0])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[1])).toString(16).substr(1) +
				(0x100 | Math.round(255*this.rgb[2])).toString(16).substr(1)
			);
		};


		function RGB_HSV(r,g,b){
			var n = Math.min(Math.min(r,g),b);
			var v = Math.max(Math.max(r,g),b);
			var m = v - n;
			if(m === 0) {return [ null, 0, v ];}
			var h = r===n ? 3+(b-g)/m : (g===n ? 5+(r-b)/m : 1+(g-r)/m);
			return [ h===6?0:h, m/v, v ];
		}


		function HSV_RGB(h,s,v){
			if(h === null) {return [ v, v, v ];}
			var i = Math.floor(h);
			var f = i%2 ? h-i : 1-(h-i);
			var m = v * (1 - s);
			var n = v * (1 - s*f);
			switch(i) {
				case 6:
				case 0:return [v,n,m];
				case 1:return [n,v,m];
				case 2:return [m,v,n];
				case 3:return [m,n,v];
				case 4:return [n,m,v];
				case 5:return [v,m,n];
			}
		}


		function removePicker(){
			DSP_save_color();
			document.getElementsByTagName('body')[0].removeChild(dsp_jscolor.picker.boxB);
			_$.$("dsp_color_show_div").style.display = 'none';
			delete dsp_jscolor.picker;
		}


		function drawPicker(x,y){
			var dsp_color = _$.$("dsp_color_show_div");
			if(!dsp_color){
				document.body.appendChild(dsp_color = document.createElement('div'));
				dsp_color.id = 'dsp_color_show_div';
				dsp_color.style.position = 'absolute';
				dsp_color.style.zIndex = 1399;
				dsp_color.innerHTML = '<table cellspacing="0" cellpadding="0" width="282" height="160" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';

				dsp_color.appendChild(dsp_closer = document.createElement('div'));
				dsp_closer.id = 'dsp_color_closer';
				dsp_closer.style.backgroundColor = '#999';
				dsp_closer.style.position = 'absolute';
				dsp_closer.style.width = '20px';
				dsp_closer.style.height = '20px';
				dsp_closer.style.fontSize = '12px';
				dsp_closer.style.lineHeight = '18px';
				dsp_closer.style.textAlign = 'center';
				dsp_closer.style.color = '#fff';
				dsp_closer.style.cursor = 'pointer';
				dsp_closer.style.zIndex = 1400;
				dsp_closer.style.left = '237px';
				dsp_closer.style.top = '30px';
				dsp_closer.innerHTML = '<b>x</b>';
				_$.addEvent(dsp_closer,'click',function(){removePicker();});
			}

			dsp_color.style.left = (x-5)+'px';
			dsp_color.style.top = (y-20)+'px';
			dsp_color.style.display = 'block';



			if(!dsp_jscolor.picker){

				dsp_jscolor.picker = {
					box : document.createElement('div'),
					boxB : document.createElement('div'),
					pad : document.createElement('div'),
					padB : document.createElement('div'),
					padM : document.createElement('div'),
					sld : document.createElement('div'),
					sldB : document.createElement('div'),
					sldM : document.createElement('div')
				};
				for(var i=0,segSize=4; i<dsp_jscolor.images.sld[1]; i+=segSize) {
					var seg = document.createElement('div');
					seg.style.height = segSize+'px';
					seg.style.fontSize = '1px';
					seg.style.lineHeight = '0';
					dsp_jscolor.picker.sld.appendChild(seg);
				}
				dsp_jscolor.picker.sldB.appendChild(dsp_jscolor.picker.sld);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.sldB);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.sldM);
				dsp_jscolor.picker.padB.appendChild(dsp_jscolor.picker.pad);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.padB);
				dsp_jscolor.picker.box.appendChild(dsp_jscolor.picker.padM);
				dsp_jscolor.picker.boxB.appendChild(dsp_jscolor.picker.box);
			}



			var p = dsp_jscolor.picker;

			posPad = [
				x+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset,
				y+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset ];
			posSld = [
				null,
				y+DSP_this.pickerBorder+DSP_this.pickerFace+DSP_this.pickerInset ];

			_$.addEvent(p.box,'mouseout',function() {otarget.focus();});
			_$.addEvent(p.box,'click',function(e) {holdPad && setPad(e);holdSld && setSld(e);});
			_$.addEvent(p.padM,'mouseout',function() {if(holdPad) {holdPad=false;dsp_jscolor.fireEvent(valueElement,'change');}});
			_$.addEvent(p.padM,'click',function(e) {holdPad=true;setPad(e);});
			_$.addEvent(p.sldM,'mouseout',function() {if(holdSld) {holdSld=false;dsp_jscolor.fireEvent(valueElement,'change');}});
			_$.addEvent(p.sldM,'click',function(e) {holdSld=true;setSld(e);});

			p.box.style.width = 4*DSP_this.pickerInset + 2*DSP_this.pickerFace + dsp_jscolor.images.pad[0] + 2*dsp_jscolor.images.arrow[0] + dsp_jscolor.images.sld[0] + 'px';
			p.box.style.height = 2*DSP_this.pickerInset + 2*DSP_this.pickerFace + dsp_jscolor.images.pad[1] + 'px';

			p.boxB.style.position = 'absolute';
			p.boxB.style.clear = 'both';
			p.boxB.style.left = x+'px';
			p.boxB.style.top = y+'px';
			p.boxB.style.zIndex = 1400;
			p.boxB.style.border = DSP_this.pickerBorder+'px solid';

			p.pad.style.width = dsp_jscolor.images.pad[0]+'px';
			p.pad.style.height = dsp_jscolor.images.pad[1]+'px';

			p.padB.style.position = 'absolute';
			p.padB.style.left = DSP_this.pickerFace+'px';
			p.padB.style.top = DSP_this.pickerFace+'px';
			p.padB.style.border = DSP_this.pickerInset+'px solid';

			p.padM.style.position = 'absolute';
			p.padM.style.left = '0';
			p.padM.style.top = '0';
			p.padM.style.width = DSP_this.pickerFace + 2*DSP_this.pickerInset + dsp_jscolor.images.pad[0] + dsp_jscolor.images.arrow[0] + 'px';
			p.padM.style.height = p.box.style.height;
			p.padM.style.cursor = 'crosshair';

			p.sld.style.overflow = 'hidden';
			p.sld.style.width = dsp_jscolor.images.sld[0]+'px';
			p.sld.style.height = dsp_jscolor.images.sld[1]+'px';

			p.sldB.style.position = 'absolute';
			p.sldB.style.right = DSP_this.pickerFace+'px';
			p.sldB.style.top = DSP_this.pickerFace+'px';
			p.sldB.style.border = DSP_this.pickerInset+'px solid';

			p.sldM.style.position = 'absolute';
			p.sldM.style.right = '0';
			p.sldM.style.top = '0';
			p.sldM.style.width = dsp_jscolor.images.sld[0] + dsp_jscolor.images.arrow[0] + DSP_this.pickerFace + 2*DSP_this.pickerInset + 'px';
			p.sldM.style.height = p.box.style.height;
			p.sldM.style.cursor = 'pointer';


			p.padM.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-151007-7d331cbee9f80935305d342227e0f6f5.gif) no-repeat";
			p.padB.style.border = '1px solid #b6b6b6';
			p.sldB.style.border = '1px solid #b6b6b6';
			p.sldM.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-150848-9b8117b5cfa416505278cda8115a920d.gif) no-repeat";
			p.pad.style.background = "url(http://pit.dirty.ru/dirty/1/2010/04/29/11119-151231-97b37c241b1e778ddd94c2659e7e0614.png) 0 0 no-repeat";

			redrawPad();
			redrawSld();

			dsp_jscolor.picker.owner = DSP_this;
			document.getElementsByTagName('body')[0].appendChild(p.boxB);

		}


		function redrawPad() {
			var yComponent = 1;
			var x = Math.round((DSP_this.hsv[0]/6) * (dsp_jscolor.images.pad[0]-1));
			var y = Math.round((1-DSP_this.hsv[yComponent]) * (dsp_jscolor.images.pad[1]-1));
			dsp_jscolor.picker.padM.style.backgroundPosition =
				(DSP_this.pickerFace+DSP_this.pickerInset+x - Math.floor(dsp_jscolor.images.cross[0]/2)) + 'px ' +
				(DSP_this.pickerFace+DSP_this.pickerInset+y - Math.floor(dsp_jscolor.images.cross[1]/2)) + 'px';

			var seg = dsp_jscolor.picker.sld.childNodes;

			var rgb = HSV_RGB(DSP_this.hsv[0], DSP_this.hsv[1], 1);
			for(var i=0; i<seg.length; i+=1) {
				seg[i].style.backgroundColor = 'rgb('+
					(rgb[0]*(1-i/seg.length)*100)+'%,'+
					(rgb[1]*(1-i/seg.length)*100)+'%,'+
					(rgb[2]*(1-i/seg.length)*100)+'%)';
			}
		}


		function redrawSld() {
			var yComponent = 2;
			var y = Math.round((1-DSP_this.hsv[yComponent]) * (dsp_jscolor.images.sld[1]-1));
			dsp_jscolor.picker.sldM.style.backgroundPosition =
				'0 ' + (DSP_this.pickerFace+DSP_this.pickerInset+y - Math.floor(dsp_jscolor.images.arrow[1]/2)) + 'px';
		}


		function isPickerOwner() {
			if(dsp_jscolor.picker) return dsp_jscolor.picker && dsp_jscolor.picker.owner === DSP_this;
		}


		function setPad(e){
			var posM = dsp_jscolor.getMousePos(e);
			var x = posM[0]-posPad[0];
			var y = posM[1]-posPad[1];
			DSP_this.fromHSV(x*(6/(dsp_jscolor.images.pad[0]-1)), 1 - y/(dsp_jscolor.images.pad[1]-1), null, leaveSld);
		}


		function setSld(e) {
			var posM = dsp_jscolor.getMousePos(e);
			var y = posM[1]-posPad[1];
			DSP_this.fromHSV(null, null, 1 - y/(dsp_jscolor.images.sld[1]-1), leavePad);
		}


		var DSP_this = this;
		var abortBlur = false;
		var
			valueElement = dsp_jscolor.fetchElement(this.valueElement),
			styleElement = dsp_jscolor.fetchElement(this.styleElement);
		var
			holdPad = false,
			holdSld = false;
		var
			posPad,
			posSld;
		var
			leaveValue = 1<<0,
			leaveStyle = 1<<1,
			leavePad = 1<<2,
			leaveSld = 1<<3;

		_$.addEvent(otarget,'click',function(e){
			if(dsp_jscolor.picker) removePicker();
			dsp_color_user = e.target;
			if(DSP_this.pickerOnfocus) DSP_this.showPicker();
		});


		if(valueElement){
			var updateField = function(){
				DSP_this.fromString(valueElement.value, leaveValue);
			};
		}

		if(styleElement){
			styleElement.jscStyle = {
				backgroundColor:styleElement.style.backgroundColor,
				color:styleElement.style.color
			};
		}

		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-151231-97b37c241b1e778ddd94c2659e7e0614.png');
		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-151007-7d331cbee9f80935305d342227e0f6f5.gif');
		dsp_jscolor.requireImage('http://pit.dirty.ru/dirty/1/2010/04/29/11119-150848-9b8117b5cfa416505278cda8115a920d.gif');

	}

}


function DSP_colorize_comments(){

	eval('var temp_array='+_$.settings.colors);

	for(var i=0; i<dsp_all_comments.length; i++){
		var temp_name = _$.$t('a',dsp_all_comments[i])[1].innerHTML;

		var temp_color = '';
		var temp_font = '';

		for(var j=0; j<temp_array.length; j++){
			if(temp_array[j].split(',')[0]==temp_name){
				temp_color = temp_array[j].split(',')[1];
				temp_font = temp_array[j].split(',')[2];
				break;
			}
		}

		var dsp_av_res = document.createElement('span');
		dsp_av_res.innerHTML = '&nbsp; <a class="dsp_color" style="text-decoration:underline;cursor:pointer">цвет</a><span'+((temp_color=='')?' style="display:none"':'')+' id="dsp_color_remover_'+i+'"> | <a style="text-decoration:underline;cursor:pointer">сбросить</a></span>';
		dsp_all_comments[i].appendChild(dsp_av_res);

		_$.addEvent(_$.$('dsp_color_remover_'+i),'click',function(e){DSP_color_remove(e.target);});

		if(temp_color!=''){

			var temp_div = _$.$t('a',dsp_all_comments[i]);
			temp_div = temp_div[temp_div.length-2];

			temp_div.title = '#'+temp_color;
			temp_div.color = '#'+temp_font;

			var temp_div = dsp_all_comments[i].parentNode;

			if(temp_color.toLowerCase()!='fff'){

				dsp_all_comments[i].parentNode.style.backgroundColor = '#'+temp_color;
				dsp_all_comments[i].parentNode.style.color = '#'+temp_font;
				dsp_all_comments[i].style.color = '#'+temp_font;

				var link_color = (temp_font=='fff')?'#e3e3e3':'#393939';

				var div_links = _$.$t('a',dsp_all_comments[i].parentNode.parentNode);

				for(var j=0; j<div_links.length; j++){

					div_links[j].style.color = link_color;
				}
			}
		}

		if(_$.settings.colors_border=='1'){

			if(dsp_all_comments[i].parentNode.parentNode.className.indexOf(' new ')>-1)
			dsp_all_comments[i].parentNode.style.border = '1px solid red';
		}

	}

}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Dirty Tooltip


* * * * * * * * * * * * * * * * * * * * * * * * * */

//SP2
var supressEvents = false;

_$.tooltip = {


	init: function(){

		if(1==1 || _$.location.indexOf('/user/')==-1){

			var linkes = _$.$t('a');

			for(var i=0; i<linkes.length; i++){

				var dup_an = linkes[i].href.toString();

				if(
					dup_an.indexOf('dirty.ru/user/')>0&&
//					dup_an.indexOf('/'+dsp_self_name)<0 &&
					dup_an[dup_an.length-2]!='/' && dup_an.indexOf('#')<0
				){

					_$.addEvent(linkes[i],'mouseover',function(e){
						clearTimeout(dup_showing);
						dup_showBaloon(e.target);
					});

					_$.addEvent(linkes[i],'mouseout',function(){
						clearTimeout(dup_showing);
						dup_processing = 0;
					});
				}
			}

			_$.addEvent(_$.$t('a',_$.$c('header_tagline_inner')[0])[0],'mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)});
			_$.addEvent(_$.$t('a',_$.$c('header_tagline_inner')[0])[0],'mouseout',function(){clearTimeout(dup_showing);dup_processing=0});
			
			//SP2
			function documentChanged(event) {
				if (supressEvents) {
					return;
				}				
				if(typeof(event.target) !== 'undefined' && typeof(event.target.className) !== 'undefined'  && event.target.className.indexOf("comment")>-1){
					var links = event.target.getElementsByTagName('a');
					for(var i=0;i<links.length;i++){
						var dup_an = links[i].toString();
						if((dup_an.indexOf('dirty.ru/user/')>0&&dup_an[dup_an.length-1]!='/')&&dup_an.indexOf('#')<0){
								_$.addEvent(links[i],'mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)},true);
								_$.addEvent(links[i],'mouseout',function(){clearTimeout(dup_showing);dup_processing=0},true);
						}
					}
				}
				
				if(event.target !== null && typeof(event.target) !== 'undefined' && typeof(event.target.tagName) !== 'undefined' && 
					event.target.parentNode !== null
					&& event.target.parentNode.parentNode !== null
					&& event.target.parentNode.parentNode.parentNode !== null
					&& event.target.parentNode.parentNode.parentNode.parentNode !== null
					&& typeof(event.target.parentNode.parentNode.parentNode.parentNode) !== 'undefined'
					&& event.target.parentNode.parentNode.parentNode.parentNode.className !== null
					&& typeof(event.target.parentNode.parentNode.parentNode.parentNode.className) !== 'undefined'
					&& event.target.parentNode.parentNode.parentNode.parentNode.className.indexOf("vote_details") > -1 &&
					(event.target.tagName.toLowerCase()=='li')){
					var links = event.target.getElementsByTagName('a');
					for(var i=0;i<links.length;i++){
						var dup_an = links[i].toString();

						if((dup_an.indexOf('dirty.ru/user/')>0&&dup_an[dup_an.length-1]!='/')&&dup_an.indexOf('#')<0){
								_$.addEvent(links[i],'mouseover',function(e){clearTimeout(dup_showing);dup_showBaloon(e.target)},true);
								_$.addEvent(links[i],'mouseout',function(){clearTimeout(dup_showing);dup_processing=0},true);
						}
					}
				}
			}
			/* watch for any changed attributes */
			document.addEventListener("DOMNodeInserted", documentChanged, false);
			
		}
	}



};



var dup_showing = 0;
var dup_processing = 0;


function dup_showBaloon(obj){

	if(_$.settings.tooltip_on==1){

		if((obj.innerHTML.toString()==dsp_self_name&&_$.settings.tooltip_show_self==1)||obj.innerHTML!=dsp_self_name){

			var dup_div;

			if(!_$.$('dup_show_div')){
				dup_div = document.createElement('div');
				dup_div.id = 'dup_show_div';
				dup_div.style.position = 'absolute';
				dup_div.style.zIndex = '1300';
				document.body.appendChild(dup_div);

				_$.addEvent(document,'click',function(){
						_$.$('dup_show_div').style.display = 'none';
					});
			}

			dup_div = _$.$('dup_show_div');

			if(dsp_check_change_pictures==1){
				if(_$.settings.use_pictures==1) dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><table cellspacing="0" cellpadding="0" border="0"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"><div style="width:100px;height:35px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:-20px 0"></div></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" id="dup_data_td"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table>';
				else dup_div.innerHTML = '<input type="hidden" id="dup_current_id" value=""><div style="border-right:1px solid #a1a1a1;border-bottom:1px solid #a1a1a1"><div style="background-color:#fff;border:1px solid #505050;font-size:10px;padding:14px;line-height:16px" id="dup_data_td"></div></div>';
			}

			if(_$.$("dup_current_id").value!=obj.toString()){

				dup_div.style.display = 'none';

				if(_$.settings.use_pictures==1) _$.$("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;background-repeat:no-repeat;background-position:center;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/23/11119-023914-a435e3f34c6e355b6bef6594195f3bd7.gif)">&nbsp;</div></center>';
				else _$.$("dup_data_td").innerHTML = '<center><div style="width:150px;height:60px;line-height:60px">...</div></center>';

				dup_processing = 1;
				//dup_getData(obj);
			}

			var dup_pos = _$.element_position(obj);
			var dup_leftOffset = (_$.settings.use_pictures==1)?35:10;

			dup_showing = setTimeout(function(){
					_$.$('dup_show_div').style.display = 'block';
					dup_getData(obj);
				},700);

			dup_div.style.top = (dup_pos.y+obj.offsetHeight+5)+'px';
			dup_div.style.left = (dup_pos.x-dup_leftOffset)+'px';
		}
	}
}

function dup_getData(obj){

	if(dup_processing!=0){

		_$.ajaxLoad(obj.href,function(ajaxObject){

			var dup_text = ajaxObject.responseText;

			if(dup_text.indexOf(' onclick="voteHandler.vote(this, \'')==-1){

				var dup_user_id = dsp_self_num;
				var dup_user_name = dsp_self_name;
			}
			else{

				var dup_user_id = dup_text.split(' onclick="voteHandler.vote(this, \'')[1].split('\'')[0];
				var dup_user_name = obj.href.split('/');
				dup_user_name = dup_user_name[dup_user_name.length-2];
			}

			if(dup_text.split('<span>с нами с ').length < 2){
				var dup_date = "неизвестно";
			}else{
				var dup_date = dup_text.split('<span>с нами с ')[1].split(' года')[0];
			}
			var dup_karma = dup_text.split(' onclick="voteDetailsHandler.show({type:\'karma\'')[1].split('>')[1].split('<')[0];
			var dup_pluses = dup_text.split('plus voted').length-1;
			var dup_minuses = dup_text.split('minus voted').length-1;

			dup_pluses = (dup_pluses>0)?'<span style="color:green;"><b>+'+dup_pluses+'</b></span>':0;
			dup_minuses = (dup_minuses>0)?'<span style="color:red;"><b>-'+dup_minuses+'</b></span>':0;
				
			var dup_votes_him = '';
			if(dup_minuses!==0) dup_votes_him += dup_minuses;
			if(dup_minuses!==0&&dup_pluses!==0) dup_votes_him += ' <span style="color:#ccc">/</span> ';
			if(dup_pluses!==0) dup_votes_him += dup_pluses;


			var dup_parent = dup_text.split(' по приглашению ')[1].split('</div>')[0];

			var dup_name = dup_text.split('<div class="userbasicinfo">')[1].split('<h3>')[1].split('</div>')[0];
			dup_name = dup_name.split('</h3>').join('');
			for(var i=0;i<2;i++) dup_name = dup_name.split('&#35;').join('#').split('&#59;').join(';').split('&amp;').join('&');

			var dup_country = dup_name.split('<div class="userego">')[1];

			var dup_raitdata = dup_text.split('<div class="userstat userrating">')[1];
			dup_raitdata = dup_raitdata.split('<div class="clear">')[0];

			var dup_sex = (dup_raitdata.indexOf('аписала')>-1)?'f':'m';
			var dup_posts = (dup_raitdata.indexOf('/posts/">')>-1)?parseInt(dup_raitdata.split('/posts/">')[1].split(' ')[0]):0;
			var dup_comments = (dup_raitdata.indexOf('/comments/">')>-1)?parseInt(dup_raitdata.split('/comments/">')[1].split(' ')[0]):0;
			var dup_vote = dup_raitdata.split(' голоса&nbsp;&#8212; ')[1].split('<')[0];

			if(dup_posts!=0||dup_comments!=0){
				var dup_raiting = parseInt(dup_raitdata.split('рейтинг ')[1].split('<')[0]);
			}
			else var dup_raiting = 0;

			dup_name = dup_name.split('<div class="userego">')[0];
			dup_name = '<span style="font-size:130%;color:#'+((dup_sex=='m')?'009ced':'ff4fdc')+'"><b>'+dup_name+'</b></span>';

//			dup_votes_him = (dup_votes_him!='')?'<b>Ваша оценка:</b> '+dup_votes_him:'<span style="color:#999"><b>Ваших оценок нет в '+((dup_sex=='f')?'её':'его')+' карме</b></span>';
			dup_votes_him = '';

			var dup_prop = Math.round((dup_raiting/(dup_posts+dup_comments))*10)/10;

			var dup_userpic = '';
			if(_$.settings.use_pictures=='1'){
				if(dup_text.indexOf('alt="Dirty Avatar"')>0){
					dup_userpic = dup_text.split('alt="Dirty Avatar"')[0];
					dup_userpic = dup_userpic.split('src="');
					dup_userpic = dup_userpic[dup_userpic.length-1].split('"')[0];
				}
				else if(dup_text.indexOf('#Dirty Avatar#')>0){
					dup_userpic = dup_text.split('#Dirty Avatar#')[1].split('src="')[1].split('"')[0];
				}
				else{
					dup_check_avatar = dup_text.split('<table class="userpic">')[1].split('<td>')[1].split('</td>')[0];
					if(dup_check_avatar.indexOf('<img')>0){
						dup_userpic = dup_check_avatar.split('src="')[1].split('"')[0];
					}
				}

				if(dup_userpic!='') dup_userpic = '<img src="http://www.amaryllis.nl/cmm/tools/thumb.php?src='+dup_userpic+'&maxw=70&maxh=100" border="0" alt=""><br>';
				else dup_userpic = '<div style="width:75px;height:75px;background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-074626-d60640dc88fd86bcef83e920d94a8797.png);background-position:'+((dup_sex=='m')?'left':'-75px')+' top">&nbsp;</div>';
			}
			else{
				if(_$.browser().name=='opera'){
					if(dup_sex=='m') dup_userpic = '<div style="width:66px;height:70px;color:#d2dae2;border:1px solid #919191;font-family:Verdana;text-align:center;font-size:50px;line-height:70px">♂</div>';
					else dup_userpic = '<div style="width:66px;height:70px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:50px;line-height:70px">♀</div>';
				}
				else{
					if(dup_sex=='m') dup_userpic = '<div style="width:66px;color:#d2dae2;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                  ~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~~                ~~~~~~  '+"\r\n"+'  ~~~~~~~~              ~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  </pre></div>';
					else dup_userpic = '<div style="width:66px;color:#e2d2d9;border:1px solid #919191;text-align:center;font-size:4px;line-height:4px"><pre>  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~~~       ~~~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~~           ~~~~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                 ~~~~~~  '+"\r\n"+'  ~~~~~~                ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~~~~               ~~~~~~~  '+"\r\n"+'  ~~~~                    ~~~~~  '+"\r\n"+'  ~~~~~                  ~~~~~~  '+"\r\n"+'  ~~~~~~~~             ~~~~~~~~  '+"\r\n"+'  ~~~                      ~~~~  '+"\r\n"+'</pre></div>';
					dup_userpic = dup_userpic.split('~').join('█');
				}
			}


			if(dup_text.split('id="js-usernote">').length >= 2){
				var dup_note = dup_text.split('id="js-usernote">')[1].split('</em>')[0];
				if(dup_note!='Место для заметок о пользователе. Заметки видны только вам.'){

					dup_temp_body_mini = (dup_note.length>32)?dup_note.substring(0,32)+'...':dup_note;

					if(dup_temp_body_mini!=dup_note){
						dup_note = '<b>Ваша заметка:</b><div style="font-size:130%; cursor:help;background-color:#eee;padding:10px;font-family:Times New Roman" title="'+dup_note+'"><i>'+dup_temp_body_mini+'</i></div>';
					}
					else{
						dup_note = '<b>Ваша заметка:</b><div style="font-size:130%; background-color:#eee;padding:10px;font-family:Times New Roman"><i>'+dup_temp_body_mini+'</i></div>';
					}
				}
				else dup_note = '';
			}else{
				var dup_note = '';
			}

			dup_output = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center" valign="top" style="padding-right:10px">'+dup_userpic+'<span style="color:#444">№'+dup_user_id+'</span><br>'+dup_parent+'<div style="margin-top:10px;font-size:10px"><b>Регистрация:</b><br>'+dup_date+'</div><div style="margin-top:5px; font-size: 130%;"><b>Карма: <span style="color:'+((dup_karma>=0)?'green':'red')+'">'+dup_karma+'</span></b></div></td>';
			dup_output += '<td valign="top"><div style="float:left;margin-bottom:5px">'+dup_name+'<br><span style="font-size:10px"><b>'+dup_country+'</b></span></div>';
			dup_output += '<div style="float:right;margin-left:5px;margin-bottom:5px"><span style="display:block'+((_$.settings.use_pictures=='1')?';background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png);background-repeat:no-repeat':'')+';width:36px;height:20px;line-height:20px;text-align:center;color:#fff;background-color:#999"><b>'+dup_prop+'</b></span></div>';
			dup_output += '<div style="clear:both">Автор <b>'+dup_posts+'</b> постов и <b>'+dup_comments+'</b> комментариев<br>Заработал'+((dup_sex=='f')?'а':'')+' голос <span style="color:#0069ac; font-size:130%;"><b>'+dup_vote+'</b></span> и рейтинг '+dup_raiting+'</div>';
			dup_output += '<div style="margin-top:10px">'+dup_votes_him+'</div><div id="dup_my_vote"></div><div id="dup_his_vote"></div><div style="margin-top:10px">'+dup_note+'</div></td></tr></table>';

			_$.$('dup_current_id').value = obj.href;

			dup_getKarma(dup_output,dup_user_id,dup_sex,dup_user_name);
		});
	}
}

function dup_getKarma(dup_text,dup_user_id,dup_sex,dup_user_name){

	if(dup_user_id!=dsp_self_num){

	var url = '/karmactl';
	var data = 'view='+dsp_self_num;

	_$.ajaxLoadPost(url,data,function(ajaxObject){

		var dup_temp = ajaxObject.responseText;
		if(dup_temp.indexOf('{"uid":"'+dup_user_id+'"')>0){
			dup_temp = dup_temp.split('{"uid":"'+dup_user_id+'"')[1].split('","login"')[0].split('"');
			dup_temp = dup_temp[dup_temp.length-1];
			dup_temp = '<b>'+((dup_sex=='f')?'Её':'Его')+' оценка вас: <span style="color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

			_$.$('dup_his_vote').innerHTML = dup_temp;
		}
		else _$.$('dup_his_vote').innerHTML = '<span style="color:#999"><b>Е'+((dup_sex=='f')?'ё':'го')+' оценок нет в вашей карме</b></span>';
	});

	var url = '/karmactl';
	var data = 'view='+dup_user_id;

	_$.ajaxLoadPost(url,data,function(ajaxObject){

		var dup_temp = ajaxObject.responseText;

		if(dup_temp.indexOf('{"uid":"'+dsp_self_num+'"')>0){

			dup_temp = dup_temp.split('{"uid":"'+dsp_self_num+'"')[1].split('","login"')[0].split('"');
			dup_temp = dup_temp[dup_temp.length-1];
			dup_temp = '<b>Ваша оценка '+((dup_sex=='f')?'её':'его')+': <span style="color:'+((dup_temp>0)?'green">+':'red">')+dup_temp+'</span></b>';

			_$.$('dup_my_vote').innerHTML = dup_temp;
		}
		else _$.$('dup_my_vote').innerHTML = '<span style="color:#999"><b>Ваших оценок нет в е'+((dup_sex=='f')?'ё':'го')+' карме</b></span>';
	});

	}

	_$.$('dup_data_td').innerHTML = dup_text;
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Функции создания настроек


* * * * * * * * * * * * * * * * * * * * * * * * * */

function add_checkbox_event(checkboxId, optionId){
	_$.addEvent(_$.$(checkboxId),'click',
	function(){
		if(_$.$(checkboxId).checked===true) _$.set_save(optionId,1);
		else _$.set_save(optionId,0);
	});
}

function dsp_d3search_init(){
	//SP2 - STEP THREE
	_$.addEvent(_$.$('dsp_c_d3search'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_new_window');

		if(_$.$('dsp_c_d3search').checked===true) _$.set_save('d3search',1);
		else _$.set_save('d3search',0);

	});
	
	add_checkbox_event('dsp_c_new_window','new_window');
	add_checkbox_event('dsp_c_user_stats','user_stats');
	add_checkbox_event('dsp_c_links_test','links_test');
}

function dsp_general_init(){
	//SP2
	add_checkbox_event('dsp_c_youtube_preview','youtube_preview');
	if(_$.browser().name != "chrome")add_checkbox_event('dsp_c_smooth_scroll','smooth_scroll');
	_$.addEvent(_$.$('dsp_c_comment_scroller'),'click',
	function(){
		if(_$.browser().name != "chrome")DSP_show_hide_menu('dsp_l_scroll');

		if(_$.$('dsp_c_comment_scroller').checked===true) _$.set_save('comment_scroller',1);
		else _$.set_save('comment_scroller',0);

	});
	

	_$.addEvent(_$.$('dsp_c_favicon_on'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_favicon');

		if(_$.$('dsp_c_favicon_on').checked===true) _$.set_save('favicon_on',1);
		else _$.set_save('favicon_on',0);

	});


/*	_$.$('dsp_c_after_load').addEventListener('click',
	function(){
		if(_$.$('dsp_c_after_load').checked===true) _$.set_save('after_load',1);
		else _$.set_save('after_load',0);

	},false);
*/


	_$.addEvent(_$.$('dsp_c_favicon_style_a'),'click',
	function(){
		_$.set_save('favicon_style',1);
	});


	_$.addEvent(_$.$('dsp_c_favicon_style_b'),'click',
	function(){
		_$.set_save('favicon_style',0);
	});


	_$.addEvent(_$.$('dsp_c_username_replace'),'click',
	function(){

		if(_$.$('dsp_c_username_replace').checked===true){
			DSP_replace_username(1);
			_$.set_save('username_replace',1);
		}
		else{
			DSP_replace_username(0);
			_$.set_save('username_replace',0);
		}

	});
}

function dsp_posts_init(){
	//SP2
	_$.addEvent(_$.$('dsp_c_post_threshold'),'click',
	function(){
		DSP_show_hide_menu('dsp_l_threshold');

		if(_$.$('dsp_c_post_threshold').checked===true) _$.set_save('post_threshold',1);
		else _$.set_save('post_threshold',0);

	});
	add_checkbox_event('dsp_c_own_threshold','own_threshold');
	add_checkbox_event('dsp_c_post_threshold_use_or','post_threshold_use_or');

	add_checkbox_event('dsp_c_read_button','read_button');
	add_checkbox_event('dsp_c_dirty_tags','dirty_tags');

	_$.addEvent(_$.$('dsp_c_posts_average'),'click',
	function(){
		if(_$.$('dsp_c_posts_average').checked===true) _$.set_save('posts_average',1);
		else _$.set_save('posts_average',0);

	});

	_$.addEvent(_$.$('dsp_c_youtube_fullscreen'),'click',
		function(){
			if(_$.$('dsp_c_youtube_fullscreen').checked===true) _$.set_save('youtube_fullscreen',1);
			else _$.set_save('youtube_fullscreen',0);
		});
	add_checkbox_event('dsp_c_post_content_filter_layout','post_content_filter_layout');
}

function dsp_comments_init(){

	//SP2
	add_checkbox_event('dsp_c_quotes','quotes');
	add_checkbox_event('dsp_c_arrows_on','arrows_on');
	add_checkbox_event('dsp_c_comment_threshold','comment_threshold');
	add_checkbox_event('dsp_c_allow_reverse_list','allow_reverse_list');
	
	_$.addEvent(_$.$('dsp_c_colors_on'),'click',
		function(){
			DSP_show_hide_menu('dsp_l_colors');

			if(_$.$('dsp_c_colors_on').checked===true) _$.set_save('colors_on',1);
			else _$.set_save('colors_on',0);

		});

	_$.addEvent(_$.$('dsp_c_colors_border'),'click',
		function(){
			if(_$.$('dsp_c_colors_border').checked===true) _$.set_save('colors_border',1);
			else _$.set_save('colors_border',0);

		});

}


function dsp_tooltip_init(){
	//SP2
	add_checkbox_event('dsp_c_karma_log','karma_log');
	add_checkbox_event('dsp_c_inbox_text','inbox_text');
	add_checkbox_event('dsp_c_inbox_recreate','inbox_recreate');
	add_checkbox_event('dsp_c_ban_encoding','ban_encoding');
	
	_$.addEvent(_$.$('dsp_c_use_picture'),'click',
	function(){
		dsp_check_change_pictures = 1;

		if(_$.$('dsp_c_use_picture').checked===true) _$.set_save('use_pictures',0);
		else _$.set_save('use_pictures',1);

	});


	_$.addEvent(_$.$('dsp_c_tooltip_on'),'click',
		function(){
			DSP_show_hide_menu('dsp_l_tooltip');

			if(_$.$('dsp_c_tooltip_on').checked===true) _$.set_save('tooltip_on',1);
			else _$.set_save('tooltip_on',0);
		});


/*	_$.$('dsp_c_tooltip_with_notepad').addEventListener('click',
		function(){
			if(_$.$('dsp_c_tooltip_with_notepad').checked===true) _$.set_save('tooltip_with_notepad',1);
			else _$.set_save('tooltip_with_notepad',0);
		},false);
*/


	_$.addEvent(_$.$('dsp_c_tooltip_show_self'),'click',
		function(){
			if(_$.$('dsp_c_tooltip_show_self').checked===true) _$.set_save('tooltip_show_self',1);
			else _$.set_save('tooltip_show_self',0);
		});
}


function DSP_make_content_settings(){

	if(_$.$('dsp_setting_button_0').innerHTML.length<10){

		var dsp_txt = '<table cellspacing="0" border="0">';
		//SP2 adding scripts - STEP TWO
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_comment_scroller" type="checkbox" '+((_$.settings.comment_scroller=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_comment_scroller">SP2: Навигация по комментариям и постам</label></td></tr>';
		dsp_txt += '</table>';
		if(_$.browser().name != "chrome"){
		dsp_txt += '<div id="dsp_l_scroll" style="display:'+((_$.settings.comment_scroller=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_smooth_scroll" type="checkbox" '+((_$.settings.smooth_scroll=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_smooth_scroll">Плавная прокрутка</label></td></tr>';
		dsp_txt += '</table></div>';
		}
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_youtube_preview" type="checkbox" '+((_$.settings.youtube_preview=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_preview">SP2: Предпросмотр youtube видео</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_username_replace" type="checkbox" '+((_$.settings.username_replace=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_username_replace">Заменять %username% на ваше имя</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_favicon_on" type="checkbox" '+((_$.settings.favicon_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_favicon_on">Показывать иконку сайта ссылки:</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_favicon" style="display:'+((_$.settings.favicon_on=='1')?'block':'none')+'"><form style="margin:0"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td align="right" width="45"><input name="dsp_favicon_s" value="1" id="dsp_c_favicon_style_a" type="radio" '+((_$.settings.favicon_style=='1')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_favicon_style_a">при наведении - над ссылкой</label></td></tr>';
		dsp_txt += '<tr><td align="right"><input name="dsp_favicon_s" value="0" id="dsp_c_favicon_style_b" type="radio" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td style=";color:#777"><label for="dsp_c_favicon_style_b">всегда перед ссылкой</label></td></tr>';
		dsp_txt += '</table></form></div>';

		DSP_make_Setting_Bar('Общие',dsp_txt,'dsp_general_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_post_threshold" type="checkbox" '+((_$.settings.post_threshold=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_post_threshold">SP2: Фильтр по рейтингу постов</label></td></tr>';
		dsp_txt += '</table>';
		
		dsp_txt += '<div id="dsp_l_threshold" style="display:'+((_$.settings.post_threshold=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_own_threshold" type="checkbox" '+((_$.settings.own_threshold=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_own_threshold">Корректировать родной фильтр (см. FAQ)</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_post_threshold_use_or" type="checkbox" '+((_$.settings.post_threshold_use_or=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_post_threshold_use_or">Использовать ИЛИ</label></td></tr>';
		dsp_txt += '</table></div>';
		
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_dirty_tags" type="checkbox" '+((_$.settings.dirty_tags=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_dirty_tags">SP2: Dirty Tags</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_read_button" type="checkbox" '+((_$.settings.read_button=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_read_button">SP2: Кнопка прочтения новых комментариев</label></td></tr>';

		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_posts_average" type="checkbox" '+((_$.settings.posts_average=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_posts_average">Показывать средние ID и оценку</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_youtube_fullscreen" type="checkbox" '+((_$.settings.youtube_fullscreen=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_youtube_fullscreen">Добавить кнопку "Fullscreen" в постах с видеороликами youtube</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_post_content_filter_layout" type="checkbox" '+((_$.settings.post_content_filter_layout=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_post_content_filter_layout">Фильтр контента без чекбоксов</label></td></tr>';
		dsp_txt += '</table>';

		DSP_make_Setting_Bar('Посты',dsp_txt,'dsp_posts_init()');


		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_quotes" type="checkbox" '+((_$.settings.quotes=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_quotes">SP2: Цитатник</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_comment_threshold" type="checkbox" '+((_$.settings.comment_threshold=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_comment_threshold">SP2: Фильтр по рейтингу комментариев</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_allow_reverse_list" type="checkbox" '+((_$.settings.allow_reverse_list=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_allow_reverse_list">SP2: Списком->Деревом->Реверс</label></td></tr>';
		dsp_txt += '</table>';dsp_txt += '</table>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_arrows_on" type="checkbox" '+((_$.settings.arrows_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_arrows_on">SP2: Увеличить стрелочки под комментарием</label></td></tr>';

		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_on" type="checkbox" '+((_$.settings.colors_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_colors_on">Изменять цвет комментариев пользователей</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_colors" style="display:'+((_$.settings.colors_on=='1')?'block':'none')+'"><table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_colors_border" type="checkbox" '+((_$.settings.colors_border=='1')?'checked="checked"':'')+'></td><td style="color:#777"><label for="dsp_c_colors_border">Выделять рамкой новые комментарии</label></td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Комментарии',dsp_txt,'dsp_comments_init()');
		var dsp_txt = '<table cellspacing="0" border="0">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_d3search" type="checkbox" '+((_$.settings.d3search=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_d3search">SP2: Замена поиска на d3search.ru</label></td></tr>';
		dsp_txt += '</table>';

		dsp_txt += '<div id="dsp_l_new_window" style="display:'+((_$.settings.d3search=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left:20px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_new_window" type="checkbox" '+((_$.settings.new_window=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_new_window">Результаты поиска в новом окне</label></td></tr>';
		dsp_txt += '</table></div>';		

		dsp_txt += '<table cellspacing="0" border="0">';		
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_links_test" type="checkbox" '+((_$.settings.links_test=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_links_test">SP2: Проверка ссылок при написании поста на d3search</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_user_stats" type="checkbox" '+((_$.settings.user_stats=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_user_stats">SP2: Статистика в профилях</label></td></tr>';
		dsp_txt += '</table>';
		DSP_make_Setting_Bar('d3search',dsp_txt,'dsp_d3search_init()');

		dsp_txt = '<table cellspacing="0" border="0">';
		//SP2
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_karma_log" type="checkbox" '+((_$.settings.karma_log=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_karma_log">SP2: Комментарии к карме</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_ban_encoding" type="checkbox" '+((_$.settings.ban_encoding=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_ban_encoding">SP2: Править кодировку в бан-блогах</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_inbox_recreate" type="checkbox" '+((_$.settings.inbox_recreate=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_inbox_recreate">SP2: Кнопка пересоздания инбокса</label></td></tr>';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_inbox_text" type="checkbox" '+((_$.settings.inbox_text=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_inbox_text">SP2: Добавлять "Инбокс" к конверту</label></td></tr>';

		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_tooltip_on" type="checkbox" '+((_$.settings.tooltip_on=='1')?'checked="checked"':'')+'></td><td style=""><label for="dsp_c_tooltip_on">Включить Dirty Tooltip</label></td></tr>';
		dsp_txt += '</table>';
		dsp_txt += '<div id="dsp_l_tooltip" style="display:'+((_$.settings.tooltip_on=='1')?'block':'none')+'"><table cellspacing="0" border="0" style="margin-left: 25px;">';
		dsp_txt += '<tr><td width="25" valign="top"><input id="dsp_c_use_picture" type="checkbox" '+((_$.settings.use_pictures=='0')?'checked="checked"':'')+'></td><td><label for="dsp_c_use_picture">Режим "без картинок"</label></td></tr>';
		dsp_txt += '<tr><td valign="top"><input id="dsp_c_tooltip_show_self" type="checkbox" '+((_$.settings.favicon_style=='0')?'checked="checked"':'')+'></td><td><label for="dsp_c_tooltip_show_self">Тултип на ссылке возле logout</label></td></tr>';
		dsp_txt += '</table></div>';

		DSP_make_Setting_Bar('Tooltip & Misc',dsp_txt,'dsp_tooltip_init()');

	}
	DSP_show_hide_window('_$.settings');
}


function DSP_init(){
	
	if(_$.location.indexOf('/user/')==-1) {
		DSP_make_General_Bar();
		DSP_show_hide_setting(0);
	}

// Favicons inits

if(_$.settings.favicon_on=='1'&&_$.settings.use_pictures=='1'){

	if(_$.location.indexOf('/user/')<0){

		var dsp_elements = _$.$t('a',_$.$('content'));

		if(_$.settings.favicon_style=='1'){

			for(var i=0;i<dsp_elements.length;i++){

				if(dsp_elements[i].toString().indexOf('http://')!=-1&&dsp_elements[i].toString().indexOf('dirty.ru/')<0){

					_$.addEvent(dsp_elements[i],'mouseover',function(e){DSP_show_favicon(e.target,1);});
					_$.addEvent(dsp_elements[i],'mouseout',function(e){DSP_show_favicon(e.target,0);});
				}
			}

		}
		else{

			for(var i=0;i<dsp_elements.length;i++){

				if(dsp_elements[i].toString().indexOf('http://')!=-1&&dsp_elements[i].toString().indexOf('dirty.ru/')<0){

					var favicon = 'http://favicon.yandex.net/favicon/'+dsp_elements[i].toString().split('/')[2];

					dsp_elements[i].style.paddingLeft = '19px';
					dsp_elements[i].style.backgroundImage = 'url('+favicon+')';//,url(http://pit.dirty.ru/dirty/1/2010/10/31/28281-154853-236c6922bc86581a4d9fbf18719fb16b.png)';
					dsp_elements[i].style.backgroundRepeat = 'no-repeat';//, no-repeat';
				}
			}

		}
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Average IDs and Votes


* * * * * * * * * * * * * * * * * * * * * * * * * */

if(_$.settings.posts_average=='1'){

	if(_$.location.indexOf('/comments/')==0){

		var dsp_av_res = document.createElement('span');
		dsp_av_res.id = 'dsp_layer_posts_average';
		_$.$c('dd')[0].appendChild(dsp_av_res);

		var dsp_ids_count = 0;
		var dsp_votes_count = 0;

		var dsp_average_votes = _$.$c('vote_result',_$.$('js-commentsHolder'));

		for(var i=0; i<dsp_average_votes.length; i++){
			dsp_votes_count = dsp_votes_count+parseInt(dsp_average_votes[i].innerHTML);
		}
		dsp_votes_count = Math.round((dsp_votes_count/dsp_average_votes.length)*10)/10;

		dsp_average_votes = _$.$c('comment',_$.$('js-commentsHolder'));
		var dsp_temp_array = ',';

		for(var i=0; i<dsp_average_votes.length; i++){
			var dsp_temp = dsp_average_votes[i].className.split(' u')[1];
			if(dsp_temp_array.indexOf(','+dsp_temp+',')<0) dsp_temp_array += dsp_temp+',';
		}
		dsp_temp_length = dsp_temp_array.split(',').length-2;
		dsp_temp_array = eval('0'+dsp_temp_array.split(',').join('+')+'0');

		dsp_ids_count = Math.round((dsp_temp_array/dsp_temp_length)*10)/10;
		//dsp_average_votes = '';

		if(isNaN(dsp_votes_count)) dsp_votes_count = 0;
		if(isNaN(dsp_ids_count)) dsp_ids_count = 0;

		_$.$('dsp_layer_posts_average').innerHTML += ' | &#216;id '+dsp_ids_count+' | &#216;&#177; '+dsp_votes_count;
		
		if(dsp_temp_length>=0)_$.$('dsp_layer_posts_average').innerHTML += ' | '+dsp_average_votes.length+' комментариев'
		
	}
}


// Username replace

if(_$.settings.username_replace=='1'){

	DSP_replace_username(1);
}

/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Youtube Video Enhancer


* * * * * * * * * * * * * * * * * * * * * * * * * */


if(_$.settings.youtube_fullscreen=='1'){

	if(_$.location.indexOf('/comments/')==0){

		if(_$.$t('object').length>0&&_$.$c('dt')[0].innerHTML.indexOf('value="http://www.youtube.com')>0){

			var dsp_video_link = _$.$t('object')[0].parentNode.innerHTML.split('value="http')[1].split('"')[0];
			var dsp_video_array = _$.$t('object')[0].parentNode.innerHTML.split('<');
			var dsp_video_html = dsp_video_array[0];

			for(var i=1; i<dsp_video_array.length; i++){

				if(dsp_video_array[i][0]=='p') dsp_video_html += '<'+dsp_video_array[i]+'</param>';
				else if(dsp_video_array[i][0]=='e') dsp_video_html += '<'+dsp_video_array[i]+'</embed>';
				else dsp_video_html += '<'+dsp_video_array[i];
			}

			dsp_video_html = dsp_video_html.split('%20').join('').split('<embed').join('<param name="allowFullScreen" value="true"></param><embed allowfullscreen="true"');
			dsp_video_html = dsp_video_html.split(dsp_video_link).join(dsp_video_link+'&hl=ru_RU&fs=1');
			_$.$t('object')[0].parentNode.innerHTML = dsp_video_html;
		}
	}
}


// Color Picker

if(_$.settings.colors_on=='1'){

	if(_$.location.indexOf('/comments/')==0||_$.location.indexOf('/news/')==0||(_$.location.indexOf('/my/inbox/')==0&&_$.location!='/my/inbox/')){

		dsp_all_comments = _$.$c('c_footer');

		DSP_colorize_comments();
		dsp_jscolor.init();
	}
}



/* * * * * * * * * * * * * * * * * * * * * * * * * *

		Service Pack 2


* * * * * * * * * * * * * * * * * * * * * * * * * */
//SP 2, NEW SCRIPTS START HERE
//STEP FOUR
//GENERAL FUNCTIONS 
//show new comments correctly -- in the new comment scroller section
//if(document.location.href.indexOf('#new')>-1){
//	document.location.href = document.location.href;
//}

//simplest eventDispatcher, listens to standard events like mouseup and mousedown
var eventDispatcher = document.createElement('div');

// made by crea7or
// start of SCRIPTS-58
if ( document.location.href.indexOf("/my/inbox/") >= 0 )
{
	// user page
	var vS58links = document.querySelectorAll('a.c_icon');
	if ( vS58links )
	{	
		for( vS58ind = 0; vS58ind < vS58links.length; vS58ind++)
		{
			vS58href = vS58links[ vS58ind].getAttribute('href');
			if ( vS58href.length > 10 )
			{
				vS58links[ vS58ind].setAttribute('href', "/my/inbox/" + vS58href.substring(10, vS58href.length ));
			}			
		}
	}
}
// end of SCRIPTS-58


//preview posts
function addEvent(obj,sEvent,sFunc)
{
	if(obj.addEventListener) obj.addEventListener(sEvent,sFunc,false);
	else if(obj.attachEvent) obj.attachEvent('on'+sEvent,sFunc);
}
	
function vPreview(e)
{
	var vPrvDiv = document.getElementById( 'js-comments_reply_block' );
	var vPrvTextArea = document.getElementById( 'comment_textarea' );
	if ( vPrvTextArea && vPrvDiv )
	{
		vRemovePreview( null );
		var newdiv = document.createElement('div');
		newdiv.setAttribute('style', 'padding: 5px 5px 5px 5px; margin-left: 0px  !important; border: 1px dashed grey;');
		newdiv.setAttribute('id', 'vprw-preview');
		newdiv.setAttribute('class', 'comment');
		newdiv.innerHTML = vPrvTextArea.value.replace(/\n/g,'<br>');
		vPrvDiv.appendChild( newdiv );
	}
	e.preventDefault();
	return false;
}

function vRemovePreview(e)
{
	var vPrvDiv = document.getElementById( 'js-comments_reply_block' );
	var vPrvTextArea = document.getElementById( 'comment_textarea' );
	if ( vPrvTextArea && vPrvDiv )
	{
		vPrvTextPreview = document.getElementById( 'vprw-preview' );
		if ( vPrvTextPreview )
		{
			vPrvDiv.removeChild( vPrvTextPreview );
		}
	}
	return false;
}

var vPrvDiv = document.querySelector('div.comments_add_pics');
if ( vPrvDiv )
{
	var newdiv = document.createElement('div');
	newdiv.setAttribute('style', 'margin-right: 30px; float: right;');
	newdiv.innerHTML = "<a href=\"#\" id=\"prevLink\" class=\"dashed\" style=\"color: black; font-size: 11px;\">предпросмотр</a>";
	vPrvDiv.parentNode.insertBefore( newdiv, vPrvDiv );
	addEvent(document.getElementById('prevLink'), "click", vPreview);
	addEvent(document.getElementById('js-post-yarrr'), "click", vRemovePreview);
}

//
// start - part of dirtytort script
// modifying inbox users list, inbox header, invites link
// adding links to banned/music
//
	var vTortDupDetected = 0;
	var vTortAddLinks = document.querySelector('div.header_logout');
	if ( vTortAddLinks )
	{
		if ( vTortAddLinks.innerHTML.indexOf('banned') > 0 )
		{
			vTortDupDetected = 1;
		}
		else
		{
			vTortAddLinks.firstChild.setAttribute( 'style', 'margin-left: 7px !important;');
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://music.dirty.ru/');
			newa.setAttribute('style', 'margin-left: 7px !important;');
			newa.innerHTML = 'music';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://dirty.ru/banned/');
			newa.setAttribute('style', 'margin-left: 7px !important;');
			newa.innerHTML = 'banned';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
			newa = document.createElement('a');
			newa.setAttribute('href', 'http://www.quotes-dirty.ru/');
			newa.setAttribute('style', 'margin-left: 7px !important;');
			newa.setAttribute('target', '_blank');
			newa.innerHTML = 'цитатник';
			vTortAddLinks.insertBefore( newa, vTortAddLinks.firstChild );
		}
	}

	if ( vTortDupDetected == 0 )
	{
		var vTortAddLinksInbox = document.querySelector('div.inbox_header');
		// start fix for list of users (for banned users in the inbox)
		if ( vTortAddLinksInbox == null )
		{	
			vTortInbMenu = document.querySelector('div.under_menu');
			vTortInbPreHeader = document.querySelector('div.inbox_comments');
			if ( vTortInbMenu && vTortInbPreHeader )
			{
				vTortAddLinksInbox = document.createElement('div');
				vTortAddLinksInbox.setAttribute('class', 'inbox_header');
				vTortAddLinksInbox.innerHTML = '&nbsp;';
				vTortInbMenu.insertBefore( vTortAddLinksInbox, vTortInbPreHeader );
			}			
		}
		// end fix for list of users (for banned users in the inbox)
		if ( vTortAddLinksInbox)
		{
			vTortAddLinksInbox.setAttribute('style', 'background: #FAFAFA; padding: 20px 20px 20px 42px; margin: 0px 0px 20px 0px;');
			vTortNewa = document.createElement('div');
			vTortNewa.setAttribute('style', 'float: right;');
			vTortNewa.innerHTML = "<a href=\"#\" class=\"dashed comments_header_new_comment\" onclick=\"var e = document.getElementById('js-inboxers-list');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\">список инбоксеров</a>&nbsp;&nbsp;";
			vTortAddLinksInbox.appendChild( vTortNewa );
		}
	
		var vTortHideInboxers = document.querySelector('div.inbox-tools-static');
		if ( vTortHideInboxers )
		{
			vTortHideInboxers.setAttribute('id', 'js-inboxers-list');
			vTortHideInboxers.style.display = 'none';
	
			vTortHideInboxers = document.querySelector('div.comments_holder_inner');
			if ( vTortHideInboxers)
			{
				vTortHideInboxers.setAttribute('style', 'padding-right: 0px');
			}
		}
	
		var vTortFixInvitesNotice = document.querySelector('li.b-menu_invites_link');
		if ( vTortFixInvitesNotice )
		{
			vTortFixInvitesNotice.setAttribute('class','bbbaaaccc');
			vTortFixInvitesNotice.childNodes[0].setAttribute('class','menu_item');
		}
	}
// end - part of dirtytort script


//
// start of the dirty ranks script
function vRanksGetRankFromNote()
{
	vRankUserNote = document.getElementById('js-usernote');
	if ( vRankUserNote && vRankUserNote.children.length == 0 )
	{
		vRanksNote = vRankUserNote.innerHTML;
		vRanksIndex = vRanksNote.lastIndexOf('#');
		if ( vRanksIndex > -1 )
		{
			return  vRanksNote.substring( vRanksIndex + 1 , vRanksNote.length );
		}
	}
	return null;
}


function vRanksSetRankNote( vRanksName )
{
	vRankUserNote = document.getElementById('js-usernote');
	if ( vRankUserNote && vRankUserNote.children.length == 0 )
	{
		vRanksNote = vRankUserNote.innerHTML;
		vRanksIndex = vRanksNote.lastIndexOf('#');
		if ( vRanksIndex > -1 )
		{
			// some name already in the note
			vRanksNote = vRanksNote.substring( 0, vRanksIndex );
			if ( vRanksName != null )
			{
				document.getElementById('js-usernote').innerHTML = vRanksNote + " #" + vRanksName;
			}
			else
			{
				document.getElementById('js-usernote').innerHTML = vRanksNote;
			}
			_$.fireEvent(document.getElementById('js-usernote'), 'click');
			_$.fireEvent(document, 'click');
		}
		else
		{
			// no name at all
			if ( vRanksName != null )
			{
				document.getElementById('js-usernote').innerHTML = vRanksNote + " #" + vRanksName;
			}
		}
	}
}

function vRanksSetRank( e )
{
	var vRanksDivUser = document.querySelector('div.user_name_inner');
	if ( vRanksDivUser )
	{
		vRanksA = vRanksDivUser.getElementsByTagName('a');
		vRanksUserName = vRanksA[0].innerHTML;

		vRanksName = prompt('Как назовём?', vRanksGetRankFromLocStor( vRanksUserName ));
		if( vRanksName )
		{	
			var vRanksDivUser = document.querySelector('div.user_name_inner');
			if ( vRanksDivUser )
			{
				if ( vRanksName.indexOf('#') > -1 )
				{
					vRanksName = null;
				}
				vRanksSetNameLocStor( vRanksUserName, vRanksName );
				vRanksSetRankNote( vRanksName );
			}
		}
	}
	e.preventDefault();
	return false;
}

function vRanksGetNameIndexInLocStor( vRanksArray, vRanksUserName )
{
	for ( vRanksIndex = 0; vRanksIndex < vRanksArray.length; vRanksIndex+= 2 )
	{
		if ( vRanksArray[vRanksIndex] == vRanksUserName )
		{
			return vRanksIndex;
		}	
	}
	return -1;
}

function vRanksGetRankFromLocStor( vRanksUserName )
{
	var vRanksArrLocalStore = localStorage.getItem('vRanksStore' );
	var vRanksLocalStoreArray = new Array;
	if ( vRanksArrLocalStore )
	{
		vRanksLocalStoreArray = vRanksArrLocalStore.split("#");
	}
	vRanksNameIndex = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
	if ( vRanksNameIndex > -1 )
	{
		return vRanksLocalStoreArray[ vRanksNameIndex + 1 ];
	}
	else
	{
		return null;
	}
}

function vRanksSetNameLocStor( vRanksUserName, vRanksRank )
{
	var vRanksArrLocalStore = localStorage.getItem('vRanksStore' );
	var vRanksLocalStoreArray = new Array;
	if ( vRanksArrLocalStore )
	{
		vRanksLocalStoreArray = vRanksArrLocalStore.split("#");
	}
	vRanksNameIndex = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
	if ( vRanksNameIndex > -1 )
	{
		if ( vRanksRank != null )
		{
			vRanksLocalStoreArray[ vRanksNameIndex + 1 ] = vRanksRank;
		}
		else
		{
			vRanksLocalStoreArray.pop( vRanksNameIndex );
			vRanksLocalStoreArray.pop( vRanksNameIndex + 1 );
		}
	}
	else
	{
		if ( vRanksRank != null )
		{
			vRanksLocalStoreArray.push( vRanksUserName );
			vRanksLocalStoreArray.push( vRanksRank );
		}
	}

	var vRanksArrToStr = new String; 
	for ( vRanksInd = 0; vRanksInd < vRanksLocalStoreArray.length; vRanksInd++ )
	{
		if ( vRanksArrToStr.length > 0 )
		{
			vRanksArrToStr += "#";
		}
		vRanksArrToStr += vRanksLocalStoreArray[ vRanksInd ];
	}
	localStorage.setItem('vRanksStore', vRanksArrToStr );
}


if ( document.location.href.indexOf("dirty.ru/user/") >= 0 )
{
	// user page
	var vRanksUserName;
	var vRanksDivUser = document.querySelector('div.user_name_inner');
	if ( vRanksDivUser )
	{
		vRanksA = vRanksDivUser.getElementsByTagName('a');
		vRanksA[0].setAttribute('href', '#');
		vRanksUserName = vRanksA[0].innerHTML;
		_$.addEvent( vRanksA[0], "click", vRanksSetRank );

		vRanksNoteRank = vRanksGetRankFromNote();
		vRanksLocStorRank = vRanksGetRankFromLocStor( vRanksUserName );
		if ( vRanksLocStorRank == null && vRanksNoteRank != null )
		{
			vRanksSetNameLocStor( vRanksUserName, vRanksNoteRank );
		}
		else if ( vRanksLocStorRank != null && vRanksNoteRank == null )
		{
			vRanksSetRankNote( vRanksLocStorRank );
		}
		else if ( vRanksLocStorRank != vRanksNoteRank )
		{
			vRanksSetRankNote( vRanksLocStorRank );			
		}

		// made by crea7or
		// adding: SCRIPTS-65
		// start of SCRIPTS-65
		var vUserIdVote = document.querySelector('strong.vote_result');
		if ( vUserIdVote )
		{
			vUserIdJs = vUserIdVote.getAttribute('onclick');
			vUserIdJsInd = vUserIdJs.indexOf('id:') + 4;
			vUserIdTxt = vUserIdJs.substring(vUserIdJsInd, vUserIdJs.indexOf("'", vUserIdJsInd ));
			vRanksDivUser.childNodes[6].innerHTML = 'User ID: ' +  vUserIdTxt + ', ' + vRanksDivUser.childNodes[6].innerHTML;
		}
		// end of SCRIPTS-65

	}
}
else
{
	var vRanksArrLocalStore = localStorage.getItem('vRanksStore' );
	var vRanksLocalStoreArray = new Array;
	if ( vRanksArrLocalStore )
	{
		vRanksLocalStoreArray = vRanksArrLocalStore.split("#");
	}

	if ( vRanksLocalStoreArray.length > 0 )
	{
		// other pages
		var vRanksDivDD = document.querySelectorAll('div.dd');
		if ( vRanksDivDD )
		{
			for ( vRanksInd = 0; vRanksInd < vRanksDivDD.length; vRanksInd++ )
			{	
				if ( vRanksDivDD[vRanksInd].children.length > 2 )
				{
					vRanksUserName = vRanksDivDD[vRanksInd].childNodes[3].innerHTML;
					vRanksNameInd = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
					if ( vRanksNameInd > -1 )
					{
						var vRanksTxt =  document.createTextNode(" " + vRanksLocalStoreArray[ vRanksNameInd + 1 ] + " ");
						vRanksDivDD[vRanksInd].insertBefore( vRanksTxt, vRanksDivDD[vRanksInd].childNodes[3]);
					}
				}		
			}
		}
		var vRanksDivFooter = document.querySelectorAll('div.c_footer');
		if ( vRanksDivFooter )
		{
			for ( vRanksInd = 0; vRanksInd < vRanksDivFooter.length; vRanksInd++ )
			{	
				if ( vRanksDivFooter[vRanksInd].children.length > 2 )
				{
					vRanksUserName = vRanksDivFooter[vRanksInd].childNodes[3].innerHTML;
					vRanksNameInd = vRanksGetNameIndexInLocStor( vRanksLocalStoreArray, vRanksUserName );
					if ( vRanksNameInd > -1 )
					{
						var vRanksTxt =  document.createTextNode(" " + vRanksLocalStoreArray[ vRanksNameInd + 1 ] + " ");
						vRanksDivFooter[vRanksInd].insertBefore( vRanksTxt, vRanksDivFooter[vRanksInd].childNodes[3]);
					}
				}		
			}
		}
	}
}
// end of the dirty ranks script


// begin - add logout link listener
if(_$.$('js-header_logout_link')){
	_$.addEvent(_$.$('js-header_logout_link'), "click", function(e){
		_$.injectScript("futu_alert('Уходя &ndash; гаси свет!');");
		window.setTimeout(function(){document.location.href=e.target.href;}, 1000);
		e.preventDefault();
		return false;
	});
}
//end - logogut link listener

//add Youtube to textarea
//BIG BLOCK
//begin shared
function processUrl(url){
	var rawid = url.split("v=")[1];
	if(rawid == null || rawid.length==0){
		return false;
	}
	id = rawid.replace(/(&|#).+/g, "");
	var time = -1;
	var timeraw = url.split("t=")[1];
	if(!(timeraw == null || timeraw.length==0)){
		//process time
		timeraw = timeraw.replace(/(&|#).+/g, "");
		if(timeraw.match(/[0-9]+/gi) && timeraw > -1){
			time = timeraw;
		}else{
			var values = timeraw.match(/([0-9]+m)?([0-9]+(s)?){1}/gi);
			if(values != null){
				minutes = timeraw.split("m")[0];
				if(minutes == timeraw || minutes == null || minutes.length == 0){
					minutes = 0;
				}
				seconds = timeraw.split("m")[1];
				if(seconds == null || seconds.length == 0){
					seconds = timeraw;
				}
				seconds = seconds.replace("s", "");
				if(minutes > -1 && seconds > -1){
					time = 60*minutes + 1*seconds;
				}
			}
		}
	}
	return {id: id, time: time};
}
//end shared

function close(){
	_$.injectScript("if(interval){window.clearInterval(interval);}");
	_$.$('youtube_embed').innerHTML = ""; 
	_$.toggle_div('youtube_preview',0);
}

function yarr(){
	var radios = document.getElementsByName('thumb');
	for (var i=0; i < radios.length; i++){
		if (radios[i].checked){
			var val = radios[i].value;
    }
  }
	tagpref = "<a href=\"http://www.youtube.com/watch?v="+youtube_id+"&t='+seconds+'\">";
	taginf = "<img src=\"http://img.youtube.com/vi/"+youtube_id+"/"+val+".jpg\" width=\"120\">";
	tagpost = "</a>";
		
	if(val == 4){
		_$.injectScript("insert_tag('"+tagpref+"','"+tagpost+"');");
	}else{
		_$.injectScript("insert_tag('"+tagpref+taginf+tagpost+"','');");
	}
	close();
}

function processUrl(url){
	var rawid = url.split("v=")[1];
	if(rawid == null || rawid.length==0){
		return false;
	}
	id = rawid.replace(/(&|#).+/g, "");
	var time = -1;
	var timeraw = url.split("t=")[1];
	if(!(timeraw == null || timeraw.length==0)){
		//process time
		timeraw = timeraw.replace(/(&|#).+/g, "");
		if(timeraw.match(/[0-9]+/gi) && timeraw > -1){
			time = timeraw;
		}else{
			var values = timeraw.match(/([0-9]+m)?([0-9]+(s)?){1}/gi);
			if(values != null){
				minutes = timeraw.split("m")[0];
				if(minutes == timeraw || minutes == null || minutes.length == 0){
					minutes = 0;
				}
				seconds = timeraw.split("m")[1];
				if(seconds == null || seconds.length == 0){
					seconds = timeraw;
				}
				seconds = seconds.replace("s", "");
				if(minutes > -1 && seconds > -1){
					time = 60*minutes + 1*seconds;
				}
			}
		}
	}
	return {id: id, time: time};
}

function addYoutube(){
	var url = prompt("Введите URL с youtube", "");
	//check url
	var search = url.search("youtube.com/");
	if (search == -1){
		alert("Поддерживаются только youtube видео");
		return false;
	}
	//process
	var re=processUrl(url);
	if(re==false){
		alert("В URL нет id ролика");
		return false;
	}
	
	//global
	youtube_id = re.id;
	var id = re.id
	time = re.time;
	
	var inject = "";
	inject += 'var player; var interval; var seconds = 0; ';
  if(_$.browser().name=='ie'){
		inject += 'function onYouTubePlayerReady(playerId) { player=document.getElementById(\'yobject\');';
	}else{
		inject += 'function onYouTubePlayerReady(playerId) { player=document.getElementById(\'yembed\');';
	}
	if(time > -1){inject += 'player.seekTo('+time+', true); ';}
	inject += ' interval=setInterval(statechange, 250); };'
	inject += 'function statechange(){if(player){seconds = Math.round(player.getCurrentTime()); document.getElementById(\'youtube_time\').innerHTML = "Перемотайте на нужное время. Позиция сейчас: "+seconds+" cек. Ссылка будет поставлена именно на эту секунду ролика.";}}';
	_$.injectScript(inject);

	_$.$('youtube_embed').innerHTML = '<object width="311" height="200" id="yobject"><param name="movie" value="http://www.youtube.com/v/'+id+'?enablejsapi=1&playerapiid=player"></param><param name="allowFullScreen" value="true"></param><param name="allowScriptAccess" value="always"></param><embed id="yembed" src="http://www.youtube.com/v/'+id+'?enablejsapi=1&playerapiid=player" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="311" height="200"></embed></object>';
	
	temp = "<table><tr><td width=\"150\">";
	temp += '<label><input type="radio" name="thumb" value="0" style="position:relative; top: -40px;" checked="checked"/><img src="http://img.youtube.com/vi/'+id+'/0.jpg" width="120" height="90"/></label>';
	temp += "</td><td width=\"150\">";
	temp += '<label><input type="radio" name="thumb" value="1" style="position:relative; top: -40px;" /><img src="http://img.youtube.com/vi/'+id+'/1.jpg" width="120" height="90"/></label>';
	temp += "</td></tr><tr><td>";
	temp +=  '<label><input type="radio" name="thumb" value="2" style="position:relative; top: -40px;" /><img src="http://img.youtube.com/vi/'+id+'/2.jpg" width="120" height="90"/></label>';
	temp +=  "</td><td>";
	temp +=  '<label><input type="radio" name="thumb" value="3" style="position:relative; top: -40px;" /><img src="http://img.youtube.com/vi/'+id+'/3.jpg" width="120" height="90"/></label>';
	temp +=  '</td></tr><tr><td colspan="2"><label><input type="radio" name="thumb" value="4" />Без картинки</label></td></tr></table>';

	_$.$('youtube_thumbs').innerHTML = temp;
	
	_$.toggle_div('youtube_preview',1);		
	return false;
}
//global holder
var youtube_id;

//add link to textarea
var youtube_textarea = _$.getElementsByClassName('textarea_editor')[0];
if(youtube_textarea!=null){
	var link = document.createElement("a");
	link.innerHTML = "<b>Youtube</b>";
	link.id = "youtube_link";
	link.style.cursor="pointer";
	//link.onclick = "insert_youtube(); return false;";
	youtube_textarea.appendChild(link);
	_$.addEvent(_$.$('youtube_link'),'click',addYoutube);
	
	var preview_div = document.createElement("div");
	var width = 720;
	var height = 295;
	dsp_output = "";
	dsp_output += '<div id="youtube_preview" style="display:none;position:fixed;top:'+((_$.viewarea_size().y-height)/2)+'px;left:'+((_$.viewarea_size().x-width)/2)+'px;width:'+width+'px;height:'+height+'px;z-index:2999"><table cellspacing="0" cellpadding="0" border="0" width="'+width+'" height="'+height+'"><tr><td width="20" height="35" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png)"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px 0"></td><td width="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right top"></td></tr><tr><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 -35px"></td><td style="background-color:#fff;font-size:10px;padding:0 10px 15px 0;line-height:16px" valign="top">';
	dsp_output += '<div id="youtube_preview_close" style="float: right; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b>x</b></div>';
	dsp_output += '<table><tr><td><div style="font-size:180%;color:#5880af; padding-bottom: 10px;">Youtube preview</div></td><td><div style="float: left";>Картинка в посте</div></td></tr>';
	dsp_output += '<tr><td><div id="youtube_embed" style="width: 340px; float:left;"></div></td>';
	dsp_output += '<td><div id="youtube_thumbs"></div></td></tr></table>';
	dsp_output += '<div id="youtube_time" style="width: 340px; float:left;">Перемотайте на нужное время. Позиция сейчас: 0 cек. Ссылка будет поставлена именно на эту секунду ролика.</div>';
	dsp_output += '<div id="youtube_yarrr" style="cursor: pointer; float: right;"><img src="http://dirty.ru/i/yarrr.gif"/></div>';
	dsp_output += '</td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right -35px"></td></tr><tr><td height="20" style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:0 bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-082056-66b834efdae258a95d3a6e1139ca6aa7.png);background-position:-20px bottom"></td><td style="background-image:url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-061726-d653bb4135a280a228108b2990ef42de.png);background-position:right bottom"></td></tr></table></div>';
	preview_div.innerHTML = dsp_output;
	document.body.appendChild(preview_div);
	_$.addEvent(_$.$('youtube_preview_close'),'click',close);
	_$.addEvent(_$.$('youtube_yarrr'),'click',yarr);
}

//END BIG BLOCK

//click on ещё
if(location.pathname.indexOf('/user/')==0 && _$.getElementsByClassName('usermorebutton').length > 0){
	_$.getElementsByClassName('usermorebutton')[0].style.display = "none";
	_$.injectScript("$('js-user_page_more').toggleClass('hidden');");	
}

//fix inbox link in profile + works for inbox recreation
if(document.location.href.split('/my/inbox/write/').length > 1 && _$.$('js-new_inbox_to_whom_input')){
	var field = _$.$('js-new_inbox_to_whom_input');
	field.value = decodeURI(document.location.href.split('/my/inbox/write/')[1]);
}

//Ссылка на статистику d3search
if(location.pathname.indexOf('/users/')==0){
	var img = _$.$t('img', _$.$('generic-wrapper'))[4];
	var div = document.createElement('div');
	div.innerHTML = '<a href="http://d3search.ru/stat">Статистика на d3search.ru</a><br>';
	img.parentNode.insertBefore(div, img);
}

//ON/OFF THRNABLE FUNCTIONS
//add inbox link
if(_$.settings.inbox_text=='1'){
	if(_$.$('js-header_inbox_link'))_$.$('js-header_inbox_link').innerHTML = _$.$('js-header_inbox_link').innerHTML.replace("&nbsp;","") + " <span>Инбокс</span>";
}

//make arrows bigger
if(_$.settings.arrows_on=='1'){

	function apply_links(element){
		var array = _$.$c('c_parent',element);
		for(var i=0; i<array.length; i++){
			array[i].innerHTML = "↑↑↑";
			_$.addEvent(array[i],"click", prevClicked);
		}

		var array = _$.$c('c_previous',element);
		for(var i=0; i<array.length; i++){
			array[i].innerHTML = " ↓↓↓";
		}
	}

	function prevClicked(e){
		apply_links(_$.$(e.target.getAttribute('replyto')));
		e.preventDefault();
		return false;
	}

	function documentChanged(event) {
		if (supressEvents) {
			return;
		}		
		if(event.target.className != null && event.target.className.indexOf("comment")>-1){
			apply_links(event.target);
		}
	}
	
	apply_links(document);
	_$.addEvent(document,"DOMNodeInserted", documentChanged);
}

//recreate inbox link
if(_$.settings.inbox_recreate=='1')
{
	userlist = "";
	var arr = _$.$c("js-inboxPerson-name");
	for(var i=0;i<arr.length;i++)
	{
		var user = arr[i].innerHTML.replace(/<[^<>]+>/g,'');
		userlist += user+",";
	}
	var arr = _$.$n("banf");
	if(arr.length == 1 && userlist.length > 0)
	{
		var form = arr[0];
		var elem = document.createElement("div");
		elem.innerHTML = '[<a href="http://dirty.ru/my/inbox/write/'+userlist.substr(0,userlist.length-1)+'">копировать пользователей</a>]';
		_$.insertAfter(form, elem);

		// made by crea7or
		// start of SCRIPTS-57
		vS57own = document.getElementById('js-inboxUserAddInput');
		if ( vS57own )
		{
			var vS57Scr = document.createElement("script");
			vS57Scr.type = "application/javascript";
			vS57Scr.textContent =  s57inboxBanAll;
			document.body.appendChild( vS57Scr );	
			var elemz = document.createElement("div");
			elemz.innerHTML = '[<a href="#" onclick="s57inboxBanAll(); return false;">забанить всех</a>]';
			_$.insertAfter(form, elemz);
		}
	}
}

function s57inboxBanAll()
{
	var vS57inbox = document.querySelectorAll( 'a.js-inboxPerson-ban');
	if ( vS57inbox )
	{
		var vS57oncli;
		var vS57inboxId;
		var vS57userId;		
		for ( var vS57i = 0; vS57i < vS57inbox.length; vS57i++)
		{
			vS57oncli = vS57inbox[ vS57i ].getAttribute('onclick').split(",");
			if ( vS57oncli.length > 2 )
			{
				vS57inboxId = vS57oncli[1].replace(/\'/g,"");
				vS57userId = vS57oncli[2].replace(/\'/g,"");
				inboxHandler.users('ban', vS57inboxId, vS57userId, vS57inbox[ vS57i ] );					
			}		
		}
	}
}
// end of SCRIPTS-57


//user stats in profiles
if(_$.settings.user_stats=='1')
{
	if(location.pathname.indexOf('/user/')==0)
	{
		var elem = _$.$c('user_name_inner');
		if(elem.length == 1)
		{
			var ownUsername = _$.getUsername();
			
			// made by crea7or
			// start SCRIPTS-61		
			// isn't needed for non users
			if ( ownUsername.length > 0 )
			{
				var vS61div = document.createElement('div');
				vS61div.setAttribute("class", "userinboxwrite");
				vS61div.innerHTML = _$.$c("userstats")[0].parentNode.childNodes[5].innerHTML;
				_$.$c("userstats")[0].parentNode.childNodes[1].appendChild( vS61div );
			}
			// end SCRIPTS-61

			var username = elem[0].innerHTML.split('</a></h2>')[0].split('">')[1];			
			var div = document.createElement('div');
			div.setAttribute("id", "d3search-userinfo");
			div.setAttribute("class", "userstat");
			_$.$c("userstats")[0].appendChild(div);
			_$.injectScriptUrl("http://d3search.ru/wazzup?username=" + encodeURI(username) + "&ownUsername=" + encodeURI(ownUsername)+"&container=d3search-userinfo");
		}
	}
}



//Правим кодировку в бан бложике
//Greetz to NickJr
if(_$.settings.ban_encoding=='1'){
	if(location.pathname.indexOf('/banned')==0 || document.referrer.indexOf('/banned')>-1 || (location.pathname.indexOf('/comments')>-1 && _$.$c('b-tag_add_form').length == 0)){
		var posts = _$.$c("dt").concat(_$.$c("c_body"));
		//problem: the table has collisions
		var table = {
			'Ð»Ð¾Ð¿Ð°ÑÐ¾Ð¹':'лопатой',
			'Ð´Ð¾':'до',
			'Ð·Ð°':'за',
			'ÐÐºÑÑÐ±ÑÑ':'Октября',
			'ÐÐ¾ÑÐ±ÑÑ':'Ноября',
			'Ð¡ÐµÐ½ÑÑÐ±ÑÑ':'Сентября',
			'ÐÐ²Ð³ÑÑÑÐ°':'Августа',
			'ÐÑÐ»Ñ':'Июля',
			'ÐÐ¾':'Во',
			'ÑÐ°Ð·':'раз',
			//now we have tried our best
			'Ð°':'а',
			'Ð±':'б',
			'Ð²':'в',
			'Ð³':'г',
			'Ð´':'д',
			'Ðµ':'е',
			'Ñ‘':'ё',
			'Ð¶':'ж',
			'Ð·':'з',
			'Ð¸':'и',
			'Ð¹':'й',
			'Ðº':'к',
			'Ð»':'л',
			'Ð¼':'м',
			'Ð½':'н',
			'Ð¾':'о',
			'Ð¿':'п',
			'Ñ€':'р',
			'Ñƒ':'у',
			'Ñ„':'ф',
			'Ñ…':'х',
			'Ñ†':'ц',
			'Ñ‡':'ч',
			'Ñˆ':'ш',
			'Ñ‰':'щ',
			'ÑŠ':'ъ',
			'Ñ‹':'ы',
			'ÑŒ':'ь',
			'ÑŽ':'ю',
			'Ñ‚':'т',
			'Ñ':'с',
			'Ñ':'э',
			'Ñ':'я',
			'Ð':'А',
			'Ð‘':'Б',
			'Ð’':'В',
			'Ð“':'Г',
			'Ð”':'Д',
			'Ð•':'Е',
			'Ð':'Ё',
			'Ð–':'Ж',
			'Ð—':'З',
			'Ð˜':'И',
			'Ð™':'Й',
			'Ðš':'К',
			'Ð›':'Л',
			'Ðœ':'М',
			'Ðž':'О',
			'ÐŸ':'П',
			'Ð ':'Р',
			'Ð¡':'С',
			'Ð¢':'Т',
			'Ð£':'У',
			'Ð¤':'Ф',
			'Ð¥':'Х',
			'Ð¦':'Ц',
			'Ð§':'Ч',
			'Ð¨':'Ш',
			'Ð©':'Щ',
			'Ðª':'Ъ',
			'Ð«':'Ы',
			'Ð¬':'Ь',
			'Ð­':'Э',
			'Ð®':'Ю',
			'Ð¯':'Я',
			'Ð':'Н',
			//some more tries
			'Ð':'В'
		};

		for(var i=0;i<posts.length;i++){
			txt_str = posts[i].innerHTML;
			for(var index in table) txt_str = txt_str.split(index).join(table[index]);
			posts[i].innerHTML = txt_str;
		}
	}
}

//как там всё - tool
if(_$.settings.links_test=='1'){
	if(location.pathname.indexOf('/write/')==0){
		function addIframe(e){
			var form = _$.$(e.target.getAttribute('onclick').split("$('")[1].split("')")[0]);
			var comment = _$.$t('textarea',form)[0].value;
			
			link = "";
			var arr = _$.$t('input',form);
			for(var i=0;i<arr.length;i++){
				if(arr[i].name == "link")link = arr[i].value;
			}
			if(link == "http://")	link="";
			
			var div = document.createElement('div');
			div.setAttribute("id", "d3search-postinfo");
			div.setAttribute("class", "userstat");
			if(_$.$('d3search-postinfo')!=null)_$.$('d3search-postinfo').parentNode.removeChild(_$.$('d3search-postinfo'));
			form.insertBefore(div, _$.$c("submit_btn", form)[0]);
			
			_$.injectScriptUrl("http://d3search.ru/wazzup?post="+encodeURIComponent(comment)+"&link="+encodeURIComponent(link)+"&container=d3search-postinfo");
		}
		
			for(var i=0;i<4;i++){
				var prevButton = _$.$c('preview_btn')[i].getElementsByTagName('img')[0];
				_$.addEvent(prevButton, 'click', addIframe);
			}
			
			//hide preview if broken
			window.setInterval(function(){
				var pre = _$.$c('write_form_preview')[0];
				if(pre.innerHTML.indexOf('/error/1.jpg')>-1){
						pre.innerHTML = 'Родной просмотр выдал ошибку.';
				}
			}, 200);
	}
}

//Замена поиска
if(_$.settings.d3search=='1'){
	var searchDiv = _$.$c('header_search',document.body,'div');
	if(searchDiv.length == 1){
		searchDiv[0].innerHTML = '\
				<form name="simple-search" action="http://d3search.ru/search" '+((_$.settings.new_window=='1')?'target="_new" ':'')+'method="get">\
					<div class="header_search_input"><input type="text" defaultValue="поиск на d3search.ru" id="js-header_search_input_new" value="поиск на d3search.ru" name="query" class="text_input"></div>\
					<input class="header_search_submit" type="image" src="/i/header_search_icon.gif">\
				</form>';
			_$.injectScript("utils.focusText('js-header_search_input_new', 'поиск на d3search.ru');");	
	}
}

//Karma Log
if(_$.settings.karma_log=='1'){
	if(location.pathname.indexOf('/user')==0){
		function carmaUpdate(e){
			//alert(e.target.style.backgroundColor);
			waitUntilVoted(e.target, _$.$c('vote_result')[0].innerHTML);
		}

		function waitUntilVoted(elem, oldValue){
			if(elem.className.indexOf("js-lh_active") > -1){
				window.setTimeout(function(){waitUntilVoted(elem, oldValue);}, 100);
			}else{
				var newValue = _$.$c('vote_result')[0].innerHTML;
				if((newValue-oldValue) > 0){
					updateEntry(1);
				}else if((newValue-oldValue) < 0){
					updateEntry(-1);
				};
			}
		}

		function updateEntry(value){
			var oldtext = _$.$('js-usernote').firstChild.nodeValue;
			if(oldtext == "Место для заметок о пользователе. Заметки видны только вам.")oldtext = "";
			var d = new Date();
			date = "["+d.getDate()+"."+(d.getMonth()+1)+"."+d.getFullYear()+"]";
			var newEntry = true;
			if(value>0){var sign="+";}else{var sign="-";}
			value = Math.abs(value);
			if(oldtext.substr(0,date.length) == date){
				oldsign = oldtext.substr(date.length+7, 1);
				olddelta = parseInt(oldtext.substr(date.length+8, 1));
				if(oldsign == sign){
					_$.$('js-usernote').firstChild.nodeValue = oldtext.substr(0, date.length+8) + (olddelta+value) + oldtext.substr(date.length+9);
					newEntry = false;
				}
			}
			if(newEntry){
				var reason = prompt("Почему?", "");
				if(reason == null){reason = "";};
				_$.$('js-usernote').firstChild.nodeValue = date+' Карма '+sign+Math.abs(value)+': '+reason.replace(/\./g, "")+'. '+oldtext;
			}
			_$.fireEvent(_$.$('js-usernote'), 'click');
			_$.fireEvent(document, 'click');
		}

		if(_$.$c("vote_button_plus_left")[0])_$.addEvent(_$.$c("vote_button_plus_left")[0], "click", carmaUpdate);
		if(_$.$c("vote_button_plus_right")[0])_$.addEvent(_$.$c("vote_button_plus_right")[0], "click", carmaUpdate);
		if(_$.$c("vote_button_minus_left")[0])_$.addEvent(_$.$c("vote_button_minus_left")[0], "click", carmaUpdate);
		if(_$.$c("vote_button_minus_right")[0])_$.addEvent(_$.$c("vote_button_minus_right")[0], "click", carmaUpdate);

		var updatesPending = 0;
	
	}
}
	
//Youtube preview
if(_$.settings.youtube_preview=='1'){
		function addPreview(comments){
			var comment_links = comments.getElementsByTagName('a');
			var youtube_links = new Array();
			for(var i=0; i<comment_links.length; i++){
				if(comment_links[i].href.split("youtube.com/").length>1){
					youtube_links.push(comment_links[i]);
				}
		}
		width = 480;
		var height = 385;
		var button = '<div style="display:inline-block; position:relative; top: -'+(height-14)+'px; left: 2px; background: #999 url(http://pit.dirty.ru/dirty/1/2010/04/24/11119-071559-e56ce92235e2c35c7531f9cb843ffa0d.png) no-repeat;width:36px;height:20px;font-size:12px;line-height:20px;text-align:center;color:#fff;cursor:pointer"><b style="color: #FFF;">x</b></div>';
		//process youtube links
		for(var i=0; i<youtube_links.length; i++){
			var link = youtube_links[i];
			_$.addEvent(link,'click',function(e){
					var re = processUrl(this.href);
					if(re != false){
						youtube_id = re.id;
						time = re.time;
						if(this.name == ""){
							if(this.parentNode.tagName.toLowerCase()=="td"){
								//it`s a video-post preview
								this.parentNode.setAttribute('name', this.parentNode.width);
								this.parentNode.setAttribute('width', width+46);
							}
							this.setAttribute('name', this.innerHTML);
							this.style.textDecoration = "none";
							this.innerHTML = '<span style="display:inline-block; clear: both; width: '+(width+36)+'px; "><span><object width="'+width+'" height="'+height+'"><param name="movie" value="http://www.youtube.com/v/'+id+'?autoplay=1&start='+time+'&fs=1"></param><param name="allowFullScreen" value="true"></param></param><param name="allowScriptAccess" value="always"></param><embed src="http://www.youtube.com/v/'+id+'?autoplay=1&start='+time+'&fs=1" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width+'" height="'+height+'"></embed></object></span>'+button+'</span>';
						}else{
							if(this.parentNode.tagName.toLowerCase()=="td"){
								//it`s a video-post preview
								this.parentNode.setAttribute('width', this.parentNode.getAttribute('name'));
							}
							this.innerHTML = this.getAttribute('name');
							this.style.textDecoration = "underline";
							this.setAttribute('name', "");
						}
						e.preventDefault();
						return false;
					}
				}
			);
		}
	}


		function documentChanged(event) {
			if (supressEvents) {
				return;
			}			
			if(event.target.className != null && event.target.className.indexOf("comment")>-1){
				addPreview(event.target);
			}
		}

		//handle video-posts
		//step 1: add youtube links to video posts
		var video_posts = _$.getElementsByClassName('post_video');
		for(var i=0;i<video_posts.length;i++){
			var post = video_posts[i];
			var image_link = post.style.backgroundImage;
			if(image_link.search("youtube.com")>-1){
				image_link = post.style.backgroundImage.split("url(")[1].split(")")[0];
				image_link = image_link.replace('"','')
				var url = image_link.split("/vi/")[1].split("/")[0];
				post.style.backgroundImage = "";
				post.style.paddingLeft = 0;
				post.innerHTML = '<table style="display: block;"><tr><td width="150"><a href="http://www.youtube.com/watch?v='+url+'"><img src="'+image_link+'"/></a></td><td>'+post.innerHTML+'</td></tr></table>';
				//step 2: add previews
				//addPreview(post);	
			}
		}

		//var comments = _$.$('js-comments');
		var comments = document.body;
		if(comments != null){
			addPreview(comments);
		}

		//handle new ajax-generated content
		_$.addEvent(document,"DOMNodeInserted", documentChanged);
	}

	
//dirty tags
if(_$.settings.dirty_tags=='1'){
		function vTagsGetCursor(input)
		{
				var result = {start: 0, end: 0};
				if (input.setSelectionRange)
				{
						result.start= input.selectionStart;
						result.end = input.selectionEnd;
				} else if (!document.selection) 
				{
						return false;
				} else if (document.selection && document.selection.createRange) 
				{
						var range = document.selection.createRange();
						var stored_range = range.duplicate();
						stored_range.moveToElementText(input);
						stored_range.setEndPoint('EndToEnd', range);
						result.start = stored_range.text.length - range.text.length;
						result.end = result.start + range.text.length;
				}
				return result;
		}

		function vTagsSetCursor(txtarea, start, end)
		{
				if(txtarea.createTextRange) 
				{
						var range = txtarea.createTextRange();
						range.move("character", start);
						range.select();
				} 
				else if (txtarea.selectionStart) 
				{
						txtarea.setSelectionRange(start, end);
				}
		}

		function vTIns_tag(startTag, endTag, elementId)
		{
				var txtarea = document.getElementById( elementId );
				txtarea.focus();
				var scrtop = txtarea.scrollTop;
				var cursorPos = vTagsGetCursor(txtarea);
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
				vTagsSetCursor(txtarea,nuCursorPos,nuCursorPos);
				if (scrtop) txtarea.scrollTop=scrtop;
		}

		function vTIns_text(tagName, elementId)
		{
				var startTag = '<' + tagName + '>';
				var endTag = '</' + tagName + '>';
				vTIns_tag(startTag, endTag, elementId);
				return false;
		}

		function vTIns_image( elementId)
		{
				var src = prompt('enter image src', 'http://');
				if(src)
				{
						vTIns_tag('<img src="' + src + '" alt="image">', '', elementId);
				}
		}


		function vTIns_link( elementId)
		{
				var href = prompt('enter a href', 'http://');
				if(href)
				{
						vTIns_tag('<a href="' + href + '">', '</a>', elementId);
				}
		}

		function vTagsManage( vTagAnchor )
		{
			vTagsNoPnt1 = vTagAnchor.title.replace( /(,\s)/ig, ' ');
			vTagsNoPnt = vTagsNoPnt1.replace( /,/ig, ' ');
			if (vTagAnchor.innerHTML == 'x' )
			{ 
				vTagAnchor.innerHTML = '-'; 
				$('js-new_tag_input').value = vTagsNoPnt; 
				tagsHandler.submitTag(); 
			} 
			else 
			{ 	
				vTagAnchor.innerHTML = 'x' ; 
				tagsHandler.deleteTag( $('js-tags_private'), vTagsNoPnt );
			}
			return false;
		}

		function vTagsLoadTagsFromLS( vTagsArrLocalStore )
		{
			// load values
			if ( ! vTagsArrLocalStore )
			{
				vTagsArrLocalStore = localStorage.getItem('vTagsStore' );
			}
			var vTagsLocalStoreArray = vTagsArrLocalStore.split("\n");
			
			//workaround for opera with 0x10 code at the end of stings
			if ( vTagsLocalStoreArray.length > 0 )
			{		
				if ( vTagsLocalStoreArray[0].charAt( vTagsLocalStoreArray[0].length -1 ) == "\r" )
				{
					for ( i = 0; i < vTagsLocalStoreArray.length; i++ )
					{	
						if ( vTagsLocalStoreArray[i].charAt( vTagsLocalStoreArray[i].length -1 ) == "\r" )
						{
							var r = vTagsLocalStoreArray[i].replace(/\r/g,'');
							vTagsLocalStoreArray[i] = r;
						}	
					}
				}
			}

			//load settings
			var vTagsFloatCloud = vHtfGetItemLocalStore('vTagsFloatCloud', 1 );

			// fastjoin tags part
			// get my user name
			var vTagsMyName;
			var vTagsDivHTI = document.getElementsByClassName('header_tagline_inner');
			if ( vTagsDivHTI )
			{
				vTagsDivHTI = document.getElementsByTagName('a');
				vTagsMyName = vTagsDivHTI[0].text;
			}
			// get list of public tags
			var vTagsJoinDiv = document.getElementById('js-tags_public');
			var vTagsListString = vTagsLocalStoreArray.toString();
			if ( vTagsJoinDiv )
			{
				var vTagsPubLi = vTagsJoinDiv.getElementsByTagName('li');
				if ( vTagsJoinDiv )
				{
					var vTagsPubA;
					for ( i = 0; i < vTagsPubLi.length; i++ )
					{				
						vTagsPubA = vTagsPubLi[i].getElementsByTagName('a');
						if ( vTagsPubA )
						{
							if ( vTagsPubA[0].title.indexOf( vTagsMyName ) < 0 )
							{	
								if ( vTagsListString.search( new RegExp( vTagsPubA[0].text,'i') ) < 0 )
								{
									vTagsLocalStoreArray.unshift( vTagsPubA[0].text );
								}
							}
						}
					}					
				}
			}
			//


			//
			var vTagsDiv = document.querySelector('div.b-i-tags_comments_page');
			var vTagsMyDiv;
			if ( vTagsDiv )
			{
				vTagsMyDiv = document.getElementById('js-tags-script-predefines');
				if ( vTagsMyDiv )
				{
					vTagsDiv.removeChild( vTagsMyDiv );
				}
				vTagsMyDiv = document.getElementById('js-tags-script-floatlink');
				if ( vTagsMyDiv )
				{
					vTagsDiv.removeChild( vTagsMyDiv );
				}
			}



			vTagsMyDiv = document.createElement('div');
			vTagsMyDiv.setAttribute('id','js-tags-script-floatlink');
			vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: block;');
			if ( vTagsFloatCloud == 1 )
			{
				vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: block;');
			}
			else
			{
				vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: none;');
			}
			vTagsDiv.appendChild( vTagsMyDiv );
			vTagsMyDiv.innerHTML += "<a href=\"#\" onclick=\"var e = document.getElementById('js-tags-script-predefines');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;\" class=\"dashed\">список тегов</a><br><br>";


			vTagsMyDiv = document.createElement('div');
			vTagsMyDiv.setAttribute('id','js-tags-script-predefines');
			if ( vTagsFloatCloud == 1 )
			{
				vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: none;');
			}
			else
			{
				vTagsMyDiv.setAttribute('style', 'font-size: 12px; display: block;');
			}
			vTagsDiv.appendChild( vTagsMyDiv );

			if ( vTagsLocalStoreArray.length > 0 )
			{
				var vTagsUserName;
				var vTagsDd = document.querySelector('div.dd');
				if ( vTagsDd )
				{ 
					var vTagsListA = vTagsDd.querySelectorAll('a');
					for ( n =0; n < vTagsListA.length; n++ )
					{
						if ( vTagsListA[n].href.search('user') >= 0 )
						{
							vTagsUserName = vTagsListA[n].text + " молодец!";
						}
					} 
				}
				if ( vTagsUserName.length > 0 ) 
				{
					vTagsLocalStoreArray.push( vTagsUserName );
				}

				for ( i = 0; i < vTagsLocalStoreArray.length; i++ )
				{
					vTagsMyDiv.innerHTML += "<a href=\"#\" onclick=\"$('js-new_tag_input').value = '" + vTagsLocalStoreArray[i] + "'; tagsHandler.submitTag(); return false;\" title=\"" + vTagsLocalStoreArray[i] + "\">" + vTagsLocalStoreArray[i] +   "</a>";
					if (( vTagsLocalStoreArray.length - 1 ) != i )
					{
						vTagsMyDiv.innerHTML += " . ";
					}			
				}
				vTagsMyDiv.innerHTML += "<br><br>";
			}
		}

		function vHtfGetItemLocalStore( vHtfName, vHtfDefault )
		{
				vHtfTemp = localStorage.getItem( vHtfName );
				if ( vHtfTemp == null )
				{
						vHtfTemp = vHtfDefault;
				}
				return vHtfTemp;    
		}

		function checkGoldTag()
		{

			var vTagsSpan = document.querySelector('span.stars');
			var vTagsStarFound = false;
			if ( vTagsSpan )
			{
				vTagsStarFound = true; //gold	
			}
			else
			{
				vTagsSpan = document.querySelector('span.wasstars');
				if ( vTagsSpan )
				{
					vTagsStarFound = true; //silver
				}
			}

			var vTagsStarTagAdded = false;
			var vTagsDiv = document.querySelector('div#js-tags_private');
			if ( vTagsDiv )
			{
				var vTagsPersonal = vTagsDiv.getElementsByClassName('tag');
				if ( vTagsPersonal )
				{
					for ( i =0; i < vTagsPersonal.length; i++ )
					{
						if ( vTagsPersonal[i].text.search(/Золотой пост/i) >= 0 )
						{
							vTagsStarTagAdded = true;
						}
					}
				}
			}
			if ( vTagsStarFound  == true && vTagsStarTagAdded  == false )
			{
				// add  gold
				var vTagBox = document.getElementById('js-new_tag_input');
				vTagBox.value = 'Золотой пост';
				location.href="javascript:void( tagsHandler.submitTag());"				
			}
		}
				// script start
		// Jovan premium and write buttons
		if(( document.location.href.indexOf("music") > 0 || document.location.href.indexOf("comments") == -1 ) && document.location.href.indexOf("inbox") == -1 )
		{
			if( document.location.href.indexOf("music.dirty.ru/comments") > 0 || document.location.href.indexOf("write") > 0 )  
			{ //write buttons

				// add script to the page
				var vTagsScr=document.createElement("script");
				vTagsScr.type="application/javascript";
				vTagsScr.textContent = vTagsGetCursor + "\n" + vTagsSetCursor + "\n" + vTIns_tag + "\n" + vTIns_text + "\n" + vTIns_image + "\n" + vTIns_link;
				document.body.appendChild( vTagsScr );

				
				var vTagsInputs =  document.getElementsByTagName('form');

				var vTagID;
				if ( vTagsInputs )
				{
					for ( i =0; i < vTagsInputs.length; i++ )
					{
						vTagID = 'cmnt_' + vTagsInputs[i].getAttribute('id');
						vTagsTextAreaDiv = vTagsInputs[i].querySelector('textarea');
						if ( vTagsTextAreaDiv )
						{
							vTagsTextAreaDiv.setAttribute('id',vTagID);

							if ( document.location.href.indexOf("music") >= 0 )
							{ 
								vTagTab1 = vTagsInputs[i].querySelector('table');
								vTagTab2 = vTagTab1.querySelector('table');
								vTagsTextAreaWriteHdr = vTagTab2.querySelector('td');
							}
							else
							{
								vTagsTextAreaWriteHdr = vTagsInputs[i].querySelector('div.write_page_header_right');
							}

							if (vTagsTextAreaWriteHdr )
							{
								var newdiv = document.createElement('div');
								newdiv.setAttribute('class', 'textarea_editor');
								newdiv.setAttribute('style', 'textarea_editor');
								newdiv.innerHTML = "<br><a onclick=\"return vTIns_text('b', '" + vTagID + "');\" href=\"#\"><b>Bold</b></a>&nbsp;<a onclick=\"return vTIns_text('i', '" + vTagID + "');\" href=\"#\"><i>Italic</i></a>&nbsp;<a onclick=\"return vTIns_text('u', '" + vTagID + "');\" href=\"#\"><u>Underline</u></a>&nbsp;<a onclick=\"return vTIns_text('sup', '" + vTagID + "');\" href=\"#\">x<sup>2</sup></a>&nbsp;<a onclick=\"return vTIns_text('sub', '" + vTagID + "');\" href=\"#\">x<sub>2</sub></a>&nbsp;<a onclick=\"return vTIns_text('irony', '" + vTagID + "');\" href=\"#\"><span class=\"irony\">Irony</span></a><span class=\"textarea_editor_divider\">&nbsp;</span><a onclick=\"vTIns_link('" + vTagID + "'); return false;\" href=\"#\"><b>Link</b></a>&nbsp;<a onclick=\"vTIns_image('" + vTagID + "'); return false;\" href=\"#\"><b>Image</b></a>";
								vTagsTextAreaWriteHdr.appendChild( newdiv );
							}
						}
					}
				}

			} //write buttons
			else
			{ // Jovan premium
				vTagsJovanPremium = localStorage.getItem('vTagsJovanPremium' );
				if ( vTagsJovanPremium == 1 )
				{
					var vTagsPosts = document.getElementsByClassName('dt');
					if ( vTagsPosts )
					{
						var vTagsH3;
						var vTagsIMG;	
						for(var i=0; i < vTagsPosts.length; i++)
						{	
							vTagsH3 = vTagsPosts[i].getElementsByTagName('h3');
							vTagsIMG = vTagsPosts[i].getElementsByTagName('img');
							if (( vTagsH3.length > 0 ) && ( vTagsIMG.length > 0 )) 
							{	
								vTagsIMG[0].setAttribute('style', 'display: none;');
							}
						}
					}
				}
			} // Jovan premium
		} // Jovan premium and write buttons
		else
		{  // Everything else

			// add script to the page
			var vTagsScr=document.createElement("script");
			vTagsScr.type="application/javascript";
			vTagsScr.textContent = vTagsLoadTagsFromLS + "\n" + vTagsManage  + "\n" + vHtfGetItemLocalStore;
			document.body.appendChild( vTagsScr );
				
			//predefined tags
			var vTagsPredefinedArray =["Тупая фигня", "Это же реклама" , "Это неправда", "Об этом уже писали", "Ctrl-C Ctrl-V", "Свежак", "КДПВ", "Скандалы интриги расследования", "Все правильно сделал", "Фишкинет", "Господи какая красота111", "британские учёные", "Чиновники", "Милиция","Оборотни","Беспредел","Наука","Космос","Искусство","История","Авто","Авиация","Армия","РПЦ","Маразм","Кругом враги","Животные","fapfapfap","боже он умер","Вавилонская библиотека","вирусняк","Гурусик нямка","Думаем о России","пост проклят","еще один все понял","и снова о Главном","Зачем моё измождённое тело","слава богу родился","лепрозорий на выезде","нафталин","ожируй клюв","он же упоротый","политический кружок при сельском клубе","слава России","Творчество душевнобольных","понаехали","Я маленькая лошадка","Я открыл для себя википедию" ];


			var vTagsFloatCloud;
			var vTagsAutoSetGold;
			var vTagsJovanPremium;

			//build divs
			var vTagsDiv = document.querySelector('div.b-i-tags_comments_page');
			if ( vTagsDiv )
			{
				vTagsDiv.setAttribute('style', 'padding-top: 10px' );

				var vTagsArrRestor = localStorage.getItem('vTagsStore' );		

				if ( ! vTagsArrRestor )
				{	
					var vTagsArrToStr = vTagsPredefinedArray.toString();
					vTagsArrRestor = vTagsArrToStr.replace(/,/gi,'\n');
					localStorage.setItem('vTagsStore', vTagsArrRestor );
				}
				
				// load options
				vTagsFloatCloud = vHtfGetItemLocalStore('vTagsFloatCloud', 1 );
				vTagsAutoSetGold = vHtfGetItemLocalStore('vTagsAutoSetGold', 1 );
				vTagsJovanPremium = vHtfGetItemLocalStore('vTagsJovanPremium', 0 );

				// create options to edit
				newdiv = document.createElement('div');
				newdiv.setAttribute('style', 'font-size: 12px; display: none;');
				newdiv.setAttribute('id','js-vtags-settings');
				var vTagsSettings = "<form><input type=\"checkbox\" id=\"vtags-float-cloud\" name=\"vtags-float-cloud\" onchange=\" var e = document.getElementById('vtags-float-cloud'); if ( e.checked == true ) { localStorage.setItem('vTagsFloatCloud', 1 ); } else {  localStorage.setItem('vTagsFloatCloud', 0 ); return false; } \"";
				if ( vTagsFloatCloud == 1 )
				{
					vTagsSettings += " checked";
				}
				vTagsSettings += ">скрывать теги под ссылкой</form>";
				
				vTagsSettings += "<input type=\"checkbox\" id=\"vtags-autoset-gold\" name=\"vtags-autoset-gold\" onchange=\" var e = document.getElementById('vtags-autoset-gold'); if ( e.checked == true ) { localStorage.setItem('vTagsAutoSetGold', 1 ); } else {  localStorage.setItem('vTagsAutoSetGold', 0 ); return false; } \"";
				if ( vTagsAutoSetGold == 1 )
				{
					vTagsSettings += " checked";
				}
				vTagsSettings += ">автоматически ставить 'Золотой пост'</form><br>";

				vTagsSettings += "<input type=\"checkbox\" id=\"vtags-jovan-premium\" name=\"vtags-jovan-premium\" onchange=\" var e = document.getElementById('vtags-jovan-premium'); if ( e.checked == true ) { localStorage.setItem('vTagsJovanPremium', 1 ); } else {  localStorage.setItem('vTagsJovanPremium', 0 ); return false; } \"";
				if ( vTagsJovanPremium == 1 )
				{
					vTagsSettings += " checked";
				}
				vTagsSettings += ">опция 'Йован-Премиум'</form><br><br>";


				newdiv.innerHTML = vTagsSettings;
				vTagsDiv.appendChild(newdiv);


				// create list of tags to edit
				newdiv = document.createElement('div');
				newdiv.setAttribute('style', 'font-size: 12px; display: none;');
				newdiv.setAttribute('id','js-vtags-textarea');
				newdiv.innerHTML = "<textarea rows=\"32\" cols=\"40\" id=\"vtags-own-tags\" style=\"font-size: 12px;\"></textarea><br><br>";
				newdiv.innerHTML += "<a href=\"#\" onclick=\"var a = document.getElementById('vtags-own-tags'); localStorage.setItem('vTagsStore', a.value ); var e = document.getElementById('js-vtags-textarea'); e.style.display = 'none'; vTagsLoadTagsFromLS(); return false;\" class=\"dashed\"><img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-165319-dab6dbe746b938b30cc807225bee1e65.png\" width=\"16\" height=\"16\" hspace=\"5\" vspace=\"3\" border=\"0\" align=\"top\">сохранить мой список</a><br><br>";
				vTagsDiv.appendChild(newdiv);

				var vTagsTextArea = document.getElementById('vtags-own-tags');
				if ( vTagsTextArea )
				{	
					if ( vTagsArrRestor )
					{				
						vTagsTextArea.value = vTagsArrRestor;				
					}
				}

				// create link to edit tags
				vTagsTextArea = document.querySelector('div.b-tag_add_form');
				var vTagsDiv = null;
				if(vTagsTextArea)vTagsDiv = vTagsTextArea.getElementsByTagName('form');
				if ( vTagsDiv )
				{
					newdiv = document.createElement('a');
					newdiv.setAttribute('style', 'margin-left: 10px;');
					newdiv.setAttribute('class', 'dashed');
					newdiv.setAttribute('href', '#');
					newdiv.innerHTML = "<img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-162705-21ac0118341f8bfd711a91b3a893af67.png\" width=\"16\" height=\"16\" border=\"0\">";
					newdiv.setAttribute('onclick', "var e = document.getElementById('js-vtags-textarea');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;");
					vTagsDiv[0].appendChild(newdiv);

					newdiv = document.createElement('a');
					newdiv.setAttribute('style', 'margin-left: 10px;');
					newdiv.setAttribute('class', 'dashed');
					newdiv.setAttribute('href', '#');
					newdiv.innerHTML = "<img src=\"http://pit.dirty.ru/dirty/1/2010/07/18/28284-165149-fb96462198f99265989370ce36a58246.png\" width=\"16\" height=\"16\" border=\"0\">";
					newdiv.setAttribute('onclick', "var e = document.getElementById('js-vtags-settings');  if(e.style.display == 'block') e.style.display = 'none'; else e.style.display = 'block'; return false;");
					vTagsDiv[0].appendChild(newdiv);
				}

				// build my own tags
				vTagsLoadTagsFromLS( vTagsArrRestor );
			}




			// fast tags part
			// regexp based on http://leprosorium.ru/users/antyrat script
			var vTagPattern = /([^:\s\.\>\<][\wа-яёЁ\-\–\—\s\!\?,]+)(\[x\]|\s\[x\]|\s\[х\]|\[х\])+/gi;
		//	var vTagReplacement = "$1 [<a href=\"#\" onclick=\"if ( this.innerHTML == 'x' ) { this.innerHTML = '-'; $('js-new_tag_input').value = '$1'; tagsHandler.submitTag(); } else { this.innerHTML = 'x' ; tagsHandler.deleteTag( $('js-tags_private'), '$1'); }  return false;\" title=\"$1\" style=\"color: red;\">x</a>]";
			var vTagReplacement = "$1 [<a href=\"#\" onclick=\"return vTagsManage(this);\" title=\"$1\" style=\"color: red;\">x</a>]";

			var vTagStr;
			var vTagComments = document.getElementsByClassName('c_body');
			var vTagsXPos;
			var vTagStr;
			for(var i=0; i < vTagComments.length; i++)
			{
					vTagStr = vTagComments[i].innerHTML;
					vTagsXPos = vTagStr.indexOf('[x]');
					if ( vTagsXPos < 0 ) 
					{
						vTagsXPos = vTagStr.indexOf('[X]');
					}
					if ( vTagsXPos < 0 ) 
					{
						vTagsXPos = vTagStr.indexOf('[х]');
					}
					if ( vTagsXPos < 0 ) 
					{
						vTagsXPos = vTagStr.indexOf('[Х]');
					}	
					if ( vTagsXPos > 0 ) 
					{	
						vTagStr = vTagStr.replace( /(\&nbsp\;)+/gi,' ');
						vTagComments[i].innerHTML = vTagStr.replace(vTagPattern, vTagReplacement);
					}
			}

			






			if ( vTagsAutoSetGold == 1 )
			{
				document.onLoad = checkGoldTag();
			}

		}
	}

	//comment threshold
	if(_$.settings.comment_threshold=='1'){
		var _dct = {
				comments : {},
				settings : {},
				curr_select_numb : 0,
				comm_order : 1, // 1 for tree, 2 for linear, 3 for back-ordered linear
				tree_order : [],
				list_order : [],
				list_reverse : [],
				isPostPage : false,
				isInboxPage : false,

				set_save : function (){
						var params = '';
						var not_first = '';
						for (i in _dct.settings) {
								params = params + not_first+i+":"+_dct.settings[i];
								not_first = ',';
						}
						document.cookie = "comm_thresh.settings_nd="+escape('{'+params+'}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
				},

				set_get : function (){
						if(document.cookie.indexOf('comm_thresh.settings_nd=')>-1){
								var param = unescape(document.cookie.split('comm_thresh.settings_nd=')[1].split(";")[0]);
								eval("_dct.settings="+unescape(param));

						} else {
								_dct.settings.threshold = -1000;
								// 1 - by votes, 2 - by percents
								_dct.settings.thresh_type = 1;
								_dct.settings.thresh_step = 10;
								_dct.settings.opt_count = 4;
								_dct.settings.picts_always = 0;
						}
				},

				toggle_div : function (name,param){
						if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
						else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
				},

				getElementsByClassAndTag : function(name, tag, obj) {
						var obj = obj||document;
						var result = [];
						var allElements = obj.getElementsByTagName(tag);
						for(var i=0; i<allElements.length; i++){
								if(allElements[i].className && allElements[i].className==name){
										result[result.length] = allElements[i];
								}
						}
						return result;
				},

				getPositiveAverage : function () {
						var sum = 0;
						for (var i=1; i<_dct.comments.length; i++) {
								if (_dct.comments[i].vote>0) {
										sum += _dct.comments[i].vote;
								}
						}
						return sum/_dct.comments.length;
				},

				getIntFromPrompt : function (msg, curr_val) {
					 var result = prompt(msg, curr_val)
					 if (result==null) {
								return false;
					 }

					 if (!result) {
								alert('Имело смысл что-нибудь ввести!');
								return false;
					 }

					 result = parseInt(result);
					 if (!result) {
								alert('Невнятное число!');
								return false;
					 }
					 return result;
				},

				onChangeThreshold : function () {
						var new_sel = document.getElementById('thres_select_'+_dct.curr_select_numb);

						if (new_sel.value == 'set_step') {
								var result = _dct.getIntFromPrompt("Новое значение шага:", _dct.settings.thresh_step)
								if (result) {
										_dct.settings.thresh_step = result;
								}
								new_sel.options[0].selected = true;
								_dct.replaceSelect();
						} else if (new_sel.value == 'set_type') {
								_dct.settings.thresh_type = (_dct.settings.thresh_type==1) ? 2:1;
								_dct.replaceSelect();
						} else if (new_sel.value == 'set_opt_count') {
								var result = _dct.getIntFromPrompt("Количество опций:", _dct.settings.opt_count)
								if (result) {
										if (result<=0) {
												result = 1;
										}
										_dct.settings.opt_count = result;
								}
								new_sel.options[0].selected = true;
								_dct.replaceSelect();
						} else if (new_sel.value == 'set_pict_filter') {
								_dct.settings.picts_always = (_dct.settings.picts_always==0) ? 1:0;
								_dct.replaceSelect();
						}else {
								_dct.settings.threshold = new_sel.value;
						}
						_dct.set_save();
						_dct.refreshComments();
				},

				replaceSelect : function () {
						var toggle_type_to = "В процентах от среднего!";
						var picts_filtering = "Фильтровать картинки!";
						var thresh_suffix = " голосов";
						if (_dct.settings.thresh_type==2) {
								toggle_type_to = "В голосах!";
								thresh_suffix = "%";
						}

						if (_dct.settings.picts_always==0) {
								picts_filtering = "Показать картинки!";
						}

						if (_dct.curr_select_numb==0) {
								curr_select_node_name = 'comments-threshold'
						} else {
								curr_select_node_name = 'div_select_'+_dct.curr_select_numb;
						}
						_dct.curr_select_numb++;

						var curr_sel_node = document.getElementById(curr_select_node_name);
						var new_sel = document.createElement("SELECT");

						if (navigator.appName == "Opera") {
								new_sel.className = "hidden";
								new_sel.onchange = function(){_dct.onChangeThreshold()};
						} else {
								new_sel.addEventListener('change', _dct.onChangeThreshold, false);
						}

						new_sel.length = 5+_dct.settings.opt_count;
						new_sel.name='thres_select_'+_dct.curr_select_numb;
						new_sel.id='thres_select_'+_dct.curr_select_numb;
						new_sel.options[0].text = "Все";
						new_sel.options[0].value = "-1000";

						var selected = false;
						for (var i=1; i<=_dct.settings.opt_count; i++) {
								new_sel.options[i].text = "Больше "+(_dct.settings.thresh_step*i)+thresh_suffix;
								new_sel.options[i].value = _dct.settings.thresh_step*i;

								if (_dct.settings.threshold == _dct.settings.thresh_step*i) {
										new_sel.options[i].selected = true;
										selected = true;
								}
						}
						if (!selected) {
								new_sel.options[0].selected = true;
						}
						new_sel.options[_dct.settings.opt_count+1].text = toggle_type_to;
						new_sel.options[_dct.settings.opt_count+1].value = 'set_type';
						new_sel.options[_dct.settings.opt_count+2].text = "Сменить шаг...";
						new_sel.options[_dct.settings.opt_count+2].value = "set_step";
						new_sel.options[_dct.settings.opt_count+3].text = "Число опций...";
						new_sel.options[_dct.settings.opt_count+3].value = "set_opt_count";
						new_sel.options[_dct.settings.opt_count+4].text = picts_filtering;
						new_sel.options[_dct.settings.opt_count+4].value = "set_pict_filter";

						var new_div = document.createElement("FORM");
						new_div.name='div_select_'+_dct.curr_select_numb;
						new_div.id='div_select_'+_dct.curr_select_numb;
						new_div.appendChild(new_sel);
						curr_sel_node.parentNode.replaceChild(new_div, curr_sel_node);

						if (navigator.appName == "Opera") {
								new futuSelect('thres_select_'+_dct.curr_select_numb);
						}
				},

				replaceParentLinks : function() {
						var allLinks=document.getElementsByTagName('a');
						for (var i=0; i<allLinks.length; i++) {
								if (allLinks[i].className=='c_parent') {
										var oncl = allLinks[i].getAttribute("onclick");
										if (!oncl) {
												continue;
										}
										var s = oncl.indexOf("'");
										var e = oncl.indexOf(';');
										var params = oncl.substring(s,e-1).split(',');
										eval("allLinks[i].addEventListener('click', function(event){_dct.toggle_div("+params[0]+",1);}, false);");
								}
						}
				},

				refreshComments : function () {
						var curr_threshold = _dct.settings.threshold;
						if (_dct.settings.thresh_type==2) {
								var average = _dct.getPositiveAverage();
								curr_threshold = average*_dct.settings.threshold/100;
						}

						for (var i=0; i<_dct.comments.length; i++) {
								if (_dct.comments[i].vote >= curr_threshold || (_dct.comments[i].has_img && _dct.settings.picts_always==1) ) {
										_dct.toggle_div(_dct.comments[i].parent_id, 1);
								} else {
										_dct.toggle_div(_dct.comments[i].parent_id, 22);
								}
						}
						
						//fire event for comment scroller
						_$.fireEvent(eventDispatcher, 'mouseup');
				},
				initCommentsArray : function () {
						_dct.comments = _dct.getElementsByClassAndTag('comment_inner', 'div');
						for (var i=0; i<_dct.comments.length;i++) {
								_dct.comments[i].parent_id = _dct.comments[i].parentNode.id
								var vote_arr = _dct.getElementsByClassAndTag('vote_result', 'strong', _dct.comments[i]);
								if (vote_arr && vote_arr.length==1) {
										_dct.comments[i].vote = parseInt(vote_arr[0].innerHTML);
								} else {
										_dct.comments[i].vote = 0;
								}

								var images = _dct.comments[i].getElementsByTagName('img');
								if (images && images.length>0) {
										_dct.comments[i].has_img = true;
								} else {
										_dct.comments[i].has_img = false;
								}
						}
				},

				compareNumbers : function(a,b) {
						return a - b;
				},

				doOrder : function(order) {
						var last_comment;
						var prev_comment
						var big_parent = document.getElementById("js-commentsHolder");
						supressEvents = true;
						for (var i=order.length; i>0; i--) {
								last_comment = document.getElementById(order[i]);
								prev_comment = document.getElementById(order[i-1]);
								big_parent.insertBefore(prev_comment, last_comment);
						}
						supressEvents = false;
				},

				toggleCommentsOrder : function() {
						if (_dct.tree_order.length==0) {
								for (var i=0; i<_dct.comments.length;i++) {
										_dct.tree_order.push(_dct.comments[i].parent_id);
										_dct.list_order.push(_dct.comments[i].parent_id);
										_dct.list_reverse.push(_dct.comments[i].parent_id);
								}
								_dct.list_order.sort(_dct.compareNumbers);
								_dct.list_reverse.sort(_dct.compareNumbers);
								_dct.list_reverse.reverse();
						}

						var tree_link = document.getElementById("tree_link");
						if (_dct.comm_order==1) {
								_dct.comm_order=2;
								_dct.doOrder(_dct.list_order);
								if (_$.settings.allow_reverse_list=='1') {
									tree_link.innerHTML = "реверс!";
								} else {
									tree_link.innerHTML = "деревом!";
								}
						}
						else if(_$.settings.allow_reverse_list=='1' && _dct.comm_order==2) {
								_dct.comm_order=3;
								_dct.doOrder(_dct.list_reverse);
								tree_link.innerHTML = "деревом!";
						} else {
								_dct.comm_order=1;
								_dct.doOrder(_dct.tree_order);
								tree_link.innerHTML = "списком!";
						}
						//fire event for comment scroller
						_$.fireEvent(eventDispatcher, 'mousedown');
				},

				addTreeLinearLink : function() {
						var div_to_insert;
						if (_dct.isPostPage) {
								div_to_insert = _dct.getElementsByClassAndTag("comments_header_controls_inner","div");
						} else {
								div_to_insert = _dct.getElementsByClassAndTag("inbox_header", "div");
						}
						div_to_insert = div_to_insert[0];
						//<A HREF="javascript:top.frames[0].toggleNode('<?php print(("".($app_id * 10)."_".$function_id));?>')" ID="fun_<?=$function_id?>1"><?php print($function_name);?></A>
						var tree_link = document.createElement("a");
						tree_link.id = "tree_link";
						tree_link.href = "javascript:void(0);";
						//tree_link.href = "javascript:_dct.toggleCommentsOrder();";

						tree_link.innerHTML = "списком!";
						tree_link.className = "dashed comments_header_refresh_comments";

						if (navigator.appName == "Opera") {
								tree_link.onclick = function(){_dct.toggleCommentsOrder()};
						} else {
								tree_link.addEventListener('click', _dct.toggleCommentsOrder, false);
						}
						var space_link = document.createElement("a");
						div_to_insert.appendChild(space_link);
						space_link.innerHTML = "&nbsp;&nbsp;";
						div_to_insert.appendChild(tree_link);
				},

				isPostCommentsPage : function () {
						if (document.getElementById("comments-threshold")) {
								return true;
						} else {
								return false;
						}
				},

				isInboxCommentsPage : function () {
						if (document.getElementById("js-inbox_people_list")) {
								return true;
						} else {
								return false;
						}
				},

				workPlease : function () {
						_dct.isPostPage = _dct.isPostCommentsPage();
						if (!_dct.isPostPage) {
								_dct.isInboxPage = _dct.isInboxCommentsPage();
						}
						_dct.set_get();

						if (_dct.isPostPage || _dct.isInboxPage) {
								_dct.initCommentsArray();
								_dct.addTreeLinearLink();
						}
						if (_dct.isPostPage) {
								_dct.replaceSelect();
								_dct.replaceParentLinks();
								_dct.onChangeThreshold();
						}
				}
		}

		_dct.workPlease();
	}
	
	//post threshold
	if(_$.settings.post_threshold=='1'){

		var _dpt = {
				posts : [],
				settings : {},
				curr_select_numb : 0,
				set_save : function (){
						var params = '';
						var not_first = '';
						for (i in _dpt.settings) {
								params = params + not_first+i+":"+_dpt.settings[i];
								not_first = ',';
						}
						document.cookie = "posts_thresh.settings="+escape('{'+params+'}')+"; domain=.dirty.ru; path=/; expires=Thu, 20-Apr-2023 00:34:13 GMT";
				},
				
				set_get : function (){
						if(document.cookie.indexOf('posts_thresh.settings=')>-1){
								var param = unescape(document.cookie.split('posts_thresh.settings=')[1].split(";")[0]);
								eval("_dpt.settings="+unescape(param));
						} else {
								_dpt.settings.threshold = 100;
								_dpt.settings.thresh_comm_count = 0;
								_dpt.settings.thresh_step = 100;
								_dpt.settings.opt_count = 4;

								// what types to show
								_dpt.settings.show_posts = 1;
								_dpt.settings.show_video = 1;
								_dpt.settings.show_photo = 1;
								_dpt.settings.show_audio = 1;
						}
				},
				
				toggle_div  : function(name,param){
						if(param) document.getElementById(name).style.display = (param==1)?'block':'none';
						else document.getElementById(name).style.display = (document.getElementById(name).style.display=='none')?'block':'none';
				},
				
				getElementsByClassAndTag : function(name, tag, obj) {
						var obj = obj||document;
						var result = [];
						var allElements = obj.getElementsByTagName(tag);
						for(var i=0; i<allElements.length; i++){
								if(allElements[i].className && allElements[i].className==name){
										result[result.length] = allElements[i];
								}
						}
						return result;
				},
				
				getIntFromPrompt : function(msg, curr_val, allow_0) {
					 var result = prompt(msg, curr_val)
					 if (result==null) {
								return false;
					 }

					 if (!result) {
								alert('Имело смысл что-нибудь ввести!');
								return false;
					 }
				
					 result = parseInt(result);
					 if (isNaN(result)) {
								alert('Невнятное число!');
								return false;
					 }
					 return result;
				},
				
				onChangeThreshold : function() {
						var new_sel = document.getElementById('thres_select_'+_dpt.curr_select_numb);
				
						if (new_sel.value == 'set_step') {
								var result = _dpt.getIntFromPrompt("Новое значение шага:", _dpt.settings.thresh_step)
								if (result) {
										_dpt.settings.thresh_step = result;
								}
								new_sel.options[0].selected = true;
								_dpt.replaceSelect();        
						} else if (new_sel.value == 'set_comm_tresh') {
								var result = _dpt.getIntFromPrompt("Минимальное количество комментариев\n(ноль для выключения этой опции):", _dpt.settings.thresh_comm_count)
								if (result!==false) {
										if (result<0) {
												result = 0;
										}
										_dpt.settings.thresh_comm_count = result;
								}
								new_sel.options[0].selected = true;
								_dpt.replaceSelect();        
						} else if (new_sel.value == 'set_opt_count') {
								var result = _dpt.getIntFromPrompt("Количество опций:", _dpt.settings.opt_count)
								if (result!==false) {
										if (result<=0) {
												result = 1;
										}
										_dpt.settings.opt_count = result;
								}
								new_sel.options[0].selected = true;
								_dpt.replaceSelect();
						} else {
								_dpt.settings.threshold = new_sel.value;
						}
						_dpt.set_save();
						_dpt.refreshPosts();
				},

				onSortChks : function (check) {
						if (navigator.appName != "Opera") {
								check = this;
						}
						if (_$.settings.post_content_filter_layout!='1') {
							eval("_dpt.settings."+check.id+" = (check.checked?1:0);");
						} else {
							if (eval("_dpt.settings."+check.id) == 1) {
								eval("_dpt.settings."+check.id+"=0;");
								check.style.fontWeight = "normal";
							} else {
								eval("_dpt.settings."+check.id+"=1;");
								check.style.fontWeight = "bold";
							}
						}
						_dpt.set_save();
						_dpt.refreshPosts();
				},

				addSortChks : function () {
						div_to_insert = _dpt.getElementsByClassAndTag('threshold_other_inner', 'div');
						div_to_insert = div_to_insert[0];
						var chcks = ['show_posts', 'show_photo', 'show_video', 'show_audio'];
						var names = ['Посты', 'Фото', 'Видео', 'Аудио'];
						if (_$.settings.post_content_filter_layout!='1') {
							for (var i=0; i<chcks.length; i++) {
								var temp_chk = document.createElement("input");
								temp_chk.type='checkbox';
								temp_chk.id=chcks[i];
								if (navigator.appName == "Opera") {
										temp_chk.onclick=function(){_dpt.onSortChks(this);};
								} else {
										temp_chk.addEventListener('click', _dpt.onSortChks, false);
								}

								temp_chk.checked = (eval("_dpt.settings."+chcks[i]) == 1);
								var temp_link = document.createElement("a");
								temp_link.innerHTML ='<label for="'+chcks[i]+'">'+names[i]+'</label>';
								div_to_insert.appendChild(temp_chk);
								div_to_insert.appendChild(temp_link);
							}
						} else {
							for (var i=0; i<chcks.length; i++) {
								var temp_link=document.createElement("a");
								temp_link.id=chcks[i];
								if (navigator.appName == "Opera") {
										temp_link.onclick=function(){_dpt.onSortChks(this);};
								} else {
										temp_link.addEventListener('click', _dpt.onSortChks, false);
								}

								temp_link.href ="javascript:void(0)";
								temp_link.innerHTML = names[i];
								if (eval("_dpt.settings."+chcks[i]) == 1) {
									temp_link.style.fontWeight = "bold"
								}

								var span = document.createElement("span");
								span.innerHTML = "&nbsp;"
								div_to_insert.appendChild(temp_link);
								div_to_insert.appendChild(span);
							}
						}
				},
				
				replaceSelect : function () {
						var thresh_suffix = " голосов";
						var all_posts_title = "Все посты";
						var operand_name = " и ";
						if (_$.settings.post_threshold_use_or=='1') {
							operand_name = " или ";
						}

						if (_dpt.settings.thresh_comm_count>0) {
								thresh_suffix += operand_name+_dpt.settings.thresh_comm_count+" комментариев";
								all_posts_title += ", у которых >"+_dpt.settings.thresh_comm_count+" комментариев"; 
						}
						
						if (_dpt.curr_select_numb==0) {
								curr_select_node_id = 'posts-threshold'
						} else {
								curr_select_node_id = 'div_select_'+_dpt.curr_select_numb;
						}
						_dpt.curr_select_numb++;    
						var curr_sel_node = document.getElementById(curr_select_node_id);
						var new_sel = document.createElement("SELECT");
				
						if (navigator.appName == "Opera") {
								new_sel.className = "hidden";
								new_sel.onchange = function(){_dpt.onChangeThreshold()};
						} else {
								new_sel.addEventListener('change', _dpt.onChangeThreshold, false);
						}
						new_sel.length = 4+_dpt.settings.opt_count;
						new_sel.name='thres_select_'+_dpt.curr_select_numb;
						new_sel.id='thres_select_'+_dpt.curr_select_numb;
						new_sel.options[0].text = all_posts_title;
						new_sel.options[0].value = "-1000";
						var selected = false;
						for (var i=1; i<=_dpt.settings.opt_count; i++) {
								new_sel.options[i].text = "Больше "+(_dpt.settings.thresh_step*i)+thresh_suffix;
								new_sel.options[i].value = _dpt.settings.thresh_step*i;
				
								if (_dpt.settings.threshold == _dpt.settings.thresh_step*i) {
										new_sel.options[i].selected = true;
										selected = true;
								}
						}
						
						if (!selected) {
								new_sel.options[0].selected = true;
						}
						new_sel.options[_dpt.settings.opt_count+1].text = 'Число комментариев...';
						new_sel.options[_dpt.settings.opt_count+1].value = 'set_comm_tresh';
						new_sel.options[_dpt.settings.opt_count+2].text = "Сменить шаг...";
						new_sel.options[_dpt.settings.opt_count+2].value = "set_step";
						new_sel.options[_dpt.settings.opt_count+3].text = "Число опций...";
						new_sel.options[_dpt.settings.opt_count+3].value = "set_opt_count";
						
						var new_div = document.createElement("FORM");
						new_div.name='div_select_'+_dpt.curr_select_numb;
						new_div.id='div_select_'+_dpt.curr_select_numb;
						new_div.appendChild(new_sel);

						curr_sel_node.parentNode.replaceChild(new_div, curr_sel_node);
						if (navigator.appName == "Opera") {
								new futuSelect('thres_select_'+_dpt.curr_select_numb);
						}
				},
				
				refreshPosts : function() {
						for (var i=0; i<_dpt.posts.length; i++) {
								// pre-filtering by type
								if ( (_dpt.posts[i].is_post && _dpt.settings.show_posts=='0')
										|| (_dpt.posts[i].is_video && _dpt.settings.show_video=='0')
										|| (_dpt.posts[i].is_img && _dpt.settings.show_photo=='0')
										|| (_dpt.posts[i].is_audio && _dpt.settings.show_audio=='0')
										)
								{
										_dpt.toggle_div(_dpt.posts[i].id, 2);
										continue;
								}

								if (_$.settings.post_threshold_use_or=='1') {
									if ( (_dpt.settings.thresh_comm_count>0 && _dpt.posts[i].comm_count>=_dpt.settings.thresh_comm_count)
										|| _dpt.posts[i].vote >= _dpt.settings.threshold)
									{
										_dpt.toggle_div(_dpt.posts[i].id, 1);
									} else {
										_dpt.toggle_div(_dpt.posts[i].id, 2);
									}
								} else {
									if (_dpt.posts[i].vote < _dpt.settings.threshold) {
											_dpt.toggle_div(_dpt.posts[i].id, 2);
									} else if (_dpt.settings.thresh_comm_count>0 && _dpt.posts[i].comm_count<_dpt.settings.thresh_comm_count) {
											_dpt.toggle_div(_dpt.posts[i].id, 2);
									} else {
											_dpt.toggle_div(_dpt.posts[i].id, 1);
									}
								}
						}
						//fire event for comment scroller
						_$.fireEvent(eventDispatcher, 'mouseup');
				},
				
				checkMainPage : function () {
						if (document.getElementById("posts-threshold")) {
								return true;
						} else {
								return false;
						}
				},
				
				initPostsArray : function () {
						var status_div = null;
						var post_links = null;
						var posts_usual = _dpt.getElementsByClassAndTag('post ord', 'div');
						var posts_golden = _dpt.getElementsByClassAndTag('post golden ord', 'div');
						_dpt.posts = posts_usual.concat(posts_golden);
						for (var i=0; i<_dpt.posts.length;i++) {
								var vote_arr = _dpt.getElementsByClassAndTag('vote_result', 'strong', _dpt.posts[i]);
								if (vote_arr && vote_arr.length==1) {
										_dpt.posts[i].vote = parseInt(vote_arr[0].innerHTML);
								} else {
										_dpt.posts[i].vote = 0;
								}

								// comments count
								status_div = _dpt.getElementsByClassAndTag('dd', 'div', _dpt.posts[i]);
								post_links = status_div[0].getElementsByTagName('a');
								_dpt.posts[i].comm_count = parseInt(post_links[2].innerHTML);
								if (isNaN(_dpt.posts[i].comm_count)) {
										_dpt.posts[i].comm_count = 0;
								}

								_dpt.posts[i].is_img = false;
								_dpt.posts[i].is_video = false;
								_dpt.posts[i].show_audio = false;
								_dpt.posts[i].is_post = true;
								
								// is video
								var videos = _dpt.getElementsByClassAndTag('post_video', 'div', _dpt.posts[i]);
								if (videos && videos.length>0) {
										_dpt.posts[i].is_video = true;
										_dpt.posts[i].is_post = false;
										continue;
								}
								
								// is image
								var images = _dpt.posts[i].getElementsByTagName('img');
								if (images && images.length>0) {
										_dpt.posts[i].is_img = true;
										_dpt.posts[i].is_post = false;
										continue;
								}
						
								// is audio - not yet implemented
								var audios = _dpt.posts[i].getElementsByTagName('embed');
								if (audios && audios.length>0) {
										_dpt.posts[i].is_audio = true;
										_dpt.posts[i].is_post = false;
										continue;
								}
						}
				},

				workPlease : function () {
						if (_dpt.checkMainPage()) {
								_dpt.set_get();
								
								if(_$.settings.own_threshold=='1'){
									//part from Stasik0
									//set default selector to show needed posts
									if(_$.getUsername()!="" && _$.$('js-select_threshold_posts_rate')){
										if(_dpt.settings.threshold >= 250){
											if(_$.$('js-select_threshold_posts_rate').value != "best"){
												_$.$('js-select_threshold_posts_rate').value = "best";
												_$.$('posts-threshold').submit();
											}
										}else if(_dpt.settings.threshold >= 25){
											if(_$.$('js-select_threshold_posts_rate').value != "good"){
												_$.$('js-select_threshold_posts_rate').value = "good";
												_$.$('posts-threshold').submit();
											}
										}else{
											if(_$.$('js-select_threshold_posts_rate').value != "all"){
												_$.$('js-select_threshold_posts_rate').value = "all";
												_$.$('posts-threshold').submit();
											}
										}
									}
								}
								
								_dpt.replaceSelect();
								_dpt.initPostsArray();
								_dpt.addSortChks();
								_dpt.onChangeThreshold();
						}
				}
		}

		_dpt.workPlease();
	}
	
	//SHARED PART of read-button and new comment scroller
	if(_$.settings.read_button=='1' || _$.settings.comment_scorller=='1'){
		function removeFromArray(arr, elem){
			var re = Array();
			for(var i=0;i<arr.length;i++){
				if(arr[i]!=elem)re.push(arr[i]);
			}
			return re;
		}
		
		//shared between read comments-button and scroller
		var comments = _$.$c('comment', document, 'div');
		var posts = _$.$c('post', document, 'div');
		var allPostsArr;
		if(comments.length > 0){
			allPostsArr = comments;
			var newPosts = _$.$c('new', document, 'div');
			var mine = _$.$c('mine', document, 'div');
			var allPosts = comments.length;
		}else{
			posts = posts;
			allPostsArr = posts;
			var newPosts = Array();
			var mine = Array();
			var allPosts = posts.length;
			var suffix = '<a href="/user/'+_$.getUsername();
		}
		//add read button and populate mine and newPosts
		for(var i=0;i<allPostsArr.length;i++){
			inner = _$.$c('dd',allPostsArr[i],'div')[0];
			if(inner == null)continue;
			ownComment = false;
			if(inner.innerHTML.indexOf('Написал '+suffix) > -1 || inner.innerHTML.indexOf('Написала '+suffix) > -1 || inner.innerHTML.indexOf('Забанил '+suffix) > -1 || inner.innerHTML.indexOf('Забанила '+suffix) > -1)ownComment = true;
			if(inner.innerHTML.match(/href="\/(comments|my\/inbox)\/([0-9]+)#new">/g) != null){
				newPosts.push(allPostsArr[i]);
				//Add read comments - button
				if(_$.settings.read_button=='1'){
					var newLink = (location.pathname.indexOf('/banned')==0)?_$.$t('a',inner)[2]:_$.$t('a',inner)[3];
					id = newLink.href;
					link = document.createElement("a");
					link.setAttribute("href", "#");
					link.setAttribute("style", "margin-left:5px; display:inline-block;");
					link.setAttribute("title", "Пометить комментарии как прочтённые");
					if(ownComment)link.setAttribute("own", "true");
					link.setAttribute("pos", i);
					link.setAttribute("posId", id);
					link.innerHTML = "<strong>[x]</strong>";
					_$.insertAfter(newLink, link);
				
					_$.addEvent(link, 'click', function(e){
						if(this.getAttribute("href")==""){e.preventDefault();return false;}
						pos = this.getAttribute('pos');
						id = this.getAttribute('posId');
						//
						if(_$.settings.comment_scroller=='1'){
							newPosts = removeFromArray(newPosts, allPostsArr[pos]);	
							if(this.getAttribute('own')=="true")mine = removeFromArray(mine, allPostsArr[pos]);
							onScroll();
						}
						//
						this.setAttribute("href", "");
						this.innerHTML = '<img src="http://pit.dirty.ru/dirty/1/2010/10/25/28281-184741-b29db745feb47786dade8a8e50c4f461.gif" style="border:0px;"/>';
						//parent.innerHTML = parent.innerHTML.replace(/ \/ <a(.+)<\/a>/,"");
						_$.ajaxLoad(id,function(){
							//hide post
							if(_$.$('inboxunread') != null && _$.$('inboxunread').checked){
								this.parentNode.parentNode.parentNode.setAttribute("style","display:none;");
							}
							//hide link
							this.parentNode.innerHTML = this.parentNode.innerHTML.replace(/ \/ <a(.+)<\/a><a(.+)<\/a>/,"");
						},this,this);
						
						e.preventDefault();
						return false;
					});
				}
			}
			if(ownComment == true){
				mine.push(allPostsArr[i]);
			}
		}

		//new comment scroller
		if(_$.settings.comment_scroller=='1' && location.pathname.indexOf('/write/')==-1 && location.pathname.indexOf('/user')==-1){
			function documentChanged(event) {
				if (supressEvents) {
					return;
				}				
				if(event.target.className != null && event.target.className.indexOf("comment")>-1){
					recountComments();
				}
			}

			function removeFromArray(arr, elem){
				var re = Array();
				for(var i=0;i<arr.length;i++){
					if(arr[i]!=elem)re.push(arr[i]);
				}
				return re;
			}

			function my(){ 
				if(mine.length > 0){
					scrollToMiddle(mine[minePos]);
					minePos = (minePos+1)%mine.length;
				}
			} 

			function next(){ 
				if(newPosts.length > 0 && newPos < newPosts.length-1 && autoScroll){
					newPos++;
				}
				if(newPosts.length > 0 )scrollToMiddle(newPosts[newPos]);
				//if(_$.$('down').innerHTML=="0" && _$.$('js-footer')!==null){
				//	smoothScroll(_$.element_position(_$.$('js-footer')).y);
				//};
			} 

			function prev(){ 
				if(newPosts.length > 0 && newPos > 0){
					if(newPos > 1 && !autoScroll)newPos--;
					newPos--;
				}
				if(newPosts.length > 0 )scrollToMiddle(newPosts[newPos]);
			} 

			function getId(elem) {
				prefix = "omgwtf";
				if(elem.id)return elem.id;
				tempId++;
				elem.id = prefix+tempId;
				return prefix+tempId;
			}

			function scrollToMiddle(elem){
				if(elem == null)return;
				recolor = _$.$c("comment_inner", elem, "div")[0];
				if(recolor == null){
					recolor = elem;
				}

				if(recolor.style.borderColor != "#fff48d"){
					//recolor.style.borderColor = recolor.style.backgroundColor;
					recolor.setAttribute("oldColor", recolor.style.backgroundColor);
					//window.setTimeout("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.style.borderColor; el.style.borderColor = '';", 650);
					window.setTimeout("var el = document.getElementById('"+getId(recolor)+"'); el.style.backgroundColor = el.getAttribute('oldColor'); el.setAttribute('oldColor', '');", 650);
					recolor.style.backgroundColor = "#fff48d";
				}
				var middle = _$.element_position(elem).y - Math.round(_$.viewarea_size().y/2);
				//
				if(_$.settings.smooth_scroll=='1'){
					smoothScroll(middle);
				}else{
					var x = _$.current_scroll().x;
					_$.scroll_position(middle, x);
				}
				//
			}

			function smoothScroll ( y ) {
				var oldScroll = autoScroll;
				autoScroll = true;
				gScrollDestination = y;
				if(!oldScroll){scrollDeamon();}
			}

			function scrollDeamon(){
				this.x = _$.current_scroll().x;
				this.start = _$.scroll_position().y;

				this.distance = gScrollDestination - this.start;
				if(gScrollDestination == null){
					autoScroll = false;
					onScroll();
					return;
				}

				if(lastDistance != "none"){
					if(lastDistance == this.distance){
						autoScroll = false;
						lastDistance = "none";
						onScroll();
						return;
					}
				}
				lastDistance = this.distance;
				if ( Math.abs(this.distance) < 5 ) {
					_$.scroll_position(gScrollDestination, x);
					lastDistance = "none";
					autoScroll = false;
					onScroll();
					return;
				}
				
				_$.scroll_position(this.start + Math.round(this.distance/4.5), x);
				window.setTimeout(scrollDeamon, 30);
			}
				

			function disableSelection(target){
				if (typeof target.onselectstart!="undefined") //IE route

						target.onselectstart=function(){return false}

				else if (typeof target.style.MozUserSelect!="undefined") //Firefox route

						target.style.MozUserSelect="none"

				else //All other route (ie: Opera)

						target.onmousedown=function(){return false}

			}

			function scanVisible(array){
				var newArray = Array();
				for(var i=0;i<array.length;i++){
					if(array[i].style.display != "none"){
						newArray.push(array[i]);
					}
				}
				return newArray;
			}

			function setInnerText(elem, text){
				if(elem==null)return;
				var hasInnerText = (_$.$t('body')[0].innerText != undefined) ? true : false;
				if(!hasInnerText){
					elem.textContent = text;
				} else{
					elem.innerText = text;
				}
			}
		
			function onScroll(){
				if(autoScroll)return '';
				var current = _$.current_scroll();
				if(newPosts.length >= 0){
				var pre = 0;
				var post = newPosts.length;
				for(var i=0;i<newPosts.length;i++){
					if(_$.element_position(newPosts[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2){
						pre++;
						post--;
					}else{
						break;
					}
				}
				newPos = pre;
				setInnerText(_$.$('up'), pre);
				setInnerText(_$.$('down'), post);
				}
				if(mine.length >= 0){
					for(var i=0;i<mine.length;i++){
						if(_$.element_position(mine[i]).y - Math.round(_$.viewarea_size().y/2) <= current.y + 2){
						}else{
							break;
						}
					}
					minePos = i%mine.length;
					setInnerText(_$.$('mine'), mine.length-i);
				}
			}	
			function recountComments(){
				backup_allPostsArr = _$.$c('comment', document, 'div');
				backup_newPosts = _$.$c('new', document, 'div');
				backup_mine = _$.$c('mine', document, 'div');
				allPosts = backup_allPostsArr.length;
				recountVisible();
			}
			function recountVisible(){
				allPostsArr = scanVisible(backup_allPostsArr);
				newPosts = scanVisible(backup_newPosts);
				mine = scanVisible(backup_mine);
				allPosts = allPostsArr.length
				//update scroller items
				onScroll();
			};

			//freshly added stuff to work with BearOff's scripts. Мама, прости меня за этот код.
			//do a backup
			var backup_allPostsArr = allPostsArr;
			var backup_newPosts = newPosts;
			var backup_mine = mine;		
			
			var newPos = 0; 
			var newCount = newPosts.length;

			var autoScroll = false;
			
			var minePos = 0;

			var tempId = 0;
			var gScrollDestination = 0;
			var lastDistance = "none";
			
			//controls
			//consider visible stuff
			recountVisible();
			
			//handle new ajax-generated content
			_$.addEvent(document,"DOMNodeInserted", documentChanged);
			
			var newdiv = document.createElement('div');
			newdiv.style.position = "fixed";
			newdiv.style.top = "50%";
			newdiv.style.marginTop = "-72px";
			newdiv.style.right = "1px";
			newdiv.style.zIndex = "100";
			var temp = "";
			temp += '<div id="home" style="height:36px; width:36px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-204632-bb73ad97827cd6adc734021bf511df3b.png); cursor: pointer; cursor: hand; text-align:center;"></div>';
			temp += '<div id="up" style="height:22px; width:24px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-204624-e6ddb7dc3df674a675eb1342db0b529a.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 12px;">0</div>';
			temp += '<div id="mine" style="height:22px; width:24px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-205202-7f74bf0a90bf664faa43d98952774908.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 12px;">'+mine.length+'</div>';
			temp += '<div id="down" style="height:22px; width:24px; color:#999999; background-image: url(http://pit.dirty.ru/dirty/1/2010/10/30/28281-205411-ceb943a765914621d0558fed8e5c5400.png); cursor: pointer; cursor: hand; text-align:center; padding: 14px 0px 0px 12px;">'+newPosts.length+'</div>';
			newdiv.innerHTML = temp;
			document.body.insertBefore(newdiv, document.body.firstChild);
			
			disableSelection(_$.$('mine'));
			disableSelection(_$.$('up'));
			disableSelection(_$.$('down'));
				
			_$.addEvent(_$.$('home'), 'click', function(){if(_$.settings.smooth_scroll=='1'){smoothScroll(0);}else{window.scrollTo(_$.current_scroll().x,0);}});
			_$.addEvent(_$.$('up'), 'click', prev);
			_$.addEvent(_$.$('down'), 'click', next);
			_$.addEvent(_$.$('mine'), 'click', my);
			_$.addEvent(window, 'scroll', onScroll);
			onScroll();
				
			//stuff to make BearOff happy
			_$.addEvent(eventDispatcher, 'mouseup', recountVisible);
			_$.addEvent(eventDispatcher, 'mousedown', recountComments);
			
			//add onload event to show new comments correctly
			if(document.location.href.indexOf('#new')>-1 && newPosts.length>0){
				//scrollToMiddle(newPosts[0]);
				//document.location.href = document.location.href;
				_$.scroll_position(_$.element_position(newPosts[0]).y, _$.current_scroll().x);
			}
			
		}
		
		//quotes
		if(_$.settings.quotes=='1' && location.pathname.indexOf('/comments')>-1){
			var gAll = _$.$c('comment_inner');
			for (var key in gAll)
			{
				var val = gAll[key];
				var t_inner = _$.$c('c_body',val);
				var t_inner = _$.$c('c_body', val);
				var c_inner = t_inner[0].innerHTML;
				c_inner = c_inner.replace('&','amp');
				c_inner = c_inner.replace("'",'');
				c_inner = c_inner.replace('"','');

				var t_footer = _$.$c('c_footer', val);
				var t_username = _$.$c('c_user', t_footer[0]);
				var c_username =  t_username[0].innerHTML;
				var link = document.createElement('a');
				link.setAttribute('href', 'http://quotes-dirty.ru/write?username='+encodeURI(c_username)+'&text='+encodeURI(c_inner));
				link.setAttribute('target', '_blank');
				link.setAttribute('class', 'c_answer');
				link.innerHTML = "в цитатник";
				t_footer[0].appendChild(link);

			}
		}
		
	}

}
_$.tooltip.init();
DSP_init();

}
