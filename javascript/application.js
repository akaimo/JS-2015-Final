window.onload = function(){
  // 国データ
  var myInterest= [{country:"Australia"},
                  {country:"Brazil"},
                  {country:"China"},
                  {country:"Japan"},
                  {country:"United States"},
                  {country:"United Kingdom"},
                  {country:"Russian Federation"},
                  {country:"Kenya"},
                  {country:"France"},
                  {country:"Ghana"},
                  {country:"Indonesia"},
                  {country:"South Africa"}];

  // jsonから抽出
  d3.json("json/population.json", function(error, json){
    for(var i=0; i<json[1].length; i++){
      for (var j = 0; j < myInterest.length; j++) {
        if (json[1][i].country.value == myInterest[j].country) {
          myInterest[j].iso = json[1][i].country.id;          // 国コード
          myInterest[j].population = json[1][i].value;        // 人口
        }
      }
    }
  });

  // svgを表示
  d3.xml("svg/BlankMap-World6.svg", "image/svg+xml", function(xml) {
    document.body.appendChild(xml.documentElement);
    removeCircle();
    selectCountryPath(myInterest);
    setCircle(myInterest);
  });

  // 国の一覧を表示
  d3.json("json/population.json", function(error, json){
    for(var i=0; i<json[1].length; i++){
      var text = json[1][i].country.value;
      console.log(text);
    }
  });
};



function removeCircle(){
  d3.select('body').select('svg').selectAll('g').selectAll('circle').remove();
  d3.select('body').select('svg').selectAll('g').selectAll('g').selectAll('circle').remove();
}

function selectCountryPath(obj) {
  for (var i = 0; i < obj.length; i++) {
    // pathを取得
    var id = obj[i].iso.toLowerCase();
    var path = d3.select('body').select('svg').select("#" + id);
    if (path[0][0].tagName == "g") {
      path = path.selectAll('path');
    }

    // 一番長いpathを探す
    var cordinate = path[0][0].getAttribute('d').length;
    var num = 0;
    for (var j = 1; j < path[0].length; j++) {
      if (cordinate < path[0][j].getAttribute('d').length) {
        cordinate = path[0][j].getAttribute('d').length;
        num = j;
      }
    }

    // x,y座標を取得
    var data = path[0][num].getAttribute('d').split(" ");
    var point = data[1].split(",");
    obj[i].path = point;
  }
}

function setCircle(obj) {
  for (var i = 0; i < obj.length; i++) {
    var id = obj[i].iso.toLowerCase();
    var selection = d3.select('body').select('svg');
    var g = selection.append('g').attr({
      transform: "translate(" + obj[i].path[0] + "," + obj[i].path[1] + ")",
    });
    g.append("circle").attr({
      'r': Math.sqrt(2500 * obj[i].population / 50000000),
      'fill':'red',
    }).style("opacity", 0.4);
    g.append("text").attr({
      'text-anchor': "middle",
      'dy': ".35em",
      'fill': "black",
      'font-size': "50px",
    }).text(obj[i].country);
  }
}
