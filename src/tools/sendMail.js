const sgMail = require('@sendgrid/mail');

function sendMail(email){

    console.log(email);
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
    to: email,
    from: 'hernanhgarcia@protonmail.com', 
    subject: 'Bienvenido a la API de Disney',
    text: 'Bienvenido',
    html: '<strong>Bienvenido</strong>',
    };

    sgMail
    .send(msg)
    .then(() => {}, error => {
        console.error(error);

        if (error.response) {
        console.error(error.response.body)
        }
    });
}

module.exports = sendMail;