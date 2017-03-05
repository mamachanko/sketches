import p5base from 'p5';

export default () => new p5base((p5) => {
    const totalWidth = window.innerWidth;
    const totalHeight = window.innerHeight;

    const relativeMargin = .05;
    const margin = Math.max(totalWidth, totalHeight) * relativeMargin;

    const width = totalWidth - (2 * margin);
    const height = totalHeight - (2 * margin);
    const originX = margin;
    const originY = margin;

    const cols = parseInt(width * .1);
    const rows = parseInt(height * .1);

    const cellWidth = width / cols;
    const cellHeight = height / rows;

    p5.setup = () => {
        p5.createCanvas(totalWidth, totalHeight);
        p5.noLoop();
    };

    p5.draw = () => {
        p5.clear();
        p5.stroke(1);

        let xoff = 0;
        const xoffInc = .1;

        let yoff = 0;
        const yoffInc = .1;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {

                const theta = p5.map(p5.noise(xoff, yoff), 0, 1, 0, p5.TWO_PI);
                let v = p5.createVector(Math.cos(theta), Math.sin(theta));

                const cellCenterX = originX + (x * cellWidth) + (cellWidth * .5);
                const cellCenterY = originY + (y * cellHeight) + (cellHeight * .5);


                p5.line(
                    cellCenterX + p5.map(v.x, 0, v.mag(), 0, cellWidth * .5),
                    cellCenterY + p5.map(v.y, 0, v.mag(), 0, cellHeight * .5),
                    cellCenterX - p5.map(v.x, 0, v.mag(), 0, cellWidth * .5),
                    cellCenterY - p5.map(v.y, 0, v.mag(), 0, cellHeight * .5)
                );

                xoff += xoffInc;
            }
            yoff += yoffInc;
        }
    }
});