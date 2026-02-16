// ===== CONFIG =====
// Attribution: Generated with AI assistance and manually verified/edited.
const API_BASE =
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:8081/lab4/api/v1"
        : "https://YOUR_SERVER2_DOMAIN/lab4/api/v1";

// ===== ELEMENTS =====
const insertBtn = document.getElementById("insertBtn");
const sqlBtn = document.getElementById("sqlBtn");
const sqlInput = document.getElementById("sqlInput");
const output = document.getElementById("output");


// ===== INSERT BUTTON =====
insertBtn.addEventListener("click", async () => {
    try {
        const response = await fetch(`${API_BASE}/insert`, {
            method: "POST"
        });

        if (!response.ok) {
            const text = await response.text();
            output.innerText = `HTTP ${response.status}: ${text}`;
            return;
        }

        const data = await response.json();
        output.innerText = JSON.stringify(data, null, 2);

    } catch (err) {
        output.innerText = "Error: " + err.message;
    }
});


// ===== RUN SQL BUTTON =====
sqlBtn.addEventListener("click", async () => {

    const query = sqlInput.value.trim();

    if (!query) {
        output.innerText = "Please enter SQL query.";
        return;
    }

    try {
        const encodedQuery = encodeURIComponent(query);

        const response = await fetch(
            `${API_BASE}/sql/${encodedQuery}`,
            { method: "GET" }
        );

        if (!response.ok) {
            const text = await response.text();
            output.innerText = `HTTP ${response.status}: ${text}`;
            return;
        }

        const data = await response.json();
        output.innerText = JSON.stringify(data, null, 2);

    } catch (err) {
        output.innerText = "Error: " + err.message;
    }
});
