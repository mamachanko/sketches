import p5base from 'p5';

import Surface from './Surface';

export default () => new p5base((p5) => {

    const surface = new Surface(window.innerWidth, window.innerHeight, .05);

    p5.setup = () => {
        p5.createCanvas(surface.totalWidth, surface.totalHeight);
        p5.noLoop();
    };

    p5.draw = () => {
        p5.clear();
        p5.stroke(1);

        let xoff = 0;
        const xoffInc = .1;

        let yoff = 0;
        const yoffInc = .1;

        const circleCenterX = surface.totalWidth / 2;
        const circleCenterY = surface.totalHeight / 2;
        const radius = p5.min(surface.height, surface.width) / 2;

        for (let y = 0; y < surface.rows; y++) {
            for (let x = 0; x < surface.cols; x++) {

                const theta = p5.map(p5.noise(xoff, yoff), 0, 1, 0, p5.TWO_PI);
                let v = p5.createVector(Math.cos(theta), Math.sin(theta));

                const cellCenterX = surface.originX + (x * surface.cellWidth) + (surface.cellWidth * .5);
                const cellCenterY = surface.originY + (y * surface.cellHeight) + (surface.cellHeight * .5);

                const distanceFromCenter = p5.dist(cellCenterX, cellCenterY, circleCenterX, circleCenterY);
                if (distanceFromCenter < radius) {
                    const f = p5.map(distanceFromCenter, 0, radius, .5, -.5);
                    p5.line(
                        cellCenterX + p5.map(v.x, 0, v.mag(), 0, surface.cellWidth * f),
                        cellCenterY + p5.map(v.y, 0, v.mag(), 0, surface.cellHeight * f),
                        cellCenterX - p5.map(v.x, 0, v.mag(), 0, surface.cellWidth * f),
                        cellCenterY - p5.map(v.y, 0, v.mag(), 0, surface.cellHeight * f)
                    );
                }
                xoff += xoffInc;
            }
            yoff += yoffInc;
        }
    }
});