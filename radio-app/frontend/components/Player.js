/**
 * Clase Player
 *
 * @class
 * @description Maneja la l�gica del reproductor de audio para una aplicaci�n de radio.
 * Proporciona m�todos para seleccionar estaciones, controlar la reproducci�n y actualizar metadatos.
 */
export class Player {
    /**
     * Constructor de la clase Player
     *
     * @constructor
     * @description Inicializa el reproductor de audio y referencia a elementos del DOM para actualizar el t�tulo de la estaci�n y los metadatos.
     */
    constructor() {
        this.audioPlayer = new Audio(); // Objeto Audio nativo para manejar la reproducci�n
        this.currentStation = null; // Referencia a la estaci�n actualmente en reproducci�n
        this.stationTitleElement = document.getElementById("station-title"); // Elemento DOM para mostrar el t�tulo de la estaci�n
        this.stationMetadataElement = document.getElementById("station-metadata"); // Elemento DOM para mostrar metadatos del stream
    }

    /**
     * Establece una estaci�n para reproducir
     *
     * @async
     * @method
     * @param {Object} station - Objeto que representa la estaci�n a reproducir
     * @param {string} station.name - Nombre de la estaci�n
     * @param {string} station.stream_url - URL del stream de audio
     * @param {string} [station.cover_url] - URL opcional de la car�tula de la estaci�n
     * @description Cambia a una nueva estaci�n de radio, actualizando el reproductor y la interfaz.
     */
    async setStation(station) {
        // Evitar reproducir nuevamente la misma estaci�n
        if (this.currentStation?.stream_url === station.stream_url) {
            console.log(`Ya est�s escuchando: ${station.name}`);
            return;
        }

        // Pausar y reiniciar el reproductor si hay una estaci�n en reproducci�n
        if (!this.audioPlayer.paused) {
            this.audioPlayer.pause();
            this.audioPlayer.currentTime = 0;
        }

        // Actualizar la estaci�n actual
        this.currentStation = station;
        this.stationTitleElement.textContent = station.name;

        // Mostrar la car�tula o usar una imagen por defecto
       // document.getElementById("station-cover").src = station.cover_url || "default-cover.png";

        // Configurar el stream de audio
        this.audioPlayer.src = station.stream_url;
        this.audioPlayer.play().catch((error) => console.error("Error al reproducir la estaci�n:", error));

        // Intentar cargar metadatos de la transmisi�n
        await this.updateMetadata(station.stream_url);

        // Actualizar el estado del bot�n de reproducci�n
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
     * Alterna entre pausar y reanudar la reproducci�n
     *
     * @method
     * @description Si no hay una estaci�n seleccionada, no realiza ninguna acci�n.
     */
    togglePlayPause() {
        if (!this.audioPlayer.src) {
            console.log("No hay estaci�n seleccionada.");
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
     * Actualiza el estado del bot�n de reproducci�n/pausa
     *
     * @method
     * @param {boolean} isPlaying - `true` si la reproducci�n est� activa, `false` si est� pausada
     * @description Cambia el �cono del bot�n de reproducci�n/pausa.
     */
    updatePlayPauseButton(isPlaying) {
        const playPauseButton = document.getElementById("play-pause");

        playPauseButton.innerHTML = isPlaying
            ? '<i class="fas fa-pause"></i>'
            : '<i class="fas fa-play"></i>';
    }

    /**
     * Reproduce la siguiente estaci�n en la lista
     *
     * @method
     * @param {Array} stations - Lista de estaciones disponibles
     * @param {number} currentIndex - �ndice actual en la lista
     * @returns {number} El nuevo �ndice de la estaci�n seleccionada
     */
    playNextStation(stations, currentIndex) {
        const nextIndex = (currentIndex + 1) % stations.length;
        this.setStation(stations[nextIndex]);
        return nextIndex;
    }

    /**
     * Reproduce la estaci�n anterior en la lista
     *
     * @method
     * @param {Array} stations - Lista de estaciones disponibles
     * @param {number} currentIndex - �ndice actual en la lista
     * @returns {number} El nuevo �ndice de la estaci�n seleccionada
     */
    playPreviousStation(stations, currentIndex) {
        const prevIndex = (currentIndex - 1 + stations.length) % stations.length;
        this.setStation(stations[prevIndex]);
        return prevIndex;
    }
}
