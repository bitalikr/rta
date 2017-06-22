$(document).ready(function () { 
	$(".jq-select").select2();
	 $('input[placeholder]').each(function() { 
		var input = $(this);
		$(input).val(input.attr('placeholder'));
		$(input).focus(function() {
			if (input.val() == input.attr('placeholder')) input.val(''); 
		});
		$(input).blur(function() {
			if (input.val() == '' || input.val() == input.attr('placeholder')) input.val(input.attr('placeholder')); 
		});
	}); 
	$("#btnStartProcess").click(function() {  
		location.href = "fine-payment-search.html";	
	}); 
	$("#btnFinePay").click(function() {  
		location.href = "fine-payment-reciept.html";	
	});
	$("#btnPayResults").click(function() {  
		location.href = "fine-payment-confirm.html";	
	});
	$("#btnContinue").click(function() {
		$("#txtFileNumber").removeClass("error");
		if ($("#txtFileNumber").val() == "" || $("#txtFileNumber").val() == $("#txtFileNumber").attr("placeholder")) {
			$("#txtFileNumber").addClass("error");
			$("#txtFileNumber").focus();
			return;
		}
		$("#txtDateOfBirth").removeClass("error");
		if ($("#txtDateOfBirth").val() == "" || $("#txtDateOfBirth").val() == $("#txtDateOfBirth").attr("placeholder")) {
			$("#txtDateOfBirth").addClass("error");
			$("#txtDateOfBirth").focus();
			return;
		}
		$(this).addClass("active");
		$("#tabConfirm").show();
	});
	$("#fpOption").on("click", function() {
		$me = $(this);
		if ($me.hasClass("fpExpand")) {
			$("#tabFPMore").fadeIn("slow");
			$me.removeClass("fpExpand");
			$me.addClass("fpCollapse");
			$me.html("View less search options");
		} else {
			$("#tabFPMore").slideUp("slow");
			$me.removeClass("fpCollapse");
			$me.addClass("fpExpand");
			$me.html("View more search options");
		}
		$(".jq-select").select2(); 
	}); 
	$(".tabOption2 input, .tabOption2 select, .tabOption3 input, .tabOption3 select, .tabOption4 input").each(function(index, element) {
        $me = $(this);
	    $me.attr("disabled", "disabled"); 
	    $me.addClass("notAllowed");
    });
	$(".searhOption").on("change", function() {
		var em = $("#errPlateSearch");
		em.html("").removeClass("errorMsgProcess");
		$(".finePaymentStep1 .select, .finePaymentStep1 input").each(function(index, element) {
            $me = $(this);
			$me.removeClass("error");
        });
		$(".tabOption1 input, .tabOption1 select, .tabOption2 input, .tabOption2 select, .tabOption3 input, .tabOption3 select, .tabOption4 input").each(function(index, element) {
			$t = $(this);
			$t.attr("disabled", "disabled"); 
			$t.addClass("notAllowed");
		});
		$me = $(this);
		if ($me.is(':checked')) {
			$("." + $me.data("id") + " input, ." + $me.data("id") + " select").each(function(index, element) {
                $t = $(this);
				$t.removeAttr("disabled"); 
				$t.removeClass("notAllowed");
            }); 
		}
	});
	$("#btnSearchPlateDetails").click(function() {
		var opt = $('input[name=rbSearch]:checked').val();
		var ok = true;
		var em = $("#errPlateSearch");
		em.html("").removeClass("errorMsgProcess");
		$(".finePaymentStep1 .select, .finePaymentStep1 input").each(function(index, element) {
            $me = $(this);
			$me.removeClass("error");
        });
		if (opt == 1) { 
			if ($("#txtPlateNumber").val() == "" || $("#txtPlateNumber").val() == $("#txtPlateNumber").attr("placeholder")) {
				ok = false;
				em.html("Please check the following and try again:<br>1. The plate number has not been recognised.");
				em.addClass("errorMsgProcess").show();
				$("#txtPlateNumber").addClass("error");
				$("#txtPlateNumber").focus();
			}
			if ($("#txtPlateEmirate").val() == "") {
				ok = false;
				$("#txtPlateEmirate").parent().addClass("error");
				$("#txtPlateEmirate").focus();
			}
			if ($("#txtPlateCategory").val() == "") {
				ok = false;
				$("#txtPlateCategory").parent().addClass("error");
				$("#txtPlateCategory").focus();
			}
			if ($("#txtPlateCode").val() == "") {
				ok = false;
				$("#txtPlateCode").parent().addClass("error");
				$("#txtPlateCode").focus();
			}
		} else if (opt == 2) { 
			if ($("#txtLicenceNumber").val() == "" || $("#txtLicenceNumber").val() == $("#txtLicenceNumber").attr("placeholder")) {
				ok = false;
				em.html("Please check the following and try again:<br>1. The plate number has not been recognised.");
				em.addClass("errorMsgProcess").show();
				$("#txtLicenceNumber").addClass("error");
				$("#txtLicenceNumber").focus();
			}
			if ($("#txtLicenceEmirate").val() == "") {
				ok = false;
				$("#txtLicenceEmirate").parent().addClass("error");
				$("#txtLicenceEmirate").focus();
			} 
		} else if (opt == 3) { 
			if ($("#txtFineNumber").val() == "" || $("#txtFineNumber").val() == $("#txtFineNumber").attr("placeholder")) {
				ok = false;
				em.html("Please check the following and try again:<br>1. The plate number has not been recognised.");
				em.addClass("errorMsgProcess").show();
				$("#txtFineNumber").addClass("error");
				$("#txtFineNumber").focus();
			}
			if ($("#txtFineSource").val() == "") {
				ok = false;
				$("#txtFineSource").parent().addClass("error");
				$("#txtFineSource").focus();
			} 
			if ($("#txtFineYear").val() == "") {
				ok = false;
				$("#txtFineYear").parent().addClass("error");
				$("#txtFineYear").focus();
			}
		} else if (opt == 4) { 
			if ($("#txtFileNumber").val() == "" || $("#txtFileNumber").val() == $("#txtFileNumber").attr("placeholder")) {
				ok = false;
				em.html("Please check the following and try again:<br>1. The plate number has not been recognised.");
				em.addClass("errorMsgProcess").show();
				$("#txtFileNumber").addClass("error");
				$("#txtFileNumber").focus();
			}
		}
		if (ok) location.href = "fine-payment-results.html";
	});
	
	$(".cbSource").on("change", function() {
		var $me = $(this); 
		$(".fpHeader, .fpBody").each(function() { $(this).hide(); });
		$(".fpHeader, .fpBody").each(function(index, element) {
            $t = $(this);
			$(".cbSource").each(function(index, element) {
                $p = $(this);
				var regex = new RegExp($p.val().toLowerCase(), "gi");
				if ($t.data("id").toLowerCase().match(regex)) {
					if ($p.is(':checked')) 
						$t.show(); 
				}	
            }); 
        }); 
		$("#totalFines").html($('.fpHeader:visible').length + " fines found");
	});
	
	$("#allResults").click(function() {
		$(".cbSource").each(function() {
			$(this).prop('checked', true);
		});
		$(".fpHeader, .fpBody").each(function() { $(this).show(); });
		$("#totalFines").html($('.fpHeader:visible').length + " fines found");
	});
	
	// RegEx Validation
	$('.numericOnly').bind('keyup blur',function(){ 
		if (/\D/g.test(this.value)) 
			this.value = this.value.replace(/\D/g, ''); 
	});
	$('.alphaOnly').bind('keyup blur',function(){ 
		var node = $(this);
		node.val(node.val().replace(/[^a-z A-Z]/g,'') ); 
	});
	$('.emailOnly').bind('keyup blur',function(){   
		$me = $(this); 
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test($me.val())) 
  		 	$me.addClass("error");
		else
			$me.removeClass("error");
	});
});