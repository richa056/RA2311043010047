# Stage 1

## Campus Notification Priority Inbox — System Design

## Problem Statement
Students receive too many notifications. Important ones get buried.
Goal: Always show the top N most important unread notifications.

## Priority Model

| Type      | Weight |
|-----------|--------|
| Placement | 3      |
| Result    | 2      |
| Event     | 1      |

Recency bonus: +1 for notifications within last 24 hours

Score formula: score = typeWeight + recencyBonus

## Data Structure: Max-Heap

To efficiently maintain top N notifications as new ones arrive, a max-heap is used.
- Insert: O(log n)
- Get Top N: O(n)
- Update on new arrival: O(log n)

## Algorithm
1. Fetch all notifications from API
2. Assign each notification a priority score
3. Insert into max-heap sorted by score
4. Ties broken by timestamp (newer wins)
5. Extract top N and display

## Handling New Notifications
- New notification is scored and inserted into heap
- If score > minimum in current top N, it replaces minimum
- Top N always stays updated in O(log n) time

## Logging
All operations tracked using custom Logging Middleware (logging_middleware/logger.js)
- API request start/end/failure
- Score computation per notification
- Heap insert/extract
- UI render events
No console.log or built-in loggers used anywhere.

## API
Endpoint: http://20.207.122.201/evaluation-service/notifications
Method: GET
Auth: Pre-authorised

## Response Shape
{
  "notifications": [
    {
      "ID": "uuid",
      "Type": "Placement | Result | Event",
      "Message": "string",
      "Timestamp": "ISO datetime"
    }
  ]
}
