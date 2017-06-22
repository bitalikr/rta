(function (window, document, $, undefined) {

    var app = {
        WINDOW_HEIGHT: $(window).height(),
        WINDOW_WIDTH: $(window).width(),
        isMobile: false,
        isTouch: false,
        isTablet: false,
        resizeTimeoutID: null,
        $body: $("body"),
        isMouseDown: false,
        slider: null,


        detectDevice: function () {
            (function (a) {
                if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                    app.isMobile = true;
                }
            })(navigator.userAgent || navigator.vendor || window.opera);
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                app.isTouch = true;
                app.$body.addClass("touch");
            } else {
                app.$body.addClass("no-touch");
            }

            app.isTablet = (!app.isMobile && app.isTouch);
        },
        resizeListener: function () {
            if (!app.isTouch) {
                $(window).resize(function () {
                    clearTimeout(app.resizeTimeoutID);
                    app.resizeTimeoutID = setTimeout(app._windowResize, 500);
                });
            } else {
                window.addEventListener('orientationchange', function () {
                    app._windowResize();
                });
            }
        },
        _windowResize: function () {
            app.WINDOW_HEIGHT = $(window).height();
            app.WINDOW_WIDTH = $(window).width();

        },
        initAppScroll: function () {
            // mobile-apps-detial-container
            console.log(app.isMobile);
            $('.mobile-serv-hover a').click(function () {
                $('html,body').animate({
                        scrollTop: $(".mad-container").offset().top - (app.isMobile ? -10 : 50)
                    },

                    'slow');
                //console.log("mobile-apps-detial-container")
            })
        },
        smoothScroll: function () {
            $('.car-services li a[href^="#"]').click(function () {
                var target = $(this.hash);
                if (target.length == 0) target = $('a[name="' + this.hash.substr(1) + '"]');
                if (target.length == 0) target = $('html');
                $('html, body').animate({scrollTop: target.offset().top - 100}, 500);
                return false;
            });
        },
        matchHeight: function () {
            if ( $( ".matchHeight" ).length > 0) {
                $('.matchHeight').matchHeight();
            }
        },		
        carSticky: function () {
            function stickyButtonsMobile() {
                var mainContainerTop = $('.car-services').parent(),
                    scrollTop = $(window).scrollTop(),
                    mainContainerHeight = $('.car-services').parent().height();
                if (mainContainerTop.offset().top - 50 < scrollTop) {
                    $('.car-services').addClass('car-sticky');
                    if (mainContainerHeight < scrollTop + -500) {
                        //console.log("Nested True");
                        $('.car-services').removeClass('car-sticky');
                    }
                } else {
                    $('.car-services').removeClass('car-sticky');
                }
            }

            if ($(".sticky-container").length >= 1) {
                stickyButtonsMobile();
                $(window).scroll(function () {
                    stickyButtonsMobile();
                });
            }
            $(document).on("scroll", onScroll);
            function onScroll(event) {
                var scrollPos = $(document).scrollTop()+150;
                $('.car-services li a').each(function () {
                    var currLink = $(this);
                    var refElement = $(currLink.attr("href"));
                    if ((refElement.offset().top ) <= scrollPos && (refElement.offset().top) + refElement.outerHeight()> scrollPos) {


                        $('.car-services li a').removeClass("active");
                        currLink.addClass("active");
                    }
                    else {
                        currLink.removeClass("active");
                    }
                });
            }
        },	
		// added by mhassan
        megaMenu: function () {

    //fadeBoday

    if( $(window).width() >= 769 ) {
        console.log(true);
        $('#main_nav_part ul.main_nav_bar > li').hover(
            function () {
                $(".fade-body").show();
            },
            function () {
                $(".fade-body").hide();
            }
        );
    }


    //Remove Arrow
    $("#main_nav_part ul.main_nav_bar .first-sub-menu li em").parent().addClass("arrow-none");
    //Menu
    $(".main_nav_bar ul.first-sub-menu ul.second-sub-menu, .main_nav_bar ul.first-sub-menu ul.third-sub-menu, .main_nav_bar ul.first-sub-menu ul.fourth-sub-menu").parent().parent().addClass("list-space");
    $(".main_nav_bar ul.first-sub-menu ul.second-sub-menu, .main_nav_bar ul.first-sub-menu ul.third-sub-menu, .main_nav_bar ul.first-sub-menu ul.fourth-sub-menu").parent().addClass("arrow-sub-menu");
    $('#main_nav_part ul.main_nav_bar .first-sub-menu.list-space > li.arrow-sub-menu').click(
        function (event) {
            $(".second-sub-menu").hide();
            $('#main_nav_part ul.main_nav_bar .first-sub-menu.list-space > li.arrow-sub-menu').removeClass("inner-active-link");
            $(this).addClass("inner-active-link");
            $(this).find(".second-sub-menu").show();
            //console.log("asd")
            //event.stopImmediatePropagation();
        }
    );
    $('#main_nav_part ul.main_nav_bar .second-sub-menu.list-space > li.arrow-sub-menu').click(
        function () {
            $(".third-sub-menu").hide();
            $('#main_nav_part ul.main_nav_bar .second-sub-menu.list-space > li.arrow-sub-menu').removeClass("inner-active-link")
            $(this).addClass("inner-active-link");
            $(this).find(".third-sub-menu").show();
        }
    );
    $('#main_nav_part ul.main_nav_bar .third-sub-menu.list-space > li.arrow-sub-menu').click(
        function () {
            $(".fourth-sub-menu").hide();
            $('#main_nav_part ul.main_nav_bar .third-sub-menu.list-space > li.arrow-sub-menu').removeClass("inner-active-link")
            $(this).addClass("inner-active-link");
            $(this).find(".fourth-sub-menu").show();
        }
    );


    //Mooblie onClick Dropdown
    $('#main_nav_part ul.main_nav_bar > li').click(
        function () {
            $(this).find(".full-grid").fadeIn();
        }
    );
    $(".full-grid .back-arrow").parent().addClass("backArrow-desktopHide");
    $(".full-grid .back-arrow").click(
        function () {
            var $this = $(this);
            if ($this.parent().parent().hasClass("first-sub-menu")) {
                $(".full-grid").fadeOut();
                return false;
            }
            else {
                $this.parent().parent().fadeOut();
            }
        }
    );



}
		
		,
		
        init: function () {
            app.detectDevice();
            app.resizeListener();
            app._windowResize();
            app.initAppScroll();
			app.smoothScroll();
			app.matchHeight();
			app.carSticky();
			// added by mhassan
			app.megaMenu();
        }

    };

    window.app = app;
})
(window, document, jQuery);

