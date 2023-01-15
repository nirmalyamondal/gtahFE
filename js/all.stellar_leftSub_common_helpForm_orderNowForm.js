jQuery.event.special.touchstart = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchstart", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.touchmove = {
    setup: function( _, ns, handle ) {
        this.addEventListener("touchmove", handle, { passive: !ns.includes("noPreventDefault") });
    }
};
jQuery.event.special.wheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("wheel", handle, { passive: true });
    }
};
jQuery.event.special.mousewheel = {
    setup: function( _, ns, handle ){
        this.addEventListener("mousewheel", handle, { passive: true });
    }
};

/*
 * Stellarnav.js 1.0.0
 * jQuery responsive multi-level dropdown menu designed to do most of the heavy CSS work for you.    
 *
 * Copyright (c) 2016 Vinny Moreira - http://vinnymoreira.com
 *
 * Released under the MIT license
 */
(function($) {
  $.fn.stellarNav = function(options, width, breakpoint) {

    var $nav, $width, $breakpoint;
    nav = $(this);
    width = $(window).width();

    // default settings
    var settings = $.extend( {
      theme     : 'plain', // adds default color to nav. (light, dark)
      breakpoint: 768, // number in pixels to determine when the nav should turn mobile friendly
      phoneBtn: false, // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
        locationBtn: false, // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
      sticky     : false, // makes nav sticky on scroll (desktop only)
      position: 'static', // 'static' or 'top' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page 
      showArrows: true, // shows dropdown arrows next to the items that have sub menus
      closeBtn     : false, // adds a close button to the end of nav
      scrollbarFix: false // fixes horizontal scrollbar issue on very long navs
    }, options );

    return this.each( function() {

      // defines black or white themes
      if (settings.theme == 'light' || settings.theme == 'dark') {
        nav.addClass(settings.theme);
      }

      if (settings.breakpoint) {
        breakpoint = settings.breakpoint;
      }

      // css classes for main menu mobile buttons
      if( settings.phoneBtn && settings.locationBtn ) {
        var cssClass = 'third';
      } else if( settings.phoneBtn || settings.locationBtn ) {
        var cssClass = 'half';
      } else {
        var cssClass = 'full';
      }

      // adds the toggle button to open and close nav 
       nav.prepend('<a href="#" class="menu-toggle ' + cssClass + '"><div class="bar_container"><div class="bar1 red_cologbg"></div><div class="bar2 red_cologbg"></div><div class="bar3 red_cologbg"></div></div><!--i class="fa fa-bars"></i--> <div class="menu_txt_mobile">Menu</div></a>');

      // adds a click-to-call link
      if (settings.phoneBtn) {

        var btn = '<a href="tel:'+ settings.phoneBtn +'" class="call-btn-mobile ' + cssClass + '"><i class="fa fa-phone"></i> <span>Call us</span></a>';

        nav.find('a.menu-toggle').after(btn);

      }

      // adds a location page link to the beginning of nav
      if (settings.locationBtn) {
        
        var btn = '<a href="'+ settings.locationBtn +'" class="location-btn-mobile ' + cssClass + '" target="_blank"><i class="fa fa-map-marker"></i> <span>Location</span></a>';

        nav.find('a.menu-toggle').after(btn);

      }

      // Makes nav sticky on scroll
      if (settings.sticky) {
        navPos = nav.offset().top;      
        if(width >= breakpoint) {
          $(window).bind('scroll', function() {
                 if ($(window).scrollTop() > navPos) {
                     nav.addClass('fixed');
                 }
                 else {
                     nav.removeClass('fixed');
                 }
            });
        }
      }

      if (settings.position == 'top') {
        nav.addClass('top');
      }

      if (!settings.showArrows) {
        nav.addClass('hide-arrows');
      }

      if (settings.closeBtn) {
        // adds a link to end of nav to close it
        nav.find('ul:first').append('<li><a href="#" class="close-menu"><i class="fa fa-close"></i> Close Menu</a></li>');
      }

      if (settings.scrollbarFix) {
        $('body').addClass('stellarnav-noscroll-x');
      }
          
      // opens and closes menu      
      $('.menu-toggle').on('click', function(e) {
        e.preventDefault();
        nav.find('ul:first').stop(true, true).slideToggle(250);
        nav.toggleClass('active');
      });

      // actives the close button
      $('.close-menu').click(function() {
        nav.find('ul:first').stop(true, true).slideUp(250).toggleClass('active');
        nav.removeClass('active');
      });
      

      // adds toggle button to li items that have children
      nav.find('li a').each(function() {
        if ($(this).next().length > 0) {
          $(this).parent('li').addClass('has-sub').append('<a class="dd-toggle" href="#"><i class="fa fa-plus"></i></a>');
        }
      });

      // expands the dropdown menu on each click 
      nav.find('li .dd-toggle').on('click', function(e) {
        e.preventDefault();
        //$(this).parent('li').toggleClass('hover');
        $(this).parent('li').children('ul').stop(true, true).slideToggle(250);
        $(this).parent('li').toggleClass('open');
      });

      var resetTriggers = function() {
        nav.find('li').unbind('mouseenter');
        nav.find('li').unbind('mouseleave');
      }
      
      var setTriggers = function() {
        nav.find('li').on('mouseenter', function(){
          $(this).addClass('hover');
          $(this).children('a').addClass('hovera');
          $(this).children('ul').stop(true, true).slideDown(250);
        });
        nav.find('li').on('mouseleave', function(){
          $(this).removeClass('hover');
          $(this).children('ul').stop(true, true).slideUp(250);
          $(this).children('a').removeClass('hovera');
        });
      }
      windowCheckStellerTop();
      
      // check browser width in real-time
      function windowCheckStellerTop() {
        var browserWidth = window.innerWidth;
        
        if(browserWidth <= breakpoint) {
          // mobile/tablet nav
          
          resetTriggers();
          nav.addClass('mobile');
          nav.removeClass('desktop');

          // closes the menu when resizing window back to desktop
          if( !nav.hasClass('active') && nav.find('ul:first').is(':visible') ) {
            //nav.addClass('active');
            nav.find('ul:first').hide();
          }

        } else {
          // desktop nav
          nav.addClass('desktop');          
          nav.removeClass('mobile');

          if(nav.hasClass('active')) {
            nav.removeClass('active');
          }

          // ensures stellarnav is visible after resizing window
          if( !nav.hasClass('active') && nav.find('ul:first').is(':hidden') ) {
            nav.find('ul:first').show();
          }

          // hides items that were open on mobile
          $('li.open').removeClass('open').find('ul:visible').hide();

          resetTriggers();
          setTriggers();
        }
      }

      $(window).on('resize', function() {
        windowCheckStellerTop();
      });
    });
  }
}(jQuery));

