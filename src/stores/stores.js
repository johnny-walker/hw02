
function bodyLoaded() {
    console.log("bodyLoaded");
    document.getElementById('queryData').onclick = function(){

        var myElement = document.getElementById('storesList')
        removeAllChildNodes(myElement)

        queryNTUStores(null, function (res) {
            // parse json
            console.log('queryNTUStores totol:'+ res)
        })

        var myElement = document.getElementById('storesList')
    }

    function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
}

const heroku = false
const API_STORES_URL = heroku ? 'https://ntu-food.herokuapp.com/stores/api' : 'http://localhost:5000/stores/api'

function queryNTUStores(props, callback) {
    //let queryString = `?place=${props.place}&type=${props.type}&budget=${props.budget}`
    //let url = API_STORES_URL + queryString
    let url = "http://localhost:5000/stores/api?place=1&type=2&budget=0"

    let xmlhttp = new XMLHttpRequest()
    let method = 'GET'

    xmlhttp.open(method, url)
    xmlhttp.onerror = () => {
        console.log("** An error occurred during the transaction")
    }
    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            //console.log(xmlhttp.responseText.length)
            callback(xmlhttp.responseText.length)
        }
    }
    xmlhttp.send()
}
