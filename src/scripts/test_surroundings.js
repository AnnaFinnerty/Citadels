function test_surroundings(i,style,squares,teams, boardSize){
    
      //console.log(i);
      
      var return_value = [];
      
      if (style !== teams[i+1]){
          //console.log("right");
          //console.log(style);
          //console.log(teams[i+1]);
          return_value.push("right");
      }
      if (style !== teams[i-1]){
          return_value.push("left");
          //console.log("left");
          //console.log(style);
          //console.log(teams[i-1]);
      }
      if (style !== teams[i+boardSize]){
          //console.log("down");
          return_value.push("down");
          //console.log(style);
          //console.log(teams[i+boardSize]);
      }
      if (style !== teams[i-boardSize]){
          //console.log("up");
          return_value.push("up");
          //console.log(style);
          //console.log(teams[i-boardSize]);
      }
      
      if (return_value.length>0){
          return return_value;
      } else {
          return false;
      }
      
  }   

export default test_surroundings;