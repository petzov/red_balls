var mask_color = "#d8d7d7"
var opacity = 0.8;
function quantity(svg,id){
	
	var quant = svg.append("g"); 

	var quant_mask = quant.append("rect")
    	.attr("id" , "quant_mask")
    	.attr("index" , 1)
        .attr('x' , positions[id] + 1)
        .attr('y' , 0)
        .attr('width' , svg.attr('width') - positions[id])
        .attr( 'height' , svg.attr('height'))
        .style("fill", mask_color)
        .style("opacity", opacity)
        ;

    var label =  quant.append("text")   
    	.attr("id", id + "_label")
    	.attr("x", - svg.attr('height') + 10)
	    .attr("y", positions[id] + 15)
	    .text(id)
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "15px")
	    .attr("transform", "rotate(-90)")
	    .attr("fill", "black");    


    var line = quant.append("line")          // attach a line
    			.attr("id" , "quant_line")
                .style("stroke", "black")  // colour the line
                .style("stroke-width","3")
                .attr("x1", positions[id])     // x position of the first end of the line
                .attr("y1", positions["benefits"])      // y position of the first end of the line
                .attr("x2", positions[id])     // x position of the second end of the line
                .attr("y2", 300) 
                .on("mouseover", dragstarted)
                .on("mouseout", dragended)
                .call(d3.drag()
                   // .on("start", dragstarted)
                    .on("drag", dragged)
                   // .on("end", dragended)
                   )


    function dragstarted(d) {
      d3.select(this).raise().classed("active", true).attr("cursor",  "ew-resize");
    }

    function dragged(d) {
    	positions[id] = d3.event.x;
    	if (d3.event.x > svg.attr("width") - 5){
    	    	positions[id] = svg.attr("width") - 5;
    	} 
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

	var h_line = svg.append("g").attr("class", "hor_line");

	   if (mask == "above") {
    	var y_mask = 0;
    	var mask_height = positions[id] - 1;
    	var y_label = mask_height - 10;
 
    }else if (mask == "bellow") {
    	var y_mask = positions[id] + 1;
    	var mask_height = svg.attr('height') - positions[id];
    	var y_label = y_mask + 15;

    }

	var hor_mask = h_line.append("rect")
    	.attr("id" , id + "_mask")
        .attr('x' , 0)
        .attr('y' , y_mask)
        .attr('width', svg.attr('width'))
        .attr( 'height', mask_height)
        .style("fill", mask_color)
        .style("opacity", opacity)
        ;   

    var label =  h_line.append("text")   
    	 .attr("id", id + "_label")
    	 .attr("x", 10)
	     .attr("y", y_label)
	     .text(id)
	     .attr("font-family", "sans-serif")
	     .attr("font-size", "15px")
	     .attr("fill", "black");

	var line = h_line.append("line")          // attach a line
				.attr("id" , id+"_line")
				.attr("class", "h_line")
                .attr("x1", 0)     // x position of the first end of the line
                .attr("y1", positions[id])      // y position of the first end of the line
                .attr("x2", positions["quantity"])     // x position of the second end of the line
                .attr("y2", positions[id])
                .on("mouseover", dragstarted)
                .on("mouseout", dragended)
                .call(d3.drag()
                   // .on("start", dragstarted)
                    .on("drag", dragged)
                   // .on("end", dragended)
                   )
                ;


    function dragstarted(d) {
      d3.select(this).raise().classed("active", true).attr("cursor",  "ns-resize");
    }

    function dragged(d) {
    	// Increase the effort with more benefits
      	// if (id == "benefits"){
      	// 	var origPos = positions[id]
  	    //   	var delta = positions["effort"] - (positions[id] - d3.event.y );
  	  		// d3.select("#effort_line")
  	  		// .attr("y1",  delta ).attr("y2",  delta );	
      	// }

    	positions[id]  = d3.event.y;
    	     	
  	    if (mask == "above") {
  	    	if (d3.event.y <= 5){
				positions[id] = 5;
			}
			if (id == "benefits"){
	    		min_level = svg.attr('height') - positions["effort"];
	    	}
	    	if (d3.event.y > svg.attr('height') - min_level - 5){
	      		positions[id] = svg.attr('height') - min_level - 5;

	      	}

			d3.select("#"+id+"_mask").attr('height' , positions[id] );
	 
	    } 
	    else if (mask == "bellow") {
	    	var min_level = 20;
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
      	d3.select("#benefits_label")
      		.attr("y", positions[id] - 10);	

	} else {
		d3.select("#"+id+"_label")
      		.attr("y", positions[id] + 15);
	}

	if (id == "price"){
		if (linkPriceEffort > 10){
			if (positions[id]-linkPriceEffort != positions["effort"]){
				priceEffortLink(id);
			}
		}else{
			if (positions[id]-linkPriceEffort <= positions["effort"]){
				priceEffortLink(id);
			}
		}

	}
	if (id == "quantity"){
		d3.select("#"+id+"_label")
			.attr("y", positions[id] + 15)
		d3.selectAll(".h_line")
			.attr("x2", positions[id])
	}

	calculate_value();
	
}

function priceEffortLink(id){
			positions["effort"] = positions[id] - linkPriceEffort;
			d3.select("#effort_line")
      			.attr("y1", positions[id]-linkPriceEffort ).attr("y2", positions[id]-linkPriceEffort );
      		d3.select("#effort_mask")	
      			.attr('y' , positions[id] - linkPriceEffort )
      			.attr('height' , svg.attr('height') - positions[id]+linkPriceEffort);
      		d3.select("#effort_label")
      		.attr("y", positions["effort"] + 15);	
}

function MarginalCost(quantValue){
	if (quantValue < MOC){
		var marginal_cost = (MOC - quantValue ) / MOC;
	}
	else {
		var marginal_cost = (quantValue - MOC ) / (svg.attr("width") - MOC);
	}
	return marginal_cost * startCost + startCost/3;
}

function fixedCost(height){
	if ( height < 80 ){
		fc = 50 - height;
	}else{
		fc = 1;
	}

	return fc*fc ;
	
}

function DrawMoc(){
	var lineData = [];
	for (var i = 0; i <= svg.attr("width"); i+=100) {
		lineData.push({"x":i,"y":(svg.attr("height") - MarginalCost(i))}); //*(svg.attr("height") - positions["benefits"])
	}

	var line = d3.line()
	    .x(function(d, i) { return d.x; }) // set the x values for the line generator
	    .y(function(d) { return d.y; }) // set the y values for the line generator 
	    .curve(d3.curveMonotoneX) // apply smoothing to the line
	  
	svg.append("path")
	    .datum(lineData) // 10. Binds data to the line 
	    .attr("class", "line") // Assign a class for styling 
	    .attr("d", line)
	    .attr("stroke","red")
	    ;  

}

function calculate_value(){
	var value = 0;
	var count_above = 0;
	var count_bellow = 0;
	var count_out = 0;
	var customers = 0;
	var revenue = 0;
	var cost = 0;
	var profit = 0;
	var marginal_cost = MarginalCost(positions["quantity"]);

	for (var i = 0; i < agents.length; ++i) {
		if 	(agents[i].posX > positions["quantity"] ){
						count_out ++;
			} else {
				// if  ( agents[i].posY > positions["effort"]) {
				// 	count_bellow ++;
				if  ( agents[i].price_w > positions["price"]) {
					count_bellow ++;


				} else {	
					if (agents[i].posY < positions["benefits"] ) {
						count_above ++;
					} else {						
								value += positions["effort"] - agents[i].posY ;
								revenue += svg.attr('height') - positions["price"];
								cost += marginal_cost;
								customers ++;
						}
					}			
				}
        }
    cost += fixedCost(positions["benefits"]);
    var percCust = 100*customers/numberAgents;
        
    $("#value").text(value.toFixed(0));
    $("#revenue").text(revenue.toFixed(0));  
    $("#profit").text(revenue.toFixed(0) - cost.toFixed(0));  
    $("#cost").text(cost.toFixed(0));
    $("#customers").text(percCust.toFixed(0));
    $("#valCost").text((percCust*(revenue - cost)/100).toFixed(0));


    console.log("Above="+ (100*count_above/numberAgents) +", Bellow="+(100*count_bellow/numberAgents) + ", Out="+(100*count_out/numberAgents) ) ;   
}