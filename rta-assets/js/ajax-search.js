function ajaxSearch (referal){
	$('li.resual-searc').remove();
	var ajaxSearch = [];
	// $.ajax({
	// 	type: 'post',
 //        url: "search.php", //Путь к обработчику
 //        data: {'referal':referal},
 //        response: 'text',
 //        success: function(data){
 //            ajaxSearch = data;
 //            console.log(ajaxSearch);
 //        }
 //    })
	var ajaxSearch = [
		{
			href:1,
			title: 'Pay fines',
			text:'Pay fines Pay fines Pay fines Pay fines Pay fines'
		},
		{
			href:2,
			title: 'Pay fines',
			text:'Pay fines Pay fines Pay fines Pay fines Pay fines Pay fines Pay fines Pay fines Pay fines Pay fines'
		},
		{
			href:3,
			title: 'Pay fines',
			text:'Pay fines Pay fines Pay fines Pay fines Pay fines'
		},
		{
			href:1,
			title: 'Pay fines',
			text:'Pay fines Pay fines Pay fines Pay fines Pay fines'
		},
		{
			href:2,
			title: 'Pay fines',
			text:'Pay fines Pay fines Pay fines Pay fines Pay fines'
		},
		{
			href:3,
			title: 'Pay fines',
			text:'Pay fines Pay fines Pay fines Pay fines Pay fines'
		}
	];
	var i = ajaxSearch.length;
	$('#number-result').text(i);
	while ( i != 0 ){
		var thisA = ajaxSearch[i-1];
		console.log(thisA);
		var html = "<li class=\"col-xs-6 col-sm-4 resual-searc\"><a href=\"" + thisA.href + "\"><div class=\"search-ul__text\"><h5>" + thisA.title + "</h5><p>"+ thisA.text + "</p></div></a></li>";
		$('.search-resault ul').prepend(html);
		i--;
	}
}	

$(document).ready(function(){
	$('#search-ajax').click(function(){
		ajaxSearch($('#search-ajax-value').val());
		$('.M-search').fadeOut(300);
		$('.search-resault').fadeIn(300);
		$('#big-search').addClass('blur');
	});
	$('#searchKW').click(function(){
		$('#big-search').addClass('blur');
	})
	$(document).on('click', function (e) {
	    var container = $(".big-search__input-wr");
	    if (container.has(e.target).length === 0){
	        $('#big-search').removeClass('blur');
	              
	    }
	});
	$('#searchKW').keydown(function(event){ //отлавливаем нажатие клавиш
	  if (event.keyCode == 13) {
	  		ajaxSearch($('#search-ajax-value').val());
	  		$('.M-search').fadeOut(300);
			$('.search-resault').fadeIn(300);
	  }
	});
});