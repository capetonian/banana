function ChartJSChartData(data) {

  var fs_chartData =
    var fs_chartData = {
      labels: [],
      datasets: [] /* data */
    };

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

    fs_chartData.datasets.push(tmpArray);

  }

  return fs_chartData;
}
