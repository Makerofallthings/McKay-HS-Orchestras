import {getApps,initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

// Firebase web configuration is public. Access is enforced by Firestore rules.
const config={apiKey:'AIzaSyCL3kph16nH3GVyX0hIcrpHWpXX1t6Idy4',authDomain:'mckay-orchestras.firebaseapp.com',projectId:'mckay-orchestras',storageBucket:'mckay-orchestras.firebasestorage.app',messagingSenderId:'40681568411',appId:'1:40681568411:web:d37c5cd5dd0bfb9f662e3e'};
export function firebaseServices(){const app=getApps().find(app=>app.name==='mckay-calendar')??initializeApp(config,'mckay-calendar');return {auth:getAuth(app),db:getFirestore(app)}}
