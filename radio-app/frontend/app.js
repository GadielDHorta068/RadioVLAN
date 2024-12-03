import { createRadioCard } from "./components/RadioCard.js";
import { Player } from "./components/Player.js";

let stations = [];
let currentStationIndex = null;
const player = new Player();

document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3001/radios");
        stations = await response.json();

        const radioList = document.getElementById("radio-list");
        stations.forEach((station, index) => {
            const radioCard = createRadioCard(station, () => {
                currentStationIndex = index;
                player.setStation(station);
            });
            radioList.appendChild(radioCard);
        });

        // Configurar botones de control
        document.getElementById("play-pause").addEventListener("click", () => player.togglePlayPause());
        document.getElementById("next").addEventListener("click", () => {
            currentStationIndex = player.playNextStation(stations, currentStationIndex);
        });
        document.getElementById("prev").addEventListener("click", () => {
            currentStationIndex = player.playPreviousStation(stations, currentStationIndex);
        });
    } catch (error) {
        console.error("Error al cargar las estaciones:", error);
    }
});
