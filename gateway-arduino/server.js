var serialport = require('serialport');
var express = require('express');
var q = require('q');
var app = express();

// -----------------------------------------------------------
// CONFIGURE SERIAL PORT
// -----------------------------------------------------------
var port = new serialport('/dev/ttyACM0', {
  baudRate: 9600,
  dataBits: 8,
  parity: 'none',
  stopBits: 1,
  flowControl: false,
  parser: serialport.parsers.readline("\n")
});

port.on('open', function() {
  console.log('SERIAL PORT OPENED');
  // port.write(new Buffer('1', 'ascii'), function(err, results) {
  //   if (err) {
  //     console.log('Error on write: ', err.message);
  //     return;
  //   }

  //   port.drain(function() {
  //     port.write(new Buffer('0', 'ascii'), function(err) {
  //     if (err) {
  //       console.log('Error on write: ', err.message);
  //       return;
  //     }

  //     port.drain(function() {
  //       console.log('finish write')
  //     });


  //   });
  //   });
  // });

});

port.on('data', function (data) {
  console.log('\nData: ' + data.toString());
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
})


// -----------------------------------------------------------
// CONFIGURE ROUTES
// -----------------------------------------------------------
app.post('/on/:color', function(req, res) {
  var color = req.params.color;

  writeAndDrain(color).then(function() {
    console.log('SUCCESS')
    res.send('SUCCESS');
  }).catch(function(error) {
    res.sendStatus(500).json(error);
    console.log('ERROR TO WRITE ARDUINO', error);
  });

});

function writeAndDrain(color) {
  var deferred = q.defer();

  port.write(new Buffer(color, 'ascii'), function(err, results) {
    if (err) {
      console.log('Error on write: ', err.message);
      deferred.reject(error);
      return;
    }

    port.drain(function(error) {
      if (error) {
        deferred.reject(error);
        return;
      }

      deferred.resolve();
    });
  });

  return deferred.promise;
}

app.listen(8888);
