export class Player {
    constructor() {
        this.audioPlayer = new Audio();
        this.currentStation = null;
        this.stationTitleElement = document.getElementById("station-title");
        this.stationMetadataElement = document.getElementById("station-metadata");
    }

    async setStation(station) {
        if (this.currentStation?.stream_url === station.stream_url) {
            console.log(`Ya estás escuchando: ${station.name}`);
            return;
        }

        // Detener reproducción previa
        if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
        }

        // Actualizar estación actual
        this.currentStation = station;
        this.stationTitleElement.textContent = station.name;
        document.getElementById("station-cover").src = station.cover_url || "default-cover.png";

        // Configurar y reproducir el nuevo stream
        this.audioPlayer.src = station.stream_url;
        this.audioPlayer.play().catch((error) => console.error("Error al reproducir la estación:", error));

        // Intentar obtener metadatos
        this.updateMetadata(station.stream_url);

        this.updatePlayPauseButton(true);
    }

    async updateMetadata(streamUrl) {
        try {
            this.stationMetadataElement.style.display = "block";
            this.stationMetadataElement.textContent = "Cargando metadatos...";

            // Usar fetch para intentar obtener metadatos
            const response = await fetch(streamUrl, { method: "HEAD" });
            const contentType = response.headers.get("Content-Type");

            if (contentType) {
                this.stationMetadataElement.textContent = `Formato: ${contentType}`;
            } else {
                this.stationMetadataElement.textContent = "Sin metadatos disponibles.";
            }
        } catch (error) {
            console.error("Error al obtener metadatos:", error);
            this.stationMetadataElement.textContent = "No se pudieron cargar los metadatos.";
        }
    }

    togglePlayPause() {
        if (!this.audioPlayer.src) {
            console.log("No hay estación seleccionada.");
            return;
        }

        if (this.audioPlayer.paused) {
            this.audioPlayer.play();
            this.updatePlayPauseButton(true);
        } else {
            this.audioPlayer.pause();
            this.updatePlayPauseButton(false);
        }
    }

    updatePlayPauseButton(isPlaying) {
        const playPauseButton = document.getElementById("play-pause");
        playPauseButton.innerHTML = isPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
    }


    playNextStation(stations, currentIndex) {
        const nextIndex = (currentIndex + 1) % stations.length;
        this.setStation(stations[nextIndex]);
        return nextIndex;
    }

    playPreviousStation(stations, currentIndex) {
        const prevIndex = (currentIndex - 1 + stations.length) % stations.length;
        this.setStation(stations[prevIndex]);
        return prevIndex;
    }
}
