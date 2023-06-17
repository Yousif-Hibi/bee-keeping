import "dotenv/config";
import { proc } from "react-native-reanimated";
export default {
  expo: {
    name: "beesapp",
    slug: "beesapp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon2.jpg",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/icon2.jpg",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      extra: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
      },
    },
  },
};
