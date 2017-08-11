# HandyNote-Mobile

> HandyNote - Mobile App for iOS and Android

## Prerequisite

1. Make sure cordova, ionic is installed globally
  ``` bash
  # Optional, set npm mirror to speed up npm install in China
  npm config set registry https://registry.npm.taobao.org

  # install cordova & ionic globally
  npm install -g cordova ionic
  ```

2. Make sure all dependencies got installed
  ```bash
  # run under project root folder
  npm install
  ```

## Debug on browser
```bash
ionic serve --lab
```

## Debug on android

1. Make sure android sdk is setup

  - Install Java Development Kit (JDK) 8 or later
  - Install android-sdk and open SDK Manager (by run android from the terminal)
  - Make sure the following are installed:
          Android Platform SDK for your targeted version of Android
          Android SDK build-tools version 19.1.0 or higher
          Android Support Repository (found under "Extras")
  - Set the JAVA_HOME & ANDROID_HOME environment variable, add the Android SDK's tools, tools/bin, and platform-tools directories to PATH

2. Make sure cordova android support is added
```bash
ionic cordova platform add android
```

3. Enable USB debugging and Developer Mode on Android device
```bash
ionic cordova run android --device
```
