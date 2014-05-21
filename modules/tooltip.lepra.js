// need to be refactored more
(function(){

	// move static method here 
	var extractBetween = function(string, pre, post){
		return (string.indexOf(pre)==-1) ? '' : string.split(pre)[1].split(post)[0];
	};
	var noteStyle = 'font-size:130%; background-color:#eee;padding:10px;font-family:Times New Roman';
	
	
// Dirty tooltip
d3.addModule(
{
	type: "Прочее",
	name: 'Lepra tooltip (информация о пользователе)',
	author: 'NickJr, Stasik0, crea7or, and the rest of gang',
	variant: ['leprosorium.ru'],
	config: {
		active:{type:'checkbox',value:1},
		usePhoto:{type:'checkbox',value:1,caption:'Показывать картинку из профиля'}
		},

	showing: 0,
	processing: 0,

	run: function(){
		this.processLinks($j(document.body));
	},

	onPost: function(post) {
		this.processLinks(post.container.get(0));
	},

	onComment: function(comment) {
		this.processLinks(comment.container.get(0));
	},

	processLinks: function(elem){
		if(!this.config.active.value)return;
		var me = this;
		var links = $j('a[href*="/users/"]', elem);
		var pattern = /(.*)leprosorium.ru\/users\/(.+)/g;
		for(var i=0; i<links.length; i++){
			var href = links[i].href.toString();
			pattern.lastIndex = 0;
			if(	pattern.test(href) &&
			//but none of theres
			  	href.indexOf('/posts')<0 && href.indexOf('/comments')<0 && href.indexOf('/favs')<0 &&
			//and this is no button
				links[i].className.indexOf("button") < 0
			){
				$j(links[i]).one("mouseover",
					function(e){
						clearTimeout(me.showing);
						me.showBaloon(e.target);
					}
				)
				.one("mouseout",
					function(){
					clearTimeout(me.showing);
					me.processing = 0;
					}
				);
			}
		}
	},

	showBaloon: function(obj){
		var dup_div = $j('#dup_div');
		//create div if not jet created
		if(dup_div.length == 0){
			$j(document.body).append('<div id="dup_div" style="position: absolute; z-index: 1300; color: #000;"></div>');
			dup_div = $j('#dup_div');
			$j(document).click(function(){
					$j('#dup_div').css('display', 'none');
				}
			);
		}

		//populate the div
		dup_div.html('<input type="hidden" id="dup_current_id" value=""><div style="border-right:1px solid #a1a1a1;border-bottom:1px solid #a1a1a1"><div style="background-color:#fff;border:1px solid #505050;font-size:10px;padding:14px;line-height:16px" id="dup_data_td"></div></div>');

		//caching
		if($j("#dup_current_id").val()!=obj.toString()){
			var image3 = 'data:image/gif;base64,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%3D';
			dup_div.css('display', 'none');
			$j("#dup_data_td").html('<center><div style="width:150px;height:60px;line-height:60px">...</div></center>');
			this.processing = 1;
		}

		var dup_pos = $j(obj).offset();
		dup_div.css('top', (dup_pos.top+obj.offsetHeight+5)+'px');
		dup_div.css('left', (dup_pos.left-10)+'px');

		var me=this;
		this.showing = setTimeout(function(){
				$j("#dup_div").css('display', 'block');
				me.dup_getData_d3(obj);
		},700);
	},

	extractBetween: function(string, pre, post){
		if(string.indexOf(pre)==-1)return '';
		return (string.split(pre)[1].split(post)[0]);
	},

	//high level wrapper for ajax get supporting XS
	get: function(url, callback){
		if ( document.location.host == d3.content.variant)
		{
			$j.get(url, callback);
		}
		else
		{
			var module = d3.getModule("XD");
			if(module != null){
				module.send.call(module, url, '{"service":"bodyHtml"}', callback);
			}
		}	
	},	

	dup_getData_d3: function(obj){
		var me = this;
		if(this.processing==1){
			this.get(obj.href, function(data){
				//clear all line breaks and spaces
				var dup_text = data.replace(/(\r\n|\n|\r)/gm,' ').replace(/\s\s+/g,' ');
				//splits are for better performance! :p
				var dup_user_id = extractBetween(dup_text, "voteResultsHandler.showVoteResult('" ,"'");
				var dup_user_name = extractBetween(dup_text, 'class="b-user_name-link">', '</a>');

				var dateSpan = '<span class="js-date';
				var dup_date = "неизвестно";
				if(dup_text.indexOf(dateSpan).length != -1) {
					var timestamp = /data-epoch_date="(\d+)"/.exec(extractBetween(dup_text, dateSpan,'</span>'))[1];
					var date = new Date(timestamp*1000);
					var month = ['января','февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
					dup_date = date.getDate()+" "+ month[date.getMonth()]+" "+date.getFullYear();
				}
				var dup_karma = extractBetween(dup_text, '<span class="b-karma_value_inner" id="js-karma">', '</span>');

				var dup_pluses = 0;//extractBetween(dup_text, ' right" data-value="', '"');
				dup_pluses += dup_text.indexOf('b-karma_button__left_plus active') >-1 ? 1 : 0;
				dup_pluses += dup_text.indexOf('b-karma_button__right_plus active') >-1 ? 1 : 0;
				
				var dup_minuses = 0;//extractBetween(dup_text, ' left" data-value="', '"');
				dup_minuses += dup_text.indexOf('b-karma_button__left_minus active') >-1 ? 1 : 0;
				dup_minuses += dup_text.indexOf('b-karma_button__right_minus active') >-1 ? 1 : 0;

				dup_pluses = (dup_pluses>0)?'<span style="color:green;"><b>+'+dup_pluses+'</b></span>':0;
				dup_minuses = (dup_minuses>0)?'<span style="color:red;"><b>-'+dup_minuses+'</b></span>':0;

				var dup_votes_him = '';

				if(dup_minuses!==0) dup_votes_him += dup_minuses;
				if(dup_minuses!==0&&dup_pluses!==0) dup_votes_him += ' <span style="color:#ccc">/</span> ';
				if(dup_pluses!==0) dup_votes_him += dup_pluses;

				var dup_parent = extractBetween(dup_text, '<div class="b-user_parent">','</div>');
				dup_parent += extractBetween(dup_text, '<div class="b-user_children">','</div>');

				var dup_name = extractBetween(dup_text, '<h3 class="b-user_full_name">', '</h3>');

				var dup_country = extractBetween(dup_text, '<div class="b-user_residence">', '</div>');

				var dup_sex = (dup_text.indexOf('Зарегистрирована по приглашению')>-1)?'f':'m';
				var dup_posts = extractBetween(dup_text, 'Посты&nbsp;<i>(', ')</i>');
				var dup_comments = extractBetween(dup_text, 'Комментарии&nbsp;<i>(', ')</i>');

				var dup_img_temp = extractBetween(dup_text, '<table class="b-userpic">', '</td>');
				var dup_img_src = extractBetween(dup_img_temp, '<img src="', '"');

				dup_votes_him = (dup_votes_him!='')?'<b>Ваша оценка:</b> '+dup_votes_him:'<span style="color:#999"><b>Ваших оценок нет в '+((dup_sex=='f')?'её':'его')+' карме</b></span>';

				if (!dup_name || /^\s*$/.test(dup_name)) { // empty user name is replaced with login
					dup_name = dup_user_name;
				}
				dup_name = '<span style="font-size:130%;color:'+((dup_sex=='m')?'#009ced':'#ff4fdc')+'"><b>'+dup_name+'</b></span>';

				var dup_note = extractBetween(dup_text, '<em id="js-usernote" class="b-user_note js-user_note_has_note">', '</em>');				
				if(dup_note !='Место для заметок о пользователе. Заметки видны только вам.' && dup_note.length > 0)
				{
					dup_temp_body_mini = (dup_note.length>32)?dup_note.substring(0,32)+'...':dup_note;
					if(dup_temp_body_mini!=dup_note){
						dup_note = '<b>Ваша заметка:</b><div style="cursor:help;'+noteStyle+'" title="'+dup_note+'"><i>'+dup_temp_body_mini+'</i></div>';
					}
					else{
						dup_note = '<b>Ваша заметка:</b><div style="'+noteStyle+'"><i>'+dup_temp_body_mini+'</i></div>';
					}
				}
				else
				{
					dup_note = '';
				}

				

				var profile_link_opening = '<a href="' + location.protocol + '//leprosorium.ru/users/';
				
				dup_output = '<table cellspacing="0" cellpadding="0" border="0"><tr>'
				 + '<td valign="top" style="padding-right:10px; min-width: 120px;"><div style="float:left;margin-bottom:5px">'+dup_name+'<br><span style="font-size:10px"><b>'+dup_country+'</b></span></div>'
				 + '<div style="clear:both">Автор' + (dup_posts ? profile_link_opening + dup_user_name + '"<b>' + dup_posts + '</b> ' + (dup_posts % 10 == 1 && dup_posts % 100 != 11 ? 'поста':'постов') + '</a>' : '')
				    + (dup_posts && dup_comments ? '<br/>и' + profile_link_opening + dup_user_name + '/comments"':'')
				    + (dup_comments ? profile_link_opening + dup_user_name + '"<b>' + dup_comments + '</b> ' + (dup_comments % 10 == 1 && dup_comments % 100 != 11 ? 'комментария':'комментариев') + '</a>' : '')
				 + '<div style="margin-top:10px">'+dup_votes_him+'</div><div id="dup_my_vote"></div><div id="dup_his_vote"></div><div style="margin-top:10px">'+dup_note+'</div>';

				if ( dup_img_src.length > 0 && me.config.usePhoto.value )
				{
					dup_output += '<div style="text-align: center; margin-top:10px; width:150px; height: 150px;"><img src="'+dup_img_src+'" style="height: 100%;"></div>';
				}

				dup_output += '</td><td align="center" valign="top" style="padding-left:10px; border-left:1px #ccc solid; max-width: 200px;"><span style="color:#444">№'+dup_user_id+'</span><br>'+dup_parent.replace('<a href="/','<a href="' + location.protocol + '//leprosorium.ru/' ) +'<div style="margin-top:10px;font-size:10px"><b>Регистрация:</b><br>'+dup_date+'</div><div style="margin-top:5px; font-size: 130%;"><b>Карма: <span style="color:'+((dup_karma>=0)?'green':'red')+'">'+dup_karma+'</span></b></div></td></tr></table>';

				$j('#dup_current_id').val(obj.href);
				//FIXME: get incoming votes				
				//me.dup_getKarma(dup_output,dup_user_id,dup_sex,dup_user_name);
				$j('#dup_data_td').html(dup_output);
			});
		}
	}

});

})();
