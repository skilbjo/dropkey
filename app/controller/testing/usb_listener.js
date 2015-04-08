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