# Logging Middleware

A custom lightweight logging middleware built for the Campus Notifications application.

## Features

- Custom log levels: INFO, WARN, ERROR, DEBUG
- Timestamped log entries (ISO format)
- In-page log panel rendering (no console.log used)
- HTTP request lifecycle tracking (start, end, fail)
- In-memory log store for retrieval

## Usage

Logger.info("Fetching notifications");
Logger.warn("No notifications found");
Logger.error("API call failed", { error: "Network error" });
Logger.debug("Priority computed", { id: "...", score: 3 });

const req = requestMiddleware("http://api/notifications", "GET");
req.end(200, { count: 10 });
req.fail(new Error("timeout"));

## Rules Followed

- No console.log anywhere in the project
- No built-in language logger libraries
- Custom implementation from scratch
