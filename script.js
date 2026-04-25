const btn = document.querySelectorAll(".btn");
const winner = document.querySelector(".winner");
const banner = document.querySelector(".showWinner");
const resetBtn = document.querySelector(".reset");
const startMenu = document.querySelector(".startMenu");
const gameBoard = document.querySelector(".container");
const single = document.querySelector(".single");
const home = document.querySelector('.home');
const Multiplayer = document.querySelector(".multi");
const endGame = new Audio('khel-khatam-beta.mp3');
const O = new Audio('punch-gaming-sound-effect-hd_RzlG1GE.mp3');
const X = new Audio('slap-soundmaster13-49669815_4L20wGP.mp3 ');
const vine = new Audio('vine-boom.mp3');
const bg = new Audio('indian-song.mp3');
const bg2 = new Audio('deg-deg_4M6Cojn.mp3');
const fahh = new Audio('fahhh_KcgAXfs.mp3')
let isturn = true;
let arr = [];
let iswinner = false;
let isSingle = true;

banner.classList.add("hide");
gameBoard.classList.add("hide");

single.addEventListener("click", () => {
  console.log("tu single hai ");
  startGame();
  fahh.play()
  isturn=true;
  isSingle = true;
});

Multiplayer.addEventListener("click", () => {
  console.log("tu milgal hai ");
  startGame();
  fahh.play()
  isSingle = false;
});

const startGame = () => {
  startMenu.classList.add("hide");
  gameBoard.classList.remove("hide");
  banner.classList.add('hide');
  bg.loop = true;
  bg.play();
  bg2.pause();
};

const back = () => {
  startMenu.classList.remove("hide");
  gameBoard.classList.add("hide");
  banner.classList.add('hide');
  endGame.pause()
  bg.pause()
  bg2.loop = true
  bg2.play()
  reset()
  fahh.play()
}

window.addEventListener("click", () => {
  if (isSingle) {
    if (isturn == false) {
      if (iswinner == false) {
        computerChoose();
        isturn = true;
        checkwinner();
      }
    }
  }
});

const winningPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
];

const computerChoose = () => {
  btn.forEach((e) => {
    if (e.innerText == "") {
      arr.push(e);
    }
  });
  setTimeout(() => {
    if (iswinner == false) {
      if (arr.length != 0) {
        let random = Math.floor(Math.random() * arr.length);
        arr[random].innerText = "X";
        vine.play()
        arr[random].disabled = true;
        checkwinner();
        arr = [];
      }
    }
  }, 1000);
};
const reset = () => {
  btn.forEach((e) => {
    iswinner = false;
    isturn = true;
    e.innerText = "";
    e.disabled = false;
    banner.classList.add("hide");
  });
};

const end = () => {
  btn.forEach((element) => {
    element.disabled = true;
  });
};

const checkwinner = () => {
  winningPattern.forEach((element) => {
    if (
      btn[element[0]].innerText !== "" &&
      btn[element[1]].innerText !== "" &&
      btn[element[2]].innerText !== ""
    ) {
      if (
        btn[element[0]].innerText == btn[element[1]].innerText &&
        btn[element[2]].innerText == btn[element[1]].innerText
      ) {
        winner.innerText = `winner is ${btn[element[0]].innerText}`;
        iswinner = true;
        banner.classList.remove("hide");
        endGame.play()
        end();
      }
    }
  });
};

btn.forEach((element) => {
  element.addEventListener("click", () => {
    if (isturn == true) {
      element.innerText = "O";
      O.play()
      isturn = false;
      element.disabled = true;
      checkwinner();
      console.log(isturn);
    } else {
      if (isSingle == false) {
        element.innerText = "X";
        element.disabled = true;
        isturn = true;
        X.play()
        checkwinner();
        console.log("noob");
      }
    }
  });
});

resetBtn.addEventListener("click", () => {
  reset();
});

home.addEventListener('click', back)
