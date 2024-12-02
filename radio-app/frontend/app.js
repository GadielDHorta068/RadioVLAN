/**
 * Función para crear tarjeta de radio
 * Genera un elemento HTML para mostrar información de una estación de radio
 *
 * @function RadioCard
 * @param {Object} radio - Objeto de configuración de la radio
 * @param {string} radio.name - Nombre de la estación de radio
 * @param {string} radio.genre - Género musical de la radio
 * @param {string} radio.country - País de origen de la radio
 * @param {string} radio.stream_url - URL de transmisión de audio
 * @returns {string} Cadena HTML que representa la tarjeta de radio
 */
function RadioCard(radio) {
    return `
   <div>
     <h2>${radio.name}</h2>
     <p>${radio.genre} - ${radio.country}</p>
     <audio controls>
       <source src="${radio.stream_url}" type="audio/mpeg">
       Tu navegador no soporta el reproductor de audio.
     </audio>
   </div>
 `;
}

/**
 * Evento de Carga de Contenido del DOM
 * Recupera y renderiza la lista de radios desde el servidor
 *
 * @async
 * @description
 * - Escucha el evento de carga completada del Documento
 * - Realiza una solicitud fetch al endpoint de radios
 * - Genera dinámicamente tarjetas de radio para cada estación recuperada
 * - Inserta las tarjetas en el elemento con ID "radio-list"
 *
 * @throws {Error} Errores potenciales de red o parsing de JSON
 */
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:3001/radios");
        const radios = await response.json();

        const radioList = document.getElementById("radio-list");
        radios.forEach((radio) => {
            const radioCard = document.createElement("div");
            radioCard.innerHTML = RadioCard(radio);
            radioList.appendChild(radioCard);
        });
    } catch (error) {
        console.error("Error al cargar las radios:", error);
    }
});