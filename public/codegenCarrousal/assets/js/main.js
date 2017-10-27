/*==================================================================
Project:     Multiple Carousel
Version:     1.0
Last change: 17/Oct/16
Description: Multiple Carousel optimizes your layout by showing until four different content types organized in a single compact carousel.
Author:      Webdesign Trade
Author URI:  http://webdesigntrade.net
====================================================================*/
/*jshint esversion: 6 */
(function(factory) {
    'use strict';
    if(typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if(typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    function isMobile(){
        var isMobile = ('ontouchstart' in document.documentElement || navigator.userAgent.match(/Mobi/)?true:false);
        return isMobile;
    }
    function generateCarousel(elementClass,invertAlignment){
        if(typeof invertAlignment === "undefined"){
            invertAlignment = false;
        }
        var slidesToShowQt = 12;
        if(elementClass.indexOf("-2") !== -1)
        slidesToShowQt = 6;
        if(elementClass.indexOf("-3") !== -1)
        slidesToShowQt = 5;
        if(elementClass.indexOf("-4") !== -1)
        slidesToShowQt = 4;
        $(elementClass).multiple({
            infinite: true,
            centermode: true,
            slidesToShow: slidesToShowQt,
            slidesToScroll: 1,
            dots: false,
            variableWidth: true,
            draggable: false,
            rtl: invertAlignment,
            arrows: true
        });
    	setTimeout(function(){
    		bindDrag();
    	},500);
    }
    function bindDrag(){
    	$('.m-track').each(function(){
    		var _ = $(this);
    		_.draggable({
    			revert: function (event, ui) {
    				// reverting
    				return true;
    			},
    			revertDuration: 500,
    			drag: function(event, ui) {
    				if(Math.abs(ui.originalPosition.left-ui.position.left)>=30){
    					_.trigger( 'mouseup' );
    					if(ui.originalPosition.left > ui.position.left ?  'l' : 'r' ==='l'){
    						if(_.parent().parent().attr("dir")==="rtl")
    						_.parent().parent().parent().parent().find('.m-nav .up').click();
    						else
    						_.parent().parent().parent().parent().find('.m-nav .down').click();
    					}
    					else{
    						if(_.parent().parent().attr("dir")==="rtl")
    						_.parent().parent().parent().parent().find('.m-nav .down').click();
    						else
    						_.parent().parent().parent().parent().find('.m-nav .up').click();
    					}
    				}
    			},
    			axis: "x",
    			distance: 10
    		});
    	});
    }
    var gnStartX = 0;
    var gnEndX = 0;

    function centralizeMonoSliders(){
        //TO DOUBLE CENTRALIZED
        $(".multiple").each(function(){
            var _ = $(this);
            if($(window).width() > _.find(".m-1-1 .m-item").first().width() + 10) {
                var dDistance = 0;
                var recipientL = _.find(".m-1-1").width();
                var mItemW = _.find(".m-1-1 .m-item").first().width()+8;

                while(recipientL>mItemW){
                    recipientL -= mItemW;
                }
                while(recipientL<0){
                    recipientL += mItemW;
                }

                dDistance = recipientL/2 +2;

                _.find(".m-1-1 .m-list").css({left:dDistance-mItemW});
            }
        });
    }
    function centralizeDoubleSliders(){
        var dDistance;
        var recipientL;
        var tempL;
        var baseL;
        var basedDistance;
        $(".multiple").each(function(){
            var _ = $(this);
            var mItemW = _.find(".m-1-2 .m-item").width()+4;
            if($(window).width() > 10) {
                dDistance = 0;

                if(_.hasClass("m-2c")){
                recipientL = _.find(".m-1-2").width();
                tempL = recipientL;
                baseL = 708 + _.find(".m-1-2 .m-item").first().width() - 247;
                basedDistance = 35 + _.find(".m-1-2 .m-item").first().width() - 237;

                dDistance = ((baseL - tempL)/2) + basedDistance;

                while(dDistance>mItemW){
                    dDistance -= mItemW;
                }
                while(dDistance<0){
                    dDistance += mItemW;
                }
                _.find(".m-1-2 .m-list").css({left:dDistance-8});
                _.find(".m-2-2 .m-list").css({right:dDistance-8});
                }

            }
            if(_.width() <= _.find(".m-item").first().width()*2 + 60) {
                dDistance = 0;
                recipientL = _.find(".m-1-2").width();
                tempL = recipientL;
                baseL = 708 + _.find(".m-1-2 .m-item").first().width() - 247;
                basedDistance = 35 + _.find(".m-1-2 .m-item").first().width() - 247;
                mItemW = _.find(".m-1-2 .m-item").first().width()+4;

                dDistance = ((baseL - tempL)/2) + basedDistance;

                while(dDistance>mItemW){
                    dDistance -= mItemW;
                }
                while(dDistance<0){
                    dDistance += mItemW;
                }
                _.find(".m-1-2 .m-list").css({left:dDistance-8});
                _.find(".m-2-2 .m-list").css({right:dDistance-8});
            }
        });
    }
    function centralizeTripleSliders(){
        //TO TRIPLE CENTRALIZED
        if($(window).width() > 10) {
            var dDistance = 0;
            var recipientL = $(".m-1-3").width();
            var tempL = recipientL;
            var baseL = 482 + $(".m-1-3 .m-item").first().width() - 247;
            var basedDistance = 140 + $(".m-1-3 .m-item").first().width() - 247;
            var mItemW = $(".m-1-3 .m-item").first().width()+4;

            dDistance = ((baseL - tempL)/2) + basedDistance;

            while(dDistance>mItemW){
                dDistance -= mItemW;
            }
            while(dDistance<0){
                dDistance += mItemW;
            }

            $(".m-1-3 .m-list").css({right:dDistance});
            $(".m-2-3 .m-list").css({right:dDistance});
            $(".m-3-3 .m-list").css({right:dDistance});
        }
    }
    function centralizeQuadrupleSliders(){
        //TO TRIPLE CENTRALIZED
        if($(window).width() > 10) {
            var dDistance = 0;
            var recipientL = $(".m-1-4").width();
            var tempL = recipientL;
            var baseL = 358 + $(".m-1-4 .m-item").first().width() - 247;
            var basedDistance = 201 + $(".m-1-4 .m-item").first().width() - 247;
            var mItemW = $(".m-1-4 .m-item").first().width()+4;

            dDistance = ((baseL - tempL)/2) + basedDistance;

            while(dDistance>mItemW){
                dDistance -= mItemW;
            }
            while(dDistance<0){
                dDistance += mItemW;
            }

            $(".m-1-4 .m-list").css({right:dDistance});
            $(".m-2-4 .m-list").css({right:dDistance});
            $(".m-3-4 .m-list").css({right:dDistance});
            $(".m-4-4 .m-list").css({right:dDistance});
        }
    }
    function hideItem(mCarousel,time){
        if(typeof time === "undefined")
        time = 1000;
        if(mCarousel.parent().parent().hasClass("m-reponsive-except")){
            mCarousel.find(".m-click-mask").css({display:"block"});
            mCarousel.find(".m-item").addClass("m-ocult").css({zIndex:10,opacity:0.5});
        }
        else{
            mCarousel.find(".m-click-mask").css({display:"none"});
        }
    }
    function showItem(thisItem){
        var singleCarouselWidth = thisItem.parent().parent().parent().parent().width();
        var mCarousel = thisItem.parent().parent().parent().parent().parent().parent();
        thisItem.css({zIndex:1005});
        if(mCarousel.hasClass("m-reponsive-except")){
            if(!isMobile()){
                thisItem.removeClass("m-ocult").stop().animate({opacity:1});
                if(singleCarouselWidth>(thisItem.width()*5)){
                    thisItem.prev().prev().removeClass("m-ocult").css({zIndex:1005}).stop().animate({opacity:1});
                    thisItem.prev().removeClass("m-ocult").css({zIndex:1005}).stop().animate({opacity:1});
                    thisItem.next().removeClass("m-ocult").css({zIndex:1005}).stop().animate({opacity:1});
                    thisItem.next().next().removeClass("m-ocult").css({zIndex:1005}).stop().animate({opacity:1});
                }else if(singleCarouselWidth>(thisItem.width()*3)){
                    thisItem.prev().removeClass("m-ocult").css({zIndex:1005}).stop().animate({opacity:1});
                    thisItem.next().removeClass("m-ocult").css({zIndex:1005}).stop().animate({opacity:1});
                }
            }else{
                thisItem.removeClass("m-ocult").css({opacity:1});
                if(singleCarouselWidth>(thisItem.width()*5)){
                    thisItem.prev().prev().removeClass("m-ocult").css({zIndex:1005,opacity:1});
                    thisItem.prev().removeClass("m-ocult").css({zIndex:1005,opacity:1});
                    thisItem.next().removeClass("m-ocult").css({zIndex:100,opacity:1});
                    thisItem.next().next().removeClass("m-ocult").css({zIndex:1005,opacity:1});
                }else if(singleCarouselWidth>(thisItem.width()*3)){
                    thisItem.prev().removeClass("m-ocult").css({zIndex:1005,opacity:1});
                    thisItem.next().removeClass("m-ocult").css({zIndex:1005,opacity:1});
                }
            }
        }
    }
    function showAllCentralItems(){
        $('.multiple').find('.m-nav .down').click();
        setTimeout(function(){
            $('.m-2c,.m-triple,.m-quadruple').each(function(){
                $(this).find(".m-content ").each(function(){
                    var mCarousel = $(this);
                    var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
                    var centralItem;
                    mCarousel.find(".m-item").each(function(){
                        var thisItem = $(this);
                        var mItemXPosition = thisItem.offset().left + (thisItem.width()/2);
                        var xDiference = mCarouselCenter - mItemXPosition;
                        var checkRTL = mCarousel.find(".m-block").attr("dir");
                        hideItem(mCarousel,1);
                        if(xDiference > -25 && xDiference <25){
                            setTimeout(function(){
                                showItem(thisItem);
                            },300);
                        }
                    });
                });
            });
        },300);
    }
    var enabledMaskClick;
    function opacityAllItems(currentCarousel){
    	enabledMaskClick = 0;
        if(typeof currentCarousel=== "undefined"){
            $(".m-2c,.m-triple,.m-quadruple").each(function(){
                $(this).find(".m-content ").each(function(){
                    var mCarousel = $(this);
                    var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
                    var centralItem;
                    mCarousel.find(".m-item").each(function(){
                        var thisItem = $(this);
                        var mItemXPosition = thisItem.offset().left + (thisItem.width()/2);
                        var xDiference = mCarouselCenter - mItemXPosition;
                        var checkRTL = mCarousel.find(".m-block").attr("dir");
                        if(xDiference > -25 && xDiference <25){
                            hideItem(mCarousel);
                        }
                    });
                });
            });
        }else{
            var mCarousel = currentCarousel;
            if(!mCarousel.parent().parent().hasClass("m-2d")&&!mCarousel.parent().parent().hasClass("m-mono")){
                var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
                var centralItem;
                mCarousel.find(".m-item").each(function(){
                    var thisItem = $(this);
                    var mItemXPosition = thisItem.offset().left + (thisItem.width()/2);
                    var xDiference = mCarouselCenter - mItemXPosition;
                    var checkRTL = mCarousel.find(".m-block").attr("dir");
                    if(xDiference > -25 && xDiference <25){
                        hideItem(mCarousel);
                    }
                });
            }
        }
    }
    function showCentralItem(currentCarousel){
        if(typeof currentCarousel=== "undefined"){
            $('.m-2c,.m-triple,.m-quadruple').each(function(){
                $(this).find(".m-content ").each(function(){
                    var mCarousel = $(this);
                    var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
                    var centralItem;
                    mCarousel.find(".m-item").each(function(){
                        var thisItem = $(this);
                        var mItemXPosition = thisItem.offset().left + (thisItem.width()/2);
                        var xDiference = mCarouselCenter - mItemXPosition;
                        var checkRTL = mCarousel.find(".m-block").attr("dir");
                        if(xDiference > -25 && xDiference <25){
                            showItem(thisItem);
    						enabledMaskClick = 1;
                        }
                    });
                });
            });
        }else{
            var mCarousel = currentCarousel;
            if(!mCarousel.parent().parent().hasClass("m-2d")&&!mCarousel.parent().parent().hasClass("m-mono")){
                var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
                var centralItem;
                mCarousel.find(".m-item").each(function(){
                    var thisItem = $(this);
                    var mItemXPosition = thisItem.offset().left + (thisItem.width()/2);
                    var xDiference = mCarouselCenter - mItemXPosition;
                    var checkRTL = mCarousel.find(".m-block").attr("dir");
                    if(xDiference > -25 && xDiference <25){
                        showItem(thisItem);
    					enabledMaskClick = 1;
                    }
                });
            }
        }

    }
    function centralizeAllCarousels(){
        $(".m-2c,.m-triple,.m-quadruple").find(".m-track").append('<div class="m-click-mask"></div>');
        setTimeout(function() {
            $(".m-1-2 .m-img .m-view").attr("dir", "ltr");
            centralizeMonoSliders();
            centralizeDoubleSliders();
            centralizeTripleSliders();
            centralizeQuadrupleSliders();
        }, 10);
        setTimeout(function(){
            showAllCentralItems();
            showCarousel();
        },100);
    }
    function isMyScriptLoaded2(url) {
        if(!url) url = "http://xxx.co.uk/xxx/script.js";
        var scripts = document.getElementsByTagName('link');
        for (var i = scripts.length; i--;) {
            if(scripts[i].href.indexOf(url) !== -1) return true;
        }
        return false;
    }
    function mAlert(){
        $(".m-alert").remove();
        $("body").append('<div class="m-alert">Configure this button on <span>m-init.js</span></div>');
        setTimeout(function(){
            if(!isMobile())
            $(".m-alert").animate({opacity:0});
            else
            $(".m-alert").css({opacity:0});
        },3000);
    }
    $(".multiple:not(.only-excerpt) .m-img .m-view,.portfolio .m-view").css({
        opacity: 0
    });
    //IF FONT AWESOME DON'T EXIST
    if(!isMyScriptLoaded2("awesome")){
        $(".m-footer-link .m-star, .m-footer-link .ribbon-end").remove();
        $(".m-footer-link .m-f-link").css({paddingRight:"5px"});
        $("i.fa").addClass("m-no-aw2");
        $("i.fa-chevron-up").addClass("m-no-aw3");
        $(".m-leftnav i.fa-chevron-up, .m-rightnav i.fa-chevron-up").addClass("m-no-aw4");
        $(".multiple .m-view i").removeClass("m-zoom-out");
        $(".m-view i.fa-share-alt").html("S");
        $(".m-view i.fa-heart-o ").html("F");
        $(".m-view i.fa-search-plus").html("+");
        $(".m-view i.fa-fire").html("H");
        $(".m-view i.fa-flag-o").html("C");
        $("i.fa-chevron-down").html("+");
        $("i.fa-chevron-up").html("-");
        $("i.fa-pause-circle-o").html(">");
        $("i.fa-play-circle-o").html(">");
        $(".multiple .m-view i").addClass("m-no-aw1");
        $(".multiple .m-view").append("<div class='m-no-bo'></div>");
    }

    //IF BOOTSTRAP DON'T EXIST
    $('.multiple .m-view i.m-no-aw1').on({
        'mouseenter': function() {
            if(!isMyScriptLoaded2("bootstrap")){
                $(this).parent().parent().find(".m-no-bo").html( "(" + $(this).attr("title") + ")" );
            }
        },
        'mouseleave': function() {
            if(!isMyScriptLoaded2("bootstrap")){
                $(this).parent().parent().find(".m-no-bo").html("");
            }
        }
    });
    //FIND ALL multiple WITH autoplay
    var setIntervalAutoplayElements = []; //Get .multiple.autplay "this" elements
    var setIntervalAutoplayArray = []; // Get the respective setIntervals
    var autoplayEnabled = 1;
    var pauseAutoplayOnHover = 1;

    function addAutoplayCarousel(jQueryThis){
        if(!jQueryThis.hasClass("m-autoplay")){
            jQueryThis.addClass("m-autoplay");
        }
        setIntervalAutoplayElements.push(jQueryThis.attr("id"));
        jQueryThis.find('.player i').removeClass("fa-play-circle-o");
        jQueryThis.find('.player i').addClass("fa-pause-circle-o");
        var temp = setInterval(function(){
            if(autoplayEnabled){
                if($.fn.visible){
                    if(jQueryThis.find(".m-recipient").visible(true)){
                        jQueryThis.find('.m-nav .down').click();
                        setTimeout(function(){
    						opacityAllItems();
    					},600);
                        setTimeout(function(){
                            showCentralItem();
                        },700);
                    }
                }else{
                    jQueryThis.find('.m-nav .down').click();
                    setTimeout(function(){
                        opacityAllItems();
                    },600);
                    setTimeout(function(){
                        showCentralItem();
                    },700);
                }
            }
        },autoplayInterval);
        setIntervalAutoplayArray.push(temp);
    }
    function removeAutoplayCarousel(jQueryThis){
        if(jQueryThis.hasClass("m-autoplay")){
            jQueryThis.removeClass("m-autoplay");
        }
        var i;
        for(i=0;i<setIntervalAutoplayElements.length;i++){
            if(setIntervalAutoplayElements[i]===jQueryThis.attr("id")){
                clearInterval(setIntervalAutoplayArray[i]);
                setIntervalAutoplayArray.splice(i, 1);
                setIntervalAutoplayElements.splice(i, 1);
                jQueryThis.find('.player i').removeClass("fa-pause-circle-o");
                jQueryThis.find('.player i').addClass("fa-play-circle-o");
                break;
            }
        }
    }
    function cleanAllCarouselAutoplayIntervals(){
        var i;
        for(i=0;i<setIntervalAutoplayElements.length;i++){
            if(setIntervalAutoplayElements.length){
                clearInterval(setIntervalAutoplayArray[i]);
                setIntervalAutoplayArray.splice(i, 1);
                setIntervalAutoplayElements.splice(i, 1);
            }
        }
    }
    function startCarouselsAutoplays(){
        $('.multiple').each(function(){
            var _ = $(this);
            if(!_.attr('id') || _.attr('id')===undefined){
                _.uniqueId();
            }
            if(_.hasClass("m-autoplay")){
                addAutoplayCarousel(_);
            }
        });
    }
    startCarouselsAutoplays();
    // CAROUSEL MANUAL PLAY AND PAUSE
    //IF BOOTSTRAP DON'T EXIST
    $('.player i').on({
        'click': function() {
            if($(this).hasClass("fa-pause-circle-o")){
                removeAutoplayCarousel($(this).parent().parent().parent().parent());
            }
            else if($(this).hasClass("fa-play-circle-o")){
                addAutoplayCarousel($(this).parent().parent().parent().parent());
            }
        }
    });
    $('.multiple .m-content').on({
        'mouseenter': function() {
            if(pauseAutoplayOnHover){
                autoplayEnabled = 0;
                if($(this).parent().parent().hasClass("m-autoplay") && $(this).parent().find(".m-nav .player i").hasClass("fa-pause-circle-o")){
                    $(this).parent().find(".m-nav .player i").removeClass("fa-pause-circle-o");
                    $(this).parent().find(".m-nav .player i").addClass("fa-play-circle-o");
                }
            }
        },
        'mouseleave': function() {
            if(pauseAutoplayOnHover){
                autoplayEnabled = 1;
                if($(this).parent().parent().hasClass("m-autoplay") && $(this).parent().find(".m-nav .player i").hasClass("fa-play-circle-o")){
                    $(this).parent().find(".m-nav .player i").removeClass("fa-play-circle-o");
                    $(this).parent().find(".m-nav .player i").addClass("fa-pause-circle-o");
                }
            }
        },
    });
    $('.multiple .down,.multiple .up').on({
        'click': function(event) {
            if(event.originalEvent === undefined) { //NOT HUMAN, AUTOPLAY
            } else { //HUMAN CLICKED MANUALLY
                setTimeout(function(){
					opacityAllItems();
				},600);
                setTimeout(function(){
                    showCentralItem();
                },700);
                if($(this).parent().parent().parent().hasClass("m-autoplay"))
                removeAutoplayCarousel($(this).parent().parent().parent());
            }
        }
    });
	$(document).keydown(function(e){
		if(e.keyCode === 37) {
			$('.multiple').each(function(){
                if($.fn.visible){
                    if($(this).visible(true)){
    					$(this).find('.m-nav .up').click();
    				}
                }
				else{
					$(this).find('.m-nav .up').click();
				}
			});

		}else if(e.keyCode === 39) {
			$('.multiple').each(function(){
                if($.fn.visible){
                    if($(this).visible(true)){
    					$(this).find('.m-nav .down').click();
    				}
                }
				else{
					$(this).find('.m-nav .down').click();
				}
			});
		}
	});
	$('.m-recipient').bind('DOMMouseScroll mousewheel', function(e){
		if(e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
			$(this).find('.m-nav .down').click();
			return false;
		}
		else{
			$(this).find('.m-nav .up').click();
			return false;
		}
	});

    //INIT ALL MONO CAROUSELS
    generateCarousel('.m-1-1 .m-block');
    //INIT ALL DOUBLE CAROUSELS - Double carousels always need rtl on left carousel!
    generateCarousel('.m-2d .m-1-2 .m-block',true);
    generateCarousel('.m-2d .m-2-2 .m-block');
    //INIT ALL DOUBLE CAROUSELS WITH CENTRALIZED SLIDES - Double carousels always need rtl on left carousel!
    generateCarousel('.m-2c .m-1-2 .m-block',true);
    generateCarousel('.m-2c .m-2-2 .m-block');
    //INIT ALL TRIPLE CAROUSELS
    generateCarousel('.m-1-3 .m-block, .m-2-3 .m-block, .m-3-3 .m-block');
    //INIT ALL QUADRUPLE CAROUSELS
    generateCarousel('.m-1-4 .m-block, .m-2-4 .m-block, .m-3-4 .m-block, .m-4-4 .m-block');

    setTimeout(function() {
        $('.m-block').css({
            width: "100%"
        });
        centralizeAllCarousels();
    }, 100);

    $('.m-icon-icon a').on('mouseenter', function() {
        $(this).parent().parent().parent().find(".m-item-title a").css({
            top: "-1000px"
        });
    });
    $('.m-icon-icon a').on('mouseleave', function() {
        $(this).parent().parent().parent().find(".m-item-title a").css({
            top: "0px"
        });
    });
    $( document ).on('mouseenter', ".m-click-mask", function(e){
        var mCarousel = $(this).parent().parent().parent().parent();
        var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
        if(e.pageX > mCarouselCenter){
            $(this).removeClass("m-left-mouse");
            $(this).removeClass("m-right-mouse");
            $(this).addClass("m-right-mouse");
        }else{
            $(this).removeClass("m-left-mouse");
            $(this).removeClass("m-right-mouse");
            $(this).addClass("m-left-mouse");
        }
    });
    $( document ).on('mouseleave', ".m-click-mask", function(e){
        var mCarousel = $(this).parent().parent().parent().parent();
    });
    $( document ).on('click', ".m-click-mask", function(e){
        var mCarousel = $(this).parent().parent().parent().parent();
        var mCarouselCenter = mCarousel.width()/2 + mCarousel.position().left;
        var checkRTL = mCarousel.find(".m-block").attr("dir");
		if(enabledMaskClick){
			if(e.pageX > mCarouselCenter){
				if(checkRTL)
				mCarousel.find('.m-prev').click();
				else
				mCarousel.find('.m-next').click();
			}else{
				if(checkRTL)
				mCarousel.find('.m-next').click();
				else
				mCarousel.find('.m-prev').click();
			}
		}
    });

    $('.m-nav .up').on('click', function(event){
        $(this).parent().parent().find('.m-prev').trigger('click');
    });

    $('.m-nav .down').on('click', function(event){
        if(event.originalEvent === undefined) {
            //  alert('not human');
            $(this).parent().parent().find('.m-next').trigger('click');
        } else {
            //  alert(' human');
            $(this).parent().parent().find('.m-next').trigger('click');
        }
    });

    $( document ).on('click', ".m-prev,.m-next", function(e){
        var mCarousel = $(this).parent().parent();
        setTimeout(function(){
			opacityAllItems(mCarousel);
		},600);
        setTimeout(function(){
            showCentralItem(mCarousel);
        },700);
    });



    $('.m-content').on({
        mouseenter: function() {
            if($(this).find(".m-click-mask").css("display")==="block"){
                if($(this).parent().parent().hasClass("m-2c")||$(this).parent().parent().hasClass("m-triple")||$(this).parent().parent().hasClass("m-quadruple")){
                    $(this).css({backgroundColor:"#fcf7a7"});
                }
            }else{
                $(this).css({backgroundColor:"transparent"});
            }
        },
        mouseleave: function() {
            if($(this).find(".m-click-mask").css("display")==="block"){
                $(this).css({backgroundColor:"transparent"});
            }
        }
    });

    $('.m-item').on({
        mouseenter: function() {
            var thiss = $(this).find(".m-img");
            thiss.find('.m-view i').css({
                marginTop: "0px"
            });
            thiss.find('.m-view').stop().animate({
                opacity: 1
            }, 200, 'easeOutQuad');
            var $scale = 1.2;
            if(!$(this).find('img').last().data('w')) {
                $(this).find('img').last().data('w', $(this).find('img').last().width())
                    .data('h', $(this).find('img').last().height());
            }
            $(this).find('img').last().stop(true).animate({
                width: $(this).find('img').last().data('w') * $scale,
                height: $(this).find('img').last().data('h') * $scale,
                left: -$(this).find('img').last().data('w') * ($scale - 1) / 2,
                'opacity': '0.2',
                top: -$(this).find('img').last().data('h') * ($scale - 1) / 2
            }, {
                duration: 400,
                queue: false
            });
        },
        mouseleave: function() {
            var thiss = $(this).find(".m-img");
            var mCarousel = $(this).parent().parent().parent().parent().parent();
            if(!thiss.parent().parent().parent().parent().parent().parent().parent().hasClass("only-excerpt")&&!thiss.parent().parent().parent().parent().parent().parent().parent().parent().hasClass("only-excerpt")){
                thiss.find('.m-view').stop().animate({
                    opacity: 0
                }, 1000, 'easeOutQuad');

            }
            $(this).find('img').last().stop(true).animate({
                width: $(this).find('img').last().data('w'),
                height: $(this).find('img').last().data('h'),
                'opacity': '1',
                left: 0,
                top: 0
            }, {
                duration: 400,
                queue: false
            });
        }
    });

    var lastWindowWidth = $(window).width();
    $(window).on('resize', function() {
		//RESET ALL CAROUSELS AND ITS INTERVALS
        var condition = 0;
        if(!isMobile())
        condition = 1;
        else{
            var currentWindowWidth = $(window).width();
            var max = (lastWindowWidth>currentWindowWidth?lastWindowWidth:currentWindowWidth);
            var min = (lastWindowWidth<currentWindowWidth?lastWindowWidth:currentWindowWidth);
            var test = max/min;
            lastWindowWidth = currentWindowWidth;
            if(test>1.35)
            condition = 1;
        }
        if(condition){
            $('.multiple .m-block').multiple('unmultiple');
            checkResponsive();
            //INIT ALL MONO CAROUSELS
            generateCarousel('.m-1-1 .m-block');
            //INIT ALL DOUBLE CAROUSELS - Double carousels always need rtl on left carousel!
            generateCarousel('.m-2d .m-1-2 .m-block',true);
            generateCarousel('.m-2d .m-2-2 .m-block');
            //INIT ALL DOUBLE CAROUSELS WITH CENTRALIZED SLIDES - Double carousels always need rtl on left carousel!
            generateCarousel('.m-2c .m-1-2 .m-block',true);
            generateCarousel('.m-2c .m-2-2 .m-block');
            //INIT ALL TRIPLE CAROUSELS
            generateCarousel('.m-1-3 .m-block, .m-2-3 .m-block, .m-3-3 .m-block');
            //INIT ALL QUADRUPLE CAROUSELS
            generateCarousel('.m-1-4 .m-block, .m-2-4 .m-block, .m-3-4 .m-block, .m-4-4 .m-block');
    		setTimeout(function(){
    			centralizeAllCarousels();
    		},500);
        }
    });

})); /*ready*/
