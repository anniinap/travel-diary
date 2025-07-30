import { createMap} from "./js/map.js";
import { createAutoComlete} from "./js/autoComplete.js";
import { loadPreviousLogs } from "./js/loadPreviusLogs.js";

async function initApp() {
  const map = await createMap();  
  await createAutoComlete(map);   
  loadPreviousLogs(map);    
}

initApp();


