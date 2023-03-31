/* This code allows to get the content of decoders. 
 * The received decoders are made suitable for graylog after another process.
 */

var jsdom = require("jsdom");
var request = require("request");
const fs = require('fs');

var list = ["antarctica", "asia", "australia-oceania", "central-america", "europe", "north-america", "south-america"]

    

function file(con){
    
    url = "https://download.geofabrik.de/"+con+".html"

        // content of each file under decoder is retrieved
        request(url, function(error, response, body) {
            var results = new jsdom.JSDOM(body);
    
            var countries = results.window.document.querySelectorAll('a')
            for (var i = 0; i < countries.length; i++) {
                var link = countries[i].getAttribute('href');
                if (link.includes(con+"/") && link.includes('.osm.pbf')) {
                    var command = "wget https://download.geofabrik.de/" + link
    
                    console.log(command)
                    fs.appendFile("wget.sh",command+ "\n", function(err, data) {
                        if (err) throw err;
    
                    });
    
                }
            }
        });


}

file("antarctica")
file("asia")
file("australia-oceania")
file("central-america")
file("europe")
file("north-america")
file("south-america")

