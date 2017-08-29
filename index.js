var _ = require('underscore');
//var client = require('./client');
var server = require('./server');
var options = {
    //'-c': {
    //    handler: client,
    //    usage: 'Use -c to specify port for client to connect'
    //},
    '-p': {
        handler: server,
        usage: 'Use -p to specify port for server to listen'
    }
};

main(process.argv);

function main(argv) {
    var option = getOption(argv);
    if (option) {
        option.handler.apply(null, option.args);
    }
    else {
        _.each(options, function (value, key) {
            console.log(value.usage);
        })
    }
}

function getOption(argv) {
    var option = null;
    _.find(options, function (value, key) {
        var optionIndex = argv.indexOf(key);
        if (optionIndex >= 0) {
            option = {
                name: key,
                handler: value.handler,
                args: argv.slice(optionIndex + 1)
            };
            return true;
        }
        return false;
    });
    return option;
}
