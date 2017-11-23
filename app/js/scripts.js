(function() {
    'use strict';

    var $document = $( document );

    function asideToggle() {
        var $aside = $( '.aside' ),
            openedClass = 'aside--opened';

        $aside.toggleClass( openedClass, !$aside.hasClass( openedClass ) );
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

        $document.on( 'scroll', function() {
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
