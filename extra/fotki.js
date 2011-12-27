
d3.addModule(
{
	type: "Содержание",
	name: 'Фотогалерея поста',
	author: 'maniak',
	config: {active:{type:'checkbox',value:true}},
	run: function()
	{
		if((document.location+"").search("dirty.ru/comments") >= 0)
		{
			$j("body").prepend("<div id='fotkiMain' style='background-color:black;'><div id='fotkiShow' style='padding:7px;'><a href='#' id='aFotkiShow' style='color:white'><b>Показать все картинки</b></a></div><div id='fotkiHide1' style='padding:7px;'><a href='#' id='aFotkiHide1' style='color:white'><b>Нахуй картинки, буду читать</b></a></div><div id='fotkiFotki' style='line-height:0px;background-color:white;'></div><div id='fotkiHide2' style='padding:7px;'><a href='#' id='aFotkiHide2'  style='color:white'><b>Нахуй картинки, буду читать</b></a></div></div>");
			
			$j("#aFotkiShow").click(this.fotkiShow);
			$j("#aFotkiHide1").click(this.fotkiHide);
			$j("#aFotkiHide2").click(this.fotkiHide);

			this.fotkiHide();
		}	
	},

	fotkiHide: function()
	{	$j('#fotkiFotki').hide();
		$j('#fotkiShow').show();
		$j('#fotkiHide1').hide();  
		$j('#fotkiHide2').hide();  
	},

	fotkiShow: function()
	{
		$j("#fotkiFotki").innerHTML = "";
		
		var imgs = $j("#js-commentsHolder img"); 
		var text = "";
		imgs.each(function()
		{	
			var it_p = $j(this);
			var count = 0;
			var id = 0;
			do
			{   it_p = $j(it_p).parent();
				count++;
				if($j(it_p).hasClass("comment"))    id = $j(it_p).attr("id");
			}while(!$j(it_p).hasClass("comment") && count < 5);
		
			text += "<a href='#"+id+"'><img src='"+$j(this).attr("src")+"' height='250' width='"+(250*$j(this).width()/$j(this).height())+"'></a>";
		});
		$j("#fotkiFotki").html(text);
		
		$j('#fotkiShow').hide();
		$j('#fotkiHide1').show();
		$j('#fotkiHide2').show();
		$j('#fotkiFotki').show();
	}
});
