// Save reminder
function saveReminder(text) {

    let reminders =
        JSON.parse(localStorage.getItem("rhk_reminders")) || [];

    reminders.push({
        id: Date.now(),
        text: text,
        created: new Date().toLocaleString()
    });

    localStorage.setItem(
        "rhk_reminders",
        JSON.stringify(reminders)
    );

    addBotMessage(
        "✅ Reminder saved.<br><br><b>" +
        text +
        "</b>"
    );
    scheduleReminder(text);
}

// Show reminders
function showReminders() {

    let reminders =
        JSON.parse(localStorage.getItem("rhk_reminders")) || [];

    if (reminders.length === 0) {
        addBotMessage("📭 You don't have any reminders.");
        return;
    }

    let html = "<b>📋 Your Reminders</b><br><br>";

    reminders.forEach((item, index) => {

        html +=
            (index + 1) +
            ". " +
            item.text +
            "<br><small>" +
            item.created +
            "</small><br><br>";

    });

    addBotMessage(html);
}

// Delete reminder by number
function deleteReminder(index) {

    let reminders =
        JSON.parse(localStorage.getItem("rhk_reminders")) || [];

    if (
        index < 1 ||
        index > reminders.length
    ) {

        addBotMessage("❌ Invalid reminder number.");
        return;

    }

    reminders.splice(index - 1, 1);

    localStorage.setItem(
        "rhk_reminders",
        JSON.stringify(reminders)
    );

    addBotMessage("🗑 Reminder deleted.");
}

// Clear all reminders
function clearReminders() {

    localStorage.removeItem("rhk_reminders");

    addBotMessage("🧹 All reminders cleared.");
}
