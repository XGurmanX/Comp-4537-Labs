const labs = [
  { name: "Lab 0", path: "/Labs/Lab0/" },
  { name: "Lab 1", path: "/Labs/Lab1/" },
  { name: "Lab Test", path: "/Labs/LabTest/" }
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
