---
title: "EnergyAnalyst LLM Demo"
layout: default
nav_order: 8
---

<style>
/* Chat Container Styles */
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  position: relative;
}

/* Chat Messages Area */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background: white;
  scroll-behavior: smooth;
}

.message {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  flex-shrink: 0;
}

.message.user .message-avatar {
  background: var(--primary-blue);
  color: white;
}

.message.assistant .message-avatar {
  background: #e8f5e8;
  color: #2d5a2d;
}

.message-content {
  max-width: 70%;
  padding: 12px 16px;
  border-radius: 8px;
  line-height: 1.5;
}

.message.user .message-content {
  background: var(--primary-blue);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: #f0f4ff;
  color: var(--text-dark);
  border-bottom-left-radius: 4px;
}

.message-content p {
  margin: 0 0 8px 0;
}

.message-content p:last-child {
  margin-bottom: 0;
}

.message-content code {
  background: rgba(0, 0, 0, 0.1);
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}

.message.assistant .message-content code {
  background: rgba(69, 91, 241, 0.1);
  color: var(--accent-blue);
}

.message-content pre {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 12px;
  overflow-x: auto;
  margin: 8px 0;
}

.message.assistant .message-content pre {
  background: white;
}

/* Typing Indicator */
.typing-indicator {
  display: none;
  align-items: center;
  gap: 12px;
  padding: 0 20px 20px 20px;
}

.typing-indicator.active {
  display: flex;
}

.typing-dots {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
  background: #f0f4ff;
  border-radius: 8px;
}

.typing-dot {
  width: 8px;
  height: 8px;
  background: var(--primary-blue);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  30% {
    opacity: 1;
    transform: scale(1);
  }
}

/* Chat Input Area */
.chat-input-container {
  position: sticky;
  bottom: 0;
  border-top: 1px solid #e9ecef;
  background: white;
  padding: 20px;
  z-index: 10;
}

.chat-input-wrapper {
  display: flex;
  gap: 12px;
  align-items: flex-end;
}

.chat-input-field {
  flex: 1;
  position: relative;
}

#chat-input {
  width: 100%;
  min-height: 44px;
  max-height: 120px;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: none;
  font-family: 'DM Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
}

#chat-input:focus {
  outline: none;
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 3px rgba(69, 91, 241, 0.1);
}

#chat-input::placeholder {
  color: #999;
}

.send-button {
  padding: 12px 20px;
  background: var(--primary-blue);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
}

.send-button:hover:not(:disabled) {
  background: var(--accent-blue);
  transform: translateY(-1px);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Welcome Message */
.welcome-message {
  text-align: center;
  padding: 40px;
  color: #666;
}

.welcome-message h3 {
  color: var(--primary-blue);
  margin-bottom: 16px;
}

.suggested-prompts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
  margin-top: 24px;
}

.prompt-suggestion {
  padding: 12px 16px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  font-size: 14px;
  color: var(--text-dark);
}

.prompt-suggestion:hover {
  background: #f0f4ff;
  border-color: var(--primary-blue);
  transform: translateY(-1px);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .chat-container {
    height: calc(100vh - 120px);
  }
  
  .message-content {
    max-width: 85%;
  }
  
  .suggested-prompts {
    grid-template-columns: 1fr;
  }
  
  .chat-input-wrapper {
    flex-direction: column;
    align-items: stretch;
  }
  
  .send-button {
    width: 100%;
    justify-content: center;
  }
}
</style>


