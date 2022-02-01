

	$(document).ready(function() {

		"use strict";

		PageLoad();
		ScrollEffects();
		FirstLoad();
		PageLoadActions();
		Showcase();
		ShowcaseWebglCore();
		FloatingLists();
		Portfolio();
		FitThumbScreen();
		Shortcodes();
		Sliders();
		AjaxLoad();
		JustifiedGrid();
		Lightbox();
		ContactForm();
		PlayVideo();
		ContactMap();
	});

/*--------------------------------------------------
Function Page Load
---------------------------------------------------*/

	function PageLoad() {



		if ($('#page-content').hasClass("light-content")) {
			$('.preloader-wrap').addClass('light-content');
		}

		gsap.set($(".menu-timeline .before-span"), {y: 120, opacity:0});

		// Page Navigation Events
		$(".preloader-wrap").on('mouseenter', function() {
			var $this = $(this);
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
		});

		$(".preloader-wrap").on('mouseleave', function() {
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();
		});

		$('body').removeClass('hidden').removeClass('hidden-ball');
		gsap.to($(".preloader-marquee-wrapper"), {duration: 1, force3D:true, opacity:1, y: 0, delay:0.2, ease:Power3.easeOut});
		gsap.to($("#header-container"), {duration: 0.5, force3D:true, opacity:1, delay:0.2, ease:Power2.easeOut}); //modified time
		var width = 100,
			perfData = window.performance.timing,
			EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
			time = 2000

		// Loadbar Animation
		$(".loadbar").animate({
			width: width + "%"
		}, time  );


		// Percentage Increment Animation
		var PercentageID = $("#precent"),
				start = 0,
				end = 100,
				durataion = time + 0;
				animateValue(PercentageID, start, end, durataion);

		function animateValue(id, start, end, duration) {

			var range = end - start,
			  current = start,
			  increment = end > start? 1 : -1,
			  stepTime = Math.abs(Math.floor(duration / range)),
			  obj = $(id);

			var timer = setInterval(function() {
				current += increment;
				$(obj).text(current);
			  //obj.innerHTML = current;
				if (current == end) {
					clearInterval(timer);
				}
			}, stepTime);
		}

		// Fading Out Loadbar on Finised
		setTimeout(function(){
			$('.loadbar').append('<span class="hold-progress-bar"></span>');

			gsap.to($('.hold-progress-bar'), {duration: 0.3, force3D:true,width:'100%', delay:0, ease:Power2.easeOut, onComplete:function(){  //modified time 2019 nov

				$('body').waitForImages({
						finished: function() {
							gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
							gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
							$('#ball p').remove();
							gsap.to($(" .trackbar, .percentage-intro, .percentage"), {duration: 0.3, force3D:true, opacity:0, y:-10, delay:0, ease:Power2.easeIn});
							gsap.to($(".preloader-wrap"), {duration: 1, force3D:true, yPercent: -101, delay:0.6, ease:Power2.easeInOut});
							gsap.set($(".preloader-wrap"), {visibility:'hidden', delay:1.7, opacity:0});
							gsap.to($("#header-container"), {duration: 0.5, force3D:true, opacity:1, delay:1.4, ease:Power2.easeOut}); //modified time
							setTimeout(function(){

								$('body').waitForImages({
									finished: function() {
										gsap.to($(".header-middle, #footer-container, .showcase-counter, .swiper-pagination-bullet-active .counter"), {duration: 1, force3D:true, opacity:1, delay:0, ease:Power2.easeOut});

									},
									waitForAll: true
								});

								if( $('.hero-video-wrapper').length > 0 ){
									$('#hero-image-wrapper').find('video').each(function() {
										$(this).get(0).play();
									});
								}

								gsap.to($("#main"), {duration: 0, opacity:1, delay:0, ease:Power2.easeOut});//modified time
								if( $('#hero').hasClass("has-image")) {
									gsap.to($("#hero-bg-image, #hero-fg-image"), {duration: 1, force3D:true, scale:1 , opacity:1, delay:0.2, ease:Power2.easeOut});
									gsap.to($(".hero-title span"), {duration: 1, force3D:true, y: 0, opacity:1, rotation:0, delay:0.8, ease:Power2.easeOut});
									gsap.to($(".hero-subtitle span"), {duration: 1, force3D:true, y:0, opacity:1, rotation:0, delay:0.5, ease:Power2.easeOut});
									gsap.to($(".hero-footer-left"), {duration: 1, force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
									gsap.to($(".hero-footer-right"), {duration: 1, force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
									gsap.to($(".scroll-down-wrap"), {duration: 1, force3D:true, scale:1, opacity:1, delay:1.2, ease: Elastic.easeOut});
									gsap.to($("#main-page-content"), {duration: 0.4, opacity:1, delay:1.15, ease:Power2.easeOut});
								} else {
									// Fading In Small Carousel elements on Finised
									var tlHerospan = gsap.timeline();
									tlHerospan.set($("#hero .hero-title span"), {y: 120, opacity:0});
									$("#hero .hero-title span").each(function(index, element) {
										tlHerospan.to(element, {duration: 0.7, y:0, opacity:1, delay:0.7, ease:Power3.easeOut}, index * 0.03)
									});
									gsap.to($(".hero-subtitle span"), {duration: 0.4, force3D:true, y: 0, opacity:1, rotation:0, delay:0.5, ease:Power2.easeOut});
									gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
									gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
									gsap.to($("#main-page-content"), {duration: 0.7, opacity:1, delay:1.1, ease:Power2.easeOut});
									gsap.to($(".error-button"), {duration: 0.4, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
								}


								// Fading In Showcase elements on Finised
								gsap.set($("#showcase-slider-holder"), {opacity:0});
								gsap.set($(".swiper-prev, .swiper-next, .swiper-pagination-bullet, .arrows-wrap"), {opacity:0});
								gsap.to($("#showcase-slider-holder"), {duration: 0.7, opacity:1, delay:0.6, ease:Power2.easeOut});
								gsap.to($(".swiper-pagination-bullet .title div"), {duration: 1, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
								gsap.to($(".swiper-pagination-bullet-active .subtitle span"), {duration: 0.7, y: 0, opacity:1, delay:0.9, ease:Power2.easeOut});




								gsap.to($(".swiper-prev"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
								gsap.to($(".swiper-pagination-bullet, .arrows-wrap"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
								gsap.to($(".swiper-next"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
								setTimeout( function(){
									$('#showcase-slider-holder, #showcase-slider-webgl-holder, .showcase-list-holder').addClass("loaded");
								} , 1500 );




								var SlideListTitle = gsap.timeline();
								$(".sl-title span, .split-title span").each(function(index, element) {
									SlideListTitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut}, index * 0.05)
								});

								var SlideListSubtitle = gsap.timeline();
								$(".sl-subtitle span, .split-subtitle span").each(function(index, element) {
									SlideListSubtitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.6, ease:Power2.easeOut}, index * 0.05)
								});

								setTimeout( function(){
									$('.slide-list').addClass('show-borders')
								} ,300 );

								setTimeout( function(){
									$('body').removeClass("load-project-page").removeClass("load-project-page-carousel");
								} , 600 );

								setTimeout( function(){
									$('body').removeClass("load-next-project");
									$('body').addClass("header-visible");
									$('#showcase-holder').removeClass("disabled");
								} , 1600 );

								setTimeout( function(){
									$('body').removeClass("show-loader")
								} , 800 );

							} , 600 );
						},
					waitForAll: true
				});

			}});

		}, time);



	}// End Page Load




/*--------------------------------------------------
Function Scroll Effects
---------------------------------------------------*/

function ScrollEffects() {

		gsap.defaults({overwrite: "auto"});
		gsap.registerPlugin(ScrollMagic);
		gsap.registerPlugin(ScrollToPlugin);
		gsap.config({nullTargetWarn: false});

		setTimeout(function(){
			var threeapp = document.getElementById("app");
			threeapp.className += "active";
			$("body").append(threeapp)
		} , 1500 );

		if( $('#showcase-slider').length > 0 ){
			setTimeout(function(){
				var threeSlider = document.getElementById("canvas-slider");
				threeSlider.className += " active";
				$("body").append(threeSlider)
			} , 1500 );
		}

		if ($(window).width() < 1025) {

			var winHeight = $(window).height();
			var footer_height = $('footer').height();
			$('nav, #canvas-slider, #showcase-slider-holder, #hero.has-image, #hero.has-image #hero-styles, #hero-image-wrapper, #project-nav').css({'height': winHeight});
			$('#main-page-content.project-page').css({'margin-bottom': winHeight-footer_height});
			$('#project-nav').css({'bottom': -winHeight});
			$(".icon-wrap").removeClass("parallax-wrap");

			var resizeTime;
			$(window).resize(function() {
				clearTimeout(resizeTime);
				resizeTime = setTimeout(doneResizing, 100);
			});

			function doneResizing(){
				var winHeight = $(window).height();
				var footer_height = $('footer').height();
				$('nav, #canvas-slider, #showcase-slider-holder, #hero.has-image, #hero.has-image #hero-styles, #hero-image-wrapper, #project-nav').css({'height': winHeight});
				$('#main-page-content.project-page').css({'margin-bottom': winHeight-footer_height});
				$(".icon-wrap").removeClass("parallax-wrap");
			}

		}


		if ($("body").hasClass("smooth-scroll")) {
			const ScrollArea = document.querySelector('#content-scroll');
			var scrollbar = window.Scrollbar;
			// Use plugins
			// import { ScrollbarPlugin } from 'smooth-scrollbar';
			var __extends = (this && this.__extends) || (function () {
				var extendStatics = Object.setPrototypeOf ||
					({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
					function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
				return function (d, b) {
					extendStatics(d, b);
					function __() { this.constructor = d; }
					d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
				};
			})();
			var EdgeEasingPlugin = /** @class */ (function (_super) {
				__extends(EdgeEasingPlugin, _super);
				function EdgeEasingPlugin() {
					var _this = _super !== null && _super.apply(this, arguments) || this;
					_this._remainMomentum = {
						x: 0,
						y: 0
					};
					return _this;
				}
				EdgeEasingPlugin.prototype.transformDelta = function (delta) {
					var _a = this.scrollbar, limit = _a.limit, offset = _a.offset;
					var x = this._remainMomentum.x + delta.x;
					var y = this._remainMomentum.y + delta.y;
					// clamps momentum within [-offset, limit - offset]
					this.scrollbar.setMomentum(Math.max(-offset.x, Math.min(x, limit.x - offset.x)), Math.max(-offset.y, Math.min(y, limit.y - offset.y)));
					return { x: 0, y: 0 };
				};
				EdgeEasingPlugin.prototype.onRender = function (remainMomentum) {
					Object.assign(this._remainMomentum, remainMomentum);
				};
				EdgeEasingPlugin.pluginName = 'edgeEasing';
				return EdgeEasingPlugin;
			}(Scrollbar.ScrollbarPlugin));
			Scrollbar.use(EdgeEasingPlugin);
			// Config
			var ScrollbarOptions = {
				damping:0.1,
				renderByPixel: true,
				continuousScrolling: true,
				syncCallbacks: true,
			};

			// Initialise
			var scrollbar = Scrollbar.init(ScrollArea, ScrollbarOptions);


		}

		// Hero AutoScroll On Page Load
		if ($('#hero.has-image').hasClass('autoscroll')) {
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, {duration: 1.5, scrollTo:120, delay:0.7, ease:Power4.easeInOut});
			} else {
				gsap.to(window, {duration: 1.5, scrollTo:120, delay:0.7, ease:Power4.easeInOut});
			}
		}


		// Slider Center on click
		$('.autocenter').on('click', function() {
			var $window = $(window),
				$element = $(this),
				elementTop = $element.offset().top,
				elementHeight = $element.height(),
				viewportHeight = $window.height(),
				scrollIt = elementTop - ((viewportHeight - elementHeight) / 2);
			if ($("body").hasClass("smooth-scroll")) {
				var scrollOffset = scrollbar.offset.y + (elementTop - scrollbar.getSize().container.height/2);
				gsap.to(scrollbar, {duration: 0.8, scrollTo:scrollOffset + elementHeight/2, ease:Power4.easeInOut});
			}
			else{
				$("html, body").animate({ scrollTop: scrollIt }, 350);
			}
		});


		// Back To Top
		$('#backtotop').on('click', function() {
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, {duration: 1.5, scrollTop:0, delay:0.1, ease:Power4.easeInOut});
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			} else {
				$("html,body").animate({scrollTop: 0}, 800);
				gsap.to('#ball', {duration: 0.3,  borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			}
		});

		//Scroll Down
		$('.scroll-down').on('click', function() {
			var heroheight = $("#hero").height();
			if ($("body").hasClass("smooth-scroll")) {
				gsap.to(scrollbar, {duration: 1.5, scrollTop:heroheight, ease:Power4.easeInOut});
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			} else {
				$("html,body").animate({scrollTop: heroheight}, 800);
				gsap.to('#ball', {duration: 0.3, borderWidth: '4px', scale:0.5, borderColor:'#999999', delay:0.15});
			}
		});



		var controller = new ScrollMagic.Controller();

		//Hero Parallax
		var heroImageParallax = gsap.to('.parallax-scroll-image', {duration: 1, top:"5%", scale:1.1, opacity:1, ease:Linear.easeNone});
		var heroCaptionParallax = gsap.to('#hero-caption.parallax-scroll-caption', {duration: 0.5, yPercent:10, opacity:0.3, ease:Linear.easeNone});
		var heroFooterParallax = gsap.to('#hero-footer', {duration: 0.5, yPercent:15, opacity:0, ease:Linear.easeNone});

		var heroImageScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'120%'
		})
		.setTween(heroImageParallax)
		.addTo(controller);

		var heroCaptionScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'50%'
		})
		.setTween(heroCaptionParallax)
		.addTo(controller);

		var heroFooterScene = new ScrollMagic.Scene({
			triggerElement: '#hero',
			triggerHook: 0,
			duration:'30%'
		})
		.setTween(heroFooterParallax)
		.addTo(controller);

		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				heroImageScene.refresh()
				heroCaptionScene.refresh()
				heroFooterScene.refresh()
			});
		}


		// 	Page and Project Navigation
		var nextProjectImageParallax = gsap.to('.next-project-image', {duration: 1, top:"0",  scale:1, opacity:0.8, ease:Linear.easeNone});
		var nextProjectCaptionParallax = gsap.to('.next-project-wrap', {duration: 0.5, top:"0", scale:1, opacity:1, ease:Linear.easeNone});
		var nextPageCaptionParallax = gsap.to('.page-nav-caption', {duration: 0.5, top:"0", scale:1, opacity:1, ease:Linear.easeNone});

		var nextProjectImageScene = new ScrollMagic.Scene({
			triggerElement: '#project-nav',
			triggerHook: 1,
			duration:'100%'
		})
		.setTween(nextProjectImageParallax)
		.addTo(controller);

		var nextProjectCaptionScene = new ScrollMagic.Scene({
			triggerElement: '#project-nav',
			triggerHook: 1,
			duration:'99%'
		})
		.setTween(nextProjectCaptionParallax)
		.addTo(controller);


		var PageNavHeight = $('#page-nav').outerHeight() + $('footer').outerHeight();
		var nextPageCaptionScene = new ScrollMagic.Scene({
			triggerElement: '#page-nav',
			triggerHook: 1,
			duration:PageNavHeight
		})
		.setTween(nextPageCaptionParallax)
		.addTo(controller);

		if ($("body").hasClass("smooth-scroll")) {
			scrollbar.addListener(() => {
				nextProjectImageScene.refresh()
				nextProjectCaptionScene.refresh()
				nextPageCaptionScene.refresh()
			});
		}

		// 	Content Parallax Image
		$(".has-parallax").each( function () {
			var $this = $(this);
			var $thisHeight = window.innerHeight*2;
			var bg = $this.find("img");

			// Add tween for backgroundParallax
			var parallax = gsap.fromTo( bg, {y: '-20%'}, {duration: 1, y: '20%', ease:Linear.easeNone});

			// Create scrollmagic scene
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:$thisHeight
			})
			.setTween(parallax)
			.addTo(controller);

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}

		});

		// Elements Animation
		$('.has-animation').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();

			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(1)

			scene.on('enter', function(){
				$this.delay($this.attr('data-delay')).queue(function(next){
					gsap.to($this, {duration: 0.6, force3D:true, opacity:1, y:0, scale:1, delay:0, ease:Power2.easeOut});
					next();
					$this.addClass('animated')
				});
			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})

		$('.has-mask').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		$('.has-mask span').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});

		$('.has-mask').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();

			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(1)

			scene.on('enter', function(){
				$this.delay($this.attr('data-delay')).queue(function(next){
					var tl = gsap.timeline();

					$this.find('span > span').each(function(index, element) {
						tl.to(element, 0.6, {y:0, opacity:1, delay:0.1, ease:Power2.easeOut}, index * 0)
					});
					next();
				});
			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		});

		//Content Row Options
		if ($(".content-row").hasClass("light-section")) {
			$(".light-section").each(function(i) {
				$(this).wrap( "<div class='light-section-wrapper'><div class='light-section-container'></div></div>" );
				$("body").find(".light-section-wrapper").each(function(i) {
					$(this).css('background-color', function () {
						return $(this).children().children().data('bgcolor')
					});
				});
			});
		}

		if ($(".content-row").hasClass("dark-section")) {
			$(".dark-section").each(function(i) {
				$(this).wrap( "<div class='dark-section-wrapper'><div class='dark-section-container'></div></div>" );
				$("body").find(".dark-section-wrapper").each(function(i) {
					$(this).css('background-color', function () {
						return $(this).children().children().data('bgcolor')
					});
				});
			});
		}

		if( $('.change-header-color').length > 0 ){
			$('body').waitForImages({
				finished: function() {

					$('.change-header-color').each(function(){
						const pageHeader = $('header');
						var $this = $(this);
						var $thisHeight = $(this).outerHeight(true);

						var whiteScene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
							.addTo(controller)
						whiteScene.triggerHook(0.08)
						whiteScene.on('enter', function(){
							setTimeout( function(){
								pageHeader.addClass('white-header');
							} , 10 );
						});
						whiteScene.on('leave', function(){
							pageHeader.removeClass('white-header');
						});
						if ($("body").hasClass("smooth-scroll")) {
							scrollbar.addListener(() => {
								whiteScene.refresh()
							});
						}
					})

				},
				waitForAll: true
			});
		}


		if (!$('#page-content').hasClass("dark-content")) {
			$('#project-nav.change-header').each(function(){
				const content = $('#page-content');
				var $this = $(this);
				var $thisHeight = $(this).outerHeight(true);

				var whiteScene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
					.addTo(controller)


				whiteScene.triggerHook(0.08)

				whiteScene.on('enter', function(){
					content.removeClass('light-content');
				});

				whiteScene.on('leave', function(){
					content.addClass('light-content');
				});


				if ($("body").hasClass("smooth-scroll")) {
					scrollbar.addListener(() => {
						whiteScene.refresh()
					});
				}
			})
		}

		if (!$('#page-content').hasClass("light-content")) {
			if (!$('#project-nav').hasClass("change-header")) {
				$('#project-nav').each(function(){
					const content = $('#page-content');
					var $this = $(this);
					var $thisHeight = $(this).outerHeight(true);

					var whiteScene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
						.addTo(controller)

					whiteScene.triggerHook(0.08)

					whiteScene.on('enter', function(){
						content.addClass('light-content');
					});

					whiteScene.on('leave', function(){
						content.removeClass('light-content');
					});

					if ($("body").hasClass("smooth-scroll")) {
						scrollbar.addListener(() => {
							whiteScene.refresh()
						});
					}
				})
			}
		}


		var $elheight = window.innerHeight;

		//Portfolio Items Appear
		$('.portfolio .item').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).height();

			var scene = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(0.9)

			scene.on('enter', function(){
				$this.addClass('active');
			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})

		$(".item").each( function () {
			var $this = $(this);
			var $thisheight = $(this).height() + $elheight;
			var bg = $this.find(".item-parallax.enabled");

			var parallax = gsap.fromTo( bg, {y: '20%'}, {duration: 1, y: '-20%', ease:Linear.easeNone});

			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: this, // <-- Use this to select current element
				triggerHook: 1,
				duration:$thisheight
			})
			.setTween(parallax)
			.addTo(controller);

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					parallaxScene.refresh()
				});
			}

		});



		$('.content-carousel').each(function(){
			var $this = $(this);
			var $thisHeight = $(this).outerHeight(true);
			var tlCarousel = gsap.timeline();
			tlCarousel.set($(".content-carousel .swiper-slide"), {x: 800, opacity:0});

			var scene = new ScrollMagic.Scene({triggerElement:this,duration: $thisHeight})
				.addTo(controller);

			scene.triggerHook(1)

			scene.on('enter', function(){
				$this.find(".swiper-slide").each(function(index, element) {
					tlCarousel.to(element, 1.4, {x:0, opacity:1, delay:0.1, ease:Power3.easeOut}, index * 0.1)
				});

			});

			if ($("body").hasClass("smooth-scroll")) {
				scrollbar.addListener(() => {
					scene.refresh()
				});
			}
		})



	}// End Scroll Effects



