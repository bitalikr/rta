var navUserAgent = navigator.userAgent;
var mobileOS = {
	isAndroid: function() {
		return navUserAgent.match(/Android/i);
	},
	isBlackBerry: function() {
		return navUserAgent.match(/BlackBerry/i);
	},
	isIOS: function() {
		return navUserAgent.match(/iPhone|iPad|iPod/i);
	},
	isOpera: function() {
		return navUserAgent.match(/Opera Mini/i);
	},
	isWindows: function() {
		return navUserAgent.match(/IEMobile/i);
	},
	any: function() {
		return (mobileOS.Android() || mobileOS.BlackBerry() || mobileOS.iOS() || mobileOS.Opera() || mobileOS.Windows());
	}
};
$(document ).ready(function() {
	//remove search bar on iDos pages
	if($('#servicesSurvey').length > 0) {
		$("#global-search").hide();
		$(".rtaLayoutContainer").css("padding-top", "0px");
		$( "div#search_part.search-service" ).detach().prependTo( "#readMe" );
		$("#layoutContainers > div.site").toggleClass('site', 'site_idos');
	}
	
	if(window.location.href.indexOf("newuser") > -1) {
		$(".rtaLayoutContainer").css("padding-top", "0px");
		$("#1ColumnContainer").removeClass("site");
	}
	
	//add readThis id for readspeaker everywhere BUT the homepage
	if($('.readThis').length != -1) {
		if ($('.wpthemeControlBody').length > 1) {
			$('.wpthemeControlBody:eq(1)').attr('id', 'readThis');
		} else {
			$('.wpthemeControlBody').attr('id', 'readThis');
		}
	}

	//Hide crumbtrail from home and idos pages
	if ($('.breadcrumb').length > 0 || $('#rtaApps-thumbs').length > 0) {
		$('#rtaCrumbs').hide();
		$('#rtaCrumbs_top').hide();
	}
	
	if($('#allServicesList').length > 0){
		$("#rtaCrumbs_top").insertBefore(".mainContainer");	
	}
	
	//Set logo to local home
	//var localHome = $('.main_nav_bar li:eq(1)').find('a').attr('href');
	var localHome = $('.shortHome').find('a').attr('href');
	$('#logos a:eq(1)').attr('href', localHome);
	$("a#breadcrumb_ar").attr("href", localHome);

	//Last modified date - English
	var dates = [];
	var d, arDate, date = '';
	moment.locale("ar");
	/*if ($(".last-modified").length == 0) {*/
		var d = new Date();
		d = d.valueOf()
		dates.push(d);
	/*} else {
		$( ".last-modified" ).each( function( index, element ){
			var test = $( this ).val();
			if(parseInt(test.charCodeAt(0)) < 1000) {
				d = moment($( this ).val());
			} else {
				arDate = $(this).val();
				for (var i = 0; i < arDate.length; i++) {
					var charCode = arDate.charCodeAt(i);
					if (charCode != 45) {
						 charCode -= 1632;
						 date += charCode;
					 } else {
						 date += String.fromCharCode(charCode);
					 }
				 }
				 var d = moment(date, "DD-MM-YYYY");
				 
			 }
		   d = d.valueOf()
		   dates.push(d);
		 });
	}*/
	var max = Math.max.apply(Math,dates);
	var lastModDate = moment(max).format("YYYY/MM/DD");
		 if (lastModDate.toString() === 'Invalid date') {
		 lastModDate = new Date();
		 lastModDate = moment(lastModDate).format("YYYY/MM/DD");
	}
	$("#display-date").append(lastModDate);
});