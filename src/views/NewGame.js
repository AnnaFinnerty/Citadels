import React, { Component } from 'react';

class NewGame extends Component{
        constructor(props){
            super(props);
            this.state = {
                twoPlayer: this.props.twoPlayer,
                boardSize: this.props.boardSize,    
                difficulty: this.props.difficulty,
                tileSize: this.props.tileSize,
                tileStyles: this.props.tileStyles,
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
            console.log(this.state.twoPlayer);
        
            newGame(this.state.boardSize,this.state.difficulty,
                    this.state.tileSize,this.state.twoPlayer);  
        }
    
        render(){
            console.log("New Game panel render");
            console.log(this.props);
            console.log(this.state);
            
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
            
            //tilesize button array
            const tilesize_button_array = ["xs","sm","med","lg","xl"];
            const tilesize_value_array=["2vw","3.5vw","5vw","6.5vw","8vw"]
            const tilesize_buttons = tilesize_value_array.map((value,index) => {
                let tilesizeStyle;
                if(this.state.tileSize === value){
                    tilesizeStyle = "button-active";
                } else {
                    tilesizeStyle = "button-inactive";
                }
                var tilesizeLabel = tilesize_button_array[index];
                return (
                    <button className={tilesizeStyle}
                            onClick={(e) => this.handleOnClick(e)}
                            name="tileSize"
                            value={value}
                            key={value}>
                        {tilesizeLabel}
                    </button>
                )
            })
            
            //difficulty buttons (only in twoPlayer)
            let difficulty_settings;
            if(this.state.twoPlayer){
                difficulty_settings = <div>            
                                         <p>Difficulty</p>        
                                         <div className="buttons">
                                            {difficulty_buttons}
                                         </div>
                                     </div>
            } else {
                difficulty_settings = <div></div>
            }

            //add button glow
            let button_id;
            if(this.state.boardSize === this.props.boardSize &&
               this.state.tileSize === this.props.tileSize &&
               this.state.twoPlayer === this.props.twoPlayer &&
               this.state.difficulty === this.props.difficulty
              ){
                button_id = "start-button-inactive";
            }else{
                button_id = "start-button-active";
            }
            
            return(
                <div className="newPanel">
                    
                    <p>Board Size:  
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
                     <p> Game Mode </p>        
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
                     {difficulty_settings}
                     <p> Tile Size </p>
                     <div className="buttons">        
                        {tilesize_buttons}
                     </div>
                     <div className="buttons">        
                        <button id={button_id}
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
