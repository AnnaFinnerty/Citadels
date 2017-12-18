import aStyles from './aStyles';
import bStyles from './bStyles';

import coordinates from './coordinates';
import test_surroundings from './test_surroundings';
import play from './play';

function computer_player(playing, squares,teams, boardSize, updateCB, messageCB){
    console.log("Computer player's Turn");
    //console.log(squares);
    //console.log(boardSize);
    //console.log(teams);
    
    // a function to find a square for the computer to play
    function choose_easy(boardSize){
        
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
        
        console.log("citadel coordinates!");
        console.log(red_xy);
        console.log(blue_xy);
        
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
                  console.log("not a potential move!");
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
        console.log(potential_moves);
        return potential_moves;
    }
    
    var possible_moves = choose_easy(boardSize);
    var random = Math.floor(Math.random()*possible_moves.length);
    //an i is selected
    var i = possible_moves[random];
    
    
    const play_result = play(i, playing,squares,teams, boardSize);
    console.log(play_result);
    const message = play_result[0];
    
    updateCB(squares,teams,playing);
    messageCB(message,i,playing);
    
    
    /*
    for (var i=0;i<squares.length;i++){
        if (teams[i] === aStyles && squares[i] > 5 ){
            blue_citadel_spots.push(i);
        }
        if (teams[i] === bStyles && squares[i] > 5 ){
            red_citadel_spots.push(i);
        }
        if(i<10){
            var xy = [i,0];
            distance_xy.push(xy);
        } else {
            var a = String(i).charAt(1);
            var b = String(i).charAt(0);
            var c = Number(a);
            var d = Number(b);
            var cd = [c,d];
            distance_xy.push(cd);
        }
    } 
     
    console.log("distance_xy");
    console.log(distance_xy);
    
    var red_citadel = red_citadel_spots[0];
    var blue_citadel = blue_citadel_spots[0];
    
    var red_calcs = [];
    var blue_calcs = [];
     
    for (var i=0;i<distance_xy.length;i++){
        if (teams[i] === bStyles){
            var xb = distance_xy[blue_citadel][0];
            var yb = distance_xy[blue_citadel][1];
            var xi = distance_xy[i][0];
            var yi = distance_xy[i][1]
            var xz = Math.abs(xc-xi);
            var yz = Math.abs(yc-yi);
            var xyz = Math.floor(Math.sqrt(xz**2+yz**2));
            var r = [xyz,i];
            red_calcs.push(r);
        } else if (teams[i] === aStyles){
            var xc = distance_xy[red_citadel][0];
            var yc = distance_xy[red_citadel][1];
            var xj = distance_xy[i][0];
            var yj = distance_xy[i][1]
            var xa = Math.abs(xc-xj);
            var ya = Math.abs(yc-yj);
            var xya = Math.floor(Math.sqrt(xa**2+ya**2));
            var r = [xya,i];
            blue_calcs.push(r);
        } 
    }
   
      red_calcs.sort(function (a, b) {  return a[0] - b[0];  });
      blue_calcs.sort(function (a, b) {  return a[0] - b[0];  });
    
      console.log(red_calcs);
      console.log(blue_calcs);
      
      var move = null;
      var possible_moves = [];
      
      var onOffense = true;
      if (blue_calcs[0][0]<4 && red_calcs[0][0] > 2 ){
          onOffense = false;
      }
      
      if (onOffense) // ON OFFENSE
        {
         for (var i=0;i<1;i++){
             
             var square = red_calcs[i][1];
             var pretest = test_surroundings(square,bStyles,squares,teams, boardSize);
             var test = test_surroundings(square,aStyles,squares,teams,boardSize);
                 if(pretest[0] !== undefined && test[0] !== undefined){
                     console.log(square);
                     for(var j=0;j<test.length;j++){
                         console.log(test[j]);
                         if(test[j] === 'up'){
                             var k = square + boardSize;
                                 if (k>0){
                                     possible_moves.push(k);
                                 }
                         } else if (test[j] === 'down') {
                             var k = square - boardSize;
                                 if (k>0){
                                         possible_moves.push(k);
                                     }
                         } else if (test[j] === 'left') {
                             var k = square - 1;
                                if (k>0){
                                     possible_moves.push(k);
                                 }
                         } else if (test[j] === 'right') {
                             var k = square + 1;
                                if (k>0){
                                     possible_moves.push(k);
                                 }
                         }
                     }  
                 }
             }  
         } 
         else // ON DEFENSE
          {
             for (var i=0;i<5;i++){
             var square = red_calcs[i][1];
             //console.log(square);
             //console.log(test_surroundings(square,bStyles));
                 
             
             } 
          }
      
    //console.log("offense");
    //console.log(onOffense);
    console.log(possible_moves);
     
      */    
       
  }    
 
export default computer_player;