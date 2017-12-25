function Box(svg, x, y, id, color, width) {
    this.posX = x; // cx
    this.posY = y; // cy
    this.color = color;
    this.width = width; // radius and weight same
    this.svg = svg; // parent SVG
    this.id = id; // id of paddle
    this.ind = id.replace('p','');
    this.data = [this.id]; // allow us to use d3.enter()
    var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

    this.Draw = function () {
        var svg = thisobj.svg;
        var box = svg.selectAll('#' + thisobj.id)
                    .data(thisobj.data)
                ;
        box.enter()
            .append("rect")
            .attr("id" , thisobj.id)
            .attr('class' , 'box')
            .attr('x' , thisobj.posX)
            .attr('y' , thisobj.posY)
            .attr('width' , thisobj.width)
            .attr( 'height' , 10)
            .style("fill",  thisobj.color)
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
       
        
        

        function dragstarted(d) {
          d3.select(this).raise().classed("active", true);
        }

        function dragged(d) {

          d3.select(this)
          .attr("x", d.x = 3 * d3.event.y + thisobj.ind * 20  )
          .attr("y", d.y = d3.event.y)
          .attr('width' , (svg.attr('height') - d3.event.y)/3)
          .attr('height' , ((svg.attr('height') - d3.event.y)/4))
          ;
          thisobj.posX = d3.event.x;
          thisobj.posY = d3.event.y;
        }

        function dragended(d) {
          d3.select(this).classed("active", false);
        }

    }
        
    thisobj.Draw();


}


function AddBox(containerId){

    var svg = d3.select("#drawArea_canvas");
    boxes.push(new Box(svg, 10, 200, "p" + boxes.length + 1, 'green', 50));
}



function Box_drag(svg, x, y, id, color, width) {
    isXChecked = 1;
     dragbarleft 
        .attr("fill-opacity", (isXChecked ? 0.5 : 0))
        .attr("cursor", (isXChecked ? "ew-resize" : "move"));
     dragbarright 
        .attr("fill-opacity", (isXChecked ? 0.5 : 0))
        .attr("cursor", (isXChecked ? "ew-resize" : "move"));

    isYChecked = 1;
     dragbartop 
        .attr("fill-opacity", (isYChecked ? 0.5 : 0))
        .attr("cursor", (isYChecked ? "ns-resize" : "move"));
     dragbarbottom 
        .attr("fill-opacity", (isYChecked ? 0.5 : 0))
        .attr("cursor", (isYChecked ? "ns-resize" : "move"));
}