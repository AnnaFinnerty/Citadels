import aStyles from './aStyles';
import bStyles from './bStyles';

import play from './play';
import testSurroundings from './test_surroundings';

function human_player(i, playing,squares,teams, boardSize, updateCB, messageCB) {
    console.log("human player!");
    //console.log(this.state.nextTeam);
        
    const play_result = play(i, playing,squares,teams, boardSize, updateCB);
    console.log(play_result);
    if(!play_result){
        messageCB("error");
    } else {
        messageCB("success");
    }
    
}

export default human_player;