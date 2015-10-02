let DemoMainUtils = {

    getDemoMain: function () {
        return {
            "error": null,
            "next": "MAIN",
            "sessionKey": "abcdef",
            "accounts": [
                {
                    "alias": "Текущий счёт",
                    "rest": 82058.93,
                    "currency": 810,
                    "number": "40817810782450099909",
                    "key": "lg3fsrggjgirfrd4h9552e301r"
                },
                {
                    "alias": "Доллары",
                    "rest": 100.21,
                    "currency": 840,
                    "number": "40817840782450077707",
                    "key": "naebvlurnke14dc2c33sp2gim4"
                }
            ],
            "cards": [
                {
                    "alias": "Visa Classic Debit",
                    "rest": 3899.58,
                    "currency": 810,
                    "number": "4599 99** **** 9950",
                    "key": "tvc1dl9b6ehvq5brd51g04juf5"
                }
            ],
            "deposits": [],
            "messages": [],
            "profile": {
            },
            "pfm": {
                "transactions" : [
                    {
                        "category": "Компьютеры и электроника",
                        "transDateTime": "01.10.2015 11:45",
                        "title": "Покупка: DIGITALOCEAN.COM",
                        "details": "Карта 4599 99** **** 9950. Город NEW YORK CITY. Страна USA.",
                        "transAmount": -10,
                        "image": "digitalocean.png",
                        "transCurr": 840
                    },
                    {
                        "category": "Кафе и рестораны",
                        "transDateTime": "23.09.2015 12:00",
                        "title": "Покупка: DM KOMPANI 1",
                        "details": "Карта 4599 99** **** 9950. Город MOSCOW. Страна RUS.",
                        "transAmount": -308,
                        "image": "stolovaya_spartak.png",
                        "transCurr": 810
                    },
                    {
                        "category" : "Стройматериалы, мебель",
                        "transDateTime" : "02.08.2015 17:49",
                        "title" : "Покупка: HOFF HODYNKA",
                        "details" : "Карта 4599 99** **** 9950. Город MOSKVA. Страна RUS.",
                        "transAmount" : -542,
                        "image" : "hoff.png",
                        "transCurr" : 810
                    },

                ]
            }
        }
    }
}

export default DemoMainUtils;