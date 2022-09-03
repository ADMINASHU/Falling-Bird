const hole = document.getElementById('hole');
const game = document.getElementById('game');
const result = document.getElementById('result');
const text = document.getElementById('text');
const highScore = document.getElementById('highScore');

let score = 0;
let hScore = localStorage.getItem('SaveScore')
let jumping = 0;



hole.addEventListener("animationiteration", randomHole)

function randomHole() {
    const random = -((Math.random()*56)+24);
    hole.style.top = random+"vh"; 
    score++;
    if (score > hScore) {
        localStorage.setItem('SaveScore',score);
    }
}




const fall = setInterval(() => {
    const birdBottom = parseInt(window.getComputedStyle(bird).getPropertyValue("bottom"))
    const birdLeft = parseInt(window.getComputedStyle(bird).getPropertyValue("left"))
    if(jumping == 0 && birdBottom > 0){
        bird.style.bottom = (birdBottom-4)+"px";
    }
    const blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"))
    const holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"))
    const hTop = -0.95*(holeTop);
    
    
    const gameTop = parseInt(window.getComputedStyle(game).getPropertyValue("top"))
    const hBottom = hTop - ((gameTop*7.5)*0.25);
    
   
    if ((birdBottom < 0)||(blockLeft < birdLeft*1.298)&&(blockLeft > birdLeft)&&((birdBottom < hBottom)||(birdBottom > hTop))){
        result.style.display = "grid";
        text.innerText = `Your final score is : ${score}`;
        highScore.innerText = `High Score: ${hScore}`;
        game.style.display = "none";
        // score = 0;
    }             
  
},10);

window.addEventListener('keydown',hop)
window.addEventListener('touchstart',hop)


function hop(){
    jumping = 1;
    const birdBottom = parseInt(window.getComputedStyle(bird).getPropertyValue("bottom"));
    if(birdBottom > 0){
        bird.style.bottom = (birdBottom + 35) + "px";
    }
    setTimeout(()=>{
        jumping = 0
    },100 )

}






function restart(){
    location.reload();
    score = 0;
}