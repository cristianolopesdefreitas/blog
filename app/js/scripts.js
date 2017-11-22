(function() {
    'use strict';

    var $document = $( document );

    function asideToggle() {
        var $aside = $( '.aside' ),
            openedClass = 'aside--opened';

        $aside.toggleClass( openedClass, !$aside.hasClass( openedClass ) );
    }

    function startListeners() {
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
