import { getApp, getApps, initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

let firebaseApp;

export const getFirebaseApp = () => {
  if (firebaseApp) {
    return firebaseApp;
  }

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyC9EGvNYArEW-mo4CLr_EPilLx9_wiwC5g",
    authDomain: "studentattendance-29921.firebaseapp.com",
    databaseURL:
      "https://studentattendance-29921-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "studentattendance-29921",
    storageBucket: "studentattendance-29921.appspot.com",
    messagingSenderId: "819689752365",
    appId: "1:819689752365:web:0309917199b461f20975a4",
    measurementId: "G-FVFFJ5F62T",
  };

  // Check if there's an existing app, if not, initialize one
  const existingApp = getApps().length > 0 ? getApp() : null;
  const app = existingApp || initializeApp(firebaseConfig);

  // Initialize Firebase Authentication with React Native AsyncStorage
  if (!existingApp) {
    initializeAuth(app, {
      persistence: getReactNativePersistence(ReactNativeAsyncStorage),
    });
  }

  firebaseApp = app;

  return app;
};