/*--------------------------------------------------
Function First Load
---------------------------------------------------*/

	function FirstLoad() {

		$('#main .has-image .hero-title, #main #project-nav .next-hero-title').each(function(){
			var words = $(this).text().split(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<div /> ").text(words[index]));
			}
		});

		$('#main .has-image .hero-title div, #main #project-nav .next-hero-title div').each(function(){
			var words = $(this).text().slice(" ");
			var total = words.length;
			$(this).empty();
			for (index = 0; index < total; index ++){
				$(this).append($("<span /> ").text(words[index]));
			}
		});


		if( $('#project-nav').length > 0 ){
			$('#main-content').addClass('solid-color');
			$('#main-page-content').addClass('project-page');
		}

		if( $('.portfolio').length > 0 ){
			$('#main-page-content').addClass('portfolio-page');
		}

		if ($("#page-content").hasClass("light-content")) {
			$("nav").css('background-color', '#141414');
			$("main, #main-content.solid-color").css('background-color', function () {
				return $("#page-content").data('bgcolor')
			});
			$('#magic-cursor').addClass('light-content');
			if( $('#hero').length > 0 ){
				if( $('#hero').hasClass("has-image")) {
					$("header").css('background-color', 'transparent');
				} else {
					if ($("header").hasClass("fullscreen-menu")) {
						$("header").css('background-color', 'transparent');
					} else {
						if( $('#blog').length > 0 ){
							$("header").css('background-color', '#141414');
						}
						if( $('#post').length > 0 ){
							$("header").css('background-color', '#141414');
						}
					}
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		} else {
			$("nav").css('background-color', '#141414');
			$("main, #main-content.solid-color").css('background-color', function () {
				return $("#page-content").data('bgcolor')
			});
			$('#magic-cursor').removeClass('light-content');
			if( $('#hero').length > 0 ){
				if( $('#hero').hasClass("has-image")) {
					$("header").css('background-color', 'transparent');
				} else {
					if ($("header").hasClass("fullscreen-menu")) {
						$("header").css('background-color', 'transparent');
					} else {
						if( $('#blog').length > 0 ){
							$("header").css('background-color', '#fff');
						}
						if( $('#post').length > 0 ){
							$("header").css('background-color', '#fff');
						}
					}
				}
			} else {
				$("header").css('background-color', 'transparent');
			}
		}



		$('.video-cover').each(function() {
			var image = $(this).data('src');
			$(this).css({'background-image': 'url(' + image + ')'});
		});

		//Load Default Page
		$('a.ajax-link').on('click', function() {
			$("body").addClass("show-loader");
			$(".flexnav").removeClass("flexnav-show");
			$('#menu-burger').removeClass("open");
			$('header').removeClass('white-header');
			$("#app").remove();
			setTimeout(function(){
				$("#canvas-slider.active").remove();
			} , 300 );
			$(".temporary-hero").remove();
			var tlMenu = gsap.timeline();
			$(".fullscreen-menu .menu-timeline").each(function(index, element) {
				tlMenu.to(element, {duration: 0.25, y:-30, opacity:0, ease:Power2.easeIn}, index * 0.03)
			});
			gsap.to('#ball', {duration: 0.3, borderWidth:"4px",scale:0.5,backgroundColor:"rgba(0, 0, 0, 0)",opacity:1});
			gsap.to($("#main, #hero-image-wrapper, #project-nav, .next-project-image, #app, #canvas-slider, #showcase-slider-webgl-holder, .showcase-pagination-wrap, #quickmenu-scroll, #blog"), {duration: 0.3, opacity:0, delay:0, ease:Power0.ease});
			gsap.to($("#footer-container, .header-middle"), {duration: 0.3, opacity:0, ease:Power0.ease});
			gsap.to('#show-filters, #counter-wrap', {duration: 0.2, opacity:0});
		});


		//Load Page From Menu
		$('nav .ajax-link').on('click', function() {
			$(this).parents('.flexnav').addClass('hover');
			$(this).parents('.item-with-ul').addClass('hover');
			gsap.set($(this).find('span'),{yPercent:0});
			var tl = gsap.timeline();
			$(".menu-timeline .before-span").each(function(index, element) {
				tl.to(element, {duration: 0.5, force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.05)
			});
			$('header').removeClass('white-header');
			$("#app").remove();
			$(".big-title-caption").remove();
		});


		$('#burger-wrapper, .menu .button-text').on('click', function() {
			$('#menu-burger, nav').toggleClass('open');
			setTimeout( function(){
				if ($('#menu-burger').hasClass("open")) {
					$('header').addClass('over-sidebar').addClass('over-white-section');
					if (!$('#page-content').hasClass("light-content")) {
						$('#magic-cursor').addClass('light-content');
						$('#header-container').addClass('light-content');
					}
					gsap.set($("nav ul ul li"), {y: 0, opacity:1});
					//Fade In Navigation Lists
					var tlMenu = gsap.timeline();
					tlMenu.set($(".menu-timeline .before-span"), {y: 120, opacity:0});
					$(".menu-timeline .before-span").each(function(index, element) {
						tlMenu.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.4, ease:Power2.easeOut}, index * 0.1)
					});


					$('.touch-button').click(function(e, bIndirect) {

						if( bIndirect == true ){
							return;
						}

						let currentItem = $(this);

						$('.touch-button.active').each( function() {
							if( currentItem.get(0) !== $(this).get(0) ) {
								$(this).trigger('click', true);
							}
						});

					});



				} else {
					//Fade Out Navigation Lists
					var tlMenu = gsap.timeline();
					$(".menu-timeline .before-span").each(function(index, element) {
						tlMenu.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.05)
					});

					var tlSubMenu = gsap.timeline();
					$("nav ul ul li").each(function(index, element) {
						tlSubMenu.to(element, 0.5, {force3D:true, y:-120, opacity:0, delay:0, ease:Power2.easeIn}, index * 0.03)
					});

					if (!$('#page-content').hasClass("light-content")) {
						setTimeout( function(){
							$('#magic-cursor').removeClass('light-content');
							$('#header-container').removeClass('light-content');
						} , 500 );
					}
					setTimeout( function(){
						$(".touch-button.active").trigger("click");
						$('header').removeClass('over-sidebar')
						setTimeout( function(){
							$('header').removeClass('over-white-section');
						} , 350 );
					} , 500 );
				}
			} , 20 );
		});


		var viewportWidth = $(window).width();
		if (viewportWidth < 1024) {
			$('.hero-video-wrapper').remove();
		}


		// add a label element to CF7 input elements for the underline highlight effect
		$( '.wpcf7-form-control-wrap' ).each( function() {

			if( $( this ).has('label').length <= 0 ){
				$( this ).append( '<label class="input_label"></label>' );
			}
		});

		$( '.page-numbers li a' ).each( function() {
			$(this).addClass("link")
		});



	}// End First Load


