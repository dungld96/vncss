/* eslint-disable no-console */
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Registration successful, scope is:', registration.scope);
      })
      .catch((err) => {
        console.log('Service worker registration failed, error:', err);
        registerServiceWorker();
      });
  }
};

const unRegisterServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
};

export { registerServiceWorker, unRegisterServiceWorker };
