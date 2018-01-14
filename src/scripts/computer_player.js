import aStyles from './aStyles';
import bStyles from './bStyles';

import coordinates from './coordinates';
import test_surroundings from './test_surroundings';
import play from './play';

function computer_player(playing, difficulty, squares,teams, boardSize, updateCB, messageCB){
    console.log("Computer player's Turn");
    console.log(squares);
    console.log(boardSize);
    console.log(teams);
    console.log(difficulty);
    
    var possible_moves = choose_hard(boardSize,squares,teams);
    var random = Math.floor(Math.random()*possible_moves.length);
    //an i is selected
    var i = possible_moves[random];
    
    
    const play_result = play(i, playing,squares,teams, boardSize);
    //console.log(play_result);
    const message = play_result[0];
    
    updateCB(squares,teams,playing);
    messageCB(message,i,playing);
           
  }    
 
export default computer_player;

    // choose function easy mode
    function choose_easy(boardSize,squares,teams){
        
        //locate the current citadels
        var red_citadel_spots = [];
        var blue_citadel_spots = [];

        const find_citadels = squares.map((a,b) => {
            if (teams[b] === aStyles && squares[b] > 4 ){
                blue_citadel_spots.push(b);
            }
            if (teams[b] === bStyles && squares[b] > 4 ){
                red_citadel_spots.push(b);
            }

        }); 

        ;
        // sort to return highest red citadel space, lowest blue
        //!!! CAN BE IMPROVED FOR HARD!!!
        blue_citadel_spots.sort()
        red_citadel_spots.sort(function(a, b){return b-a})

        const red_citadel = red_citadel_spots[0];
        const blue_citadel = blue_citadel_spots[0];
        //console.log("citadel spots!");
        //console.log(red_citadel);
        //console.log(blue_citadel);
        //console.log(boardSize);
        const red_xy = coordinates(red_citadel,boardSize);
        const blue_xy = coordinates(blue_citadel,boardSize);
        
        //console.log("citadel coordinates!");
        //console.log(red_xy);
        //console.log(blue_xy);
        
        //find distances from all squares to relevant citadels
        const distances = squares.map((x,y) => {
            let citadel;
            if(teams[y] === aStyles){
                citadel = red_xy;
            } else {
                citadel = blue_xy;
            }
            var xy = coordinates(y,boardSize);
            //console.log("in distances");
            //console.log(xy);
            var x_diff = Math.abs(xy[0]-citadel[0]);
            var y_diff = Math.abs(xy[1]-citadel[1]);
            var distance = Math.floor(Math.sqrt(x_diff*x_diff+y_diff*y_diff));
            return [distance,y];
        });

        distances.sort(function (a, b) {  return a[0] - b[0];  });
        //console.log("distances");
        //console.log(distances);
        
        const potential_moves = [];
        
        const eval_potential_moves = distances.map((c,d) => {
           if(d<10){
               //make sure the square touches at least one blue and red tile
               //!!! Can be improved !!!
               const square = c[1];
               var blue_test = 
               test_surroundings(square,aStyles,squares,teams,boardSize);
               var red_test = test_surroundings(square,bStyles,squares,teams,boardSize);
               if(red_test && blue_test){
               //console.log("potential moves!");
               //console.log(blue_test);
               //console.log(red_test);
                   potential_moves.push(square);
               } else {
                  //console.log("not a potential move!");
                  //console.log(blue_test);
                  //console.log(red_test); 
               }
           } else {
               return null;
           }
        });
        
        //console.log("red citadel");
        //console.log(red_citadel);
        //console.log("blue citadel");
        //console.log(blue_citadel);
        //console.log(potential_moves);
        return potential_moves;
    }


    // choose function hard mode
    function choose_hard(boardSize,squares,teams){
        
        //locate the current citadels
        var red_citadel_spots = [];
        var blue_citadel_spots = [];

        // find citadel spaces
        const find_citadels = squares.map((a,b) => {
            if (teams[b] === aStyles && squares[b] > 4 ){
                blue_citadel_spots.push(b);
            }
            if (teams[b] === bStyles && squares[b] > 4 ){
                red_citadel_spots.push(b);
            }

        }); 

        ;
        // sort to return highest red citadel space, lowest blue
        //!!! CAN BE IMPROVED FOR HARD!!!
        blue_citadel_spots.sort()
        red_citadel_spots.sort(function(a, b){return b-a})

        const red_citadel = red_citadel_spots[0];
        const blue_citadel = blue_citadel_spots[0];
        //console.log("citadel spots!");
        //console.log(red_citadel);
        //console.log(blue_citadel);
        //console.log(boardSize);
        const red_xy = coordinates(red_citadel,boardSize);
        const blue_xy = coordinates(blue_citadel,boardSize);
        
        //console.log("citadel coordinates!");
        //console.log(red_xy);
        //console.log(blue_xy);
        
        //find distances from all squares to relevant citadels
        const distances = squares.map((x,y) => {
            let citadel;
            if(teams[y] === aStyles){
                citadel = red_xy;
            } else {
                citadel = blue_xy;
            }
            var xy = coordinates(y,boardSize);
            //console.log("in distances");
            //console.log(xy);
            var x_diff = Math.abs(xy[0]-citadel[0]);
            var y_diff = Math.abs(xy[1]-citadel[1]);
            var distance = Math.floor(Math.sqrt(x_diff*x_diff+y_diff*y_diff));
            return [distance,y];
        });

        distances.sort(function (a, b) {  return a[0] - b[0];  });
        //console.log("distances");
        //console.log(distances);
        
        const potential_moves = [];
        
        const eval_potential_moves = distances.map((c,d) => {
           if(d<10){
               //make sure the square touches at least one blue and red tile
               //!!! Can be improved !!!
               const square = c[1];
               var blue_test = 
               test_surroundings(square,aStyles,squares,teams,boardSize);
               var red_test = test_surroundings(square,bStyles,squares,teams,boardSize);
               if(red_test && blue_test){
               //console.log("potential moves!");
               //console.log(blue_test);
               //console.log(red_test);
                   potential_moves.push(square);
               } else {
                  //console.log("not a potential move!");
                  //console.log(blue_test);
                  //console.log(red_test); 
               }
           } else {
               return null;
           }
        });
        
        //console.log("red citadel");
        //console.log(red_citadel);
        //console.log("blue citadel");
        //console.log(blue_citadel);
        //console.log(potential_moves);
        return potential_moves;
    }