//https://www.tutorialsteacher.com/nodejs/expressjs-web-application (webapp's step-by-step tutorial)
//https://www.tutorialspoint.com/http/http_methods.htm  (HTTP request methods)
//  database columns definition
//  0: store (餐廳名字)
//  1: place (區域, 公館、118、學餐、溫州街...)
//  2: address (詳細地址)
//  3: price (價位: 平均數)
//  4: budget(預算, $:0-100 $$:101-200 $$$:201-300 $$$$:301-500 $$$$$:501+)
//  5: type (菜色類別: 中式、日式、韓式...)
//  6: staple (主食, 飯、麵、水餃)
//  7: dishes (菜色： 米食、麵食、鍋物、排餐、輕食...)
//  8: meat (葷/有提供素食/全素)  
//  9: seat (有無內用座位: 有/無) 
// 10: capacity (可容納人數數字，很多的話就寫10+))
// 11: time (營業時間)
// 12: image (示意圖檔)
// 13: suggestion (天氣冷熱)


var express = require('express')
const qs = require('querystring')
const fs = require('fs')
const csv = require('csv')

var app = express()


// the __dirname is the current directory from where the script is running
app.get('/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/' + 'index.html')
})

app.get('/todo', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/todo/' + 'todo.html')
})

app.get('/stores/', function (req, res) {
    console.log(req.url)
    res.sendFile(__dirname + '/src/stores/' + 'stores.html')
})

// handle stores/API
const allStores = []
let filterStores = []
const fsPromises = fs.promises

async function readDatabase() {
    try {
        // STEP 1: 讀取 CSV 檔
        const inputFile = __dirname + '/database/ntufoods.csv'
        const input = await fsPromises.readFile(inputFile)

        // STEP 2：建立讀出 CSV 用的陣列和 parser
        const parser = csv.parse({
            delimiter: ','
        })

        // STEP 3-1：建立對應事件 - 讀取資料
        parser.on('readable', function () {
            while ((record = parser.read())) {
                allStores.push(record);
            }
        })

        // STEP 3-2：錯誤處理
        parser.on('error', function (err) {
            console.error(err.message);
        })

        // STEP 3-3：取得最後 output 的結果
        parser.on('end', function () {
            console.log('total stores from database:', allStores.length)
        })

        // STEP 4：放入預備讀取的內容
        parser.write(input);

        // STEP 5：關閉 readable stream
        parser.end()
    } catch (error) {
        console.log('error', error)
    }
}
readDatabase()

// filter: look-up table at column-1 (places), column-5 (types), column-4 (budgets)
const place_list = ["水源市場到師大分部", "水源市場到正門", "正門到台電大樓", "溫州街", "118", "台大學餐", "台科大學餐", "長興"]
const types_list = ["中式", "西式", "台式", "美式", "港式", "韓式", "日式", "東南亞料理", "南洋料理", "中東料理", "雲南料理"]
const budgets_list = ["$", "$$", "$$$", "$$$$", "$$$$$"]

function filterPlaces(opt) {
    let selection = place_list[parseInt(opt)]
    return filterStores.filter(store => store[1] === selection)
}
function filterTypes(opt) {
    //todo
    return filterStores
}
function filterBudgets(opt) {
    //todo
    return filterStores
}

function queryStores(opts) {
    if (opts.place && opts.place >= 0) {
        filterStores = filterPlaces(opts.place)
    }
    if (opts.type && opts.type >= 0) {
        filterStores = filterTypes(opts.type)
    }
    if (opts.budget && opts.budget >= 0) {
        filterStores = filterBudgets(opts.budget)
    }

    console.log("query stores:", filterStores.length)
    return filterStores
}

// curl -X GET "http://localhost:5000/stores/api?place=2&type=2&budget=0"
app.get("/stores/api", (req, res, next) => {
    console.log(req.url)
    filterStores = [...allStores]
    try {
        const querystr = req.url.replace('/stores/api?', '')
        const opts = qs.parse(querystr)
        res.json(queryStores(opts))
    } catch (e) {
        console.error(e)
    }
})

app.get('/*', function (req, res) {
    console.log(req.url);
    res.sendFile(__dirname + '/' + req.url)
})

let server = app.listen(5000, function () {
    console.log('Node server is running..')
})

