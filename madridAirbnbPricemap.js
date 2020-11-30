d3.json('Practica/practica_airbnb.json')
    .then((featureCollection) => {
        drawMap(featureCollection);
    });

function drawMap(featureCollection) {

    var width = 800;
    var height = 800;

    var svg = d3.select('#mapid')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr("transform","translate(10)");
    
    var center = d3.geoCentroid(featureCollection); 

    var projection = d3.geoMercator()
        .fitSize([width, height], featureCollection)
        .center(center) 
        .translate([width / 2, height / 2]) 

    var pathGenerator = d3.geoPath().projection(projection);

    var scaleColor = ['#000066',
    '#00cc00',
    '#cc3300',
    '#ffccff',
    '#996633'];
    console.log(scaleColor[3])
    
    var i 
    var pathMap = svg.append("g")
        .selectAll("path")
        .data(featureCollection.features)
        .enter()
        .append("path")
        .attr("d",function(d){return pathGenerator(d)})
        .attr("fill",function(d,idx){
            
            if (featureCollection.features[idx].properties.avgprice > 100) {
                i = 0;
            } else if (featureCollection.features[idx].properties.avgprice > 75) {
                i = 1;
            } else if (featureCollection.features[idx].properties.avgprice > 50) {
                i = 2;
            } else if (featureCollection.features[idx].properties.avgprice > 25) {
                i = 3;
            } else if (featureCollection.features[idx].properties.avgprice < 25) {
                i = 4;
            }

            
            return scaleColor[i]
            
        })
        .attr("transform","translate(0,100)");

    var nblegend = 5;
    var widthRect = (width / nblegend) - 2;
    var heightRect = 10;

    var scaleLegend = d3.scaleLinear()
        .domain([0, nblegend])
        .range([0, width]);


    var legend = svg.append("g")
        .selectAll("rect")
        .data(scaleColor)
        .enter()
        .append("rect")
        .attr("width", widthRect)
        .attr("height", heightRect)
        .attr("x", (d, i) => scaleLegend(i)) 
        .attr("fill", (d) => d);
        

    var text_legend = svg.append("g")
        .selectAll("text")
        .data(['>100 Euros','>75 Euros','>50 Euros','>25 Euros','Menos de 25 Euros'])
        .enter()
        .append("text")
        .attr("x", (d, i) => scaleLegend(i))
        .attr("y", heightRect * 2.5)
        .text((d) => d)
            .attr("font-size", 12) 
    
    
   
}
