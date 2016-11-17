var time = 0;

var job = setInterval(function() {
    time++;
    
    console.log('Job: ' + time + '%');

    if (time === 30) {
        throw new Error("Build Error!");
    }
}, 1000);