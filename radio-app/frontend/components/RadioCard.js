/**
 * Crea un elemento de tarjeta para representar una estación de radio
 *
 * @function createRadioCard
 * @param {Object} station - Objeto que contiene información de la estación de radio
 * @param {string} station.name - Nombre de la estación
 * @param {string} station.genre - Género musical de la estación
 * @param {Function} onClickHandler - Función que se ejecuta cuando se hace clic en la tarjeta
 * @returns {HTMLElement} Elemento HTML que representa la tarjeta de la estación de radio
 *
 * @description
 * - Genera dinámicamente un elemento HTML `<div>` para mostrar información básica de una estación de radio.
 * - Configura un evento `onclick` para manejar la selección de la estación cuando se haga clic en la tarjeta.
 */
export function createRadioCard(station, onClickHandler) {
    // Crear un contenedor <div> para la tarjeta de la estación
    const radioCard = document.createElement("div");
    radioCard.className = "radio-card"; // Clase CSS para estilos personalizados

    // Insertar el contenido HTML de la tarjeta
    radioCard.innerHTML = `
        <h2>${station.name}</h2> <!-- Título con el nombre de la estación -->
        <p>${station.genre}</p> <!-- Descripción del género musical -->
    `;

    // Asociar el evento de clic con la función proporcionada
    radioCard.onclick = () => onClickHandler(station);

    // Retornar el elemento HTML generado
    return radioCard;
}
