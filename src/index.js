import './index.css';
import './googleAnalytics';
import * as sketches from './sketches';
import Navigo from 'navigo';

const sketchesArray = Object.keys(sketches).map((k) => {
    return sketches[k]
});

const lastItem = array => [...array].pop();
const randomItem = array => array[Math.floor(Math.random() * array.length)];
const allItemsAsHtml = (routes) => {
    document.querySelector('#app').innerHTML = Object.keys(routes)
        .map((key, _) => `<div><a href="${key}">${key}</a></div>`)
        .join(' ');
};

let routes = {};
sketchesArray.map((sketch, i) =>
    routes[`sketches/0${i + 1}`] = () => sketch()
);

routes['sketches/any'] = () => randomItem(sketchesArray)();
routes['sketches/latest'] = () => lastItem(sketchesArray)();
routes['sketches'] = () => allItemsAsHtml(routes);
routes['*'] = routes['sketches/latest'];

new Navigo().on(routes).resolve();
