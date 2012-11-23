
// Hide unwanted elements module
d3.addModule(
{
	type: "Стилизация",
	author: 'crimaniak',
	name: 'Спрятать лишнее',
	config: 
		{active:{type:'checkbox', value:true}
		,hideSocialLinks:{type:'checkbox', caption:'Спрятать кнопки социальных сетей', value:false}
		},
	run: function()
	{
		if(this.config.hideSocialLinks.value) $j('.b-post_social_link').hide();
	}
});