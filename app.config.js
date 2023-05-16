import  'dotenv/config';
import { proc } from 'react-native-reanimated';
export default{
  "expo": {
    "name": "beesapp",
    "slug": "beesapp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon2.jpg",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/icon2.jpg",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      extra:{
        apiKey: "AIzaSyBDxWaOapX03TXYUWDrxlJ3caiApknK3o0",
        authDomain: "beekeeping-8f7e6.firebaseapp.com",
        projectId: "beekeeping-8f7e6",
        storageBucket: "beekeeping-8f7e6.appspot.com",
        messagingSenderId: "43486883566",
        appId: "1:43486883566:web:b512c45d93113b91548dff",
        measurementId: "G-SZ0PL1ERZG"
      }
    }
  }
}
