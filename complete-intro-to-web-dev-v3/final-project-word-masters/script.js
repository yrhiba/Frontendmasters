/*Class List Constant*/
const yellowLetterClass = "letter-bg-yellow"; 
const greenLetterClass = "letter-bg-green";

const dayWordUrl = "https://words.dev-apis.com/word-of-the-day";
const validWordUrl = "https://words.dev-apis.com/validate-word";

/*Game Board Element*/
const gameBoard = document.querySelector(".container");

/*Game State */
let state = {
    currentRow: 1,
    correctWord: "ABCDE",
    currentWord: "",
    status: "running",
    win: false,
};

const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
}

const gameSetup = async () => {
    gameBoard.innerHTML = '';
    let htmlBoard = "";
    for (let row = 1; row <= 6; row++)
    {
        let word = document.createElement("div");
        word.classList.add("word");
        word.classList.add("row-" + row);

        for (let column = 1; column <= 5; column++)
        {
            let letter = document.createElement("div");
            letter.classList.add("letter");
            letter.classList.add("letter-" + column);
            let letterValue = document.createElement("div");
            letterValue.classList.add("letter-value");
            letter.appendChild(letterValue);
            word.appendChild(letter);
        }
        gameBoard.appendChild(word);
    }
    let response = await fetch(dayWordUrl);
    let obj = await response.json();
    state.currentRow = 1;
    state.correctWord = obj.word.toUpperCase();
    state.currentWord = '';
};

const isValidPosition = (row, column) => {
    if (row < 1 || row > 6 || column < 1 || column > 5)
            return (false);
    return (true);
} ;

const getLetterSelctor = (row, column) => {
    return `.row-${row} .letter-${column} .letter-value`;
};

const getSelctor = (row, column) => {
    return `.row-${row} .letter-${column}`;
};

const addLetter = (row, column, letter) => {
    if (!isValidPosition(row, column)) return ;
    document.querySelector(getLetterSelctor(row, column)).innerText = letter;
};

const setCorrectLetter = (row, column) => {
    if (!isValidPosition(row, column)) return ;
    document.querySelector(getSelctor(row, column)).classList.add(yellowLetterClass);
};

const setStrongCorrectLetter = (row, column) => {
    if (!isValidPosition(row, column)) return ;
    document.querySelector(getSelctor(row, column)).classList.add(greenLetterClass);
};

const setFixedWord = (row) => {
    if (!isValidPosition(row, 1)) return ;
    document.querySelector(`.row-${row}`).classList.add("word-fixed");
};

gameSetup().catch(() => {
    state.status = "error";
    alert("error with the Api! please Rephrase the Page");
});

const updateBoard = () => {
    for (let column = 1; column <= 5; column++)
    {
        let curLetter = '';
        if (column <= state.currentWord.length) curLetter = state.currentWord[column - 1];
        document.querySelector(getLetterSelctor(state.currentRow, column)).innerText = curLetter;
    }
};

const isValidWord = async (content) => {
    try {
        let response = await fetch(validWordUrl, {
            method: "POST",
            body: JSON.stringify({
                word: content
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        let obj = await response.json();
        return obj.validWord;
    } catch (err) {
        console.log(err);
        state.status = "error";
        alert("error with the Api! please Rephrase the Page");
    }
    return (false);
};

document.addEventListener("keyup", async (key) => {

    if (state.status !== "running")
        return ;

    if (key.key == 'Backspace')
    {
        if (state.currentWord.length > 0)
        {
            state.currentWord = state.currentWord.substring(0, state.currentWord.length - 1);
            updateBoard();
        }
    }
    else if (key.key == 'Enter')
    {
        if (state.currentWord.length !== 5
            || !(await isValidWord(state.currentWord)))
        {
            const wordElem = document.querySelectorAll(`.row-${state.currentRow} .letter`);
            wordElem.forEach((elem) => {
                elem.style.animationIterationCount = "infinite";
            });
            setTimeout(() => {
                wordElem.forEach((elem) => {
                    elem.style.animationIterationCount = "0";
                });
            }, "1000");
            return ;
        }
    
        setFixedWord(state.currentRow);
        
        let correctWord = [];
        for (let i = 0; i < state.correctWord.length; i++)
                correctWord.push(state.correctWord[i]);

        let score = 0;

        for (let i = 0; i < 5; i++)
            if (state.currentWord[i] == state.correctWord[i])
            {
                score += 1;
                correctWord[i] = '-';
                setStrongCorrectLetter(state.currentRow, i + 1);
            }
            
        if (score == 5)
        {
            state.status = 'finished';
            state.win = true;
            alert("congrats you guess the correct Word!");
            return ;
        }

        for (let i = 0; i < 5; i++)
            if (correctWord.includes(state.currentWord[i]))
            {
                correctWord[i] = '-';
                setCorrectLetter(state.currentRow, i + 1);
            }
            
        if (state.currentRow < 6)
        {
            state.currentRow += 1;
            state.currentWord = '';
        }
        else
        {
            state.status = "finished";
            alert(`you Lose!, the correct word is ${state.correctWord}.`);
        }
    }
    else if (isLetter(key.key))
    {
        let newLetter = key.key.toUpperCase();
        if (state.currentWord.length < 5)
        {
            state.currentWord += newLetter;
            updateBoard();
        }
    }
});
