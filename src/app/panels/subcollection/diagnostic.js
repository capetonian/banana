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
              ChartistBarChartData(data);
              new Chartist.Bar('#graph', fs_chartData, {
                stackBars: true
              });
              break;
            case 'bar':
              ChartistBarChartData(data);
              new Chartist.Bar('#graph', fs_chartData);
              break;
            case 'donut':
              ChartistPieChartData(data);
              new Chartist.Donut('#graph', fs_chartData, {
                labelInterpolationFnc: function(value) {
                  return Math.round(value / data.series.reduce(sum) *
                    100) + '%';
                }
              });
              break;
            case 'gauge':
              ChartistPieChartData(data);
              new Chartist.Gauge('#graph',
                fs_chartData, {
                  labelInterpolationFnc: function(value) {
                    return Math.round(value / data.series.reduce(
                      sum) * 100) + '%';
                  }
                });
              break;
            case 'line':
              ChartistBarChartData(data);
              new Chartist.Line('#graph',
                fs_chartData);
              break;
            case 'pie':
              ChartistPieChartData(data);
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
          var ctx = document.getElementById("cChart");
          switch (getParameterByName('type')) {
            ChartJSChartData(data);
            case 'bar':
              var chartInstance = new Chart(ctx, {
                type: 'line',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            case 'doughnut':
              var chartInstance = new Chart(ctx, {
                type: 'line',
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
                type: 'line',
                data: fs_chartData,
                options: {
                  responsive: true
                }
              });
              break;
            case 'polararea':
              var chartInstance = new Chart(ctx, {
                type: 'line',
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
          switch (getParameterByName('type')) {
            default: break;
          }
          break;
        case 'dimplejs':
          switch (getParameterByName('type')) {
            case 'area':
              break;
            case 'bar':
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
          break;
        case 'nvd3':
          switch (getParameterByName('type')) {
            case 'bubble':
              break;
            case 'bullet':
              break;
            case 'discrete bar'
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
          switch (getParameterByName('type')) {
            case 'graph':
              break;
            default:
              break;
          }
          break;
        case 'visjs':
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
