/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: 'AIzaSyBrjFP5uNVeGqVZL-R-UTCtwXvBus_GbcA',
  authDomain: 'vncss-7c78c.firebaseapp.com',
  databaseURL: 'https://vncss-7c78c.firebaseio.com',
  projectId: 'vncss-7c78c',
  storageBucket: 'vncss-7c78c.appspot.com',
  messagingSenderId: '522606716293',
  appId: '1:522606716293:web:3978955311b0e6c72d90ec',
  measurementId: 'G-CPKRQ1YJX8',
});

const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(function (payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: 'window',
//       includeUncontrolled: true,
//     })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return registration.showNotification('');
//     });
//   return promiseChain;
// });

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url === '/' && 'focus' in client) return client.focus();
        }
        if (clients.openWindow) return clients.openWindow('/');
      })
  );
});
