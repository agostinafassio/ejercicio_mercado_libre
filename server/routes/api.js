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
    .then(json_item => {
        let result = {
            author: {name: 'Agostina', lastName: 'Fassio'}
        };
        result.item = {
            id: json_item.id,
            title: json_item.title,
            price: {currency: json_item.currency_id, amount: json_item.price},
            picture: json_item.pictures[0].url,
            condition: json_item.condition,
            free_shipping: json_item.shipping.free_shipping,
            sold_quantity: json_item.sold_quantity
        };
        fetch('https://api.mercadolibre.com/items/' + req.params.id + '/description')
        .then(res => res.json())
        .then(json_description => {
            result.item.description = json_description.plain_text;
            fetch('https://api.mercadolibre.com/categories/' + json_item.category_id)
            .then(res => res.json())
            .then(json_category => {
                result.categories = [];
                json_category.path_from_root.forEach(category => {
                    result.categories.push(category.name);
                });
                res.send(result);
            });
        });
    });
});

process.on('unhandledRejection', error => {
    console.log(error);
    process.exit();
});

module.exports = router;