
let dogContainer = document.querySelector(".dog-imgs");
let apiUrl = "https://dog.ceo/api/breeds/image/random";

/* methode 1 */
document.querySelector(".dog-btn").addEventListener("click", () => {
    fetch(apiUrl)
        .then((respone) => {
            respone.text()
                .then((resPromising) => {
                    let obj = JSON.parse(resPromising);
                    let newImg = document.createElement("img");
                    newImg.src = obj.message;
                    newImg.alt = "dog random image";
                    dogContainer.appendChild(newImg);
                });
        });
});


/* methode 2 */
// document.querySelector(".dog-btn").addEventListener("click", () => {
//     let promise = fetch(apiUrl)
//         .then((respone) => {
//             let resPromising = respone.text()
//             return resPromising;
//         })
//         .then((resPromising) => {
//             let obj = JSON.parse(resPromising);
//             let newImg = document.createElement("img");
//             newImg.src = obj.message;
//             newImg.alt = "dog random image";
//             dogContainer.appendChild(newImg);
//         });
// });

