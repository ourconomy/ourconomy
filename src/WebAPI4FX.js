// for Internet Explorer:
if (!window.location.origin) {
  window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}

const FX_URL = location.origin + "/fxapi";
const URL = location.origin + "/api";

import request from "superagent/lib/client";
import saPrefix from "superagent-prefix";


const prefix = saPrefix(URL);

module.exports = {
  quickEntrySearch: (input, cb) => {
    request
      .get('/search')
      .use(prefix)
      .query({
        text: input.trim()
      })
      .query('bbox=-90,-180,90,180' )
      .set('Accept', 'application/json')
      .end( (err,res) => {
        var ids = [];
        var searchObjects = {};
        if ( res.body.visible.length > 0 ) {
        searchObjects = res.body.visible;
        ids = searchObjects.map(e => e.id);

        request
          .get('/entries/' + ids.join(','))
          .use(prefix)
          .set('Accept', 'application/json')
          .end( (err, res) => {
            var options = [];
            var searchObjects = {};
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
