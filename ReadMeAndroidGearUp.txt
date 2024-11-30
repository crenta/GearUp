Step 1:
sudo apt-get update

Step 2:
***(we are downloading version 18  of react native -- its more stable, but you will get warnings)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

Step 3:
mkdir GearUp
cd GearUp

Step 4:
***(using blank template because it gives us less default stuff we will not need)
npx create-expo-app CarServiceApp --template blank
cd CarServiceApp
npm install react-native-maps
npm install google-map-react

npm install --save-dev @react-native-community/cli
npm install react-native react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons @react-native-masked-view/masked-view

sudo apt install android-tools-adb




npm install @react-navigation/native

npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons

npm install -g expo-cli

expo install react-native-image-picker
npm install react-native-image-picker


//add car.png to assets


npm install @react-navigation/native
npm install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-reanimated react-native-vector-icons
npm install @react-navigation/bottom-tabs

npm install expo-system-ui

-------------------------------------------------------------------------------------------------------------------------------------------------
//at somepoint you need to download android studio... i dont have the steps for that

nano ~/.bashrc
Add the following lines at the end of the file (adjust the path if your SDK is located somewhere else):

export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

Apply the changes:
Save the file and run:
source ~/.bashrc


Check the environment variable: Run the following command to verify if ANDROID_HOME is correctly set:
echo $ANDROID_HOME
It should output something like /home/chris/Android/Sdk

Check the Android SDK version: Ensure that the SDK tools are correctly installed by running:
sdkmanager --version

sudo apt install google-android-cmdline-tools-1.0-installer

Install Required SDK Packages
Once sdkmanager is available, run the following to install essential SDK packages:
sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"

try:
npx expo run:android

Install Required SDK Tools:
sdkmanager "platform-tools" "platforms;android-30" "build-tools;30.0.3"

Set Environment Variables:

Update your shell profile (~/.bashrc, ~/.zshrc, etc.) with the following:
export ANDROID_HOME=/usr/lib/android-sdk
export PATH=$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools:$PATH

Apply changes by running:
source ~/.bashrc

Test SDK Manager Installation:
Run:
adb --version

sdkmanager --update
sdkmanager "platform-tools" "emulator"
sudo sdkmanager --licenses
sudo sdkmanager --update

If that doesn't resolve the issues, we may need to correct the build-tools location manually. The typical fix would be:
sudo mv /usr/lib/android-sdk/build-tools/debian /usr/lib/android-sdk/build-tools/29.0.3

First, let's set the correct ANDROID_HOME. Add these lines to your ~/.bashrc file:
export ANDROID_HOME=/usr/lib/android-sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/platform-tools

Then reload your shell configuration:
source ~/.bashrc

Install an Android system image if you haven't already:
sdkmanager "system-images;android-34;google_apis;x86_64"

errors?
sudo mv /usr/lib/android-sdk/build-tools/debian /usr/lib/android-sdk/build-tools/29.0.3
sudo chown -R $USER:$USER /usr/lib/android-sdk
sdkmanager "system-images;android-34;google_apis;x86_64"


avdmanager create avd -n expo_device -k "system-images;android-34;google_apis;x86_64"
emulator -avd expo_device

sdkmanager "platforms;android-34"


more errors?
echo $ANDROID_HOME
echo $ANDROID_SDK_ROOT
If ANDROID_SDK_ROOT isn't set, add it to your ~/.bashrc:
export ANDROID_SDK_ROOT=/usr/lib/android-sdk
source ~/.bashrc

Then try starting the emulator again:
emulator -avd expo_device

sudo apt-get install libpulse0
emulator -avd expo_device


You need to add your user to the KVM group to use hardware acceleration for the Android emulator. Let's do this step by step:

Add yourself to the KVM group:
sudo gpasswd -a $USER kvm
ls -l /dev/kvm

//close/reopen or logout/in
groups (type this commands in and ensure you see kvm in there)
emulator -avd expo_device

sudo apt update
sudo apt install openjdk-17-jdk
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
source ~/.bashrc
npx expo run:android
npm install @react-native-picker/picker

npx expo install react-native-maps
npx expo install expo-image-picker
npx expo install expo-file-system
npx expo install expo-image-picker expo-location

npx expo prebuild
npx expo run:android


