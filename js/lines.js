function quantity(svg,id){
	
	var quant = svg.append("g"); 

	var quant_mask = quant.append("rect")
    	.attr("id" , "quant_mask")
    	.attr("index" , 1)
        .attr('x' , positions[id] + 1)
        .attr('y' , 0)
        .attr('width' , svg.attr('width') - positions[id])
        .attr( 'height' , svg.attr('height'))
        .style("fill",  "grey")
        ;

    var line = quant.append("line")          // attach a line
    			.attr("id" , "quant_line")
                .style("stroke", "black")  // colour the line
                .style("stroke-width","3")
                .attr("x1", positions[id])     // x position of the first end of the line
                .attr("y1", positions["benefits"])      // y position of the first end of the line
                .attr("x2", positions[id])     // x position of the second end of the line
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
    	positions[id] = d3.event.x;
      	d3.select(this)
      	.attr("x1", positions[id] ).attr("x2", positions[id] )
      	.attr("cursor",  "ew-resize");
      	//.attr("y", d.y = d3.event.y)
      	;
      	d3.select("#quant_mask").attr('x' , positions[id]).attr('width' , svg.attr('width') - positions[id] );

    update_lines(id);

    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }            


}


//  Benefits line. Box mask above


function hor_line(svg,id,mask){ // mask = [no, above, bellow]

	var h_line = svg.append("g");

	   if (mask == "above") {
    	var y_mask = 0;
    	var mask_height = positions[id] - 1;
 
    }else if (mask == "bellow") {
    	var y_mask = positions[id] + 1;
    	var mask_height = svg.attr('height') - positions[id];

    }

	var hor_mask = h_line.append("rect")
    	.attr("id" , id+"_mask")
        .attr('x' , 0)
        .attr('y' , y_mask)
        .attr('width' , svg.attr('width'))
        .attr( 'height' , mask_height)
        .style("fill",  "grey")
        ;   

	var line = h_line.append("line")          // attach a line
				.attr("id" , id+"_line")
                .style("stroke", "black")  // colour the line
                .style("stroke-width","3")
                .attr("x1", 0)     // x position of the first end of the line
                .attr("y1", positions[id])      // y position of the first end of the line
                .attr("x2", svg.attr('width'))     // x position of the second end of the line
                .attr("y2", positions[id]) 
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                ;


    function dragstarted(d) {
      d3.select(this).raise().classed("active", true).attr("cursor",  "ns-resize");
    }

    function dragged(d) {
    	positions[id]  = d3.event.y;
    	
      	
      	
  	    if (mask == "above") {
  	    	if (d3.event.y <= 5){
				positions[id] = 5;
			}

			d3.select("#"+id+"_mask").attr('height' , positions[id] );
	 
	    } 
	    else if (mask == "bellow") {
	    	var min_level = 50;
	    	if (id == "effort"){
	    		min_level = svg.attr('height') - positions["price"] + 10;
	    	}
	      	if (d3.event.y > svg.attr('height') - min_level){
	      		positions[id] = svg.attr('height') - min_level;

	      	}
	    	d3.select("#"+id+"_mask").attr('y' , positions[id] ).attr('height', svg.attr('height') - positions[id]);
	    }
      
      	d3.select(this)
      		.attr("y1", positions[id] ).attr("y2", positions[id] )
      		.attr("cursor",  "ns-resize");
      	;


	    update_lines(id);
    }

    function dragended(d) {
      d3.select(this).classed("active", false);
    }                
}


function update_lines(id){
	if (id == "benefits"){
		d3.select("#quant_line")
      		.attr("y1", positions[id] );
	}
	if (id == "price"){
		if (positions[id] <= positions["effort"]){
			positions["effort"] = positions[id] - 10;
			d3.select("#effort_line")
      			.attr("y1", positions[id]-10 ).attr("y2", positions[id]-10 );
      		d3.select("#effort_mask")	
      			.attr('y' , positions[id] - 10 )
      			.attr('height' , svg.attr('height') - positions[id]+10);
		}

	}

	calculate_value();
}


function calculate_value(){
	var value = 0;
	var revenue = 0;
	for (var i = 0; i < agents.length; ++i) {
			if ( ( agents[i].posY < positions["effort"]) && (agents[i].posY > positions["benefits"] ) && 
				(agents[i].posX < positions["quantity"] )){
				value += positions["effort"] - agents[i].posY ;
				revenue += svg.attr('height') - positions["price"];
			}
             
        }
    console.log("Value="+value+", Revenue="+revenue) ;   
}