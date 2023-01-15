/*
 * Stellarnav.js 1.0.0
 * jQuery responsive multi-level dropdown menu designed to do most of the heavy CSS work for you.    
 *
 * Copyright (c) 2016 Vinny Moreira - http://vinnymoreira.com
 *
 * Released under the MIT license
 */
(function($) {
	$.fn.stellarNavTwo = function(options, width, breakpoint) {

		var $nav, $width, $breakpoint;
		nav = $(this);
		width = $(window).width();

		// default settings
		var settings = $.extend( {
			theme     : 'plain', // adds default color to nav. (light, dark)
			breakpoint: 768, // number in pixels to determine when the nav should turn mobile friendly
			phoneBtn: false, // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
	    	locationBtn: false, // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
			sticky     : false, // makes nav sticky on scroll (desktop only)
			position: 'static', // 'static' or 'top' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page 
			showArrows: true, // shows dropdown arrows next to the items that have sub menus
			closeBtn     : false, // adds a close button to the end of nav
			scrollbarFix: false // fixes horizontal scrollbar issue on very long navs
		}, options );

		return this.each( function() {

			// Makes nav sticky on scroll
			if (settings.sticky) {
				navPos = nav.offset().top;			
				if(width >= breakpoint) {
					$(window).bind('scroll', function() {
				         if ($(window).scrollTop() > navPos) {
				             nav.addClass('fixed');
				         }
				         else {
				             nav.removeClass('fixed');
				         }
				    });
				}
			}

			if (settings.position == 'top') {
				nav.addClass('top');
			}

			if (!settings.showArrows) {
				nav.addClass('hide-arrows');
			}
					
			// opens and closes menu			
			$('.menu-toggle').on('click', function(e) {
				e.preventDefault();
				nav.find('ul:first').stop(true, true).slideToggle(250);
				nav.toggleClass('active');
			});

			// adds toggle button to li items that have children
			nav.find('li a').each(function() {
				if ($(this).next().length > 0) {
					$(this).parent('li').addClass('has-sub').append('<a class="dd-toggle" href="#"><i class="fa fa-plus"></i></a>');
				}
			});

			// expands the dropdown menu on each click 
			nav.find('li .dd-toggle').on('click', function(e) {
				e.preventDefault();
				//$(this).parent('li').toggleClass('hover');
				$(this).parent('li').children('ul').stop(true, true).slideToggle(250);
				$(this).parent('li').toggleClass('open');
			});

			var resetTriggers = function() {
				nav.find('span.arrow').unbind('mouseover');
				nav.find('span.arrow').unbind('mouseleave');
			}
			
			var setTriggers = function() {
				nav.find('li').on('mouseover', function(){
					$(this).addClass('hoverx');
					$(this).children('a').addClass('hovera');
					$(this).children('ul').stop(true, true).slideDown(250);
				});
				nav.find('li').on('mouseleave', function(){
					$(this).removeClass('hoverx');
					$(this).children('ul').stop(true, true).slideUp(250);
					$(this).children('a').removeClass('hovera');
				});
			}
			windowCheckStellerLeft();
			
			// check browser width in real-time
			function windowCheckStellerLeft() {
				var browserWidth = window.innerWidth;
				
				if(browserWidth <= breakpoint) {
					// mobile/tablet nav
					
					resetTriggers();
					nav.addClass('mobile');
					nav.removeClass('desktop');

					// closes the menu when resizing window back to desktop
					if( !nav.hasClass('active') && nav.find('ul:first').is(':visible') ) {
						//nav.addClass('active');
						nav.find('ul:first').hide();
					}

				} else {
					// desktop nav
					//nav.addClass('desktop');					
					//nav.removeClass('mobile');

					if(nav.hasClass('active')) {
						nav.removeClass('active');
					}

					// ensures leftSubMenu is visible after resizing window
					if( !nav.hasClass('active') && nav.find('ul:first').is(':hidden') ) {
						nav.find('ul:first').show();
					}

					// hides items that were open on mobile
					$('li.open').removeClass('open').find('ul:visible').hide();

					resetTriggers();
					setTriggers();
				}
			}

			$(window).on('resize', function() {
				windowCheckStellerLeft();
			});
		});
	}
}(jQuery));