/***********************************************************************/

/*
 * Stellarnav.js 1.0.0
 * jQuery responsive multi-level dropdown menu designed to do most of the heavy CSS work for you.    
 *
 * Copyright (c) 2016 Vinny Moreira - http://vinnymoreira.com
 *
 * Released under the MIT license
 */
(function($) {
  $.fn.stellarNavTwo = function(options, width, breakpoint) {

    var $nav, $width, $breakpoint;
    nav = $(this);
    width = $(window).width();

    // default settings
    var settings = $.extend( {
      theme     : 'plain', // adds default color to nav. (light, dark)
      breakpoint: 768, // number in pixels to determine when the nav should turn mobile friendly
      phoneBtn: false, // adds a click-to-call phone link to the top of menu - i.e.: "18009084500"
        locationBtn: false, // adds a location link to the top of menu - i.e.: "/location/", "http://site.com/contact-us/"
      sticky     : false, // makes nav sticky on scroll (desktop only)
      position: 'static', // 'static' or 'top' - when set to 'top', this forces the mobile nav to be placed absolutely on the very top of page 
      showArrows: true, // shows dropdown arrows next to the items that have sub menus
      closeBtn     : false, // adds a close button to the end of nav
      scrollbarFix: false // fixes horizontal scrollbar issue on very long navs
    }, options );

    return this.each( function() {

      // Makes nav sticky on scroll
      if (settings.sticky) {
        navPos = nav.offset().top;      
        if(width >= breakpoint) {
          $(window).bind('scroll', function() {
                 if ($(window).scrollTop() > navPos) {
                     nav.addClass('fixed');
                 }
                 else {
                     nav.removeClass('fixed');
                 }
            });
        }
      }

      if (settings.position == 'top') {
        nav.addClass('top');
      }

      if (!settings.showArrows) {
        nav.addClass('hide-arrows');
      }
          
      // opens and closes menu      
      $('.menu-toggle').on('click', function(e) {
        e.preventDefault();
        nav.find('ul:first').stop(true, true).slideToggle(250);
        nav.toggleClass('active');
      });

      // adds toggle button to li items that have children
      nav.find('li a').each(function() {
        if ($(this).next().length > 0) {
          $(this).parent('li').addClass('has-sub').append('<a class="dd-toggle" href="#"><i class="fa fa-plus"></i></a>');
        }
      });

      // expands the dropdown menu on each click 
      nav.find('li .dd-toggle').on('click', function(e) {
        e.preventDefault();
        //$(this).parent('li').toggleClass('hover');
        $(this).parent('li').children('ul').stop(true, true).slideToggle(250);
        $(this).parent('li').toggleClass('open');
      });

      var resetTriggers = function() {
        nav.find('span.arrow').unbind('mouseover');
        nav.find('span.arrow').unbind('mouseleave');
      }
      
      var setTriggers = function() {
        nav.find('li').on('mouseover', function(){
          $(this).addClass('hoverx');
          $(this).children('a').addClass('hovera');
          $(this).children('ul').stop(true, true).slideDown(250);
        });
        nav.find('li').on('mouseleave', function(){
          $(this).removeClass('hoverx');
          $(this).children('ul').stop(true, true).slideUp(250);
          $(this).children('a').removeClass('hovera');
        });
      }
      windowCheckStellerLeft();
      
      // check browser width in real-time
      function windowCheckStellerLeft() {
        var browserWidth = window.innerWidth;
        
        if(browserWidth <= breakpoint) {
          // mobile/tablet nav
          
          resetTriggers();
          nav.addClass('mobile');
          nav.removeClass('desktop');

          // closes the menu when resizing window back to desktop
          if( !nav.hasClass('active') && nav.find('ul:first').is(':visible') ) {
            //nav.addClass('active');
            nav.find('ul:first').hide();
          }

        } else {
          // desktop nav
          //nav.addClass('desktop');          
          //nav.removeClass('mobile');

          if(nav.hasClass('active')) {
            nav.removeClass('active');
          }

          // ensures leftSubMenu is visible after resizing window
          if( !nav.hasClass('active') && nav.find('ul:first').is(':hidden') ) {
            nav.find('ul:first').show();
          }

          // hides items that were open on mobile
          $('li.open').removeClass('open').find('ul:visible').hide();

          resetTriggers();
          setTriggers();
        }
      }

      $(window).on('resize', function() {
        windowCheckStellerLeft();
      });
    });
  }
}(jQuery));

