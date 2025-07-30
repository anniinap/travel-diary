// luodaan tyhjä map muuttuja mihin tallenttetaan karttaolio
let map;

export async function createMap() {
  // kartan keskitys koordinaatit
  const position = { lat: 50.0, lng: 10.0 };

  // tuodaan Google Maps kirjasto
  const { Map } = await google.maps.importLibrary("maps");

  // luodaan uusi karttaolio ja asetetaan se muuuttujaan maps
    map = new Map(document.getElementById("map"), {
        zoom: 4,
        center: position,
        mapId: "186797d3c49057b2c38b4ab9",
    });

    return map;
}

