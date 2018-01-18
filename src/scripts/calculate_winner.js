function calculate_winner(squares,teams,aStyles,bStyles) {
    
  var redCitadel = 0;
  var blueCitadel = 0 ;
      
  for (var i=0;i<squares.length;i++){
     if (squares[i]>4 && teams[i] === aStyles){
         blueCitadel += squares[i];
     } else if (squares[i]>4 && teams[i] === bStyles) {
         redCitadel += squares[i];
     }
  }    
     
  //console.log("calculate winner");
  //console.log(redCitadel);
  //console.log(blueCitadel);
    
  if (redCitadel === 0){
      return "BLUE WINS"
  }    
  
  if (blueCitadel === 0){
      return "RED WINS"
  }      
  

  return false
}

export default calculate_winner;
