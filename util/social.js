// Initialize 3rd party social sharing widgets
/*global FB, twttr, IN, STMBLPN */
define(['jquery'], function($) {
  'use strict';

  return {
    init: function($context) {
      this.twitter($context);
      this.facebook($context);
      this.linkedin($context);
      this.pinterest($context);
      this.stumbledupon($context);
    },

    twitter: function($context) {
      if ($('.js-viral-button-twitter', $context).length) {
        requirejs(['//platform.twitter.com/widgets.js'], function() {
          try {
            twttr.widgets.load();
          }
          catch (e) {}
        });
      }
    },

    linkedin: function($context) {
      if ($('.js-viral-button-linkedin', $context).length) {
        requirejs(['//platform.linkedin.com/in.js'], function() {
          if (typeof IN !== 'undefined' && IN.parse) { IN.parse(); }
        });
      }
    },

    facebook: function($context) {
      if ($('.js-viral-button-fb', $context).length) {
        requirejs(['//connect.facebook.net/en_US/all.js#xfbml=1'], function() {
          if (typeof FB !== 'undefined' && FB.XFBML) { FB.XFBML.parse(); }
        });
      }
    },

    pinterest: function pinterest($context) {
      $('.js-viral-button-pinterest', $context).on('click', function() {
        requirejs(['//assets.pinterest.com/js/pinmarklet.js'], function() {
          if (typeof pinterest === 'undefined') {
            return;
          }

          if (pinterest.PIN) {
            window[pinterest.PIN].f.init();
            return;
          }

          pinterest.PIN = Object.keys(window).filter(function(key) {
            return (/^PIN_/).test(key);
          })[0];
        });
      });
    },

    stumbledupon: function($context) {
      // Do not show stumbleupon when on secure pages as they throw security
      // warnings because they load insecure subresources, last checked 3/13/2015
      if (window.location.protocol !== 'https:' && $('.js-viral-button-stumble', $context).length) {
        requirejs(['//platform.stumbleupon.com/1/widgets.js'], function() {
          if (typeof STMBLPN !== 'undefined') { STMBLPN.processWidgets(); }
        });
      }
    }
  };
});
