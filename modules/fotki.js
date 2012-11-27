
d3.addModule(
{
	type: "Содержание",
	name: 'Фотогалерея поста',
	author: 'maniak,crimaniak',
	config: {active:{type:'checkbox',value:true},height:{type:'text',value:'200px',caption:'Высота картинок в фотогалерее'}},
	run: function()
	{
		if(!d3.content.comments.length || !(this.imgs=$j('.c_body img')).length) return;

		$j("body").prepend
			("<div id='fotkiMain' style='background-color:black;'>"
			+"<div id='fotkiShow' style='padding:7px;'><a href='#' id='aFotkiShow' style='color:white'><b>Показать все картинки</b></a></div>"
			+"<div id='fotkiHide1' style='padding:7px;color:white'>"
			+"<a href='#' id='aFotkiHide1' style='color:white'><b>Убрать картинки, буду читать</b></a>"
			+" &nbsp; Размеры: " + function(){var t='';$j.each([50,75,100,125,150,200,250],function(i,s){t+=' &nbsp; <a href="#" style="color:white" class="newSize">'+s+'px</a>';});return t;}()
			+"</div>"
			+"<div id='fotkiFotki' style='line-height:0px;background-color:white;'></div>"
			+"<div id='fotkiHide2' style='padding:7px;'><a href='#' id='aFotkiHide2'  style='color:white'><b>Убрать картинки, буду читать</b></a></div></div>");
		
		var me=this;
		
		$j("#aFotkiShow").click(function(){me.fotkiShow(me.config.height.value);});
		$j("#aFotkiHide1").click(this.fotkiHide);
		$j("#aFotkiHide2").click(this.fotkiHide);
		$j('.newSize').click(function(){return me.setNewSize($j(this).text());});

		this.fotkiHide();
	},
	
	setNewSize: function(size)
	{
		this.config.height._control.setValue(size);
		d3.config.save();			
		
		$j('#fotkiFotki img').each(function(){this.setAttribute('height',size);});
		return false;
	},

	fotkiHide: function()
	{	$j('#fotkiFotki').hide();
		$j('#fotkiShow').show();
		$j('#fotkiHide1').hide();  
		$j('#fotkiHide2').hide();  
	},

	fotkiShow: function(h)
	{
		var found=[];
		var needToSort=false;
		$j.each(d3.content.comments,function(index,c)
		{
			$j('img',c.container).each(function(index)
			{
				if(this.src=='http://img.dirty.ru/pics/lapata.gif') return;
				found.push({src:this.src,id:c.id,rating:c.ratingValue()});
				var r=c.ratingValue();
				if(r!=0 && r==r) needToSort=true;
			});
		});
		if(needToSort) found.sort(function(a,b){return b.rating-a.rating;});
		
		var text = "";
		$j.each(found,function(index,image)
		{
			text+="<a href='#"+image.id+"'><img src='"+image.src+"' height='"+h+(needToSort ? "' title='Рейтинг "+image.rating : '')+"'></a>";
		});
		$j("#fotkiFotki").html(text);
		
		$j('#fotkiShow').hide();
		$j('#fotkiHide1').show();
		$j('#fotkiHide2').show();
		$j('#fotkiFotki').show();
	}
});
