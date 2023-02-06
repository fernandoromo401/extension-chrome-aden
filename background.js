chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const data = JSON.parse(message)
    
    const channel = new BroadcastChannel('background-popup');
    channel.onmessage = (msg) => {
        channel.postMessage({ msg: message});
    };
    
    if (typeof data === 'object') {
        sendResponse('localStorage registrado en extensión');
    }
});