$(function () {
    $(".mobile-app-wrapper > ul > li").click(function(){
    var divToToggle = $( $(this).find("a").attr('href') );
    $(".mob-ser-detail:visible").not(divToToggle).slideUp("slow");
    divToToggle.slideToggle("slow");
  });
  
  $('.mobile-app-wrapper > ul > li').click(function(){
  return false;
	})
    
});

function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 10
    };
    var map = new google.maps.Map(mapCanvas, mapOptions);
}

$(document).scroll(function () {
    var y = $(document).scrollTop(),
        header = $(".second-main-nav");
    if (y >= 250) {
        header.css({position: "fixed", "top": "0", "left": "0"});
    } else {
        header.css("position", "static");
    }
});

var timeOut;
function scrollToTop() {
	if (document.body.scrollTop!=0 || document.documentElement.scrollTop!=0){
		window.scrollBy(0,-50);
		timeOut=setTimeout('scrollToTop()',10);
	}
	else clearTimeout(timeOut);
}

function DropDown(el) {
	this.dd = el;
	this.initEvents();
}
DropDown.prototype = {
	initEvents : function() {
		var obj = this;

		obj.dd.on('click', function(event){
			$(this).toggleClass('active');
			event.stopPropagation();
		});	
	}
}

$(function() {
	var dd = new DropDown( $('#dd') );

	$(document).click(function() {
		// all dropdowns
		$('.wrapper-dropdown-5').removeClass('active');
	});

});
    
$(function() {
	var swiper = new Swiper('.swiper-container', {
	pagination: '.swiper-pagination',
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
	slidesPerView: 3,
	paginationClickable: true,
	spaceBetween: 0,
	breakpoints: {
			1024: {
			slidesPerView: 2,
			spaceBetween: 40
		},
		768: {
			slidesPerView: 2,
			spaceBetween: 40
		},
		640: {
			slidesPerView: 1,
			spaceBetween: 20
		}
	}
});

});
	
