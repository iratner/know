const apiKey = "AIzaSyAK-eXy2FnWjAcMzviRWOoLKKNitHByYPo";
const jsonOutputRequest = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json?";
const defaultFields = "price_level,rating,user_ratings_total,name";

export default {
    getPlace : async function(searchString) {
        const data = await fetch(`${jsonOutputRequest}key=${apiKey}&input=${searchString}&inputtype=textquery&fields=${defaultFields}`,
            {
            // method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, *cors, same-origin
            // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // no-referrer, *client
            // body: JSON.stringify(data) // body data type must match "Content-Type" header
        })/*.catch( error => {
            console.log(error);
            return null;
        })*/;

        const response = data.json();
        return JSON.stringify(response);
    }
}