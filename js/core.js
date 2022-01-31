"use strict";

var sky = {},
  $sky_body = jQuery('body'),
  $sky_window = jQuery(window),
  $sky_scroll = jQuery('.sky-content-scroll');

// sky
if (jQuery('.slider').length) {
  sky.kenburns = {
    init: function() {
      // Set Variables
      let this_f = this;
      this_f.$el = jQuery('.slider');
      this_f.items = this_f.$el.find('.slides').length;
      this_f.transition = parseInt(this_f.$el.data('transition'), 10);
      this_f.delay = parseInt(this_f.$el.data('delay'), 10) / 1000 + this_f.transition * 0.001;
      this_f.zoom = this_f.$el.data('zoom');
      this_f.from = this_f.zoom;
      this_f.to = 1;
      this_f.active = 0;

      // Setup Items
      let prev_offset_x = 0,
        prev_offset_y = 0;

      this_f.$el.find('.slides').each(function() {
        let offset_x = Math.random() * 100,
          offset_y = Math.random() * 100;

        if (prev_offset_x > 50 && offset_x > 50) {
          offset_x = offset_x - 50;
        } else if (prev_offset_x < 50 && offset_x < 50) {
          offset_x = offset_x + 50;
        }
        if (prev_offset_y > 50 && offset_y > 50) {
          offset_y = offset_y - 50;
        } else if (prev_offset_y < 50 && offset_y < 50) {
          offset_y = offset_y + 50;
        }

        prev_offset_x = offset_x;
        prev_offset_y = offset_y;

        jQuery(this).css({
          'transition': 'opacity ' + this_f.transition + 'ms',
          'transform-origin': offset_x + '% ' + offset_y + '%',
          'background-image': 'url(' + jQuery(this).data('src') + ')'
        });
      });

      // Run Slider
      sky.kenburns.change();
    },
    change: function() {
      let this_f = this,
        scale_from = this_f.from,
        scale_to = this_f.to;

      // Loop
      if (this_f.active >= this_f.items) {
        this_f.active = 0;
      }
      let current_slide = this_f.$el.find('.slides').eq(this_f.active);

      gsap.fromTo(current_slide, {
        scale: scale_from,
        onStart: function() {
          current_slide.addClass('is-active');
        }
      }, {
        scale: scale_to,
        duration: this_f.delay,
        ease: 'none',
        onComplete: function() {
          sky.kenburns.active++;
          sky.kenburns.from = scale_to;
          sky.kenburns.to = scale_from;
          sky.kenburns.change();
          sky.kenburns.$el.find('.is-active').removeClass('is-active');
        }
      });
    }
  };
}

// Smooth Scroll
sky.old_scroll_top = 0;
sky.sScroll = {
  target: 0,
  current: 0,
  animate: function() {
    sky.sScroll.current += ((sky.sScroll.target - sky.sScroll.current) * sky.config.smooth_ease);
    $sky_scroll.css('transform', 'translate3d(0, -' + sky.sScroll.current + 'px, 0)');
    requestAnimationFrame(sky.sScroll.animate);
  },
  layout: function() {
    if ($sky_scroll.length) {
      let this_content = $sky_scroll.children('.sky-content');
      this_content.css('min-height', '0px');

      // Set Body Height (for smooth scroll)
      if ($sky_scroll.height() <= $sky_window.height()) {
        let min_height = $sky_window.height() - $sky_footer.height();

        if (!$sky_body.hasClass('no-header-padding'))
          min_height = min_height - $sky_scroll.children('.sky-header-holder').height();

        this_content.css('min-height', min_height + 'px');
        $sky_scroll.addClass('is-centered');
      } else {
        $sky_scroll.removeClass('is-centered');
      }

      if ($sky_body.hasClass('sky-smooth-scroll')) {
        $sky_body.height($sky_scroll.height());
      }
    }
  }
};

if ($sky_scroll.length || $sky_body.hasClass('sky-home-template')) {
  sky.sScroll.animate();
}

sky.init = function() {
  $sky_body.addClass('is-init');
  sky.old_scroll_top = $sky_window.scrollTop();


  // Back Button Functions
  jQuery('.sky-back').on('click', function(e) {
    e.preventDefault();
    var $this = jQuery(this);

    // Back to Top
    if ($this.hasClass('is-to-top')) {
      if ($sky_window.scrollTop() > $sky_window.height() / 2) {
        $sky_body.addClass('has-to-top');
      }
      $this.addClass('in-action');

      jQuery('html, body').stop().animate({
        scrollTop: 0
      }, 500, function() {
        $sky_body.removeClass('has-to-top');
        $this.removeClass('in-action');
      });
    }

    // Home Return
    if ($this.hasClass('is-home-return')) {
      $sky_body.addClass('is-locked');
      gsap.fromTo('.sky-content', 1, {
        y: 0,
        opacity: 1,
      }, {
        y: -100,
        opacity: 0,
        duration: 1,
        onComplete: function() {
          if ($sky_scroll.find('#sky-home-works').length) {
            var $current_content = jQuery('#sky-home-works');
          }
          if ($sky_scroll.find('#sky-home-contacts').length) {
            var $current_content = jQuery('#sky-home-contacts');
          }
          for (var i = 0; i < 4; i++) {
            $current_content.unwrap();
          }
          sky.sScroll.layout();
          $sky_body.height($sky_window.height());
        }
      });

      if (jQuery('.sky-page-title-wrap').length) {
        jQuery('.sky-page-title-wrap').removeClass('is-loaded').addClass('is-inactive');
        gsap.to('.sky-page-title-wrap', 0.5, {
          css: {
            top: 0,
          },
          delay: 0.5,
        });
      }
      if (jQuery('.sky-back-wrap').length) {
        jQuery('.sky-back-wrap').removeClass('is-loaded').addClass('is-inactive');
        gsap.to('.sky-back-wrap', 0.5, {
          css: {
            top: '200%',
          },
          delay: 0.5,
        });
      }
      gsap.to('.sky-home-link--works', 0.5, {
        css: {
          top: '100%',
        },
        delay: 1,
        onComplete: function() {
          jQuery('.sky-home-link--works').addClass('is-loaded').removeClass('is-inactive');
        }
      });
      gsap.to('.sky-home-link--contacts', 0.5, {
        css: {
          top: '100%',
        },
        delay: 1,
        onComplete: function() {
          jQuery('.sky-home-link--contacts').addClass('is-loaded').removeClass('is-inactive');
        }
      });
      gsap.to('.sky-page-background', {
        opacity: 0.75,
        scale: 1,
        duration: 1,
        delay: 1,
        onComplete: function() {
          $sky_body.removeClass('sky-content-shown');
          $sky_body.removeClass('is-locked');
        }
      });
    }
  });

  // Slider
  if (jQuery('.slider').length) {
    sky.kenburns.init();
  }
}

// DOM Ready. Init Template Core.
jQuery(document).ready(function() {
  sky.init();
});

$sky_window.on('resize', function() {
  // Window Resize Actions
  sky.layout();
  setTimeout(sky.layout(), 500);
}).on('load', function() {
  // Window Load Actions
  sky.layout();
}).on('scroll', function() {
  if ($sky_body.hasClass('sky-aside-shown')) {
    $sky_window.scrollTop(sky.old_scroll_top);
  }

}).on('focus', function() {
  if ($sky_body.hasClass('is-unloaded')) {
    window.location.reload();
  }
});
