    function Agent(svg, x, y, id, color, radius) {
        //console.log("{\"x\":\""+x+"\", \"y\":\""+ y + "\"}");
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.radius = 5; // radius and weight same
        this.svg = svg; // parent SVG
        this.id = id; // id of paddle
        this.data = [this.id]; // allow us to use d3.enter()
        this.price_w = y + (svg.attr('height') - y)*0.5
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        this.Draw = function () {
            var svg = thisobj.svg.append("g").attr("id" , "g"+thisobj.id);
            var agent = svg.selectAll('#' + thisobj.id)
                        .data(thisobj.data);
                    ;
            var circle1 = agent.enter()
                .append("circle")
                .attr("id" , thisobj.id) 
                .attr("class" , "ball")
                //.attr("r" , thisobj.radius)
                //.attr("weight" , thisobj.weight)
                .style("fill", thisobj.color)
                .attr("cx", thisobj.posX)
                .attr("cy", thisobj.posY)
                .attr("r" , this.radius)
                ;



            var price = agent.enter()
                .append("circle")
                .attr("id" , "price_"+thisobj.id) 
                .attr("class" , "ball")
                //.attr("r" , thisobj.radius)
                //.attr("weight" , thisobj.weight)
                .style("fill", "black")
                .attr("cx", thisobj.posX)
                .attr("cy", thisobj.price_w)
                .attr("r" , this.radius)
                ;

   

            var line1 = agent.enter()
                .append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .attr("x1", thisobj.posX)     // x position of the first end of the line
                .attr("y1", thisobj.posY+this.radius)      // y position of the first end of the line
                .attr("x2", thisobj.posX)     // x position of the second end of the line
                .attr("y2", thisobj.price_w) 
                ;

            // var label =  agent.enter().append("text")   
            //     .attr("id", id + "_label")
            //     .attr("x", thisobj.posX + 10)
            //     .attr("y", thisobj.posY + 15)
            //     .text("id")
            //     .attr("font-family", "sans-serif")
            //     .attr("font-size", "15px")
            //     .attr("fill", "black")
            //     ;     

        }

        this.FollowTarget = function (x) {
            var svg = thisobj.svg;
            thisobj.posX = x;
            svg.selectAll('#' + thisobj.id).attr("cx", thisobj.posX);
            svg.selectAll('#g' + thisobj.id +" > line").attr("x1", thisobj.posX).attr("x2", thisobj.posX);

        }

            

    }



    function AddAgent(containerId){
      //  var svg = d3.select("#drawArea_canvas");
       // agents.push(new Agent(svg, 10, 200, "p"+agents.length+1, 'green', 50));
    }
