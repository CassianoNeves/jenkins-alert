var serialport = require('serialport');

var port = new serialport('/dev/ttyACM0', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline("\n")
});

port.on('open', function() {
  port.write(new Buffer('1', 'ascii'), function(err, results) {
    if (err) {
      console.log('Error on write: ', err.message);
      return;
    }

    port.drain(function() {
      port.write(new Buffer('0', 'ascii'), function(err) {
      if (err) {
        console.log('Error on write: ', err.message);
        return;
      }

      port.drain(function() {
        console.log('finish write')
      });


    });
    });
  });

});

port.on('data', function (data) {
  console.log('\nData: ' + data.toString());
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})
