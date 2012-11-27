
// test module
d3.addModule(
{
	type: "Тесты",
	author: 'crimaniak',
	name: 'Тест конфига',
	config: 
		{active:{type:'checkbox',value:false}
		,testRadio:{type:'radio',options:{"Опция 1":1,"Опция 2":2,"Опция 3":3,"Опция 4":4,"Опция 5":5,"Опция 6":6},caption:'Тестовые радиокнопки',value:6}
		,testText:{type:'text',value:'test text',caption:'Тестовое поле: '}
		,testSelect:{type:'select',value:'value 2',options:{'опция 1':'value 1','опция 2':'value 2'},caption:'Тестовый селект:'}
		,testCheckbox:{type:'checkbox',caption:'Тестовый чекбокс'}
		},
	run: function()
	{
		var me=this;
		d3.get.leftNavigation().append('<li><a href="#" id="d3ConfigLink">Тест конфига</a></li>');
		$j('#d3ConfigLink').click(function(event){me.showInfo();return false;});
	},
	showInfo: function()
	{
		alert("Радиокнопки: "+this.config.testRadio.value+"\nТекст: "+this.config.testText.value
			+"\nСелект: "+this.config.testSelect.value+"\nЧекбокс: "+this.config.testCheckbox.value);
	}
});