import { createMarker } from "./marker.js";

// märitellään funktio AutoComplete hakukentälle
export async function createAutoComlete(map) {
    const { PlaceAutocompleteElement } = await google.maps.importLibrary("places");

    // luodaan AutoComplete ja annetaan sille id
    const placeAutocomplete = new PlaceAutocompleteElement();
    placeAutocomplete.id = "autocomplete";

    // lisätään AutoComplete DOMiin input elementtiin
    const input = document.getElementById("input");
    input.appendChild(placeAutocomplete);

    // lisätään tälle tapahtumankuuntelija , jokaa hakee valitun paikan
    placeAutocomplete.addEventListener('gmp-select', async ({ placePrediction }) => {
        let place = placePrediction.toPlace();
        await place.fetchFields({ 
            fields: ['displayName', 'formattedAddress', 'location'] });

        if (!place) return;
        
        place = place.toJSON();

        // luodaan haetusta paikasta marker
        const marker = await createMarker(map, place);
        
        // keskitetään kartta haettuun paikkan
        map.setCenter({lat: place.location.lat + 1.4, lng: place.location.lng});
        map.setZoom(6);

        // poistetaan autocomplete koska halutaan poistaa haku ja luodaan se uudelleen
        placeAutocomplete.remove();
        createAutoComlete(map);   
    });

}