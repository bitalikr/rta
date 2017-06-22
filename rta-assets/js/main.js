var blindmode = $.cookie('blindMode');
if (blindmode == 'on') {
	$("#govDubai").attr('src','rta-assets/css/img/bw/govt-of-dubai.png');
	$("#rtaLogo").attr('src','rta-assets/css/img/bw/RTAlogo-white.png');
	$(".view").addClass("active");
	var cssLink = $("<link rel='stylesheet' type='text/css' href='" + getSiteJunction() + 
	"/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/css/blind.css'>");
	$("head").append(cssLink); 
}

var screenWidth = $(window).width();

$(window).on('resize', function() {
	screenWidth = $(window).width();
	if (screenWidth > 768) {
		$('#main_nav_part .second-menu').attr('style','');
		$('ul.main_nav_bar.clearfix').attr('style', '');
	}
});

 $(document).ready(function(e) {
	 
	$('#search-ajax-value').on('click',function(){
		$(this).closest('.big-search__input-wr').addClass('active');
	})
	 $("a.extUrl").on("click", function(e) { 
		e.preventDefault();  
		var lnk = $(this).attr("href");
		$.colorbox({ inline:true, closeButton:false, href:"#pageRedirect"});
		setTimeout(function() { window.location.href = lnk; }, 2000);
	}); 

 	$('ul.main_nav_bar>li.has_submenu').click(function(e) {
 		if (screenWidth <= 768) {
 			if (!$(this).hasClass('expanded')) {
 				e.preventDefault();
 			}
	 		$('#main_nav_part ul.main_nav_bar>li.has_submenu').removeClass('expanded');
	 		$('#main_nav_part ul.main_nav_bar>li>.second-menu').hide();
	 		$(this).addClass('expanded');
	 		$(this).find('.second-menu').show();
	 	}
 	});

 	$("#nav-open-btn").click(function() {
 		$('#main_nav_part ul.main_nav_bar>li.has_submenu').removeClass('expanded');
 		$('#main_nav_part ul.main_nav_bar>li>.second-menu').hide();
		$(".main_nav_bar").toggle("slow");
		$("#mobileLogin").toggle("slow");
    //$('.main_nav_bar').toggle("slide", {direction:"left"}, 500);
	});

	/*if ($.cookie!=null && $.cookie('speechMode') == 1) {
		$(".speech").addClass("active");
		$("#readspeaker_button1").show(); 
	}
*/
	$("#readSpeakerID").attr("href", "https://app-as.readspeaker.com/cgi-bin/rsent?customerid=8316&lang=en_uk&readid=readMe&url="+document.location.href);

		function SelectText(element) {
	    var doc = document
	        , text = doc.getElementById(element)
	        , range, selection
	    ;    
	    if (doc.body.createTextRange) {
	        range = document.body.createTextRange();
	        range.moveToElementText(text);
	        range.select();
	    } else if (window.getSelection) {
	        selection = window.getSelection();        
	        range = document.createRange();
	        range.selectNodeContents(text);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	}
	
	/*
	$('.speech').click(function() {
    	if (!$(this).hasClass('active')) {
        	SelectText('readThis');
    	} else {
    		if (document.selection) {
				document.selection.empty();
			} else if (window.getSelection) {
				window.getSelection().removeAllRanges();
			}
    	}
    });
	*/
	
	$(".view").click(function(){
		if ($(this).hasClass("active")) {
			$.cookie('blindMode', 'off', {expires:1, domain:'rta.ae', path:'/'});
			$('link[rel=stylesheet][href~="' + getSiteJunction() +
			'/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/css/blind.css"]').remove();
			$(this).removeClass("active");
			$("#govDubai").attr('src','rta-assets/img/govt-of-dubai.png');
			$("#rtaLogo").attr('src','rta-assets/img/rta.png');
		} else {
			$.cookie('blindMode', 'on', {expires:1, domain:'rta.ae', path:'/'});
			$(this).addClass("active"); 
			$("#govDubai").attr('src','rta-assets/css/img/bw/govt-of-dubai.png');
			$("#rtaLogo").attr('src','rta-assets/css/img/bw/RTAlogo-white.png');
			var cssLink = $("<link rel='stylesheet' type='text/css' href='" + getSiteJunction() +
			"/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/css/blind.css'>");
			$("head").append(cssLink);
		}
	});
	$(".speech").click(function(){
		if ($(this).hasClass("active")) { 
			//$.cookie('speechMode', '0', { expires: 1 });
			$(this).removeClass("active");
			$("#readspeaker_button1").hide(); 
		} else { 
		    //$.cookie('speechMode', '1', { expires: 1 });
			$(this).addClass("active"); 
			$("#readspeaker_button1").show(); 
		}
	});
	// handles the carousel thumbnails

$('[id^=carousel-selector-]').click( function(){
  var id_selector = $(this).attr("id");
  var id = id_selector.substr(id_selector.lastIndexOf('-') + 1);
  id = parseInt(id);
  $('#rtaApps').carousel(id-1);
  $('[id^=carousel-selector-]').removeClass('selected');
  $(this).addClass('selected');
});

// when the carousel slides, auto update
$('#rtaApps').bind('slide.bs.carousel', function (e) {
  var id = $('#rtaApps .active').data('slide-number');
  id = parseInt(id)+1;
  //console.log(id);
  //alert(id);
  $('[id^=carousel-selector-]').removeClass('selected');
  $('[id=carousel-selector-'+id+']').addClass('selected');
})

$('a.suggestion[href*=#]').bind("click", function(e){
		var anchor = $(this);
			if (anchor!=null) {
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 120
			}, 1000); 
			e.preventDefault();
		}
		 
	});
  

	$(".dropdown-menu li a").click(function(){
	  var selText = $(this).text(); 
	  $(this).parents('.btn-group').find('.dropdown-toggle').html(selText);
	});

	resizeHeight();
	

	var vis = 5;
	$('.search-result li').slice(vis).hide();
	var $more = $('.load-more');
	$more.click(function(){
		vis = 10;
		$('.search-result li:hidden').slice(0, vis).fadeToggle(500);
		if($('.search-result li:hidden').length == 0)
			$more.hide();
	});
	
	$(".second-menu a").click(function() {
		$me = $(this);
		$third = $me.parent().find(".third-menu");
		$third.fadeToggle(500); 
	});
	$(".third-menu .back").click(function() {
		//alert("clicked");
		$third = $("#main_nav_part .third-menu");//$me.parent().parent().parent().find(".third-menu");
		$third.fadeOut(500);
	});
	/*$(".shortMenu, .has_menu").mouseleave(function(e) {
        $third = $("#main_nav_part .third-menu");//$me.parent().parent().parent().find(".third-menu");
		$third.fadeOut(500);
    });*/

 	$('#main_nav_part .second-menu').mouseleave(function() {
	  if (screenWidth < 768) {
	  	$('#main_nav_part ul.main_nav_bar>li.has_submenu').removeClass('expanded');
	  	$second = $("#main_nav_part .second-menu").fadeOut(500);
	  }
	});
	$("#main_nav_part").mouseleave(function() {
	  $third = $("#main_nav_part .third-menu").fadeOut(500);
	});

	$('#show_login, .top-bar').click(function() {
		$me = $("#left_section");
		if ($me.css("margin-left") == "0px") 
			$me.animate({"margin-left": '-=257'});   
		else 
			$me.animate({"margin-left": '+=257'}); 
		$("#left_section").toggleClass("active");
    });

	$(".main-page").click(function(e) {
		if(document.activeElement.tagName !== 'BUTTON'){
			if ($("#left_section").hasClass("active")) 
				$("#show_login").trigger("click");
			if (document.activeElement.className != "search-autosuggest" && document.activeElement.tagName !== 'INPUT')
				if ($("#search_part .search-autosuggest").is(":visible")) 
					$(".sugclose").trigger("click");
		}
		if (document.activeElement.id != "servicesKWSuggestions" && document.activeElement.tagName !== 'INPUT') {
			$("#servicesKWSuggestions").hide();
		}
	});

$("#btnLoginConfirm, #btnLoginConfirmCR").click(function(e) {
		console.log(e.target.value);
		$("#show_login").trigger("click"); 
		e.preventDefault();
	});

	/*$(".reset-font").click(function(){
		$(this).addClass("active").siblings(".reset-font").removeClass("active");
		$("body").removeClass().addClass($(this).attr("data-font"));
	});*/
		$(".reset-font").click(function(){
		$me = $(this);
		if ($me.hasClass("medium-font")) {
			$me.removeClass("medium-font");
			$me.addClass("large-font");
			$me.attr("data-font", "medium");
		} else if ($me.hasClass("large-font")) {
			$me.removeClass("large-font");
			$me.addClass("normal-font");
			$me.attr("data-font", "large");
		} else if ($me.hasClass("normal-font")) {
			$me.removeClass("normal-font");
			$me.addClass("medium-font");
			$me.attr("data-font", "normal");
		} 
		$("body").removeClass().addClass($(this).attr("data-font"));
	});
	
	$("#regIndividual").click(function(){
		  $("#mainPanel" ).slideUp("slow");
		  //var panelH = $('#frmRegisterIndividual').innerHeight();
		  $("#frmRegisterIndividual").fadeToggle("slow");
  
	});

	$("#regCompany").click(function(){
		location.href = "#company";
		$("#mainPanel" ).slideUp("slow"); 
		$("#frmRegisterCompanyWizard").slideDown("slow"); 
		document.getElementById('frmRegisterCompanyWizard').style.display = 'block';
	});

	/*$(".backmenu").click(function(){
		  $("#frmRegisterIndividual").fadeToggle("slow");
		  $("#mainPanel" ).slideDown("slow");
  
	});*/
	$(".backmenu").click(function(e){
		if(!$(e.target).is('a')){
		  $("#frmRegisterIndividual").fadeOut("slow");
		  $("#frmRegisterCompanyWizard").fadeOut("slow");
		  $("#mainPanel" ).slideDown("slow");
		}
	});
	
	$("#btnSurveyNo").click(function(){
		  $("#searchSurvey" ).slideUp("slow");
		  //var panelH = $('#frmRegisterIndividual').innerHeight();
		  $("#searchSurveyNo").fadeToggle("slow");
  
	});
	$("#btnSurveyYes").click(function(){
		  $("#searchSurvey" ).slideUp("fast");
		  //var panelH = $('#frmRegisterIndividual').innerHeight();
		  $("#searchSurveyThankYouYes").fadeToggle("slow");
  
	});
	$("#btnSurveyNoSend").click(function(){
		  $("#searchSurveyNo" ).slideUp("fast");
		  //var panelH = $('#frmRegisterIndividual').innerHeight();
		  $("#searchSurveyThankYouNo").fadeToggle("slow");
  
	});
	$("#btnServicesSend").click(function(){
		  $("#servicesSurvey" ).slideUp("fast");
		  //var panelH = $('#frmRegisterIndividual').innerHeight();
		  $("#servicesSurveyThanks").fadeToggle("slow");
  
	});
	$('#formServicesSurvey input, #formServicesSurvey textarea').change(function() {
		$("#btnServiceReset").show();
	});
	$('#btnServiceReset').click(function() {
		$("#formServicesSurvey")[0].reset(); 
		$("input").removeClass("error"); 
		$(this).hide();
    });
	$(".sclose, .close").click(function(){
		$("#searchSurvey").slideUp(1000);
		$("#searchSurveyNo").slideUp(1000);
		$("#searchSurveyThankYouYes").slideUp(1000);
		$("#searchSurveyThankYouNo").slideUp(1000);
		$("#servicesSurvey").slideUp(1000);
		$("#servicesSurveyThanks").slideUp(1000);
		
	});

	$(".inline").colorbox({
		inline:true,
		scrolling:false
	});
	//$(".suggestions a").on("click", function() {
	
	
	$('#rtaApps').carousel({
		interval: 4000
	});
$('#slider_news').carousel({
		interval: 10000
	});


$(".user-select-countries").change(function() {
	var selText = $(this).val();
	$tar = $(".user-phone-city-selector");  
	console.log($(this).attr("data-id"));
	if (selText == "AE" || selText == "United Arab Emirates" || selText == "00971" ||  selText.indexOf("971") >= 0) {
		$tar.find(".uae-emirates").show();
		$tar.find(".other-city").hide();
		$("#mobileNumberId").attr("maxlength", "7");
		$("#mobileNumberId").val("");
	} else {
		$tar.find(".uae-emirates").hide();
		$tar.find(".other-city").show();
		$(".user-phone-city-selector .other-city input").val("");
		$("#mobileNumberId").attr("maxlength", "12");
		$("#mobileNumberId").val("");
	}
});
 
$("#countryTradeLicId").change(function() {
	var selText = $(this).val();
	$tar = $(".trade-city-selector");
	if(selText != ''){
		$(this).closest(".select").removeClass("error");
	}else{
		$(this).closest(".select").addClass("error");
	}	
//	console.log($(this).attr("data-id"));
	if (selText == "AE" || selText == "ARE" ||selText == "United Arab Emirates" || selText.indexOf("971") >= 0) {
		$tar.find(".uae-emirates").show();
		$tar.find(".other-city").hide();
		$tar.find("#companyEmirateId").val();
		
	} else {
		$tar.find(".uae-emirates").hide();
		$tar.find(".other-city").show();
		$("#cityId").val("");
	}
});  
 
$(".admin-tel-countries").change(function() {
	var selText = $(this).val();
	$tar = $(".admin-phone-city-selector");
	console.log($(this).attr("data-id"));
	if (selText == "AE" || selText == "United Arab Emirates" || selText.indexOf("971") >= 0) {
		$tar.find(".uae-emirates").show();
		$tar.find(".other-city").hide();
		$("#mobileExtId").attr("maxlength", "7");
		$("#mobileExtId").val("");
	} else {
		$tar.find(".uae-emirates").hide();
		$tar.find(".other-city").show();
		$(".admin-phone-city-selector .other-city input").val("");
		$("#mobileExtId").attr("maxlength", "12");
		$("#mobileExtId").val("");
	}
}); 

$(".company-tel-countries").change(function() {
	var selText = $(this).val();
	$tar = $(".company-phone-city-selector"); 
	if (selText == "AE" || selText == "United Arab Emirates" ||  selText.indexOf("971") >= 0) {
		$("#companyTelNumberId").attr("maxlength", "7");
		$("#companyTelNumberId").val("");
		$("#companyFaxId").attr("maxlength", "7");
		$("#companyFaxId").val("");
	} else {
		$("#companyTelNumberId").attr("maxlength", "12");
		$("#companyTelNumberId").val("");
		$("#companyFaxId").attr("maxlength", "12");
		$("#companyFaxId").val("");
	}
});
$(".company-select-trade").on("change, blur", function() {
	//alert($(this).val());
	if ($(this).val() == "")
		$(this).parent().addClass("error");
	else
		$(this).parent().removeClass("error");
});
 $('.jq-select').select2(); 
 
 function formatState (state) {
   if (!state.id) {return state.text; }
   
   if( state.element.value.indexOf("00") >= 0 ){  
	   var $state = $(
	  '<span><img src="/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags_codes/' + encodeURIComponent(state.element.value) + '.png" class="img-flag" /> ' + state.text + '</span>'
	   );
   }else{
	   var $state = $(
	  '<span><img src="/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags/' + encodeURIComponent(state.element.value.toLowerCase()) + '.png" class="img-flag" /> ' + state.text + '</span>'
	   );
   }
   
   return $state;
 };
  
 $(".jq-flags").select2({
   templateResult: formatState
 }); 
 
 $(".jq-flags").bind("change", function() {
  $me = $(this);
  $sel = $me.parent().find(".select2-selection--single");
  //alert($me.val()); 
  if($me.val()){
	if( $me.val().indexOf("00") >= 0 ){  
		$sel.attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags_codes/" + encodeURIComponent($me.val()) + ".png) no-repeat 10px center; padding-left:20px");
	}else{
		$sel.attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags/" + encodeURIComponent($me.val().toLowerCase()) + ".png) no-repeat 10px center; padding-left:20px");
	}
  }
 });
 $(".jq-flags").each(function(index, element) {
  $me = $(this);
  $sel = $me.parent().find(".select2-selection--single");
  //alert($me.val()); 
  if($me.val()){
	  if( $me.val().indexOf("00") >= 0 ){  	  
		$sel.attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags_codes/" + encodeURIComponent($me.val()) + ".png) no-repeat 10px center; padding-left:20px");
	  }else{
		$sel.attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags/" + encodeURIComponent($me.val().toLowerCase()) + ".png) no-repeat 10px center; padding-left:20px");
	  }
  }
 });
 $(".select2-container").each(function(index, element) {
        $me = $(this);
  $me.removeAttr("style");
    });
 
 
 $('#frmRegisterCompany input, #frmRegisterCompany select').change(function() {
  $("#resetButton").show();
 });
 $('#frmCompanyAdmin input, #frmCompanyAdmin select').change(function() {
  $("#resetButtonCA").show();
 });
 $('#frmRegisterCompany input[type="radio"]').click(function() {
	$me = $(this);
	/*if ($(".fuUploadSuccess").is(":visible"))
		$('#btnNext').show(); 
	else
		$('#btnNext').hide();*/
	
	if ($me.val() == "DEDComp") {
		$("#dedOptions").show();
		$("#docsSupporting").hide();
	}else if ($me.val() == "OutsideAE" || $me.val() == "NotDEDComp"){
		$("#dedOptions").hide();
	}
	
	if ($me.val() == "DEDComp" && $me.attr("id") != "DEDCompOtherId"){
		$("#docsSupporting").hide();
	}else if ($me.val() == "other" || $me.attr("id") == "DEDCompOtherId") {
		$("#docsSupporting").hide();
		$('#btnNext').show();
	}else{
		$("#docsSupporting").show();
	}

 });

 
 var currentHash = window.location.hash;
 //console.log(currentHash);
 if (currentHash == "#individual") {
     $("#regIndividual").trigger("click");
 } else if (currentHash == "#company") {
  $("#regCompany").trigger("click");
 }

 $("#btnServicesSend").click(function(){
    $("#servicesSurvey" ).slideUp("fast");
    //var panelH = $('#frmRegisterIndividual').innerHeight();
    $("#servicesSurveyThanks").fadeToggle("slow");
  
 });
 $('#formServicesSurvey input, #formServicesSurvey textarea').change(function() {
  $("#btnServiceReset").show();
 });
 $('#btnServiceReset').click(function() {
  $("#formServicesSurvey")[0].reset(); 
  $("input").removeClass("error"); 
  $(this).hide();
    });
 $(".sclose, .close").click(function(){
  $("#searchSurvey").slideUp(1000);
  $("#searchSurveyNo").slideUp(1000);
  $("#searchSurveyThankYouYes").slideUp(1000);
  $("#searchSurveyThankYouNo").slideUp(1000);
  $("#servicesSurvey").slideUp(1000);
  $("#servicesSurveyThanks").slideUp(1000);
  
 });

	$("ul.social-media-share li a").click(function(e) {
		e.preventDefault();
		var title = $(this).attr("data-title");
		var shareUrl = $(this).attr("data-url");
		var channel = $(this).attr("data-channel");
		
		if(title == null || title == ''){
			title = document.title;
		}
		if(shareUrl == null || shareUrl == ''){
			shareUrl = window.location.href;
		}
		shareUrl = encodeURIComponent(shareUrl);
		title = encodeURIComponent(title);
		
		var facebookURL = 'https://www.facebook.com/sharer.php?t='+title+'&u='+shareUrl;
		var twitterURL = 'https://twitter.com/intent/tweet?text='+title+'&url='+shareUrl+'&via=RTA_Dubai';		
		var googleplusURL = 'https://plus.google.com/share?url='+shareUrl;
		var linkedinUrl = 'https://www.linkedin.com/shareArticle?mini=true&title='+title+'&url='+shareUrl;
		var emailHref = 'mailto:?subject='+title+'&body='+shareUrl;		
		
		if(channel == 'facebook'){
			window.open(facebookURL, 'sharer', 'width=655,height=430');
		}
		else if(channel == 'twitter'){
			window.open(twitterURL, 'sharer', 'width=655,height=430');
		}
		else if(channel == 'googleplus'){
			window.open(googleplusURL, '_blank');
		}			
		else if(channel == 'linkedin'){
			window.open(linkedinUrl, '_blank');
		}			
		else if(channel == 'mail'){
			window.location.href = emailHref;
		}		
	});

	//Skip portlet header added by ibm.portal.85Hidden skin
	$(".wpthemeControlHeader").addClass("rs_skip");	
	
	$("#main_nav_part ul.main_nav_bar li").mouseenter(function() {
		if (screenWidth > 768) {
			var $me = $(this);
			$me.siblings().find("a:first").removeClass("menu_item_active");
			$me.siblings().find("p:first").removeClass("menu_item_text_active");
			$me.siblings().find("img").show();				
			$me.siblings().find(".img_over").hide();
			$me.find("span img").hide();
			$me.find(".img_over").show();
			$me.find("a:first").addClass("menu_item_active");
			$me.find("p:first").addClass("menu_item_text_active");			
			$me.find(".second-menu").show();
			// added by mhassan
			$me.find("div.full-grid").css({"display": "block"});
			
		}	 
	});	
	$("#main_nav_part ul.main_nav_bar li").mouseleave(function() {
		if (screenWidth > 768) {
			$("#main_nav_part ul.main_nav_bar > li .full-grid.active-fast").hide();
			var $me = $(this);
			// added by mhassan
			$me.find("div.full-grid").css({"display": "none"});
			$me.find("a:first").removeClass("menu_item_active");
			$me.find("p:first").removeClass("menu_item_text_active");
			$me.find("img").show();				
			$me.find(".img_over").hide();
			$(this).find(".second-menu").hide();
		}				
	});
	function getKeyCode(key) {
        //return the key code
        return (key == null) ? event.keyCode : key.keyCode;
    }
	var $previousActiveElement = null;
	var $lastMenuItem = false;
    $(document).on('keyup', function (eventObj) {
        if (getKeyCode(eventObj) == '9') {
			if($previousActiveElement != null){
				$previousActiveElement.removeClass("active-shadow");	
				if($lastMenuItem){
					$previousActiveElement.trigger("mouseleave");
					$lastMenuItem = false;
				}
			}
            var $mainMenuLink = $(document.activeElement);						
			$mainMenuLink.addClass("active-shadow");
			$previousActiveElement = $mainMenuLink;
			var $liElement = $mainMenuLink.parent();	

            if ($mainMenuLink.parent().parent().hasClass('main_nav_bar')) {				
				$liElement.siblings().trigger("mouseleave");
				$liElement.trigger("mouseenter");
            }
			if($liElement.is(':last-child') && $liElement.parents('.highlight1').length>0){
				//alert('last child , currenttag = ' + $liElement.prop("tagName") );				
				$lastMenuItem = true;
			}
        }else if(getKeyCode(eventObj) == '13') {
			var $activeLink = $(document.activeElement);
			$activeLink.trigger('click');
		}
    });
	
	if($("#slider_banner")){
		$(".service-sticky").insertAfter("#slider_banner");
	}
});