/*--------------------------------------------------
Page Load Actions
---------------------------------------------------*/

	function PageLoadActions() {


		// Default Page Navigation Load Events
		$(".next-ajax-link-page").on('mouseenter', function() {
			var $this = $(this);
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
		});

		$(".next-ajax-link-page").on('mouseleave', function() {
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();
		});

		if (!$("body").hasClass("load-no-ajax")) {
			$('.next-ajax-link-page').on('click', function() {
				$("body").addClass("load-next-page");
				$("body").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$(".big-title-caption").remove();

				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();

				if ($("body").hasClass("smooth-scroll")) {
					var navmove = $("#content-scroll").height() - $("#page-nav").height() - $("footer").height()
				} else {
					var navmove = window.innerHeight - $("#page-nav").height() - $("footer").height()
				}

				gsap.to($("#main-page-content, #hero"), {duration: 0.3, opacity:0});
				gsap.to($("#page-nav"), {duration: 0.7, y: - navmove, delay:0, ease:Power2.easeInOut});
				gsap.to($("footer"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeInOut});
			});
		}


		// Project Page Navigation Load Events
		$("#project-nav .next-ajax-link-project").mouseenter(function(e) {
			var $this = $(this);
			$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
			gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$("#project-nav .next-hero-title").addClass('hover-title');
		});

		$("#project-nav .next-ajax-link-project").mouseleave(function(e) {
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$('#ball p').remove();
			$("#project-nav .next-hero-title").removeClass('hover-title');
		});

		if (!$("body").hasClass("load-no-ajax")) {
			$('.next-ajax-link-project').on('click', function() {
				$("body").addClass("load-project-thumb-with-title").addClass("show-loader");
				$('header').removeClass('white-header');
				$("#app").remove();
				$('.next-project-image').addClass("temporary").appendTo('body');
				if ($(this).parents('#project-nav').hasClass("change-header")) {
					$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
				} else {
					$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
				}
				$('.next-caption').appendTo('.temporary-hero .inner');

				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();

				gsap.to($("#main-page-content"), {duration: 0.3, opacity:0});
				gsap.to($(".next-project-image"), {duration: 0.6, scale:1, opacity: 1, ease:Power2.easeOut,onComplete: function() {
				  $('.next-project-image').addClass("visible")
				}});
				gsap.to($("footer"), {duration: 0.3, opacity:0, ease:Power1.easeInOut});
			});
		}

	}// Page Load Actions




/*--------------------------------------------------
Function Lazy Load
---------------------------------------------------*/

	function LazyLoad() {

		gsap.set($("#show-filters, #counter-wrap"), {opacity:0, delay:0});

		$('body').waitForImages({
			finished: function() {
				$('body').removeClass('loading')
				setTimeout( function(){
					$('body').removeClass('hidden').removeClass('scale-up').removeClass('scale-none');
				} , 1500 );
			},
			waitForAll: true
		});

		$('body').waitForImages({
			finished: function() {
				gsap.to($("#header-container, .header-middle"), {duration: 1, force3D:true, opacity:1, ease:Power2.easeOut});
			},
			waitForAll: true
		});

		if( !$('#canvas-slider').hasClass("active")) {
			gsap.set($('#canvas-slider'), {opacity:0, scale:1.1});
			gsap.to($('#canvas-slider'), {duration: 1, force3D:true, opacity:1, scale:1, delay:0.3, ease:Power2.easeOut});
		}

		gsap.to($("#main"), {duration: 0.3, opacity:1, delay:0.1, ease:Power2.easeOut});
		gsap.to($("#footer-container"), {duration: 1, force3D:true, opacity:1, delay:0.4, ease:Power2.easeOut});

		if( $('#hero').hasClass("has-image")) {
			if( $('body').hasClass("load-project-thumb-with-title")) {
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-title span"), {duration: 0, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0, force3D:true, y:0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
			} else if( $('body').hasClass("load-project-thumb-with-title-and-scale")) {
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1.02, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-title span"), {duration: 0, force3D:true, y: 0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0, force3D:true, y:0, opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1, ease:Power2.easeOut});
			} else if( $('body').hasClass("load-project-thumb")) {
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1.02 , opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-title span"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
			} else {
				gsap.to($("#hero-bg-image"), {duration: 0, force3D:true, scale:1 , opacity:1, delay:0, ease:Power2.easeOut});
				gsap.to($(".hero-title span"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.9, ease:Power2.easeOut});
				gsap.to($(".hero-subtitle span"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
				gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:1.1, ease:Power2.easeOut});
				gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:1.2, ease:Power2.easeOut});
			}
			gsap.to($("#main-page-content"), {duration: 0.4, opacity:1, delay:0.95, ease:Power2.easeOut});
		} else {
			var tlHerospan = gsap.timeline();
			tlHerospan.set($("#hero .hero-title span"), {y: 60, opacity:0});
			$("#hero .hero-title span").each(function(index, element) {
				tlHerospan.to(element, {duration: 0.7, y:0, opacity:1, delay:0.25, ease:Power3.easeOut}, index * 0.05)
			});
			gsap.to($(".hero-subtitle span"), {duration: 0.4, force3D:true, y: 0, opacity:1, rotation:0, delay:0.1, ease:Power2.easeOut});
			gsap.to($(".hero-footer-left"), {duration: 0.7, force3D:true, y: 0, opacity:1, rotation:0, delay:0.5, ease:Power2.easeOut});
			gsap.to($(".hero-footer-right"), {duration: 0.7, force3D:true, y:0, opacity:1, rotation:0, delay:0.6, ease:Power2.easeOut});
			gsap.to($("#main-page-content"), {duration: 0.5, opacity:1, delay:0.15, ease:Power2.easeOut});
			gsap.to($(".post-article-wrap"), {duration: 0.4, force3D:true, y: 0, opacity:1, ease:Power2.easeOut});
			gsap.to($(".error-button"), {duration: 0.4, force3D:true, y: 0, opacity:1, rotation:0, delay:0.2, ease:Power2.easeOut});
		}

		// Fading In Showcase elements on Finised
		gsap.set($("#showcase-slider-holder"), {opacity:0});
		gsap.to($("#showcase-slider-holder"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
		gsap.set($(".swiper-prev, .swiper-next, .showcase-pagination-wrap"), {opacity:0});
		gsap.to($(".swiper-prev, .swiper-next, .showcase-pagination-wrap"), {duration: 0.7, y: 0, opacity:1, delay:1, ease:Power2.easeOut});
		gsap.to($("#showcase-border"), {duration: 0.7, opacity:1, delay:0.8, ease:Power2.easeOut});
		// Fading In Showcase Slider
		gsap.to($(".swiper-pagination-bullet .title div"), {duration: 1, y: 0, opacity:1, delay:0.8, ease:Power2.easeOut});
								gsap.to($(".swiper-pagination-bullet-active .subtitle span"), {duration: 0.7, y: 0, opacity:1, delay:0.9, ease:Power2.easeOut});
		// Fading In Floating Lists
		var SlideListTitle = gsap.timeline();
		$(".sl-title span, .split-title span").each(function(index, element) {
			SlideListTitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.5, ease:Power2.easeOut}, index * 0.05)
		});
		var SlideListSubtitle = gsap.timeline();
		$(".sl-subtitle span, .split-subtitle span").each(function(index, element) {
			SlideListSubtitle.to(element, {duration: 0.7, force3D:true, y:0, opacity:1, delay:0.6, ease:Power2.easeOut}, index * 0.05)
		});

		setTimeout( function(){
			$('.slide-list').addClass('show-borders')
		} ,300 );



		if( $('.load-project-thumb').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$(".big-title-caption").remove();
						$('.thumb-container').remove();
					} ,250 );
				},
				waitForAll: true
			});
		} else if( $('.load-project-thumb-with-title').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$('.thumb-container').remove();
						$("#canvas-slider.active").remove();
						$(".temporary-hero").remove();
						$(".next-project-image.temporary").remove();
						$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");
					} , 500 );
				},
				waitForAll: true
			});
		} else if( $('.load-project-thumb-with-title-and-scale').length > 0 ){
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					setTimeout( function(){
						$('#hero-image-wrapper').find('video').each(function() {
							$(this).get(0).play();
						});
						$("#app.active").remove();
						$('.thumb-container').remove();
						$("#canvas-slider.active").remove();
						$(".temporary-hero").remove();
						$(".next-project-image.temporary").remove();
						$('body').removeClass("load-project-thumb-and-title").removeClass("show-loader");
					} , 500 );
				},
				waitForAll: true
			});
		} else {
			$('#hero-image-wrapper').waitForImages({
				finished: function() {
					$('#hero-image-wrapper').find('video').each(function() {
						$(this).get(0).play();
					});
					$("#app.active").remove();
					$('.thumb-container').remove();
					$("#canvas-slider.active").remove();
				},
				waitForAll: true
			});
		}

		setTimeout( function(){
			$('header').removeClass('white-header');
			$('body').removeClass("load-project-page").removeClass("load-project-thumb").removeClass("load-next-project").removeClass("load-next-page");
			setTimeout( function(){
				$('body').removeClass("load-project-thumb-with-title").removeClass("show-loader");
			} , 300 );
		} , 800 );


	}// End Lazy Load







