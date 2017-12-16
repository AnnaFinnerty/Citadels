import aStyles from './aStyles';
import bStyles from './bStyles';

function calculate_score(squares,teams) {
  console.log("calculating scores!");
  console.log(squares);
  console.log(teams);
    
  var redScore = 0;
  var blueScore = 0 ;
  
  for (var i=0;i<squares.length;i++){
     if (teams[i] === aStyles){
         redScore += squares[i];
     } else {
         blueScore += squares[i];
     }
  }    
  
  var scores = [blueScore,redScore];    
  
  return scores;
  
}

export default calculate_score;
