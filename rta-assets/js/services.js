$(document).ready(function () { 
	$('.more-visible').slice(permore).hide();
	var $more = $('.load-more-services');
	$(window).scroll(function() {
		if ($(window).scrollTop() + $(window).height() >= $('.load-more-services').offset().top+100) {
            if(!$('.load-more-services').attr('loaded')) {
                //not in ajax.success due to multiple sroll events
                $('.load-more-services').attr('loaded', true);
				$more.trigger("click");
console.log("loaded");
                //ajax goes here
                //by theory, this code still may be called several times
            }
        }
	});
	$more.click(function(){
		$me = $(this);
		//var id = $me.attr("data-id"); 
		//var next = parseInt(id) + 1;
		//nos = parseInt(nos);// * next;
		console.log(permore);
		permore = $me.attr("data-id");
		$('.more-visible:hidden').slice(0, permore).fadeToggle(500);
		if($('.more-visible:hidden').length == 0)
			$more.hide();
		$('.load-more-services').attr('loaded', "");
		//$me.attr("data-id", next);
	});
	
	$(".list-alpha li a").click(function() {
		$me = $(this);
		$(".no-services").hide();
		$(".list-alpha li").each(function(index, element) {
            $t = $(this);
			$t.removeClass("active");
        });
		$me.parent().addClass("active");
		$('.more-visible, .load-more-services').hide();
		$(".alpha-" + $me.html()).show(); 
		if($('.more-visible:visible').length == 0)
			$(".no-services").show();
		$('.load-more-services').attr('loaded', true);
	});
	
	$("#services-dd1, #services-dd2").change(function() {
		$('.load-more-services').attr('loaded', true);
		$me = $(this);
		$tag = $me.val();  
		$(".no-services").hide();
		$(".other-services button").hide();
		$(".load-more-services").hide();
		$(".other-services button").each(function(index, element) { 
			var regex = new RegExp($tag , "gi");
			$t = $(this);
			if (regex.test($t.attr("data-tags"))) 
				$t.show();	  
        });  
		if($(".more-visible:visible").length == 0)
			$(".no-services").show();	
		if ($me.attr("id") == "services-dd1") { 
			if ($tag != "") {
				$.getJSON("assets/services.json").done(function(result) { 
					$.each(result, function(property, value) { 
						if (property == $tag) { 
							$("#services-dd2").empty();
							aItems = value + "";
							var items = aItems.split(','); 
							$("#services-dd2").append($('<option selected></option>').val("").html("Find the right services filtering once more")); 
							$.each(items, function (key, value) {
								$("#services-dd2").append($('<option></option>').val(value).html(value));
							});
							if (items.length < 2) {
								$("#services-dd2-container").fadeOut(100);
								$("#services-dd1-container").removeAttr("class");
								$("#services-dd1-container").attr("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12");
							} else {
								$("#services-dd2-container").fadeIn(100); 
								$("#services-dd1-container").removeAttr("class");
								$("#services-dd1-container").attr("class", "col-lg-6 col-md-6 col-sm-6 col-xs-6");
							}
						}
					});
				});
			} else {
				$("#services-dd2-container").fadeOut(100);
				$("#services-dd1-container").removeAttr("class");
				$("#services-dd1-container").attr("class", "col-lg-12 col-md-12 col-sm-12 col-xs-12");
			}
		}
	}); 
});
