/**
 * Componente de Tarjeta de Radio
 * Genera un elemento HTML para mostrar informaci�n de una estaci�n de radio
 *
 * @function RadioCard
 * @param {Object} radio - Objeto de configuraci�n de la radio
 * @param {string} radio.name - Nombre de la estaci�n de radio
 * @param {string} radio.genre - G�nero musical de la radio
 * @param {string} radio.country - Pa�s de origen de la radio
 * @param {string} radio.stream_url - URL de transmisi�n de audio
 * @returns {string} Cadena HTML que representa la tarjeta de radio
 *
 * @description
 * - Muestra el nombre de la radio en un encabezado
 * - Presenta el g�nero y pa�s de la radio
 * - Incluye un reproductor de audio con la URL de transmisi�n
 * - Proporciona un mensaje de compatibilidad para navegadores que no soporten audio
 */
export function RadioCard(radio) {
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