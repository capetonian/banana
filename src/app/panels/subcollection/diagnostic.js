$(document).ready(function() {
  //onsole.log('loading diagnostic...')
  getSolrData();


});

function ParseDate(str) {
  return new Date(str);
}

function TryParseInt(str, defaultValue) {
  var retValue = defaultValue;
  if (str !== null) {
    if (str.length > 0) {
      if (!isNaN(str)) {
        retValue = parseInt(str);
      }
    }
  }
  return retValue;
}

function TryParseFloat(str, defaultValue) {
  var retValue = defaultValue;
  if (str !== null) {
    if (str.length > 0) {
      if (!isNaN(str)) {
        retValue = parseFloat(str);
      }
    }
  }
  return retValue;
}

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

  // ['bar','donut','gauge','line','pie','polar','radar','area','bubble','ring','scatter','step','steparea','graph2d','graph3d','network','timeline','bullet','stacked bar','discrete bar','expanded area']

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
          switch (getParameterByName('type')) {
            case 'stacked bar':
              //console.log(getParameterByName('type'));
              fs_chartData = ChartistBarChartData(data);
              new Chartist.Bar('#graph', fs_chartData, {
                stackBars: true
              });
              break;
            case 'bar':
              fs_chartData = ChartistBarChartData(data);
              new Chartist.Bar('#graph', fs_chartData);
              break;
            case 'donut':
              fs_chartData = ChartistPieChartData(data);
              new Chartist.Donut('#graph', fs_chartData, {
                labelInterpolationFnc: function(value) {
                  return Math.round(value / data.series.reduce(sum) *
                    100) + '%';
                }
              });
              break;
            case 'gauge':
              fs_chartData = ChartistPieChartData(data);
              new Chartist.Gauge('#graph',
                fs_chartData, {
                  labelInterpolationFnc: function(value) {
                    return Math.round(value / data.series.reduce(
                      sum) * 100) + '%';
                  }
                });
              break;
            case 'line':
              fs_chartData = ChartistBarChartData(data);
              new Chartist.Line('#graph',
                fs_chartData);
              break;
            case 'pie':
              fs_chartData = ChartistPieChartData(data);
              new Chartist.Pie('#graph',
                fs_chartData, {
                  labelInterpolationFnc: function(value) {
                    return Math.round(value / data.series.reduce(
                      sum) * 100) + '%';
                  }
                });
              break;
            default:
              break;
          }
          break;
        case 'chartjs':
          var ctx = document.getElementById("cChart").getContext('2d');
          fs_chartData = ChartJSChartData(data, getParameterByName('type'));
          switch (getParameterByName('type')) {
            case 'bar':
              var chartInstance = new Chart(ctx, {
                type: 'bar',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            case 'doughnut':
              var chartInstance = new Chart(ctx, {
                type: 'doughnut',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            case 'line':
              var chartInstance = new Chart(ctx, {
                type: 'line',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            case 'pie':
              var chartInstance = new Chart(ctx, {
                type: 'pie',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            case 'polararea':
              var chartInstance = new Chart(ctx, {
                type: 'polararea',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            default:
              break;
          }
          break;
        case 'cytoscape':
          fs_chartData = CytoScapeChartData(data, getParameterByName(
            'type'));
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'dimplejs':
          var svg = dimple.newSvg("#graph", 800, 600);


          var fs_labels = dimplejsChartLabels(data.response.docs[0],
            getParameterByName(
              'type'));

          fs_chartData = dimplejsChartData(data, getParameterByName(
            'type'));

          var chart = new dimple.chart(svg, fs_chartData);

          switch (getParameterByName('type')) {
            case 'area':
              break;
            case 'bar':
              chart.addCategoryAxis("y", _.reject(fs_labels, function(
                item) {
                return item === "day";
              }));
              var x = chart.addMeasureAxis("x", "day");
              x.addOrderRule("day");
              chart.addSeries(null, dimple.plot.line);
              break;
            case 'bubble':
              break;
            case 'line':
              break;
            case 'pie':
              break;
            case 'ring':
              break;
            case 'scatter':
              break;
            case 'step':
              break;
            case 'step area':
              break;
            default:
              break;
          }

          chart.draw();

          break;
        case 'nvd3':
          fs_chartData = nvd3ChartData(data, getParameterByName('type'));
          switch (getParameterByName('type')) {
            case 'bubble':
              break;
            case 'bullet':
              break;
            case 'discrete bar':
              break;
            case 'expanded area':
              break;
            case 'grouped horizontal bar':
              break;
            case 'grouped multi bar':
              break;
            case 'html indented tree':
              break;
            case 'line bar combo':
              break;
            case 'line cumulative':
              break;
            case 'line with view':
              break;
            case 'pie':
              break;
            case 'scatter':
              console.log('nvd3 scatter');

              break;
            case 'simpleline':
            case 'simple line':
            case 'line':
              break;
            case 'stacked multibar':
              break;
            case 'stacked':
            case 'stacked bar':
              break;
            case 'stream':
              break;
            default:
              break;
          }
          break;
        case 'sigma':
          fs_chartData = sigmajsChartData(data, getParameterByName('type'));
          switch (getParameterByName('type')) {
            case 'graph':
              break;
            default:
              break;
          }
          break;
        case 'visjs':
          fs_chartData = visjsChartData(data, getParameterByName('type'));
          switch (getParameterByName('type')) {
            case 'graph2d':
              break;
            case 'graph3d':
              break;
            case 'network':
              break;
            case 'timeline':
              break;
            default:
              break;
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
