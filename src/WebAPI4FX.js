// for Internet Explorer:
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

const FX_URL = location.origin + "/fxapi";
const URL = location.origin + "/api";

import request from "superagent/lib/client";
import saPrefix from "superagent-prefix";


var prefix = "";

module.exports = {
  quickSearch: (input, cb, goal) => {
    var bbox = "";
    if ( goal == "entry" ) {
      bbox = "-90,-180,90,180";
      prefix = saPrefix(URL);
    } else {
      bbox = "-1,-1,1,1";
      prefix = saPrefix(FX_URL);
    }

    request
      .get('/search')
      .use(prefix)
      .query({
        text: input.trim()
      })
      .query('bbox=' + bbox)
      .set('Accept', 'application/json')
      .end( (err,res) => {
        var ids = [];
        var getPath = "";
        var searchObjects = {};
        if ( goal == "entry" && res.body.visible.length > 0 ) {
          getPath = '/entries/';
          searchObjects = res.body.visible;
          ids = searchObjects.map(e => e.id);
        } else if (goal == "effect" && res.body.effects.length > 0 ) {
          getPath = '/effects/';
          searchObjects = res.body.effects;
          ids = searchObjects
        } else {
          cb(err, {options: []});
        }

        if ( ids.length > 0 ) {
          request
            .get(getPath + ids.join(','))
            .use(prefix)
            .set('Accept', 'application/json')
            .end( (err, res) => {
              var options = [];
              var searchObjects = {}; //re-initialize searchObjects
              searchObjects = res.body;
              Object.keys(searchObjects).forEach( key => {
                var optionLine = {
                  label: searchObjects[key].title,
                  value: searchObjects[key].id
                };
                options.push(optionLine);
                });
              var newres = {options: options};
              cb(err, newres);
            });
        }
      });
  }

};
