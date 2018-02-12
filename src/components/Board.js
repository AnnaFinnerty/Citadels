import React from 'react';

import Square from './Square'

class Board extends React.Component {
      //this needs a callback to human player/computer player, or to be moved!
  renderSquare(i) {
      const boardSize = this.props.boardSize;
      const updateCB = this.props.historyCallBack;
      const squares = this.props.squares;
      const teams = this.props.teams;
      const aStyles = this.props.tileStyles[0];
      const bStyles = this.props.tileStyles[1];
      
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
                        console.log("blue isolation!");
                        console.log(i);
                        console.log(typeof(i));
                        this.props.teams[i] = bStyles;
                        this.props.squares[i] = 1;
                        updateCB(squares,teams,"captured",i);
                    } else {
                        console.log("red isolation!");
                        console.log(i);
                        console.log(typeof(i));
                        this.props.teams[i] = aStyles;
                        this.props.squares[i] = 1;
                        updateCB(squares,teams,"captured",i);
                    }
                   }
               }
          }
      }
    return (
      <Square
        i = {i}
        selectedI = {this.props.selectedI}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        team={this.props.teams[i]}
        counter={0}
        tileSize={this.props.tileSize}
        tileStyles={this.props.tileStyles}
      />
    );
  }
  
  render() {
    console.log("Board render!");
    console.log(this.props);
      
    const boardSize = this.props.boardSize;
    //console.log(boardSize);
    const board_rows = Array(boardSize).fill().map((a,b) => {
        //console.log("board-rows!");
        //console.log(b);
        const board_cols = Array(boardSize).fill().map((c,d) => {
            //console.log("board-cols");
            //console.log(d);
            const i = (b*boardSize) + d;
            //console.log(i); 
            return(
                <div className="board_square" key={i}>{this.renderSquare(i)}</div>
            )
        });
        return(
            <div className="board-row" key={"board"+b}>
                {board_cols}
            </div>
        )
    })  

    return (
      <div className="game-board">
        {board_rows}
      </div>
    );
  }
}

export default Board;