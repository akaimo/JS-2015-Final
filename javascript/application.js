window.onload = function(){
  d3.xml("svg/BlankMap-World6.svg", "image/svg+xml", function(xml) {
    document.body.appendChild(xml.documentElement);
  });
};
