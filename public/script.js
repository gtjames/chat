const socket = io()                 //  we are not on the client and we are using the io package here client side

//  get some references to the divs and input field on the page
const chat       = document.querySelector('.chat-form')     
const input      = document.querySelector('.chat-input')
const chatWindow = document.querySelector('.chat-window')

chat.addEventListener('submit', event => {          //  when the submit button is press call this code
    event.preventDefault();                         //  kill the event otherwise the browser will reload the page
    //  What does emit do? 
    //      Synchronously calls each of the listeners registered for the event named 'chat', 
    //      passing the supplied arguments to each.
    socket.emit('chat', input.value);               //  the supplied argument is the text in the input field typed by you
    input.value = '';                               //  clear the chat text
});

socket.on('chat', message => {                      //  adding an event handler to our socket, listening for any event destined for the named socket 'chat'
    console.log('From server: ', message);
    if (Array.isArray(message))                     //  if this is an array of quotes 
        chatWindow.innerHTML = '';                  //  clear the message window, they can be long
    chatWindow.innerHTML += message + '<br>';       //  take the socket data packet and add it to the chat window
});
