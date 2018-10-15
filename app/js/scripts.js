(function() {
    'use strict';

    var $document = $( document ),
        $body = $( 'body' ),
        $header = $( '.header' ),
        currentYOffset = window.pageYOffset;

    function asideToggle() {
        var $aside = $( '.aside' ),
            openedClass = 'aside--opened';

        $aside.toggleClass( openedClass, !$aside.hasClass( openedClass ) );
    }

    function asideClose() {
        $( '.aside' ).removeClass( 'aside--opened' );
    }

    function headerScrollControl( e ) {
        var Yoffset = e.currentTarget.pageYOffset;

        if ( Yoffset >= 0 ) {
            if ( Yoffset === 0 || Yoffset < currentYOffset ) {
                downHeader();
            } else if ( Yoffset > currentYOffset && Yoffset > $header.outerHeight() ) {
                upHeader();
            }
        }

        currentYOffset = Yoffset;

        asideClose();
    }

    function headerHeightAdjustment() {
        $body.css({
            'padding-top': $header.outerHeight() + 'px'
        });
    }

    function downHeader() {
        headerHeightAdjustment();

        $header
            .addClass( 'header--fixed' )
            .removeClass( 'header--up' )
            .addClass( 'header--down' );
    }

    function upHeader() {
        $header
            .addClass( 'header--up' )
            .addClass( 'header--fixed' )
            .removeClass( 'header--down' );
    }

    function scrollToTopToggle() {
        var scroll = $document.scrollTop();

        $( '.scroll-to-top' ).toggleClass( 'scroll-to-top__show', scroll > 100 );
    }

    function scrollToTop() {
        $( 'html, body' ).animate({
            scrollTop: 0
        }, 500 );
    }

    function startListeners() {
        $document.on( 'click', '.aside-toggle', function() {
            asideToggle();
        });

        $( window ).on( 'scroll', function( e ) {
            headerScrollControl( e );
            scrollToTopToggle();
        });

        $document.on( 'click', '.scroll-to-top', function() {
            scrollToTop();
        });
    }

    function init() {
        startListeners();
    }

    $(function() {
        init();
    });

}());
