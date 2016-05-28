$(document).ready(function() {
  console.log('loading diagnostic...')
  getSolrData();


});

var fs_chartData = {
  labels: [],
  series: []
};



function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}


function getSolrData() {
  //http://hdp24.fullstack.co.za:8983/solr/social_solr/select?q=*:*&wt=json
  $.ajax({
    'url': 'http://hdp24.fullstack.co.za:8983/solr/social_solr/select',
    'data': {
      'wt': 'json',
      'q': '*:*'
    },
    'success': function(data) {
      console.log(data.response.docs);
      for (i in data.response.docs) {

        //console.log(i);

        /* $('#content').html($('#content').html() + "<BR>" + JSON.stringify(
          data.response.docs[i], null, 2)); */



        if (i == 0) { // First row
          for (x in data.response.docs[0]) {

            switch (x) {
              case '_version_':
              case 'id':
                // do nothing
                break;
              default:
                console.log(x);
                fs_chartData.labels.push(x);
                break;
            }

          }

        }

        var tmpArray = [];

        /*for (var key in data.response.docs[i]) {
          if (data.response.docs[i].hasOwnProperty(key)) {
            switch (key) {
              case '_version_':
              case 'id':
                // do nothing
                break;
              default:
                console.log(x);
                tmpArray.push(data.response.docs[i][key][0]);
                break;
            }
          }
        }*/

        for (var j = 0; j < fs_chartData.labels.length; j++) {
          switch (fs_chartData.labels[j]) {
            case '_version_':
            case 'id':
              // do nothing
              break;
            default:
              if (data.response.docs[i][fs_chartData.labels[j]] !==
                undefined) {
                tmpArray.push(data.response.docs[i][fs_chartData.labels[j]]
                  [0]);
              } else {
                tmpArray.push(0); // TODO: Null? Undefined??
              }

              break;
          }
        }

        fs_chartData.series.push(tmpArray);

      }
      console.log(fs_chartData);
      new Chartist.Bar('#graph', fs_chartData, {
          //stackBars: true
        })
        /*.on('draw', function(data) {
                if (data.type === 'bar') {
                  data.element.attr({
                    style: 'stroke-width: 50px'
                  });
                }
              })*/
      ;
    },
    'dataType': 'jsonp',
    'jsonp': 'json.wrf'
  });
}
