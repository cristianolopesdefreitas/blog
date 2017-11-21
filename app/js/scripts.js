(function() {
    'use strict';

    function asideToggle() {
        var $aside = $( '.aside' ),
            openedClass = 'aside--opened';

        if ( $aside.hasClass( openedClass ) ) {
            $aside.removeClass( openedClass );
        } else {
            $aside.addClass( openedClass );
        }
    }

    function startListeners() {
        var $document = $( document );

        $document.on( 'click', '.aside-toggle', function() {
            asideToggle();
        });
    }

    function init() {
        startListeners();
    }

    $(function() {
        init();
    });

}());
