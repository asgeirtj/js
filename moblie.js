const hours = new Date().getHours();
const greeting = hours < 12 ? 'Good Morning!' : hours < 18 ? 'Good Afternoon!' : 'Good Evening!';
document.querySelector('[data-element-id="new-chat-button-in-side-bar"]').childNodes[1].textContent = greeting
