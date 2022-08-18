import fetch from "node-fetch";
import eventDao from "./event-dao-mongoose.js";

async function retreiveEvent(event) {
  let initialiseDate = new Date();
  let todaysDate =
    initialiseDate.getFullYear() +
    "-" +
    ((initialiseDate.getMonth() < 9 ? "0" : "") +
      (initialiseDate.getMonth() + 1)) +
    "-" +
    initialiseDate.getDate();
  let wsUrl = `https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=&facet=${todaysDate}&facet=date_end&facet=tags&facet=address_name&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=transport&facet=price_type&facet=access_type&facet=updated_at&facet=programs`;

  try {
    const response = await fetch(wsUrl);
    console.log("\n https://opendata.paris.fr response:");
    console.log("response.status : ", +response.status);
    console.log("response data : " + JSON.stringify(await response.json()));
  } catch (ex) {
    console.log("ex : " + ex);
  }
}

async function storeEventInMongoDataBase(event) {
  let criteria = { name: event.name };
  let existingEventsInDb = await eventDao.findByCriteria(criteria);
  if (existingEventsInDb && existingEventsInDb.length > 0) {
    let newValueOfEventToUpdate = event;
    newValueOfEventToUpdate.id = existingEventInDb[0].id;
    let updatedEvent = await eventDao.updateOne(newValueOfEventToUpdate);
    return updatedEvent;
  } else {
    let savedEvent = await eventDao.save(event);
    return savedEvent;
  }
}

/*
async function retreiveInfos() {
  for (let [i, v] of villesAvecMeteo.entries()) {
    await retreiveEvent(v);
    villesAvecMeteo[i] = await storeEventInMongoDataBase(v);
  }
  console.log("villesAvecMeteo=" + JSON.stringify(villesAvecMeteo));
}


retreiveInfos();

*/

//idee pour phase 3 (déclenchement périodique):
var intervaleDeTemps = 5000; //5000ms = 5s
//pour 1h , intervaleDeTemps = 1000 * 60 * 60
var compteur = 0;

//coder une fonction qui sera appelée toutes les 5s (5000ms) et qui va incrementer et afficher le
//compteur. Lorsque le compteur aura atteint la valeur 10 on arrete le traitement périodique
// via un appel à clearInterval(traitementPeriodique)
function codeDeclenchePeriodiquement() {
  compteur++;
  console.log("compteur=" + compteur);
  if (compteur == 10) {
    {
      clearInterval(traitementPeriodique);
      process.exit();
    }
  }
}
var traitementPeriodique = setInterval(
  codeDeclenchePeriodiquement,
  intervaleDeTemps
);
