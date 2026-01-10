const labs = [
  { name: "Lab 0", path: "/Lab0/" },
  { name: "Lab Test", path: "/LabTest/" }
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
