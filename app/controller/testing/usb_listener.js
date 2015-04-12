// https://www.npmjs.com/package/usb-detection
// https://github.com/voodootikigod/node-serialport
// https://github.com/sidorares/node-dbus

var dbus = require('dbus-native');
var bus = dbus.systemBus();
udservice = bus.getService('org.freedesktop.UDisks');
udservice.getInterface(
    '/org/freedesktop/UDisks',
    'org.freedesktop.UDisks',
    function(err, ud) {
      ud.on('DeviceAdded', function(deviceObjectPath) {
        console.log('DeviceAdded', deviceObjectPath);
      });
    }
  );