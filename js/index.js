// Footer

const footer = document.createElement("footer");

document.body.appendChild(footer);

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
