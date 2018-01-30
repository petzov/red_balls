    function Feature(svg, xBase, yBase, id, width, perf, cost, color) {
        console.log("{\"x\":\""+xBase+"\", \"y\":\""+ yBase + "\"}");
        this.xBase = xBase; // cx
        this.yBase = yBase; // cy
        this.color = color;
        this.svg = svg; // parent SVG
        this.id = id; // id 
        this.width = width;
        this.data = [this.id]; // allow us to use d3.enter()
        this.svgHeight = svg.attr("height")
        this.cost = cost;
        this.perf = perf;
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        this.Draw = function () {
            var svg = thisobj.svg.append("g").attr("id" , "g_f"+thisobj.id);
            var feature = svg.selectAll('#' + "g_f" + thisobj.id)
                        .data(thisobj.data);
                    ;



            feature.enter()
            .append("rect")
            .attr("id" , thisobj.id)
            .attr('class' , 'price')
            .attr('x' , thisobj.xBase)
            .attr('y' , this.svgHeight - thisobj.perf)
            .attr('width' , thisobj.width)
            .attr( 'height' , thisobj.perf - thisobj.yBase )
            .style("stroke",  "black")
            .style("fill",  "white")
            ;

            feature.enter()
            .append("rect")
            .attr("id" , thisobj.id)
            .attr('class' , 'price')
            .attr('x' , thisobj.xBase)
            .attr('y' , this.svgHeight - thisobj.yBase - thisobj.cost)
            .attr('width' , thisobj.width)
            .attr( 'height' , thisobj.cost)
            .style("fill",  thisobj.color)
            ;            
                

            // var label =  feature.enter().append("text")   
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

        thisobj.Draw();    

    }



    function AddAgent(containerId){
      //  var svg = d3.select("#drawArea_canvas");
       // agents.push(new Agent(svg, 10, 200, "p"+agents.length+1, 'green', 50));
    }
