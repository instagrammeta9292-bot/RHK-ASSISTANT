// Ask permission for notifications
if ("Notification" in window) {

    if (Notification.permission !== "granted") {

        Notification.requestPermission();

    }

}

// Show notification
function showNotification(title, body) {

    if (!("Notification" in window)) return;

    if (Notification.permission === "granted") {

        new Notification(title, {
            body: body,
            icon: "https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
        });

    }

}

// Schedule reminder
function scheduleReminder(reminderText) {

    // Find time like 1:30 or 01:30
    const match = reminderText.match(/(\d{1,2}):(\d{2})/);

    if (!match) return;

    const hour = parseInt(match[1]);
    const minute = parseInt(match[2]);

    const now = new Date();

    const reminderTime = new Date();

    reminderTime.setHours(hour);
    reminderTime.setMinutes(minute);
    reminderTime.setSeconds(0);

    // If time already passed today, schedule tomorrow
    if (reminderTime <= now) {
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const delay = reminderTime.getTime() - now.getTime();

    setTimeout(() => {

        showNotification(
            "🔔 RHK Reminder",
            reminderText
        );

        addBotMessage(
            "🔔 Reminder: <b>" + reminderText + "</b>"
        );

    }, delay);

}
