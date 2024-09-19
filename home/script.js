function berekenLeeftijd(geboorteDatum) {
    const vandaag = new Date();
    const geboorte = new Date(geboorteDatum);

    let leeftijd = vandaag.getFullYear() - geboorte.getFullYear();
    const maandVerschil = vandaag.getMonth() - geboorte.getMonth();

    // Controleren of de verjaardag dit jaar al voorbij is
    if (
        maandVerschil < 0 ||
        (maandVerschil === 0 && vandaag.getDate() < geboorte.getDate())
    ) {
        leeftijd--;
    }

    return leeftijd;
}

const geboorteDatum = "2003-09-26";
const leeftijdElement = document.getElementById("age");
leeftijdElement.textContent = berekenLeeftijd(geboorteDatum);
