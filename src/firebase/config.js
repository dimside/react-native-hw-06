// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from 'firebase/app';
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCk3LkijWB9VLskmM9mR8X_Pk7SJ4gl4UY",
  authDomain: "react-native-project-bf4a9.firebaseapp.com",
  databaseURL: "https://react-native-project-bf4a9-default-rtdb.firebaseio.com",
  projectId: "react-native-project-bf4a9",
  storageBucket: "react-native-project-bf4a9.appspot.com",
  messagingSenderId: "485475475086",
  appId: "1:485475475086:web:bd108a2fd93aaa755e73df",
  measurementId: "G-T48MWTSBL3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);