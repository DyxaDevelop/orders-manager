const express = require('express');

const app = express();

const bodyParser = require("body-parser");

const mysql = require('mysql');

const http = require('http');
const url = require('url');
const { json, response } = require('express');
const fs = require('fs').promises;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const conn = mysql.createConnection({
    // DB connecting here
    host: "localhost",
    user: "root",
    database: "users",
    password: "root"
});

conn.connect(function (err) {
    if (err) {
        return console.error("Ошибка: " + err.message);
    }
    else {
        console.log("Подключение к серверу MySQL успешно установлено");
    }
});

app.listen(4000, () => {
    console.log('server is listening')
})

app.get('/', (req, res) => {
    fs.readFile(__dirname + "/index.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
})
app.get('/template', (req, res) => {
    fs.readFile(__dirname + "/template.html")
        .then(contents => {
            res.setHeader("Content-Type", "text/html");
            res.writeHead(200);
            res.end(contents);
        })
})

app.get('/api', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        if (urlRequest.query.action == 1) {
            let database = urlRequest.query.db;
            let table = urlRequest.query.table;
            let value = urlRequest.query.value;
            let query = `SELECT * FROM ${database} WHERE ${table} = ${value}`;

            conn.query(query, (err, result, field) => {
                console.log(err);
                res.send(result);
            });
        } else {
            let database = urlRequest.query.db;
            let query = `SELECT * FROM ${database}`;
            conn.query(query, (err, result, field) => {
                console.log(err);
                res.send(result);
            });
        }
    }
})


app.get('/info/buyer', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        let buyer = urlRequest.query.buyer;
        let query = `SELECT * FROM Kontrahent WHERE KontrahentID = ${buyer}`;

        conn.query(query, (err, result, field) => {
            console.log(err);
            res.send(result);
        });

    }
})
app.get('/info/produkts', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        let order = urlRequest.query.order;
        let query = `SELECT * FROM Zamowienie WHERE OrderID = ${order}`;

        conn.query(query, (err, result, field) => {
            console.log(err);
            res.send(result);
        });

    }
})

app.get('/info/order', (req, res) => {
    let ourResult = [];
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        let order = urlRequest.query.order;
        let query = `SELECT * FROM Produkt_Zamowienie WHERE OrderID = ${order}`

        conn.query(query, (err, results, field) => {
            console.log('>> results: ', results);
            var string = JSON.stringify(results);
            console.log('>> string: ', string);
            var json = JSON.parse(string);

            for (let i = 0; i < json.length; i++) {
                let query2 = `SELECT * FROM Produkt WHERE ProduktID = ${json[i].ProduktID}`;
                conn.query(query2, (err, result, field) => {
                    var string1 = JSON.stringify(result);
                    var json1 = JSON.parse(string1);
                    ourResult.push(Object.assign(json[i], json1[0]))
                    if (i == json.length - 1) {
                        res.send(ourResult);
                    }
                });
            }
        });
    }
})



app.post('/faktura', (req, res) => {
    if (req.method == 'POST') {
        let urlRequest = url.parse(req.url, true);
        let order = urlRequest.query.order;
        let buyer = urlRequest.query.buyer;
        let query = `SELECT * FROM Kontrahent WHERE KontrahentID = ${buyer}`;
        let query1 = `SELECT * FROM Zamowienie WHERE OrderID = ${order}`;
        let query2 = `SELECT * FROM Produkt_Zamowienie WHERE OrderID = ${order}`;
        let buyerResult;
        let orderResult;
        let Produkt_ZamowienieResult;
        conn.query(query, (err, result, field) => {
            console.log(err);
            buyerResult = result;
        });
        conn.query(query1, (err, result, field) => {
            console.log(err);
            orderResult = result;
        });
        conn.query(query2, (err, result, field) => {
            console.log(err);
            Produkt_ZamowienieResult = result;
            let b = {
                0: buyerResult,
                1: orderResult,
                2: Produkt_ZamowienieResult
            }
            res.send(JSON.stringify(b));
        });
    }
})

app.get('/produkt', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        let id = urlRequest.query.id;
        let query2 = `SELECT * FROM Produkt WHERE ProduktID = ${id}`;
        conn.query(query2, (err, result, field) => {
            console.log(err);
            res.send(result);
        });
    }
})


app.get('/produkts', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        let id = urlRequest.query.id;
        let query2 = `SELECT * FROM Produkt`;
        conn.query(query2, (err, result, field) => {
            console.log(err);
            res.send(result);
        });
    }
})
app.get('/clients', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        let id = urlRequest.query.id;
        let query2 = `SELECT * FROM Kontrahent`;
        conn.query(query2, (err, result, field) => {
            console.log(err);
            res.send(result);
        });
    }
})


let KontrahentID = '';
let PositionID = '';
let OrderID = '';

function getLastOrderID() {
    let query2 = `SELECT OrderID FROM Zamowienie`;
    conn.query(query2, (err, result, field) => {
        console.log(err);
        console.log(result.length + 2)
        OrderID = result.length + 2;
        return result.length + 2;
    });
}

function getLastKontrahentID() {
    let getLastKontrahentID = `SELECT KontrahentID FROM Kontrahent`;
    conn.query(getLastKontrahentID, (err, result, field) => {
        console.log(err);
        console.log(result.length + 1 + ' Kontrahent')
        KontrahentID = result.length + 1;
        return result.length + 1;
    });
}


