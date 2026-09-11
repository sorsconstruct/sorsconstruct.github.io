/*
$(".btn-buy").on("click", function () {

	$('html, body').animate({
		scrollTop: $('#contact').offset().top + 800
	}, 600);


	$('.box').removeClass('featured');
	$(this).closest('.box').addClass('featured');

	var title = $(this).closest('.box').find('h3').text();
	$('#message').val('Order product: ' + title);

	let countVibrationIsolator = $(this).data("id");
	var form = document.getElementById('contact-form');
	
	submitLog(form[0].value, form[1].value, form[2].value, form[3].value, title + ' ID: ' + countVibrationIsolator, '');

	return false;

});
*/

$(".btn-buy").on("click", function (e) {

    e.preventDefault();

    $('html, body').animate({
        scrollTop: $('#contact').offset().top + 800
    }, 600);

    $('.box').removeClass('featured');
    $(this).closest('.box').addClass('featured');

    var title = $(this).closest('.box').find('h3').text();
    $('#message').val('Order product: ' + title);

    let countVibrationIsolator = $(this).data("id");
    var form = document.getElementById('contact-form');

    // Clear previous validation state
    $('#contact-form input, #contact-form textarea')
        .removeClass('contact-field-invalid');

    var formColumn = $('#contact-form').closest('.col-lg-6');

    formColumn.removeClass('contact-form-invalid');

    // Validate required fields
    var isValid = true;

    $('#contact-form input[required], #contact-form textarea[required]').each(function () {

        var value = $(this).val().trim();

        if (value === '') {
            $(this).addClass('contact-field-invalid');
            isValid = false;
        }
    });

    // Validate email format
    var emailElement = document.getElementById('email');

    if (emailElement.value.trim() !== '' && !emailElement.checkValidity()) {
        $(emailElement).addClass('contact-field-invalid');
        isValid = false;
    }

    // Invalid form
    if (!isValid) {

        formColumn.addClass('contact-form-invalid');

        // Put cursor into the first invalid field
        $('#contact-form .contact-field-invalid').first().focus();

        return false;
    }

    // Form valid
    formColumn.removeClass('contact-form-invalid');

    submitLog(
        form[0].value,
        form[1].value,
        form[2].value,
        form[3].value,
        title + ' ID: ' + countVibrationIsolator,
        ''
    );

    return false;
});


$('#contact-form input, #contact-form textarea').on('input', function () {

    if ($(this).val().trim() !== '' && this.checkValidity()) {
        $(this).removeClass('contact-field-invalid');
    }

    var hasInvalidFields = false;

    $('#contact-form input[required], #contact-form textarea[required]').each(function () {
        if ($(this).val().trim() === '' || !this.checkValidity()) {
            hasInvalidFields = true;
            return false;
        }
    });

    $('#contact-form')
        .closest('.col-lg-6')
        .toggleClass('contact-form-invalid', hasInvalidFields);
});