$(document).ready(function () {
	$("#siteSearch").click(function(event){
		var FAQVal = $.trim($("#faqFieldId").val());
		if ( FAQVal == '' || FAQVal == "How do I?" ){
			alert("Please use questions or keywords to search");
			//event.preventDefault();
									return false;
		}else{
			//alert('not');
			$("#askForm").submit();
		}
	});		
	app.init();	
	faqApp.init();
});

// added by mhassan

function getKeyCode(key) {
    //return the key code
    return (key == null) ? event.keyCode : key.keyCode;
}

var $previousActiveElement = null;
var $lastMenuItem = false;
$(document).on('keyup', function (eventObj) {


    $(document).on('keyup', function (eventObj) {
        if (getKeyCode(eventObj) == '9') {
            var trueGridCondtion = $("#main_nav_part ul.main_nav_bar a").hasClass("menu_item_active");
            var fullGrid = $("#main_nav_part ul.main_nav_bar a.menu_item_active").parent(".has_submenu").find(".full-grid");

            if ($previousActiveElement != null) {
                $previousActiveElement.removeClass("active-shadow");

                //$lastMenuItem = true;
                if ($lastMenuItem) {

                    $previousActiveElement.trigger("mouseleave");
                    $lastMenuItem = false;

                }
            }
            var $mainMenuLink = $(document.activeElement);
            $mainMenuLink.addClass("active-shadow");
            $previousActiveElement = $mainMenuLink;
            var $liElement = $mainMenuLink.parent();
            if (trueGridCondtion) {
                fullGrid.addClass("active-fast");
            }
            if ($mainMenuLink.parent().parent().hasClass('main_nav_bar')) {
                fullGrid.addClass("active-fast");

            }


        } else if (getKeyCode(eventObj) == '13') {
            var $activeLink = $(document.activeElement);
            $activeLink.trigger('click');

        } else if (getKeyCode(eventObj) == '16') {

            console.log("out")
            if (!trueGridCondtion) {
                fullGrid.removeClass("active-fast");

            }

        }
    });
});

//FAQsWidget JavaScript Start
var host=window.location.host;
var protocol=window.location.protocol;
host=protocol+'//'+host;

(function (window, document, $, undefined) {

    var faqApp = {
        WINDOW_HEIGHT: $(window).height(),
        WINDOW_WIDTH: $(window).width(),
        isMobile: false,
        isTouch: false,
        isTablet: false,
        resizeTimeoutID: null,
        $body: $("body"),
        isMouseDown: false,
        slider: null,
		
        faqsPop: function () {
            var allPanels = $('.faqs-search .question-search div');
            allPanels.hide();
            $('.faqs-search .question-search h4').click(function () {
                $this = $(this);
                $target = $this.next();

                if ($this.hasClass("ui-state-active")) {
                    allPanels.removeClass('active').slideUp();
                    $target.removeClass('active');
                    $this.removeClass("ui-state-active");
                } else {
                    $(".faqs-search .question-search h4").removeClass("ui-state-active");
                    allPanels.removeClass('active').slideUp();
                    $target.addClass('active').slideDown();
                    $this.addClass("ui-state-active");
                }
                return false;
            });
			
			$('#faq-link').click(function(){
				$('.footer-sticky-nav .mask.mclick').show();
				$('#faqs').show();
				$('#notify').hide();
            })

            $('.close-sticky, .mask').click(function (){
				$('.footer-sticky-nav .mask.mclick').hide();
				$('#faqs').hide();
				$('#notify').hide();
				$('.overlay-questions').hide();
            })
			
			/*$('#notify-link').click(function() {
				$('.footer-sticky-nav .mask.mclick').show();
				$('#notify').show();
				$('#faqs').hide();
			})
			$('#notify-link').click(function() {
				$('.withnotific em').hide();
			})*/
	
        },
        init: function () {
            faqApp.faqsPop();
        }
    };
    window.faqApp = faqApp;
})
(window, document, jQuery);

