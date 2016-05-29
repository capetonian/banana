$(document).ready(function() {
  //onsole.log('loading diagnostic...')
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
    'url': getParameterByName('svr') + getParameterByName('col') +
      '/select',
    'data': {
      'wt': 'json',
      'q': '*:*'
    },
    'success': function(data) {

      switch (getParameterByName('lib')) {
        case 'chartist':
          BarChartData();
          switch (getParameterByName('type')) {
            case 'bar':

              new Chartist.Bar('#graph', fs_chartData);
              break;
            case 'donut':
              new Chartist.Donut('#graph', fs_chartData);
              break;
            case 'gauge':
              new Chartist.Gauge('#graph', fs_chartData);
              break;
            case 'line':
              new Chartist.Line('#graph', fs_chartData);
              break;
            case 'pie':
              new Chartist.Pie('#graph', fs_chartData);
              break;
            default:
              break;
          }
          break;
        case 'chartjs':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'cytoscape':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'dimplejs':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'nvd3':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'sigma':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'visjs':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'zeppelin':
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        default:
          new Chartist.Bar('#graph', fs_chartData);
          break;
      }


      //console.log(fs_chartData);
      //new Chartist.Bar('#graph', fs_chartData, {
      //stackBars: true
      //  })
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

function BarChartData() {
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
}
