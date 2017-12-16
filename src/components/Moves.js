import React, { Component } from 'react';

class Moves extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        
        const moves = this.props.history.map((step, move) => {
            const desc = move ?
                'Go to move #' + move :
                'RESET';
              return (
                <li key={move}>
                  <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
              );
        }); 
        
        return(
            <div className="newPanel">
            {moves}
            </div>
        )        
    }
};

export default Moves;
