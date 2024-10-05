const notification_box = document.createElement("div");
notification_box.classList.add("notifications");
document.body.appendChild(notification_box);

function create_notification(header, body, icon) {
    const notification = document.createElement("div");
    notification.classList.add("notification");

    const notification_icon = document.createElement("i");
    notification_icon.className = `ph-bold ph-${icon} notification_icon`;

    const notification_text = document.createElement("div");
    notification_text.classList.add("notification_text");

    const notification_header = document.createElement("p");
    notification_header.classList.add("notification_header");
    notification_header.innerText = header;

    const notification_body = document.createElement("p");
    notification_body.classList.add("notification_body");
    notification_body.innerText = body;

    notification_text.appendChild(notification_header);
    notification_text.appendChild(notification_body);

    notification.appendChild(notification_icon);
    notification.appendChild(notification_text);

    document.querySelector(".notifications").appendChild(notification);

    setTimeout(() => {
        notification.classList.add("show");
    }, 100);

    setTimeout(() => {
        notification.classList.remove("show");

        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}
