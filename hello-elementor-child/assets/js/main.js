(function ($) {
	var adminbar = 0;
	if ($('#wpadminbar').length) {
		adminbar = $('#wpadminbar').height();
	}

	function generate_select(selector) {
		$(selector).each(function () {

			// Cache the number of options
			var $this = $(this),
				activeValue = $this.val(),
				classselect = $this.attr("class"),
				numberOfOptions = $(this).children("option").length;

			// Hides the select element
			$this.addClass("s-hidden");

			// Wrap the select element in a div
			$this.wrap('<div class="select ' + classselect + '"></div>');

			// Insert a styled div to sit over the top of the hidden select element
			$this.after('<div class="styledSelect"></div>');

			// Cache the styled div
			var $styledSelect = $this.next("div.styledSelect");

			var getHTML = $this.children('option[value="' + $this.val() + '"]').text();

			//   if ($this.children('option[value="' + $this.val() + '"]').length > 1) {
			// var getHTML = $this
			// .children("option")
			// .eq(0)
			// .text();
			//   }
			// Show the first select option in the styled div
			$styledSelect.html('<span class="text-ellipses">' + getHTML + '</span>');

			// Insert an unordered list after the styled div and also cache the list
			var $list = $("<ul />", { class: "options" }).insertAfter($styledSelect);

			// Insert a list item into the unordered list for each select option
			for (var i = 1; i < numberOfOptions; i++) {
				var Cls = $this.children("option").eq(i).attr('class');
				if (Cls == undefined) {
					Cls = '';
				}
				if ($this.children("option").eq(i).val() == activeValue) {
					Cls = Cls + ' active';
					$('.text-ellipses').addClass('valueAdded');
				}
				$("<li />", {
					text: $this
						.children("option")
						.eq(i)
						.text(),
					rel: $this
						.children("option")
						.eq(i)
						.val(),
					class: Cls
				}).appendTo($list);
			}

			// Cache the list items
			var $listItems = $list.children("li");

			// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
			$styledSelect.click(function (e) {
				e.stopPropagation();
				if (!$(this).hasClass('active')) {
					$('div.styledSelect.active').each(function () {
						$(this).removeClass('active').next('ul.options').slideUp();
						// return false;
					});
					$(this).toggleClass("active");
					$(this).next("ul.options").stop(true).slideToggle();
				} else {
					$('div.styledSelect.active').each(function () {
						$(this).removeClass('active').next('ul.options').slideUp();
						// return false;
					});
				}
			});

			// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
			// Updates the select element to have the value of the equivalent option
			$listItems.click(function (e) {
				e.stopPropagation();
				$styledSelect.html('<span class="text-ellipses valueAdded">' + $(this).text() + '</span>').removeClass("active");
				var value = $(this).attr("rel").toString();
				$($this).val(value);
				$($this).trigger("change");
				$('ul.options').slideUp();
				$(this).addClass("active").siblings().removeClass("active");
				/* alert($this.val()); Uncomment this for demonstration! */
			});

			// Hides the unordered list when clicking outside of it
			$(document).click(function () {
				$styledSelect.removeClass("active");
				$list.slideUp();
			});

		});
	}

	// --------------------------------------------------
	// jQuery Match Height
	// --------------------------------------------------

	// all the elements where MatchHeight will be applied to
	const matchHeightElements = [
		'.class-name-here',
	];

	// apply matchHeight to a single element
	function doMatchHeight(_element) {
		$(_element).matchHeight({
			byRow: true,
			property: 'min-height',
		});
	}
	// apply match height to all the elements
	$(window).on('resize load', function () {
		matchHeightElements.forEach(doMatchHeight);
	});
	//add span to the last word in button
	$('.text-link .elementor-button, .text-link.more-btn, .arrow-btn .elementor-button').html(function(){	
		// separate the text by spaces
		var text= $(this).text().split(' ');
		// drop the last word and store it in a variable
		var last = (text.pop()).trim();
		// join the text back and if it has more than 1 word add the span tag
		// to the last word
		return text.join(" ") + ' <span class="last">'+last+'</span>';   
	});


	$(document).ready(function () {
		// add class of ie_edge for edge
		if (document.documentMode || /Edge/.test(navigator.userAgent)) {
			$('body').addClass('ie_edge');
		}
		//run the select code for all selects
		generate_select('select:not(.gfield_select)');
		document.activeElement.blur();
		$(document).on('gform_post_render', function (event, form_id, current_page) {
			generate_select('#gform_wrapper_' + form_id + ' select.gfield_select');
			$("li.gf_readonly input").attr("readonly", "readonly");
		});

		//open all links which are externall in new tab
		// $("a[href ^= http]").each(function () {

		//   // NEW – excluded domains list
		//   var excludes = [window.location.hostname];
		//   for (i = 0; i < excludes.length; i++) {
		//     if (this.href.indexOf(excludes[i]) != -1) {
		//       return true; // continue each() with next link
		//     }
		//   }

		//   if (this.href.indexOf(location.hostname) == -1) {

		//     // attach a do-nothing event handler to ensure we can ‘trigger’ a click on this link
		//     $(this).click(function () {
		//       return true;
		//     });

		//     $(this).attr({
		//       target: "_blank",
		//       'data-link-behaviour': "Opens in a new tab"
		//     });

		//     $(this).click(); // trigger it
		//   }
		// })

		//smoothscroll
		// a[href^= "#"]:not(.mobile-header .elementor-nav-menu--dropdown a
		$('a[href^= "#"]:not(.main-menu-nav .menu li a, .tabs-nav .elementor-icon-list-item a, .tabs-navigation .elementor-icon-list-item a  ):not(a[href="#"])').on('click', function (x) {
			x.stopImmediatePropagation();
			x.preventDefault();
			$(document).off("scroll");

			// target element id
			var id = $(this).attr('href');

			// target element
			var $id = $(id);
			if ($id.length === 0) {
				return;
			}

			// prevent standard hash navigation (avoid blinking in IE)
			x.preventDefault();

			// top position relative to the document
			var pos = $id.offset().top - adminbar;

			// animated top scrolling
			$('body, html').animate({ scrollTop: pos });
		});
	});

	$(document).ready(function() {
		//   $('.main-menu ul.menu > li').addClass('activemenu');
		$('.burger-btn').on('click', function() {
		  $('.herader-mobile-wrapper').slideToggle();
		  $('body').toggleClass('overflowbody mobile-menu-open');
		});

		var target = $('.main-menu ul.menu > li');
		$('.main-menu ul.menu > li').addClass('main-menu-item');
		target.each(function(){
			if($(this).has('.sub-menu').length > 0){
				var $newdiv1 = $( "<div class='menu-arrow'></div>" );
				$(this).prepend($newdiv1)
			}
		})
		
		$('.menu-arrow').on('click', function() {
      		$(this).siblings(".sub-menu").slideToggle().closest('.main-menu-item').toggleClass('is-active').siblings().removeClass("is-active").find(".sub-menu").slideUp()
		 	$('body').toggleClass('open-submenu');
		});  

		/*contact form tab*/	  
		  
	});


	$(window).on("load", function() {
		var mainWrapperss = document.querySelectorAll(".single-latest-post .elementor-post");
		mainWrapperss.forEach(function(mainWrappers) {
			var newLink = mainWrappers.querySelector(".elementor-post__thumbnail__link");
			if (!newLink) {
				var newDiv = document.createElement("div");
				newDiv.classList.add("thumbnail_div");
				mainWrappers.prepend(newDiv);
		}
		});
	});

	$(window).on("scroll", function() {
		if($(window).scrollTop() > 0) {
			$("body").addClass("active-header");
		} else {
		   $("body").removeClass("active-header");
		}
	});
	
	$(".elementor-accordion-item").on("click", function(x){
		if (window.matchMedia("(max-width: 900px)").matches) {
			const item = $(this);
			setTimeout(function () { 
			const position = item.offset().top;
			$("body, html").animate({ scrollTop: position - adminbar - $("[data-elementor-type='header']").height() - 10});
		 }, 500);
		} 
	});

	
	$(document).on('facetwp-refresh', function() {
		if (FWP.soft_refresh == true) {
			FWP.enable_scroll = true;
		} else {
			FWP.enable_scroll = false;
		}
	});
	
    $(document).on('facetwp-loaded', function() {
		if (FWP.enable_scroll == true) {
			var topbar = 0;
			if($('html #wpadminbar').length>0){
				topbar = $('html #wpadminbar').height();
			}
			$('html,body').animate({
				scrollTop: $('.facetwp-scroll-top').offset().top - $('.elementor-location-header').height() - topbar
			});
		}
	});

}(jQuery))

