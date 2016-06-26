function dimplejsChartLabels(data, type) {
  var fs_labels = [];
  for (x in data) {
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
  return fs_labels;
}

function dimplejsChartData(data, type) {
  var docsToFlatten = data.response.docs;
  var dataResponse = docsToFlatten;

  var fs_labels = dimplejsChartLabels(docsToFlatten[0]);

  for (i in docsToFlatten) {

    for (var j = 0; j < fs_labels.length; j++) {

      //console.log(i);
      //console.log(docsToFlatten[i]);
      //console.log(docsToFlatten[i]['day']);

      if (docsToFlatten[i]['day'][0] != 'primer') {
        lbl = docsToFlatten[i]['day'][0];
      }

      switch (fs_labels[j]) {
        case '_version_':
        case 'id':
          break;
          //case 'day':
          // do nothing
          //break;
        default:
          if (docsToFlatten[i][fs_labels[j]] !== undefined) {
            if (docsToFlatten[i][fs_labels[j]] != 'primer') {

              var v = docsToFlatten[i][
                fs_labels[j]
              ][0];

              if (fs_labels[j] == "day") {
                v = ParseDate(v);
              }

              dataResponse[i][fs_labels[j]] = TryParseFloat(v, v);

            }
          } else {
            dataResponse[i][fs_labels[j]] = 0;

          }
          break;
      }
    }
  }

  dataResponse = _.reject(dataResponse, function(item) {
    return item.id === "primer"; // or some complex logic
  });

  console.log(dataResponse);



  return dataResponse;


}