/*--------------------------------------------------
Function Showcase Slider
---------------------------------------------------*/

	function Showcase() {


		if( $('#showcase-slider-holder').length > 0 ){

			$("footer").addClass("showcase-footer")


			var titles = [];
			var subtitle = [];
			$('#showcase-slider .swiper-slide').each(function(i) {
			  	titles.push($(this).data('title'))
				subtitle.push($(this).data('subtitle'))
			});


			var swiperOptions = {
				direction: "horizontal",
				loop: true,
				grabCursor: false,
				resistance : true,
				touchRatio: 3,
				longSwipes:true,
				longSwipesRatio:0.1,
				resistanceRatio:1,
				slidesPerView: 1,
				centeredSlides: true,
				allowTouchMove:true,
				spaceBetween:0,
				speed:1000,
				autoplay: false,
				mousewheel: true,
				parallax:true,
				navigation: {
					nextEl: '.swiper-next',
					prevEl: '.swiper-prev',
				},
				pagination: {
				  el: '.showcase-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						return '<div class="' + className + '">' + '<div class="caption-wrapper">' + '<div class="subtitle">' + '<span>' + subtitle[index] + '</span>' + '</div>' + '<div class="title">' + titles[index] + '</div>' + '</div>' +'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader disable-drag" width="20" height="20" viewBox="0 0 20 20">'+
								'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
								'stroke-opacity="1" stroke-width="2px"></circle>'+
								'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
								'</svg></div></div>' + '</div>';
					},
				},
				on: {
					init: function () {
						var $transformPerspective = $(".swiper-pagination-bullet .title span");
						TweenLite.set($transformPerspective, {transformPerspective:500});


					},
					slidePrevTransitionStart: function () {

						$('.showcase-pagination').find('.swiper-pagination-bullet').each(function() {
							if (!$(this).hasClass("swiper-pagination-bullet-active")) {
								TweenMax.staggerTo($(this).find('.title span'), 0.5, {y:120, rotationX: 0, transformOrigin:"50% 90% 0px", opacity:0, ease:Power2.easeInOut}, 0.002)
								TweenMax.to($(this).find('.subtitle span'), 0.5, {y:30, opacity:0, delay:0.1, ease:Power2.easeInOut})
							} else {
								TweenLite.set($(this).find('.title span'), {y:-120, rotationX: 0, transformOrigin:"50% 90% 0px", opacity:0, });
								TweenLite.set($(this).find('.subtitle span'), {y:-30, opacity:0, });
								TweenMax.staggerTo($(this).find('.title span'), 0.5, {y:0, rotationX: 0, transformOrigin:"50% 10% 0px", opacity:1, delay:0.5, ease:Power2.easeOut}, 0.002)
								TweenMax.to($(this).find('.subtitle span'), 0.5, {y:0, opacity:1, delay:0.4, ease:Power2.easeInOut})
							}
						});

					},
					slideNextTransitionStart: function () {

						$('.showcase-pagination').find('.swiper-pagination-bullet').each(function() {
							if (!$(this).hasClass("swiper-pagination-bullet-active")) {
								TweenMax.staggerTo($(this).find('.title span'), 0.5, {y:-120, rotationX: 0, transformOrigin:"50% 10% 0px", opacity:0,  delay:0.1, ease:Power2.easeInOut}, 0.002)
								TweenMax.to($(this).find('.subtitle span'), 0.5, {y:-30, opacity:0,ease:Power2.easeInOut})
							} else {
								TweenLite.set($(this).find('.title span'), {y:120, rotationX: -0, transformOrigin:"50% 10% 0px", opacity:0, });
								TweenLite.set($(this).find('.subtitle span'), {y:30, opacity:0, });
								TweenMax.staggerTo($(this).find('.title span'), 0.5, {y:0, rotationX: 0, transformOrigin:"50% 90% 0px", opacity:1, delay:0.5, ease:Power2.easeOut}, 0.002)
								TweenMax.to($(this).find('.subtitle span'), 0.5, {y:0, opacity:1, delay:0.3, ease:Power2.easeInOut})
							}
						});

					},
					slideChangeTransitionStart: function () {

						$('.swiper-slide-active').find('div').first().each(function() {
							if (!$(this).hasClass("active")) {
								$(this).trigger('click');
							}

						});

						$('.swiper-slide-duplicate-active').find('div').first().each(function() {
							if (!$(this).hasClass("active")) {
								$(this).trigger('click');
							}
						});

						if ($('.swiper-slide-active').hasClass("change-header")) {
							$('#page-content').delay(500).queue(function(next){
								$(this).removeClass('light-content');
								$('#magic-cursor').removeClass('light-content');
								next();
							});
						} else {
							$('#page-content').delay(400).queue(function(next){
								$(this).addClass('light-content');
								$('#magic-cursor').addClass('light-content');
								next();
							});
						}

						$('.swiper-slide').find('.slide-title').each(function() {
							$(this).removeClass('active-title');
						});


					},
					slideChangeTransitionEnd: function () {

						setTimeout(function(){
							$('.swiper-slide-active').find('.slide-title').each(function() {
								$(this).addClass('active-title');
							});

							$('.swiper-slide-duplicate-active').find('.slide-title').each(function() {
								$(this).addClass('active-title');
							});
						}, 0);

					},
  				},
			};



			var showSwiper = new Swiper("#showcase-slider", swiperOptions);




			function BulletsPosition() {
				var bullets_count = $('.swiper-pagination-bullet .parallax-wrap').length;
				var bullets_count_width = $('.swiper-pagination-bullet .parallax-wrap').length * 40 / 2;
				var bullets_height = $('.swiper-pagination-bullet').height();
				var window_height = $(window).height() / 2;
				var footer_height = $('footer').height() + 40;
				for( i = 0; i < bullets_count; i++ ) { $('.swiper-pagination-bullet .parallax-wrap').eq( i ).css( 'left', (i * 40) - bullets_count_width + 20).css( 'top', (bullets_height - 20) + footer_height);	}
			}

			BulletsPosition();

			var resizeTime;
			$(window).resize(function() {
				clearTimeout(resizeTime);
				resizeTime = setTimeout(doneResizing, 50);
			});

			function doneResizing(){
				BulletsPosition();
			}

			$('.swiper-container .slide-title-wrapper').on('mousedown', function(event) {
				return false;
			});

			$('.swiper-container').on('mousedown touchstart', function(event) {
				if ($('#magic-cursor').hasClass("light-content")) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
				} else {
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000',});
				}
				$("body" ).addClass("scale-drag-x");
			});

			$('.swiper-container').on('mouseup touchend', function(event) {
				TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				$("body").removeClass("scale-drag-x");
			});

			$('.title').each(function(){
				var words = $(this).text().split(" ");
				var total = words.length;
				$(this).empty();
				for (index = 0; index < total; index ++){
					$(this).append($("<div /> ").text(words[index]));
				}
			});

			$('.title div').each(function(){
				var words = $(this).text().split(" ");
				var total = words.length;
				$(this).empty();
				for (index = 0; index < total; index ++){
					$(this).append($("<span /> ").text(words[index]));
				}
			});

			// Page Navigation Events
			$("#showcase-slider-holder .slide-link").on('mouseenter', function() {
				var $this = $(this);
				gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
				$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				$("#showcase-slider-holder .slide-title").addClass('hover-title')
			});

			$("#showcase-slider-holder .slide-link").on('mouseleave', function() {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
				$('#ball p').remove();
				$("#showcase-slider-holder .slide-title").removeClass('hover-title')
			});


			$('#showcase-slider-holder .slide-link').on('click', function() {
				$("body").addClass("show-loader");
				if ($(this).parents('.swiper-slide').hasClass("change-header")) {
					$("body").append('<div class="temporary-hero"><div class="outer"><div class="inner"></div></div></div>');
				} else {
					$("body").append('<div class="temporary-hero light-content"><div class="outer"><div class="inner"></div></div></div>');
				}
				$('.swiper-pagination-bullet-active').find('.caption-wrapper').appendTo('.temporary-hero .inner');
				TweenMax.to('footer, .showcase-pagination-wrap .parallax-element, .caption-border', 0.5,{opacity:0, ease:Power4.easeInOut});

				setTimeout( function(){
					$("body").addClass("load-project-thumb-with-title");
				} , 300 );

				TweenMax.to('#ball', 0.2,{borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
				TweenMax.to('#ball-loader', 0.2,{borderWidth: '4px', top: 0, left: 0});
				$("#ball").removeClass("with-icon");
				$('#ball p').remove();
				$('#ball i').remove();
			});


		}


	}//End Showcase Slider




/*--------------------------------------------------
Function Showcase Webgl Slider Core
---------------------------------------------------*/

	function ShowcaseWebglCore() {


		if( $('#showcase-slider-holder').length > 0 ){


			var vertex = 'varying vec2 vUv; void main() {  vUv = uv;  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );	}';
			var fragment = `
				varying vec2 vUv;

				uniform sampler2D currentImage;
				uniform sampler2D nextImage;
				uniform sampler2D disp;
				uniform float dispFactor;
				uniform float effectFactor;
				uniform vec4 resolution;

				void main() {

					vec2 uv = (vUv - vec2(0.5))*resolution.zw + vec2(0.5);

					vec4 disp = texture2D(disp, uv);
					vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
					vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
					vec4 _currentImage = texture2D(currentImage, distortedPosition);
					vec4 _nextImage = texture2D(nextImage, distortedPosition2);
					vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);

					gl_FragColor = finalTexture; }

				`;

			var gl_canvas = new ACWebGL({
					vertex: vertex,
					fragment: fragment,
			});

			if( $('#showcase-slider').length > 0 ){

				var addEvents = function(){

					var triggerSlide = Array.from(document.getElementById('trigger-slides').querySelectorAll('.slide-wrap'));
					gl_canvas.isRunning = false;

					triggerSlide.forEach( (el) => {

						el.addEventListener('click', function() {

								if( !gl_canvas.isRunning ) {

									gl_canvas.isRunning = true;

									document.getElementById('trigger-slides').querySelectorAll('.active')[0].className = '';
									this.className = 'active';

									var slideId = parseInt( this.dataset.slide, 10 );

									gl_canvas.material.uniforms.nextImage.value = gl_canvas.textures[slideId];
									gl_canvas.material.uniforms.nextImage.needsUpdate = true;

									gsap.to( gl_canvas.material.uniforms.dispFactor, {
										duration: 0.7,
										value: 1,
										ease: 'Sine.easeInOut',
										onComplete: function () {
											gl_canvas.material.uniforms.currentImage.value = gl_canvas.textures[slideId];
											gl_canvas.material.uniforms.currentImage.needsUpdate = true;
											gl_canvas.material.uniforms.dispFactor.value = 0.0;
											gl_canvas.isRunning = false;
										}
									});

								}

						});

					});

				};

				addEvents();

			}


		}


	}//End Showcase WebGL Core







