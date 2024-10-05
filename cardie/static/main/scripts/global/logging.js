// A simple collection of functions to log data to the JavaScript console

const LOG_LEVEL = "DEBUG";

const log_to_level_number_map = {
    DEBUG: 1,
    INFO: 2,
    WARNING: 3,
    CRITICAL: 4,
};

function log_level_to_number(level) {
    return log_to_level_number_map[level] ?? 0;
}

function log_date() {
    /** @constant
     * @type {Intl.DateTimeFormatOptions}
     */
    const options = {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "EST",
    };
    const now = new Date();
    const string = now.toLocaleTimeString("en-us", options);
    return string;
}

function log(level, text) {
    const log_level = log_level_to_number(level);
    const allowed_log_level = log_level_to_number(LOG_LEVEL);
    const date = log_date();

    if (log_level >= allowed_log_level) {
        if (log_level === 0) {
            console.log(
                `%c[${date}] ${text}`,
                "color: #a1a1a1; font-style: italic;",
            );
        } else if (log_level === 1) {
            console.debug(`%c[${date}] ${text}`, "color: #ffffff;");
        } else if (log_level === 2) {
            console.info(`%c[${date}] ${text}`, "color: #7fb5ff;");
        } else if (log_level === 3) {
            console.warn(
                `%c[${date}] ${text}`,
                "color: #ffa371; font-weight: bold;",
            );
        } else if (log_level === 4) {
            console.error(
                `%c[${date}] ${text}`,
                "color: #ff7878; font-weight: bold;",
            );
        }
    } else {
        null;
    }
}
