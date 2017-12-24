   function Spout(svg, x, y, id, color) {
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.svg = svg; // parent SVG
        this.id = id; // id of paddle

        this.data = [this.id]; // allow us to use d3.enter()
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        this.Draw = function () {
            var svg = thisobj.svg;
            var spout = svg.selectAll('#' + thisobj.id)
                        .data(thisobj.data)
                    ;
            spout.enter()
                .append("rect")
                .attr("id" , thisobj.id)
                .attr('class' , 'spout')
                .attr('x' , thisobj.posX)
                .attr('y' , thisobj.posY)
                .attr('width' , 15)
                .attr( 'height' , 10)
                .style("fill",  thisobj.color)
                .attr("transform", "skewX(40)")
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));
                ;

            

            function dragstarted(d) {
              d3.select(this).raise().classed("active", true);
            }

            function dragged(d) {
              d3.select(this).attr("x", d.x = d3.event.x);
              if (d3.event.x < (svg.attr('width')-50)){
                console.log("d3 X = "+d3.event.x+" svg.'width'="+svg.attr('width'));
                thisobj.posX = d3.event.x;
                }
                thisobj.Draw();
              //thisobj.posY = d3.event.y;
            }

            function dragended(d) {
              d3.select(this).classed("active", false);
            }

        }
            
        thisobj.Draw();


    }
