/* This code allows to get the content of decoders. 
 * The received decoders are made suitable for graylog after another process.
 */

var jsdom = require("jsdom");
var request = require("request");
const fs = require('fs');

var list = ["africa", "antarctica", "asia", "australia-oceania", "central-america", "europe", "north-america", "south-america"]

for (let j = 0; j < list.length; j++) {

    url = "https://download.geofabrik.de/" + list[j] + ".html"

    // content of each file under decoder is retrieved
    request(url, function(error, response, body) {
        var results = new jsdom.JSDOM(body);

        console.log(results.window.document.querySelectorAll('a'))

        var countries = results.window.document.querySelectorAll('a')

        for (var i = 0; i < countries.length; i++) {
            var link = countries[i].getAttribute('href');
            if (link.includes(list[i] + '/')) {

                fs.appendFile(list[j], "wget https://download.geofabrik.de/" + link[i], function(err, data) {
                    if (err) throw err;
                    console.log(link[i]);
                    console.log(list[j])

                });
            }
        }
    });

}
