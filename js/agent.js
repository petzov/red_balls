    function Agent(svg, x, y, id, color, width) {
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.width = 10; // radius and weight same
        this.svg = svg; // parent SVG
        this.id = id; // id of paddle
        this.ind = id.replace('p','');
        this.data = [this.id]; // allow us to use d3.enter()
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        this.Draw = function () {
            var svg = thisobj.svg.append("g");
            var agent = svg.selectAll('#' + thisobj.id)
                        .data(thisobj.data);
                    ;
            var circle1 = agent.enter()
                .append("circle")
                .attr("id" , thisobj.id) 
                .attr("index" , 100)
                .attr("class" , "ball")
                //.attr("r" , thisobj.radius)
                //.attr("weight" , thisobj.weight)
                .style("fill", thisobj.color)
                .attr("cx", thisobj.posX)
                .attr("cy", thisobj.posY)
                .attr("r" , this.width)
                ;

            var line1 = agent.enter()
                .append("line")          // attach a line
                .style("stroke", "black")  // colour the line
                .attr("x1", thisobj.posX)     // x position of the first end of the line
                .attr("y1", thisobj.posY+this.width)      // y position of the first end of the line
                .attr("x2", thisobj.posX)     // x position of the second end of the line
                .attr("y2", 300) 
                // .call(d3.drag()
                //     .on("start", dragstarted)
                //     .on("drag", dragged)
                //     .on("end", dragended))
                ;
            // paddle
            //     //.transition()//.duration(50)
            //     .attr("cx", thisobj.posX)
            //     .attr("cy", thisobj.posY)
            // ;
            

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
            
        //thisobj.Draw();

    }
 

    function AddAgent(containerId){
      //  var svg = d3.select("#drawArea_canvas");
       // agents.push(new Agent(svg, 10, 200, "p"+agents.length+1, 'green', 50));
    }
