# My Travel Diary

My Travel Diary on verkkopohjainen JavaScript-sovellus, jonka avulla käyttäjä voi merkitä kartalle paikkoja, joissa on matkustanut. Käyttäjä syöttää hakukenttään matkakohteen nimen, ja sovellus etsii paikan ja lisää sille markerin kartalle.

Kun käyttäjä klikkaa markkeria, avautuu InfoWindow, jossa voi joko lisätä kohteeseen liittyviä tietoja tai poistaa markerin. Valitsemalla "Lisää merkintä" käyttäjä saa lomakkeen, johon voi täyttää otsikon, päivämäärän ja päiväkirjatekstin.

Merkinnän tallentamisen jälkeen tietoja voi vielä muokata tai poistaa. Kaikki merkinnät tallennetaan selaimen localStorageen, joten ne säilyvät tallessa myös selainistunnon päätyttyä. Käyttäjä voi näin palata myöhemmin katsomaan tai muokkaamaan aiempia matkakohteitaan suoraan kartalta.

Sovelluksessa on käytetty:
- **Google Maps JavaScript API** kartan luomiseen
- **Google Places API** matkakohteiden hakemiseen
- **Autocomplete-widgettiä**, joka helpottaa käyttäjän syötteen täydentämistä hakukentässä.

## Live-demo

Katso projektin toimiva versio tästä:  
[🌐 Matkapäiväkirja](https://anniinap.github.io/travel-diary/ "Tutustu matkapäiväkirjaani")
