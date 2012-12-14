// стили от crea7or'a
d3.addModule(
{
	type: "Стилизация",
	name: 'Рестайлинг сайта от dirty tort',
	author: 'crea7or',
	config: {
		active:{type:'checkbox',value:1}
		,postInfoMove:{type:'checkbox',caption:'Информация о посте внизу',value:1}
	},

	run: function()
	{
		var	css = '.post_body {margin-top: 1px;} .post h3 {font-family: tahoma;} .vote_result {font-weight: normal !important;} div.post_comments_page { padding-top: 10px;} .comments_header { margin-bottom: 12px; } .post .dd	{	font-size: 10px !important;	} div.c_footer	{		font-size: 10px !important;	}	div.comment	{	margin-bottom: 0px !important;	padding-bottom: 10px !important;}'
		+ '.comments_indent_holder .indent_0 { padding-left:40px !important;}.comments_indent_holder .indent_1 { padding-left:55px !important;}.comments_indent_holder .indent_2 { padding-left:70px !important;}.comments_indent_holder .indent_3 { padding-left:85px !important;}.comments_indent_holder .indent_4 { padding-left:100px !important;}.comments_indent_holder .indent_5 { padding-left:115px !important;}.comments_indent_holder .indent_6 { padding-left:130px !important;}.comments_indent_holder .indent_7 { padding-left:145px !important;}.comments_indent_holder .indent_8 { padding-left:160px !important;}.comments_indent_holder .indent_9 { padding-left:175px !important;}.comments_indent_holder .indent_10 { padding-left:190px !important;}.comments_indent_holder .indent_11 { padding-left:205px !important;}.comments_indent_holder .indent_12 { padding-left:220px !important;}.comments_indent_holder .indent_13 { padding-left:235px !important;}.comments_indent_holder .indent_14 { padding-left:250px !important;}.comments_indent_holder .indent_15 { padding-left:265px !important;}.comments_indent_holder .indent_16 { padding-left:270px !important;}.comments_indent_holder .indent_17 { padding-left:295px !important;}.comments_indent_holder .indent_18 { padding-left:310px !important;}.comments_indent_holder .indent_19 { padding-left:325px !important;}.comments_indent_holder .indent_20 { padding-left:340px !important;}'
		+ '.comments_indent_holder .indent_21 { padding-left:355px !important;} .indent_22 { padding-left:370px !important;} .indent_23 { padding-left:385px !important;} .indent_24 { padding-left:400px !important;}'
		+ '.comments_indent_holder .indent_25 { padding-left:415px !important;} .indent_26 { padding-left:430px !important;} .indent_27 { padding-left:445px !important;} .indent_28 { padding-left:460px !important;}'
		+ '.comments_indent_holder .indent_29 { padding-left:475px !important;} .indent_30 { padding-left:490px !important;}'
		+ '.b-comments_controls_social {display: inline; padding: 5px 0px 0px 5px;} .b-comments_controls_sort{display: inline;}'
		+ 'div.b-comments_controls { padding: 14px 0px 10px 5px; min-width: 800px;}';

		if (( d3.page.postComments ||  d3.page.inboxComments ) && document.location.href.indexOf('write') == -1 )
		{
			css += ' .b-ads { width: 0px; display: hidden;}';
			if ( this.config.postInfoMove.value )
			{
				var postInfo = document.querySelector('div.dd');
				var postParent = postInfo.parentNode;
				postParent.removeChild( postInfo );
				postParent.appendChild( postInfo );
			}
		}

		style = document.createElement('style');
		style.type = 'text/css';
		if(style.styleSheet)
		{
			style.styleSheet.cssText = css;
		}
		else
		{
	    	style.appendChild(document.createTextNode(css));
		}
		$j('head').append(style);

		var socBut = document.querySelector('span.b-comments_controls_social');
		var socButTarget = document.querySelector('div.b-comments_controls_new_nav');
		if ( socBut && socButTarget)
		{
			var socParent = socBut.parentNode;
			socParent.removeChild( socBut );
			socButTarget.appendChild( socBut );
		}
	}
});
