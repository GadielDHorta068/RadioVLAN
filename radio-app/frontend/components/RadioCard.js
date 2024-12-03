export function createRadioCard(station, onClickHandler) {
    const radioCard = document.createElement("div");
    radioCard.className = "radio-card";
    radioCard.innerHTML = `
        <h2>${station.name}</h2>
        <p>${station.genre}</p>
    `;
    radioCard.onclick = () => onClickHandler(station);
    return radioCard;
}
