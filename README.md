# 📧 **Serverless Email Verification Function**

This is an AWS Lambda function that processes email verification requests. The function is triggered by Amazon SNS messages, constructs a verification URL, and sends verification emails using SendGrid.

## **Features**

- Processes Amazon SNS messages to trigger email sending.
- Validates input data and constructs a secure verification URL.
- Sends verification emails using SendGrid.
- Logs email events (sent, failed, etc.) to a log file or database.
- Supports environment-specific configurations (e.g., AWS Secrets Manager for production).

---

## **Usage**

1. Deploy the Lambda function in AWS.
2. Ensure an SNS topic is configured to trigger the function.
3. The function processes SNS messages with the following fields:
   - `email`: The recipient's email address.
   - `verificationToken`: Token for email verification.
   - `baseURL`: The base URL of the application.
   - `verificationPath`: Path for the verification endpoint.

---

## **Dependencies**

- [`@aws-sdk/client-secrets-manager`](https://www.npmjs.com/package/@aws-sdk/client-secrets-manager): For fetching secrets from AWS Secrets Manager.
- [`dotenv`](https://www.npmjs.com/package/dotenv): For loading environment variables.
- [`@sendgrid/mail`](https://www.npmjs.com/package/@sendgrid/mail): For sending emails.
- [`winston`](https://www.npmjs.com/package/winston): For structured logging.

---

## **Environment Variables**

The following environment variables must be configured:

- **`AWS_REGION`**: AWS region for the Lambda function (e.g., `us-east-1`).
- **`AWS_ACCESS_KEY_ID`**: AWS access key ID.
- **`AWS_SECRET_ACCESS_KEY`**: AWS secret access key.
- **`SENDGRID_API_KEY`**: API key for SendGrid.
- **`NODE_ENV`**: Specifies the environment (`production` or `development`).

---

## **Functionality**

1. **Message Processing**:

   - Extracts required fields (`email`, `verificationToken`, `baseURL`, `verificationPath`) from the SNS message.
   - Validates the extracted fields.

2. **Verification URL Construction**:

   - Constructs a URL in the format:
     ```
     <baseURL><verificationPath>?token=<verificationToken>&email=<encodedEmail>
     ```

3. **Email Sending**:

   - Uses SendGrid to send an email containing the verification link.

4. **Logging**:

   - Logs detailed email events (success or failure) using Winston.

5. **Error Handling**:
   - Catches and logs errors during email sending or other operations.

---

## **Logging**

- **Console Logging**: Outputs logs to the console for monitoring in real-time.
- **File Logging**: Logs are stored in `email_service.log`.
- **Email Events**: Detailed email events are logged (e.g., sent, failed, error messages).

---

## **Error Handling**

- Errors during secret fetching, email sending, or SNS message processing are caught and logged.
- Detailed stack traces are provided for debugging in `debug` mode.

---

## **Setup and Deployment**

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. Configure Environment Variables: Create a `.env` file and define the required environment variables.

3. Deploy to AWS Lambda: Package the code and upload it to AWS Lambda. Use the following steps. Zip your project:

   ```bash
   zip -r ./webapp.zip ./* .env -x "node_modules/*"
   ```

   Upload the zip file to your Lambda function.

4. Link to SNS Topic: Configure an SNS topic to trigger the Lambda function on new messages.

## **Testing**

Local Testing
**Use a test event in JSON format**:

```bash
{
  "Records": [
    {
      "Sns": {
        "Message": "{\"email\": \"user@example.com\", \"verificationToken\": \"abc123\", \"baseURL\": \"https://example.com\", \"verificationPath\": \"/verify\"}"
      }
    }
  ]
}
```

- Run the function locally:

```bash
node index.js
```

## **Production Testing**

- Publish a test message to the SNS topic.
- Monitor logs in CloudWatch to verify the function's execution.

## **Future Enhancements**

- Add support for retries in case of email sending failures.
- Store email logs in a database for better analytics.
- Implement email templates for improved customization.
