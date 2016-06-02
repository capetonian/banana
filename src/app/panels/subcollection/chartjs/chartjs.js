function ChartJSChartData(data, type) {

  if (type === undefined) {
    type = 'line';
  }

  var fs_chartData = {
    labels: [],
    datasets: [] /* data */
  };

  var fs_labels = [];

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
          case 'day':
            fs_labels.push(x);
            break;
          default:
            fs_chartData.labels.push(x);
            break;
        }

      }

    }

    var tmpArray = [];
    var lbl = "";

    for (var j = 0; j < fs_chartData.labels.length; j++) {
      if (data.response.docs[i]['day'][0] != 'primer') {
        lbl = data.response.docs[i]['day'][0];
      }

      switch (fs_chartData.labels[j]) {
        case '_version_':
        case 'id':
          break;
        case 'day':
          // do nothing
          break;
        default:
          if (data.response.docs[i][fs_chartData.labels[j]] !== undefined) {
            if (data.response.docs[i][fs_chartData.labels[j]] != 'primer') {
              tmpArray.push(data.response.docs[i][fs_chartData.labels[j]][0]);
            }
          } else {
            tmpArray.push(0); // TODO: Null? Undefined??
          }
          break;
      }
    }

    if (tmpArray.length > 0) {
      var borderColor = nextColorScalar()
      fs_chartData.datasets.push({
        label: lbl,
        data: tmpArray,
        fill: false,
        //strokeColor: nextColor(tmpArray.length),
        borderColor: borderColor,
        backgroundColor: borderColor,
        //backgroundColor: nextColor(tmpArray.length),
        borderWidth: 1,
        //hoverBackgroundColor: nextColor(tmpArray.length), //"rgba(255,99,132,0.4)",
        //hoverBorderColor: nextColor(tmpArray.length), //"rgba(255,99,132,1)"
        /*options: {

        }*/
      });
    }
  }

  console.log(fs_chartData);

  return fs_chartData;
}

var nxtColorInt = -1;

function nextColorScalar() {


  if (nxtColorInt > 3) {
    nxtColorInt = 0;
  } else {
    nxtColorInt++;
  }

  //var colors = ["#FF530D", "#E82C0C", "#FF0000", "#E80C7A", "#FF0DFF"];
  var colors = ["#42727F", "#D1F5FF", "#84E4FF", "#687A7F", "#6AB6CC"];
  return colors[nxtColorInt];

}

function nextColor(arraySize) {

  var retArray = [];

  while (arraySize > 0) {

    if (nxtColorInt > 3) {
      nxtColorInt = 0;
    } else {
      nxtColorInt++;
    }

    //var colors = ["#FF530D", "#E82C0C", "#FF0000", "#E80C7A", "#FF0DFF"];
    var colors = ["#42727F", "#D1F5FF", "#84E4FF", "#687A7F", "#6AB6CC"];
    retArray.push(colors[nxtColorInt]);

    arraySize--;
  }

  return retArray;
}
