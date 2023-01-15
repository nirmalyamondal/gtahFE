  $(function() {
    var header = $(".button_container");
    $(window).scroll(function() {
      var scroll = $(window).scrollTop();
      //Page Scroll Show FORM
      if (scroll > 450) {
        $('.scroll_form').fadeIn();
      } else {
        $('.scroll_form').fadeOut();
      }
      /*
      //alert(scroll);
      if (scroll >= 100) {
        header.removeClass('button_container').addClass("button_container_scroll");
        $(".m-backtotop").addClass("active");   
      } else {
        header.removeClass("button_container_scroll").addClass('button_container');
        $(".m-backtotop").removeClass("active");
      }*/
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

//Carousel
$('#recipeCarousel').carousel({
  interval: 10000
})
$('.carousel .carousel-item').each(function(){
    var next = $(this).next();
    if (!next.length) {
    next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));    
    for (var i=0;i<3;i++) {
        next=next.next();
        if (!next.length) {
          next = $(this).siblings(':first');
        }
        
        next.children(':first-child').clone().appendTo($(this));
      }
});

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

/****************************************************/
/* 
  Home Page order FORM: Step 1
  Home Page On Scroll FORM: Step 1
*/
/*
$('#datetimepicker').datetimepicker({
   timepicker:false,
   formatDate:'Y/m/d',
   minDate:'+1970/01/02'//tomorrow is minimum date calendar
});*/
  $( function() {
    $( "#datetimepicker" ).datetimepicker({
          timepicker:false,
          formatDate:'Y/m/d',
          minDate:'+1970/01/02'//tomorrow is minimum date calendar
    });
});
/*
$('#datepicker').datetimepicker({
  yearOffset:222,
  lang:'ch',
  timepicker:false,
  format:'d/m/Y',
  formatDate:'Y/m/d',
  minDate:'-1970/01/02', // yesterday is minimum date
  maxDate:'+1970/01/02' // and tommorow is maximum date calendar
});*/
/* Plus Minus */
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

/* Validate & Submit Order form step 1 @ Home*/
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
    //Before submitting set hidden values ??
});

$("#emailid").change(function() {
     var emailid = $("#emailid").val();
     valid_emailid(emailid);
});
$("#topic").change(function(){
    var topic = $(this).val();
    validate_topic(topic);        
});
/*
$("#datepicker").change(function() {
    var datepicker     = $("#datepicker").val();
    validate_datepicker(datepicker);   
    var dps_arr = datepicker.split("-");
    //dd-mm-yyyy
    $("#deadline").val(dps_arr[2]+'-'+dps_arr[1]+'-'+dps_arr[0]);  
});
*/
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
      $("#emailid").css('border','0px solid red');
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
        $("#topic").css('border','0px solid red');
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
    //idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
    if(idate < today){
      $("#datepicker_valid").removeClass('fa fa-check-circle-o right-input');
      $("#datepicker_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#datepicker").css('border','1px solid red');
      return false;
    } else {
      $("#datepicker_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#datepicker_valid").addClass('fa fa-check-circle-o right-input');
      $("#datepicker").css('border','0px solid red');
      return true;
    }
}

/**
 * Scroll FORM starts Here 
 * 
 **/
 /* Plus Minus Scroll*/
$(document).ready(function() {
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

$("#emails").change(function() {
  var emails = $("#emails").val();
  valid_emails(emails);
});
$("#topics").change(function(){
  var topics = $(this).val();
  validate_topics(topics);        
});
$("#datepickers").change(function() {
  var datepickers     = $("#datepickers").val();
  validate_datepickers(datepickers); 
  var dp_arr = datepickers.split("-");
  //dd-mm-yyyy
  $("#deadlines").val(dp_arr[2]+'-'+dp_arr[1]+'-'+dp_arr[0]);       
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
      $("#emails").css('border','0px solid red');
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
        $("#topics").css('border','0px solid red');
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
    //idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
    idate = new Date(idate[0], idate[1] - 1, idate[2]).getTime();
    if(idate < today){
      $("#datepickers_valid").removeClass('fa fa-check-circle-o right-input');
      $("#datepickers_valid").addClass('fa fa-times-circle-o wrong-input');
      $("#datepickers").css('border','1px solid red');
      return false;
    } else {
      $("#datepickers_valid").removeClass('fa fa-times-circle-o wrong-input');
      $("#datepickers_valid").addClass('fa fa-check-circle-o right-input');
      $("#datepickers").css('border','0px solid red');
      return true;
    }
}

/* Validate & Submit SCROLL form step 1 @ Home*/
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
    //Before submitting set hidden values ??
});

/**********/
$(document).ready(function($) {
  if(document.getElementById("ftablinks1")) {
    document.getElementById("ftablinks1").click();
  }
  
});
function openFormTab(evt, formName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("ftabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("ftablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(formName).style.display = "block";
  evt.currentTarget.className += " active";
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