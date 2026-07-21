const POBEDA_DO = 3;

const emoji = {
    kamen: "✊",
    papir: "✋",
    makaze: "✌️"
};

let skor1 = 0;
let skor2 = 0;
let naPotezu = 1;      // ko trenutno bira: 1 ili 2
let izbor1 = null;
let izbor2 = null;
let igraGotova = false;

const skor1El = document.getElementById("skor1");
const skor2El = document.getElementById("skor2");
const znak1El = document.getElementById("znak1");
const znak2El = document.getElementById("znak2");
const porukaEl = document.getElementById("poruka");
const statusEl = document.getElementById("statusEl");
const igrac1Box = document.getElementById("igrac1Box");
const igrac2Box = document.getElementById("igrac2Box");
const dugmad = document.querySelectorAll(".izbor-dugme");

function odrediPobednika(a, b) {
    if (a === b) return 0;
    if (
        (a === "kamen" && b === "makaze") ||
        (a === "papir" && b === "kamen") ||
        (a === "makaze" && b === "papir")
    ) {
        return 1;
    }
    return 2;
}

function azurirajStanje() {
    igrac1Box.classList.toggle("aktivan", naPotezu === 1 && !igraGotova);
    igrac2Box.classList.toggle("aktivan", naPotezu === 2 && !igraGotova);

    if (!igraGotova) {
        statusEl.textContent = "Igrač " + naPotezu + ", izaberi svoj potez";
    }
}

function odaberi(potez) {
    if (igraGotova) return;

    if (naPotezu === 1) {
        izbor1 = potez;
        znak1El.textContent = "🤫";
        znak1El.classList.add("cekanje");
        naPotezu = 2;
        porukaEl.textContent = "Igrač 1 je izabrao. Na redu je Igrač 2.";
        azurirajStanje();
    } else {
        izbor2 = potez;
        naPotezu = 1;
        otkrijPoteze();
    }
}

function otkrijPoteze() {
    znak1El.classList.remove("cekanje");
    znak1El.textContent = emoji[izbor1];
    znak2El.textContent = emoji[izbor2];
    znak1El.classList.add("otkrij");
    znak2El.classList.add("otkrij");

    const rezultat = odrediPobednika(izbor1, izbor2);

    if (rezultat === 0) {
        porukaEl.textContent = "Nerešeno! Isti potez.";
        porukaEl.style.color = "#ffcc4d";
    } else if (rezultat === 1) {
        skor1++;
        skor1El.textContent = skor1;
        porukaEl.textContent = "Igrač 1 osvaja rundu!";
        porukaEl.style.color = "#00ff88";
    } else {
        skor2++;
        skor2El.textContent = skor2;
        porukaEl.textContent = "Igrač 2 osvaja rundu!";
        porukaEl.style.color = "#00ff88";
    }

    izbor1 = null;
    izbor2 = null;

    if (skor1 >= POBEDA_DO || skor2 >= POBEDA_DO) {
        igraGotova = true;
        const pobednik = skor1 > skor2 ? "Igrač 1" : "Igrač 2";
        porukaEl.innerHTML = "🏆 <span class='pobednik'>" + pobednik + " je osvojio igru!</span>";
        statusEl.textContent = "Igra je završena";
        dugmad.forEach(d => d.disabled = true);
        igrac1Box.classList.remove("aktivan");
        igrac2Box.classList.remove("aktivan");
    } else {
        setTimeout(() => {
            znak1El.textContent = "?";
            znak2El.textContent = "?";
            znak1El.classList.remove("otkrij");
            znak2El.classList.remove("otkrij");
        }, 1400);
    }

    azurirajStanje();
}

function resetujIgru() {
    skor1 = 0;
    skor2 = 0;
    naPotezu = 1;
    izbor1 = null;
    izbor2 = null;
    igraGotova = false;
    skor1El.textContent = 0;
    skor2El.textContent = 0;
    znak1El.textContent = "?";
    znak2El.textContent = "?";
    znak1El.classList.remove("otkrij", "cekanje");
    znak2El.classList.remove("otkrij", "cekanje");
    porukaEl.textContent = "";
    dugmad.forEach(d => d.disabled = false);
    azurirajStanje();
}

azurirajStanje();
