  function Goal(svg, x, y, id, color, height) {
        this.posX = x; // cx
        this.posY = y; // cy
        this.color = color;
        this.height = 20; // radius and weight same
        this.svg = svg; // parent SVG
        this.id = id; // id of paddle

        this.data = [this.id]; // allow us to use d3.enter()
        var thisobj = this; // i like to use thisobj instead of this. this many times not reliable particularly handling evnet

        this.Draw = function () {
            var svg = thisobj.svg;
            var goal = svg.selectAll('#' + thisobj.id)
                        .data(thisobj.data)
                    ;
            goal.enter()
                .append("rect")
                .attr("id" , thisobj.id)
                .attr('class' , 'goal')
                .attr('x' , thisobj.posX)
                .attr('y' , thisobj.posY)
                .attr('width' , 10)
                .attr( 'height' , thisobj.height)
                .style("fill",  "red");

            goal
                //.transition()//.duration(50)
                .attr("x", thisobj.posX)
                .attr("y", thisobj.posY)
                .attr("height" , thisobj.height)
                

        }
        this.Move = function (y) {
            thisobj.posY += y;
            thisobj.Draw();
            
        }

        this.Resize = function (y) {
            console.log("Goal Resize");
            //var svg = thisobj.svg;

            thisobj.height = y;
            thisobj.Draw();
            
        }

            
     thisobj.Draw();   

    }
    function GoalSetSize(x){
        goals[0].Resize(x);
    }

    function GoalResize(x){
        var size = goals[0].height + (80 - x)/100;

        goals[0].Resize(size);
    }

    function GoalMove(x){
       goals[0].Move(x);
    }

    function GoalAutoMove(){
        var goal = goals[0];
 
        var offset = randomInt(1,5);
        if (randomInt(0,1) == 0){
            offset = offset * -1;
        }
        //console.log("Ofset"+sign*offset);
        if (goal.posY + (offset) < 0 || (goal.posY + (offset)) > svg.attr('height')){
            offset = offset * -1;
        }
        goals[0].Move(offset);

    }


    function ScoreGoal(ball,goal){
        ball = balls[ball];
        goal = goals[goal];
        if ((ball.posX + ball.radius) >= svg.attr('width') && ball.posY > goal.posY && ball.posY < (goal.posY + goal.height)){
            if ((2*ball.radius) > goal.height){
                score += goal.height;
                ball.SetSize(goal.height);
            }else{
                score += ball.radius;
            }

            
            GoalResize(15);
           // GoalAutoMove();
            
            $("#score").html(score.toFixed(0));
            console.log ("Goal!!! Radius=" + ball.radius + " Height=" + goal.height + "Score =" + score );
        } else if (inno == 1){
         
          //  GoalAutoMove();
       
        }    
    }