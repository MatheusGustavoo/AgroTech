import admin from "firebase-admin";
// import serviceAccount from "path/to/serviceAccountKey.json";
const serviceAccount = process.env.SECRET;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "apiagrotech.appspot.com",
});
