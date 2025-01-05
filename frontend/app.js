

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

document.getElementById('beamer-play').addEventListener('click', () => sendToServer("beamer", "play"));
document.getElementById('beamer-pause').addEventListener('click', () => sendToServer("beamer", "pause"));
document.getElementById('beamer-mute').addEventListener('click', () => sendToServer("beamer", "mute"));

document.getElementById('laptop-play').addEventListener('click', () => sendToServer("laptop", "play"));
document.getElementById('laptop-pause').addEventListener('click', () => sendToServer("laptop", "pause"));
document.getElementById('laptop-mute').addEventListener('click', () => sendToServer("laptop", "mute"));

