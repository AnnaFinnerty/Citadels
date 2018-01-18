import React, { Component } from 'react';

import redStyles from '../scripts/styles/redStyles';
import blueStyles from '../scripts/styles/blueStyles';
import greenStyles from '../scripts/styles/greenStyles';
import yellowStyles from '../scripts/styles/yellowStyles';

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
          console.log(e.target.name);
          const name = e.target.name;
              if(name === "boardSize"){
                 const input = Number(e.target.value);
                 const value = Math.floor(input);
                 this.setState({
                   boardSize: value,
                })
              } else if(name === "aStyles"){
                  const aLabel = e.target.value;
                  let aStyle;
                  if (aLabel === "blue"){
                      aStyle = blueStyles;
                  } else if (aLabel === "red"){
                      aStyle = redStyles;
                  } else if (aLabel === "green"){
                      aStyle = greenStyles;
                  } else if (aLabel === "yellow"){
                      aStyle = yellowStyles;
                  } else {
                      aStyle = blueStyles;
                  }
                  this.setState({
                      tileStyles: [aStyle,this.state.tileStyles[1]]
                  })
                  console.log(this.state);
              } else if(name === "bStyles"){
                  const bLabel = e.target.value;
                  let bStyle;
                  if (bLabel === "blue"){
                      bStyle = blueStyles;
                  } else if (bLabel === "red"){
                      bStyle = redStyles;
                  } else if (bLabel === "green"){
                      bStyle = greenStyles;
                  } else if (bLabel === "yellow"){
                      bStyle = yellowStyles;
                  } else {
                      bStyle = redStyles;
                  }
                  this.setState({
                      tileStyles: [this.state.tileStyles[0],bStyle]
                  })
                  console.log(this.state);
              }
             
        } 
    
        handleOnSubmit(){
            console.log("submitting new game!");
            const newGame = this.props.newGameCallBack;
            console.log(this.state.tileStyles[0]);
            console.log(this.state.tileStyles[1]);
        
            newGame(this.state.boardSize,this.state.difficulty,
                    this.state.tileSize,this.state.twoPlayer,
                    this.state.tileStyles[0],this.state.tileStyles[1]);  
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
            const tilesize_value_array=["3.5vw","6.5vw","9vw","13vw","17vw"]
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

            //still to do: purple, another one?
            //player settings buttons
            const aColorSchemes = [
                "blue",
                "green",
                "yellow",
                "red"];
            const bColorSchemes = aColorSchemes.slice().reverse();

            const aColorOptions = aColorSchemes.map((label,index) => {
                let optionAStyle;
                if(this.props.tileStyles[0][7] === label){
                    optionAStyle = "color_option_selected";
                } else {
                    optionAStyle = "color_option";
                }
                return <option 
                            value={label}
                            name="aStyles"
                            className={optionAStyle}
                            key={"A"+label}    
                                >
                                {label}
                        </option>
                
            })
            
            const bColorOptions = bColorSchemes.map((label,index) => {
                let optionBStyle;
                if(this.props.tileStyles[1][7] === label){
                    optionBStyle = "color_option_selected";
                } else {
                    optionBStyle = "color_option";
                }
                return <option 
                            value={label}
                            name="bStyle"
                            className={optionBStyle}
                            key={"B"+label}
                                >
                                {label}
                        </option>
                
            })

            //add button glow
            let button_id;
            if(this.state.boardSize === this.props.boardSize &&
               this.state.tileSize === this.props.tileSize &&
               this.state.twoPlayer === this.props.twoPlayer &&
               this.state.difficulty === this.props.difficulty &&
               this.state.tileStyles === this.props.tileStyles
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
                            name="boardSize">
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
                         Player 1:
                         <select
                             name="aStyles"
                             onChange = {(e) => this.handleOnChange(e)}
                             >
                             {aColorOptions}
                         </select>
                     </div>
                     <div className="buttons">
                         Player 2:
                         <select
                             name="bStyles"
                             onChange = {(e) => this.handleOnChange(e)}
                             >
                             {bColorOptions}
                         </select>
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
