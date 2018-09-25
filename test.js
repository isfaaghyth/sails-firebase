const admin = require('firebase-admin')

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FCM_PROJECT_ID,
    clientEmail: process.env.FCM_CLIENT_EMAIL,
    privateKey: process.env.FCM_PRIVATE_KEY
  })
})

module.exports = {  

  sendPushNotification: async (inputs, exits) => {
    const token = inputs.deviceId;
    const title = inputs.title;
    const body = inputs.body;
    const url = inputs.url;

    const message = Object.assign({ notification: { title, body }, token, data: {'url': url} })


    const result = await admin.messaging(app).send(message).then((response) => {
      sails.log.info('Successfully sent message:', response);
    })
    .catch((error) => {
      sails.log.warn('Error sending message:', error);
    });
  }
}
