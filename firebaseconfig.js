const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

if (!admin.apps.length) {
  let serviceAccount = null;
  const databaseURL = process.env.FIREBASE_DATABASE_URL || "https://diario-b165d-default-rtdb.firebaseio.com";
  
  // Intento 1: Leer desde archivo local
  const saPath = path.join(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(saPath)) {
    try {
      serviceAccount = require(saPath);
      console.log('[firebaseconfig] Cargando serviceAccount desde archivo local');
    } catch (err) {
      console.error('[firebaseconfig] Error leyendo serviceAccountKey.json:', err.message);
    }
  }
  
  // Intento 2: Leer desde variable de entorno (FIREBASE_SERVICE_ACCOUNT)
  if (!serviceAccount && process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      console.log('[firebaseconfig] Cargando serviceAccount desde variable de entorno FIREBASE_SERVICE_ACCOUNT');
    } catch (err) {
      console.error('[firebaseconfig] Error parseando FIREBASE_SERVICE_ACCOUNT:', err.message);
    }
  }
  
  // Intento 3: Usar applicationDefault (si está configurado GOOGLE_APPLICATION_CREDENTIALS)
  if (!serviceAccount && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        databaseURL
      });
      console.log('[firebaseconfig] Inicializando con GOOGLE_APPLICATION_CREDENTIALS');
    } catch (err) {
      console.error('[firebaseconfig] Error con applicationDefault:', err.message);
      throw err;
    }
  } else if (serviceAccount) {
    // Inicializar con serviceAccount (archivo o variable)
    try {
      console.log('[firebaseconfig] Inicializando admin con diario-b165d. databaseURL=', databaseURL);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL
      });
    } catch (err) {
      console.error('[firebaseconfig] Error inicializando con serviceAccount:', err.message);
      throw err;
    }
  } else {
    throw new Error('No se encontró serviceAccountKey.json, FIREBASE_SERVICE_ACCOUNT ni GOOGLE_APPLICATION_CREDENTIALS');
  }
}

const db = admin.database();

module.exports = { admin, db };