<div class="chat-container">
  <div class="chat-messages" id="chat-messages">
    <div class="welcome-message" id="welcome-message">
      <h3>Welcome to EnergyAnalyst</h3>
      <p>I'm your AI assistant for energy system analysis. Ask me about solar performance, maintenance strategies, or any energy-related questions.</p>
      
      <div class="suggested-prompts">
        <div class="prompt-suggestion" onclick="sendSuggestedPrompt('What are the key factors affecting solar panel efficiency?')">
          What are the key factors affecting solar panel efficiency?
        </div>
        <div class="prompt-suggestion" onclick="sendSuggestedPrompt('How can I optimize my solar farm\'s performance?')">
          How can I optimize my solar farm's performance?
        </div>
        <div class="prompt-suggestion" onclick="sendSuggestedPrompt('What maintenance schedule do you recommend for solar panels?')">
          What maintenance schedule do you recommend for solar panels?
        </div>
        <div class="prompt-suggestion" onclick="sendSuggestedPrompt('Explain inverter efficiency and its impact on energy production')">
          Explain inverter efficiency and its impact on energy production
        </div>
      </div>
    </div>
    
    <div class="typing-indicator" id="typing-indicator">
      <div class="message-avatar">EA</div>
      <div class="typing-dots">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    </div>
  </div>
  
  <div class="chat-input-container">
    <div class="chat-input-wrapper">
      <div class="chat-input-field">
        <textarea 
          id="chat-input" 
          placeholder="Ask about energy systems, solar performance, maintenance..."
          rows="1"
        ></textarea>
      </div>
      <button class="send-button" id="send-button" onclick="sendMessage()">
        Send
      </button>
    </div>
  </div>
</div>

<script>
// Configuration
const CONFIG = {
  // Update these values when you have your EC2 instance ready
  API_ENDPOINT: 'http://your-ec2-instance.com:8080/generate', // Replace with your TGI endpoint
  MAX_TOKENS: 1024,
  TEMPERATURE: 0.7,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// State management
let isTyping = false;
let messageHistory = [];

// DOM elements
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendButton = document.getElementById('send-button');
const typingIndicator = document.getElementById('typing-indicator');
const welcomeMessage = document.getElementById('welcome-message');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  // Auto-resize textarea
  chatInput.addEventListener('input', autoResizeTextarea);
  
  // Enter key handling
  chatInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
  
});

// Auto-resize textarea
function autoResizeTextarea() {
  chatInput.style.height = 'auto';
  chatInput.style.height = Math.min(chatInput.scrollHeight, 120) + 'px';
}


// Message handling
function addMessage(content, isUser = false) {
  // Hide welcome message on first message
  if (welcomeMessage) {
    welcomeMessage.style.display = 'none';
  }
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message ' + (isUser ? 'user' : 'assistant');
  
  const avatar = document.createElement('div');
  avatar.className = 'message-avatar';
  avatar.textContent = isUser ? 'U' : 'EA';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'message-content';
  contentDiv.innerHTML = formatMessage(content);
  
  messageDiv.appendChild(avatar);
  messageDiv.appendChild(contentDiv);
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  return messageDiv;
}

function formatMessage(content) {
  // Convert markdown-like formatting to HTML
  return content
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

function showTypingIndicator() {
  typingIndicator.classList.add('active');
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  typingIndicator.classList.remove('active');
}

// Send message
async function sendMessage() {
  const message = chatInput.value.trim();
  if (!message || isTyping) return;
  
  // Clear input
  chatInput.value = '';
  autoResizeTextarea();
  
  // Add user message
  addMessage(message, true);
  messageHistory.push({ role: 'user', content: message });
  
  // Show typing indicator
  isTyping = true;
  sendButton.disabled = true;
  showTypingIndicator();
  
  try {
    // Get AI response
    const response = await getAIResponse(message);
    
    // Hide typing indicator
    hideTypingIndicator();
    
    // Add AI response
    addMessage(response);
    messageHistory.push({ role: 'assistant', content: response });
  } catch (error) {
    console.error('Error getting response:', error);
    hideTypingIndicator();
    addMessage('I apologize, but I encountered an error. Please try again later.');
  } finally {
    isTyping = false;
    sendButton.disabled = false;
    chatInput.focus();
  }
}

// Get AI response
async function getAIResponse(prompt) {
  // If connected to real endpoint
  if (CONFIG.API_ENDPOINT !== 'http://your-ec2-instance.com:8080/generate') {
    const requestBody = {
      inputs: prompt,
      parameters: {
        max_new_tokens: CONFIG.MAX_TOKENS,
        temperature: CONFIG.TEMPERATURE,
        do_sample: true,
        top_p: 0.95,
        return_full_text: false
      }
    };
    
    const response = await fetchWithRetry(CONFIG.API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });
    
    const data = await response.json();
    return data.generated_text || data[0]?.generated_text || 'No response generated.';
  } else {
    // Demo mode - return sample responses
    return getDemoResponse(prompt);
  }
}

