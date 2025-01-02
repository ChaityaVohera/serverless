const fs = require("fs");
const path = require("path");
const { handler } = require("./index");

// Load environment variables
require("dotenv").config();

// Load the test event from `testEvent.json`
const eventPath = path.resolve(__dirname, "testEvent.json");
const event = JSON.parse(fs.readFileSync(eventPath, "utf8"));
const ers = event.Records;

// Run the handler function with the test event
(async () => {
  try {
    const result = await handler(event);
    console.log("Handler result:", result);
  } catch (error) {
    console.error("Error executing handler:", error);
  }
})();
