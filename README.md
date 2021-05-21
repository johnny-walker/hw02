# Homework02
database columns definition\
 0: store (餐廳名字)\
 1: place (區域, 公館、118、學餐、溫州街...)\
 2: address (詳細地址)\
 3: price (價位: 平均數)\
 4: budget(預算, $:0-100 $$:101-200 $$$:201-300 $$$$:301-500 $$$$$:501+)\
 5: type (菜色類別: 中式、日式、韓式...)\
 6: staple (主食, 飯、麵、水餃)\
 7: dishes (菜色： 米食、麵食、鍋物、排餐、輕食...)\
 8: meat (葷/有提供素食/全素)  \
 9: seat (有無內用座位: 有/無) \
10: capacity (可容納人數數字，很多的話就寫10+))\
11: time (營業時間)\
12: image (示意圖檔)\
13: suggestion (天氣冷熱)

### Developing Step: 
#### food page design 
touch stores.html, stores.js & stores.css \
edit html page, add img/span/label/button/select tags, add a container (ul w/ some example li) to show query results \
create res/, add food & home images under this folder \
edit javascript, add functions to removeAllChildNodes() \
edit css to decorate the store page （初步調整）

#### app (server) changes 
create database/, copy ntufood.csv into this folder \
edit javascript to add function for http request (XMLHttpRequest) \
edit index.js (server app) to read database (store info), install/requires csv, requires querystring & fs \
edit index.js to respond the GET request for stores/api \
edit index.js to parse the GET api parameters \
edit index.js to filter the data () 

#### list item 
edit html to get select values as http GET request parameters \
edit html to get the http GET response (stores) \
create all child element(li tag) for each store \
edit css again, 整體調整 

#### image list item 
edit html , change the list from ul/li tags to div/img tags \
create all child element(div img tags) for each store \
edit css again, 整體調整 

##### ToDo (improvement)
set image with round corner \
adjsut the leading space, reserve some space between image and title \
show more info, create more textnodes for each image item
