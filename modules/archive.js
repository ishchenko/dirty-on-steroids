// Сссылки на посты за сегодня / вчера
d3.addModule(
{
	type: "Содержание",
	name: 'Сссылки на посты за сегодня / вчера',
	author: 'crea7or',
	variant: ['leprosorium.ru'],
	config: {
		active:{type:'checkbox',value:1}
	},

	run: function()
	{
    	var d = new Date();
        var todayPostsLink = this.getDateString( d );
        var dy = new Date();
        dy.setDate(dy.getDate() - 1);        
        var yesterdayPostsLink = this.getDateString( dy );
        var newDiv = document.createElement('div');
        newDiv.setAttribute('style', 'padding: 20px;');
        newDiv.appendChild( document.createTextNode('Посты за '));
        var newLink = document.createElement('a');
        newLink.setAttribute('href', todayPostsLink );
        newLink.innerHTML = "сегодня";
        newDiv.appendChild( newLink );
        newDiv.appendChild( document.createTextNode(' и '));
        newLink = document.createElement('a');
        newLink.setAttribute('href', yesterdayPostsLink );
        newLink.innerHTML = "вчера";
        newDiv.appendChild( newLink );
        d3.content.addToLeftNav( newDiv );
	},
	getDateString: function( d )
	{
	    var postsLink = "http://leprosorium.ru/archive/" + d.getFullYear();
	    if ( d.getMonth() < 9 )
	    {
	        postsLink += "0";
	    }
	    postsLink += ( d.getMonth() + 1 );

	    if ( d.getDate() < 10 )
	    {
	        postsLink += "0";
	    }
	    postsLink += ( d.getDate());
	    return postsLink;
	}
});
