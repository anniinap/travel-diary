// tallennetaan lisätty paikkamerkintä localstorageen
export function saveTravelLog(title, date, text, marker) {
    
    // formatoidaan tallennettava data oikeiaan muotoon
    const logData = {
        title,
        date,
        text,
        position: {
            lat: marker.position.lat,
            lng: marker.position.lng
        }
    };

    // etsitään olemassa oleva data
    const existingLogs = JSON.parse(localStorage.getItem("travelLogs")) || [];

    // lisätään uusidata
    existingLogs.push(logData);

    // tallenetaan 
    localStorage.setItem("travelLogs", JSON.stringify(existingLogs));
}