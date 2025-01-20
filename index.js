// Constants for costs and discount
const regFee = 8;
const privateLesson = 59;
const siblingLesson = 83;
const discount = 0.1;

// Get elements from the document
const totalCost = document.getElementById("totalCost");
const myCalculateCost = document.getElementById("myCalculateCost");
const generateClassInputs = document.getElementById("generateClassInputs");
const classInputsContainer = document.getElementById("classInputsContainer");


// Generate dynamic inputs for each lesson
numLessons.oninput = function () {
    classInputsContainer.innerHTML = ""; // Clear previous inputs
    const numberOfLessons = parseInt(document.getElementById("numLessons").value, 10);
  
    if (isNaN(numberOfLessons) || numberOfLessons <= 0) {
      totalCost.innerText = "Please enter a valid number of lessons.";
      return;
    }
  
    for (let i = 1; i <= numberOfLessons; i++) {
      // Create a container for each lesson
      const container = document.createElement("div");
      container.classList.add("lesson-container");
  
      // Add "How many classes?" input
      const label = document.createElement("label");
      label.innerText = `How many classes for lesson ${i}? `;
      const input = document.createElement("input");
      input.type = "number";
      input.id = `classesForLesson${i}`;
      input.min = "1";
  
      // Add radio buttons for lesson type
      const privateLabel = document.createElement("label");
      privateLabel.innerText = "Private Lesson";
      const privateRadio = document.createElement("input");
      privateRadio.type = "radio";
      privateRadio.name = `lessonType${i}`; // Group radio buttons by lesson
      privateRadio.value = "private";
      privateRadio.id = `privateLesson${i}`;
  
      const siblingLabel = document.createElement("label");
      siblingLabel.innerText = "Sibling Lesson";
      const siblingRadio = document.createElement("input");
      siblingRadio.type = "radio";
      siblingRadio.name = `lessonType${i}`; // Group radio buttons by lesson
      siblingRadio.value = "sibling";
      siblingRadio.id = `siblingLesson${i}`;
  
      const lineBreak = document.createElement('br');
     
      // Append all elements to the container
      
      container.appendChild(label);
      container.appendChild(input);
      container.appendChild(lineBreak);
      container.appendChild(lineBreak);
      container.appendChild(lineBreak);
      container.appendChild(privateRadio);
      container.appendChild(privateLabel);
      container.appendChild(siblingRadio);
      container.appendChild(siblingLabel);
      container.appendChild(lineBreak);
      container.appendChild(lineBreak);
      
      
  
      // Add the container to the class inputs container
      classInputsContainer.appendChild(container);
    }
  };
  

// Calculate the total cost
// Calculate the total cost
myCalculateCost.onclick = function () {
    const numStudentsInput = document.getElementById("numStudents");

    if (!numStudentsInput || isNaN(numStudentsInput.value) || parseInt(numStudentsInput.value, 10) <= 0) {
      totalCost.innerText = "Please enter a valid number of students.";
      return;
    }
    const numberOfStudents = parseInt(numStudentsInput.value, 10);
  
    const numberOfLessonsInput = document.getElementById("numLessons");
    
    if (!numberOfLessonsInput || isNaN(numberOfLessonsInput.value) || parseInt(numberOfLessonsInput.value, 10) <= 0) {
      totalCost.innerText = "Please enter a valid number of lessons.";
      return;
    }
    const numberOfLessons = parseInt(numberOfLessonsInput.value, 10);
  
    let totalCostValue = 0; // Initialize the total cost
  
    // Loop through each lesson
    for (let i = 1; i <= numberOfLessons; i++) {
      const classInput = document.getElementById(`classesForLesson${i}`);
      if (!classInput || isNaN(classInput.value) || parseInt(classInput.value, 10) <= 0) {
        totalCost.innerText = `Please enter a valid number of classes for lesson ${i}.`;
        return;
      }
  
      const numClasses = parseInt(classInput.value, 10);
  
      // Get the selected lesson type for this lesson
      const lessonType = document.querySelector(`input[name="lessonType${i}"]:checked`);
      if (!lessonType) {
        totalCost.innerText = `Please select a lesson type for lesson ${i}.`;
        return;
      }
  
      // Determine the rate for this lesson
      const baseCostPerLesson = lessonType.value === "private" ? privateLesson : siblingLesson;
  
      // Calculate the cost for this lesson and add it to the total cost
      totalCostValue += numClasses * baseCostPerLesson;
    }

    if (numberOfLessons >= 3) {
      totalCostValue -= totalCostValue * discount;
    }
  
  
    // Add the registration fee for each swimmer
    totalCostValue += regFee * numberOfStudents;
  
    // Display the total cost
    totalCost.innerText = `$${totalCostValue.toFixed(2)}`;
  };
  
