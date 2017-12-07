// Ball object - multiple balls can be created by instantiating new objects
    function Ball(svg, x, y, id, color, aoa, weight) {
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.radius = weight; // radius and weight same
        this.jumpSize = 2; // equivalent of speed default to 1
        this.svg = svg; // parent SVG
        this.id = id; // id of ball
        this.aoa = aoa; // initial angle of attack
        this.weight = weight;

        if (!this.aoa)
            this.aoa = Math.PI / 7;
        if (!this.weight)
            this.weight = 10;
        this.radius = this.weight;

        this.data = [this.id]; // allow us to use d3.enter()

        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        // **** aoa is used only here -- earlier I was using to next move position.
        // Now aoa and speed together is velocity 
        this.vx = Math.cos(thisobj.aoa) * thisobj.jumpSize; // velocity x
        this.vy = Math.sin(thisobj.aoa) * thisobj.jumpSize; // velocity y
        this.initialVx = this.vx;
        this.initialVy = this.vy;
        this.initialPosX = this.posX;
        this.initialPosY = this.posY;

        // when speed changes, go to initial setting
        this.GoToInitialSettings = function (newjumpSize) {
            thisobj.posX = thisobj.initialPosX;
            thisobj.posY = thisobj.initialPosY;
            thisobj.vx = Math.cos(thisobj.aoa) * newjumpSize; // velocity x
            thisobj.vy = Math.sin(thisobj.aoa) * newjumpSize; // velocity y
            thisobj.Draw();
        }

        this.Draw = function () {
            var svg = thisobj.svg;
            var ball = svg.selectAll('#' + thisobj.id)
                        .data(thisobj.data)
                    ;
            ball.enter()
                .append("circle")
                .attr("id" , thisobj.id) 
                .attr("class" , "ball")
                //.attr("r" , thisobj.radius)
                //.attr("weight" , thisobj.weight)
                .style("fill", thisobj.color)
                ;
            
            ball
                //.transition()//.duration(50)
                .attr("cx", thisobj.posX)
                .attr("cy", thisobj.posY)
                .attr("r" , thisobj.radius)
            ;
 
        }

        this.SetSize = function(radius){
            var svg = thisobj.svg;
            thisobj.radius = radius;
            thisobj.Draw();
        }

        this.Move = function () {
            var svg = thisobj.svg;

            //thisobj.posX += Math.cos(thisobj.aoa) * thisobj.jumpSize;
            //thisobj.posY += Math.sin(thisobj.aoa) * thisobj.jumpSize;

            thisobj.posX += 1.5*thisobj.vx;

            if (thisobj.vy > 0){   // falling
                //thisobj.vy = thisobj.vy + (thisobj.posY)/(5*svg.attr('height'));
                thisobj.posY += thisobj.vy;
            } else{                // bouncing
                //thisobj.vy = thisobj.vy + (svg.attr('height') - thisobj.posY)/(svg.attr('height'));
                thisobj.posY += thisobj.vy //- thisobj.posY/20;
            }
            //console.log("Move vy= "+thisobj.vy+" Pos: "+thisobj.posY);

            if (parseInt(svg.attr('width')) <= (thisobj.posX - thisobj.radius)) {
                //thisobj.posX = parseInt(svg.attr('width')) - thisobj.radius - 1;
                //thisobj.aoa = Math.PI - thisobj.aoa;
                //thisobj.vx = -thisobj.vx;
                DeleteBall(thisobj.id)
                //console.log("Exit");
                
            }

            if ( thisobj.posX < thisobj.radius) {
                thisobj.posX = thisobj.radius+1;
                thisobj.aoa = Math.PI - thisobj.aoa;
                thisobj.vx = -thisobj.vx;
            }

            if (parseInt(svg.attr('height')) < (thisobj.posY + thisobj.radius)) {
                thisobj.posY = parseInt(svg.attr('height')) - thisobj.radius - 1;
                thisobj.aoa = 2 * Math.PI - thisobj.aoa;
                thisobj.vy = -thisobj.vy;
                //console.log("Bounce: "+thisobj.vy+" Pos: "+thisobj.posY);
            }

            if (thisobj.posY < thisobj.radius) {
                thisobj.posY = thisobj.radius+1;
                thisobj.aoa = 2 * Math.PI - thisobj.aoa;
                thisobj.vy = -thisobj.vy;
               // console.log("Bounce top: "+thisobj.vy);
            }

            // **** NOT USING AOA except during initilization. Just left this for future reference ***** 
            if (thisobj.aoa > 2 * Math.PI)
                thisobj.aoa = thisobj.aoa - 2 * Math.PI;
            if (thisobj.aoa < 0)
                thisobj.aoa = 2 * Math.PI + thisobj.aoa;

            thisobj.Draw();
        }
    }

    function DeleteBall(id){
        console.log("DeleteBall:"+id);
        ScoreGoal(0,0);             
        balls.splice(FindBallById(id), 1);
        d3.selectAll('.ball').remove();
        delete bounces[id];
        AddBall();
    }

    function FindBallById(id){
        for (var i = 0; i < balls.length; ++i) {
             if (balls[i].data == id){
                return i;
             }
        }     
    }


    function AddBall(){
        x = spout[0].posX+15;
        balls.push(new Ball(svg, x, 10, 'b'+ balls_id, 'green', Math.PI / 3, 5));
        balls_id ++;
        AddCost(1);
    }



