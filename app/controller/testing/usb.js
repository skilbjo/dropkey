var usb = require('usb'),
	connected = usb.getDeviceList();

console.log( JSON.stringify(connected)

);