import aStyles from './aStyles';
import bStyles from './bStyles';

import play from './play';
import testSurroundings from './test_surroundings';

function human_player(i, playing,squares,teams, boardSize, updateCB, messageCB) {
    //console.log("human player!");
    //console.log(this.state.nextTeam);
        
    const play_result = play(i, playing,squares,teams, boardSize);
    //console.log(play_result);
    const message = play_result[0];
     
    messageCB(message,i,playing);
    updateCB(squares,teams,playing);
}

export default human_player;