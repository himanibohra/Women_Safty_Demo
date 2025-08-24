// Battery simulation variables
let batteryLevel = 100;
let batteryInterval;

// DOM elements
const batteryLevelElement = document.getElementById('batteryLevel');
const batteryTextElement = document.getElementById('batteryText');

// Initialize battery simulation when page loads
document.addEventListener('DOMContentLoaded', function() {
    startBatterySimulation();
});

// Start battery simulation
function startBatterySimulation() {
    // Update battery every 3 seconds
    batteryInterval = setInterval(updateBattery, 3000);
}

// Update battery level
function updateBattery() {
    if (batteryLevel > 0) {
        // Random decrease between 1-5%
        const decrease = Math.floor(Math.random() * 5) + 1;
        batteryLevel = Math.max(0, batteryLevel - decrease);
        
        // Update visual elements
        updateBatteryDisplay();
        
        // Change battery color based on level
        updateBatteryColor();
    } else {
        // Stop simulation when battery is empty
        clearInterval(batteryInterval);
        showLowBatteryWarning();
    }
}

// Update battery display
function updateBatteryDisplay() {
    if (batteryLevelElement && batteryTextElement) {
        batteryLevelElement.style.width = batteryLevel + '%';
        batteryTextElement.textContent = batteryLevel + '%';
    }
}

// Update battery color based on level
function updateBatteryColor() {
    if (batteryLevelElement) {
        if (batteryLevel > 50) {
            batteryLevelElement.style.background = 'linear-gradient(90deg, var(--autumn-cream), var(--autumn-tan))';
        } else if (batteryLevel > 20) {
            batteryLevelElement.style.background = 'linear-gradient(90deg, var(--autumn-tan), var(--autumn-terracotta))';
        } else {
            batteryLevelElement.style.background = 'linear-gradient(90deg, var(--autumn-terracotta), var(--autumn-red-brown))';
        }
    }
}

// Show low battery warning
function showLowBatteryWarning() {
    if (batteryTextElement) {
        batteryTextElement.textContent = 'LOW!';
        batteryTextElement.style.color = '#ff4757';
        batteryTextElement.style.fontWeight = 'bold';
    }
}

// Navigation functions
function redirectToSOS() {
    window.location.href = 'sos.html';
}

function redirectToSafe() {
    window.location.href = 'safe.html';
}

// SOS Alert Popup Functions
let currentSOSType = '';

function showSOSAlert(type) {
    currentSOSType = type;
    const popup = document.getElementById('sosAlertPopup');
    const title = document.getElementById('sosAlertTitle');
    const message = document.getElementById('sosAlertMessage');
    const timeElement = document.getElementById('sosAlertTime');
    
    // Update content based on type
    if (type === 'silent') {
        title.textContent = 'SILENT SOS ALERT TRIGGERED';
        message.textContent = 'Silent emergency alert has been activated. Authorities will be notified discreetly.';
    } else {
        title.textContent = 'SOS ALERT TRIGGERED';
        message.textContent = 'Emergency alert has been activated. Authorities will be notified immediately.';
    }
    
    // Set current time
    const now = new Date();
    timeElement.textContent = now.toLocaleTimeString();
    
    // Show popup
    popup.style.display = 'block';
    
    // Add click event to open SOS page button
    const openBtn = document.getElementById('openSOSPageBtn');
    openBtn.onclick = function() {
        hideSOSAlert();
        redirectToSOS();
    };
}

function hideSOSAlert() {
    const popup = document.getElementById('sosAlertPopup');
    popup.style.display = 'none';
    currentSOSType = '';
}

// Add event listeners for popup functionality
document.addEventListener('DOMContentLoaded', function() {
    // Close popup when clicking outside
    const popup = document.getElementById('sosAlertPopup');
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            hideSOSAlert();
        }
    });
    
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && popup.style.display === 'block') {
            hideSOSAlert();
        }
    });
});

function goBack() {
    window.location.href = 'index.html';
}

// Add click sound effect for buttons (optional)
function addButtonClickEffect(button) {
    button.addEventListener('click', function() {
        // Add a subtle scale effect
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
}

// Add click effects to all buttons when page loads
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(addButtonClickEffect);
});

// Battery level indicator animation
function animateBatteryPulse() {
    if (batteryLevelElement && batteryLevel < 20) {
        batteryLevelElement.style.animation = 'pulse 1s infinite';
    } else if (batteryLevelElement) {
        batteryLevelElement.style.animation = 'none';
    }
}

// Add CSS animation for low battery warning
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(style);

// Update battery pulse animation
setInterval(animateBatteryPulse, 1000);

// Emergency mode detection (simulate device shake or rapid button press)
let sosButtonPressCount = 0;
let lastPressTime = 0;

function detectEmergencyMode() {
    const currentTime = Date.now();
    if (currentTime - lastPressTime < 2000) { // Within 2 seconds
        sosButtonPressCount++;
        if (sosButtonPressCount >= 3) {
            // Trigger emergency mode
            triggerEmergencyMode();
            sosButtonPressCount = 0;
        }
    } else {
        sosButtonPressCount = 1;
    }
    lastPressTime = currentTime;
}

function triggerEmergencyMode() {
    // Flash the page red and redirect to SOS
    document.body.style.animation = 'emergencyFlash 0.5s ease-in-out';
    setTimeout(() => {
        window.location.href = 'sos.html';
    }, 500);
}

// Add emergency flash animation
const emergencyStyle = document.createElement('style');
emergencyStyle.textContent = `
    @keyframes emergencyFlash {
        0% { background: linear-gradient(135deg, var(--autumn-cream) 0%, var(--autumn-tan) 100%); }
        50% { background: linear-gradient(135deg, var(--autumn-terracotta) 0%, var(--autumn-red-brown) 100%); }
        100% { background: linear-gradient(135deg, var(--autumn-cream) 0%, var(--autumn-tan) 100%); }
    }
`;
document.head.appendChild(emergencyStyle);

// Add emergency detection to SOS buttons
document.addEventListener('DOMContentLoaded', function() {
    const sosButtons = document.querySelectorAll('.btn-sos, .btn-silent');
    sosButtons.forEach(button => {
        button.addEventListener('click', detectEmergencyMode);
    });
    
    // Initialize chart animations
    animateCharts();
});

// Chart Animations
function animateCharts() {
    const charts = document.querySelectorAll('.chart-svg');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, { threshold: 0.5 });

    charts.forEach(chart => {
        chart.style.animationPlayState = 'paused';
        observer.observe(chart);
    });
}


