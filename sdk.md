---
title: "Ona SDK"
layout: default
nav_order: 3
---

## Getting Started with the Ona SDK {#getting-started}

This reference documents every object and method available in Ona's SDK for seamless integration with the Ona API Platform. Use our SDK to upload large historical datasets, retrieve pre-signed URLs for secure file uploads, and interact programmatically with Ona's APIs for energy forecasting, dispatching, and analysis.

The Ona SDK supports both JavaScript (Node.js & Browser) and Python, making it easy for developers to integrate Ona into third-party applications.

### Key Features
- **Pre-Signed URL Generation** – Secure and efficient file uploads to AWS S3.  
- **Historical Data Upload** – Enable seamless ingestion of large energy datasets.  
- **Dual SDK Support** – Use in both **JavaScript** and **Python** applications.  
- **Error Handling** – Detailed API responses and logging for debugging.  
- **Future Compatibility** – Support for **forecasting & dispatch APIs** *(coming soon!)*  

---

## Installation {#installation}

### Prerequisites
Before installing, ensure you have:
- **Node.js 14+** (for JavaScript SDK)
- **Python 3.7+** (for Python SDK)
- **AWS Credentials** configured in `.env`
- **API Key** for secure authentication

###  JavaScript Installation
```sh
npm install Ona-sdk
```
or manually:

```sh
mkdir Ona-sdk && cd Ona-sdk
npm init -y
npm install axios dotenv
```
### Python Installation
```sh
pip install requests python-dotenv
```
or manually:

```sh
mkdir Ona_sdk && cd Ona_sdk
python -m venv venv && source venv/bin/activate
pip install requests python-dotenv
```
### Environment Setup  
Create a .env file with:

```ini
Ona_API_URL=https://yn058ezh38.execute-api.af-south-1.amazonaws.com/test
Ona_API_KEY=your-api-key-here
```
## Usage Examples {#usage-examples}  

### JavaScript SDK
```javascript
require("dotenv").config();
const axios = require("axios");
const fs = require("fs");

class OnaUploader {
    constructor() {
        this.apiUrl = process.env.Ona_API_URL;
        this.apiKey = process.env.Ona_API_KEY;

        if (!this.apiUrl || !this.apiKey) {
            throw new Error("Missing API URL or API Key. Set Ona_API_URL and Ona_API_KEY in .env.");
        }
    }

    async getPresignedUrl(customer_id, region, location, manufacturer, filename) {
        const url = `${this.apiUrl}/upload_train`;
        const headers = { "x-api-key": this.apiKey };

        try {
            const response = await axios.get(url, {
                params: { customer_id, region, location, manufacturer, filename },
                headers,
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching pre-signed URL:", error);
            throw error;
        }
    }

    async uploadFile(filePath, presignedUrl) {
        try {
            const fileData = fs.readFileSync(filePath);
            await axios.put(presignedUrl, fileData, { headers: { "Content-Type": "text/csv" } });
            console.log("File uploaded successfully!");
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async uploadToS3(filePath, customer_id, region, location, manufacturer) {
        const filename = filePath.split("/").pop();
        console.log("Fetching Pre-Signed URL...");
        const { presigned_url } = await this.getPresignedUrl(customer_id, region, location, manufacturer, filename);
        console.log("Uploading to S3...");
        await this.uploadFile(filePath, presigned_url);
        console.log(`Upload completed: ${presigned_url}`);
    }
}

// Example Usage
(async () => {
    const uploader = new OnaUploader();
    await uploader.uploadToS3("sample.csv", "280001", "af-south-1", "CapeTown", "lux");
})();
```
### Python SDK
```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

class OnaUploader:
    def __init__(self):
        self.api_url = os.getenv("Ona_API_URL")
        self.api_key = os.getenv("Ona_API_KEY")

        if not self.api_url or not self.api_key:
            raise ValueError("Missing API URL or API Key. Set Ona_API_URL and Ona_API_KEY in .env.")

    def get_presigned_url(self, customer_id, region, location, manufacturer, filename):
        params = {
            "customer_id": customer_id,
            "region": region,
            "location": location,
            "manufacturer": manufacturer,
            "filename": filename,
        }

        headers = {"x-api-key": self.api_key}
        response = requests.get(f"{self.api_url}/upload_train", params=params, headers=headers)
        response.raise_for_status()
        return response.json()

    def upload_file(self, file_path, presigned_url):
        with open(file_path, "rb") as file:
            headers = {"Content-Type": "text/csv"}
            response = requests.put(presigned_url, data=file, headers=headers)
            response.raise_for_status()

    def upload_to_s3(self, file_path, customer_id, region, location, manufacturer):
        filename = os.path.basename(file_path)
        print("Fetching Pre-Signed URL...")
        presigned_data = self.get_presigned_url(customer_id, region, location, manufacturer, filename)
        presigned_url = presigned_data["presigned_url"]
        print("Uploading to S3...");
        self.upload_file(file_path, presigned_url)
        print(f"Upload completed: {presigned_url}")

# Example Usage
if __name__ == "__main__":
    uploader = OnaUploader();
    uploader.upload_to_s3("sample.csv", "280001", "af-south-1", "CapeTown", "lux")
```
## API Reference {#api-reference}  
🔹 **getPresignedUrl(customer_id, region, location, manufacturer, filename)**  
Returns: A pre-signed S3 URL to upload historical energy data.  
Usage:

- **JavaScript:** `uploader.getPresignedUrl("280001", "af-south-1", "CapeTown", "lux", "data.csv")`  
- **Python:** `uploader.get_presigned_url("280001", "af-south-1", "CapeTown", "lux", "data.csv")`

🔹 **uploadFile(filePath, presignedUrl)**  
Uploads a file to the S3 bucket using the generated pre-signed URL.  
Usage:

- **JavaScript:** `uploader.uploadFile("sample.csv", presigned_url)`  
- **Python:** `uploader.upload_file("sample.csv", presigned_url)`

🔹 **uploadToS3(filePath, customer_id, region, location, manufacturer)**  
Fetches a pre-signed URL and uploads a file to S3 in one step.  
Usage:

- **JavaScript:** `uploader.uploadToS3("sample.csv", "280001", "af-south-1", "CapeTown", "lux")`  
- **Python:** `uploader.upload_to_s3("sample.csv", "280001", "af-south-1", "CapeTown", "lux")`

## **Troubleshooting** {#troubleshooting}  
### Common Issues

- **403 Forbidden**: Ensure your API key is valid and has the necessary permissions.
- **SignatureDoesNotMatch**: Verify your `.env` settings and AWS credentials. Double-check the region and endpoint configurations.
- **Connection Timeout**: Check your internet connection and retry. Ensure that the API endpoint is accessible from your network.
- **5XX Server Errors**: Ensure that your upload is in the proper `.csv` format and that you are providing all required parameters in the correct order. Retry the request after some time.
- **Invalid Input Format**: Confirm that the data types and formats match the API requirements.

### Debugging Tips

- **Enable Logging**: Use detailed logging to capture request and response details for further analysis.
- **Check API Status**: Visit our [API status page](https://status.asoba.co) for real-time updates on service availability.
- **Review Documentation**: Ensure that you are following the latest API documentation and guidelines.

### Contact Support

For further assistance, please reach out to our support team at [support@asoba.co](mailto:support@asoba.co). We are here to help you with any technical or operational queries.

## **Future Enhancements**  
Model Training & Forecasting API Integration  
Data Synchronization for Real-Time Dispatch  
Webhooks for Asynchronous Processing

📧 **Support**  
For support, reach out to [support@asoba.co](mailto:support@asoba.co). 