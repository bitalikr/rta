$(document).ready(function () { 
	$(".jq-select").select2();
	
	$("#btnStartProcess").click(function() { 
		if (!$("#cbTncVehicleRenewal").is(':checked'))  {
			$(".errorMsg").show(); 
			return;
		}
		location.href = "vehicle-renewal-search.html";	
	});
	$("#btnGoToStep2").click(function() { 
		location.href = "vehicle-renewal-delivery.html";	
	});
	$("#btnGoToStep31, #btnGoToStep32, #btnGoToStep34, #btnGoToStep34").click(function() { 
		location.href = "vehicle-renewal-confirm.html";	
	});
	$("#btnGoToStep4").click(function() { 
		location.href = "vehicle-renewal-reciept.html";	
	});
	$("#cbTncVehicleRenewal").on("click", function() {
		$me = $(this);
		$me.removeClass("checked");
		if ($me.is(':checked')) 
			$me.addClass("checked");
		$(".errorMsg").fadeOut(500);
	});
	$("#ddlRTAOfficeSelector").on("change", function() {
		$me = $(this); 
		$("#tabRTAOfficeSelector").slideDown("slow");
	});
	$("#ddlRTAKioskSelector").on("change", function() {
		$me = $(this); 
		$("#tabRTAKioskSelector").slideDown("slow");
	});
	$("#btnDeliverRTAOfficeConfirm").on("click", function() {
		$me = $(this); 
		$("#tabRTAOfficeSelector").slideUp("slow");
		$("#btnDeliverRTAOfficeConfirmed").fadeIn("slow");
	});
	$("#btnDeliverRTAKioskConfirm").on("click", function() {
		$me = $(this); 
		$("#tabRTAKioskSelector").slideUp("slow");
		$("#btnDeliverRTAKioskConfirmed").fadeIn("slow");
	});
	$("#btnDeliverToDoor").on("click", function() {
		$(".vrDeliveryOptions button").each(function() { $(this).removeClass("active"); $("." + $(this).attr("id")).attr("src", "assets/img/vr/" + $("." + $(this).attr("id")).data("tag") + ".png"); }); 
		$me = $(this);
		$(".btnDeliverToDoor").attr("src", "assets/img/vr/" + $(".btnDeliverToDoor").data("tag") + "-over.png");
		$me.addClass("active"); 
		$("#deliveryCourierTab").fadeIn("slow");
		$("#deliveryRTAOfficeTab").slideUp("slow");
		$("#deliveryPOBoxTab").slideUp("slow");
		$("#deliveryRTAKioskTab").slideUp("slow");
	});
	$("#btnDeliverFromRTA").on("click", function() { 
		$(".vrDeliveryOptions button").each(function() { $(this).removeClass("active"); $("." + $(this).attr("id")).attr("src", "assets/img/vr/" + $("." + $(this).attr("id")).data("tag") + ".png"); }); 
		$me = $(this);
		$(".btnDeliverFromRTA").attr("src", "assets/img/vr/" + $(".btnDeliverFromRTA").data("tag") + "-over.png");
		$("#deliveryRTAOfficeTab").fadeIn("slow");
		$("#deliveryCourierTab").slideUp("slow");
		$("#deliveryPOBoxTab").slideUp("slow");
		$("#deliveryRTAKioskTab").slideUp("slow");
		$me.addClass("active");   
	});
	$("#btnDeliverToPOBox").on("click", function() { 
		$(".vrDeliveryOptions button").each(function() { $(this).removeClass("active"); $("." + $(this).attr("id")).attr("src", "assets/img/vr/" + $("." + $(this).attr("id")).data("tag") + ".png"); }); 
		$me = $(this);
		$(".btnDeliverToPOBox").attr("src", "assets/img/vr/" + $(".btnDeliverToPOBox").data("tag") + "-over.png");
		$me.addClass("active");
		$("#deliveryPOBoxTab").fadeIn("slow");
		$("#deliveryCourierTab").slideUp("slow");
		$("#deliveryRTAOfficeTab").slideUp("slow");
		$("#deliveryRTAKioskTab").slideUp("slow"); 
	});
	$("#btnDeliverFromKiosk").on("click", function() {  
		$(".vrDeliveryOptions button").each(function() { $(this).removeClass("active"); $("." + $(this).attr("id")).attr("src", "assets/img/vr/" + $("." + $(this).attr("id")).data("tag") + ".png"); }); 
		$me = $(this);
		$(".btnDeliverFromKiosk").attr("src", "assets/img/vr/" + $(".btnDeliverFromKiosk").data("tag") + "-over.png");
		$me.addClass("active");
		$("#deliveryRTAKioskTab").fadeIn("slow");
		$("#deliveryPOBoxTab").slideUp("slow");
		$("#deliveryCourierTab").slideUp("slow");
		$("#deliveryRTAOfficeTab").slideUp("slow");
	});
	
	$("ul.faqList li a").click(function() {
		$me = $(this);
		$p = $me.parent();
		if ($p.hasClass("open")) {
			$p.removeClass("open");
			$p.find("span").hide();
		} else {
			$p.addClass("open");
			$p.find("span").show();
		}
	});
	
	$('a.faq[href*=#]').bind("click", function(e){ 
		var anchor = $(this);
		$("#faqBox").show();
		if (anchor!=null) {
			$('html, body').stop().animate({
				scrollTop: $(anchor.attr('href')).offset().top - 120
			}, 1000); 
			e.preventDefault();
		} 
	}); 
	
	$("#btnSearchPlateDetails").bind("click", function(e){ 
		var pn = $("#txtPlateNumber");
		var em = $("#errPlateSearch");
		em.hide();
		pn.removeClass("error");
		if (pn.val() == "") {
			em.html("Please check the following and try again:<br>1. The plate number has not been recognised.");
			em.show();
			pn.addClass("error");
			return;
		}
		$(".vrProcess").slideUp("slow");
		$(".vrListProcesss").fadeIn("slow");
	});
	$("#btnChangePlateNumber").bind("click", function(e){ 
		var me = $(this);
		me.addClass("active"); 
		var em = $(".plate-selection");
		em.show("slow");
		$(".brand-selection").hide("slow");
	});
	$("#btnAddBrandPlate").bind("click", function(e){ 
		var me = $(this);
		me.addClass("active"); 
		var em = $(".brand-selection");
		em.show("slow");
		$(".plate-selection").hide("slow");
	});
	$("#btnSaveChangePlateNumber").bind("click", function(e){  
		if ($('input[name=cbNewPlate]:checked').length <= 0) {
			alert("Please choose one plate");
			return;
		}
		var me = $(this);
		me.addClass("btn-plate-sel choose");
		me.html("Saved and added<br>to your order"); 
		me.removeClass("btn-blue"); 
		$("input[name=cbNewPlate]").each(function() { 
			var cb = $(this);  
			cb.attr("disabled", "disabled"); 
		});
	});
	$("#btnSaveChangePlateBrand").bind("click", function(e){  
		if ($('input[name=cbNewPlateDesignFront]:checked').length <= 0) {
			alert("Please choose one plate");
			return;
		}
		if ($('input[name=cbNewPlateDesignBack]:checked').length <= 0) {
			alert("Please choose one plate");
			return;
		}
		var me = $(this);
		me.addClass("btn-plate-sel choose");
		me.html("Saved and added<br>to your order"); 
		me.removeClass("btn-blue"); 
		$("input[name=cbNewPlateDesignFront], input[name=cbNewPlateDesignBack]").each(function() { 
			var cb = $(this);  
			cb.attr("disabled", "disabled"); 
		});
	});
	$(".vrExpand").bind("click", function(e){ 
		var summary = $(".tabFeeSummary");
		var expanded = $(".tabFeeExpanded");
		expanded.fadeToggle("slow"); 
		summary.slideUp("slow");
	});
	$(".vrCollapse").bind("click", function(e){ 
		var summary = $(".tabFeeSummary");
		var expanded = $(".tabFeeExpanded");
		expanded.slideUp("slow"); 
		summary.fadeToggle("slow");
	});
	$("input[name=cbNewPlate]").on("click", function () { 
	 	$("input[name=cbNewPlate]").each(function() { $(this).parent().removeClass("active"); });
       $me = $(this); 
	   $me.parent().addClass("active");
	});
	$("input[name=cbNewPlateDesignFront]").on("click", function () { 
	 	$("input[name=cbNewPlateDesignFront]").each(function() { $(this).parent().removeClass("active"); });
       $me = $(this); 
	   $me.parent().addClass("active");
	});
	$("input[name=cbNewPlateDesignBack]").on("click", function () { 
	 	$("input[name=cbNewPlateDesignBack]").each(function() { $(this).parent().removeClass("active"); });
       $me = $(this); 
	   $me.parent().addClass("active");
	});
});