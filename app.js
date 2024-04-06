const express = require("express");
const app = express();
const webpush = require('web-push');
const mongo = require('mongoose');
const nodemailer = require('nodemailer');
const mqtt = require('mqtt');
const cors = require("cors")

var transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 405,
  secure: true,
  logger: true,
  debug: true, 
  auth: {
    user: 'anandjethava2004@gmail.com',
    pass: 'qbvyxkiyyeyycnpq'
  },
  tls: {
    rejectUnauthorized: true
  }
});

var mailOptions = {
  from: 'anandjethava2004@gmail.com',
  to: 'anandjethava538@gmail.com',
  subject: 'Alert.......!',
  text: 'Alert... sensor is high....!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

async function sendNotifications(messageData) {
    try {
      const subscriptions = await Subscription.find();
      const validSubscriptions = [];
  
      // Filter out invalid subscriptions
      for (const sub of subscriptions) {
        try {
          // Attempt to send a test notification to check subscription status
          validSubscriptions.push(sub);
        } catch (err) {
          // If sending notification fails, assume subscription is invalid
          console.log(`Subscription ${sub._id} is no longer valid: ${err.message}`);
          // Optionally, you can remove the invalid subscription from the database
          // await Subscription.findByIdAndDelete(sub._id);
        }
      }
  
      // Send notifications only to valid subscriptions
      for (const sub of validSubscriptions) {
        try {
          await webpush.sendNotification(sub, messageData);
        } catch (err) {
          console.error(`Failed to send notification to ${sub._id}: ${err.message}`);
          // Handle error (e.g., retry, log, etc.)
        }
      }
    } catch (err) {
      console.error(`Error sending notifications: ${err.message}`);
      // Handle error appropriately
    }
  }

const broker = "mqtt://localhost";

const topics = [
  "test0/sensors/rtd1",
  "test0/sensors/rtd2",
  "test0/sensors/rtd3",
  "test0/sensors/tc",
  "test0/sensors/curr1",
  "test0/sensors/curr2",
  "test0/sensors/dcv",
];
let message1, message2, message3, message4, message5, message6, message7;

const client1 = mqtt.connect(broker);

client1.on("connect", () => {
  console.log("connected mqtt broker");
  client1.subscribe(topics, (err) => {
    if (err) {
      console.error("Error subscribing to topics:", err);
    }
  });
});

client1.on("message", (topic, message) => {
    // console.log('received topic : ', topic);
    // console.log('Message: ', message);
    let receivedMessage, numberstr, intvalue, receivedMessage1, receivedMessage2, receivedMessage3, receivedMessage4, receivedMessage5, receivedMessage6;
    switch (topic) {
      case "test0/sensors/rtd1":
        message1 = message.toString();
        numberstr = message1.match(/\d+/)[0];
        intvalue = parseInt(numberstr);
        receivedMessage = intvalue;
        if ( receivedMessage  > 90 ) {
          sendNotifications(`RTD1 is over`);
          var mailOptions = {
            from: 'anandjethava2004@gmail.com',
            to: 'anandjethava538@gmail.com',
            subject: 'Alert.......!',
            text: 'Alert... rtd1 is high....!'
          };
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        };
        console.log('rtd1 : ' + receivedMessage);
        break;
      case "test0/sensors/rtd2":
        message2 = message.toString();
        let numberstr1 = message2.match(/\d+/)[0];
        let intvalue1 = parseInt(numberstr1);
        receivedMessage1 = intvalue1;
        if ( receivedMessage1  > 90 ) {
            sendNotifications(`RTD2 is over`);
            var mailOptions = {
              from: 'anandjethava2004@gmail.com',
              to: 'anandjethava538@gmail.com',
              subject: 'Alert.......!',
              text: 'Alert... rtd2 is high....!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
        };
        console.log('rtd2 : ' + receivedMessage1);
        break;
      case "test0/sensors/rtd3":
        message3 = message.toString();
        let numberstr2 = message3.match(/\d+/)[0];
        let intvalue2 = parseInt(numberstr2);
        receivedMessage2 = intvalue2;
        if ( receivedMessage2  > 90 ) {
            sendNotifications(`RTD3 is over`);
            var mailOptions = {
              from: 'anandjethava2004@gmail.com',
              to: 'anandjethava538@gmail.com',
              subject: 'Alert.......!',
              text: 'Alert... rtd3 is high....!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
        };
        console.log('rtd3 : ' + receivedMessage2);
        break;
      case "test0/sensors/tc":
        message4 = message.toString();
        let numberstr3 = message4.match(/\d+/)[0];
        let intvalue3 = parseInt(numberstr3);
        receivedMessage3 = intvalue3;
        if ( receivedMessage3  > 90 ) {
            sendNotifications(`TC is over`);
            var mailOptions = {
              from: 'anandjethava2004@gmail.com',
              to: 'anandjethava538@gmail.com',
              subject: 'Alert.......!',
              text: 'Alert... tc is high....!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          };
        console.log('tc : ' +receivedMessage3);
        break;
      case "test0/sensors/curr1":
        message5 = message.toString();
        let numberstr4 = message5.match(/\d+/)[0];
        let intvalue4 = parseInt(numberstr4);
        receivedMessage4 = intvalue4;
        if ( receivedMessage4  > 90 ) {
            sendNotifications(`CURR1 is over`);
            var mailOptions = {
              from: 'anandjethava2004@gmail.com',
              to: 'anandjethava538@gmail.com',
              subject: 'Alert.......!',
              text: 'Alert... curr1 is high....!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
        };
        console.log('curr1 : ' +receivedMessage4);
        break;
      case "test0/sensors/curr2":
        message6 = message.toString();
        let numberstr5 = message6.match(/\d+/)[0];
        let intvalue5 = parseInt(numberstr5);
        receivedMessage5 = intvalue5;
        if ( receivedMessage5  > 90 ) {
            sendNotifications(`CURR2 is over`);
            var mailOptions = {
              from: 'anandjethava2004@gmail.com',
              to: 'anandjethava538@gmail.com',
              subject: 'Alert.......!',
              text: 'Alert... curr2 is high....!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
        };
        console.log('curr2 : ' +receivedMessage5);
        break;
      case "test0/sensors/dcv":
        message7 = message.toString();
        let numberstr6 = message7.match(/\d+/)[0];
        let intvalue6 = parseInt(numberstr6);
        receivedMessage6 = intvalue6;
        if ( receivedMessage6  > 90 ) {
            sendNotifications(`DCV is over`);
            var mailOptions = {
              from: 'anandjethava2004@gmail.com',
              to: 'anandjethava538@gmail.com',
              subject: 'Alert.......!',
              text: 'Alert... dcv is high....!'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });
          };
        console.log('dcv : ' + receivedMessage6);
        break;
      default:
        return;
    };
});    

const port = 3000;

mongo.connect('mongodb+srv://anandjethava538:Anand123@cluster0.ujbaulb.mongodb.net/Notification')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


const subscriptionSchema = new mongo.Schema({
    endpoint: String,
    keys: {
        auth: String,
        p256dh: String
    }
});
    
const Subscription = mongo.model('Subscription', subscriptionSchema);
    

const apiKeys = {
    publicKey: "BDyotF8mi37TNaFBxRwLGApQPs2rXNSfFFMFN3E-eC3yfXfUs3huJDN1NOH4iX5Or9JjvRT9wQYO4uOYaDj2lT8",
    privateKey: "7JJ5INkqP_9YztXLLc5DvHEbR34jkh31bvz-IC96lFk"
}

webpush.setVapidDetails(
    'mailto: example@example.com',
    apiKeys.publicKey,
    apiKeys.privateKey
)

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world");
})


sendNotifications("Alert....!")

app.post("/save-subscription", async (req, res) => {
    try {
        const subscription = new Subscription(req.body);
        await subscription.save();
        res.json({ status: "Success", message: "Subscription saved!" });
    } catch (err) {
        res.status(500).json({ status: "Error", message: err.message });
    }
});

app.get("/send-notification", async (req, res) => {
    try {
        const subscriptions = await Subscription.find();
        const validSubscriptions = [];

        // Filter out invalid subscriptions
        for (const sub of subscriptions) {
            try {
                // Attempt to send a test notification to check subscription status
                await webpush.sendNotification(sub, "Checking subscription status");
                validSubscriptions.push(sub);
            } catch (err) {
                // If sending notification fails, assume subscription is invalid
                console.log(`Subscription ${sub._id} is no longer valid: ${err.message}`);
                // Optionally, you can remove the invalid subscription from the database
                // await Subscription.findByIdAndDelete(sub._id);
            }
        }

        // Send notifications only to valid subscriptions
        for (const sub of validSubscriptions) {
            try {
                await webpush.sendNotification(sub, "Hello world");
            } catch (err) {
                console.error(`Failed to send notification to ${sub._id}: ${err.message}`);
                // Handle error (e.g., retry, log, etc.)
            }
        }

        res.json({ status: "Success", message: "Notifications sent successfully" });
    } catch (err) {
        console.error(`Error sending notifications: ${err.message}`);
        res.status(500).json({ status: "Error", message: err.message });
    };
});

app.listen(port, () => {
    console.log("Server running on port 3000!");
})