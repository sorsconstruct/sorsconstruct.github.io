String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'gi'), replacement);
};

function replaceAll(str, map) {
    for (key in map) {
        str = str.replaceAll(key, map[key]);
    }
    return str;
}

//RegExp.escape = function (string) {
//    return string.replace(/[-\/\\^$*+?.()|[\]{}]/gi, '\\$&');
//};

function sendGMail(name, company, companyAddress, email, subject, message) {
    let encodeUrlX = encodeURI("api/MailController/GMail");
    let dataMail = prepareDataMail(name, company, companyAddress, email, subject, message);
    sendMailBase(dataMail, encodeUrlX);   
}

function sendGMailApi(name, company, companyAddress, email, subject, message) {
    let encodeUrlX = encodeURI("api/MailController/GMailApi");
    let dataMail = prepareDataMail(name, company, companyAddress, email, subject, message);
    sendMailBase(dataMail, encodeUrlX);    
}

function sendAbvMail(name, company, companyAddress, email, subject, message) {        
    let encodeUrlX = encodeURI("api/MailController/AbvMail");
    let dataMail = prepareDataMail(name, company, companyAddress, email, subject, message);
    sendMailBase(dataMail, encodeUrlX);     
}

function sendInblueMail(name, company, companyAddress, email, subject, message) {        
    let encodeUrlX = encodeURI("api/MailController/Sendinblue");
    let dataMail = prepareDataMail(name, company, companyAddress, email, subject, message);

    location.href = 'mailto:sorset@qq.com?subject=Order Request Vibration Isolator!&body='+ dataMail +' Company/Personal Name:..... \r\n<p>Vibration Isolator Counts:..... \r\n<p>Address:..... \r\n<p>Phone:.....';


    sendMailBase(dataMail, encodeUrlX);     
}

function sendMailBase(dataMail, encodeUrlX) {        
    
    $.ajax({
        url: encodeUrlX,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        cache: false,
        async: false,
        dataType: "json",
        processData: false,
        // headers: new Headers({ "Content-type": "application/x-www-form-urlencoded"}),

        data: dataMail,
        success: function (data) {
            messageSendOK();
            // alert("Your message has been sent. Thank you!");
        },
        error: function (xhRequest, ErrorText, thrownError) {
            messageSendError("Message failed");
            // alert("Failed to process correctly, please try again");
        },
        complete: function () {
            // Handle the complete event
            // alert("ajax completed " + cartObject.productID);
        }
    });
}

function prepareDataMail(name, company, companyAddress, email, subject, message) {

    var map = {
        '&': 'and ',
        '[?]': '',
        '/': '',
        '#': '',
        // '|': '#65 ',
        // '[\]': '#66 ',
        // '\\': '#67 ',
        // '^': '#68 ',
        '[?&]': ''
    };

    name = replaceAll(name, map);
    company = replaceAll(company, map);
    companyAddress = replaceAll(companyAddress, map);
    email = replaceAll(email, map);
    subject = replaceAll(subject, map);
    message = replaceAll(message, map);

    let nameData =  name;
    let emailData = email;
    let subjectData = subject;
    let companyData = company;
    let companyAddressData = companyAddress;
    let messageData = message;
       
    let dataMail = JSON.stringify({
            "name": nameData,
            "email": emailData,
            "subject": subjectData,
            "message": messageData,
            "company": companyData,
            "address": companyAddressData
        });

    return dataMail;
}

function sendFormData() {
    try {

        messageSendReset();
        var form = document.getElementById('contact-form');

        // sendGMail(form[0].value, form[1].value, form[2].value, form[3].value, form[4].value, form[5].value);
        // sendGMailApi(form[0].value, form[1].value, form[2].value, form[3].value , form[4].value, form[5].value);
        // sendAbvMail(form[0].value, form[1].value, form[2].value, form[3].value, form[4].value, form[5].value);
        sendInblueMail(form[0].value, form[1].value, form[2].value, form[3].value, '', '');



      
                
    }
    catch (err) {



        document.getElementById("errormessage").innerHTML = err.message;
    }
}

function messageSendOK() {

    var doc = document.getElementById("sendmessage");
    if (doc != null) {
        doc.id = "sendmessage.show";
    }

    doc = document.getElementById("errormessage.show");
    if (doc != null) {
        doc.id = "errormessage";
    }

}

function messageSendReset() {

    var doc = document.getElementById("sendmessage.show");
    if (doc != null) {
        doc.id = "sendmessage";
    }

    doc = document.getElementById("errormessage.show");
    if (doc != null) {
        doc.id = "errormessage";
    }
}

function messageSendError(error) {

    var doc = document.getElementById("sendmessage.show");
    if (doc != null) {
        doc.id = "sendmessage";
    }

    doc = document.getElementById("errormessage.show");
    if (doc != null) {
        doc.innerHTML = error;
        return;
    }

    doc = document.getElementById("errormessage");
    if (doc != null) {
        doc.innerHTML = error;
        doc.id = "errormessage.show";
    }

}

$('#contact-form').submit(function () {
    // $('#contact-form1').validate();

    //if (validate()) {
        sendFormData();

        // <a href="mailto:[email protected]?subject=Testing out mailto!&body=This is only a test!">Second Example</a>

       
    //}
    //else {
    //    messageSendError("Warning! Please validate captcha before send new message.");
    //}

    return false;
});

function validate() {

    // var isValid = $('#contact-form').validate();

    var $captcha = $('#recaptcha'),
        response = grecaptcha.getResponse();

    if (response.length === 0) {
        $('.msg-error').text("reCAPTCHA is mandatory");
        if (!$captcha.hasClass("error")) {
            $captcha.addClass("error");

            return false;
        }
    } else {
        $('.msg-error').text('');
        $captcha.removeClass("error");
        // alert('reCAPTCHA marked');

        return true;
    }
}