/***********************************************************************/
  // Hide the "scroll form" on decument re-size event 
  window.addEventListener('resize', function(event) {
      if ($(document).width() < 700) {
        $('.scroll_form').hide();
      }
  }, true);

  // 
  $(function() {
    var header = $(".button_container");
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      var documentWidth = $(document).width();
      //Page Scroll Show FORM
      if ((scroll > 450) && (documentWidth > 700)) {
        $('.scroll_form').fadeIn();
      } else {
        $('.scroll_form').fadeOut();
      }
    });
  });

  //Make sure the user has scrolled at least double the height of the browser
  $(".m-backtotop").click(function() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

/*Left Navigation & Main Navigation theme*/    
$(document).ready(function($) {
  if($('.leftSubMenu').length){ 
    $('.leftSubMenu').stellarNavTwo();
  }
  if($('#main-nav').length){ 
    $('.stellarnav').stellarNav({
      theme: 'light'
    });
  }
});


/*read more links show hide content*/
function readMoreDots(dots,moreTxt,readMoreButton) {
  var dots = document.getElementById(dots);
  var moreText = document.getElementById(moreTxt);
  var btnText = document.getElementById(readMoreButton);
  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more &raquo;";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "&laquo; Read less";
    moreText.style.setProperty('display', 'inline', 'important');
  }
}

function readMoreDotsDisplayOnly(dots,moreTxt,readMoreButton) {
  var dots = document.getElementById(dots);
  var moreText = document.getElementById(moreTxt);
  var btnText = document.getElementById(readMoreButton);
  dots.style.display = "none";
  btnText.innerHTML = "&laquo; Read less";
  moreText.style.setProperty('display', 'inline', 'important');
}

//Login
  const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#std_pass');
  if(togglePassword != null) {
      togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';            
        password.setAttribute('type', type);
        // Toggle the eye and bi-eye icon
        togglePassword.classList.toggle('bi-eye');
    });
  }

function decorateIpField(ipId){
  document.getElementById(ipId).style.color = "black";
}

/*Copied from Older Site*/
/**
 * SUBSCRIPTION of EMAIL
 * */

