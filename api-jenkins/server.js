var request = require('request');
var jenkinsapi = require('jenkins-api');

var jenkins = jenkinsapi.init("http://cassiano:199400@localhost:8080");

setInterval(function() {
    jenkins.last_build_info('job', function(error, data) {
        if (error){ 
            return console.log('ERROR', error); 
        }

        if (data.building) {
            request.post('http://localhost:8888/on/yellow', function (error, response, body) {
                if (error) {
                    return console.log('Post yellow', error);
                }

                console.log('post yellow success!');
            });
        }

        else if (data.result === 'SUCCESS') {
            request.post('http://localhost:8888/on/green', function (error, response, body) {
                if (error) {
                    return console.log('Post green', error);
                }

                console.log('post green success!');
            });
        }

        else if (data.result === 'FAILURE') {
            request.post('http://localhost:8888/on/red', function (error, response, body) {
                if (error) {
                    return console.log('Post red', error);
                }

                console.log('post red success!');
            });
        }
    });

}, 2000);

