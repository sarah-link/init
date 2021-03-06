function getCreatureIcon(creatureType) {
    /* Returns string for RPG-Awesome icon class for every creature type */
    switch (creatureType) {
        case "aberration":
            return "ra ra-octopus";
        case "beast":
            return "ra ra-pawprint";
        case "celestial":
            return "ra ra-angel-wings";
        case "construct":
            return "ra ra-reactor";
        case "dragon":
            return "ra ra-wyvern";
        case "elemental":
            return "ra ra-fire";
        case "fey":
            return "ra ra-fairy";
        case "fiend":
            return "ra ra-batwings";
        case "giant":
            return "ra ra-muscle-fat";
        case "humanoid":
            return "ra ra-hand";
        case "monstrosity":
            return "ra ra-lion";
        case "ooze":
            return "ra ra-ice-cube";
        case "plant":
            return "ra ra-flower";
        case "undead":
            return "ra ra-desert-skull";
        default:
            return "ra ra-dinosaur";
    }
}

function parseCR(CR) {
    switch (CR) {
        case "1/8":
            return 0.125;
        case "1/4":
            return 0.25;
        case "1/2":
            return 0.5;
        default:
            return parseInt(CR);
    }
}

function displayCR(CR) {
    switch (CR) {
        case "1/8":
            return "⅛";
        case "1/4":
            return "¼";
        case "1/2":
            return "½";
        default:
            return CR;
    }
}

function displaySize(size) {
    switch(size) {
        case "T":
            return "Tiny"
        case "S":
            return "Small"
        case "M":
            return "Medium"
        case "L":
            return "Large"
        case "H":
            return "Huge"
        case "G":
            return "Gargantuan"
    }
}

export {getCreatureIcon, parseCR, displayCR, displaySize}