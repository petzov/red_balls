function quantity(svg,x){
	var posX = x;
	var quant = svg.append("g"); 
    var line = quant.append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .style("stroke-width","3")
                .attr("x1", posX)     // x position of the first end of the line
                .attr("y1", 40)      // y position of the first end of the line
                .attr("x2", posX)     // x position of the second end of the line
                .attr("y2", 300) 
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                ;


    function dragstarted(d) {
      d3.select(this).raise().classed("active", true).attr("cursor",  "ew-resize");
    }

    function dragged(d) {
    	var x = d3.event.x;
      	d3.select(this)
      	.attr("x1", x ).attr("x2", x )
      	.attr("cursor",  "ew-resize");
      	//.attr("y", d.y = d3.event.y)
      	;
      	posX = d3.event.x;
      	d3.select("#quant_mask").attr('x' , x).attr('width' , svg.attr('width') - posX );

      	console.log(d);
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }            

    var quant_mask = quant.append("rect")
    	.attr("id" , "quant_mask")
    	.attr("index" , 1)
        .attr('x' , posX + 1)
        .attr('y' , 0)
        .attr('width' , svg.attr('width') - posX)
        .attr( 'height' , svg.attr('height'))
        .style("fill",  "blue")
        ;
}


//  Benefits line. Box mask above


function hor_line(svg,id,y,mask){ // mask = [no, above, bellow]
	var posY = y;
	var h_line = svg.append("g");
	var line = h_line.append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .style("stroke-width","3")
                .attr("x1", 0)     // x position of the first end of the line
                .attr("y1", posY)      // y position of the first end of the line
                .attr("x2", 100)     // x position of the second end of the line
                .attr("y2", posY) 
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                ;


    function dragstarted(d) {
      d3.select(this).raise().classed("active", true).attr("cursor",  "ns-resize");
    }

    function dragged(d) {
    	var posY = d3.event.y;
      	if (d3.event.y > svg.attr('height') -50){
      		posY = svg.attr('height') - 50;

      	}
      	d3.select(this)
      	.attr("y1", posY ).attr("y2", posY )
      	.attr("cursor",  "ns-resize");
      	//.attr("y", d.y = d3.event.y)
      	;

      	
      	
  	    if (mask == "above") {
				d3.select("#"+id+"_mask").attr('height' , posY );
	 
	    }else if (mask == "bellow") {
	    	d3.select("#"+id+"_mask").attr('y' , posY ).attr('height', svg.attr('height') - posY);
	    }
      

    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }    

    if (mask == "above") {
    	var y_mask = 0;
    	var mask_height = posY - 1;
 
    }else if (mask == "bellow") {
    	var y_mask = posY + 1;
    	var mask_height = svg.attr('height') - posY;

    }

	var hor_mask = h_line.append("rect")
    	.attr("id" , id+"_mask")
        .attr('x' , 0)
        .attr('y' , y_mask)
        .attr('width' , svg.attr('width'))
        .attr( 'height' , mask_height)
        .style("fill",  "red")
        ;   
            
}