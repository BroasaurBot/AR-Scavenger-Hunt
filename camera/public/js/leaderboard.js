//const start = 1681084801000;
const officialStart = 1696251075644;
const numberOfPositions = 20;
const minPoints = 500;

let lbPos = -1;
let leaderBoard = [];

function calculateScore(time) {
    return 0;
    //return Math.floor(100 + 100 * Math.exp(-0.3 * time));
}

function getTimeSinceStart() {
    const now = new Date();
    return (now.getTime() - officialStart) / (1000*60*60*24);
}

function calculateCurrentScore() {
    return calculateScore(getTimeSinceStart());
}


export { getTimeSinceStart, calculateCurrentScore} 