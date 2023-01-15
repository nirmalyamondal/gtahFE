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