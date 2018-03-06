function productValue(agentId,productId){
	//console.log("Aid:"+agentId+"pid:"+productId+"Pcost:"+(300-products[productId].total_cost)+"Peprf:"+products[productId].total_perf+" Aperf"+agents[agentId].posY +" Aprice:"+agents[agentId].price_w);
    if (agents[agentId].price_w < 300 - products[productId].total_cost){
        if (agents[agentId].posY > products[productId].total_perf){
       // 	console.log("posY:"+(300-products[productId].total_cost)+" "+agents[agentId].posY);
        	return (300-products[productId].total_cost) - agents[agentId].posY ;
            
        } else return 0;
    } else return 0;
}


function agentToProduct(){
	var revenue = 0;
    for (var i = 0; i < agents.length; ++i) {
        //agentY = parseInt(sortAgents[i].slice(0,-4)) ;
        //var indAgent = parseInt(sortAgents[i].slice(-4));
        var bestProduct = -1;
        var oldValue = 0;
        for (var j = 0; j < products.length; ++j) {
            var utility = productValue(i,j);
            if ( utility > oldValue) {
                bestProduct = j;
                oldValue = utility;
            }
        }
        
        if (bestProduct > -1) {
        console.log("Evaluation:"+i+",Value:"+bestProduct);
            d3.select("circle#s"+i).style("fill", products[bestProduct].color);
            revenue += oldValue;
            $("#revenue").text(revenue.toFixed(0));  
        } else {
            console.log("Evaluation:"+i+", No match");
        }    

        var fc = fixedCost(i)/(i+1);
        
        var mc = MarginalCost(listAgents[i].x );
        //console.log("x="+indAgent+",y="+(300-agentY)+" Fc = "+fc+",mc="+mc+" Tot:="+(fc+mc));
       // $("#s"+indAgent+"_label").text((fc+mc).toFixed(0));
    }    
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