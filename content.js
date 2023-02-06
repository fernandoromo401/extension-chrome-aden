// 1. Send a message to the service worker requesting the user's data
const data = {
    storage: JSON.stringify(localStorage),
    url: window.location.host
}
chrome.runtime.sendMessage(JSON.stringify(data), (response) => {
    // 3. Got an asynchronous response with the data from the service worker
    console.info(response);
    // initializeUI(response);
});