function subscription_form_submit(formID,UrlPath,location) {
  var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
  var email = $('#Email').val();
  if(!pattern.test(email)){
    alert('Please enter correct email address');
    return false;
  } else {
    console.log(formID+UrlPath+location);
    var fd = new FormData(document.getElementById(formID));
    fd.append("label", formID);
    $.ajax({
              url: UrlPath,
              type: "POST",
              data: fd,
              processData: false,  // tell jQuery not to process the data
              contentType: false   // tell jQuery not to set contentType
            }).done(function( data ) {
              console.log( data );
              alert(data);
              $('#'+formID)[0].reset();
              if(location !="") {
                window.location = location;
              }
            });
    return false;
  }
}
// Check if the code below is in USE ????????????????????
$('.chatclose').click(function(){ $('.close').click(); });    
$("#second-form").click(function(){
    var conatct_email = $('#email1').val();
    var topic1 = $('#topic1').val();
    var deadline1 = $('#deadline1').val();
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
    if(conatct_email==""){
      alert('Please Fill Your Email Id');   
    }
    else if(!pattern.test(conatct_email)){
      alert('Please Check Your Email Id');
    }else if(topic1 == ''){
      alert('Please Fill The Topic');
    }else if(deadline1 == ''){
      alert('Plese Fill The Date');
    }else{
      $(".btn-d").css({'display':'none'});
      $(".btn-s").css({'display':'block'});
      $(".submi").click();
      $(".btn-s").html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:30px; color:green;"></i>');
    }
});



/******************************************/

/****************************************************/
/* 
  Home Page: Order FORM: Step 1
*/
$(document).ready(function () {
    'use strict';
    $('#datepicker').datepicker({
      format: 'dd-mm-yyyy',
      startDate: '+1d',
      autoclose: true,
      clearBtn: true,
      todayHighlight: true
    });
});
/*
$(document).ready(function () {
    'use strict';
    $('#datepicker').datetimepicker({
       timepicker:false,
       format:'d-m-Y',
       yearStart: 2022,
       yearEnd: 2030,
       minDate:'+1970/01/02',//tomorrow is minimum date calendar
       maxDate:'+1970/06/01'//+6 months is maximum date calendar
    });
});
*/
$(document).ready(function() {
  const minus = $('.quantity__minus');
  const plus = $('.quantity__plus');
  const input = $('.quantity__input');
  $('.quantity__input').css({"color":"#000"});
  minus.click(function(e) {
    e.preventDefault();
    var ipvalue = input.val();
    const ipvalue_arr = ipvalue.split(" / ");
    let pages = ipvalue_arr[0];
    if (pages > 1) {
      pages--;
    }    
    var words = pages * 250;
    input.val(pages+' / '+words);
    $('#numOfProject').val(pages);
    $('#numOfword').val(words);
  });
  
  plus.click(function(e) {
    e.preventDefault();
    var ipvalue = input.val();
    const ipvalue_arr = ipvalue.split(" / ");
    let pages = ipvalue_arr[0];
    pages++;
    if (pages > 1000) {
      pages = 1000;
    }
    var words = pages * 250;
    input.val(pages+' / '+words);
    $('#numOfProject').val(pages);
    $('#numOfword').val(words);
  })
});

$("#helpForm").submit(function() {   
    if(!valid_emailid($('#emailid').val())) {
        $('#error_missing_filed').html('Check Missing Fields');
        $('#error_missing_filed').css({"color":"red","font-size":"14px"});
        $('#error_missing_filed').fadeIn();
        $('#error_missing_filed').fadeOut(20000);
        return false;
    }
    if(!validate_topic($("#topic").val())) {
        $('#error_missing_filed').html('Check Missing Fields');
        $('#error_missing_filed').css({"color":"red","font-size":"14px"});
        $('#error_missing_filed').fadeIn();
        $('#error_missing_filed').fadeOut(20000);
         return false;
    }
    if(!validate_datepicker($("#datepicker").val())) {
        $('#error_missing_filed').html('Check Missing Fields');
        $('#error_missing_filed').css({"color":"red","font-size":"14px"});
        $('#error_missing_filed').fadeIn();
        $('#error_missing_filed').fadeOut(20000);
        return false;
    }
    $(".btn-s").html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:30px; color:green;"></i>');
});

$("#emailid").change(function() {
     var emailid = $("#emailid").val();
     valid_emailid(emailid);
});
$("#topic").change(function(){
    var topic = $(this).val();
    validate_topic(topic);        
});

$("#datepicker").change(function() {
    validate_datepicker($("#datepicker").val());
    $("#deadline").val($("#datepicker").val());  
});