/*--------------------------------------------------
Function Floating Lists
---------------------------------------------------*/

	function FloatingLists() {

		if( $('.showcase-list-holder').length > 0 ){

			if ($(window).width() < 1024) {
				$('.hover-reveal').addClass('trigger-slide-link');
				$('.sl-title').addClass('trigger-slide-link');
			}

			if ($(window).width() >= 1024) {

				if ($("body").hasClass("smooth-scroll")) {
					var elem = document.querySelector("#content-scroll");
					var scrollbar = Scrollbar.init(elem,
					{
						renderByPixels: true,
						damping:0.1
					});
				}

				const getMousePos = (e) => {
					let posx = 0;
					let posy = 0;
					if (!e) e = window.event;
					if (e.pageX || e.pageY) {
						posx = e.pageX;
						posy = e.pageY;
					}
					else if (e.clientX || e.clientY) 	{
						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}
					return { x : posx, y : posy }
				}

				// Effect 1
				class HoverImgFx1 {
					constructor(el) {
						this.DOM = {el: el};
						this.DOM.reveal = this.DOM.el.querySelector('.hover-reveal');
						this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
						this.DOM.revealInner.style.overflow = 'hidden';
						this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');
						this.initEvents();
					}
					initEvents() {

						this.positionElement = (ev) => {
							const mousePos = getMousePos(ev);
							if ($("body").hasClass("smooth-scroll")) {
								const docScrolls = {
									left : document.body.scrollLeft + document.documentElement.scrollLeft,
									top : - scrollbar.scrollTop
								};
								if ($(".showcase-list-holder").hasClass("vertical-list")) {
									gsap.to($('.hover-reveal'), { duration: 0.7, top: `${mousePos.y-150-docScrolls.top}px`, left: `${mousePos.x-250-docScrolls.left}px`, ease:Power4.easeOut });
								} else {
									gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
								}
							} else {
								const docScrolls = {
									left : document.body.scrollLeft + document.documentElement.scrollLeft,
									top : document.body.scrollTop + document.documentElement.scrollTop
								};
								if ($(".showcase-list-holder").hasClass("vertical-list")) {
									gsap.to($('.hover-reveal'), { duration: 0.7, top: `${mousePos.y-150-docScrolls.top}px`, left: `${mousePos.x-250-docScrolls.left}px`, ease:Power4.easeOut });
								} else {
									gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
								}
							}

						};
						this.mouseenterFn = (ev) => {
							this.positionElement(ev);
							this.showImage();
						};
						this.mousemoveFn = ev => requestAnimationFrame(() => {
							this.positionElement(ev);
						});
						this.mouseleaveFn = () => {
							this.hideImage();
						};

						this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
						this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
						this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
					}
					showImage() {
						gsap.killTweensOf(this.DOM.revealInner);
						gsap.killTweensOf(this.DOM.revealImg);

						this.tl = gsap.timeline({
							onStart: () => {
								this.DOM.reveal.style.opacity = 1;
								gsap.set(this.DOM.el, {zIndex: 1000});
							}
						})
						.add('begin')
						.add(gsap.to(this.DOM.revealInner, {
							duration: 0.4,
							ease: Sine.easeOut,
							startAt: {x: '-100%'},
							x: '0%'
						}), 'begin')
						.add(gsap.to(this.DOM.revealImg, {
							duration: 0.4,
							ease: Sine.easeOut,
							startAt: {x: '100%'},
							x: '0%'
						}), 'begin');
					}
					hideImage() {
						gsap.killTweensOf(this.DOM.revealInner);
						gsap.killTweensOf(this.DOM.revealImg);

						this.tl = gsap.timeline({
							onStart: () => {
								gsap.set(this.DOM.el, {zIndex: 999});
							},
							onComplete: () => {
								gsap.set(this.DOM.el, {zIndex: ''});
								gsap.set(this.DOM.reveal, {opacity: 0});
							}
						})
						.add('begin')
						.add(gsap.to(this.DOM.revealInner, {
							duration: 0.4,
							ease: Sine.easeOut,
							x: '100%'
						}), 'begin')

						.add(gsap.to(this.DOM.revealImg, {
							duration: 0.4,
							ease: Sine.easeOut,
							x: '-100%'
						}), 'begin');
					}
				}

				Array.from(document.querySelectorAll('.slide-list')).forEach(link => new HoverImgFx1(link));


				var slide_top = document.querySelector('.slide-list:first-child');
				$('.showcase-list-intro').css( 'top', slide_top.offsetTop);

				$('.slide-list').on('mouseenter', function() {
					$('.slide-list').addClass('disable');
					$(this).removeClass('disable');
					$(this).find('video').each(function() {
						$(this).get(0).play();
					});
				}).on('mouseleave', function() {
					$('.slide-list').removeClass('disable');
					$(this).find('video').each(function() {
						$(this).get(0).pause();
					});
				});


				$(".vertical-list .slide-list").on('mouseenter', function() {
					var $this = $(this);
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				}).on('mouseleave', function() {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();
				});
			}

		}


	}// End Floating Lists



/*--------------------------------------------------
Function Portfolio
---------------------------------------------------*/

	function Portfolio() {


		if( $('.portfolio-wrap').length > 0 ){


			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{renderByPixels: true,damping:0.1});
			}

			var $container = $('.portfolio');

			$container.isotope({
			  layoutMode: 'packery',
			  itemSelector: '.item',
			  gutter:0,
			  transitionDuration: "0.5s"
			});

			$('#filters a').on('click', function() {
				$('#filters a').removeClass('active');
				$(this).addClass('active');
				$('.item').addClass('item-margins');
				var selector = $(this).attr('data-filter');
				$container.isotope({ filter: selector }, function( $changedItems, instance ) {
				  instance.$allAtoms.filter('.isotope-hidden').removeClass('is-filtered');
				  instance.$filteredAtoms.addClass('is-filtered');
				});
				return false;
			});

			$("#all").trigger('click');





			//Show Filters On overlay
			$('#show-filters, #close-filters').on('click', function() {
				$('#filters-overlay').toggleClass('active');
				var navtitleheight = $(".hero-title").height()
				var navsubtitleheight = $(".hero-subtitle").height()

				setTimeout( function(){
					if ($('#filters-overlay').hasClass("active")) {

						gsap.to($(".item-parallax"), {duration: 0.6, force3D:true, scale:0.9, opacity:0.3, delay:1.1, ease:Power2.easeInOut});
						gsap.to($(".active .item-caption"), {duration: 0.3, opacity:0, ease:Power2.easeOut});
						gsap.to($("#show-filters, #counter-wrap"), {duration: 0.3, opacity:0, delay:0, ease:Power2.easeOut});
						gsap.to($("#show-filters, #counter-wrap"), {duration: 0, visibility:'hidden', delay:0.35, ease:Power2.easeOut});

						//Fade In Navigation Lists
						gsap.set($(".filters-info"), {y:30, opacity:0});
						gsap.to($(".filters-info"), {duration: 0.4, force3D:true, y:0, opacity:1, delay:0.7, ease:Power2.easeOut});
						var tlMenu = gsap.timeline();
						tlMenu.set($(".filters-timeline"), {y:60, opacity:0});
						$(".filters-timeline").each(function(index, element) {
							tlMenu.to(element, {duration: 0.5, y:0, opacity:1, delay:1.2, ease:Power3.easeOut}, index * 0.1)
						});

						var heroheight = $("#hero").height();
						if ($("body").hasClass("smooth-scroll")) {
							gsap.to(scrollbar, {duration: 1.5, scrollTop:heroheight, ease:Power4.easeInOut});
						} else {
							$("html,body").animate({scrollTop: heroheight}, 800);
						}

					} else {


						gsap.to($(".item-parallax"), {duration: 0.6, force3D:true, scale: 1, opacity:1, delay:0.3, ease:Power2.easeInOut});
						gsap.to($(".active .item-caption"), {duration: 0.5, opacity:1, delay:0.5, ease:Power2.easeOut});
						gsap.set($("#show-filters, #counter-wrap"), {visibility:'visible', opacity:0});
						gsap.to($("#show-filters, #counter-wrap"), {duration: 0.3, opacity:1, delay:0.7, ease:Power2.easeOut});

						//Fade Out Navigation Lists
						gsap.to($(".filters-info"), {duration: 0.2, force3D:true, y:-30, opacity:0, delay:0, ease:Power1.easeIn});
						var tlMenu = gsap.timeline();
						$(".filters-timeline, .jssocials-share").each(function(index, element) {
							tlMenu.to(element, {duration: 0.25, opacity:0, y:-60, delay:0.1, ease:Power1.easeIn }, index * 0.1)
						});
						gsap.to('#ball', {duration: 0.1, borderWidth: '4px', scale:0.5,});
						$("#ball").removeClass("close-icon");
						$('#ball i').remove();

					}
				} , 20 );
			});

			if ($(window).width() >= 1024) {
				$("#close-filters").mouseenter(function(e) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("close-icon").append( '<i class="fa fa-times"></i>' );
				});

				$("#close-filters").mouseleave(function(e) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					gsap.to('#ball-loader', {duration: 0.2,borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("close-icon");
					$('#ball i').remove();
				});
			}

			setTimeout( function(){
				var controller = new ScrollMagic.Controller();
				$('.portfolio').each(function(){
					var $this = $(this);
					var $thisHeightFilters = $(this).outerHeight();
					var $thisHeightCaptions = $(this).outerHeight() - window.innerHeight * 0.1;

					var sceneFilters = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeightFilters})
						.addTo(controller)


					sceneFilters.triggerHook(1)

					sceneFilters.on('enter', function(){
						gsap.to($("#show-filters"), {duration: 0.3, opacity:1, delay:0, ease:Power2.easeOut});
						$("#show-filters").addClass('enabled')
					});

					sceneFilters.on('leave', function(){
						gsap.to($("#show-filters"), {duration: 0.15, opacity:0, delay:0, ease:Power2.easeOut});
						$("#show-filters").removeClass('enabled')
					});

					var sceneCaptions = new ScrollMagic.Scene({triggerElement:$this[0],duration: $thisHeightCaptions})
						.addTo(controller)


					sceneCaptions.triggerHook(0.5)

					sceneCaptions.on('enter', function(){
						$(".portfolio-captions").addClass('enabled')
					});

					sceneCaptions.on('leave', function(){
						$(".portfolio-captions").removeClass('enabled')
					});



					if ($("body").hasClass("smooth-scroll")) {
						scrollbar.addListener(() => {
							sceneFilters.refresh()
							sceneCaptions.refresh()
						});
					}
				})
			} , 2000 );

			gsap.to($("#show-filters"), {duration: 0, opacity:0, delay:0.05, ease:Power2.easeOut});

			if ($(window).width() > 1024) {

				if (!$(".portfolio-wrap").hasClass("tooltip-caption")) {
					$(".item-content").on('mouseenter', function() {
						var $this = $(this);
						gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
						$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
						$(this).parent().find('video').each(function() {
							$(this).get(0).play();
						});
					});

					$(".item-content").on('mouseleave', function() {
						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$('#ball p').remove();
						$(this).parent().find('video').each(function() {
							$(this).get(0).pause();
						});
					});
				}

			}

		}

	}//End Portfolio




