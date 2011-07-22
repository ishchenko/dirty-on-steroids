
var Post=function(container)
{
	var post=this;
	this.container=container;
	this.info=$j('.dd',this.container);
	this.rating=
	{
		getValue: function(){return $j('.vote_result',post.container).text();}
	};
	this.userName = $j('a[href^="/user/"]',this.info).text();
	this.isNew = $j('a[href*="#new"]',this.info).length;
	this.isMine = this.userName==d3.user.name;
};

Post.prototype=new Item
({
	contentClass: '.dt'
});



