import { saveTravelLog } from "./saveTravelLog.js";

export async function createInfoWindow(marker, map) {

    // ladataan InfoWindow-luokka 
    const { InfoWindow } = await google.maps.importLibrary("maps");
    // luodaan uusi instanssi 
    const infoWindow = new InfoWindow();

    // luodaan infoWindow  oletus sisältö HTML elementtinä
    const defaultContent = document.createElement("div");
    defaultContent.innerHTML = `
    <div style="color: #333; font-size: 14px; padding: 10px; max-width: 300px;">
        <button id="addButton" class="btn btn-primary">Lisää merkintä</button>
        <button id="deleteButton" class="btn btn-primary">Poista</button>
    </div>
    `;

    // haetaan viittaukset napeille
    const addButton = defaultContent.querySelector("#addButton");
    const removeButton = defaultContent.querySelector("#deleteButton");

    // tallenetaan oletus sisältö infoWindowin
    infoWindow.latestContent = defaultContent;

    // luodaan addButtonille eventListener, kun käyttäjä painaa nappia, avataan lomake uuden merkinnän lisäämistä varten
    addButton.addEventListener("click", () => {
        // tyhjät oletusarvot
        const title = "";
        const date = "";
        const text = "";

        const formWindow = createFormWindow(infoWindow, title, date, text, marker, map);
        infoWindow.setContent(formWindow);
    });


    // tapahtumankuuntelija poistonapille, joka poistaa markerin ja keskittää kartan alkuperäiseen paikaan
    removeButton.addEventListener("click", () => {
        marker.remove();
        map.setCenter({lat: 50.0, lng: 10.0 });
        map.setZoom(4);
    });

    return infoWindow;

}

function createFormWindow(infoWindow, title, date, text, marker, map) {
    
    // luodaan form HTML-elementti ja siihen sisältö
    const form = document.createElement("form");
    form.id = "diary-form"
    form.innerHTML = `
        <div class="m-2">
            <h4>Lisää uusi merkintä päiväkirjaan</h4>
            <div class="form-group mt-2">
                <label class="mb-1">Otsikko</label>
                <input type="text" class="form-control"  placeholder="Otsikko" id="title" value="${title || ''}">
            </div>
            <div class="form-group mt-2">
                <label class="mb-1">Päivämäärä</label>
                <input type="date" class="form-control" placeholder="Päivämäärä" id="date" value="${date || ''}">
            </div>
            <div class="form-group mt-2">
                <label class="mb-1">Lisätietoja</label>
                <textarea class="form-control" rows="3" id="textArea">${text || ''}</textarea>
            </div>
            <button type="submit" class="btn btn-primary mt-2">Tallenna</button>
        </div>
    `;

    form.style.width = "400px";
    form.style.margin = "10px";

    infoWindow.latestContent = form;

    // lisätään formille tapahtumankuuntelija, joka tallentaa käyttäjän lisäämät tiedot
    form.addEventListener("submit", (event) => handleFormSubmit(event, infoWindow, form, marker, map));

    return form;
}

// tallennetaan uudet arvot ja kutsutaan funktioita createDiaryContent ja saveChanges
function handleFormSubmit(event, infoWindow, form, marker, map) {
    event.preventDefault();
    const title = form.querySelector("#title").value;
    const date = form.querySelector("#date").value;
    const text = form.querySelector("#textArea").value;
    createDiaryContent(infoWindow, title, date, text, marker, map);
    saveTravelLog(title, date, text, marker);
}

export function createDiaryContent(infoWindow, title, date, text, marker, map) {

    // lisätään HTML-elementti, johon tallennetaan tiedot käyttäjän syöttämästä datasta
    const diaryContent = document.createElement("div");
    diaryContent.innerHTML = `
    <div style="color: #333; font-size: 14px; padding: 10px; max-width: 300px;">
        <h4 style="margin-top: 0; color: #007BFF;">${title}</h4>
        <p>${date}</p>
        <p>${text}</p>
        <button id="modifyButton" class="btn btn-primary">Muokkaa</button>
        <button id="deleteButton" class="btn btn-primary">Poista</button>
    </div>
    `;

    // lisätään html. elementti infoWindowhin
    infoWindow.setContent(diaryContent);
    infoWindow.latestContent = diaryContent;

    // haetaan viittaukset napeille
    const modifyButton = diaryContent.querySelector("#modifyButton");
    const deleteButton = diaryContent.querySelector("#deleteButton");

    // luodaan muokkausnapille tapahtumankuuntelija, jonka avulla käyttäjä voi muokata jo tallentamaansa päiväkirja merkintää
    modifyButton.addEventListener("click", () => {
        const form = createFormWindow(infoWindow, title, date, text, marker, map);
        infoWindow.setContent(form);
    });

    // poistonapin tapahtumankuuntelijalla käyttäjä voi poistaa koko päiväkirjamerkkinä
    deleteButton.addEventListener("click", () => {
        marker.remove();
        map.setCenter({lat: 50.0, lng: 10.0 });
        map.setZoom(4);
    })

}


