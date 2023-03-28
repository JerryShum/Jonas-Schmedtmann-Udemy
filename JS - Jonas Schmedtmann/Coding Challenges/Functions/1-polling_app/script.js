const poll = {
    question: "What is your favourite programming language?",
    options: ['0: JavaScript', '1: Python', '2: Rust', '3:C++'],
    // This generates [0, 0, 0, 0]. More in the next section!
    answers: new Array(4).fill(0),

    registerNewAnswer() {
        let answer = 0;
        do {
            answer = prompt(`What is your favourite programming language?\n ${this.options[0]}\n ${this.options[1]}\n ${this.options[2]}\n ${this.options[3]}\n(Write option number)`)

            if (answer <= 3 && answer >= 0) {
                this.answers[answer]++;
                alert('Thank you for your input!');
                console.log(this.answers);
            } else {
                alert('That is not a valid input. Please try again.')
            }



        } while (answer >= 3 && answer <= 0);

    },
};


document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll));

