import React from 'react';

import Board from './Board';

import human_player from '../scripts/human_player';
import play from '../scripts/play';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: this.props.newGame,
      boardSize: this.props.boardSize,    
      squares: this.props.squares,
      teams: this.props.teams,
      stepNumber: this.props.stepNumber,
      xIsNext: this.props.xIsNext,    
      nextTeam: 'A',
      twoPlayer: this.props.twoPlayer,
      //boardUpdated: false,
      tileStyles: this.props.tileStyles,
    };  
    this.handleClick = this.handleClick.bind(this);
 
  }    
   
  handleClick(i) {
    //console.log("click");

    const squares = this.props.squares;
    const teams = this.props.teams;
    const boardSize = this.props.boardSize;
         
    const playing = this.props.xIsNext;
    const updateCB = this.props.historyCallBack;  
    const twoPlayer = this.props.twoPlayer;
    const aStyles = this.props.tileStyles[0];
    const bStyles = this.props.tileStyles[1];  
    
    human_player(i, playing,squares,teams, boardSize, aStyles,bStyles, updateCB);
        
  }
    
    
            
  render() {
     console.log("Game render!");
     console.log(this.props);
     //console.log("Game xIsNext");
     //console.log(this.props.xIsNext);
    return (
          <Board
            squares={this.props.squares}
            teams={this.props.teams}
            selectedI={this.props.selectedI}
            boardSize={this.props.boardSize}
            tileSize={this.props.tileSize}
            tileStyles={this.props.tileStyles}
            onClick={(i) => this.handleClick(i)}
            xIsNext = {this.props.xIsNext}
            historyCallBack = {(squares,teams,message,i) => this.props.historyCallBack(squares,teams,message,i)}
          />
    );
  }
}

// ========================================

export default Game;


