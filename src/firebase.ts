import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const initializedFirebaseApp = initializeApp({
  apiKey: 'AIzaSyBrjFP5uNVeGqVZL-R-UTCtwXvBus_GbcA',
  authDomain: 'vncss-7c78c.firebaseapp.com',
  databaseURL: 'https://vncss-7c78c.firebaseio.com',
  projectId: 'vncss-7c78c',
  storageBucket: 'vncss-7c78c.appspot.com',
  messagingSenderId: '522606716293',
  appId: '1:522606716293:web:3978955311b0e6c72d90ec',
  measurementId: 'G-CPKRQ1YJX8',
});

const messaging = getMessaging(initializedFirebaseApp);

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});
const getTokenFcm = () => {
  return getToken(messaging, {
    vapidKey: 'BCt4vC2LRnOetoTVJ_Bb--gzya6WSiDTQpmVFKNCFxkn4Cf2iqgK2KSe0mnle_8Ff9xrjQC5RqAm68isZPAe2ZQ',
  })
    .then((currentToken) => {
      if (currentToken) {
        return currentToken;
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
};

export { messaging, getTokenFcm };