$(document).ready(function () {
	var currLanguage = document.getElementById('currentLang').value;
	
	$( "#query" ).keyup(function() {
		var msg = "value of text entered : "+$("#query").val();
		console.log(msg);
		var query = $("#query").val();
		var showData = $('#show-data');
		var searchQ = {
			search: query
		};
		console.log(host);
	    $.getJSON(host+'/wps/PA_FAQWidget/process?lang=en', searchQ , function (data) {
			console.log(data);
			var items = data.map(function (item) {
				return "<li><h4>" +	item.question+ "</h4><div>"+ item.answer+ "</div></li>";
			});
			showData.empty();
			console.log(items);
			if(items.length) {
				var regex = new RegExp('</li>,<li>', 'g');
				var dataappend=items.toString().replace(regex , '</li><li>' );
				console.log(dataappend);
				showData.append("<ul class=''>"+dataappend+"</ul>");
			}else{
				if(currLanguage == 'ar'){
					showData.append("<table id='report'><tr><th>Question</th><th></th></tr><tr><td colspan='3'> لا توجد نتائج </td></tr></table>");	
				}else{
					showData.append("<table id='report'><tr><th>Question</th><th></th></tr><tr><td colspan='3'> No results found </td></tr></table>");
				}
			}
			faqApp.init();
	    });
		if(currLanguage == 'ar'){
			showData.text('تحميل نتائج البحث ...');
		}else{
			showData.text('Loading the results....');
		}	    
	  });
	
	$( "#faq-link" ).click(function() {
		$.getJSON(host+'/wps/PA_FAQWidget/process?lang=en', {search: ''} , function (data) {
			console.log(data);
			var items = data.map(function (item) {
				return "<li><h4>" +	item.question+ "</h4><div>" + item.answer + "</div></li>";
			});
			var showData = $('#show-data');
			showData.empty();console.log(items);var dataapp=items;
			if(items.length) {
				var regex = new RegExp('</li>,<li>', 'g');
				var dataappend=items.toString().replace(regex , '</li><li>' );
				console.log(dataappend);
				showData.append("<ul>"+dataappend+"</ul>");	       
			}else{
				if(currLanguage == 'ar'){
					showData.append("<table id='report'><tr><th>Question</th><th></th></tr><tr><td colspan='3'> لا توجد نتائج </td></tr></table>");
				}else{
					showData.append("<table id='report'><tr><th>Question</th><th></th></tr><tr><td colspan='3'> No results found </td></tr></table>");
				}
			}
			/*$('.overlay-questions').show();$('.mask').show();
			$( ".close-question" ).click(function() {
				$('.overlay-questions').hide();
				$('.mask').hide();
			});*/
			faqApp.init();  
		});
	});	
	function getCookie(name) {
		var value = "; " + document.cookie;
		var parts = value.split("; " + name + "=");
		if (parts.length == 2) return parts.pop().split(";").shift();
	}
	if(getCookie("notificationSeen") !== "true"){
		var notificationsCountURL = "/wps/wcm/connect/rta/RTA_Content/RTA/Home/Notifications?srv=cmpnt&cmpntname=RTA_Design/HTML/html_notifications_count&source=library"; 
		$.ajax({url: host + notificationsCountURL, type:'GET', cache: false, async:true, crossDomain: true, success: function(dataCount) {
			$("#notify-link").append("<em>"+dataCount.trim()+"</em>");
		}});
	}

	$("#notify-link").click(function(e) {
		e.preventDefault();
		if(currLanguage == 'ar'){
			notificationsURL = "/wps/wcm/connect/rta/RTA_Content/RTA/Home/Notifications?srv=cmpnt&source=library&cmpntname=RTA_Design/Menu/menu_notifications_ar"
		}else{
			notificationsURL = "/wps/wcm/connect/rta/RTA_Content/RTA/Home/Notifications?srv=cmpnt&source=library&cmpntname=RTA_Design/Menu/menu_notifications_en"
		}
		$.ajax({url: host + notificationsURL, type:'GET', cache: false, async:true, crossDomain: true, success: function(data) {
			var notificationsData = $('#notifications-data');
			notificationsData.empty()
			notificationsData.append(data);
			faqApp.init();
			$('.footer-sticky-nav .mask.mclick').show();
			$('#notify').show();
			$('#faqs').hide();
			$('.withnotific em').hide();		
			document.cookie = "notificationSeen=true; path=/";	
		}});		
		return false;
	});
});
//FAQsWidget JavaScript End