const paragraphs = [
    "A long black shadow slid across the pavement near their feet and the five Venusians, very much startled, looked overhead. They were barely in time to see the huge gray form of the carnivore before it vanished behind a sign atop a nearby building which bore the mystifying information \"Pepsi-Cola.\"",
    "He lifted the bottle to his lips and took a sip of the drink. He had tasted this before, but he couldn't quite remember the time and place it had happened. He desperately searched his mind trying to locate and remember where he had tasted this when the bicycle ran over his foot.",
    "He stared out the window at the snowy field. He'd been stuck in the house for close to a month and his only view of the outside world was through the window. There wasn't much to see. It was mostly just the field with an occasional bird or small animal who ventured into the field. As he continued to stare out the window, he wondered how much longer he'd be shackled to the steel bar inside the house.",
    "Many people say that life isn't like a bed of roses. I beg to differ. I think that life is quite like a bed of roses. Just like life, a bed of roses looks pretty on the outside, but when you're in it, you find that it is nothing but thorns and pain. I myself have been pricked quite badly.",
    "The red line moved across the page. With each millimeter it advanced forward, something changed in the room. The actual change taking place was difficult to perceive, but the change was real. The red line continued relentlessly across the page and the room would never be the same.",
    "He slowly poured the drink over a large chunk of ice he has especially chiseled off a larger block. He didn't particularly like his drinks cold, but he knew that the drama of chiseling the ice and then pouring a drink over it looked far more impressive than how he actually liked it. It was all about image and he'd managed to perfect the image that he wanted to project.",
    "It all started with a random letter. Several of those were joined forces to create a random word. The words decided to get together and form a random sentence. They decided not to stop there and it wasn't long before a random paragraph had been cobbled together. The question was whether or not they could continue the momentum long enough to create a random short story.",
    "There was only half a worm in the apple. At first, Judy didn't quite comprehend what this meant. \"Why would only half a worm be living in an apple?\" she wondered. And then it dawned on her. Judy quickly spit out the bite she had just taken expecting to see the other half of the worm. It ended up being much worse than that.",
    "There were two things that were important to Tracey. The first was her dog. Anyone that had ever met Tracey knew how much she loved her dog. Most would say that she treated it as her child. The dog went everywhere with her and it had been her best friend for the past five years. The second thing that was important to Tracey, however, would be a lot more surprising to most people.",


];

let paragraphText = document.getElementById("paragraph-text");
let inputField = document.getElementById("input-field")
let stopwatch = document.getElementById("stopwatch");
let restart = document.getElementById("restart");
let volume = document.getElementById("volume");
let modal = document.getElementById("modal");
let modalBG = document.getElementById("modal-bg");
let wpm = document.getElementById("wpm");
let accuracy = document.getElementById("accuracy");
let keyClickAudio = new Audio('keyboard-click.mp3');

let typedArray = [];
let paraArray = [];
let paraWordArray = [];

let typedIndex = 0;
let mistakes = 0;
let time = 0;
let wpmResults;
let accuracyResults;
let typeStart = false;
let paraIndex = Math.floor(Math.random() * paragraphs.length);

stopwatch.innerHTML = time;

// toggles the icon of the volume button
volume.addEventListener("click", () => {
    if (volume.classList.contains("fa-volume-high")) {
        volume.classList.remove("fa-volume-high");
        volume.classList.add("fa-volume-xmark");
    } else {
        volume.classList.remove("fa-volume-xmark");
        volume.classList.add("fa-volume-high");
    }
})

// sound effect when typing
function typingSound() {
    if (volume.classList.contains("fa-volume-high")){
        keyClickAudio.play();
    }
}

// click outside the box to close the modal
modalBG.addEventListener("click", () => {
    if (modalBG.style.display == "block") {
        modalBG.style.display = "none";
        modal.style.display = "none";
    }
})

// refreshes the page if user wants to restart
restart.addEventListener("click", () => {
    window.location.reload();
})

function initTyping() {
    // get a random paragraph and wrap a span tag around each character
    paragraphs[paraIndex].split('').forEach(char => {
        paragraphText.innerHTML += `<span>${char}</span>`;
        paraArray.push(char);
    })

    let characters = paragraphText.querySelectorAll("span");

    // press a key or click on paragraph to focus on the textarea and start typing
    document.addEventListener("keydown", () => inputField.focus());
    paragraphText.addEventListener("click", () => inputField.focus());

    // adds typed characters to the typedArray and compares it with the contents of paraArray
    inputField.addEventListener("input", () => {
        if (!typeStart) {
            myInterval = setInterval(myStopwatch, 1000);
            typeStart = true;
        }

        if (inputField.value.split('')[typedIndex] == null) {
            characters[typedIndex].classList.remove("correct", "incorrect");
            typedArray.pop();
            if (typedIndex != 0) {
                typedIndex--;
            }
        } else {
            typedIndex = typedArray.length;
            typedArray.push(inputField.value.split('')[typedIndex]);

            if (paraArray[typedIndex] == typedArray[typedIndex]) {
                characters[typedIndex].classList.add("correct");
            } else {
                characters[typedIndex].classList.add("incorrect");
                mistakes++;
            }

            if (typedArray.length == paraArray.length) {
                clearInterval(myInterval);
                paraWordArray = paragraphs[paraIndex].split(' ');
                wpmResults = Math.round(paraWordArray.length/(time/60));
                accuracyResults = Math.round(((paraArray.length - mistakes)/paraArray.length)*100);
                wpm.innerHTML = wpmResults;
                accuracy.innerHTML = accuracyResults;
                modalBG.style.display = "block";
                modal.style.display = "block";
            }
        }

        function myStopwatch() {
            if (time !== '00') {
                time = time < 10 ? '0' + time : time;
            }
            time++;
            stopwatch.innerHTML = time;
        }
    })
}
    
console.log(paraArray);
console.log(typedArray);
initTyping();
