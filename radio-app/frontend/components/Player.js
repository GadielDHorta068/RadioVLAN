export class Player {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.audio = document.createElement("audio");
        this.audio.controls = true;
        this.info = document.createElement("div");
        this.info.className = "player-info";

        this.container.appendChild(this.info);
        this.container.appendChild(this.audio);
    }

    update(radio) {
        this.info.innerHTML = `<h2>${radio.name}</h2><p>${radio.genre} - ${radio.country}</p>`;
        this.audio.src = radio.stream_url;
        this.audio.play();
    }
}
