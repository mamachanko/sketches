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

    const aboveDiagonal = (x, y) => {
        let v = x / cols + y / rows;
        return v < 1;
    };

    const border = (x, y) => {
        return Math.sqrt(cols - x) < 1.5 || Math.sqrt(rows - y) < 1.5;
    };

    p5.setup = () => {
        p5.createCanvas(totalWidth, totalHeight);
        p5.noStroke();
        p5.noLoop();
        p5.fill(75);
    };

    p5.draw = () => {
        p5.clear();
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const f = aboveDiagonal(x, y) || border(x, y) ? 1 : .5;
                p5.ellipse(
                    originX + (x * cellWidth) + (cellWidth * .5),
                    originY + (y * cellHeight) + (cellHeight * .5),
                    5 * f,
                    5 * f
                );
            }
        }
    }
});