 $(document).ready(function(e) {
	 // Individual Registration : Submit
	 
 	 $("#btnRISubmit").click(function() {
		var email = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		$("#frmRegisterIndividual input[type=text]").each(function() {
			$me = $(this);
			$success = true;
			if ($me.hasClass("required") && $me.is(":visible")) {  
				if ($me.val() == "") 
					$success = false;
				if ($me.hasClass("emailonly") && !email.test($me.val())) 
					$success = false;
				if (/\D/g.test($me.val()) && $me.hasClass("numericOnly"))
					$success = false;
			}
			if ($success)
				$me.removeClass("error");
			else
				$me.addClass("error");
		}); 
		$("#frmRegisterIndividual select").each(function() {
			$me = $(this);
			$success = true;
			if ($me.hasClass("required") && $me.is(":visible")) { 
				if ($me.val() == "")
					$success = false; 
			}
			if ($success)
				$me.removeClass("error");
			else
				$me.addClass("error");
		});
		//$("#frmRegisterIndividual input[type=radio]").each(function() {
		//});
		if ($("#frmRegisterIndividual .error").length > 0) {
			alert("Please validate the values marked in red color");
			return false;
		}
		$("#wizards-ind-01").slideUp(500); 
		$("#wizards-ind-02").fadeToggle(1000);  
		$("html, body").animate({ scrollTop: 150 }, "slow"); 
		return true;
	});
	
	// Individual Registration : Reset
	$('#btnRIReset').click(function() { 
		//$("#frmRegisterIndividual")[0].reset(); 
		$("#frmRegisterIndividual input").removeClass("error");
		$("#frmRegisterIndividual input").each(function(index, element) {
            $me = $(this);
			$me.val("");
        });
		/*$("#frmRegisterIndividual .select").each(function(index, element) {
			$me = $(this); 
			$me.parent().removeClass("error"); 
			var opt = $me.parent().find(".select2-results__option--highlighted");
			if (opt)
				opt.removeClass("select2-results__option--highlighted");
			var s = $me.find("select");
			if (s)
				s.selectedIndex = 0;
			var selected = $me.find(".select2-selection__rendered");
			if (selected) {
				var first = $me.find('option:first-child');
				selected.html(first.text()); 
				console.log(first.val());
				if (first.val() == "")
					selected.parent().attr("style", "background:none");
				else
					selected.parent().attr("style", "background:url(assets/img/flags/" + first.val().toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
			}
			if ($me.val() == "AE") {
				$("#frmRegisterIndividual .uae-emirates").show();
				$("#frmRegisterIndividual .other-city").hide();
			} else {
				$("#frmRegisterIndividual .uae-emirates").hide();
				$("#frmRegisterIndividual .other-city").show();
			} 
        });*/
		var sel_country = "United Arab Emirates";
		$("#frmRegisterIndividual .user-select-countries").val(sel_country);
		var selected = $("#frmRegisterIndividual .user-select-countries").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:url(assets/img/flags/" + sel_country.toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
		selected.html(sel_country);
		
		$("#frmRegisterIndividual .select-countries").val(sel_country);
		selected = $("#frmRegisterIndividual .select-countries").parent().find(".select2-selection__rendered");
		selected.html(sel_country);
		
		$("#frmRegisterIndividual .select-title").val(sel_country);
		selected = $("#frmRegisterIndividual .select-title").parent().find(".select2-selection__rendered");
		selected.html("Title:");
		
		$("#frmRegisterIndividual .select-mobile").val(sel_country);
		selected = $("#frmRegisterIndividual .select-mobile").parent().find(".select2-selection__rendered");
		selected.html("050");
		
		//$("#frmRegisterIndividual .user-select-countries").find("United Arab Emirates").attr("selected", "selected"); 
		$("#userErrorsDiv").attr("class", "").html("");  
		
    });  
	
	// Company Registration : Reset
	$('#btnRCReset').click(function() { 
		//$("#frmRegisterIndividual")[0].reset(); 
		$("#frmRegisterCompanyWizard input").removeClass("error");
		$("#frmRegisterCompanyWizard input").each(function(index, element) {
            $me = $(this);
			$me.val("");
        });
		/*$("#frmRegCompany .select").each(function(index, element) {
			$me = $(this); 
			$me.parent().removeClass("error"); 
			var opt = $me.parent().find(".select2-results__option--highlighted");
			if (opt)
				opt.removeClass("select2-results__option--highlighted");
			var s = $me.find("select");
			if (s)
				s.selectedIndex = 0;
			var selected = $me.find(".select2-selection__rendered");
			if (selected) {
				var first = $me.find('option:first-child');
				selected.html(first.text()); 
				console.log(first.val());
				if (first.val() == "")
					selected.parent().attr("style", "background:none");
				else
					selected.parent().attr("style", "background:url(assets/img/flags/" + first.val().toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
			}
			if ($me.val() == "AE") {
				$("#frmRegCompany .uae-emirates").show();
				$("#frmRegCompany .other-city").hide();
			} else {
				$("#frmRegCompany .uae-emirates").hide();
				$("#frmRegCompany .other-city").show();
			} 
        });*/
		
		var sel_trade = "United Arab Emirates";
		
		$("#frmRegisterCompanyWizard .select-trade").val(sel_country);
		var selected = $("#frmRegisterCompanyWizard .select-trade").parent().find(".select2-selection__rendered");
		selected.html("Country of trade licence*");
		
		$("#frmRegisterCompanyWizard .select-type").val(sel_country);
		var selected = $("#frmRegisterCompanyWizard .select-trade").parent().find(".select2-selection__rendered");
		selected.html("Country of trade licence*");
		
		$("#frmRegisterCompanyWizard .company-select-countries").val(sel_country);
		selected = $("#frmRegisterCompanyWizard .company-select-countries").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:url(assets/img/flags/" + sel_country.toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
		selected.html(sel_country);
		
		$("#frmRegisterCompanyWizard .select-emirate").val(sel_country);
		selected = $("#frmRegisterCompanyWizard .select-emirate").parent().find(".select2-selection__rendered");
		selected.html("Choose an Emirate");
		
		$("#frmRegisterCompanyWizard .select-mobile").val(sel_country);
		selected = $("#frmRegisterCompanyWizard .select-mobile").parent().find(".select2-selection__rendered");
		selected.html("050");
		
		$("#frmRegisterCompanyWizard .select-nationality").val(sel_country);
		selected = $("#frmRegisterCompanyWizard .select-nationality").parent().find(".select2-selection__rendered");
		selected.html("Nationality*");
		
		$("#frmRegisterCompanyWizard .company-select-mobile").val(sel_country);
		selected = $("#frmRegisterCompanyWizard .company-select-mobile").parent().find(".select2-selection__rendered");
		selected.parent().attr("style", "background:url(assets/img/flags/" + sel_country.toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
		selected.html(sel_country);
		
		
		$(".fu-doc .btn").each(function(index, element) { $me = $(this); if ($me.hasClass('btn-grey-dark')) { $me.trigger("click"); }});
		$("#resetButton, #dedOptions").hide();
		
		$("#userErrorsDiv").attr("class", "").html("");  
		
    }); 
	
	$('#frmRegCompany input[type="radio"]').click(function() {
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
		if ($me.val() == "ded") {  
			$("#dedOptions").show();
		}
		else if ($me.val() == "ouae" || $me.val() == "fz")
			$("#dedOptions").hide();
		if ($me.val() == "ded")
			$("#docsSupporting").show();
		if ($me.val() == "other") {
			$("#docsSupporting").hide();
			//$('#btnNext').show();
			$('#btnNext').addClass("btn-blue");
			$('#btnNext').removeClass("btn-grey-dark");
		}
		else
			$("#docsSupporting").show();
		
	}); 
	
	$("#frmRegisterIndividual .select-countries").change(function() {
		var selText = $(this).val();
		$tar = $(".phone-city-selector"); 
		if (selText == "AE") {
			$tar.find(".uae-emirates").show();
			$tar.find(".other-city").hide();
		} else {
			$tar.find(".uae-emirates").hide();
			$tar.find(".other-city").show();
		}
	});
	
	$('#btnCAReset').click(function() { 
		$("#frmRegnCompanyAdmin")[0].reset(); 
		$("input").removeClass("error");
		$(".select").each(function(index, element) {
			$me = $(this);
			$me.find(".select2-selection__rendered").html($me.attr("data-id"));
			if ($me.attr("data-title") != "") 
				$me.find(".select2-selection--single").attr("style", $me.attr("data-title"));
        }); 
		$("#frmRegnCompanyAdmin .uae-emirates").show();
		$("#frmRegnCompanyAdmin .other-city").hide();
		$("#resetButtonCA").hide();
    }); 
	$('#btnNext').click(function() { 
		if ($('#btnNext').hasClass("btn-blue")) {
			$("#wizards-step-01").slideUp(500); 
			$("#wizards-step-02").fadeToggle(1000);  
			 $("html, body").animate({ scrollTop: 150 }, "slow");
		} else {
			alert("Please select Business License issued and attach required documents");
		}
	});
	$('#btnPrev').click(function() { 
		$("#wizards-step-02").slideUp(1000); 
		$("#wizards-step-01").fadeToggle(1000);  
		 $("html, body").animate({ scrollTop: 150 }, "slow"); 
	});
	
	$('#btnSubmit').click(function() { 
		$("#wizards-step-02").slideUp(500); 
		$("#wizards-step-03").fadeToggle(1000);  
		 $("html, body").animate({ scrollTop: 150 }, "slow"); 
	});
	$("#btnDone").click(function() { 
		$(".fuUploadNotDone").hide(); 
		$(".fuUploadSuccess").show(); 
		$('#btnNext').show();
	});
	/*$('#btnRCReset').click(function() { 
		//$("#frmRegCompany")[0].reset(); 
		$("input").removeClass("error");
		$(".select").each(function(index, element) {
			$me = $(this);
			$me.find(".select2-selection__rendered").html($me.attr("data-id"));
			if ($me.attr("data-title") != "") 
				$me.find(".select2-selection--single").attr("style", $me.attr("data-title"));
        }); 
		$(".uae-emirates").show();
		$(".other-city").hide();
		
		$(".fu-doc .btn").each(function(index, element) { $me = $(this); if ($me.hasClass('btn-grey-dark')) { $me.trigger("click"); }});
		$("#resetButton").hide();
    });*/
	
	$('#frmRegisterCompany input, #frmRegisterCompany select').change(function() { 
		$("#resetButton").show();
	});
	$('#frmCompanyAdmin input, #frmCompanyAdmin select').change(function() { 
		$("#resetButtonCA").show();
	});
	
	$("#btnDone").click(function() {
		$.colorbox.close();
	}); 
	
	$("#regIndividual").click(function(){
		location.href = "#individual";
		$("#mainPanel" ).slideUp("slow"); 
		$("#frmRegisterIndividual").fadeToggle("slow"); 
	});
	$("#regCompany").click(function(){ 
		location.href = "#company";
		$("#mainPanel" ).slideUp("slow"); 
		$("#frmRegisterCompanyWizard").fadeToggle("slow"); 
	});
	var currentHash = window.location.hash;
	//console.log(currentHash);
	if (currentHash == "#individual") {
	    $("#regIndividual").trigger("click");
	} else if (currentHash == "#company") {
		$("#regCompany").trigger("click");
	}
	
	$(".backmenu").click(function(e){ 
		if(!$(e.target).is('a')){ 
		  $("#frmRegisterIndividual").fadeOut("slow");
		  $("#frmRegisterCompanyWizard").fadeOut("slow");
		  $("#mainPanel" ).slideDown("slow");
		}
 
	}); 
	
	$('.jq-select').select2();
	 
	function formatState (state) {
	  if (!state.id) { return state.text; }
	  var $state = $(
		'<span><img src="assets/img/flags/' + state.element.value.toLowerCase() + '.png" class="img-flag" /> ' + state.text + '</span>'
	  );
	  return $state;
	};
	 
	$(".jq-flags").select2({
	  templateResult: formatState
	}); 
	$(".jq-flags").bind("change", function() {
		$me = $(this);
		$sel = $me.parent().find(".select2-selection--single");
		//alert($me.val());	
		$sel.attr("style", "background:url(assets/img/flags/" + $me.val().toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
	});
	$(".jq-flags").each(function(index, element) {
		$me = $(this);
		$sel = $me.parent().find(".select2-selection--single");
		//alert($me.val());	
		$sel.attr("style", "background:url(assets/img/flags/" + $me.val().toLowerCase() + ".png) no-repeat 10px center; padding-left:20px");
	});
	$(".select2-container").each(function(index, element) {
        $me = $(this);
		$me.removeAttr("style");
    });
	
	// file uploads
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
	
	// RegEx Validation
	$('.numericOnly').bind('keyup blur',function(){ 
		if (/\D/g.test(this.value)) 
			this.value = this.value.replace(/\D/g, ''); 
	});
	$('.alphaonly').bind('keyup blur',function(){ 
		var node = $(this);
		node.val(node.val().replace(/[^a-z A-Z]/g,'') ); 
	});
	$('.emailonly').bind('keyup blur',function(){   
		$me = $(this);
		/*alert($me.val());*/
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!regex.test($me.val())) 
  		 	$me.addClass("error");
		else
			$me.removeClass("error");
	});
	 
 });