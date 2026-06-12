// Footer
const footer = document.querySelector("footer");

// Date
const today = new Date();
const thisYear = today.getFullYear();

// Copyright
const copyright = document.createElement("p");
copyright.innerHTML = `Ashton Thompson © ${thisYear}`;
footer.appendChild(copyright);

// Skills Array
const skills = [
  "HTML",
  "CSS",
  "SQL",
  "Git",
  "GitHub",
  "VS Code",
  "Content Creation",
];

// Skills Section
const skillsSection = document.getElementById("skills");
const skillsList = skillsSection.querySelector("ul");

// Loop Through Skills
skills.forEach((skillName) => {
  const skill = document.createElement("li");
  skill.innerText = skillName;
  skillsList.appendChild(skill);
});

// Message Form
const messageForm = document.getElementsByName("leave_message")[0];

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;
  const usersEmail = event.target.usersEmail.value;
  const usersMessage = event.target.usersMessage.value;

  // Messages Section
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");

  // Create Message Item
  const newMessage = document.createElement("li");

  // User Link
  const userLink = document.createElement("a");
  userLink.href = `mailto:${usersEmail}`;
  userLink.innerText = usersName;

  // Separator
  const separator = document.createTextNode(" — ");

  // Message Text
  const messageText = document.createElement("span");
  messageText.innerText = usersMessage;

  // Remove Button
  const removeButton = document.createElement("button");
  removeButton.innerText = "remove";
  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    newMessage.remove();
  });

  // Edit Button
  const editButton = document.createElement("button");
  editButton.innerText = "edit";
  editButton.type = "button";

  let isEditing = false;

  editButton.addEventListener("click", function () {
    if (!isEditing) {
      // Enter Edit Mode
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = messageText.innerText;

      newMessage.replaceChild(editInput, messageText);
      editButton.innerText = "save";
    } else {
      // Save Mode
      const editInput = newMessage.querySelector("input");
      const updatedText = editInput.value;

      if (updatedText.trim() === "") return;

      messageText.innerText = updatedText;

      newMessage.replaceChild(messageText, editInput);
      editButton.innerText = "edit";
    }

    isEditing = !isEditing;
  });

  // Build Message
  newMessage.appendChild(userLink);
  newMessage.appendChild(separator);
  newMessage.appendChild(messageText);
  newMessage.appendChild(editButton);
  newMessage.appendChild(removeButton);

  // Add to Page
  messageList.appendChild(newMessage);

  // Reset Form
  messageForm.reset();
});

// GitHub Fetch API
fetch("https://api.github.com/users/ThatGuyAsh/repos")
  .then((response) => response.json())
  .then((repositories) => {
    const projectSection = document.getElementById("projects");
    const projectList = projectSection.querySelector("ul");

    repositories.forEach((repo) => {
      const project = document.createElement("li");

      project.innerHTML = `
        <a href="${repo.html_url}" target="_blank">
          ${repo.name}
        </a>
      `;

      projectList.appendChild(project);
    });
  })
  .catch((error) => {
    console.log("Error fetching repositories:", error);

    const projectSection = document.getElementById("projects");

    const errorMessage = document.createElement("p");
    errorMessage.innerText = "Sorry, there was a problem loading the projects.";

    projectSection.appendChild(errorMessage);
  });
