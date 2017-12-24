    function Paddle(svg, x, y, id, color, width) {
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.width = width; // radius and weight same
        this.svg = svg; // parent SVG
        this.id = id; // id of paddle
        this.ind = id.replace('p','');
        this.data = [this.id]; // allow us to use d3.enter()
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        this.Draw = function () {
            var svg = thisobj.svg;
            var paddle = svg.selectAll('#' + thisobj.id)
                        .data(thisobj.data)
                    ;
            paddle.enter()
                .append("rect")
                .attr("id" , thisobj.id)
                .attr('class' , 'paddle')
                .attr('x' , thisobj.posX)
                .attr('y' , thisobj.posY)
                .attr('width' , thisobj.width)
                .attr( 'height' , 10)
                .style("fill",  thisobj.color)
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended))
                .append("svg:title")
                    .text(function(d, i) { return "My color is " })
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
            
        thisobj.Draw();


    }
 

    function AddPaddle(containerId){

        var svg = d3.select("#drawArea_canvas");
        paddles.push(new Paddle(svg, 10, 200, "p"+paddles.length+1, 'green', 50));
    }