/*--------------------------------------------------
Function FitThumbScreen
---------------------------------------------------*/

	function FitThumbScreen() {
		if (!$("body").hasClass("load-no-ajax")) {
			if ($("#itemsWrapper").hasClass("webgl-fitthumbs")) {

				if( $('#itemsWrapper').length > 0 ){

					function createDemoEffect(options) {
					  const transitionEffect = new GridToFullscreenEffect(
						document.getElementById("app"),
						document.getElementById("itemsWrapper"),
						Object.assign(
						  {
							scrollContainer: window,
							onToFullscreenStart: ({ index }) => {},
							onToFullscreenFinish: ({ index }) => {},
							onToGridStart: ({ index }) => {},
							onToGridFinish: ({ index, lastIndex }) => {}
						  },
						  options
						)
					  );

					  return transitionEffect;
					}

					let currentIndex;
					const itemsWrapper = document.getElementById("itemsWrapper");
					const thumbs = [...itemsWrapper.querySelectorAll("img.grid__item-img:not(.grid__item-img--large)")];
					const transitionEffectDuration = 1.8;

					const transitionEffect = createDemoEffect({
						activation: { type: "closestCorner" },
						timing: {
							type: "sameEnd",
							sections: 0,
							duration: transitionEffectDuration
						},
						activation: {
							type: "mouse"
						},
						transformation: {
							type: "wavy",
							props: {
								seed: "217",
								frequency: 0.1,
								amplitude: 0.1
							}
						},
						onToFullscreenStart: ({ index }) => {
							currentIndex = index;
							thumbs[currentIndex].style.opacity = 1;


							gsap.to(itemsWrapper, {
								duration: .6,
								ease: Power1.easeInOut,
								opacity:1,
								delay:0,
							});


							toggleFullview();
						},

						onToGridStart: ({ index }) => {
							gsap.to(itemsWrapper, {
								duration: 1,
								ease: Power3.easeInOut,
								scale: 1,
								opacity: 1
							});

							toggleFullview();
						},

						onToGridFinish: ({ index, lastIndex }) => {
							thumbs[lastIndex].style.opacity = 1;

						},
						easings: {
							toFullscreen: Cubic.easeInOut,
							toGrid: Power3.easeInOut
						}
					});
					transitionEffect.init();

					if( $('#itemsWrapperLinks').length > 0 ){

						const itemsCaptions = document.getElementById("itemsWrapperLinks");
						const thumbsLink = [...itemsCaptions.querySelectorAll(".trigger-item-link")];
						for( let idxCaption = 0; idxCaption < thumbsLink.length; idxCaption++){

							thumbsLink[idxCaption].addEventListener( "mousedown", transitionEffect.createOnMouseDown( idxCaption ) );
						}
					}

					const toggleFullview = () => {
						if ( transitionEffect.isFullscreen ) {

							transitionEffect.toGrid();
						}
						else {


						}
					};

					// Preload all the images in the pageI
					imagesLoaded(document.querySelectorAll(".grid__item-img"), instance => {
						//https://www.techrepublic.com/article/preloading-and-the-javascript-image-object/


						// Make Images sets for creating the textures.
						let images = [];
						for (var i = 0, imageSet = {}; i < instance.elements.length; i++) {
							let image = {
								element: instance.elements[i],
								image: instance.images[i].isLoaded ? instance.images[i].img : null
							};
							if (i % 2 === 0) {
								imageSet = {};
								imageSet.small = image;
							}

							if (i % 2 === 1) {
								imageSet.large = image;
								images.push(imageSet);
							}
						}
						transitionEffect.createTextures(images);
					});

				}

				$('#itemsWrapperLinks .trigger-item-link').on('click', function() {
					let parent_item = $(this).closest( '.trigger-item' );
					parent_item.addClass('above');

					if (parent_item.hasClass("change-header")) {
						$('#page-content').delay(900).queue(function(next){
							if (!$('#page-content').hasClass("light-content")) {
								$(this).addClass('light-content');
							} else {
								$(this).removeClass('light-content');
							}
							next();
						});
					}

					$("body").addClass("load-project-thumb").addClass("show-loader");

					gsap.to('.item, #show-filters, .item-caption-wrapper, #hero, #page-nav', {duration: 0.5, opacity:0, ease:Power4.easeInOut});

					gsap.to($("#showcase-slider .swiper-slide .inner"), {duration: 0.3, force3D:true, delay:0, opacity:0, ease:Power3.easeInOut  });
					gsap.to($("#showcase-slider .swiper-slide.above").prevAll(), {duration: 0.7, force3D:true, x:-300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
					gsap.to($("#showcase-slider .swiper-slide.above").nextAll(), {duration: 0.7, force3D:true, x:300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });

					$('.showcase-list-holder').removeClass("loaded");
					gsap.to($(".showcase-list-intro span"), {duration: 0.5, force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut});
					var SlideListTitle = gsap.timeline();
					$(".sl-title span").each(function(index, element) {
						SlideListTitle.to(element, {duration: 0.5, force3D:true, y:-80, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});
					var SlideListSubtitle = gsap.timeline();
					$(".sl-subtitle span").each(function(index, element) {
						SlideListSubtitle.to(element, {duration: 0.5, force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});
					gsap.to('.slide-list', {duration: 0.5, opacity:0, ease:Power4.easeInOut});

					gsap.to('footer', {duration: 0.5, opacity:0, ease:Power4.easeInOut});
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', opacity:1});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();

					$(this).delay(1000).queue(function() {
						var link = $(".above").find('a');
						link.trigger('click');
					});
				});


			} else if ($("#itemsWrapper").hasClass("scale-fitthumbs")) {

				$("body").find(".thumb-container").each(function() {
					$("#clone-image").append($(this))
				});

				$('.thumb-page').each(function() {
					var image = $(this).data('src');
					$(this).css({'background-image': 'url(' + image + ')'});
				});

				var root  = document.documentElement;
				var body  = document.body;
				var pages = document.querySelectorAll(".thumb-page");
				var tiles = document.querySelectorAll(".item-image");
				var urls = document.querySelectorAll(".trigger-item-link");

				for (var i = 0; i < tiles.length; i++) {
					addListeners(tiles[i], pages[i], urls[i]);
				}

				function addListeners(tile, page, url) {

					url.addEventListener("click", function() {
						let parent_item = $(this).closest( '.trigger-item' );
						parent_item.addClass('above');

						if (parent_item.hasClass("change-header")) {
							$('#page-content').delay(1300).queue(function(next){
								if (!$('#page-content').hasClass("light-content")) {
									$(this).addClass('light-content');
								} else {
									$(this).removeClass('light-content');
								}
								next();
							});
						}

						gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', opacity:1});
						gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
						$("#ball").removeClass("with-icon");
						$('#ball p').remove();
						$('#ball i').remove();
						$("body").addClass("show-loader").addClass("load-project-thumb");

						gsap.to('#hero, .item, .item-caption-wrapper, #page-nav, footer',{duration: 0.3, opacity: 0, delay:0, ease:Power2.easeIn});

						gsap.to('.item, #show-filters, .item-caption-wrapper', {duration: 0.5, opacity:0, ease:Power4.easeInOut});

						gsap.to($("#showcase-slider .swiper-slide .inner"), {duration: 0.3, force3D:true, delay:0, opacity:0, ease:Power3.easeInOut  });
						gsap.to($("#showcase-slider .swiper-slide.above").prevAll(), {duration: 0.7, force3D:true, x:-300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
						gsap.to($("#showcase-slider .swiper-slide.above").nextAll(), {duration: 0.7, force3D:true, x:300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });

						$('.showcase-list-holder').removeClass("loaded");
						gsap.to($(".showcase-list-intro span"), {duration: 0.5, force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut});
						var SlideListTitle = gsap.timeline();
						$(".sl-title span").each(function(index, element) {
							SlideListTitle.to(element, {duration: 0.5, force3D:true, y:-80, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
						});
						var SlideListSubtitle = gsap.timeline();
						$(".sl-subtitle span").each(function(index, element) {
							SlideListSubtitle.to(element, {duration: 0.5, force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
						});
						gsap.to('.slide-list', {duration: 0.5, opacity:0, ease:Power4.easeInOut});

						setTimeout( function(){
							animateHero(tile, page);
						} , 750 );
						setTimeout(function(){
							$(".above").find('a').trigger('click');
						} , 1200 );
					});

					page.addEventListener("click", function() {
						$('.item').removeClass('above');
						gsap.to('#hero, .item, .item-caption-wrapper, #page-nav, footer', {duration: 0.3, opacity: 1, delay:0.6, ease:Power2.easeOut});
						animateHero(page, tile);
					});
				}

				function animateHero(fromHero, toHero) {

					var clone = fromHero.cloneNode(true);

					var from = calculatePosition(fromHero);
					var to = calculatePosition(toHero);

					gsap.set([fromHero, toHero], { visibility: "hidden" });
					gsap.set(clone, { position: "absolute", margin: 0 });

					body.appendChild(clone);
					var style = {
						x: to.left - from.left,
						y: to.top - from.top,
						scale:1.02,
						width: to.width,
						height: to.height,
						autoRound: false,
						ease: Expo.easeInOut,
						onComplete: onComplete
					};

					gsap.set(clone, from);
					gsap.to(clone, 1, style)


					function onComplete() {
						gsap.set('.thumb-container', {scale:1.02});
						gsap.set(toHero, { visibility: "visible" });
						body.removeChild(clone);
					}
				}

				function calculatePosition(element) {
					var rect = element.getBoundingClientRect();
					var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
					var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
					var clientTop  = root.clientTop  || body.clientTop  || 0;
					var clientLeft = root.clientLeft || body.clientLeft || 0;

					return {
						top: Math.round(rect.top + scrollTop - clientTop),
						left: Math.round(rect.left + scrollLeft - clientLeft),
						height: rect.height,
						width: rect.width,
					};
				}

			} else if ($("#itemsWrapper").hasClass("no-fitthumbs")) {

				$('#itemsWrapperLinks .trigger-item-link').on('click', function() {
					let parent_item = $(this).closest( '.trigger-item' );
					parent_item.addClass('above-trigger');
					$("body").addClass("show-loader");

					if (parent_item.hasClass("change-header")) {
						$('#page-content').delay(900).queue(function(next){
							if (!$('#page-content').hasClass("light-content")) {
								$(this).addClass('light-content');
							} else {
								$(this).removeClass('light-content');
							}
							next();
						});
					}

					gsap.to('.item, #show-filters, .item-caption-wrapper, #hero, #page-nav', {duration: 0.5, opacity:0, ease:Power4.easeInOut});

					gsap.to($("#showcase-slider .swiper-slide .inner"), {duration: 0.3, force3D:true, delay:0, opacity:0, ease:Power3.easeInOut  });
					gsap.to($("#showcase-slider .swiper-slide.above").prevAll(), {duration: 0.7, force3D:true, x:-300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });
					gsap.to($("#showcase-slider .swiper-slide.above").nextAll(), {duration: 0.7, force3D:true, x:300, scale:1.1, delay:0, opacity:0, ease:Power3.easeInOut  });

					$('.showcase-list-holder').removeClass("loaded");
					gsap.to($(".showcase-list-intro span"), {duration: 0.5, force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut});
					var SlideListTitle = gsap.timeline();
					$(".sl-title span").each(function(index, element) {
						SlideListTitle.to(element, {duration: 0.5, force3D:true, y:-80, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});
					var SlideListSubtitle = gsap.timeline();
					$(".sl-subtitle span").each(function(index, element) {
						SlideListSubtitle.to(element, {duration: 0.5, force3D:true, y:-30, opacity:0, delay:0, ease:Power2.easeInOut}, index * 0.05)
					});
					gsap.to('.slide-list', {duration: 0.5, opacity:0, ease:Power4.easeInOut});

					gsap.to('footer', {duration: 0.5, opacity:0, ease:Power4.easeInOut});
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent', opacity:1});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball p').remove();
					$('#ball i').remove();

					$(this).delay(1000).queue(function() {
						var link = $(".above-trigger").find('a');
						link.trigger('click');
					});
				});

			}
		}

	}//End FitThumbScreen




/*--------------------------------------------------
Function Shortcodes
---------------------------------------------------*/

	function Shortcodes() {

		// Accordion

		$('dd.accordion-content').slideUp(1).addClass('hide');
		$('dl.accordion').on('click', 'dt', function() {
			$(this).addClass('accordion-active').next().slideDown(350).siblings('dd.accordion-content').slideUp(350).prev().removeClass('accordion-active');
		});
		$('dl.accordion').on('click', 'dt.accordion-active', function() {
			$(this).removeClass('accordion-active').siblings('dd.accordion-content').slideUp(350);
		});

		$(".flexnav").flexNav({ 'animationSpeed' : 250 });

		// Project Share

		$("#share").jsSocials({
            showLabel: false,
    		showCount: false,
    		shares: ["facebook", "twitter", "pinterest"]
        });

		$('.jssocials-share').wrap( "<div class='parallax-wrap'><div class='parallax-element'></div></div>" );

		if( $('.random-collage-wrap').length > 0 ){

			if ($(window).width() >= 1024) {

				$(".random-collage .rc-slide .item-wrap-image").on('mouseenter', function() {
					var $this = $(this);
					gsap.to('#ball', {duration: 0.3, borderWidth: '2px', scale: 1.2, borderColor:$("body").data('primary-color'), backgroundColor:$("body").data('primary-color')});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).append( '<p class="first">' + $this.data("firstline") + '</p>' + '<p>' + $this.data("secondline") + '</p>' );
				});

				$(".random-collage .rc-slide .item-wrap-image").on('mouseleave', function() {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999', backgroundColor:'transparent'});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$('#ball p').remove();
				});

			}
		}

		if( $('#my-education-list').length > 0 ){

			if ($("body").hasClass("smooth-scroll")) {
				var elem = document.querySelector("#content-scroll");
				var scrollbar = Scrollbar.init(elem,
				{renderByPixels: true,damping:0.1});
			}

			const getMousePos = (e) => {
				let posx = 0;
				let posy = 0;
				if (!e) e = window.event;
				if (e.pageX || e.pageY) {
					posx = e.pageX;
					posy = e.pageY;
				}
				else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				return { x : posx, y : posy }
			}

			// Effect 1
			class HoverImgFx1 {
				constructor(el) {
					this.DOM = {el: el};
					this.DOM.reveal = document.createElement('div');
					this.DOM.reveal.className = 'hover-reveal';
					this.DOM.reveal.innerHTML = `<div class="hover-reveal__inner"><div class="hover-reveal__img" style="background-image:url(${this.DOM.el.dataset.img})"></div></div>`;
					this.DOM.el.appendChild(this.DOM.reveal);
					this.DOM.revealInner = this.DOM.reveal.querySelector('.hover-reveal__inner');
					this.DOM.revealInner.style.overflow = 'hidden';
					this.DOM.revealImg = this.DOM.revealInner.querySelector('.hover-reveal__img');

					this.initEvents();
				}
				initEvents() {

					this.positionElement = (ev) => {
						const mousePos = getMousePos(ev);
						if ($("body").hasClass("smooth-scroll")) {
							const docScrolls = {
								left : document.body.scrollLeft + document.documentElement.scrollLeft,
								top : - scrollbar.scrollTop
							};
							gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
						} else {
							const docScrolls = {
								left : document.body.scrollLeft + document.documentElement.scrollLeft,
								top : document.body.scrollTop + document.documentElement.scrollTop
							};
							gsap.to($('.hover-reveal'), { duration: 1, top: `${mousePos.y+40-docScrolls.top}px`, left: `${mousePos.x+10-docScrolls.left}px`, ease:Power4.easeOut });
						}

					};
					this.mouseenterFn = (ev) => {
						this.positionElement(ev);
						this.showImage();
					};
					this.mousemoveFn = ev => requestAnimationFrame(() => {
						this.positionElement(ev);
					});
					this.mouseleaveFn = () => {
						this.hideImage();
					};

					this.DOM.el.addEventListener('mouseenter', this.mouseenterFn);
					this.DOM.el.addEventListener('mousemove', this.mousemoveFn);
					this.DOM.el.addEventListener('mouseleave', this.mouseleaveFn);
				}
				showImage() {
					TweenMax.killTweensOf(this.DOM.revealInner);
					TweenMax.killTweensOf(this.DOM.revealImg);

					this.tl = new TimelineMax({
						onStart: () => {
							this.DOM.reveal.style.opacity = 1;
							TweenMax.set(this.DOM.el, {zIndex: 1000});
						}
					})
					.add('begin')
					.add(new TweenMax(this.DOM.revealInner, 0.3, {
						ease: Sine.easeOut,
						startAt: {x: '-100%'},
						x: '0%'
					}), 'begin')
					.add(new TweenMax(this.DOM.revealImg, 0.3, {
						ease: Sine.easeOut,
						startAt: {x: '100%'},
						x: '0%'
					}), 'begin');
				}
				hideImage() {
					TweenMax.killTweensOf(this.DOM.revealInner);
					TweenMax.killTweensOf(this.DOM.revealImg);

					this.tl = new TimelineMax({
						onStart: () => {
							TweenMax.set(this.DOM.el, {zIndex: 999});
						},
						onComplete: () => {
							TweenMax.set(this.DOM.el, {zIndex: ''});
							TweenMax.set(this.DOM.reveal, {opacity: 0});
						}
					})
					.add('begin')
					.add(new TweenMax(this.DOM.revealInner, 0.3, {
						ease: Sine.easeOut,
						x: '100%'
					}), 'begin')

					.add(new TweenMax(this.DOM.revealImg, 0.3, {
						ease: Sine.easeOut,
						x: '-100%'
					}), 'begin');
				}
			}

			Array.from(document.querySelectorAll('[data-fx="1"] > li, li[data-fx="1"]')).forEach(link => new HoverImgFx1(link));

		}


	}//End Shortcodes




/*--------------------------------------------------
Function Sliders
---------------------------------------------------*/

	function Sliders() {

		setTimeout( function(){

			if( $('.content-slider').length > 0 ){

				var interleaveOffset = 0.4;

				var ContentSliderOptions = {
					direction: 'horizontal',
					loop: true,
					slidesPerView: 1,
					paginationClickable: true,
					spaceBetween: 0,
					mousewheelControl: false,
					simulateTouch: false,
					speed: 1000,
					navigation: {
						nextEl: '.slider-button-next',
						prevEl: '.slider-button-prev',
					},
				}

				var swiper = new Swiper(".content-slider", ContentSliderOptions);

				$(".slider-button-prev").mouseenter(function(e) {
					if ($(this).parent().hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
					} else if ($(this).parent().hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
					}
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-left"></i>' );
				});

				$(".slider-button-prev").mouseleave(function(e) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
					$("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
				});

				$(".slider-button-next").mouseenter(function(e) {
					if ($(this).parent().hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
					} else if ($(this).parent().hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
					}
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
					$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-chevron-right"></i>' );
				});

				$(".slider-button-next").mouseleave(function(e) {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
					$("#ball").removeClass("with-icon");
					$('#ball i').remove();
					$("body").removeClass("drag-cursor-black").removeClass("drag-cursor-white");
				});

			}


			if( $('.content-carousel').length > 0 ){

				$('body').waitForImages({
					finished: function() {

						var ContentCarouselOptions = {
							direction: 'horizontal',
							simulateTouch: true,
							slidesPerView: 'auto',
							spaceBetween: 0,
							mousewheelControl: false,
							speed: 700,
							pagination: {
				  				el: '.swiper-pagination',
								clickable: true,
								renderBullet: function (index, className) {
					  			return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
									'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
									'</svg></div></div></span>';
								},
							}
						}

						var swiper = new Swiper(".content-carousel", ContentCarouselOptions);

					},
					waitForAll: true
				});


				$('.content-carousel .swiper-wrapper').on('mousedown touchstart', function() {
					gsap.to($(this).find('.swiper-slide img'), {duration: 0.7, scale: 0.9});
					$("body").addClass("drag-cursor");
				});

				$('body').on('mouseup touchend', function() {
					gsap.to('.swiper-slide img', {duration: 0.7, scale:1});
					$("body").removeClass("drag-cursor");
				});

				$('.content-carousel .swiper-wrapper').on('mouseenter mousemove', function() {
					$("body" ).addClass("scale-drag-x");
					if ($(this).parent().hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
					} else if ($(this).parent().hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
					}
				});

				$('.content-carousel .swiper-wrapper').on('mouseleave', function() {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
				});

				$("body").mouseleave(function(e) {
					gsap.to('.swiper-slide img', {duration: 0.7, scale:1});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
				});

			}


			if( $('.content-looped-carousel').length > 0 ){

				$('body').waitForImages({
					finished: function() {

						var ContentLoopedCarouselOptions = {
							direction: 'horizontal',
							simulateTouch: true,
							slidesPerView: 'auto',
							spaceBetween: 0,
							centeredSlides: true,
							loop:true,
							mousewheelControl: false,
							speed: 700,
							pagination: {
				  				el: '.swiper-pagination',
								clickable: true,
								renderBullet: function (index, className) {
					  			return '<span class="' + className + '">'+'<div class="parallax-wrap">' + '<div class="parallax-element">' + '<svg class="fp-arc-loader" width="20" height="20" viewBox="0 0 20 20">'+
									'<circle class="path" cx="10" cy="10" r="5.5" fill="none" transform="rotate(-90 10 10)"'+
									'stroke-opacity="1" stroke-width="2px"></circle>'+
									'<circle class="solid-fill" cx="10" cy="10" r="3"></circle>'+
									'</svg></div></div></span>';
								},
							}
						}

						var swiper = new Swiper(".content-looped-carousel", ContentLoopedCarouselOptions);

					},
					waitForAll: true
				});

				$('.content-looped-carousel .swiper-wrapper').on('mousedown touchstart', function() {
					gsap.to($(this).find('.swiper-slide img'), {duration: 0.5, scale: 0.95});
					$("body").addClass("drag-cursor");

				});

				$('body').on('mouseup touchend', function() {
					gsap.to('.swiper-slide img', {duration: 0.7, scale:1});
					$("body").removeClass("drag-cursor");
				});

				$('.content-looped-carousel .swiper-wrapper').on('mouseenter mousemove', function() {
					$("body" ).addClass("scale-drag-x");
					if ($(this).parent().hasClass("light-cursor")) {
						$("body").addClass("drag-cursor-white");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff'});
					} else if ($(this).parent().hasClass("dark-cursor")) {
						$("body").addClass("drag-cursor-black");
						gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#000'});
					}
				});

				$('.content-looped-carousel .swiper-wrapper').on('mouseleave', function() {
					gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
				});

				$("body").mouseleave(function(e) {
					gsap.to('.swiper-slide img', {duration: 0.7, scale:1});
					$("body").removeClass("scale-drag-x").removeClass("drag-cursor").removeClass("drag-cursor-white").removeClass("drag-cursor-black");
				});

			}

		} , 400 );


	}//End Sliders


/*--------------------------------------------------
Function Justified Grid
---------------------------------------------------*/

	function JustifiedGrid() {

		if( $('#justified-grid').length > 0 ){

			$('#justified-grid').justifiedGallery({
				rowHeight : 360,
				lastRow : 'nojustify',
				margins : 10
			});

		}

	}//End Justified Grid


/*--------------------------------------------------
Function Lightbox
---------------------------------------------------*/

	function Lightbox() {

		$('.image-link').magnificPopup({
		  	type: 'image',
			mainClass: 'mfp-with-zoom',
			gallery: {
			  enabled:true
			},
			zoom: {
				enabled: true,
				duration: 300,
				easing: 'ease-in-out',
				opener: function(openerElement) {
					return openerElement.is('img') ? openerElement : openerElement.find('img');
				}
			}
		});

		$(".image-link").mouseenter(function(e) {
			gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '2px', top: 2, left: 2});
			$( "#ball" ).addClass("with-icon").append( '<i class="fa fa-plus"></i>' );
		});

		$(".image-link").mouseleave(function(e) {
			gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
			gsap.to('#ball-loader', {duration: 0.2, borderWidth: '4px', top: 0, left: 0});
			$("#ball").removeClass("with-icon");
			$('#ball i').remove();
		});

	}//End Lightbox


/*--------------------------------------------------
Function Contact Formular
---------------------------------------------------*/

	function ContactForm() {

		if( $('#contact-formular').length > 0 ){

			$('#contactform').submit(function(){
				var action = $(this).attr('action');
				$("#message").slideUp(750,function() {
					$('#message').hide();
					$('#submit').attr('disabled','disabled');
					$.post(action, {
						name: $('#name').val(),
						email: $('#email').val(),
						comments: $('#comments').val()
					},
					function(data){
						document.getElementById('message').innerHTML = data;
						$('#message').slideDown('slow');
						$('#contactform img.loader').fadeOut('slow',function(){$(this).remove()});
						$('#submit').removeAttr('disabled');
						if(data.match('success') != null) $('#contactform').slideUp('slow');
					}
				);
				});
				return false;
			});
		}





	}//End ContactForm


/*--------------------------------------------------
Function Page PlayVideo
---------------------------------------------------*/

	function PlayVideo() {

		if( $('.video-wrapper').length > 0 ){


			$(".video-wrapper").mouseenter(function(e) {
				if ($(this).hasClass("play")) {
					$( "#ball" ).addClass("pause-movie")
				}
				gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
				$( "#ball" ).addClass("over-movie").append( '<i class="fa fa-play"></i><i class="fa fa-pause"></i>' );
			});

			$(".video-wrapper").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '4px', scale:0.5, borderColor:'#999999',});
				$("#ball").removeClass("over-movie").removeClass("pause-movie");
				$('#ball i').remove();
			});

			$(".video-wrapper .control").mouseenter(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '20px', scale: 0});
			});

			$(".video-wrapper .control").mouseleave(function(e) {
				gsap.to('#ball', {duration: 0.2, borderWidth: '2px', scale: 1, borderColor:'#fff',});
			});

			var videocenter = ($(window).height() - $('.video-cover').height()) / 2

			////////////////////////////////////////////////////// REFACTOR //////////////////////////////////////////////////////
			// plays or pause the video function of its current state
			var playpause = function( videoObj ) {

				if( videoObj[0] != null ){
					if(videoObj[0].paused || videoObj[0].ended) {

						videoObj.parent().addClass('play');
						videoObj[0].play();
					}
					else {

						videoObj.parent().removeClass('play');
						videoObj[0].pause();
					}
				}
			};

			//Time format converter - 00:00
			var timeFormat = function(seconds){
				var m = Math.floor(seconds/60)<10 ? "0"+Math.floor(seconds/60) : Math.floor(seconds/60);
				var s = Math.floor(seconds-(m*60))<10 ? "0"+Math.floor(seconds-(m*60)) : Math.floor(seconds-(m*60));
				return m+":"+s;
			};

			// Events
			// click to video cover - will start the video
			$('.video-wrapper').on('click', function() {

				$('html,body').animate({scrollTop: $(this).offset().top - videocenter},390);
				// hide the video cover in order to start playing
				$(this).find('.video-cover').addClass('hidden');

				$( "#ball" ).toggleClass("pause-movie");

				// pause first the other videos
				var current_wrapper = $(this);
				$('#main-page-content').find('.video-wrapper').each(function() {

					if( !current_wrapper.is( $(this) ) ){

						$(this).removeClass('play');
						$(this).find('video').each(function() {

							if( !$(this).get(0).paused && !$(this).get(0).ended ) {

								$(this).get(0).pause();
							}
						});
					}

				});

				// trigger the click for the inner video
				$(this).find('video').each(function() {

					playpause( $(this) );
				});

			});

			//fullscreen button clicked
			$('.btnFS').on('click', function( e ) {

				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');

				if($.isFunction(video_object[0].webkitEnterFullscreen)) {
					video_object[0].webkitEnterFullscreen();
				}
				else if ($.isFunction(video_object[0].mozRequestFullScreen)) {
					video_object[0].mozRequestFullScreen();
				}
				else {
					alert('Your browsers doesn\'t support fullscreen');
				}


				// prevent video wrapper div responding the event
				e.stopPropagation();

			});

			//sound button clicked
			$('.sound').on('click', function( e ) {

				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');

				video_object[0].muted = !video_object[0].muted;
				$(this).toggleClass('muted');
				if(video_object[0].muted) {
					parent_wrapper.find('.volumeBar').css('width',0);
				}
				else{
					parent_wrapper.find('.volumeBar').css('width', video_object[0].volume*100+'%');
				}

				// prevent video wrapper div responding the event
				e.stopPropagation();
			});

			//progress bar (video timebar) clicked
			$('.progress').on('click', function( e ) {

				var parent_wrapper	= $(this).closest('.video-wrapper');
				var video_object 		= parent_wrapper.find('video');

				// calculate click position
				// and update video current time
				// as well as progress bar
				var maxduration 	= video_object[0].duration;
				var position 			= e.pageX - $(this).offset().left;
				var percentage 	= 100 * position / $(this).width();
				if(percentage > 100) {

					percentage = 100;
				}
				if(percentage < 0) {

					percentage = 0;
				}
				$('.timeBar').css('width', percentage+'%');
				video_object[0].currentTime = maxduration * percentage / 100;

				// prevent video wrapper div responding the event
				e.stopPropagation();
			});

			$('#main-page-content').find('video').each(function() {

				var video = $(this);
				var video_wrapper = $(this).parent();

				//remove default control when JS loaded
				video[0].removeAttribute("controls");
				video_wrapper.find('.control').fadeIn(500);
				video_wrapper.find('.caption').fadeIn(500);

				//before everything get started and we have the info about the video such as duration
				video.on('loadedmetadata', function() {

					var video_object = $(this);
					var parent_wrapper = $(this).parent();
					//set video properties
					parent_wrapper.find('.current').text(timeFormat(0));
					parent_wrapper.find('.duration').text(timeFormat(video[0].duration));

				});

				//display current video buffered progress
				video.on('progress', function() {

					var video_object 		= $(this);
					var parent_wrapper 	= $(this).parent();
					var maxduration 		= video_object [0].duration;

					if (maxduration > 0) {
					  for (var i = 0; i < video_object [0].buffered.length; i++) {
							if (video_object [0].buffered.start(video_object [0].buffered.length - 1 - i) <video_object [0].currentTime) {
								var perc = (video_object [0].buffered.end(video_object [0].buffered.length - 1 - i) / maxduration) * 100 + "%";
								parent_wrapper.find('.bufferBar').css('width',perc+'%');
								break;
							}
						}
					}

				});

				//display current video play time
				video.on('timeupdate', function() {

					var parent_wrapper 	= $(this).parent();
					var currentPos 			= $(this).get(0).currentTime;
					var maxduration 		= $(this).get(0).duration;
					var perc 					= 100 * currentPos / maxduration;
					parent_wrapper.find('.timeBar').css('width',perc+'%');
					parent_wrapper.find('.current').text(timeFormat(currentPos));
				});

				//video screen and play button clicked
				video.on('click', function() {

					playpause( $(this) );
				});

				//video canplay event
				video.on('canplay', function() {

					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeOut(100); //?
				});

				//video canplaythrough event
				//solve Chrome cache issue
				var completeloaded = false;
				video.on('canplaythrough', function() {

					completeloaded = true;
				});

				//video ended event
				video.on('ended', function() {

					$(this).get(0).pause();
					$(this).parent().removeClass("play");
					$( "#ball" ).toggleClass("pause-movie");
				});

				//video seeking event
				video.on('seeking', function() {

					//if video fully loaded, ignore loading screen
					if(!completeloaded) {
						var parent_wrapper = $(this).parent();
						parent_wrapper.find('.loading').fadeIn(200); //?
					}
				});

				//video seeked event
				video.on('seeked', function() { });

				//video waiting for more data event
				video.on('waiting', function() {

					var parent_wrapper = $(this).parent();
					parent_wrapper.find('.loading').fadeIn(200); //?
				});

			});

		}

	}// End PlayVideo

/*--------------------------------------------------
Function Load Via Ajax
---------------------------------------------------*/





function LoadViaAjax() {

		FirstLoad();
		ScrollEffects();
		PageLoadActions();
		Showcase();
		ShowcaseWebglCore();
		FloatingLists();
		LazyLoad();
		Portfolio();
		FitThumbScreen();
		Shortcodes();
		Sliders();
		JustifiedGrid();
		Lightbox();
		PlayVideo();
		ContactForm();
		ContactMap();

	}//End Load Via Ajax
	/*--------------------------------------------------
Function Contact Map
---------------------------------------------------*/

	function ContactMap() {

		if( jQuery('#map_canvas').length > 0 ){
			var latlng = new google.maps.LatLng(43.270441,6.640888);
			var settings = {
				zoom: 14,
				center: new google.maps.LatLng(43.270441,6.640888),
				mapTypeControl: false,
				scrollwheel: false,
				draggable: true,
				panControl:false,
				scaleControl: false,
				zoomControl: false,
				streetViewControl:false,
				navigationControl: false};
				var newstyle = [
				{
					"featureType": "all",
					"elementType": "labels.text.fill",
					"stylers": [
						{
							"saturation": 36
						},
						{
							"color": "#000000"
						},
						{
							"lightness": 40
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.text.stroke",
					"stylers": [
						{
							"visibility": "on"
						},
						{
							"color": "#000000"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "all",
					"elementType": "labels.icon",
					"stylers": [
						{
							"visibility": "off"
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "administrative",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						},
						{
							"weight": 1.2
						}
					]
				},
				{
					"featureType": "landscape",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 20
						}
					]
				},
				{
					"featureType": "poi",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 21
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.fill",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						}
					]
				},
				{
					"featureType": "road.highway",
					"elementType": "geometry.stroke",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 29
						},
						{
							"weight": 0.2
						}
					]
				},
				{
					"featureType": "road.arterial",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 18
						}
					]
				},
				{
					"featureType": "road.local",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 16
						}
					]
				},
				{
					"featureType": "transit",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 19
						}
					]
				},
				{
					"featureType": "water",
					"elementType": "geometry",
					"stylers": [
						{
							"color": "#000000"
						},
						{
							"lightness": 17
						}
					]
				}
			];
			var mapOptions = {
				styles: newstyle,
				mapTypeControlOptions: {
					 mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'holver']
				}
			};
			var map = new google.maps.Map(document.getElementById("map_canvas"), settings);
			var mapType = new google.maps.StyledMapType(newstyle, { name:"Grayscale" });
				map.mapTypes.set('holver', mapType);
				map.setMapTypeId('holver');


			google.maps.event.addDomListener(window, "resize", function() {
				var center = map.getCenter();
				google.maps.event.trigger(map, "resize");
				map.setCenter(center);
			});
			var contentString = '<div id="content-map-marker" style="text-align:center; padding-top:10px; padding-left:10px">'+
				'<div id="siteNotice">'+
				'</div>'+
				'<h4 id="firstHeading" class="firstHeading" style="color:#000!important; font-weight:600; margin-bottom:0px;">Hello Friend!</h4>'+
				'<div id="bodyContent">'+
				'<p color:#999; font-size:14px; margin-bottom:10px">Here we are. Come to drink a coffee!</p>'+
				'</div>'+
				'</div>';
			var infowindow = new google.maps.InfoWindow({
				content: contentString
			});
			var companyImage = new google.maps.MarkerImage('images/marker.png',
				new google.maps.Size(58,63),<!-- Width and height of the marker -->
				new google.maps.Point(0,0),
				new google.maps.Point(35,20)<!-- Position of the marker -->
			);
			var companyPos = new google.maps.LatLng(43.270441,6.640888);
			var companyMarker = new google.maps.Marker({
				position: companyPos,
				map: map,
				icon: companyImage,
				title:"Our Office",
				zIndex: 3});
			google.maps.event.addListener(companyMarker, 'click', function() {
				infowindow.open(map,companyMarker);
			});
		}

		return false

	}//End ContactMap
