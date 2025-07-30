import { createInfoWindow } from "./infoWindow.js";

// määritellään funktio joka luo uuden markerin 
export async function createMarker(map, place) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    // luodaan uusi markeri
    const marker = new AdvancedMarkerElement({
        map,
        position: place.location,
        gmpClickable: true,
    })

    // Luo infoWindow heti ja kiinnitää sen markeriin
    const infoWindow = await createInfoWindow(marker, map);

    // Lisätään markerille tapahtumankuuntelija
    marker.addEventListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(infoWindow.latestContent);
        infoWindow.open({ 
            anchor: marker, 
            map 
        });
    })

    return {marker, infoWindow}
}