import p5 from 'p5';

export default () => new p5((p5) => {
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

    let zoff = 0;
    const zoffInc = .02;

    p5.setup = () => {
        p5.createCanvas(totalWidth, totalHeight);
        p5.frameRate(15);
    };

    p5.draw = () => {
        p5.clear();
        p5.noStroke();

        let xoff = 0;
        const xoffInc = .5;

        let yoff = 0;
        const yoffInc = .04;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const f = p5.noise(xoff, yoff, zoff);
                const width = p5.map(f, 0, 1, -cellWidth, cellWidth * 2);
                const height = p5.map(f, 0, 1, -cellHeight, cellHeight * 2);
                p5.fill(p5.map(f, 0, 1, 255, 1));
                p5.ellipse(
                    originX + (x * cellWidth) + (cellWidth * .5),
                    originY + (y * cellHeight) + (cellHeight * .5),
                    width,
                    height
                );
                xoff += xoffInc;
            }
            yoff += yoffInc;
        }
        zoff += zoffInc;
    }
});