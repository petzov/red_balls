    function Product(name,color) {
        
            //console.log("{\"x\":\""+xBase+"\", \"y\":\""+ yBase + "\"}");
            this.total_perf = 0; 
            this.total_cost = 0; 

            this.name = name;
            this.color = color;
            var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet


        this.AddFeature = function (svg, xBase, yBase, id, width, perf, cost, color){
         
            
            this.total_cost += cost; 
            this.total_perf = 300 - perf; 
            // console.log("cost:"+this.total_cost+", perf:"+this.total_perf);
            this.xBase = xBase; // cx
            this.yBase = yBase; // cy
            this.f_color = color;
            this.svg = svg; // parent SVG
            this.id = id; // id 
            this.width = width;
            this.data = [this.id]; // allow us to use d3.enter()
            this.svgHeight = svg.attr("height")
            this.cost = cost;
            this.perf = perf;
            var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

            thisobj.Draw();
        }    


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
            .style("stroke",  thisobj.color)
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
            .style("fill",  thisobj.f_color)
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


       // thisobj.Draw();    

    }

