import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQPkWHlPnGnR7-lEbh8PzTCpX9Pz7pFrg",
  authDomain: "retrobeats-4b5e2.firebaseapp.com",
  projectId: "retrobeats-4b5e2",
  storageBucket: "retrobeats-4b5e2.firebasestorage.app",
  messagingSenderId: "1055872304496",
  appId: "1:1055872304496:web:d697c207345502ea503bb5",
  measurementId: "G-1Q4DLLDZRL",
  databaseURL: "https://retrobeats-4b5e2-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
