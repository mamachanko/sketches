import './index.css';
import './googleAnalytics';
import * as sketches from './sketches';
import Navigo from 'navigo';

let routes = {};
Object.values(sketches)
    .map((sketch, i) =>
        routes[`sketches/0${i + 1}`] = () => sketch()
    );

routes['sketches/any'] = () => {
    const randomItem = (array) => array[Math.floor(Math.random() * array.length)];
    randomItem(Object.values(sketches))();
};

routes['sketches/latest'] = () => {
    const last = (object) => [...Object.values(object)].pop();
    last(sketches)();
};

routes['sketches'] = () => {
    document.querySelector('#app').innerHTML = Object.keys(routes)
        .map((key, _) => `<div><a href="${key}">${key}</a></div>`).join(' ');
};

routes['*'] = routes['sketches/latest'];

new Navigo().on(routes).resolve();