function resizeHeight(){
	$("#left_section").css("height",$("html").height() + "px");
}

$(document).scroll(function (){
	var menuheight= $('header').height();
	var y = $(this).scrollTop(); 
	if (y > (menuheight)) 
		$('.main_nav_part_bg').addClass('sticky');  
	else 
		$('.main_nav_part_bg').removeClass('sticky'); 
});

 
$(function() {
	 $(".fu-doc input[type='file']").change(function () {
		 $me = $(this);
		 $t = $me.parent().parent().parent().parent();
         var fileExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp', 'doc', 'docx', 'pdf'];
		 $t.find("input[type='text']").val($me.val());
		 
		 $btn = $t.find(".btn");
		 $me.hide();
		 //console.log($btn.attr("class"));
		 if ($btn.hasClass("btn-blue")) {
			$btn.removeClass("btn-blue");
			$btn.addClass("btn-grey-dark");
		 }
		 $t.find(".msg").removeClass("upsuccess").removeClass("uperror");
		 //console.log($me[0].files[0].size);
         if ($.inArray($me.val().split('.').pop().toLowerCase(), fileExtension) == -1) {
            //alert("Only '.jpeg','.jpg', '.png', '.gif', '.bmp' formats are allowed.");
			$t.find(".msg").addClass("uperror").html("Only '.jpeg','.jpg', '.png', '.gif', '.bmp', '.doc', '.docx', '.pdf' formats are allowed"); 
         } else {
			 if ($me[0].files[0].size > 32000000)
			 	$t.find(".msg").addClass("uperror").html("The file exceeds the max. size");
			 else {
			 	$t.find(".msg").addClass("upsuccess").html("&nbsp;");
			 	$("#btnDone").show();
				$(".fu-doc:hidden").slice(0, 1).fadeToggle(500);
			 }
		 }
     });
	$(".fu-doc .btn").click(function () {
		$me = $(this);
		$t = $me.parent().parent().parent();
		if ($me.hasClass("btn-blue")) {
			$me.removeClass("btn-blue");
			$me.addClass("btn-grey-dark");
			$me.find("b").html("Delete");
			$t.find("input[type='file']").hide();
		} else {
			$me.removeClass("btn-grey-dark");
			$me.addClass("btn-blue");
			$me.find("b").html("Choose file");
			$t.find("input[type='file']").show();
			$t.find("input[type='text']").val("");			
			$t.find(".msg").removeClass("uperror").removeClass("upsuccess").html("");
		}
	});

	
	$('#btnNext').click(function() {
		if(!validateWizardOne()){
			return;
		}
		if (!$("#commLanguageEnId").attr('checked') && !$("#commLanguageArId").attr('checked'))  
			$("#commLanguageEnId").attr('checked', true); 
		if (!$("#smsId").attr('checked') && !$("#emailId").attr('checked'))  
			$("#smsId").attr('checked', true);
		if (!$("#thirdPartyYesId").attr('checked') && !$("#thirdPartyNoId").attr('checked'))  
			$("#thirdPartyYesId").attr('checked', true);
		
		if ( $('#btnNext').hasClass("btn-blue")) {
			$("#wizards-step-01").slideUp(500); 
			$("#wizards-step-02").fadeToggle(1000);  
			 $("html, body").animate({scrollTop: 150 }, "slow");
		} else {
			alert("Please select Business License issued and attach required documents");
		}
	});		
	$('#btnPrev').click(function() {
		$("#wizards-step-02").slideUp(1000); 
		$("#wizards-step-01").fadeToggle(1000);  
		 $("html, body").animate({scrollTop: 150 }, "slow"); 
	});
	$('#btnRISubmit').click(function() {
		$("#wizards-ind-01").slideUp(500); 
		$("#wizards-ind-02").fadeToggle(1000);  
		 $("html, body").animate({scrollTop: 150 }, "slow"); 
	});
	$('#btnSubmit').click(function() {
		
	});
	$("#btnDone").click(function() {
		$(".fuUploadNotDone").hide(); 
		$(".fuUploadSuccess").show(); 
		$('#btnNext').show();
	});

	$('.emailonly').bind('keyup blur',function(){  
		$me = $(this);
		/*alert($me.val());*/
		//var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		//console.log(regex.test($me.val()));
		//if (!regex.test($me.val())) 
  		if(!isValidEmail($me.val()) || !$me.val())
			$me.addClass("error");
		else
			$me.removeClass("error");
	});
	$('.numericOnly').bind('keyup blur',function(){
		if (/\D/g.test(this.value)) 
			this.value = this.value.replace(/\D/g, ''); 
	});
	$('.alphaonly').bind('keyup blur',function(){
		var node = $(this);
		node.val(node.val().replace(/[^a-z A-Z]/g,'') ); 
	});

	$('.mandatoryFields').bind('keyup blur',function(){  
		$me = $(this); 
		if(!$me.hasClass("emailonly"))
		{	
			if (!$me.val()) 
				$me.addClass("error");
			else
				$me.removeClass("error");
		}
	});
	$('.companyMandatoryFields').on('keyup blur',function(){  
		$me = $(this); 
		if(!$me.hasClass("dateField"))
		{
			if ($me.val() == "" || !$me.val()) 
				$me.addClass("error");
			else
				$me.removeClass("error"); 
		} else {
			//console.log($me.className + "|" + $me.val());
			if ($me.val() == "" || !$me.val()) 
				$me.parent().addClass("error");
			else
				$me.parent().removeClass("error");
		}
	});	
// Individual Registration : Reset
	$('#btnRIReset').click(function() { 
		//$("#frmRegisterIndividual")[0].reset(); 
		$("#frmRegisterIndividual input").removeClass("error");
		$("#frmRegisterIndividual input[type=text]").each(function(index, element) {
            $me = $(this);
			$me.val("");
        });
		var sel_country_name = "United Arab Emirates";
		var sel_country = "00971";
		$("#frmRegisterIndividual .user-select-countries").val(sel_country);
		
		var selected = $("#frmRegisterIndividual .user-select-countries").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags/" + encodeURIComponent(sel_country.toLowerCase()) + ".png) no-repeat 10px center; padding-left:20px");
		selected.html(sel_country_name);
		
		$("#frmRegisterIndividual .select-countries").val("");
		selected = $("#frmRegisterIndividual .select-countries").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:none");
		selected.html("Nationality*:");
		
		$("#frmRegisterIndividual .select-title").val("");
		selected = $("#frmRegisterIndividual .select-title").parent().find(".select2-selection__rendered");
		selected.html("Title:");
		
		$("#frmRegisterIndividual .select-mobile").val("50");
		selected = $("#frmRegisterIndividual .select-mobile").parent().find(".select2-selection__rendered");
		selected.html("50");
		
		$("#frmRegisterIndividual .uae-emirates").show();
		$("#frmRegisterIndividual .other-city").hide();

		$("#userErrorsDiv").attr("class", "").html("");
    }); 

	
	$("#frmRegisterIndividual .select-countries").change(function() {
		var selText = $(this).val();
		$tar = $(".phone-city-selector"); 
		if (selText == "AE" || selText == "00971") {
			$tar.find(".uae-emirates").show();
			$tar.find(".other-city").hide();
		} else {
			$tar.find(".uae-emirates").hide();
			$tar.find(".other-city").show();
		}
	});
		// Company Registration : Reset
	$('#btnRCReset').click(function() { 
		//$("#frmRegisterIndividual")[0].reset(); 
		$("#frmRegisterCompanyWizard input").removeClass("error");
		$("#frmRegisterCompanyWizard input[type=text]").each(function(index, element) {
            $me = $(this);
			$me.val("");
        });
		/*$("#frmRegisterCompanyWizard select").each(function() {
			$sel = $(this); 			
			$sel.find("option").first().attr('selected','selected'); 
		});*/
		//$("#frmRegisterCompanyWizard select").val($("#frmRegisterCompanyWizard select option:first").val());
		
		// Wizard 1
		var sel_country_name = "United Arab Emirates";
		var sel_country = "00971";
		$("#frmRegisterCompanyWizard .company-select-trade").val("");
		var selected = $("#frmRegisterCompanyWizard .company-select-trade").parent().find(".select2-selection__rendered");
		selected.html("Country of trade licence*"); ;
		
		$("#frmRegisterCompanyWizard .select-company-type").val("");
		var selected = $("#frmRegisterCompanyWizard .select-company-type").parent().find(".select2-selection__rendered");
		selected.html("Type of Company*");
		
		$("#frmRegisterCompanyWizard .company-tel-countries").val(sel_country);
		selected = $("#frmRegisterCompanyWizard .company-tel-countries").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags/" + encodeURIComponent(sel_country.toLowerCase()) + ".png) no-repeat 10px center; padding-left:20px");
		selected.html(sel_country_name);
		
		$("#frmRegisterCompanyWizard .company-select-mobile").val("050");
		selected = $("#frmRegisterCompanyWizard .company-select-mobile").parent().find(".select2-selection__rendered");
		selected.html("050");
		
		$("#frmRegisterCompanyWizard .select-emirate").val("");
		selected = $("#frmRegisterCompanyWizard .select-emirate").parent().find(".select2-selection__rendered");
		selected.html("Choose an Emirate");
		
		$("#frmRegisterCompanyWizard .trade-city-selector .uae-emirates").hide();
		$("#frmRegisterCompanyWizard .trade-city-selector .other-city").show();
		$("#frmRegisterCompanyWizard .company-phone-city-selector .uae-emirates").hide();
		$("#frmRegisterCompanyWizard .company-phone-city-selector .other-city").show(); 
		
		
		$(".fu-doc .btn").each(function(index, element) { $me = $(this); if ($me.hasClass('btn-grey-dark')) { $me.trigger("click"); }});
		$("#resetButton, #dedOptions").hide();
		
		$("#userErrorsDiv").attr("class", "").html("");  
		
    }); 
	
	$('#btnCAReset').click(function() {
		//$("#frmRegnCompanyAdmin")[0].reset(); 
		$("#frmCompanyAdmin input").removeClass("error"); 
		$("#frmCompanyAdmin input[type=text]").each(function(index, element) {
            $me = $(this);
			$me.val("");
        });
		/*$("#frmCompanyAdmin .select").each(function(index, element) {
			$me = $(this);
			$me.find(".select2-selection__rendered").html($me.attr("data-id"));
			if ($me.attr("data-title") != "") 
				$me.find(".select2-selection--single").attr("style", $me.attr("data-title"));
        }); */
		
		// Wizard 2
		var sel_country = "United Arab Emirates";
		
		$("#frmCompanyAdmin .admin-select-title").val(sel_country);
		selected = $("#frmCompanyAdmin .admin-select-title").parent().find(".select2-selection__rendered");
		selected.html("Title:");
		
		$("#frmCompanyAdmin .admin-select-nationality").val("Choose a Nationality");
		selected = $("#frmCompanyAdmin .admin-select-nationality").parent().find(".select2-selection__rendered");
		selected.html("Nationality*");
		
		$("#frmCompanyAdmin .admin-tel-countries").val(sel_country);
		selected = $("#frmCompanyAdmin .admin-tel-countries").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:url(/wps/contenthandler/dav/fs-type1/themes/RTA.Responsive.Theme/rta-assets/img/flags/" + encodeURIComponent(sel_country.toLowerCase()) + ".png) no-repeat 10px center; padding-left:20px");
		selected.html(sel_country);
		
		$("#frmCompanyAdmin .admin-select-mobilecode").val("050");
		selected = $("#frmCompanyAdmin .admin-select-mobilecode").parent().find(".select2-selection__rendered");
		selected.html("050");
		
		$("#frmCompanyAdmin .uae-emirates").show();
		$("#frmCompanyAdmin .other-city").hide();
		$("#resetButtonCA").hide();
		
		/*var commLanguage = $("[name='commLanguage']");
		if (!$("input[name='commLanguage']:checked"))
			$("#commLanguageEnId").attr('checked', true);*/ 
		if (!$("#commLanguageEnId").attr('checked') && !$("#commLanguageArId").attr('checked'))  
			$("#commLanguageEnId").attr('checked', true); 
		if (!$("#smsId").attr('checked') && !$("#emailId").attr('checked'))  
			$("#smsId").attr('checked', true);
		if (!$("#thirdPartyYesId").attr('checked') && !$("#thirdPartyNoId").attr('checked'))  
			$("#thirdPartyYesId").attr('checked', true);
    }); 
	
	/*$('#frmRegisterCompanyWizard input[type="radio"]').click(function() {
		$me = $(this);
		$('input[type="radio"]:checked').each(function(){
			if ($(this).val() == "other" && $me.val() != "other")
			$(this).attr("checked", false);  
		});
		$me.attr("checked", true);
		if ($(".fuUploadSuccess").is(":visible")) {
			//$('#btnNext').show();	
			$('#btnNext').removeClass("btn-grey-dark");
			$('#btnNext').addClass("btn-blue");
		}
		else {
			//$('#btnNext').hide();
			$('#btnNext').removeClass("btn-blue");
			$('#btnNext').addClass("btn-grey-dark");
		}
	}); */
});

