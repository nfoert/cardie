// A simple collection of functions to log data to the JavaScript console

var LOG_LEVEL = "DEBUG";

function log_level_to_number(level) {
    if (level == "DEBUG") {
        return 1;

    } else if (level == "INFO") {
        return 2;

    } else if (level == "WARNING") {
        return 3;

    } else if (level == "CRITICAL") {
        return 4;

    } else {
        return 0;
    }
}

function log_date() {
    const options = { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, "timeZone": "EST" };
    var now = new Date;
    var string = now.toLocaleTimeString("en-us", options);
    return string;
}

function log(level, text) {
    let log_level = log_level_to_number(level);
    let allowed_log_level = log_level_to_number(LOG_LEVEL);
    let date = log_date();

    if (log_level >= allowed_log_level) {
        if (log_level == 0) {
            console.log(`%c[${date}] ${text}`, "color: #a1a1a1; font-style: italic;");

        } else if (log_level == 1) {
            console.debug(`%c[${date}] ${text}`, "color: #ffffff;");

        } else if (log_level == 2) {
            console.info(`%c[${date}] ${text}`, "color: #7fb5ff;");

        } else if (log_level == 3) {
            console.warn(`%c[${date}] ${text}`, "color: #ffa371; font-weight: bold;");

        } else if (log_level == 4) {
            console.error(`%c[${date}] ${text}`, "color: #ff7878; font-weight: bold;");

        }
    } else {
        null;
    }
}