window.onload = function(){
  // svgを表示
  d3.xml("svg/BlankMap-World6.svg", "image/svg+xml", function(xml) {
    document.body.appendChild(xml.documentElement);
  });

  // 国の一覧を表示
  d3.json("json/population.json", function(error, json){
    for(var i=0; i<json[1].length; i++){
      var text = json[1][i].country.value;
      console.log(text);
    }
  });
};
