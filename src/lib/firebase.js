import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Vercel 환경 변수(또는 로컬의 .env.local)에서 값들을 가져옵니다.
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// 앱이 중복으로 초기화되는 것을 방지하는 안전장치
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 필요한 Firebase 서비스들을 내보내기(export) 합니다.
export const auth = getAuth(app);
export const db = getFirestore(app);