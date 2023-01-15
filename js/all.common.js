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

//Carousel
  /*
$('#carouselExampleIndicators').carousel({
  interval: 10000
})
$('.carousel .slider-thumb').each(function(){
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
*/
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