// Wait for the DOM to be fully loaded before executing the JavaScript code
document.addEventListener("DOMContentLoaded", function() {
    // Create an array to keep track of clicked elements
    var clicked = [];
    
    // Get all elements with the class "arrow" and "question" and convert them into arrays
    var arrowNodes = Array.from(document.querySelectorAll(".arrow"));
    var questionNodes = Array.from(document.querySelectorAll(".question"));

    // Listen for click events on the entire document
    document.addEventListener("click", function(event) {
        var clickedElement = event.target;

        // Function to show the answer for a clicked question
        function showAnswer() {
            var parentElement = clickedElement.parentNode;
            var question = parentElement.querySelector(".question");
            question.style.fontWeight = 700;

            // Find the parent element's ID
            var grandParentId = clickedElement.parentNode.parentNode.id;
            var grandParentElement = document.getElementById(grandParentId);

            // Find the direct child with class "answer" and display it
            var directPChild = grandParentElement.querySelector(".answer");
            directPChild.style.display = "block";

            // Store the clicked elements in the clicked array
            clicked.push(clickedElement);
            clicked.push(directPChild);
            clicked.push(question);

            if (clickedElement.tagName === "IMG") {
                clickedElement.src = "images/icon-arrow-up.svg";
                clicked.push(clickedElement);
            } else {
                var arrow = parentElement.querySelector(".arrow");
                arrow.src = "images/icon-arrow-up.svg";
                clicked.push(arrow);
            }
        }

        // Function to hide the answer and reset the arrow
        function unshowAnswer() {
            clicked[1].style.display = "none";
            clicked[2].style.fontWeight = 400;
            if (clicked.length == 4) {
                clicked[3].src = "images/icon-arrow-down.svg";
            }
            clicked.length = 0;
        }

        // Check if the clicked element is the same as the previously clicked one
        if (clicked[0] == clickedElement) {
            unshowAnswer();
        } else if (arrowNodes.includes(clickedElement) || questionNodes.includes(clickedElement)) {
            if (clicked.length == 0) {
                showAnswer();
            } else {
                unshowAnswer();
                showAnswer();
            }
        }
    });
});
