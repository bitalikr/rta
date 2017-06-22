

	var newData;
	var done=false;
	//var lang = 'en'; //getLnaguage();
	


	function pressEnter(event,element) {
		if( $("#autoComplete").val() == null || $("#autoComplete").val() == '' ){
			$(".ui-menu-item").find("a").html( $(".ui-menu-item").find("a").text() ) ;
		}
		
		var keyId = (event) ? event.keyCode : e.keyCode;
		if((keyId != 40) && (keyId != 38)) {
			if(keyId == 13 || keyId == null) {		
				done=true;
			} else {
				fastSearch(event,element);
			}
		}
	}	

    function fastSearch(event,element) {
   		if(!done) {
	        var keyId = (event) ? event.keyCode : e.keyCode;
      		if((keyId != 40) && (keyId != 38)) {
    	    	 if(keyId == 13) {
	    		 	done=true;					
	        	 } else {
				    getServicesNamesAjaxSearch(element);
	    		 }
	    	}
   		}
    }

$(document).ready(function () {
	getServicesNamesAjaxSearch();
});
	//Home page iDOS search 
	function getServicesNamesAjaxSearch() {
		var lang = $('html').attr('lang');
		// Create new XMLHttpRequest
		var xmlhttp = createXMLHttpRequest();
		if (xmlhttp == null) {
			alert("Your browser is outdated and does not support XMLHTTP!\n"
				+ "You have to refresh your pages manualy to view latest bids results");
			return;
		}
		// Set response callback method
		xmlhttp.onreadystatechange=function() {
			if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
				getServicesNamesSearch(xmlhttp);
			}
		}

		var url = '/wps/PA_IDOSProject/getServicesNamesServlet';
		url    += "?lang="+lang;
		url += "&methodName=getServicesNamesWithIDs";
		xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
	}	
    /*function getServicesNamesAjaxSearch() {

        
        var xmlhttp = createXMLHttpRequest();
        if (xmlhttp == null) {
            alert("Your browser is outdated and does not support XMLHTTP!\n"
                + "You have to refresh your pages manualy to view latest bids results");
            return;
        }
        xmlhttp.onreadystatechange=function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                getServicesNamesSearch(xmlhttp);
            }
        }

		var url = '/wps/PA_IDOSProject/getServicesNamesServlet';
		url    += "?lang="+lang;
		url += "&methodName=getServicesNamesWithIDs";
        xmlhttp.open("GET", url, true);
		xmlhttp.send(null);
    }*/
	
    function getServicesNamesSearch(xmlhttp) {
		var response = xmlhttp.responseText;
        if (response == null) {
	 	   return;
        }else {
			var servicesList = xmlhttp.responseText;
			var regex = /\\/g;
			servicesList = servicesList.replace(regex, "\\\\");
			if(servicesList != null && servicesList != ''){
				newData = JSON.parse(servicesList);				
				var typingTimerH;                //timer identifier
				var doneTypingIntervalH = 500;
				
				$('#servicesKW').keyup(function(){
					clearTimeout(typingTimerH);
					typingTimerH = setTimeout(
						function() {doneTypingH(newData);}, doneTypingIntervalH);
				});
				
				//on keydown, clear the countdown 
				$('#servicesKW').keydown(function(){
					clearTimeout(typingTimerH);
				});			
			}	
		}		
    }
	$("#servicesKWSuggestions li, #servicesKWSuggestions li a").click(function() { $("#servicesKWSuggestions").hide(); });
	function doneTypingH (jsonData) {
		$me = $("#servicesKW");
		var $kw = $me.val(); 
		if ($kw != "") {
				$("#servicesKWSuggestions").empty();
				
				for(var i in jsonData) {
					var value = jsonData[i].value;
					var label = jsonData[i].label;
					var regex = new RegExp($kw.toLowerCase(), "gi"); 
					if (label.toLowerCase().match(regex)){
						$("#servicesKWSuggestions").append('<li><a href="/wps/portal/rta/ae/home/idos?serviceId=' + value.trim() + '">' + label + '</a></li>');
					}
				}
				
				if ($("#servicesKWSuggestions li").length <= 0)
					$("#servicesKWSuggestions").append('<li><a>No services found</a></li>');
				if ($("#servicesKWSuggestions li").length > 0)
					$("#servicesKWSuggestions").show();
				else
					$("#servicesKWSuggestions").hide();
		}
		//alert($kw); 
	}
   function createXMLHttpRequest() {
         if(window.XMLHttpRequest) {
         // code for IE7+, Firefox, Chrome, Opera, Safari
         return new XMLHttpRequest();

         } else if(window.ActiveXObject) {
         // code for IE6, IE5
         return new ActiveXObject("Microsoft.XMLHTTP");

        } else {
			$("#servicesKWSuggestions").empty();
			$("#servicesKWSuggestions").hide();
         	return null;
        }
    }


function goToAgencyDetails(agencyId){
	window.location = "/wps/portal/rta/ae/home/idos?serviceAgencyId="+agencyId;
}

function goToServiceDetails(serviceId){
	window.location = "/wps/portal/rta/ae/home/idos?serviceId="+serviceId;
}

/*function getLnaguage(){
	var language = 'en';	
	<wps:if locale="ar">
		language = 'ar';
	</wps:if>
	return language;
}*/
