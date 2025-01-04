

let sendToServer = function(target, message) {
    const ip = `https://videocontrol.timsalokat.dev/broadcast/${target}/${message}`;
    fetch(ip, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

document.getElementById('biemer-play').addEventListener('click', () => sendToServer("biemer", "play"));
document.getElementById('biemer-pause').addEventListener('click', () => sendToServer("biemer", "pause"));
document.getElementById('biemer-mute').addEventListener('click', () => sendToServer("biemer", "mute"));

document.getElementById('laptop-play').addEventListener('click', () => sendToServer("laptop", "play"));
document.getElementById('laptop-pause').addEventListener('click', () => sendToServer("laptop", "pause"));
document.getElementById('laptop-mute').addEventListener('click', () => sendToServer("laptop", "mute"));

