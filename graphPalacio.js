function parserData(data) {
    var bpi = data.features;
    var arr = [];
    for (let key in bpi) {
        arr.push({
            barrio: bpi[key].properties.name,
            value: bpi[key].properties.avgbedrooms
        });
    }
    return arr;
}
var height = 500;
var width = 550;
var marginbottom = 0;
var margintop = 50;


var svg = d3.select('#graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height + marginbottom + margintop)
    .append("g")
    .attr("transform", "translate(30," + margintop + ")");

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", 300)
    .attr("y", 300)
    .text("N\u00FAmero de Habitaciones")


d3.json("Practica/practica_airbnb.json")
    .then((data) => {
        
        var parser = parserData(data);
        var barrios = parser.map(function(d) {return d})
        var Palacio = barrios[0]
        console.log(Palacio)
        var Palaciovalues = Palacio.value
        
        var bedrooms = [];
        for(var i in Palaciovalues) 
        bedrooms.push(Palaciovalues[i].bedrooms)
        ;
      
        var scaleX = d3.scaleBand()
        .domain(bedrooms)
        .range([0, width])

        var ymin = d3.min(Palaciovalues, (d) =>d.total)
        var ymax = d3.max(Palaciovalues, (d) =>d.total)
        console.log(ymin)
        console.log(ymax)
        var scaleY = d3.scaleLinear()
        .domain([ymax,0])
        .range([0, height / 2]);    

        var xAxis = d3.axisBottom(scaleX)
        var yAxis = d3.axisLeft(scaleY)

        svg.append("g").attr("transform","translate(0,"+height / 2+")").call(xAxis);
        svg.append("g").call(yAxis);
        svg.append("g")
        .selectAll('rect')
        .data(Palaciovalues)
        .enter()
        .append('rect')
        .attr("x",function(d){return scaleX(d.bedrooms)})
        .attr("y",function(d){return scaleY(d.total)})
        .attr("width",110)
        .attr("height",function(d){return height / 2 - scaleY(d.total)})
        .attr("fill", "#93CAAE");


        
    })
    .catch((error) => {
        console.log('error', error);
    });

