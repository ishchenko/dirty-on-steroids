// ignore blogs color settings
d3.addModule(
{
	type: "Стилизация",
	name: 'Игнорировать цветовые настройки блогов',
	author: 'crea7or',
	config: {active:{type:'checkbox',value:0}},
	run: function()
	{
		var script2run = document.createElement('script');
		script2run.type = 'text/javascript';
		script2run.text = " Colors = { 'text_color' : '#000000', 'header_color' : '#556e8c', 'links_color' : '#556e8c', 'links_visited_color' : '#666666', 'links_system_color' : '#888888', 'irony_color' : '#CC3333', 'inputs_bg_color' : '#e9dfc3', 'inputs_text_color': '#000000',"
			+ "'inputs_text_blur_color': '#888888', 'inputs_border_color': '#E9E9E9', 'inputs_border_top_color': '#CCCCCC', 'background_color': '#FFFFFF', 'footer_gradient_color': '#969696',	'tagline_border_color': '#CCCCCC','tagline_text_color' : '#666666',"
			+ "'tagline_links_color' : '#556e8c','information_bg_color' : '#E9DFC3','rating_bg_color' : '#F4F4F2','rating_border_color' : '#E0E0E0','rating_shadow_color' : '#FFFFFF','rating_plus_color' : '#D4D4D4',	'rating_plus_active_color' : '#666666',"
			+ "'windows_bg_color' : '#E6E6E6',	'windows_text_color' : '#666666','windows_links_color' : '#556E8C',	'windows_dark_color' : '#D1D0D0','windows_bright_color' : '#FFFFFF','new_comments_bg_color' : '#F6EFD2'"
		 + "}; 	blogsSettingsHandler.setAllStyles(); utils.addCSSRule('html .l-i-wrapper', 'background', 'none');";
		document.body.appendChild( script2run );
	}
});