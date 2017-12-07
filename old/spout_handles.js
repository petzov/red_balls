function Spout(svg, x, y, id, color) {
        this.posX = 150 //x; // cx
        this.posY = 100 //y; // cy
        this.color = color;
        this.svg = svg; // parent SVG
        this.id = id; // id of paddle
        this.angle = 0;
        this.rx = 100;
        this.ry = 50;
        this.data = [this.id]; // allow us to use d3.enter()
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet


        // Returns radians
        function angleBetweenPoints(p1, p2) {
            if (p1[0] == p2[0] && p1[1] == p2[1])
                return Math.PI / 2;
            else
                return Math.atan2(p2[1] - p1[1], p2[0] - p1[0] );
        }

        function distanceBetweenPoints(p1, p2) {
            return Math.sqrt( Math.pow( p2[1] - p1[1], 2 ) + Math.pow( p2[0] - p1[0], 2 ) );
        }

        this.Draw = function () {
            var group = thisobj.svg.append("svg:g").attr('id' , 'spout_group');
            var rect = group.selectAll('#' + thisobj.id)
                            .data(thisobj.data)
                        ;
           //var    data = thisobj.data;
            // {
            //     x: 350,
            //     y: 200,
            //     rx: 100,
            //     ry: 50,
            //     angle: 0
            //     };



            rect.enter()
                    .append("rect")
                    .attr("id" , thisobj.id)
                    .attr('class' , 'spout')
                    .attr('x' , thisobj.posX)
                    .attr('y' , thisobj.posY)
                    .attr('width' , 15)
                    .attr( 'height' , 30)
                    .style("fill",  thisobj.color)
                    .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));
                    ;   

 

                
            var handles = group.selectAll("circle")
                    .data([
                        {x:thisobj.posX, y:thisobj.posY + thisobj.ry, name:"n"},
                        {x:thisobj.posX + thisobj.rx, y:thisobj.posY, name:"e"},
                        {x:thisobj.posX, y:thisobj.posY - thisobj.ry, name:"s"},
                        {x:thisobj.posX - thisobj.rx, y:thisobj.posY, name:"w"}
                    ], function (d) { return d.name; })
                    .enter()
                    .append("svg:circle")
                    .attr("cx", function (d) { return  d.x;  })
                    .attr("cy", function (d) {  return d.y;  })
                    .style("fill", "red")
                    .attr("r", 6.5)
                    .call(d3.drag()
                        .on("drag", function (d) {
                            // Resizing
                            
                            var exy = [d3.event.x, d3.event.y],
                                dxy = [thisobj.posX, thisobj.posY],
                                dist = distanceBetweenPoints(exy, dxy),
                                angle = thisobj.angle + angleBetweenPoints(dxy, exy);
                            switch(d.name) {
                                case "e":
                                case "w":
                                    break;
                                case "s":
                                case "n":
                                    angle += Math.PI/2;
                                    break;
                            };
                            thisobj.angle = angle;
                            console.log("Angle:"+thisobj.angle);
                            update();
                        })
                    );

            function update() {
                rect
                    .attr("x", thisobj.x - thisobj.rx +5)
                    .attr("y", thisobj.y  + thisobj.ry +5)
                    .attr("width", (thisobj.rx*2)-10)
                    .attr("height", (thisobj.ry*2)-10);
                //thisobj.posX = thisobj.x - thisobj.rx +5;
                //thisobj.posY = thisobj.y - thisobj.ry +5;    
                
                group.attr("transform", "rotate(" + toDegrees(thisobj.angle) + "," + thisobj.posX + "," + thisobj.posY + ")");

            }


            function dragstarted(d) {
              group.raise().classed("active", true);
            }

            function dragged(d) {
              group.attr("x", d.x = d3.event.x);
              if (d3.event.x < (svg.attr('width')-50)){
                console.log("d3 X = "+d3.event.x+" svg.'width'="+svg.attr('width'));
                thisobj.posX = d3.event.x;
                }
                //thisobj.Draw();
              //thisobj.posY = d3.event.y;
            }

            function dragended(d) {
              group.classed("active", false);
            }

 
       

            function toDegrees(rad) {
                return rad * (180/Math.PI);
            }



        }
    
        thisobj.Draw();
    
} 
