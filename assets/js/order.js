
$( ".btn-buy" ).on( "click", function() {


  let countVibrationIsolator = $(this).data("id");
  var form = document.getElementById('contact-form');
  sendInblueMail(form[0].value, form[1].value, form[2].value, form[3].value, 'Vibration Isolator Counts: ' + countVibrationIsolator, '');

  // console.log( $( this ).text() );
  // $('#contact-form1').validate();

    //if (validate()) {
        // sendFormData();

        // <a href="mailto:[email protected]?subject=Testing out mailto!&body=This is only a test!">Second Example</a>

       
    //}
    //else {
    //    messageSendError("Warning! Please validate captcha before send new message.");
    //}

    return false;

});


 
