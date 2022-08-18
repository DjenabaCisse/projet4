import fetch from "node-fetch";

async function eventCall() {
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

eventCall();
