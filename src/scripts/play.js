import aStyles from './aStyles';
import bStyles from './bStyles';

import testSurroundings from './test_surroundings';

function play(i, playing,squares,teams, boardSize, updateCB) {
    //console.log("playing!");
    //console.log(i);
    //console.log(playing);
      
    // If team A is playing  
    if (playing){
        // increment for team A on an 'A' tile
        if(teams[i] === aStyles && testSurroundings(i,aStyles,squares,teams,boardSize)){
            squares[i] = squares[i]+1;
            teams[i] = aStyles;
            return ["fortify",squares,teams]; 
          // increment for Team 'B' on an 'A' tile
        } else if (teams[i] === bStyles && testSurroundings(i,bStyles,squares,teams, boardSize)) {
            //take a 'B' tile for Team A if it's a 1
            if (squares[i] === 1){
                teams[i] = aStyles;
                squares[i] = squares[i]+0;
                return ["conquer",squares,teams]; 
            // or decrement a 'B' tile for Team A if it's > 1
            } else if (squares[i] > 6){
                squares[i] = 6
            } else if (squares[i] < 1){
                squares[i] = 1
            } else {
                squares[i] = squares[i]-1;
                return ["attack",squares,teams];   
            }
            
        // if Team A doesn't select a playable square, don't move to next turn;
        } else {
            squares[i] = squares[i]+0;
            return ["unplayable"]; 
        }
    // Team B's turn    
    } else {
        // increment for Team B on a B tile
        if(teams[i] === bStyles && testSurroundings(i,bStyles,squares,teams, boardSize)){
            squares[i] = squares[i]+1;
            teams[i] = bStyles;
            return ["fortify",squares,teams]; 
        // increment for Team B on an 'A' tiles
        } else if (teams[i] === aStyles && testSurroundings(i,aStyles,squares,teams,boardSize)) {
            //take an 'A' tile for Team B if it's a 1
            if (squares[i] === 1){
                teams[i] = bStyles;
                squares[i] = squares[i]+0;
                return ["conquer",squares,teams]; 
            // or decrement a 'B' tile for Team A if it's > 1    
            } else if (squares[i] > 6){
                squares[i] = 6
            } else if (squares[i] < 1){
                squares[i] = 1
            } else {
                squares[i] = squares[i]-1;
                return ["attack",squares,teams]; 
              }
        // if Team B doesn't select a playable square, don't move to next turn;
        } else {
            squares[i] = squares[i]+0;
            return ["unplayable"]; 
            }
    }
        
}

export default play;