function getLastPositionID() {
    let query2 = `SELECT PositionID FROM Produkt_Zamowienie`;
    conn.query(query2, (err, result, field) => {
        console.log(err);
        console.log(result.length + 2)
        PositionID = result.length + 2;
        return result.length + 2;
    });
}

getLastKontrahentID();
getLastPositionID();
getLastOrderID();
app.post('/add', (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body.action)
        let respon = true;
        if (req.body.action == 1) {
            let answer = false;
            var d = new Date();

            var query2 = `INSERT INTO Kontrahent(KontrahentID, Nazwa, Imie, Nazwisko, Telefon, Adresa, Miasto, Powiat, KodPocztowy, Kraj) VALUES (${KontrahentID}, "${req.body.Nazwa}", "${req.body.Name}", "${req.body.Surname}", "${req.body.Phone}", "${req.body.Adress}", "${req.body.City}", "${req.body.District}", "${req.body.Code}", "${req.body.Country}")`;

            conn.query(query2, (err, result, field) => {
                console.log(err);
                if (!err) {
                    respon = false;
                }
            });


            let query3 = `INSERT INTO Zamowienie(OrderID, KontrahentID, DataZamowienia, DataWyslania, Status, Komentarze) VALUES (${OrderID}, ${KontrahentID}, "${d.toString()}", "${d.toString()}", "Oplacona", " " )`;
            conn.query(query3, (err, result, field) => {
                console.log(err);
                respon = false;
            });

            for (let i = 0; i < req.body.productRequest.length; i++) {
                let query4 = `INSERT INTO Produkt_Zamowienie(PositionID, ProduktID, OrderID, Ilosc) VALUES (${PositionID}, ${req.body.productRequest[i].id}, ${OrderID}, ${req.body.productRequest[i].count})`;

                conn.query(query4, (err, result, field) => {
                    console.log(err);
                    respon = false;
                });
            }
            getLastKontrahentID();
            getLastOrderID();
            res.status(200).send(respon);
        } else {

            let answer = false;
            var d = new Date();

            console.log(req.body)

            let query3 = `INSERT INTO Zamowienie(OrderID, KontrahentID, DataZamowienia, DataWyslania, Status, Komentarze) VALUES (${OrderID}, ${req.body.KontrahentID}, "${d.toString()}", "${d.toString()}", "Oplacona", " " )`;
            conn.query(query3, (err, result, field) => {
                console.log(err);
                respon = false;
            });

            for (let i = 0; i < req.body.productRequest.length; i++) {
                let query4 = `INSERT INTO Produkt_Zamowienie(PositionID, ProduktID, OrderID, Ilosc) VALUES (${PositionID}, ${req.body.productRequest[i].id}, ${OrderID}, ${req.body.productRequest[i].count})`;

                conn.query(query4, (err, result, field) => {
                    console.log(err);
                    respon = false;
                });
            }
            getLastKontrahentID();
            getLastPositionID();
            getLastOrderID();
            res.status(200).send(respon);
        }
    }
})

app.get('/all', (req, res) => {
    if (req.method == 'GET') {
        let urlRequest = url.parse(req.url, true);
        if (urlRequest.query.action == 1) {
            let database = "Zamowienie";
            let query = `SELECT * FROM ${database}`;
            conn.query(query, (err, result, field) => {
                console.log(err);
                res.send(result);
            });
        } else {
            let database = "Zamowienie";
            let query = `SELECT * FROM ${database}`;
            conn.query(query, (err, result, field) => {
                console.log(err);
                res.send(result);
            });
        }
    }
})
// INSERT INTO `produkt` (`ProduktID`, `Producent`, `Nazwa`, `Rozmiar`, `CenaNetto`, `Dostepna_ilosc`, `KrajPochodzenia`, `Opis`) VALUES ('1', 'Pringles', 'Chips', '1', '5.99', '3680', 'Portugalia', 'Bekonowy smak');

// app.get('/summ', (req, res) => {
//     if (req.method == 'GET') {
//         // GET -> получить обработать
//         let urlRequest = url.parse(req.url, true);
//         let number1 = +urlRequest.query.number1;
//         let number2 = +urlRequest.query.number2;
//         let result = number1 + number2;
//         res.end(result.toString());
//     }
// })

//app.get('/faktura', (req, res) => {
    //     if (req.method == 'GET') {
    //         let urlRequest = url.parse(req.url, true);
    //         let order = urlRequest.query.order;
    //         let buyer = urlRequest.query.buyer;
    //         let query = `SELECT * FROM Kontrahent WHERE KontrahentID = ${buyer}`;
    //         let query1 = `SELECT * FROM Zamowienie WHERE OrderID = ${order}`;
    //         let query2 = `SELECT * FROM Produkt_Zamowienie WHERE OrderID = ${order}`;
    //         let buyerResult;
    //         let orderResult;
    //         let Produkt_ZamowienieResult;
    //         conn.query(query, (err, result, field) => {
    //             console.log(err);
    //             buyerResult = result;
    //         });
    //         conn.query(query1, (err, result, field) => {
    //             console.log(err);
    //             orderResult = result;
    //         });
    //         conn.query(query2, (err, result, field) => {
    //             console.log(err);
    //             Produkt_ZamowienieResult = result;
    //             let b = {
    //                 0: buyerResult,
    //                 1: orderResult,
    //                 2: Produkt_ZamowienieResult
    //             }
    //             res.send(JSON.stringify(b));
    //         });
    //     }
    // })