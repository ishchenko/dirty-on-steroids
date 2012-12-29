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
		var	css = '.post_body {margin-top: 1px;} .post h3 {font-family: tahoma;} .vote_result {font-weight: normal !important;} div.post_comments_page { padding-top: 10px;} .comments_header { margin-bottom: 12px; } .post .dd	{	font-size: 10px !important;	} div.c_footer	{		font-size: 10px !important;	}	div.comment	{	margin-bottom: 0px !important;	padding-bottom: 10px !important;}';

		if ( d3.content.variant.indexOf('d3') > -1 )
		{
			css += ' .indent_0 { padding-left:40px !important;} .indent_1 { padding-left:55px !important;} .indent_2 { padding-left:70px !important;} .indent_3 { padding-left:85px !important;}'
			+ '.indent_4 { padding-left:100px !important;} .indent_5 { padding-left:115px !important;} .indent_6 { padding-left:130px !important;} .indent_7 { padding-left:145px !important;}'
			+ ' .indent_8 { padding-left:160px !important;} .indent_9 { padding-left:175px !important;} .indent_10 { padding-left:190px !important;} .indent_11 { padding-left:205px !important;}'
			+ ' .indent_12 { padding-left:220px !important;} .indent_13 { padding-left:235px !important;} .indent_14 { padding-left:250px !important;} .indent_15 { padding-left:265px !important;}'
			+ ' .indent_16 { padding-left:270px !important;} .indent_17 { padding-left:295px !important;} .indent_18 { padding-left:310px !important;} .indent_19 { padding-left:325px !important;} .indent_20 { padding-left:340px !important;}'
			+ ' .indent_21 { padding-left:355px !important;} .indent_22 { padding-left:370px !important;} .indent_23 { padding-left:385px !important;} .indent_24 { padding-left:400px !important;}'
			+ ' .indent_25 { padding-left:415px !important;} .indent_26 { padding-left:430px !important;} .indent_27 { padding-left:445px !important;} .indent_28 { padding-left:460px !important;}'
			+ ' .indent_29 { padding-left:475px !important;} .indent_30 { padding-left:490px !important;}';
		}
		else if ( d3.content.variant.indexOf('leprosorium') > -1 )
		{
			css += 'div.post {padding-bottom: 1px !important;margin-bottom: 1.8em !important;} .tree {margin-left:140px !important;} .indent_0 { margin-left:5px !important;} .indent_1 { margin-left:20px !important;} .indent_2 { margin-left:35px !important;} .indent_3 { margin-left:50px !important;}'
			+ '.indent_4 { margin-left:65px !important;} .indent_5 { margin-left:80px !important;} .indent_6 { margin-left:95px !important;} .indent_7 { margin-left:110px !important;}'
			+ ' .indent_8 { margin-left:125px !important;} .indent_9 { margin-left:140px !important;} .indent_10 { margin-left:155px !important;} .indent_11 { margin-left:170px !important;}'
			+ ' .indent_12 { margin-left:185px !important;} .indent_13 { margin-left:200px !important;} .indent_14 { margin-left:215px !important;} .indent_15 { margin-left:230px !important;}'
			+ ' .indent_16 { margin-left:245px !important;} .indent_17 { margin-left:260px !important;} .indent_18 { margin-left:275px !important;} .indent_19 { margin-left:290px !important;} .indent_20 { margin-left:305px !important;}'
			+ ' .indent_21 { margin-left:320px !important;} .indent_22 { margin-left:335px !important;} .indent_23 { margin-left:350px !important;} .indent_24 { margin-left:365px !important;}'
			+ ' .indent_25 { margin-left:380px !important;} .indent_26 { margin-left:395px !important;} .indent_27 { margin-left:410px !important;} .indent_28 { margin-left:425px !important;}'
			+ ' .indent_29 { margin-left:440px !important;} .indent_30 { padding-left:455px !important;}';
		}

		css += '.b-comments_controls_social {display: inline; padding: 5px 0px 0px 5px;} .b-comments_controls_sort{display: inline;}'
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
