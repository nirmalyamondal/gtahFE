
$(document).ready(function($) {
   
  if(fromScrollForm == 1) {
    document.getElementById("ftablinks1").click();
  } else {
    if(document.getElementById("ftablinks2")) {
        document.getElementById("ftablinks2").click();
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
    $('#deadline').datetimepicker({
       timepicker:false,
       format:'d-m-Y',
       yearStart: 2022,
       yearEnd: 2030,
       minDate:'+1970/01/02',//tomorrow is minimum date calendar
       maxDate:'+1970/06/01'//+6 months is maximum date calendar
    });
});

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
