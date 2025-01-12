
document.addEventListener("DOMContentLoaded", () => {
    const pages = document.querySelectorAll(".page");
    const startButton = document.getElementById("startButton");
    const options = document.querySelectorAll(".option");
    const answers1 = document.getElementById("answers1");
    const answers2 = document.getElementById("answers2");
    const currentAmount = document.getElementById("currentAmount");
    const finalAmount = document.getElementById("finalAmount");
    const totalReturn = document.getElementById("totalReturn");
    const totalProfit = document.getElementById("totalProfit");
    const music = document.getElementById("backgroundMusic");

    let amount = 100000;
    let step = 0;

    const investments = {
        gimel: 1.05,
        hishtalmut: 1.07
    };

    const showPage = (index) => {
        pages.forEach((page, i) => {
            page.style.display = i === index ? "block" : "none";
        });
    };

    const generateAnswers = (correct, element) => {
        const incorrect1 = correct * 0.95;
        const incorrect2 = correct * 1.1;
        const answers = [correct, incorrect1, incorrect2].sort(() => Math.random() - 0.5);
        
        element.innerHTML = "";
        answers.forEach(answer => {
            const button = document.createElement("button");
            button.className = "option";
            button.textContent = answer.toFixed(2);
            button.addEventListener("click", () => {
                if (answer === correct) {
                    step++;
                    showPage(step);
                } else {
                    alert("תשובה שגויה, נסו שוב!");
                }
            });
            element.appendChild(button);
        });
    };

    startButton.addEventListener("click", () => {
        music.play();
        step++;
        showPage(step);
    });

    options.forEach(option => {
        option.addEventListener("click", (e) => {
            const choice = e.target.getAttribute("data-option");
            amount *= investments[choice];
            
            if (step === 1) {
                generateAnswers(amount, answers1);
                step++;
                showPage(step);
            } else if (step === 3) {
                currentAmount.textContent = `הסכום הנוכחי שלכם הוא ${amount.toFixed(2)} ש"ח.`;
                step++;
                showPage(step);
            } else if (step === 4) {
                generateAnswers(amount, answers2);
                step++;
                showPage(step);
            }
        });
    });

    answers2.addEventListener("click", () => {
        finalAmount.textContent = `הסכום הסופי שלכם הוא ${amount.toFixed(2)} ש"ח.`;
        const returnPercentage = ((amount / 100000 - 1) * 100).toFixed(2);
        totalReturn.textContent = `תשואה כוללת: ${returnPercentage}%`;
        totalProfit.textContent = `רווח: ${(amount - 100000).toFixed(2)} ש"ח.`;
        step++;
        showPage(step);
    });

    showPage(0);
});
