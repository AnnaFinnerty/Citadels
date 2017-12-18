import React from 'react';

import Board from './Board';

import human_player from '../scripts/human_player';
import computer_player from '../scripts/computer_player';
import play from '../scripts/play';

import aStyles from '../scripts/aStyles';
import bStyles from '../scripts/bStyles';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newGame: this.props.newGame,
      boardSize: this.props.boardSize,    
      squares: this.props.squares,
      teams: this.props.teams,
      stepNumber: 0,
      xIsNext: this.props.xIsNext,    
      nextTeam: 'A',
      twoPlayer: this.props.twoPlayer,
      boardUpdated: false,
    };  
    this.handleClick = this.handleClick.bind(this);
    this.updateBoard = this.updateBoard.bind(this);  
  }    
   
        
  handleClick(i) {
    console.log("click");

    this.setState({boardUpdated:false,})

    const squares = this.state.squares;
    const teams = this.state.teams;
    const boardSize = this.props.boardSize;
         
    const playing = this.props.xIsNext;
    const messageCB = this.props.messageCallBack;
    const updateCB = this.updateBoard;  
    const twoPlayer = this.state.twoPlayer;
    
    human_player(i, playing,squares,teams, boardSize, updateCB, messageCB);
      
      
     
  }
    
  updateBoard(squares,teams,playing){
      console.log("updating board!");
      this.setState({
          squares: squares,
          teams: teams,
      });
    //save move to history
    this.saveHistory(); 
       
  }   
    
    
  saveHistory(){
      const callBack = this.props.historyCallBack;
      const squares = this.state.squares;
      const teams = this.state.teams;
      callBack(squares,teams);
      //update next player to app  
       const boardSize = this.state.boardSize;  
       const messageCB = this.props.messageCallBack;
       const updateCB = this.updateBoard;   
       const playing = this.props.xIsNext;
       //run computer player after delay if two player is true  
       if (this.props.twoPlayer && this.props.xIsNext){
        console.log("computer player go!")
        setTimeout(function(){
            computer_player(!playing,squares,teams,boardSize, updateCB,messageCB)}, 1000)
        } 
  }   
    
            
  render() {
     console.log("Game render!");
     console.log(this.props);
     //console.log("Game xIsNext");
     //console.log(this.props.xIsNext);
    return (
          <Board
            squares={this.state.squares}
            teams={this.state.teams}
            selectedI={this.props.selectedI}
            boardSize={this.props.boardSize}
            onClick={(i) => this.handleClick(i)}
            callBack={(squares,teams,playing) => this.updateBoard(squares,teams,playing)}
            xIsNext = {this.props.xIsNext}
            nextTeam = {this.state.nextTeam}
            messageCallBack = {(message,xy) => this.props.messageCallBack(message,xy)}
          />
    );
  }
}

// ========================================

export default Game;


