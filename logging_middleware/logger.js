const LOG_LEVELS = { INFO: "INFO", WARN: "WARN", ERROR: "ERROR", DEBUG: "DEBUG" };
const logStore = [];

function getTimestamp() { return new Date().toISOString(); }

function writeLog(level, message, meta = {}) {
  const entry = { timestamp: getTimestamp(), level, message, meta };
  logStore.push(entry);
  const panel = document.getElementById("log-panel");
  if (panel) {
    const div = document.createElement("div");
    div.className = `log-entry log-${level.toLowerCase()}`;
    const metaStr = Object.keys(meta).length ? " — " + JSON.stringify(meta) : "";
    div.innerHTML = `<span class="log-time">${entry.timestamp}</span><span class="log-level">[${level}]</span><span class="log-msg">${message}${metaStr}</span>`;
    panel.appendChild(div);
    panel.scrollTop = panel.scrollHeight;
  }
  return entry;
}

const Logger = {
  info:  (msg, meta={}) => writeLog(LOG_LEVELS.INFO,  msg, meta),
  warn:  (msg, meta={}) => writeLog(LOG_LEVELS.WARN,  msg, meta),
  error: (msg, meta={}) => writeLog(LOG_LEVELS.ERROR, msg, meta),
  debug: (msg, meta={}) => writeLog(LOG_LEVELS.DEBUG, msg, meta),
  getLogs: () => [...logStore],
  clearLogs: () => {
    logStore.length = 0;
    const p = document.getElementById("log-panel");
    if (p) p.innerHTML = "";
  },
};

function requestMiddleware(url, method = "GET") {
  const start = Date.now();
  Logger.info("HTTP request started", { method, url });
  return {
    end: (status, extra={}) => {
      Logger.info("HTTP request completed", { method, url, status, duration: `${Date.now()-start}ms`, ...extra });
    },
    fail: (err) => {
      Logger.error("HTTP request failed", { method, url, error: err.message, duration: `${Date.now()-start}ms` });
    }
  };
}
