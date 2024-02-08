let btn = document.querySelectorAll(".box");
let resetbtn  = document.querySelector("#reset-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg");
let turnO = true;
let count = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = ()=>{
    turnO =true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
}

btn.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("Box was Clicked"); 
        if(turnO){
            box.innerText = "O";
            turnO =false;
        }    
        else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;        
        let isWinner = checkWinner();
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText = `Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const enableBoxes =()=>{
    for(let box of btn){
        box.disabled = false;
        box.innerText= "";
    }
};

const disableBoxes = ()=>{
    for (let box of btn){
        box.disabled = true;
    }
}

const showWinner  = (winner)=>{
    msg.innerText = `Congratulations! Winner is ${winner}`
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = ()=>{
    for(let pattern of winPatterns){        
        let pos1val =  btn[pattern[0]].innerText;        
        let pos2val =  btn[pattern[1]].innerText;         
        let pos3val =  btn[pattern[2]].innerText; 
        
        if(pos1val != "" && pos2val!= "" && pos3val!=""){
            if(pos1val===pos2val&&pos2val==pos3val){
                // console.log("winner",pos1val);

                showWinner(pos1val);
                return true;
            }
        }
    }
}

newGamebtn.addEventListener("click",resetGame);
resetbtn.addEventListener("click",resetGame)