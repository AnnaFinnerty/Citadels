import React, { Component } from 'react';

class NewGame extends Component{
        constructor(props){
            super(props);
            this.state = {
                twoPlayer: false,
                boardSize: 15,    
                difficulty: "easy",
                tileSize: "med",
                aStyle:[],
                bStyles:[],  
            }
            this.handleOnSubmit=this.handleOnSubmit.bind(this);
        }
    
        handleOnClick(e){
            const name = e.target.name;
            let value;
            if(name==="twoPlayer"){
                if(e.target.value === "true"){
                    value = true;
                } else {
                    value = false;
                }
            } else {
                value = e.target.value;
            }
            this.setState({
              [name]: value,
          })
        }
    
        handleOnChange(e){
          const input = Number(e.target.value);
          const value = Math.floor(input);
          this.setState({
              boardSize: value,
          })
        } 
    
        handleOnSubmit(){
            console.log("submitting new game!");
            const newGame = this.props.newGameCallBack;
            const boardSize = this.state.boardSize;
            const difficulty = this.state.difficulty;
            const tileSize = this.state.tileSize;
            newGame(boardSize,difficulty,tileSize);  
        }
    
        render(){
            //console.log("New Game panel render");
            //console.log(this.state);
            
            let singlePlayerStyle;
            let twoPlayerStyle;
            if (this.state.twoPlayer){
                singlePlayerStyle = "button-inactive";
                twoPlayerStyle = "button-active";
            } else {
                singlePlayerStyle = "button-active";
                twoPlayerStyle = "button-inactive";
            }
            
            const difficulty_button_array = ["easy","hard"];
            const difficulty_buttons = difficulty_button_array.map((label,index) => {
                let difficultyStyle;
                if(this.state.difficulty === label){
                    difficultyStyle = "button-active";
                } else {
                    difficultyStyle = "button-inactive";
                }
                return (
                    <button
                        onClick={(e) => this.handleOnClick(e)}
                        className={difficultyStyle}
                        name="difficulty"
                        value={label}
                        key={label}>
                        {label}
                    </button>
                )
            })
            
            const tilesize_button_array = ["xs","sm","med","lg","xl"];
            const tilesize_buttons = tilesize_button_array.map((label,index) => {
                let tilesizeStyle;
                if(this.state.tileSize === label){
                    tilesizeStyle = "button-active";
                } else {
                    tilesizeStyle = "button-inactive";
                }
                return (
                    <button className={tilesizeStyle}
                            onClick={(e) => this.handleOnClick(e)}
                            name="tileSize"
                            value={label}
                            key={label}>
                        {label}
                    </button>
                )
            })
            
            return(
                <div className="newPanel">
                    <div className="buttons">
                        <button
                            className = {singlePlayerStyle}
                            name="twoPlayer"
                            value="false"
                            onClick = {(e) => this.handleOnClick(e)}
                        >
                            SINGLE PLAYER
                        </button>
                        <button
                            className = {twoPlayerStyle}
                            name="twoPlayer"
                            value="true"
                            onClick = {(e) => this.handleOnClick(e)}
                        >
                                TWO PLAYER
                        </button>
                    </div>
                    <p>Board:
                        <span className="board_size">
                            {this.state.boardSize}X{this.state.boardSize}
                        </span>
                    </p>
                        <input 
                            type="range" 
                            min="5" 
                            max="18" 
                            value={this.state.boardSize}
                            onChange = {(e) => this.handleOnChange(e)}
                            className="slider" 
                            name="myRange">
                        </input> 
                     <p>Difficulty</p>        
                     <div className="buttons">
                        {difficulty_buttons}
                     </div>
                     <p>Button Size</p>
                     <div className="buttons">
                        {tilesize_buttons}
                     </div>
                     <div className="buttons">        
                        <button id="start-button"
                                onClick={this.handleOnSubmit}
                         >
                            START GAME
                        </button>
                     </div>
                </div>
            )
        }   
    };

export default NewGame;
