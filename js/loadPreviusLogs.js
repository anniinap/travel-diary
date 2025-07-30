import { createDiaryContent } from "./infoWindow.js";
import { createMarker } from "./marker.js";

// ladataan aikaisemmin localStorageen lisätyt paikkamerkinnät kartalle
export function loadPreviousLogs(map) {
    const storedLogs = JSON.parse(localStorage.getItem("travelLogs")) || [];

    storedLogs.forEach(async log => {
        const place = {
            location: {
                lat: log.position.lat,
                lng: log.position.lng
            }
        }
        const { marker, infoWindow } = await createMarker(map, place);
        createDiaryContent(infoWindow, log.title, log.date, log.text, marker, map);
    });
}