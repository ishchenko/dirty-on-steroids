// Спрятать рейтинг постов
d3.addModule(
	{
		type: "Социализм",
		name: 'Выделение новичков',
		author: 'Aivean',
		config: {
			active: {type: 'checkbox', value: 1},
			style:{type:'radio', caption:'Стиль:', options:{"Звездочка":0, "ID целиком":1}, value:0},
			idThreshold: {type: 'text', caption: 'Выделять ID пользователя больше ', value: '39000'}
			},

		run: function() {
			this.idParsed = parseInt(this.config.idThreshold.value);
			console.log(this.idParsed);
		},

		mark: function(user, userId) {
			if (this.config.style.value == 0) {
				user.after(" <sup>*</sup>");
			} else {
				user.after(" <sup>" + userId + "</sup>");
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