/** All scripts below are moved from theme_en.html **/

function encodeHappinessURIComponent(happinessUrl) {
	var host=location.protocol+"//"+location.host+"/";
	var encodedUrl = encodeURI(host + happinessUrl); 
	encodedUrl = encodedUrl.replace('#', '%23'); 
	document.getElementById('happinessIcon').href = encodedUrl; 
}

function onSubmitLogin() {
	if ((document.getElementById('username')!=null && document.getElementById('username').value=='') || (document.getElementById('password')!=null && document.getElementById('password').value=='')) 
	{
		if (document.getElementById("userAuthenticationFailedDiv")) {
			document.getElementById('userAuthenticationFailedDiv').style.display='block';
			document.getElementById('userAuthenticationFailedDiv').innerHTML = 'Please enter a valid user ID and password.';
			return false;
		}
	}
	document.getElementById('LoginForm').action='https://'+location.host+'/pkmslogin.form?OPENER=RTAPORTALHOME'; 
}

function onSubmitMobileLogin() {
	if ((document.getElementById('loginusername')!=null && document.getElementById('loginusername').value=='') || (document.getElementById('loginpassword')!=null && document.			getElementById('loginpassword').value=='')) {
		if (document.getElementById('userAuthenticationFailedDiv_Mobile')) {
			document.getElementById('userAuthenticationFailedDiv_Mobile').style.display='block';
			document.getElementById('userAuthenticationFailedDiv_Mobile').innerHTML = 'Please enter a valid user ID and password.';
			return false;
		}
	}
	document.getElementById('mobileLoginForm').action='https://'+location.host+'/pkmslogin.form?OPENER=RTAPORTALHOME';      
}

