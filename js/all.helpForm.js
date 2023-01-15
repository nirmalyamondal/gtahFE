/****************************************************/
/* 
  Home Page: Order FORM: Step 1
*/
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
    $('#datepickers').datetimepicker({
       timepicker:false,
       format:'d-m-Y',
       yearStart: 2022,
       yearEnd: 2030,
       minDate:'+1970/01/02',//tomorrow is minimum date calendar
       maxDate:'+1970/06/01'//+6 months is maximum date calendar
    });
});

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