//fileupload script start
$("#upload").change(function(){
    var size=0;
    var ext="";
    var fileName = $(this)[0].files;
    var count=fileName.length;
    var fileExtension = ['pdf', 'txt', 'docx', 'doc','ppt','pptx','xls','xlsx','csv','jpeg','jpg','bmp','png'];

    if(parseInt(count)<=1) {
        size = this.files[0].size;
        if ($.inArray(this.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
            alert("Only "+fileExtension.join(', ')+" formats are allowed. " +this.files[0].name+ " is an invalid file format.");
            $(this).val('');
            return false;
        }
    } else {
        for(i =0; i<count-1;i++) {
            size += this.files[i].size;
            if ($.inArray(this.files[i].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
                alert("Only "+fileExtension.join(', ')+" formats are allowed. " +this.files[i].name+ " is an invalid file format.");
                $(this).val('');
                return false;
            } 
        } 
    }

    if(count>4) {
      alert("You can only upload a maximum of 4 files");
      $(this).val('');
      return false;

    } else if(size>20000000){
      alert("Maximum file size limit is 20 MB.");
      $(this).val('');
      return false;
    }
});

function valid_emailid(conatct_email) {          
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;    
    if(conatct_email==""){
      $("#emailid_valid").removeClass('fa fa-check-circle-o right-input');
      $("#emailid_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#emailid").css('border','1px solid red');
      return false;
   }
   if(!pattern.test(conatct_email)){
      $("#emailid_valid").removeClass('fa fa-check-circle-o right-input');
      $("#emailid_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#emailid").css('border','1px solid red');
      return false;
   } else {
      $("#emailid_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#emailid_valid").addClass('fa fa-check-circle-o right-input');
      $("#emailid").css({"color":"#000","border":"0px solid red"});
      return true;
   }
}

function validate_topic(topic){
    if(topic=="") {
        $("#topic_valid").removeClass('fa fa-check-circle-o right-input');
        $("#topic_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#topic").css('border','1px solid red');
        return false;                
    } else {
        $("#topic_valid").removeClass('fa fa-times-circle-o wrong-input');
        $("#topic_valid").addClass('fa fa-check-circle-o right-input');
        $("#topic").css({"color":"#000","border":"0px solid red"});
        return true;
    }
}

function validate_datepicker(datepicker){       
    if(datepicker=="") {           
        $("#datepicker_valid").removeClass('fa fa-check-circle-o right-input');
        $("#datepicker_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#datepicker").css('border','1px solid red');
        return false;                
    }  
    var today = new Date().getTime(),
    idate = datepicker.split("-");
    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    if(idate < today){
      $("#datepicker_valid").removeClass('fa fa-check-circle-o right-input');
      $("#datepicker_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#datepicker").css('border','1px solid red');
      return false;
    } else {
      $("#datepicker_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#datepicker_valid").addClass('fa fa-check-circle-o right-input');
      $("#datepicker").css({"color":"#000","border":"0px solid red"});
      return true;
    }
}

/*
 * Home Page: SCROLL FORM: Step 1 
 */
$(document).ready(function () {
    'use strict';
    $('#datepickers').datepicker({
      format: 'dd-mm-yyyy',
      startDate: '+1d',
      autoclose: true,
      clearBtn: true,
      todayHighlight: true
    });
});
/*
 $(document).ready(function () {
    'use strict';
    $('#datepickers').datetimepicker({
       timepicker:false,
       format:'d-m-Y',
       yearStart: 2022,
       yearEnd: 2030,
       minDate:'+1970/01/02',//tomorrow is minimum date calendar
       maxDate:'+1970/06/01'//+6 months is maximum date calendar
    });
});*/

$(document).ready(function() {
    $('.quantitys__input').css({"color":"#000"});
    const minuss = $('.quantitys__minus');
    const pluss = $('.quantitys__plus');
    const inputs = $('.quantitys__input');
    const numOfProjects = $('#numOfProjects');
    minuss.click(function(e) {
            e.preventDefault();
            var ipvalue = numOfProjects.val();
            let pages = ipvalue;
            if (pages > 1) {
              pages--;
            }    
        var words = pages * 250;
        inputs.val(pages+' Page(s) / '+words+' Words');
        $('#numOfProjects').val(pages);
        $('#numOfwords').val(words);
    });  
    pluss.click(function(e) {
        e.preventDefault();
        var ipvalue = numOfProjects.val();
        let pages = ipvalue;
        pages++;
        if (pages > 1000) {
          pages = 1000;
        }
        var words = pages * 250;
        inputs.val(pages+' Page(s) / '+words+' Words');
        $('#numOfProjects').val(pages);
        $('#numOfwords').val(words);
    })
});

$("#helpFormScroll").submit(function() {   
    if(!valid_emails($('#emails').val())) {
        $('#error_missing_fileds').html('Check Missing Fields');
        $('#error_missing_fileds').css({"color":"#fff","font-size":"14px"});
        $('#error_missing_fileds').fadeIn();
        $('#error_missing_fileds').fadeOut(20000);
        return false;
    }
    if(!validate_topics($("#topics").val())) {
        $('#error_missing_fileds').html('Check Missing Fields');
        $('#error_missing_fileds').css({"color":"#fff","font-size":"14px"});
        $('#error_missing_fileds').fadeIn();
        $('#error_missing_fileds').fadeOut(20000);
         return false;
    }
    if(!validate_datepickers($("#datepickers").val())) {
        $('#error_missing_fileds').html('Check Missing Fields');
        $('#error_missing_fileds').css({"color":"#fff","font-size":"14px"});
        $('#error_missing_fileds').fadeIn();
        $('#error_missing_fileds').fadeOut(20000);
        return false;
    }
    $(".btn-s").html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:30px; color:green;"></i>');
});

$("#emails").change(function() {
  var emails = $("#emails").val();
  valid_emails(emails);
});
$("#topics").change(function(){
  var topics = $(this).val();
  validate_topics(topics);        
});
$("#datepickers").change(function() {
  validate_datepickers($("#datepickers").val())
  $("#deadlines").val($("#datepickers").val());    
});
$("#deadlinetime").change(function(){
  var deadlinetime = $(this).val();
  $("#user_time").val(deadlinetime);
});

function valid_emails(conatct_email) {          
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;    
    if(conatct_email==""){
      $("#emails_valid").removeClass('fa fa-check-circle-o right-input');
      $("#emails_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#emails").css('border','1px solid red');
      return false;
   }
   if(!pattern.test(conatct_email)){
      $("#emails_valid").removeClass('fa fa-check-circle-o right-input');
      $("#emails_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#emailid").css('border','1px solid red');
      return false;
   } else {
      $("#emails_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#emails_valid").addClass('fa fa-check-circle-o right-input');
      $("#emails").css({"color":"#000","border":"0px solid red"});
      return true;
   }
}

function validate_topics(topic){
    if(topic=="") {
        $("#topics_valid").removeClass('fa fa-check-circle-o right-input');
        $("#topics_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#topics").css('border','1px solid red');
        return false;                
    } else {
        $("#topics_valid").removeClass('fa fa-times-circle-o wrong-input');
        $("#topics_valid").addClass('fa fa-check-circle-o right-input');
        $("#topics").css({"color":"#000","border":"0px solid red"});
        return true;
    }
}

function validate_datepickers(datepicker){       
    if(datepicker=="") {           
        $("#datepickers_valid").removeClass('fa fa-check-circle-o right-input');
        $("#datepickers_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#datepickers").css('border','1px solid red');
        return false;                
    }  
    var today = new Date().getTime(),
    idate = datepicker.split("-");
    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    if(idate < today){
      $("#datepickers_valid").removeClass('fa fa-check-circle-o right-input');
      $("#datepickers_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#datepickers").css('border','1px solid red');
      return false;
    } else {
      $("#datepickers_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#datepickers_valid").addClass('fa fa-check-circle-o right-input');
      $("#datepickers").css({"color":"#000","border":"0px solid red"});
      return true;
    }
}
/******************************************/
/*Adding Google Analytics*/
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new
    Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-93997429-1', 'auto');
ga('send', 'pageview');

/******************************************/

$(document).ready(function($) {
  if (typeof fromScrollForm !== 'undefined') {
      if(fromScrollForm == 1) {
      document.getElementById("ftablinks1").click();
    } else {
      if(document.getElementById("ftablinks2")) {
          document.getElementById("ftablinks2").click();
      } 
    }
  }
  $('#email').css({"color":"#000"});
  $('#topic').css({"color":"#000"});
  $('.quantity__input').css({"color":"#000"});
});

function openFormTab(element, formName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("ftabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("step_12_label");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(formName).style.display = "block";
  //evt.currentTarget.className += " active";
  document.getElementById(element).className += " active";
}

/*Step1*/
$(document).ready(function () {
    'use strict';
    $('#deadline').datepicker({
      format: 'dd-mm-yyyy',
      startDate: '+1d',
      autoclose: true,
      clearBtn: true,
      todayHighlight: true
    });
});
/*
$(document).ready(function () {
    'use strict';
    $('#deadline').datetimepicker({
       timepicker:false,
       format:'d-m-Y',
       yearStart: 2022,
       yearEnd: 2030,
       minDate:'+1970/01/02',//tomorrow is minimum date calendar
       maxDate:'+1970/06/01'//+6 months is maximum date calendar
    });
});
*/
$(document).ready(function() {
  const minus = $('.quantity__minus');
  const plus = $('.quantity__plus');
  const input = $('.quantity__input');
  minus.click(function(e) {
    e.preventDefault();
    var ipvalue = input.val();
    const ipvalue_arr = ipvalue.split(" / ");
    let pages = ipvalue_arr[0];
    if (pages > 1) {
      pages--;
    }    
    var words = pages * 250;
    input.val(pages+' / '+words);
    $('#numOfProject').val(pages);
    $('#numOfword').val(words);
  });
  
  plus.click(function(e) {
    e.preventDefault();
    var ipvalue = input.val();
    const ipvalue_arr = ipvalue.split(" / ");
    let pages = ipvalue_arr[0];
    pages++;
    if (pages > 1000) {
      pages = 1000;
    }
    var words = pages * 250;
    input.val(pages+' / '+words);
    $('#numOfProject').val(pages);
    $('#numOfword').val(words);
  })
});

$(document).ready(function() {
  $("#button_continue").on('click', function() {
      if(!valid_email($('#email').val())) {
          $('#error_missing_filed').html('Check Missing Fields');
          $('#error_missing_filed').css({"color":"#fff","font-size":"14px","font-weight":"700"});
          $('#error_missing_filed').fadeIn();
          $('#error_missing_filed').fadeOut(20000);
          return false;
      }
      if(!validate_topic($("#topic").val())) {
          $('#error_missing_filed').html('Check Missing Fields');
          $('#error_missing_filed').css({"color":"#fff","font-size":"14px","font-weight":"700"});
          $('#error_missing_filed').fadeIn();
          $('#error_missing_filed').fadeOut(20000);
           return false;
      }
      if(!validate_deadline($("#deadline").val())) {
          $('#error_missing_filed').html('Check Missing Fields');
          $('#error_missing_filed').css({"color":"#fff","font-size":"14px","font-weight":"700"});
          $('#error_missing_filed').fadeIn();
          $('#error_missing_filed').fadeOut(20000);
          return false;
      }
      openFormTab('step_2_label', 'form_step2_wrap');
  });
});

$("#email").change(function() {
     var email = $("#email").val();
     valid_email(email);
});
$("#topic").change(function(){
    var topic = $(this).val();
    validate_topic(topic);        
});

$("#deadline").change(function() {
    validate_deadline($("#deadline").val());
});

$("#deadlinetime").change(function(){
  var deadlinetime = $(this).val();
  $("#user_time").val(deadlinetime);
});

//fileupload script start
$("#upload").change(function(){
    var size=0;
    var ext="";
    var fileName = $(this)[0].files;
    var count=fileName.length;
    var fileExtension = ['pdf', 'txt', 'docx', 'doc','ppt','pptx','xls','xlsx','csv','jpeg','jpg','bmp','png'];

    if(parseInt(count)<=1) {
        size = this.files[0].size;
        if ($.inArray(this.files[0].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
            alert("Only "+fileExtension.join(', ')+" formats are allowed. " +this.files[0].name+ " is an invalid file format.");
            $(this).val('');
            return false;
        }
    } else {
        for(i =0; i<count-1;i++) {
            size += this.files[i].size;
            if ($.inArray(this.files[i].name.split('.').pop().toLowerCase(), fileExtension) == -1) {
                alert("Only "+fileExtension.join(', ')+" formats are allowed. " +this.files[i].name+ " is an invalid file format.");
                $(this).val('');
                return false;
            } 
        } 
    }

    if(count>4) {
      alert("You can only upload a maximum of 4 files");
      $(this).val('');
      return false;

    } else if(size>20000000){
      alert("Maximum file size limit is 20 MB.");
      $(this).val('');
      return false;
    }
});

function valid_email(conatct_email) {          
    var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;    
    if(conatct_email==""){
      $("#email_valid").removeClass('fa fa-check-circle-o right-input');
      $("#email_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#email").css('border','1px solid red');
      return false;
   }
   if(!pattern.test(conatct_email)){
      $("#email_valid").removeClass('fa fa-check-circle-o right-input');
      $("#email_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#email").css('border','1px solid red');
      return false;
   } else {
      $("#email_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#email_valid").addClass('fa fa-check-circle-o right-input');
      $("#email").css({"color":"#000","border":"0px solid red"});
      return true;
   }
}

function validate_topic(topic){
    if(topic=="") {
        $("#topic_valid").removeClass('fa fa-check-circle-o right-input');
        $("#topic_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#topic").css('border','1px solid red');
        return false;                
    } else {
        $("#topic_valid").removeClass('fa fa-times-circle-o wrong-input');
        $("#topic_valid").addClass('fa fa-check-circle-o right-input');
        $("#topic").css({"color":"#000","border":"0px solid red"});
        return true;
    }
}

function validate_deadline(deadline){       
    if(deadline=="") {           
        $("#deadline_valid").removeClass('fa fa-check-circle-o right-input');
        $("#deadline_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#deadline").css('border','1px solid red');
        return false;                
    }  
    var today = new Date().getTime(),
    idate = deadline.split("-");
    idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    if(idate < today){
      $("#deadline_valid").removeClass('fa fa-check-circle-o right-input');
      $("#deadline_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#deadline").css('border','1px solid red');
      return false;
    } else {
      $("#deadline_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#deadline_valid").addClass('fa fa-check-circle-o right-input');
      $("#deadline").css({"color":"#000","border":"0px solid red"});
      return true;
    }
}

/*Step2*/
 function isNumberKey(evt){  
       //var e = evt || window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode
       if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
           return false;
           return true;
}

$(document).ready(function() {
  $("#orderNowForm").submit(function() {   
      if(!validate_subject($("#subject").val())) {
          $('#error_missing_filed').html('Check Missing Fields');
          $('#error_missing_filed').css({"color":"#fff","font-size":"14px","font-weight":"700"});
          $('#error_missing_filed').fadeIn();
          $('#error_missing_filed').fadeOut(20000);
           return false;
      }
      if(!validate_LevelStudy($("#LevelStudy").val())) {
          $('#error_missing_filed').html('Check Missing Fields');
          $('#error_missing_filed').css({"color":"#fff","font-size":"14px","font-weight":"700"});
          $('#error_missing_filed').fadeIn();
          $('#error_missing_filed').fadeOut(20000);
          return false;
      }
      if(!validate_refrencing($("#refrencing").val())) {
          $('#error_missing_filed').html('Check Missing Fields');
          $('#error_missing_filed').css({"color":"#fff","font-size":"14px","font-weight":"700"});
          $('#error_missing_filed').fadeIn();
          $('#error_missing_filed').fadeOut(20000);
          return false;
      }
      $(".btn-s").html('<i class="fa fa-circle-o-notch fa-spin" style="font-size:30px; color:#fff;"></i>');
  });
});

$("#subject").change(function(){
    var subject = $(this).val();
    validate_subject(subject);        
});

$("#LevelStudy").change(function(){
    var LevelStudy = $(this).val();
    validate_LevelStudy(LevelStudy);        
});

$("#refrencing").change(function(){
    var refrencing = $(this).val();
    validate_refrencing(refrencing);        
});

function validate_subject(subject){
    if(subject=="") {
        $("#subject_valid").removeClass('fa fa-check-circle-o right-input');
        $("#subject_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#subject").css('border','1px solid red');
        return false;                
    } else {
        $("#subject_valid").removeClass('fa fa-times-circle-o wrong-input');
        $("#subject_valid").addClass('fa fa-check-circle-o right-input');
        $("#subject").css({"color":"#000","border":"0px solid red"});
        return true;
    }
}

function validate_LevelStudy(LevelStudy){
    if(LevelStudy=="") {
        $("#LevelStudy_valid").removeClass('fa fa-check-circle-o right-input');
        $("#LevelStudy_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#LevelStudy").css('border','1px solid red');
        return false;                
    } else {
        $("#LevelStudy_valid").removeClass('fa fa-times-circle-o wrong-input');
        $("#LevelStudy_valid").addClass('fa fa-check-circle-o right-input');
        $("#LevelStudy").css({"color":"#000","border":"0px solid red"});
        return true;
    }
}

function validate_refrencing(refrencing){
    if(refrencing=="") {
        $("#refrencing_valid").removeClass('fa fa-check-circle-o right-input');
        $("#refrencing_valid").addClass('fa fa-times-circle-o wrong-input');
        $("#refrencing").css('border','1px solid red');
        return false;                
    } else {
        $("#refrencing_valid").removeClass('fa fa-times-circle-o wrong-input');
        $("#refrencing_valid").addClass('fa fa-check-circle-o right-input');
        $("#refrencing").css({"color":"#000","border":"0px solid red"});
        return true;
    }
}

/*Contact FORM Start*/
  $('#contact_form').click(function() {
    var conatct_email = $('#conatct_email').val();
    var email = conatct_email.replace(/[0-9`~!#$%^&*()_|+\-=?;:'",<>\{\}\[\]\\\/]/gi,'');
    var contact_message = $('#contact_message').val();
    var message =  contact_message.replace(/[0-9`~!@#$%^&*()_|+\=?;'",<>\{\}\[\]\\\/]/gi,'');
  });
  function ajax_submit_form(formID,UrlPath,location) {
    //console.log(formID+UrlPath+location);
    var fd = new FormData(document.getElementById(formID));
    fd.append("label", formID);
    $.ajax({
            url: UrlPath,
            type: "POST",
            data: fd,
            processData: false,  // tell jQuery not to process the data
            contentType: false   // tell jQuery not to set contentType
            }).done(function( data ) {
            //console.log( data );
            alert(data);
            $('#'+formID)[0].reset();
            if(location !="")
            {
               window.location = location;
            }
      });
      return false;
  }
/*Contact FORM End*/