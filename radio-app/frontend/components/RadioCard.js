export class RadioCard {
    constructor(radio, onSelect) {
        this.radio = radio;
        this.onSelect = onSelect;
    }

    render() {
        const card = document.createElement("button");
        card.className = "radio-card";
        card.innerHTML = `
      <h3>${this.radio.name}</h3>
      <p>${this.radio.genre} - ${this.radio.country}</p>
    `;
        card.addEventListener("click", () => this.onSelect(this.radio));
        return card;
    }
}
