function dimplejsChartData(data, type) {

  var docsToFlatten = data.response.docs;
  var dataResponse = docsToFlatten;

  var fs_labels = [];


  for (x in docsToFlatten[0]) {
    switch (x) {
      case '_version_':
      case 'id':
        // do nothing
        break;
      default:
      case 'day':
        fs_labels.push(x);
        break;
    }
  }

  for (i in docsToFlatten) {
    for (var j = 0; j < fs_labels.length; j++) {
      if (docsToFlatten[i]['day'][0] != 'primer') {
        lbl = docsToFlatten[i]['day'][0];
      }

      switch (fs_labels[j]) {
        case '_version_':
        case 'id':
          break;
        case 'day':
          // do nothing
          break;
        default:
          if (docsToFlatten[i][fs_labels[j]] !== undefined) {
            if (docsToFlatten[i][fs_labels[j]] != 'primer') {
              dataResponse[i][fs_labels[j]] = docsToFlatten[i][
                fs_labels[j]
              ][0];
              //tmpArray.push(dataResponse[i][fs_chartData.labels[j]][0]);
            }
          } else {
            dataResponse[i][fs_labels[j]] = 0;
            //tmpArray.push(0); // TODO: Null? Undefined??
          }
          break;
      }
    }
  }

  //console.log(docsToFlatten);

  //_.object(_.pluck(data, 'name'), _.pluck(data, 'value'));

  /*  for (var i in docsToFlatten) {

      if (docsToFlatten[i].id !== 'primer') {

        //console.log(docsToFlatten[i]);

        for (var j in docsToFlatten[i]) {
          dataResponse[i][j] = docsToFlatten[i][j][0];
          //console.log(docsToFlatten[i][j][0]);
        }
        //dataResponse.push(_.object(docsToFlatten[i], docsToFlatten[i]));
      }
    }*/

  console.log(dataResponse);
  //console.log(dataResponse);

  return dataResponse;
}
