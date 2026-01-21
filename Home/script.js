const labs = [
  { name: "Lab 0", path: "/Lab0/" },
  { name: "Lab 1", path: "/Lab1/" },
  { name: "Lab 2", path: "/Lab2/" },
  { name: "Lab Template", path: "/LabTemplate/" }
  // Add more labs as needed
];

const container = document.getElementById("labs");

labs.forEach(lab => {
  const btn = document.createElement("div");
  btn.className = "lab-btn";

  const text = document.createElement("span");
  text.textContent = lab.name;

  btn.appendChild(text);

  btn.onclick = () => window.location.href = lab.path;

  container.appendChild(btn);
});
