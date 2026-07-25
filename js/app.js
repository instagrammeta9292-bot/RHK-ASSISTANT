const chatBox = document.getElementById("chatBox");
const message = document.getElementById("message");
const sendBtn = document.getElementById("sendBtn");

function addUserMessage(text) {
    const div = document.createElement("div");
    div.className = "user";
    div.textContent = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function addBotMessage(text) {
    const div = document.createElement("div");
    div.className = "bot";
    div.innerHTML = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function processMessage(text) {

    const msg = text.toLowerCase();

    // Greeting
    if (
        msg.includes("hi") ||
        msg.includes("hello") ||
        msg.includes("hey")
    ) {
        addBotMessage("👋 Hello! I'm <b>RHK Assistant</b>.");
        return;
    }

    // Time
    if (msg.includes("time")) {
        const now = new Date();
        addBotMessage("🕒 Current Time: <b>" + now.toLocaleTimeString() + "</b>");
        return;
    }

    // Date
    if (msg.includes("date")) {
        const now = new Date();
        addBotMessage("📅 Today is <b>" + now.toDateString() + "</b>");
        return;
    }

    // Reminder
    if (
        msg.includes("remember") ||
        msg.includes("remind")
    ) {

        if (typeof saveReminder === "function") {
            saveReminder(text);
        } else {
            addBotMessage("⚠ Reminder system is not available yet.");
        }

        return;
    }

    // Show reminders
    if (
        msg.includes("my reminders") ||
        msg.includes("show reminders")
    ) {

        if (typeof showReminders === "function") {
            showReminders();
        }

        return;
    }

    // Default reply
    addBotMessage(
        "🤖 I understood:<br><br><b>" +
        text +
        "</b><br><br>More AI features are coming soon!"
    );
}

function sendMessage() {

    const text = message.value.trim();

    if (text === "") return;

    addUserMessage(text);

    message.value = "";

    setTimeout(() => {
        processMessage(text);
    }, 500);
}

sendBtn.addEventListener("click", sendMessage);

message.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});
