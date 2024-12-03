/**
 * Crea un elemento de tarjeta para representar una estaci�n de radio
 *
 * @function createRadioCard
 * @param {Object} station - Objeto que contiene informaci�n de la estaci�n de radio
 * @param {string} station.name - Nombre de la estaci�n
 * @param {string} station.genre - G�nero musical de la estaci�n
 * @param {Function} onClickHandler - Funci�n que se ejecuta cuando se hace clic en la tarjeta
 * @returns {HTMLElement} Elemento HTML que representa la tarjeta de la estaci�n de radio
 *
 * @description
 * - Genera din�micamente un elemento HTML `<div>` para mostrar informaci�n b�sica de una estaci�n de radio.
 * - Configura un evento `onclick` para manejar la selecci�n de la estaci�n cuando se haga clic en la tarjeta.
 */
export function createRadioCard(station, onClickHandler) {
    // Crear un contenedor <div> para la tarjeta de la estaci�n
    const radioCard = document.createElement("div");
    radioCard.className = "radio-card"; // Clase CSS para estilos personalizados

    // Insertar el contenido HTML de la tarjeta
    radioCard.innerHTML = `
        <h2>${station.name}</h2> <!-- T�tulo con el nombre de la estaci�n -->
        <p>${station.genre}</p> <!-- Descripci�n del g�nero musical -->
    `;

    // Asociar el evento de clic con la funci�n proporcionada
    radioCard.onclick = () => onClickHandler(station);

    // Retornar el elemento HTML generado
    return radioCard;
}
