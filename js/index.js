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

for (let i = 0; i < skills.length; i++) {
  const skill = document.createElement("li");

  skill.innerText = skills[i];

  skillsList.appendChild(skill);
}

// Message Form

const messageForm = document.getElementsByName("leave_message")[0];

messageForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usersName = event.target.usersName.value;

  const usersEmail = event.target.usersEmail.value;

  const usersMessage = event.target.usersMessage.value;

  console.log(usersName, usersEmail, usersMessage);

  // Messages Section

  const messageSection = document.getElementById("messages");

  const messageList = messageSection.querySelector("ul");

  // New Message

  const newMessage = document.createElement("li");

  newMessage.innerHTML = `
        <a href="mailto:${usersEmail}">${usersName}</a>
        <span> ${usersMessage} </span>
    `;

  // Remove Button

  const removeButton = document.createElement("button");

  removeButton.innerText = "remove";

  removeButton.type = "button";

  removeButton.addEventListener("click", function () {
    const entry = removeButton.parentNode;

    entry.remove();
  });

  // Add Button To Message

  newMessage.appendChild(removeButton);

  // Add Message To List

  messageList.appendChild(newMessage);

  // Reset Form

  messageForm.reset();
});

// GitHub Fetch API

fetch("https://api.github.com/users/ThatGuyAsh/repos")
  .then((response) => response.json())

  .then((repositories) => {
    console.log(repositories);

    // Projects Section

    const projectSection = document.getElementById("projects");

    const projectList = projectSection.querySelector("ul");

    // Loop Through Repositories

    for (let i = 0; i < repositories.length; i++) {
      const project = document.createElement("li");

      project.innerHTML = `
  <a href="${repositories[i].html_url}" target="_blank">
    ${repositories[i].name}
  </a>
`;

      projectList.appendChild(project);
    }
  })

  .catch((error) => {
    console.log("Error fetching repositories:", error);

    const projectSection = document.getElementById("projects");

    const errorMessage = document.createElement("p");

    errorMessage.innerText = "Sorry, there was a problem loading the projects.";

    projectSection.appendChild(errorMessage);
  });
