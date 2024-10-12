# Image Processing System with CSV Input

This project processes CSV files containing product data and image URLs. It validates input, compresses images by 50%, and stores the processed data in a NeonDB (PostgreSQL). The system supports asynchronous processing and provides API endpoints for status tracking and webhooks for task completion notifications.

## Key Features

- **CSV Validation**: Ensures input data is in the correct format.
- **Asynchronous Image Processing**: Compresses images by 50% without blocking the main workflow.
- **Status Tracking API**: Retrieve processing status using a unique request ID.
- **Webhook Notifications**: Get notified when image processing is completed.
- **Database Integration**: Stores product info and processed images in NeonDB (PostgreSQL).

## Tech Stack

- **Language**: TypeScript
- **Backend**: Node.js, Express
- **Database**: NeonDB (PostgreSQL)
- **Image Compression**: Sharp
- **Asynchronous Handling**: Worker processes
- **API Requests**: Axios

## Setup & Configuration

1. **Database**: Set up your NeonDB connection in the `.env` file (`DATABASE_URL`).
2. **Webhook**: Configure the webhook URL to receive notifications.
3. **Port**: Define the server port in `.env` (`PORT`).

## Running the Application

1. **Start the server**:
   ```bash
   npm start
   ```
2. **2. Run the worker script for processing images**:

```bash
   npx ts-node utils/processImages.ts
```
