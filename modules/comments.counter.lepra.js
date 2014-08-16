// Comments Statistic
d3.addModule(
{
	type: "Социализм",
	name: 'Статистика по комментариям',
	author: 'crea7or',
	variant: ['leprosorium.ru'],
	config: {
		active:{type:'checkbox',value:0}
		},
	usersArray: new Array(),
	
	onComment: function(comment)
	{
		var userObject = this.findElement( comment.userName );

		var elemArray = comment.getFooter().get(0).querySelectorAll('a.c_user');
		for(var i = 0; i < elemArray.length; i++)
		{
			if (elemArray[i].previousSibling.nodeValue.indexOf('Написала') > -1 )
			{
				// female, mmmmm....
				userObject.gend = 1;
			}
			else
			{
				//male
				userObject.gend = 0;
			}
			elemArray[i].style.textDecoration = 'none';
			userObject.comms++;			
			userObject.size += $j('.c_body', comment.container )[0].innerHTML.length;;
			userObject.score += parseInt( $j('.vote_result', comment.container )[0].innerHTML, 10 );;
		}
	},

	findElement: function( name )
	{
		for(var i = 0; i < this.usersArray.length; i++)
		{
			if (this.usersArray[i].name == name )
			{
				return this.usersArray[i];
			}
		}
		var obj = {name: name, comms: 0, size: 0, score: 0, gend: 0 };
		this.usersArray.push(obj);
		return obj;		
	},

	run: function()
	{
			var head = (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]);
    		var script1 = document.createElement( 'script' );
	   		script1.type = 'text/javascript';
	    	script1.textContent = 'var people, asc1 = 1, asc2 = 1, asc3 = 1;'
	    		+ ' function sort_table(tbody, col, asc, digit){'
				+ 'var rows = tbody.rows, rlen = rows.length, arr = new Array(), i, j, cells, clen;'
				+ 'for(i = 0; i < rlen; i++){'
				+ 'cells = rows[i].cells;'
				+ 'clen = cells.length;'
				+ 'arr[i] = new Array();'
				+ 'for(j = 0; j < clen; j++){'
				+ 'arr[i][j] = cells[j].innerHTML;'
				+ '}}'
				+ 'if ( digit == 0 ){'
				+ 'arr.sort(function(a, b){'
				+ 'return (a[col].toUpperCase() == b[col].toUpperCase()) ? 0 : ((a[col].toUpperCase() > b[col].toUpperCase()) ? asc : -1*asc);'
				+ '});'
				+ '}'
				+ 'if ( digit == 1 ){'
				+ 'arr.sort(function(a, b){'
				+ 'return (parseInt(a[col], 10) == parseInt(b[col], 10)) ? 0 : ((parseInt(a[col], 10) > parseInt(b[col], 10)) ? asc : -1*asc);'
				+ '});'
				+ '}'
				+ 'for(i = 0; i < rlen; i++){'
				+ 'arr[i] = "<td>"+arr[i].join("</td><td>")+"</td>";'
				+ '}'
				+ 'tbody.innerHTML = "<tr>"+arr.join("</tr><tr>")+"</tr>";'
				+ '}';
   			head.appendChild( script1 );
	},

	onCommentsUpdated: function()
	{
		headerPlace = document.querySelector('div.l-content_aside');
		if ( headerPlace )
		{
			tct = document.getElementById('topcharttable');
			if ( tct == null)
			{
				newDiv = document.createElement('div');
				newDiv.setAttribute('id' , 'topcharttable'); 

				newTable = document.createElement('table');				
				newTable.setAttribute('cellspacing' , 2 ); 
				newTable.setAttribute('cellpadding' , 2 );
				newTable.setAttribute('width' , '95%' );
				newTable.setAttribute('align' , 'center' );
				newTable.setAttribute('style', 'table-layout: fixed; font-size: 10px; color: #666;');

				newTableHead = document.createElement('thead');
				newTableHead.setAttribute('style', 'text-decoration: underline; cursor: pointer;');

				newTr = document.createElement('tr');
				newTh = document.createElement('th');
				newTh.setAttribute('onclick', 'sort_table(topchart, 0, asc1, 0); asc1 *= -1; asc2 = 1; asc3 = 1;');
				newTh.setAttribute('style', 'width: 85px; text-align: left; max-width: 85px; overflow: hidden; text-overflow: ellipsis;');
				newTh.appendChild( document.createTextNode('имя'));
				newTr.appendChild( newTh );

				newTh = document.createElement('th');
				newTh.setAttribute('onclick', 'sort_table(topchart, 1, asc1, 1); asc1 *= -1; asc2 = 1; asc3 = 1;');
				newTh.setAttribute('style', 'width: 30px; text-align: left;');
				newTh.appendChild( document.createTextNode('ком.'));
				newTr.appendChild( newTh );

				newTh = document.createElement('th');
				newTh.setAttribute('onclick', 'sort_table(topchart, 2, asc1, 1); asc1 *= -1; asc2 = 1; asc3 = 1;');
				newTh.setAttribute('style', 'width: 50px; text-align: left;');
				newTh.appendChild( document.createTextNode('симв.'));
				newTr.appendChild( newTh );

				newTh = document.createElement('th');
				newTh.setAttribute('onclick', 'sort_table(topchart, 3, asc1, 1); asc1 *= -1; asc2 = 1; asc3 = 1;');
				newTh.setAttribute('style', 'width: 50px; text-align: left;');
				newTh.appendChild( document.createTextNode('+/-'));
				newTr.appendChild( newTh );

				newTableHead.appendChild( newTr );
				newTable.appendChild( newTableHead );

				newTableBody = document.createElement('tbody');
				newTableBody.setAttribute('id', 'topchart');

				maleComments = 0;
				femaleComments = 0;
				maleCommentsSize = 0;
				femaleCommentsSize = 0;
				males = 0;
				females = 0;
				totalSize = 0;
				totalScore = 0;

				for(var i = 0; i < this.usersArray.length; i++)
				{
					newTr = document.createElement('tr');

					newTd = document.createElement('td');
					newA = document.createElement('a');
					newA.setAttribute('href', '/users/' + this.usersArray[i].name );
					newA.appendChild( document.createTextNode( this.usersArray[i].name ));
					newTd.setAttribute('style', 'width: 85px; max-width: 85px; overflow: hidden; text-overflow: ellipsis;');
					newTd.appendChild( newA );	

					newTr.appendChild( newTd );

					newTd = document.createElement('td');
					newTd.appendChild( document.createTextNode( this.usersArray[i].comms ));
					newTr.appendChild( newTd );

					newTd = document.createElement('td');
					newTd.appendChild( document.createTextNode( this.usersArray[i].size ));
					newTr.appendChild( newTd );

					newTd = document.createElement('td');
					newTd.appendChild( document.createTextNode( this.usersArray[i].score ));
					newTr.appendChild( newTd );

					newTableBody.appendChild( newTr );

					if ( this.usersArray[i].gend == 0 )
					{
						//male
						males++;
						maleComments += this.usersArray[i].comms;
						maleCommentsSize += this.usersArray[i].size;
					}
					else
					{
						//female
						females++;
						femaleComments += this.usersArray[i].comms;
						femaleCommentsSize += this.usersArray[i].size;
					}

					totalSize += this.usersArray[i].size;
					totalScore += this.usersArray[i].score;

				}
				newTable.appendChild( newTableBody );

				//general stats
				statDiv = document.createElement('div');
				statDiv.setAttribute('style', 'width: 220px; padding: 10px; font-size: 10px; color: #666;');
				statDiv.appendChild( document.createTextNode( 'Статистика по комментариям:'));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'мальчики: '+males));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'комментариев: '+maleComments));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'общим размером: '+maleCommentsSize));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'девочки: '+females));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'комментариев: '+femaleComments));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'общим размером: '+femaleCommentsSize));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'Всего написано символов: '+totalSize));
				statDiv.appendChild( document.createElement('br'));
				statDiv.appendChild( document.createTextNode( 'Общая оценка: '+totalScore));

				newDiv.appendChild( statDiv );

				newDiv.appendChild( document.createElement('br'));
				newDiv.appendChild( newTable );
				headerPlace.appendChild( newDiv );
			}
		}
	},
});
