# notification_app_fe

Campus Notification Priority Inbox — Frontend Application

## Stack
Plain HTML + CSS + JavaScript (no framework, no build tools)
Custom logging middleware (no console.log)

## How to Run
1. Open index.html in your browser
2. Click Fetch to load notifications
3. App shows Top N priority-sorted notifications
4. All logs shown in right-side panel

## Priority Logic
Placement = weight 3
Result = weight 2
Event = weight 1
Recency bonus: +1 for notifications within last 24 hours

## API Used
GET http://20.207.122.201/evaluation-service/notifications
