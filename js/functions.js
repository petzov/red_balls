function productValue(agentId,productId){
	console.log("Aid:"+agentId+"pid:"+productId+"Pcost:"+(300-products[productId].total_cost)+"Peprf:"+products[productId].total_perf+" Aperf"+agents[agentId].posY +" Aprice:"+agents[agentId].price_w);
    if (agents[agentId].price_w < 300 - products[productId].total_cost){
        if (agents[agentId].posY > products[productId].total_perf){
       // 	console.log("posY:"+(300-products[productId].total_cost)+" "+agents[agentId].posY);
        	return (300-products[productId].total_cost) - agents[agentId].posY ;
            
        } else return 0;
    } else return 0;
}