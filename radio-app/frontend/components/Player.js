/**
 * Clase Player
 *
 * @class
 * @description Maneja la lógica del reproductor de audio para una aplicación de radio.
 * Proporciona métodos para seleccionar estaciones, controlar la reproducción y actualizar metadatos.
 */
export class Player {
    /**
     * Constructor de la clase Player
     *
     * @constructor
     * @description Inicializa el reproductor de audio y referencia a elementos del DOM para actualizar el título de la estación y los metadatos.
     */
    constructor() {
        this.audioPlayer = new Audio(); // Objeto Audio nativo para manejar la reproducción
        this.currentStation = null; // Referencia a la estación actualmente en reproducción
        this.stationTitleElement = document.getElementById("station-title"); // Elemento DOM para mostrar el título de la estación
        this.stationMetadataElement = document.getElementById("station-metadata"); // Elemento DOM para mostrar metadatos del stream
    }

    /**
     * Establece una estación para reproducir
     *
     * @async
     * @method
     * @param {Object} station - Objeto que representa la estación a reproducir
     * @param {string} station.name - Nombre de la estación
     * @param {string} station.stream_url - URL del stream de audio
     * @param {string} [station.cover_url] - URL opcional de la carátula de la estación
     * @description Cambia a una nueva estación de radio, actualizando el reproductor y la interfaz.
     */
    async setStation(station) {
        // Evitar reproducir nuevamente la misma estación
        if (this.currentStation?.stream_url === station.stream_url) {
            console.log(`Ya estás escuchando: ${station.name}`);
            return;
        }

        // Pausar y reiniciar el reproductor si hay una estación en reproducción
        if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
        }

        // Actualizar la estación actual
        this.currentStation = station;
        this.stationTitleElement.textContent = station.name;

        // Mostrar la carátula o usar una imagen por defecto
       // document.getElementById("station-cover").src = station.cover_url || "default-cover.png";

        // Configurar el stream de audio
        this.audioPlayer.src = station.stream_url;
        this.audioPlayer.play().catch((error) => console.error("Error al reproducir la estación:", error));

        // Intentar cargar metadatos de la transmisión
        await this.updateMetadata(station.stream_url);

        // Actualizar el estado del botón de reproducción
        this.updatePlayPauseButton(true);
    }

    /**
     * Intenta obtener los metadatos de un stream de audio
     *
     * @async
     * @method
     * @param {string} streamUrl - URL del stream de audio
     * @description Obtiene los metadatos del stream usando una solicitud HEAD.
     */
    async updateMetadata(streamUrl) {
        try {
            this.stationMetadataElement.style.display = "block";
            this.stationMetadataElement.textContent = "Cargando metadatos...";

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

    /**
     * Alterna entre pausar y reanudar la reproducción
     *
     * @method
     * @description Si no hay una estación seleccionada, no realiza ninguna acción.
     */
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

    /**
     * Actualiza el estado del botón de reproducción/pausa
     *
     * @method
     * @param {boolean} isPlaying - `true` si la reproducción está activa, `false` si está pausada
     * @description Cambia el ícono del botón de reproducción/pausa.
     */
    updatePlayPauseButton(isPlaying) {
        const playPauseButton = document.getElementById("play-pause");

        playPauseButton.innerHTML = isPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
    }

    /**
     * Reproduce la siguiente estación en la lista
     *
     * @method
     * @param {Array} stations - Lista de estaciones disponibles
     * @param {number} currentIndex - Índice actual en la lista
     * @returns {number} El nuevo índice de la estación seleccionada
     */
    playNextStation(stations, currentIndex) {
        const nextIndex = (currentIndex + 1) % stations.length;
        this.setStation(stations[nextIndex]);
        return nextIndex;
    }

    /**
     * Reproduce la estación anterior en la lista
     *
     * @method
     * @param {Array} stations - Lista de estaciones disponibles
     * @param {number} currentIndex - Índice actual en la lista
     * @returns {number} El nuevo índice de la estación seleccionada
     */
    playPreviousStation(stations, currentIndex) {
        const prevIndex = (currentIndex - 1 + stations.length) % stations.length;
        this.setStation(stations[prevIndex]);
        return prevIndex;
    }
}
