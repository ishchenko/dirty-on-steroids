// Hides posts with low rating
d3.addModule(
	{
		type: "Содержание",
		name: 'Прятать посты с низким рейтингом',
		author: 'Aivean',
		config: {
			active: {type: 'checkbox', value: false},
			rating: {
				type: 'select', value: 0,
				options: {'100': 100, '40': 40, '10': 10, '5': 5, '0': 0, '-5': -5, '-10': -10},
				caption: 'Рейтинг меньше, чем:'
			}
		},

		onPost: function (post) {
			if (post.ratingValue() < this.config.rating.value) {
				post.container.hide();
			}
		}
	});