// Fetch with retry logic
async function fetchWithRetry(url, options, attempt = 1) {
  try {
    const response = await fetch(url, options);
    if (!response.ok && attempt < CONFIG.RETRY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY * attempt));
      return fetchWithRetry(url, options, attempt + 1);
    }
    return response;
  } catch (error) {
    if (attempt < CONFIG.RETRY_ATTEMPTS) {
      await new Promise(resolve => setTimeout(resolve, CONFIG.RETRY_DELAY * attempt));
      return fetchWithRetry(url, options, attempt + 1);
    }
    throw error;
  }
}

// Demo responses
function getDemoResponse(prompt) {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerPrompt = prompt.toLowerCase();
      
      if (lowerPrompt.includes('efficiency') && lowerPrompt.includes('solar')) {
        resolve(`Key factors affecting solar panel efficiency include:

1. **Temperature**: Higher temperatures reduce efficiency. Panels typically lose 0.3-0.5% efficiency per °C above 25°C.

2. **Irradiance**: The amount of sunlight hitting the panels directly impacts output. Optimal conditions are around 1000 W/m².

3. **Shading**: Even partial shading can significantly reduce output due to series connections.

4. **Soiling**: Dust, pollen, and bird droppings can reduce efficiency by 5-20%.

5. **Panel angle and orientation**: Optimal tilt varies by latitude and season.

6. **Age degradation**: Panels typically degrade 0.5-0.8% per year.

Would you like me to elaborate on any of these factors?`);
      } else if (lowerPrompt.includes('optimize') && lowerPrompt.includes('performance')) {
        resolve(`To optimize your solar farm's performance, consider these strategies:

1. **Regular Monitoring**: Implement real-time monitoring to detect issues quickly.

2. **Predictive Maintenance**: Use data analytics to predict and prevent failures.

3. **Cleaning Schedule**: Establish optimal cleaning frequency based on local conditions.

4. **Vegetation Management**: Control plant growth to prevent shading.

5. **Inverter Optimization**: Ensure inverters are properly sized and configured.

6. **String Reconfigurations**: Periodically review and optimize string layouts.

I can provide more details on implementing any of these strategies.`);
      } else if (lowerPrompt.includes('maintenance') && lowerPrompt.includes('schedule')) {
        resolve(`Recommended maintenance schedule for solar panels:

**Monthly**:
- Visual inspection for obvious damage
- Performance monitoring review

**Quarterly**:
- Detailed performance analysis
- Inverter checks and filter cleaning
- Vegetation assessment

**Semi-Annually**:
- Professional cleaning (more frequent in dusty areas)
- Electrical connection inspections
- Grounding system checks

**Annually**:
- Comprehensive electrical testing
- Thermal imaging inspection
- Torque checking of connections
- Update maintenance records

The exact schedule should be adjusted based on your location and environmental conditions.`);
      } else if (lowerPrompt.includes('inverter')) {
        resolve(`Inverter efficiency is crucial for solar system performance:

**What is Inverter Efficiency?**
It's the ratio of AC output power to DC input power, typically ranging from 95-98% for modern inverters.

**Impact on Energy Production**:
- A 1% difference in efficiency can mean 1% less annual energy yield
- Over 25 years, this represents significant revenue loss

**Factors Affecting Efficiency**:
1. Load percentage (peak efficiency usually at 50-80% load)
2. Temperature (efficiency drops at high temperatures)
3. Input voltage variations
4. Power factor

**Optimization Tips**:
- Proper sizing (not oversized)
- Good ventilation
- Regular maintenance
- Consider string vs. central inverters based on your setup`);
      } else {
        resolve(`I understand you're asking about "${prompt}". As an AI assistant specialized in energy systems and solar performance, I can help with:

- Solar panel efficiency and optimization
- Maintenance strategies and schedules
- Performance monitoring and analytics
- Energy forecasting and predictions
- O&M best practices
- Inverter and equipment optimization

Please feel free to ask specific questions about any of these topics!`);
      }
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  });
}

// Handle suggested prompts
function sendSuggestedPrompt(prompt) {
  chatInput.value = prompt;
  autoResizeTextarea();
  sendMessage();
}

</script>