//a function to find the coordinates of an square position(i)
function coordinates(i,boardSize){
        const x = i % boardSize;
        const y = Math.floor(i/boardSize);
        const xy = [x,y];
        return xy;
    }  

export default coordinates;