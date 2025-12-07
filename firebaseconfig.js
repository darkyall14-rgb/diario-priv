const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

if (!admin.apps.length) {
  const saPath = path.join(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(saPath)) {
    try {
      const serviceAccount = require(saPath);
      const databaseURL = process.env.FIREBASE_DATABASE_URL || "https://diario-b165d-default-rtdb.firebaseio.com";
      console.log('[firebaseconfig] Inicializando admin con diario-b165d. databaseURL=', databaseURL);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL
      });
    } catch (err) {
      console.error('[firebaseconfig] Error inicializando con serviceAccount:', err.message);
      throw err;
    }
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    throw new Error('No se encontró serviceAccountKey.json ni GOOGLE_APPLICATION_CREDENTIALS');
  }
}

const db = admin.database();

module.exports = { admin, db };
