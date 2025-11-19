
$(".btn-buy").on("click", function () {

  $('html, body').animate({
    scrollTop: $('#footer').offset().top
  }, 600);


  $('.box').removeClass('featured');
  $(this).closest('.box').addClass('featured');

  var title = $(this).closest('.box').find('h3').text();
  $('#message').val('Order product: ' + title);

  let countVibrationIsolator = $(this).data("id");
  var form = document.getElementById('contact-form');


  sendInblueMail(form[0].value, form[1].value, form[2].value, form[3].value, title+' ID: '+ countVibrationIsolator, '');

  // sendInblueMail(form[0].value, form[1].value, form[2].value, form[3].value, title, countVibrationIsolator);



  return false;

});