var createCookie = function(name, value, days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	}
	else {
		expires = "";
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

$(document).ready(function(){
 if ( 'http:'==$(location).attr('protocol') )
	$.cookie("locale_new", "en", { path: "/" });
 else
	$.cookie("locale_new", "en", { path: "/", secure: true });
});

function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
			return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

if (window.location.href.indexOf("www.rta.ae") != -1){
	var trackOutboundLink = function(url) {
	   ga('send', 'event', 'outbound', 'click', url, {'hitCallback':
		 function () {
		 document.location = url;
		 }
	   });
	}
}

function getURLParam( name ) {
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( window.location.href );
	
	if( results == null ) {
		return "";
	} else {
		return results[1];
	}
}

function authenticateUser() {
	if(getURLParam('TamErrorMessage') != null && getURLParam('TamErrorMessage').length >0) {
		var pageWidth = $(window).width();
		if (pageWidth > 1024) {
			if (document.getElementById('userAuthenticationFailedDiv')) {
				document.getElementById('userAuthenticationFailedDiv').style.display='block';
				$("#show_login").trigger("click");
			}
		} else {
			if (document.getElementById('userAuthenticationFailedDiv_Mobile')) {
				document.getElementById('userAuthenticationFailedDiv_Mobile').style.display='block';
				document.getElementById('userAuthenticationFailedDiv_Mobile').innerHTML = 'Please enter a valid user ID and password.';
				$("#nav-open-btn").trigger("click");
				return false;
			}
		}
	} else {
		if (document.getElementById('userAuthenticationFailedDiv')) {
			document.getElementById('userAuthenticationFailedDiv').style.display='none';
		}		
		if (document.getElementById('userAuthenticationFailedDiv_Mobile')) {
			document.getElementById('userAuthenticationFailedDiv_Mobile').style.display='none';
		}
	}
}

function getSiteJunction() {
	var junction = '';
	
	if(window.location.href.indexOf("rta.ae/wpsv5") != -1) {
		junction = '/wpsv5';

	} else if(window.location.href.indexOf("rta.ae/wpsv3") != -1) {
	 junction = '/wpsv3';
	}
	
	return junction;
}