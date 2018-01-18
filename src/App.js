import React from 'react';
import ReactDOM from 'react-dom';

import Game from './components/Game';
import Button from './components/Button';

import blueStyles from './scripts/styles/blueStyles';
import redStyles from './scripts/styles/redStyles';

import chevron_up from './glyphicons/chevron-up.svg';
import chevron_down from './glyphicons/chevron-down.svg';
import user from './glyphicons/user.svg';
import computer from './glyphicons/display.svg';

import calculate_winner from './scripts/calculate_winner';
import calculate_score from './scripts/calculate_score';
import coordinates from './scripts/coordinates';

import Rules from './views/Rules'
import NewGame from './views/NewGame'

import './index.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {    
      history: undefined,
      stepNumber: 0,
      xIsNext: true,    
      nextTeam: 'A',
      twoPlayer: false,
      boardSize: 10,    
      difficulty: "easy",
      tileSize: "6.5vw",
      tileStyles:[blueStyles,redStyles],
      sideBar: true,    
      panel: "none",
      winner: false,
      score: [],
      message: "Defend your kingdom! Your enemy plots against you...",
      selectedI: undefined,
    };     
  }    
  
  //new game on load    
  componentWillMount(){
      this.newGame(10,"easy","6.5vw",false,blueStyles,redStyles);
  }    
   
  //give each square a random starting value greater than one and less than four    
  randomSquares() {
      return Math.floor(Math.random()*3)+1;
  }   
   
  //clear game on win    
  clearGame(boardSize){
      this.setState({
          history: [{
              squares: Array(15).fill(0),
              teams: Array(15).fill(),
          }],
          stepNumber: 0,
          xIsNext: true,    
          nextTeam: 'A',
          twoPlayer: false,
          boardSize: 10,    
          difficulty: undefined,
          tileSize: 3.5,
          aStyle:[],
          bStyles:[],
          sideBar: true,    
          panel: "none",
          winner: false,
          score: [],
          message: "Defend your kingdom! Your enemy plots against you...",
          selectedI: undefined,
      })
  }    
    
  newGame(boardSize,difficulty,tileSize,twoPlayer,aStyles,bStyles){
    console.log("NEW GAME!");    
      
    const squares = Array(boardSize*boardSize).fill(4).map(this.randomSquares);
    const teams = Array(boardSize*boardSize).fill();
     
    //randomly place the citadels  
    const blueCitadelSite = Math.floor((Math.random()*boardSize)+(boardSize*boardSize*.8));
    const redCitadelSite = Math.floor(Math.random()*boardSize+boardSize);   
      
    //set the team placement on the board
      for(var i=0;i<squares.length;i++){
          if (Math.abs(blueCitadelSite-i) < (boardSize*boardSize)*.35){
              teams[i] = aStyles;
          } else {
              teams[i] = bStyles;
          } 
      }  
     
   //set the center of the citadels and surrounding tiles   
      squares[redCitadelSite] = 6;
      teams[redCitadelSite] = bStyles;
      squares[redCitadelSite+1] = 5;
      teams[redCitadelSite+1] = bStyles;
      squares[redCitadelSite-1] = 5;
      teams[redCitadelSite-1] = bStyles;
      squares[redCitadelSite+this.state.boardSize] = 5;
      teams[redCitadelSite+this.state.boardSize] = bStyles;
      squares[redCitadelSite-this.state.boardSize] = 5;
      teams[redCitadelSite-this.state.boardSize] = bStyles;
      
      squares[blueCitadelSite] = 6;
      teams[blueCitadelSite] = aStyles;
      squares[blueCitadelSite+1] = 5;
      teams[blueCitadelSite+1] = aStyles;
      squares[blueCitadelSite-1] = 5;
      teams[blueCitadelSite-1] = aStyles;
      squares[blueCitadelSite+this.state.boardSize] = 5;
      teams[blueCitadelSite+this.state.boardSize] = aStyles;
      squares[blueCitadelSite-this.state.boardSize] = 5;
      teams[blueCitadelSite-this.state.boardSize] = aStyles;
      
      this.setState({
          history: [{
                       squares: squares,
                       teams: teams,
                       selectedI: undefined,
              }],
          boardSize: boardSize,
          difficulty: difficulty,
          tileSize: tileSize,
          twoPlayer: twoPlayer,
          squares: squares,
          teams: teams,
          tileStyles:[aStyles,bStyles],
          sideBar: true,    
          panel: "none",
          winner: false,
          score: [],
          message: "Defend your kingdom! Your enemy plots against you...",
          selectedI: undefined,
          stepNumber: 0,
          xIsNext: true,    
          nextTeam: 'A',
      })      
  }        
   
  //create history    
  historyCallBack(squares,teams,message,i){
      console.log("history call back");
      const history = this.state.history;
      const newMessage = this.writeMessage(message,i);
      
      //don't advance to the next player if a tile is unplayable
      let nextX;
      if(message === "unplayable"){
          nextX = this.state.xIsNext ? true : false;
      } else {
          nextX = this.state.xIsNext ? false : true;
      }
      
      this.setState({
              history: history.concat([{
                       squares: squares,
                       teams: teams,
                       message: newMessage,
                       selectedI: i,
              }]),
              stepNumber: this.state.stepNumber + 1,
              selectedI: i,
              message: newMessage,
              xIsNext: nextX,
      });
      //console.log("HISTORY");
      //console.log(this.state.history);
  }    
          
  writeMessage(message,i){
      let team1;
      let team2;
      if (this.state.xIsNext){
          team1 = this.state.tileStyles[0][7];
          team2 = this.state.tileStyles[1][7];
      } else {
          team1 = this.state.tileStyles[1][7];
          team2 = this.state.tileStyles[0][7];
      }
      //console.log("teams in message");
      //console.log(team1);
      //console.log(team2);
      const xy = coordinates(i,this.state.boardSize);
      let newMessage;
      switch(message){
          case "attack":
              newMessage = team1 + " attacked " + team2 + " at square " + xy;
              //this.xIsNextCallBack(true);
              break
              
          case "conquer":
              newMessage = team1 + " conquered square " + xy + "!";
              //this.xIsNextCallBack(true);
              break
              
          case "fortify":
              newMessage = team1 + " fortified square " + xy + "!";
              //this.xIsNextCallBack(true);
              break 
              
          case "unplayable":
              newMessage = "Oops! You can't make that move.";
              //this.xIsNextCallBack(false);
              break    
            
          //the coordinates not working on capture!      
          case "captured":
              newMessage = "The square at " + xy + " was captured! " + team2 + " gets another turn.";
              //this.xIsNextCallBack(false);
              break      
      }
      
      return newMessage;
  }    
    
  jumpTo(step) {
    //console.log("jump");
    //console.log(step);
    this.setState({
      stepNumber: step+1,
      xIsNext: (step % 2) === 0,
    });
  }
      
  updatePanel(panel) {
    switch(panel){
        case "quit":
            this.setState({
                panel: "quit",
            });
            return;
            
        case "new":
            this.setState({
                panel: "new",
            });
            return;    
            
        case "rules":
            this.setState({
                panel: "rules",
            });
            return;
            
        case "undo":
            this.setState({
                panel: "undo",
            });
            return;
        
    }
  }
        
  render() {
    console.log("App render!");
    console.log(this.state);
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    //console.log(this.state.stepNumber);
    //console.log(current.squares);
    const aStyles = this.state.tileStyles[0];
    const bStyles = this.state.tileStyles[1];
      
      
    const winner = calculate_winner(current.squares,current.teams,aStyles,bStyles);  
 
    const score = calculate_score(current.squares,current.teams,aStyles,bStyles); 

    const message = this.state.message;  
      
    const aScore = score[0]; 
    const bScore = score[1];
      
    let aStyle;
    aStyle = {
        backgroundImage: `url(${user})`,
        width: '3vw',
        height: '3vw',
        backgroundSize: 'cover',
    }
    const aLabel = aStyles[7];
    
    let bStyle;
    let bIcon;
    if(this.state.twoPlayer){
        bIcon = computer;
    } else {
        bIcon = user;
    }
      
    bStyle = {
        backgroundImage: `url(${bIcon})`,
        width: '3vw',
        height: '3vw',
        backgroundSize: 'cover',
    }
    
    const bLabel = bStyles[7];
    
    let status;
    let statusClass;
    if (winner && history.length > 2) {
      status = winner + "WINS! Game Over";
      statusClass = "winner-status";
    } else {
      status = (this.state.xIsNext ? 'BLUE' : 'RED') + "'S TURN";
      statusClass = this.state.xIsNext ? "blue-status" : "red-status";    
    }
          
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'RESET';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    const quit = <div id="quit-box">
                    <div className="buttons">
                    <button id="start-button-inactive"
                                onClick={this.handleOnSubmit}
                         >
                            NEW GAME
                    </button>
                    </div> 
                    <p id="quit-message">
                        Are you sure you want to quit?
                    </p>        
                 </div>
     
    let panel;
    if (this.state.panel === "quit"){
        panel = quit;
    } else if (this.state.panel === "new") {
        panel = <NewGame
                    boardSize = {this.state.boardSize}
                    tileSize = {this.state.tileSize}
                    twoPlayer = {this.state.twoPlayer}
                    difficulty = {this.state.difficulty}
                    tileStyles = {this.state.tileStyles}
                    newGameCallBack = {(boardSize,difficulty,tileSize,twoPlayer,aStyles,bStyles) => this.newGame(boardSize,difficulty,tileSize,twoPlayer,aStyles,bStyles)}
                />;
    } else if (this.state.panel === "rules") {
        panel = <Rules />;
    } else if (this.state.panel === "undo"){
        panel = moves;
    }

    let toggleStyle;
    if(this.state.sideBar){
        toggleStyle = {
            backgroundImage: `url(${chevron_down})`,
            width: '3vw',
            height: '3vw',
            backgroundSize: 'cover',
        }
    }

    let sidebar;
    if (this.state.sideBar === true){
        sidebar = <div className="game-info">
                      <button id="sidebar_toggle"
                              style={toggleStyle}      
                      >
                      </button>
                      
                      <div id="title">CITADELS</div>    

                      <div className="score-info">
                          <table>
                          <tbody>
                            <tr>
                               <td style={aStyle}></td>
                               <td style={{color:'blue'}}>{aScore}</td>
                               <td>|</td>
                               <td style={{color:'red'}}>{bScore}</td>
                               <td style={bStyle}></td>
                             </tr>
                          </tbody> 
                          </table>       
                      </div>   
                      <div className="message">
                          <div className={statusClass}>{status}</div>
                          {message}
                      </div>      
                          
                      <div id="button-collection">
                        <Button 
                        value="HOW TO PLAY"
                        onClick={() => this.updatePanel("rules")}
                        />
                        <Button 
                        value="UNDO"
                        onClick={() => this.updatePanel("undo")}
                        />
                        <Button 
                        value="NEW GAME"
                        onClick={() => this.updatePanel("new")}
                        /> 
                        <Button 
                        value="QUIT"
                        onClick={() => this.updatePanel("quit")}
                        />
                        
                      </div>      

                      <div id="display">{}
                        {panel}
                      </div>
                    </div>
                  
    } else {
        sidebar = <div className="game-info-top">
                    <div id="title-horizontal">CITADELS</div>
                    <div className="score-info">
                          <span style={{color:aLabel}}>{aLabel}:  {aScore}</span> 
                          <span style={{color:bLabel}}> {bLabel}:  {bScore}</span>
                    </div>

                      <div className="message">
                          <div className={statusClass}>{status}</div>
                          {message}
                      </div>
                  </div>    
    }

    return (
      <div className="game">

          <div className="sidebar">
              {sidebar}
          </div>
          <Game
            squares={current.squares}
            teams={current.teams}
            selectedI={this.state.selectedI}
            xIsNext={this.state.xIsNext}
            onClick={(i) => this.handleClick(i)}
            newGame = {this.state.newGame}
            twoPlayer = {this.state.twoPlayer}
            difficulty = {this.state.difficulty}
            tileSize = {this.state.tileSize}
            boardSize = {this.state.boardSize}
            tileStyles = {this.state.tileStyles}
            historyCallBack = {(squares,teams,message,i) => this.historyCallBack(squares,teams,message,i)}
          />
          
        </div>
        
    );
  }
}

// ========================================

export default App;
