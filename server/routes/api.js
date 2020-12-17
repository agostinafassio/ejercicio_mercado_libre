const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/items', function(req, res) {
    fetch('https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.q)
    .then(res => res.json())
    .then(json => {
        let result = {
            author: {name: 'Agostina', lastName: 'Fassio'},
            categories: [],
            items: []
        };
        json.filters.forEach(filter => {
            if(filter.id == 'category'){
                filter.values[0].path_from_root.forEach(path => {
                    result.categories.push(path.name);
                });
            }
        });
        for(let i = 0; i < 4; i++){
            result.items.push({
                id: json.results[i].id,
                title: json.results[i].title,
                price: {currency: json.results[i].currency_id, amount: json.results[i].price},
                picture: json.results[i].thumbnail,
                condition: json.results[i].condition,
                free_shipping: json.results[i].shipping.free_shipping
            });
        }
        res.send(result);
    });
});

router.get('/items/:id', function(req, res) {
    fetch('https://api.mercadolibre.com/items/' + req.params.id)
    .then(res => res.json())
    .then(json => {
        let result = {
            author: {name: 'Agostina', lastName: 'Fassio'}
        };
        result.item = {
            id: json.id,
            title: json.title,
            price: {currency: json.currency_id, amount: json.price},
            picture: json.pictures[0].url,
            condition: json.condition,
            free_shipping: json.shipping.free_shipping,
            sold_quantity: json.sold_quantity
        };
        fetch('https://api.mercadolibre.com/items/' + req.params.id + '/description')
        .then(res => res.json())
        .then(json => {
            result.item.description = json.plain_text
            res.send(result);
        });
    });
});

module.exports = router;