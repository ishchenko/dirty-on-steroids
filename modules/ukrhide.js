// Hides posts in Ukranian
d3.addModule(
	{
		type: "Содержание",
		name: 'Скрывать посты на Украинском',
		author: 'Stasik0',
		variant: ['d3.ru'],
		config: {
			active: {type: 'checkbox', value: 0},
		},

		//tnx to arkony for regexps (http://servicepack.d3.ru/comments/522252/)
		rus: /[ыэъ]/i,
		ukr: /[єіїґ'’]/i,

		onPost: function (post) {
			if (d3.page.my || d3.page.postComments || d3.page.inbox) return;
			var text = post.getContentText();
			if(this.ukr.test(text) && !this.rus.test(text)) {
				post.container.hide();
			}
		}
	});
