
$(".btn-buy").on("click", function () {

  let countVibrationIsolator = $(this).data("id");
  var form = document.getElementById('contact-form');

  if (countVibrationIsolator === 7) {
    sendInblueMail(form[0].value, form[1].value, form[2].value, form[3].value, 'Sors Samrt Door Lock: ' + 1, '');
  }
  else {
    sendInblueMail(form[0].value, form[1].value, form[2].value, form[3].value, 'Vibration Isolator Counts: ' + countVibrationIsolator, '');
  }
 
  return false;

});


