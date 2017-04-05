# Réalité Augmentée

## Installation

How to install Ionic & Cordova environment

1.Install NodeJS
To install Cordova & Ionic, make sure you have Node.js installed, if not run:

  $ sudo apt-get update 
  $ sudo apt-get install nodejs npm
2.Install Cordova
To install it, simply run:

  $ sudo npm install -g cordova
3.Install Ionic
To install it, simply run:

  $ sudo npm install -g ionic
4.Install bower
To install it, simply run:

  $ sudo npm install -g bower
Why bower ?. Bower is a package manager a bit like npm, but for web libraries and we will need it when adding Java Script libraries to our project.

5.Install gulp
To install it, simply run:

  $ sudo npm install -g gulp
Why gulp ?. Gulp is a Java Script build tool that is used by ionic for some building needs for our project.

6.How does it work

6.1.Create the project
Now, we need to create a new Cordova project somewhere on the computer for the code for our app:

  $ ionic start todo blank
That will create a folder called todo in the directory the command was run. Next, we will go into that directory and list the contents. Here is what the outer structure of your Ionic project will look like:

$ cd todo && ls

├── bower.json     // bower dependencies
├── config.xml     // cordova configuration
├── gulpfile.js    // gulp tasks
├── hooks          // custom cordova hooks to execute on specific commands
├── ionic.project  // ionic configuration
├── package.json   // node dependencies
├── platforms      // iOS/Android specific builds will reside here
├── plugins        // where your cordova/ionic plugins will be installed
├── scss           // scss code, which will output to www/css/
└── www            // application - JS code and libs, CSS, images, etc.
								
6.2.Configure Platforms
Now, we need to tell ionic that we want to enable the iOS and Android platforms. Note: unless you are on MacOS, leave out the iOS platform:

$ ionic platform add android 
$ ionic platform add ios
Test it out
Just to make sure the default project worked, try building and running the project (substitute android for ios to build for Ios instead):

$ ionic build android 
$ ionic emulate android
To build and run the project in a real device (substitute android for ios to build for IOS instead):

$ ionic run android
How to run the application

## Usage

After setting up the framework, clone the code reposity, open the terminal and run this :


$ git clone https://github.com/aghileschaouchi/pdp_ra 
Then, go to the folder "pdp_ra/realiteAugmentee/"


$ cd pdp_ra/realiteAugmentee 
Add the android platform to the project, by running


$ ionic platforms add android 
Let's add some line to the code, open the file "realitééAugmentee/platforms/android/AndroidManifest.xml" with any text-editor, and add these lines inside <manifest> ... </manifest>.


<uses-permission android:name="android.permission.CAMERA"/>
<uses-feature android:name="android.hardware.camera" android:required="true"/>
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE"/>
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
<uses-feature android:name="android.hardware.camera.any"/>

Finally you can run the application on your android device, but first you need to activate debugging mode android, and tape the magic words to install the application:


$ ionic run android 
Go to the application setting and allowed the using of the camera.
Or, you can also run it on your computer, by running :


$ ionic serve --address localhost 
Enjoy it.
Hardware and communication parts

Install the Os on Raspberry Pi 3 Model B from a Windows (7 or above) PC.
First of all, download RASPBIAN image form this link, and extract it.

Now insert the SD card (4GB minimum) on your computer, and run Win32DiskImager, if you don't have   it yet, download it

Run Win32DiskImager, select the image that you have extracted earlier, and choose your SD card, from the device box, now click write and wait until the task finish.

Raspbian is now installed on your SD card.

Control the Raspberry with SSH protocol
To connect on Rasbperry with SSH on Windows, type (Windows+x) and go to Network Connections menu , choose any ethernet interface and allow sharing connection by checking the two first radio buttons.

Windows assign automaticly an ip address on the ethernet you have choosen earlier, by default the ip adrress is 192.168.137.1.

Now enter the previous ip address on a SSH client, ( Putty for example), select SSH connection on Port 22.

Enter the login and the password : (pi, raspberry) by default, now you are connected to the Raspberry via SSH.

Connect the Raspberry to internet
First scan Wifi-Network, to get ssid(name of network).

sudo iwlist wlan0 scan
Now open the file sudo nano /etc/wpa-supplicant/wpasupplicant.conf and type :

network={ 
ssid="your_wifi_name"
psk="your_password"
}
Turn on the LED with the Raspberry :
To realize the electronic circuit, please reffer to the link, all step are well described.

Install the RPi.GPIO Framework to manipulate the pinouts ports of the Raspberry

sudo apt -get install python -dev python -rpi. gpio
Server part
Install the Paho Framework that implements the MQTT protocol on the Raspberry

pip install paho-mqtt
In order to use the MQTT protocol in the Ionic app, include this link in the Javascript code :

"https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.js"


## Athors

Aghiles CHOUACHI
Nadhir HOUARI
Anas BELMEKKI
El Mehdi KHACHIR

## Credits

JS-ArUci by jcmellado : https://github.com/jcmellado/js-aruco.
Mosquitto : https://mosquitto.org/.
PAHO MQTT: https://pypi.python.org/pypi/paho-mqtt/1.2.
## License

TODO: Write license
