# HandyNote-Mobile

> HandyNote - Mobile App for iOS and Android

## Build Setup

``` bash
# Optional, set npm mirror to speed up npm install in China
npm config set registry https://registry.npm.taobao.org

# install cordova globally
npm install -g cordova

# install dependencies
npm install

# Optional, set HANDYNOTE_WEB_PORT & HANDYNOTE_SERVICE_API
# if not set, will use HANDYNOTE_WEB_PORT=9081, HANDYNOTE_SERVICE_API=http://localhost:3000/api
export HANDYNOTE_WEB_PORT={portnum}
export HANDYNOTE_SERVICE_API=http://IP:Port/api

# serve with hot reload at localhost:9081
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
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
cordova platform add android
```

3. Enable USB debugging and Developer Mode on Android device
```bash
npm run android
```

## Debug on iOS

1. Make sure required app is setup
  - Install xcode, xcode-select and ios-deploy
    ```bash
    xcode-select --install
    npm install -g --unsafe-perm=true ios-deploy
    ```

2. Make sure cordova iOS support is added
```bash
cordova platform add ios
```

3. Generate Xcode project file
  ```bash
  cordova build ios
  ```
  - Open Xcode project file, use apple id to set up a provisioning profile to code sign the app

4. Run the following command and trust the certificate on iOS device
```bash
npm run ios
```
