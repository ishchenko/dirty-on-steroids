// Спрятать рейтинг постов
d3.addModule(
	{
		type: "Социализм",
		name: 'Выделение новичков',
		author: 'Aivean',
		config: {
			active: {type: 'checkbox', value: 1},
			style:{type:'radio', caption:'Стиль:', options:{"Звездочка":0, "ID целиком":1,"ID целиком через |":2}, value:0},
			idThreshold: {type: 'text', caption: 'Выделять ID пользователя больше ', value: '37194'}
			},

		run: function() {
			this.idParsed = parseInt(this.config.idThreshold.value);
			this.styleInt = parseInt(this.config.style.value);
		},

		mark: function(user, userId) {
			switch(this.styleInt) {
				case 0 : user.after(" <sup>*</sup>"); break;
				case 1 : user.after(" <sup>" + userId + "</sup>"); break;
				case 2 :  user.after(" <span style='padding-left:0.5em;'> | " + userId + "</span>"); break;
			}
		},

		processElement:function(userId, footer) {
			if (userId > this.idParsed) {
				this.mark($j("a.c_user", footer), userId);
			}
		},

		onComment: function (comment) {
			this.processElement(comment.userId, comment.getFooter());
		},

		onPost: function (post) {
			this.processElement(post.userId, post.getFooter());
		}
	});
