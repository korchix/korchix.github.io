(function($) {
  
    "use strict";
    $.fn.andSelf = function() {
      return this.addBack.apply(this, arguments);
    }
        
    /*
    |===================
    | SLIDER Preloader
    |===================
    */
      $(window).on('load', function() {
        $('.slider_preloader_status').fadeOut();
        $('.slider_preloader').delay(350).fadeOut('slow');
        $('.header-slider').removeClass("header-slider-preloader");
      })
      
      /*
        |===================
        | SLIDER JS
        |===================
      */
    
    $(window).on('load', function() {
       $('#header-slider #animation-slide').owlCarousel({
              autoHeight: true,
              items: 1,
              loop: true,
              autoplay: true,
              dots: true,
              nav: true,
              autoplayTimeout: 7000,
              navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
              animateIn: "zoomIn",
              animateOut: "fadeOutDown",
              autoplayHoverPause: false,
              touchDrag: true,
              mouseDrag: true
          });
        $("#animation-slide").on("translate.owl.carousel", function () {
            $(this).find(".owl-item .slide-text > *").removeClass("fadeInUp animated").css("opacity","0");
            $(this).find(".owl-item .slide-img").removeClass("fadeInRight animated").css("opacity","0");
        });          
        $("#animation-slide").on("translated.owl.carousel", function () {
            $(this).find(".owl-item.active .slide-text > *").addClass("fadeInUp animated").css("opacity","1");
            $(this).find(".owl-item.active .slide-img").addClass("fadeInRight animated").css("opacity","1");
        });
    });
    
    /*
    |
    | NAV FIXED ON SCROLL
    |
    */
    $(window).on('scroll', function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 50) {
            $(".nav-scroll").addClass("strict");
        } else {
            $(".nav-scroll").removeClass("strict");
        }
    });
    

    $( document ).ready(function() {
    /*
    |
    | Mobile NAv trigger
    |
    */
  
      var trigger = $('.navbar-toggle'),
      overlay     = $('.overlay'),
      active      = false;
      
      $('.navbar-toggle, #navbar-nav li a, .overlay').on('click', function () {
          $('.navbar-toggle').toggleClass('active')
          $('#js-navbar-menu').toggleClass('active');
          overlay.toggleClass('active');
      });  
      
    /*
    |
    | WOW ANIMATION
    |
    */
    	var wow = new WOW({
          mobile: false  // trigger animations on mobile devices (default is true)
      });
      wow.init();

    /*
    |
    | OWL CAROUSEL
    |
    */
    $('#ldx-overview').owlCarousel({
        loop: false,
        responsiveClass: true,
        nav: true,
        autoplay: false,
        smartSpeed: 450,
        stopOnHover : true,
        animateIn: 'slideInRight',
        animateOut: 'slideOutLeft',
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
          1170: {
            items: 2,
          }
        }
    });
    

    /*
    |
    | Onepage Nav
    |
    */
        
      $('#navbar').onePageNav({
          currentClass: 'active',
          changeHash: false,
          scrollSpeed: 750,
          scrollThreshold: 0.5,
      });
      
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
        

          
    /*
    |
    | MAILCHIMP NEWSLETTER SUBSCRIPTION
    |
    */
       
      $("#mailchimp-subscribe").ajaxChimp({
          callback: mailchimpCallback,
          url: "http://deviserweb.us8.list-manage.com/subscribe/post?u=8035b74ecdb23c8ce0ccb094f&id=1a9b909143" // Replace your mailchimp post url inside double quote "".  
      });
  
      function mailchimpCallback(resp) {
            var subscriptionSuccess = $('.subscription-success');
            var subscriptionFailed = $('.subscription-failed');
           if(resp.result === 'success') {
             $.subscriptionSuccess
                  .html('<i class="fa fa-check"></i>' + "&nbsp;" + resp.msg)
                  .delay(500)
                  .fadeIn(1000);
  
              $.subscriptionFailed.fadeOut(500);
              
          } else if(resp.result === 'error') {
              $.subscriptionFailed
                  .html('<i class="fa fa-close"></i>' + "&nbsp;" + resp.msg)
                  .delay(500)
                  .fadeIn(1000);
                  
              $.subscriptionSuccess.fadeOut(500);
          }  
      };
    
    /**
     * ====================================
     * LOCAL NEWSLETTER SUBSCRIPTION
     * ====================================
     */
      $("#local-subscribe").on('submit', function(e) {
          e.preventDefault();
          var data = {
              email: $("#subscriber-email").val()
          },
          postUrl = $(this).attr('action');
  
          if ( isValidEmail(data['email']) ) {
              $.ajax({
                  type: "POST",
                  url: postUrl,
                  data: data,
                  success: function() {
                      $('.subscription-success').fadeIn(1000);
                      $('.subscription-failed').fadeOut(500);
                  }
              });
          } else {
              $('.subscription-failed').fadeIn(1000);
              $('.subscription-success').fadeOut(500);
          }
  
          return false;
      });
        
    /*
    |
    | CONTACT FORM
    |
    */
        
      $("#contactForm").validator().on("submit", function (event) {
          if (event.isDefaultPrevented()) {
            // handle the invalid form...
            formError();
            submitMSG(false, "Did you fill in the form properly?");
          } else {
            // everything looks good!
            event.preventDefault();
            submitForm();
          }
       });
  
      function submitForm(){
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        $.ajax({
            type: "POST",
            url: "process.php",
            data: "name=" + name + "&email=" + email + "&message=" + message,
            success : function(text){
                if (text == "success"){
                    formSuccess();
                  } else {
                    formError();
                    submitMSG(false,text);
                  }
              }
          });
      }
      function formSuccess(){
          $("#contactForm")[0].reset();
          submitMSG(true, "Message Sent!")
      }
  	  function formError(){   
  	    $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
  	        $(this).removeClass();
  	    });
  	  }
      function submitMSG(valid, msg){
        if(valid){
          var msgClasses = "h3 text-center fadeInUp animated text-success";
        } else {
          var msgClasses = "h3 text-center shake animated text-danger";
        }
        $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
      }
    });
}(jQuery));