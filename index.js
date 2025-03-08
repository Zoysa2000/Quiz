const questions = [
    {
        question: "What is the purpose of the ACID properties in database management systems?",
        options: [
            "To ensure reliable transactions",
            "To optimize query performance",
            "To handle concurrent connections",
            "To improve data redundancy"
        ]
    },
    {
        question: "What is the main function of an operating system?",
        options: [
            "To create web pages",
            "To perform arithmetic operations",
            "To manage hardware resources",
            "To handle data encryption"
        ]
    },
    {
        question: "Which algorithm is used to find the shortest path in a weighted graph?",
        options: [
            "Breadth-First Search",
            "Depth-First Search",
            "Dijkstra's Algorithm",
            "Kruskal's Algorithm"
        ]
    },
    {
        question: "In computer architecture, what does the term 'pipelining' refer to?",
        options: [
            "Increasing the size of the cache memory",
            "Storing multiple data elements in the same register",
            "Fetching instructions in a sequential manner",
            "Executing multiple instructions simultaneously",
        ]
    },
    {
        question: "What is the main advantage of using B-trees in databases?",
        options: [
            "Efficient indexing for large datasets",
            "Reduction in RAM usage",
            "Improvement in sequential file access",
            "Simpler deletion operations"
        ]
    },
    {
        question: "What is the difference between static and dynamic polymorphism?",
        options: [
            "Static polymorphism uses overloading, dynamic uses overriding",
            "Static polymorphism allows method overriding, dynamic does not",
            "Static polymorphism is resolved at compile time, dynamic at runtime",
            "Static polymorphism is for inheritance, dynamic for encapsulation"
        ]
    },
    {
        question: "What is the purpose of the OSI model in networking?",
        options: [
            "To standardize networking protocols into layers",
            "To create a single standard for global networks",
            "To encrypt data during transmission",
            "To provide a user interface for network configuration"
        ]
    },
    {
        question: "Which of the following is a characteristic of a 'greedy algorithm'?",
        options: [
            "Exploring all possible solutions simultaneously",
            "Making locally optimal choices at each step",
            "Using dynamic programming for optimization",
            "Evaluating all nodes in a tree before deciding"
        ]
    },
    {
        question: "In the context of operating systems, what does 'context switching' mean?",
        options: [
            "Switching between kernel and user modes",
            "Replacing the contents of cache memory",
            "Running multiple processes on a single CPU core",
            "The process of storing and restoring the state of a CPU",
        ]
    },
    {
        question: "Which of the following is a key difference between TCP and UDP?",
        options: [
            "TCP is connection-oriented, while UDP is connectionless",
            "TCP is faster than UDP",
            "UDP is used for file transfers, TCP for streaming",
            "TCP supports broadcast, UDP does not"
        ]
    }
];

const startButton = document.getElementById("start-btn");
const progressBar = document.getElementById("progress-bar");
const quizContainer = document.getElementById("quiz-container");
let timeLeft = 120;
let selectedOptions = [];
let currentQuestionIndex = 0;
const answers = ['1', '3', '3', '4', '1', '4', '1', '2', '4', '1'];
let score = 0;
document.getElementById("next-question").style.display = 'none';
document.getElementById("previous-question").style.display = 'none';
document.getElementById("sumbit-anwser").style.display = 'none';
// Event listener for the Start button

function displayQuestion(index) {
    const question = questions[index];
    quizContainer.innerHTML = `
               <div class="question-block mt-5">
                    <h4>${index + 1}. ${question.question}</h4>
                    <ul style="list-style-type: none;">
                        ${question.options.map((option, optIndex) => {
        // Check if the current question's option is already selected
        const isChecked = selectedOptions.some(selected =>
            selected.qusetionNumber === index + 1 && selected.anwser === (optIndex + 1).toString()
        );
        return `
                  <li class="mt-3 ">
                  <input type="radio" name="question${index}" id="question${index}_option${optIndex}" 
                      value="${option}" ${isChecked ? 'checked' : ''} 
                      onclick="storeOption(${index + 1}, '${optIndex + 1}')">
                  <label for="question${index}_option${optIndex}">${option}</label>
                  </li>
                  `;
    }).join('')}
                    </ul>
        </div>
    `;
}

document.getElementById("sumbit-anwser").addEventListener("click", function ()
{
    // Initialize score
    selectedOptions.forEach((selected, index) => {
        if (selected.anwser === answers[index]) {
            score += 1;
            index++;
        }
    });

    quizContainer.innerHTML = `<h5>${score} Anwsers are corrected out of ${answers.length} questions.</h5>`;

})

function storeOption(index,option) {

    const existing = selectedOptions.find((number)=>
    {
    return number.qusetionNumber===index;
    })
    if(existing)
    {
        // If it exists, update the answer
        existing.anwser = option;
    }
    else
    {
        selectedOptions.push({
            "qusetionNumber":index,
            "anwser":option

        });
    }

    console.log("Selected options: ", selectedOptions);
}


startButton.addEventListener("click", () => {
    document.getElementById("next-question").style.display = 'block';
    document.getElementById("previous-question").style.display = 'block';
    document.getElementById("sumbit-anwser").style.display = 'none';
    startButton.disabled = true;
    startButton.textContent = "Assingment Starting";
    startButton.style.backgroundColor = "#28a745"
    displayQuestion(currentQuestionIndex);

    // Create a countdown using setInterval callback function
    const countdown = setInterval(() => {
        // Reduce time left by 1 second
        timeLeft--;

        // Calculate the percentage of progress remaining
        const progressPercent = (timeLeft / 120) * 100;

        // Update the progress bar width and time display
        progressBar.style.width = progressPercent + "%";

        if(timeLeft===60)
        {
            progressBar.style.backgroundColor = "#dc3545"
            startButton.style.backgroundColor = "red"
            startButton.textContent = "Time's Up Soon!"
        }
        if (timeLeft <= 0) {
            clearInterval(countdown);
            startButton.textContent = "Time's Up!"
            document.getElementById("next-question").style.display = 'none';
            document.getElementById("previous-question").style.display = 'none';
            document.getElementById("sumbit-anwser").style.display = 'none';
            quizContainer.innerHTML = `<h5>${score} Anwsers are corrected out of ${answers.length} questions.</h5>`;
        }
    },1000);
});

// Add event listener to the next button
document.getElementById("previous-question").addEventListener("click", function() {
    // Increment the current question index
    if(currentQuestionIndex>0)
    {
        currentQuestionIndex--
    }
    // If no more questions, show the completion message
    displayQuestion(currentQuestionIndex);

});
document.getElementById("next-question").addEventListener("click", function() {
    // Increment the current question index
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
        console.log(currentQuestionIndex)
    } else {
        // If no more questions, show the completion message
        document.getElementById("quiz-container").innerHTML = "";
        document.getElementById("next-question").style.display = 'none';
        document.getElementById("previous-question").style.display = 'none';
        document.getElementById("sumbit-anwser").style.display = 'block';
    }
});

