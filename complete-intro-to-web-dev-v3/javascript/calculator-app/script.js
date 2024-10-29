let calResult = document.querySelector(".calc-result");
let result = 0;
let expression = [];

let cleanExpression = () => {
    expression = [];
};

let cleanResult = () => {
    result = 0;
    lastOpration = '';
    calResult.textContent = result;
};

let fullClean = () => {
    cleanExpression();
    cleanResult();
};

let removeLastDigit = () => {
    result = Math.floor(result / 10);
    calResult.textContent = result;
};

let addDigit = (n) => {
    result = result * 10 + parseInt(n);
    calResult.textContent = result;
};

let calcElem = document.querySelector(".calc-container").addEventListener("click", (elem) => {
    let clickedElement = elem.target;
    if (clickedElement.classList.contains("calc-allowed-click"))
    {
        let content = clickedElement.textContent; 
        let isDigit = ('0' <= content && content <= '9');

        if (isDigit) addDigit(content);
        else
        {
            if (content === 'C') fullClean();
            else if (content === '←') removeLastDigit();
            else if (content !== '=')
            {
                expression.push(result);
                if (content === 'x') content = '*';
                else if (content === '÷') content = '/';
                expression.push(content);
                cleanResult();
            }
            else
            {
                expression.push(result);
                cleanResult();
                try {
                    result = eval(expression.join(''));
                    calResult.textContent = result;
                } catch (e) {
                    fullClean();
                };
                cleanExpression();
            }
        }
    }
    else return ;
});
