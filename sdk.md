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

---

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

---

## **Future Enhancements**  
Model Training & Forecasting API Integration  
Data Synchronization for Real-Time Dispatch  
Webhooks for Asynchronous Processing

📧 **Support**  
For support, reach out to [support@asoba.co](mailto:support@asoba.co).

---

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
    </div>
  </div>
  
  <div class="end-column">
    <div id="mc_embed_shell">
      <link href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" rel="stylesheet" type="text/css">
      <style type="text/css">
        #mc_embed_signup{background:#fff; false;clear:left; font:14px Helvetica,Arial,sans-serif; width: 100%;}
      </style>
      <div id="mc_embed_signup">
        <form action="https://asoba.us10.list-manage.com/subscribe/post?u=459ea321d7831d7b9f5fac70f&amp;id=e03a70f492&amp;f_id=000a9ae3f0" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank">
          <div id="mc_embed_signup_scroll">
            <h3>Subscribe to Updates</h3>
            <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
            <div class="mc-field-group"><label for="mce-FNAME">First Name </label><input type="text" name="FNAME" class=" text" id="mce-FNAME" value=""></div>
            <div class="mc-field-group"><label for="mce-EMAIL">Email Address <span class="asterisk">*</span></label><input type="email" name="EMAIL" class="required email" id="mce-EMAIL" value="" required=""></div>
            <div id="mce-responses" class="clear">
              <div class="response" id="mce-error-response" style="display: none;"></div>
              <div class="response" id="mce-success-response" style="display: none;"></div>
            </div>
            <div aria-hidden="true" style="position: absolute; left: -5000px;"><input type="text" name="b_459ea321d7831d7b9f5fac70f_e03a70f492" tabindex="-1" value=""></div>
            <div class="clear"><input type="submit" name="subscribe" id="mc-embedded-subscribe" class="button" value="Subscribe"></div>
          </div>
        </form>
      </div>
      <script type="text/javascript" src="//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"></script>
      <script type="text/javascript">(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[1]='FNAME';ftypes[1]='text';fnames[0]='EMAIL';ftypes[0]='email';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='ADDRESS';ftypes[3]='address';fnames[4]='PHONE';ftypes[4]='phone';fnames[5]='BIRTHDAY';ftypes[5]='birthday';fnames[6]='COMPANY';ftypes[6]='text';fnames[7]='MMERGE7';ftypes[7]='url';fnames[8]='MMERGE8';ftypes[8]='text';fnames[9]='MMERGE9';ftypes[9]='text';fnames[10]='MMERGE10';ftypes[10]='text';fnames[11]='MMERGE11';ftypes[11]='url';fnames[12]='MMERGE12';ftypes[12]='text';fnames[13]='MMERGE13';ftypes[13]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
    </div>
  </div>
</div> 