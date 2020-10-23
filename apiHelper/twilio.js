const textSender = (body, receiver) => {

  const accountSid = process.env.accountSid; // Your Account SID from www.twilio.com/console
  const authToken = process.env.authToken;   // Your Auth Token from www.twilio.com/console
  const from = process.env.fromNumber
  const client = require('twilio')(accountSid, authToken);
  return client.messages.create({ body, from, receiver })
    .then(res => console.log(res.body));
}

const textToAdmin = (orders_id) => {
  const adminNumber = process.env.adminNumber;
  let message = `order number ${orders_id} is placed. Please check the Admin side to check the order!`;
  return textSender(message, adminNumber);
}

// client.messages.create({
//   body: 'Hello from Node',
//   to: '+12345678901',  // Text this number
//   from: '+12345678901' // From a valid Twilio number
// })
//   .then((message) => console.log(message.sid));


module.exports = { textSender, textextToAdmin };

