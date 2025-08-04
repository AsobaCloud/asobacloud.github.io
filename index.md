---
title: "Quickstart"
layout: default
nav_order: 1
---

# Start Forecasting in 5 Minutes

Get up and running with Ona's energy forecasting API in minutes. Choose your preferred integration method and make your first forecast.

---

## Choose Your Path

<div class="quickstart-paths">
  <div class="path-card">
    <h3>🐍 Python Script</h3>
    <p>Upload data and get forecasts with a simple Python script</p>
    <a href="#python-quickstart" class="path-button">Start with Python</a>
  </div>
  
  <div class="path-card">
    <h3>📦 SDK</h3>
    <p>Use our official SDK for seamless integration</p>
    <a href="#sdk-quickstart" class="path-button">Use the SDK</a>
  </div>
  
  <div class="path-card">
    <h3>🌐 REST API</h3>
    <p>Direct API calls for maximum flexibility</p>
    <a href="#api-quickstart" class="path-button">Use REST API</a>
  </div>
</div>

## Learn More

<div class="learn-more-grid">
  <div class="learn-more-column">
    <div class="product-preview">
      <img src="https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Terminal+Interface" alt="Ona Terminal Interface" />
    </div>
    <h3>Ona Terminal</h3>
    <p>AI-powered infrastructure automation tool for terminal users with OODA workflow capabilities and energy asset management. Perfect for developers who prefer command-line interfaces and automated workflows.</p>
    <a href="https://code.asoba.co" target="_blank" class="learn-more-link">Explore Ona Terminal →</a>
  </div>
  
  <div class="learn-more-column">
    <div class="product-preview">
      <img src="https://via.placeholder.com/400x250/4285f4/ffffff?text=Web+App+Interface" alt="Ona On Demand Interface" />
    </div>
    <h3>Ona On Demand</h3>
    <p>Web-based demand forecasting and dispatch scheduling application with intuitive interface for business users. Designed for easy access through your browser with visual tools and dashboards.</p>
    <a href="https://app.asoba.co" target="_blank" class="learn-more-link">Launch Web App →</a>
  </div>
</div>

---

## Python Quickstart {#python-quickstart}

### 1. Install Dependencies

```bash
pip install requests python-dotenv
```

### 2. Set Up Your Environment

Create a `.env` file with your API credentials:

```ini
ONA_API_URL=https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod
ONA_API_KEY=your-api-key-here
```

### 3. Upload Historical Data & Train Model

```python
import os
import requests
from dotenv import load_dotenv

load_dotenv()

def upload_and_train():
    # Upload historical data
    url = f"{os.getenv('ONA_API_URL')}/upload_historical"
    headers = {"x-api-key": os.getenv('ONA_API_KEY')}
    
    params = {
        "customer_id": "your-customer-id",
        "filename": "historical_data.csv",
        "manufacturer": "SolarEdge", 
        "location": "CapeTown",
        "region": "af-south-1"
    }
    
    with open('historical_data.csv', 'rb') as file:
        response = requests.post(url, params=params, headers=headers, data=file)
        print(f"Upload: {response.status_code}")
    
    # Train forecasting model
    train_url = f"{os.getenv('ONA_API_URL')}/train"
    train_params = {
        "customer_id": "your-customer-id",
        "location": "CapeTown",
        "manufacturer": "SolarEdge",
        "serial_number": "SE123456",
        "region": "af-south-1",
        "testing": "True"
    }
    
    train_response = requests.post(train_url, params=train_params, headers=headers)
    print(f"Training: {train_response.status_code}")
    return train_response.json()

# Run it
result = upload_and_train()
print("✅ Model training started! Check your email for results.")
```

---

## SDK Quickstart {#sdk-quickstart}

### 1. Install the SDK

```bash
pip install ona-sdk  # Python
# or
npm install ona-sdk  # JavaScript
```

### 2. Quick Example

```python
from ona_sdk import OnaClient

# Initialize client
client = OnaClient(api_key="your-api-key")

# Upload and train in one step
result = client.upload_and_train(
    file_path="energy_data.csv",
    customer_id="your-id",
    location="CapeTown",
    manufacturer="SolarEdge"
)

print("✅ Training started! Results will be emailed to you.")
```

---

## REST API Quickstart {#api-quickstart}

### 1. Upload Historical Data

```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/upload_historical" \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/octet-stream" \
  -F "customer_id=your-customer-id" \
  -F "filename=data.csv" \
  -F "manufacturer=SolarEdge" \
  -F "location=CapeTown" \
  -F "region=af-south-1" \
  --data-binary @your-data.csv
```

### 2. Start Model Training

```bash
curl -X POST "https://yn058ezh38.execute-api.af-south-1.amazonaws.com/prod/train" \
  -H "x-api-key: YOUR_API_KEY" \
  -G \
  -d "customer_id=your-customer-id" \
  -d "location=CapeTown" \
  -d "manufacturer=SolarEdge" \
  -d "serial_number=SE123456" \
  -d "region=af-south-1" \
  -d "testing=True"
```

---

## What's Next?

🎯 **New to Ona?** → [Read Getting Started](getting-started.html) for detailed onboarding  
📚 **Need to understand the concepts?** → [Core Concepts](core-concepts.html)  
🔧 **Ready to integrate?** → [API Reference](api-reference.html)  
💡 **Want to see examples?** → [Use Cases](use-cases.html)  
🖥️ **Prefer a web interface?** → [Try Ona On-Demand](https://app.asoba.co)

---

## Need Help?

- 📧 **Technical Support**: [support@asoba.co](mailto:support@asoba.co)
- 💬 **Sales Questions**: [sales@asoba.co](mailto:sales@asoba.co)  
- 💬 **Discord Community**: [Join our Discord](https://discord.gg/nNV5evcr)
- 📖 **Full Documentation**: Browse the sidebar for detailed guides

## Get Help & Stay Updated

<div class="page-end-section">
  <div class="end-column">
    <div class="support-cta">
      <h3>Contact Support</h3>
      <p>For technical assistance, feature requests, or any other questions, please reach out to our dedicated support team.</p>
      <a href="mailto:support@asoba.co" class="support-button">Email Support</a>
      <a href="https://discord.gg/nNV5evcr" target="_blank" class="support-button" style="margin-top: 10px; display: inline-block;">
        <svg width="16" height="16" style="margin-right: 8px; vertical-align: middle;" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
        Join Discord
      </a>
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

© 2025 Asoba Corporation. All rights reserved.
