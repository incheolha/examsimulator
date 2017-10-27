/*==================================================================
Project:     Multiple Carousel
Version:     1.0
Last change: 17/Oct/16
Description: Multiple Carousel optimizes your layout by showing until four different content types organized in a single compact carousel.
Author:      Webdesign Trade
Author URI:  http://webdesigntrade.net
====================================================================*/
function checkResponsive(__){
    'use strict';
    if(typeof __ ==="undefined")
    __ = $(".multiple");
    var responsiveScriptPath = "assets/css/dinamicResponsive/",
    tripleScript = responsiveScriptPath + "responsiveTriple.css",
    currentScript,
    maxWidth = 0;
    setTimeout(function(){
        __.each(function(){
            var _ = $(this),
            itemHeight = _.find(".m-item").first().height()+4,
            itemWidth = _.find(".m-item").first().width();
            if(_.hasClass("m-triple")){
                maxWidth =  itemWidth*3 + 50;
                currentScript = tripleScript;
            }
            if(_.width() <= maxWidth){
                _.removeClass("m-reponsive-except");
                if($("link[href*='"+currentScript+"']").length===0)
               $('head').append('<link rel="stylesheet" type="text/css" href="' + currentScript + '">');
                //RESPONSIVE DIMENSIONS
                _.find(".m-nav").css({height:""});
                if(_.hasClass("m-triple")){
                    _.find(".m-recipient").css({height:(itemHeight*3+18)+"px"});
                    _.find(".m-2-3").css({marginTop:(itemHeight+4)+"px"});
                    _.find(".m-3-3").css({marginTop:(itemHeight*2+8)+"px"});
                }
      
            }else{
                _.addClass("m-reponsive-except");
                $("link[href*='"+currentScript+"']").remove();
                //RESPONSIVE DIMENSIONS
                if(!_.hasClass("m-topnav")&&!_.hasClass("m-bottomnav")){
                    _.find(".m-recipient").css({height:(itemHeight+8)+"px"});
                    if(_.hasClass("m-mono")||_.hasClass("m-double")){
                        if(_.hasClass("m-leftnav")||_.hasClass("m-rightnav")){
                            _.find(".m-nav").css({height:(itemHeight+12)+"px"});
                        }else{
                            //DOUBLE/MIDDLE
                            _.find(".m-nav").css({height:(itemHeight-4)+"px"});
                        }
                    }
                }else{
                    _.find(".m-recipient").css({height:(itemHeight+52)+"px"});
                    _.find(".m-nav").css({height:""});
                }
            }

        });
    },500);
}
function showCarousel(){
    'use strict';
	$(".multiple").each(function(){
		var _ = $(this);
		_.css("background-image","url()");
		_.find(".m-content, .m-nav").show();
		_.find(".m-recipient,.m-bg-shadow").css({opacity:0});
		_.find(".m-recipient,.m-bg-image,.m-bg-color,.m-bg-shadow,.m-carousel-titles").css({top:0});
		_.find(".m-recipient,.m-bg-shadow").animate({opacity:1},{duration:2000});
	});
}
(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($) {
    'use strict';
    var Multiple = window.Multiple || {};
    //Generate hidden multiple HTML Structures
    $(".m-item").children("a.m-icon").each(function(){
        var _ = $(this);
        _.attr({"data-toggle":"tooltip","data-placement":"right"}).html('<i class="fa fa-' + (_.attr("class").replace("m-icon ","").replace(" ","")) + '"></i>').removeAttr("class");
        _.prop('outerHTML','<div class="m-icon"><div class="m-icon-icon">' + _.prop('outerHTML') + '</div></div>');
    });
//    $(".m-item").children("a.m-title").each(function(){
//        var _ = $(this);
//        _.removeAttr("class").prop('outerHTML','<div class="m-item-title">' + _.prop('outerHTML') + '</div>');
 //   });
    $(".m-item").children("a.m-category").each(function(){
        var _ = $(this);
        _.removeAttr("class").prop('outerHTML','<div class="m-item-category">' + _.prop('outerHTML') + '</div>');
    });
    $(".m-item").children(".m-footer-link").each(function(){
        var _ = $(this);
        _.removeAttr("class").prop('outerHTML','<div class="m-footer-link"><div class="m-star"><i class="fa fa-star"></i></div><div class="m-f-link">' + _.prop('outerHTML') + '</div></div>');
    });
    $(".m-item").find("span.m-detail").each(function(){
        var _ = $(this);
        _.prop('outerHTML','<div class="m-detail"><div class="detail">' + _.html() + '</div></div>');
    });
    $(".m-content").each(function(){
        $(this).html('<div class="m-block">' + $(this).html() + '</div>');
    });
    $(".multiple").each(function(){
        var _ = $(this);
        var outerRecipient = '<div class="m-recipient">';
        _.children(".m-content").each(function(){
            outerRecipient += $(this).prop('outerHTML');
        });
        outerRecipient += '</div>';
        _.children(".m-content").remove();
        _.append(outerRecipient);
    });
    $(".multiple").each(function(){
        var _ = $(this);
        var outerTitle = '<div class="m-carousel-titles">';
        _.children("div[class*='m-title-']").each(function(){
            outerTitle += $(this).prop('outerHTML');
        });
        outerTitle += '</div>';
        _.children("div[class*='m-title-']").remove();
        _.prepend(outerTitle);
    });
    $(".m-1-2 .m-block").attr("dir","rtl");
    $(".m-recipient").append('<div class="m-nav"><div class="up"><i class="fa fa-chevron-up"></i></div><div class="player"><i class="fa fa-play-circle-o"></i></div><div class="down"><i class="fa fa-chevron-down"></i></div></div>');

    Multiple = (function() {
        var instanceUid = 0;
        function Multiple(element, settings) {
            var _ = this, dataSettings;
            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button type="button" data-role="none" class="m-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',
                nextArrow: '<button type="button" data-role="none" class="m-next" aria-label="Next" tabindex="0" role="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'm-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };
            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unmultipleed: false
            };
            $.extend(_, _.initials);
            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;
            dataSettings = $(element).data('multiple') || {};
            _.options = $.extend({}, _.defaults, settings, dataSettings);
            _.currentSlide = _.options.initialSlide;
            _.originalSettings = _.options;
            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }
            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);
            _.instanceUid = instanceUid++;
            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
            _.registerBreakpoints();
            _.init(true);
        }
        return Multiple;
    }());
    Multiple.prototype.activateADA = function() {
        var _ = this;
        _.$slideTrack.find('.m-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });
    };
    Multiple.prototype.addSlide = Multiple.prototype.multipleAdd = function(markup, index, addBefore) {
        var _ = this;
        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }
        _.unload();
        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slides.each(function(index, element) {
            $(element).attr('data-m-index', index);
        });
        _.$slidesCache = _.$slides;
        _.reinit();
    };
    Multiple.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };
    Multiple.prototype.animateSlide = function(targetLeft, callback) {
        var animProps = {},
            _ = this;
        _.animateHeight();
        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }
        } else {
            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });
            } else {
                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);
                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);
                if (callback) {
                    setTimeout(function() {
                        _.disableTransition();
                        callback.call();
                    }, _.options.speed);
                }
            }
        }
    };
    Multiple.prototype.getNavTarget = function() {
        var _ = this,
            asNavFor = _.options.asNavFor;
        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }
        return asNavFor;
    };
    Multiple.prototype.asNavFor = function(index) {
        var _ = this,
            asNavFor = _.getNavTarget();
        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).multiple('getMultiple');
                if(!target.unmultipleed) {
                    target.slideHandler(index, true);
                }
            });
        }
    };
    Multiple.prototype.applyTransition = function(slide) {
        var _ = this,
            transition = {};
        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }
        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };
    Multiple.prototype.autoPlay = function() {
        var _ = this;
        _.autoPlayClear();
        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }
    };
    Multiple.prototype.autoPlayClear = function() {
        var _ = this;
        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }
    };
    Multiple.prototype.autoPlayIterator = function() {
        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;
        if ( !_.paused && !_.interrupted && !_.focussed ) {
            if ( _.options.infinite === false ) {
                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }
                else if ( _.direction === 0 ) {
                    slideTo = _.currentSlide - _.options.slidesToScroll;
                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }
                }
            }
            _.slideHandler( slideTo );
        }
    };
    Multiple.prototype.buildArrows = function() {
        var _ = this;
        if (_.options.arrows === true ) {
            _.$prevArrow = $(_.options.prevArrow).addClass('m-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('m-arrow');
            if( _.slideCount > _.options.slidesToShow ) {
                _.$prevArrow.removeClass('m-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('m-hidden').removeAttr('aria-hidden tabindex');
                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }
                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }
                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('m-disabled')
                        .attr('aria-disabled', 'true');
                }
            } else {
                _.$prevArrow.add( _.$nextArrow )
                    .addClass('m-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });
            }
        }
    };
    Multiple.prototype.buildDots = function() {
        var _ = this,
            i, dot;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$slider.addClass('m-dotted');
            dot = $('<ul />').addClass(_.options.dotsClass);
            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }
            _.$dots = dot.appendTo(_.options.appendDots);
            _.$dots.find('li').first().addClass('m-active').attr('aria-hidden', 'false');
        }
    };
    Multiple.prototype.buildOut = function() {
        var _ = this;
        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.m-cloned)')
                .addClass('m-slide');
        _.slideCount = _.$slides.length;
        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-m-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });
        _.$slider.addClass('m-slider');
        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="m-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="m-track"/>').parent();
        _.$list = _.$slideTrack.wrap(
            '<div aria-live="polite" class="m-list"/>').parent();
        _.$slideTrack.css('opacity', 0);
        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }
        $('img[data-lazy]', _.$slider).not('[src]').addClass('m-loading');
        _.setupInfinite();
        _.buildArrows();
        _.buildDots();
        _.updateDots();
        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }
    };
    Multiple.prototype.buildRows = function() {
        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;
        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();
        if(_.options.rows > 1) {
            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );
            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }
            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });
        }
    };
    Multiple.prototype.checkResponsive = function(initial, forceUpdate) {
        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();
        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }
        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {
            targetBreakpoint = null;
            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }
            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unmultiple') {
                            _.unmultiple(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unmultiple') {
                        _.unmultiple(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }
            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }
    };
    Multiple.prototype.changeSlide = function(event, dontAnimate) {
        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;
        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }
        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }
        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;
        switch (event.data.message) {
            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;
            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;
            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;
                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;
            default:
                return;
        }
    };
    Multiple.prototype.checkNavigable = function(index) {
        var _ = this,
            navigables, prevNavigable;
        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }
        return index;
    };
    Multiple.prototype.cleanUpEvents = function() {
        var _ = this;
        if (_.options.dots && _.$dots !== null) {
            $('li', _.$dots)
                .off('click.multiple', _.changeSlide)
                .off('mouseenter.multiple', $.proxy(_.interrupt, _, true))
                .off('mouseleave.multiple', $.proxy(_.interrupt, _, false));
        }
        _.$slider.off('focus.multiple blur.multiple');
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.multiple', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.multiple', _.changeSlide);
        }
        _.$list.off('touchstart.multiple mousedown.multiple', _.swipeHandler);
        _.$list.off('touchmove.multiple mousemove.multiple', _.swipeHandler);
        _.$list.off('touchend.multiple mouseup.multiple', _.swipeHandler);
        _.$list.off('touchcancel.multiple mouseleave.multiple', _.swipeHandler);
        _.$list.off('click.multiple', _.clickHandler);
        $(document).off(_.visibilityChange, _.visibility);
        _.cleanUpSlideEvents();
        if (_.options.accessibility === true) {
            _.$list.off('keydown.multiple', _.keyHandler);
        }
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.multiple', _.selectHandler);
        }
        $(window).off('orientationchange.multiple.m-' + _.instanceUid, _.orientationChange);
        $(window).off('resize.multiple.m-' + _.instanceUid, _.resize);
        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);
        $(window).off('load.multiple.m-' + _.instanceUid, _.setPosition);
        $(document).off('ready.multiple.m-' + _.instanceUid, _.setPosition);
    };
    Multiple.prototype.cleanUpSlideEvents = function() {
        var _ = this;
        _.$list.off('mouseenter.multiple', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.multiple', $.proxy(_.interrupt, _, false));
    };
    Multiple.prototype.cleanUpRows = function() {
        var _ = this, originalSlides;
        if(_.options.rows > 1) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }
    };
    Multiple.prototype.clickHandler = function(event) {
        var _ = this;
        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    Multiple.prototype.destroy = function(refresh) {
        var _ = this;
        _.autoPlayClear();
        _.touchObject = {};
        _.cleanUpEvents();
        $('.m-cloned', _.$slider).detach();
        if (_.$dots) {
            _.$dots.remove();
        }
        if ( _.$prevArrow && _.$prevArrow.length ) {
            _.$prevArrow
                .removeClass('m-disabled m-arrow m-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');
            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }
        if ( _.$nextArrow && _.$nextArrow.length ) {
            _.$nextArrow
                .removeClass('m-disabled m-arrow m-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');
            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }
        if (_.$slides) {
            _.$slides
                .removeClass('m-slide m-active m-center m-visible m-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-m-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });
            _.$slideTrack.children(this.options.slide).detach();
            _.$slideTrack.detach();
            _.$list.detach();
            _.$slider.append(_.$slides);
        }
        _.cleanUpRows();
        _.$slider.removeClass('m-slider');
        _.$slider.removeClass('m-initialized');
        _.$slider.removeClass('m-dotted');
        _.unmultipleed = true;
        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }
    };
    Multiple.prototype.disableTransition = function(slide) {
        var _ = this,
            transition = {};
        transition[_.transitionType] = '';
        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }
    };
    Multiple.prototype.fadeSlide = function(slideIndex, callback) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });
            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });
            if (callback) {
                setTimeout(function() {
                    _.disableTransition(slideIndex);
                    callback.call();
                }, _.options.speed);
            }
        }
    };
    Multiple.prototype.fadeSlideOut = function(slideIndex) {
        var _ = this;
        if (_.cssTransitions === false) {
            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);
        } else {
            _.applyTransition(slideIndex);
            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });
        }
    };
    Multiple.prototype.filterSlides = Multiple.prototype.multipleFilter = function(filter) {
        var _ = this;
        if (filter !== null) {
            _.$slidesCache = _.$slides;
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);
            _.reinit();
        }
    };
    Multiple.prototype.focusHandler = function() {
        var _ = this;
        _.$slider
            .off('focus.multiple blur.multiple')
            .on('focus.multiple blur.multiple',
                '*:not(.m-arrow)', function(event) {
            event.stopImmediatePropagation();
            var $sf = $(this);
            setTimeout(function() {
                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }
            }, 0);
        });
    };
    Multiple.prototype.getCurrent = Multiple.prototype.multipleCurrentSlide = function() {
        var _ = this;
        return _.currentSlide;
    };
    Multiple.prototype.getDotCount = function() {
        var _ = this;
        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;
        if (_.options.infinite === true) {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }
        return pagerQty - 1;
    };
    Multiple.prototype.getLeft = function(slideIndex) {
        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide;
        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);
        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                verticalOffset = (verticalHeight * _.options.slidesToShow) * -1;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }
        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }
        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }
        if (_.options.variableWidth === true) {
            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.m-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.m-slide').eq(slideIndex + _.options.slidesToShow);
            }
            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }
            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.m-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.m-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }
                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }
                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }
        return targetLeft;
    };
    Multiple.prototype.getOption = Multiple.prototype.multipleGetOption = function(option) {
        var _ = this;
        return _.options[option];
    };
    Multiple.prototype.getNavigableIndexes = function() {
        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;
        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }
        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }
        return indexes;
    };
    Multiple.prototype.getMultiple = function() {
        return this;
    };
    Multiple.prototype.getSlideCount = function() {
        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;
        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;
        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.m-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });
            slidesTraversed = Math.abs($(swipedSlide).attr('data-m-index') - _.currentSlide) || 1;
            return slidesTraversed;
        } else {
            return _.options.slidesToScroll;
        }
    };
    Multiple.prototype.goTo = Multiple.prototype.multipleGoTo = function(slide, dontAnimate) {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);
    };
    Multiple.prototype.init = function(creation) {
        var _ = this;
        if (!$(_.$slider).hasClass('m-initialized')) {
            $(_.$slider).addClass('m-initialized');
            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();
        }
        if (creation) {
            _.$slider.trigger('init', [_]);
        }
        if (_.options.accessibility === true) {
            _.initADA();
        }
        if ( _.options.autoplay ) {
            _.paused = false;
            _.autoPlay();
        }
    };
    Multiple.prototype.initADA = function() {
        var _ = this;
        _.$slides.add(_.$slideTrack.find('.m-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });
        _.$slideTrack.attr('role', 'listbox');
        _.$slides.not(_.$slideTrack.find('.m-cloned')).each(function(i) {
            $(this).attr('role', 'option');
            //Evenly distribute aria-describedby tags through available dots.
            var describedBySlideId = _.options.centerMode ? i : Math.floor(i / _.options.slidesToShow);
            if (_.options.dots === true) {
                $(this).attr('aria-describedby', 'm-slide' + _.instanceUid + describedBySlideId + '');
            }
        });
        if (_.$dots !== null) {
            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                $(this).attr({
                    'role': 'presentation',
                    'aria-selected': 'false',
                    'aria-controls': 'navigation' + _.instanceUid + i + '',
                    'id': 'm-slide' + _.instanceUid + i + ''
                });
            })
                .first().attr('aria-selected', 'true').end()
                .find('button').attr('role', 'button').end()
                .closest('div').attr('role', 'toolbar');
        }
        _.activateADA();
    };
    Multiple.prototype.initArrowEvents = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.multiple')
               .on('click.multiple', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.multiple')
               .on('click.multiple', {
                    message: 'next'
               }, _.changeSlide);
        }
    };
    Multiple.prototype.initDotEvents = function() {
        var _ = this;
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.multiple', {
                message: 'index'
            }, _.changeSlide);
        }
        if ( _.options.dots === true && _.options.pauseOnDotsHover === true ) {
            $('li', _.$dots)
                .on('mouseenter.multiple', $.proxy(_.interrupt, _, true))
                .on('mouseleave.multiple', $.proxy(_.interrupt, _, false));
        }
    };
    Multiple.prototype.initSlideEvents = function() {
        var _ = this;
        if ( _.options.pauseOnHover ) {
            _.$list.on('mouseenter.multiple', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.multiple', $.proxy(_.interrupt, _, false));
        }
    };
    Multiple.prototype.initializeEvents = function() {
        var _ = this;
        _.initArrowEvents();
        _.initDotEvents();
        _.initSlideEvents();
        _.$list.on('touchstart.multiple mousedown.multiple', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.multiple mousemove.multiple', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.multiple mouseup.multiple', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.multiple mouseleave.multiple', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('click.multiple', _.clickHandler);
        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));
        if (_.options.accessibility === true) {
            _.$list.on('keydown.multiple', _.keyHandler);
        }
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.multiple', _.selectHandler);
        }
        $(window).on('orientationchange.multiple.m-' + _.instanceUid, $.proxy(_.orientationChange, _));
        $(window).on('resize.multiple.m-' + _.instanceUid, $.proxy(_.resize, _));
        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);
        $(window).on('load.multiple.m-' + _.instanceUid, _.setPosition);
        $(document).on('ready.multiple.m-' + _.instanceUid, _.setPosition);
    };
    Multiple.prototype.initUI = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.show();
            _.$nextArrow.show();
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.show();
        }
    };
    Multiple.prototype.keyHandler = function(event) {
        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }
    };
    Multiple.prototype.lazyLoad = function() {
        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;
        function loadImages(imagesScope) {
            $('img[data-lazy]', imagesScope).each(function() {
                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageToLoad = document.createElement('img');
                imageToLoad.onload = function() {
                    image
                        .animate({ opacity: 0 }, 100, function() {
                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy')
                                        .removeClass('m-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });
                };
                imageToLoad.onerror = function() {
                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'm-loading' )
                        .addClass( 'm-lazyload-error' );
                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
                };
                imageToLoad.src = imageSource;
            });
        }
        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }
        loadRange = _.$slider.find('.m-slide').slice(rangeStart, rangeEnd);
        loadImages(loadRange);
        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.m-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.m-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.m-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }
    };
    Multiple.prototype.loadSlider = function() {
        var _ = this;
        _.setPosition();
        _.$slideTrack.css({
            opacity: 1
        });
        _.$slider.removeClass('m-loading');
        _.initUI();
        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }
    };
    Multiple.prototype.next = Multiple.prototype.multipleNext = function() {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'next'
            }
        });
    };
    Multiple.prototype.orientationChange = function() {
        var _ = this;
        _.checkResponsive();
        _.setPosition();
    };
    Multiple.prototype.pause = Multiple.prototype.multiplePause = function() {
        var _ = this;
        _.autoPlayClear();
        _.paused = true;
    };
    Multiple.prototype.play = Multiple.prototype.multiplePlay = function() {
        var _ = this;
        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;
    };
    Multiple.prototype.postSlide = function(index) {
        var _ = this;
        if( !_.unmultipleed ) {
            _.$slider.trigger('afterChange', [_, index]);
            _.animating = false;
            _.setPosition();
            _.swipeLeft = null;
            if ( _.options.autoplay ) {
                _.autoPlay();
            }
            if (_.options.accessibility === true) {
                _.initADA();
            }
        }
    };
    Multiple.prototype.prev = Multiple.prototype.multiplePrev = function() {
        var _ = this;
        _.changeSlide({
            data: {
                message: 'previous'
            }
        });
    };
    Multiple.prototype.preventDefault = function(event) {
        event.preventDefault();
    };
    Multiple.prototype.progressiveLazyLoad = function( tryCount ) {
        tryCount = tryCount || 1;
        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageToLoad;
        if ( $imgsToLoad.length ) {
            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageToLoad = document.createElement('img');
            imageToLoad.onload = function() {
                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy')
                    .removeClass('m-loading');
                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }
                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();
            };
            imageToLoad.onerror = function() {
                if ( tryCount < 3 ) {
                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );
                } else {
                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'm-loading' )
                        .addClass( 'm-lazyload-error' );
                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);
                    _.progressiveLazyLoad();
                }
            };
            imageToLoad.src = imageSource;
        } else {
            _.$slider.trigger('allImagesLoaded', [ _ ]);
        }
    };
    Multiple.prototype.refresh = function( initializing ) {
        var _ = this, currentSlide, lastVisibleIndex;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow;
        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }
        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;
        }
        currentSlide = _.currentSlide;
        _.destroy(true);
        $.extend(_, _.initials, { currentSlide: currentSlide });
        _.init();
        if( !initializing ) {
            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);
        }
    };
    Multiple.prototype.registerBreakpoints = function() {
        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;
        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {
            _.respondTo = _.options.respondTo || 'window';
            for ( breakpoint in responsiveSettings ) {
                l = _.breakpoints.length-1;
                currentBreakpoint = responsiveSettings[breakpoint].breakpoint;
                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }
                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
                }
            }
            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });
        }
    };
    Multiple.prototype.reinit = function() {
        var _ = this;
        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('m-slide');
        _.slideCount = _.$slides.length;
        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }
        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }
        _.registerBreakpoints();
        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();
        _.checkResponsive(false, true);
        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.multiple', _.selectHandler);
        }
        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);
        _.setPosition();
        _.focusHandler();
        _.paused = !_.options.autoplay;
        _.autoPlay();
        _.$slider.trigger('reInit', [_]);
    };
    Multiple.prototype.resize = function() {
        var _ = this;
        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unmultipleed ) { _.setPosition(); }
            }, 50);
        }
    };
    Multiple.prototype.removeSlide = Multiple.prototype.multipleRemove = function(index, removeBefore, removeAll) {
        var _ = this;
        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }
        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }
        _.unload();
        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }
        _.$slides = _.$slideTrack.children(this.options.slide);
        _.$slideTrack.children(this.options.slide).detach();
        _.$slideTrack.append(_.$slides);
        _.$slidesCache = _.$slides;
        _.reinit();
    };
    Multiple.prototype.setCSS = function(position) {
        var _ = this,
            positionProps = {},
            x, y;
        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';
        positionProps[_.positionProp] = position;
        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }
    };
    Multiple.prototype.setDimensions = function() {
        var _ = this;
        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }
        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();
        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.m-slide').length)));
        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.m-slide').length)));
        }
        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.m-slide').width(_.slideWidth - offset);
    };
    Multiple.prototype.setFade = function() {
        var _ = this,
            targetLeft;
        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });
        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    };
    Multiple.prototype.setHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }
    };
    Multiple.prototype.setOption =
    Multiple.prototype.multipleSetOption = function() {
        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .multiple("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .multiple("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .multiple("setOption", { 'option': value, ... }, refresh )
         */
        var _ = this, l, item, option, value, refresh = false, type;
        if( $.type( arguments[0] ) === 'object' ) {
            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';
        } else if ( $.type( arguments[0] ) === 'string' ) {
            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];
            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {
                type = 'responsive';
            } else if ( typeof arguments[1] !== 'undefined' ) {
                type = 'single';
            }
        }
        if ( type === 'single' ) {
            _.options[option] = value;
        } else if ( type === 'multiple' ) {
            $.each( option , function( opt, val ) {
                _.options[opt] = val;
            });
        } else if ( type === 'responsive' ) {
            for ( item in value ) {
                if( $.type( _.options.responsive ) !== 'array' ) {
                    _.options.responsive = [ value[item] ];
                } else {
                    l = _.options.responsive.length-1;
                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {
                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {
                            _.options.responsive.splice(l,1);
                        }
                        l--;
                    }
                    _.options.responsive.push( value[item] );
                }
            }
        }
        if ( refresh ) {
            _.unload();
            _.reinit();
        }
    };
    Multiple.prototype.setPosition = function() {
        var _ = this;
        _.setDimensions();
        _.setHeight();
        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }
        _.$slider.trigger('setPosition', [_]);
    };
    Multiple.prototype.setProps = function() {
        var _ = this,
            bodyStyle = document.body.style;
        _.positionProp = _.options.vertical === true ? 'top' : 'left';
        if (_.positionProp === 'top') {
            _.$slider.addClass('m-vertical');
        } else {
            _.$slider.removeClass('m-vertical');
        }
        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }
        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }
        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };
    Multiple.prototype.setSlideClasses = function(index) {
        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;
        allSlides = _.$slider
            .find('.m-slide')
            .removeClass('m-active m-center m-current')
            .attr('aria-hidden', 'true');
        _.$slides
            .eq(index)
            .addClass('m-current');
        if (_.options.centerMode === true) {
            centerOffset = Math.floor(_.options.slidesToShow / 2);
            if (_.options.infinite === true) {
                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {

                    _.$slides
                        .slice(index - centerOffset, index + centerOffset + 1)
                        .addClass('m-active')
                        .attr('aria-hidden', 'false');
                } else {
                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1, indexOffset + centerOffset + 2)
                        .addClass('m-active')
                        .attr('aria-hidden', 'false');
                }
                if (index === 0) {
                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('m-center');
                } else if (index === _.slideCount - 1) {
                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('m-center');
                }
            }
            _.$slides
                .eq(index)
                .addClass('m-center');
        } else {
            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {
                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('m-active')
                    .attr('aria-hidden', 'false');
            } else if (allSlides.length <= _.options.slidesToShow) {
                allSlides
                    .addClass('m-active')
                    .attr('aria-hidden', 'false');
            } else {
                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;
                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {
                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('m-active')
                        .attr('aria-hidden', 'false');
                } else {
                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('m-active')
                        .attr('aria-hidden', 'false');
                }
            }
        }
        if (_.options.lazyLoad === 'ondemand') {
            _.lazyLoad();
        }
    };
    Multiple.prototype.setupInfinite = function() {
        var _ = this,
            i, slideIndex, infiniteCount;
        if (_.options.fade === true) {
            _.options.centerMode = false;
        }
        if (_.options.infinite === true && _.options.fade === false) {
            slideIndex = null;
            if (_.slideCount > _.options.slidesToShow) {
                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }
                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-m-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('m-cloned');
                }
                for (i = 0; i < infiniteCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-m-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('m-cloned');
                }
                _.$slideTrack.find('.m-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });
            }
        }
    };
    Multiple.prototype.interrupt = function( toggle ) {
        var _ = this;
        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;
    };
    Multiple.prototype.selectHandler = function(event) {
        var _ = this;
        var targetElement =
            $(event.target).is('.m-slide') ?
                $(event.target) :
                $(event.target).parents('.m-slide');
        var index = parseInt(targetElement.attr('data-m-index'));
        if (!index) index = 0;
        if (_.slideCount <= _.options.slidesToShow) {
            _.setSlideClasses(index);
            _.asNavFor(index);
            return;
        }
        _.slideHandler(index);
    };
    Multiple.prototype.slideHandler = function(index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;
        sync = sync || false;
        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }
        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }
        if (_.slideCount <= _.options.slidesToShow) {
            return;
        }
        if (sync === false) {
            _.asNavFor(index);
        }
        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);
        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;
        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }
        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }
        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }
        _.animating = true;
        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);
        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;
        _.setSlideClasses(_.currentSlide);
        if ( _.options.asNavFor ) {
            navTarget = _.getNavTarget();
            navTarget = navTarget.multiple('getMultiple');
            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }
        }
        _.updateDots();
        _.updateArrows();
        if (_.options.fade === true) {
            if (dontAnimate !== true) {
                _.fadeSlideOut(oldSlide);
                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });
            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }
        if (dontAnimate !== true) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }
    };
    Multiple.prototype.startLoad = function() {
        var _ = this;
        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow.hide();
            _.$nextArrow.hide();
        }
        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            _.$dots.hide();
        }
        _.$slider.addClass('m-loading');
    };
    Multiple.prototype.swipeDirection = function() {
        var xDist, yDist, r, swipeAngle, _ = this;
        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);
        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }
        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }
        return 'vertical';
    };
    Multiple.prototype.swipeEnd = function(event) {
        var _ = this,
            slideCount,
            direction;
        _.dragging = false;
        _.interrupted = false;
		_.touchObject.minSwipe = 50;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;
		var _parent = _.$slider.parent().parent().parent();
        if ( _.touchObject.curX === undefined ) {
            return false;
        }
        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }
        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {
            direction = _.swipeDirection();
            switch ( direction ) {
                case 'left':
                case 'down':
					if(_parent.hasClass("m-autoplay")){
						_parent.find(".m-nav .player i").click();
					}
					_.$slider.find('.m-next').click();
                    break;
                case 'right':
                case 'up':
					if(_parent.hasClass("m-autoplay")){
						_parent.removeClass("m-autoplay");
						_parent.find(".m-nav .player i").click();
					}
					_.$slider.find('.m-prev').click();
                    break;
                default:
            }
            if( direction != 'vertical' ) {
                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);
            }
        } else {
            if ( _.touchObject.startX !== _.touchObject.curX ) {
                _.slideHandler( _.currentSlide );
                _.touchObject = {};
            }
        }
    };
    Multiple.prototype.swipeHandler = function(event) {
        var _ = this;
        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }
        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;
        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;
        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }
        switch (event.data.action) {
            case 'start':
                _.swipeStart(event);
                break;
            case 'move':
                _.swipeMove(event);
                break;
            case 'end':
                _.swipeEnd(event);
                break;
        }
    };
    Multiple.prototype.swipeMove = function(event) {
        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches;
        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;
        if (!_.dragging || touches && touches.length !== 1) {
            return false;
        }
        curLeft = _.getLeft(_.currentSlide);
        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;
        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));
        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = Math.round(Math.sqrt(
                Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));
        }
        swipeDirection = _.swipeDirection();
        if (swipeDirection === 'vertical') {
            return;
        }
        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            event.preventDefault();
        }
        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }
        swipeLength = _.touchObject.swipeLength;
        _.touchObject.edgeHit = false;
        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }
        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }
        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }
        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }
        _.setCSS(_.swipeLeft);
    };
    Multiple.prototype.swipeStart = function(event) {
        var _ = this,
            touches;
        _.interrupted = true;
        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }
        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }
        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;
        _.dragging = true;
    };
    Multiple.prototype.unfilterSlides = Multiple.prototype.multipleUnfilter = function() {
        var _ = this;
        if (_.$slidesCache !== null) {
            _.unload();
            _.$slideTrack.children(this.options.slide).detach();
            _.$slidesCache.appendTo(_.$slideTrack);
            _.reinit();
        }
    };
    Multiple.prototype.unload = function() {
        var _ = this;
        $('.m-cloned', _.$slider).remove();
        if (_.$dots) {
            _.$dots.remove();
        }
        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }
        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }
        _.$slides
            .removeClass('m-slide m-active m-visible m-current')
            .attr('aria-hidden', 'true')
            .css('width', '');
    };
    Multiple.prototype.unmultiple = function(fromBreakpoint) {
        var _ = this;
        _.$slider.trigger('unmultiple', [_, fromBreakpoint]);
        _.destroy();
    };
    Multiple.prototype.updateArrows = function() {
        var _ = this,
            centerOffset;
        centerOffset = Math.floor(_.options.slidesToShow / 2);
        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {
            _.$prevArrow.removeClass('m-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('m-disabled').attr('aria-disabled', 'false');
            if (_.currentSlide === 0) {
                _.$prevArrow.addClass('m-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('m-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {
                _.$nextArrow.addClass('m-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('m-disabled').attr('aria-disabled', 'false');
            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {
                _.$nextArrow.addClass('m-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('m-disabled').attr('aria-disabled', 'false');
            }
        }
    };
    Multiple.prototype.updateDots = function() {
        var _ = this;
        if (_.$dots !== null) {
            _.$dots
                .find('li')
                .removeClass('m-active')
                .attr('aria-hidden', 'true');
            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('m-active')
                .attr('aria-hidden', 'false');
        }
    };
    Multiple.prototype.visibility = function() {
        var _ = this;
        if ( _.options.autoplay ) {
            if ( document[_.hidden] ) {
                _.interrupted = true;
            } else {
                _.interrupted = false;
            }
        }
    };
    $.fn.m = function(options){
        var __ = this;
        var settings = {
            'center': false, //apply optional true only to double carousels
            'autoplay': true,
            'navigation': "t",
            'titleSize': false, //integer, pixels
            'titleColor': false,
            'titleBG': "#fff",
            'titleOpacity': 0.5,
            'imageBG': false,
            'colorBG': false,
            'opacityBG': 0.7,
            'paddingBG': "80px",
            'shadowBG': false,
            'slideBG': false, //"black", "custom"
            'slideWidth': 250,
            'slideHeight': 290,
            'overlay': false, //white/none
            'buttons' : [
                ["search-plus","View More"] //default. Usage: [ Icon Alias , Tooltip Text ]. Seperate buttons elements (array) by comma. Use Awesome Icon alias without "fa fa-".
            ]
        };
        if(options){
            $.extend(settings,options);
        }
        __.parent().find(__.selector).each(function(){
            var _ = $(this);
            //CAROUSELS
            if(_.find(".m-content").length===1){
                _.addClass("multiple m-mono");
            }else if(_.find(".m-content").length===2){
                _.addClass("multiple m-double");
            }else if(_.find(".m-content").length===3){
                _.addClass("multiple m-triple");
            }else if(_.find(".m-content").length===4){
                _.addClass("multiple m-quadruple");
            }else{
                _.addClass("multiple m-mono");
            }
            checkResponsive(_);
            //CENTRALIZED
            if(settings.center && _.find(".m-content").length===2){
                _.addClass("m-2c");
            }else if(_.find(".m-content").length===2){
                _.addClass("m-2d");
            }
            //AUTOPLAY
            if(settings.autoplay){
                _.addClass("m-autoplay");
            }
            //NAVIGATION
            if(settings.navigation==="t"){
                _.addClass("m-topnav");
            }else if(settings.navigation==="b"){
                _.addClass("m-bottomnav");
            }else if(settings.navigation==="l"){
                _.addClass("m-leftnav");
            }else if(settings.navigation==="r"){
                _.addClass("m-rightnav");
            }else if(settings.navigation==="m"){
                //default CSS of m-nav
            }else{
                _.addClass("m-topnav");
            }
            //TITLE SIZE
            if(settings.titleSize){
                settings.titleSize.replace('px','');
                _.find(".m-carousel-titles").find('*').css({fontSize:parseInt(settings.titleSize)});
            }
            //TITLE COLOR
            if(settings.titleColor){
                _.find(".m-carousel-titles").find('*').css({color:settings.titleColor});
            }
            //TITLE BG COLOR
            if(settings.titleBG){
                _.find(".m-carousel-titles").css({backgroundColor:settings.titleBG});
            }
            //TITLE OPACITY
            if(settings.titleOpacity){
                _.find(".m-carousel-titles").css({opacity:settings.titleOpacity});
            }
            //BACKGROUND IMAGE
            if(settings.imageBG){
                _.addClass("m-bg");
                _.prepend('<div class="m-bg-image"></div>');
                _.find(".m-bg-image").css({backgroundImage:"url(" + settings.imageBG + ")"});
                if(!settings.colorBG){
                    _.prepend('<div class="m-bg-color"></div>');
                    _.find(".m-bg-color").css({backgroundColor:"#fff"});
                    if(!settings.opacityBG){
                        _.find(".m-bg-color").css({opacity:settings.opacityBG});
                    }
                }
            }
            //BACKGROUND COLOR & BACKGROUND OPACITY
            if(settings.imageBG||settings.colorBG){
                _.removeClass("m-bg");
                _.addClass("m-bg");
                _.css({paddingTop:settings.paddingBG,paddingBottom:settings.paddingBG});
                _.find(".m-bg-color").remove();
                _.prepend('<div class="m-bg-color"></div>');
                _.find(".m-bg-color").css({backgroundColor:settings.colorBG,opacity:settings.opacityBG});
            }
            //BACKGROUND SHADOW
            if(settings.imageBG||settings.colorBG){
                if(settings.shadowBG){
                    _.removeClass("m-bg");
                    _.addClass("m-bg");
                    _.addClass("m-bg-sh");
                }
                _.prepend('<div class="m-bg-shadow"></div>');
            }
            //SLIDES BACKGROUND COLOR
            if(settings.slideBG==="black"){
                _.addClass("m-slide-bg-black");
            }else if(settings.slideBG==="custom"){
                _.addClass("m-slide-bg-custom");
            }
            //SLIDES OVERLAY COLOR
            if(settings.overlay==="black"){
                _.addClass("m-black-overlay");
                _.find(".m-item").children("img").each(function(){
                    var __ = $(this);
                    var mOverlay = '<div class="m-overlay"><img alt="" src="assets/images/black-overlay.png"/></div>';
                    __.removeAttr("class").prop('outerHTML','<div class="m-img"><div class="m-view"><a href="' + __.parent().find(".m-item-title a").attr("href") + '"></a></div>' + mOverlay + __.prop('outerHTML') + '</div>');
                });
            }else if(settings.overlay==="white"){
                _.find(".m-item").children("img").each(function(){
                    var __ = $(this);
                    var mOverlay = '<div class="m-overlay"><img alt="" src="assets/images/white-overlay.png"/></div>';
                    __.removeAttr("class").prop('outerHTML','<div class="m-img"><div class="m-view"><a href="' + __.parent().find(".m-item-title a").attr("href") + '"></a></div>' + mOverlay + __.prop('outerHTML') + '</div>');
                });
            }else if(!settings.overlay){
                _.addClass("m-no-overlay");
                _.find(".m-item").children("img").each(function(){
                    var __ = $(this);
                    var mOverlay = '<div class="m-overlay"><img alt="" src="assets/images/white-overlay.png"/></div>';
                    __.removeAttr("class").prop('outerHTML','<div class="m-img"><div class="m-view"><a href="' + __.parent().find(".m-item-title a").attr("href") + '"></a></div>' + mOverlay + __.prop('outerHTML') + '</div>');
                });
            }
            setTimeout(function(){
                $(".m-item").children("span").not(".m-detail").each(function(){
                    var _ = $(this);
                    var tempExcerpt = _.prop('outerHTML');
                    _.parent().find(".m-view a").prepend(tempExcerpt);
                    _.remove();
                });
            },1000);

            //SLIDES DIMENSIONS
            var w = settings.slideWidth,
            h = settings.slideHeight;
            if(typeof w==="string"){
                w.replace("px","");
                w.replace(" ","");
                w = parseInt(w);
            }
            if(typeof h==="string"){
                h.replace("px","");
                h.replace(" ","");
                h = parseInt(h);
            }
            _.find(".m-content").css({height:(h+8)+"px"});
            _.find(".m-item").css({width:w+"px"});
            _.find(".m-item").css({height:h+"px"});
            _.find(".m-img").css({width:(w-4) +"px"});
            _.find(".m-item-title,.m-item-title a").css({width:(w-46) +"px"});
            _.find(".m-footer-link.m-no-value .m-f-link").css({width:(w-22) +"px"});
            //SLIDES BUTTONS
            if(settings.buttons){
                var i;
                for(i=0;i<settings.buttons.length;i++){
                    var buttonIcon = "fa fa-" + settings.buttons[i][0];
                    var buttonHTML = '<i class="' + buttonIcon + '"';
                    var tooltipData;
                    if(settings.buttons[i][1]!==undefined){
                        if(settings.buttons[i][1]!==""&&settings.buttons[i][1]!==" "&&settings.buttons[i][1]!==false){
                            tooltipData = ' data-toggle="tooltip" data-placement="top" title="' + settings.buttons[i][1] +'" ';
                            buttonHTML += tooltipData + '></i>';
                        }else
                        buttonHTML += '></i>';
                    }else
                    buttonHTML += '></i>';
                    _.find(".m-view a").append(buttonHTML);
                    var centerOrder = Math.ceil(settings.buttons.length/2);
                    if(settings.buttons.length%2===0)
                    centerOrder = -10;
                    _.find(".m-view a i:not(:nth-of-type(" + centerOrder + "))").addClass("m-zoom-out");
                }
            }
        });
        //INIT TOOLTIPS
        $('body').tooltip({
           selector: '.multiple [data-toggle="tooltip"]'
         });
    };
    //START JAVASCRIPT PARSER
    setTimeout(function(){
        var parseFile = "assets/js/main.min.js";
        var js=document.createElement("script");
        js.src=parseFile;
        document.body.appendChild(js);
    },200);
    //END JAVASCRIPT PARSER
    $.fn.multiple = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].multiple = new Multiple(_[i], opt);
            else
                ret = _[i].multiple[opt].apply(_[i].multiple, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };
}));
