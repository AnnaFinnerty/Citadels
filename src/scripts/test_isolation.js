function test_isolation(i,style,current,teams, boardSize){
    
      //console.log(i);
      
      if (this.props.teams[i] !== this.props.teams[i+1]){
          //console.log("no match right");
          //console.log(i);
          if (this.props.teams[i] !== this.props.teams[i-1]){
           //console.log("no match left");
           //console.log(i);
              if (this.props.teams[i] !== this.props.teams[i+boardSize] ||
                 i>(boardSize*boardSize-boardSize)){
                //console.log("no match down");
                //console.log(i);
                  if (this.props.teams[i] !== this.props.teams[i-boardSize] || i<boardSize){
                    //console.log("no match up");
                    //console.log(i);
                    if(this.props.teams[i] === aStyles){
                        //console.log("blue isolation!");
                        this.props.teams[i] = bStyles;
                        this.props.squares[i] = 1;
                    } else {
                        //console.log("red isolation!");
                        this.props.teams[i] = aStyles;
                        this.props.squares[i] = 1;
                    }
                   }
               }
          }
      }
      
  }   

export default test_isolation;