export default class {
    constructor(totalWidth, totalHeight, relativeMargin) {
        this.totalWidth = totalWidth;
        this.totalHeight = totalHeight;
        this.relativeMargin = relativeMargin;

        this.margin = Math.max(this.totalWidth, this.totalHeight) * this.relativeMargin;
        this.width = this.totalWidth - (2 * this.margin);
        this.height = this.totalHeight - (2 * this.margin);

        this.originX = this.margin;
        this.originY = this.margin;

        this.cols = parseInt(this.width * .5);
        this.rows = parseInt(this.height * .05);

        this.cellWidth = this.width / this.cols;
        this.cellHeight = this.height / this.rows;
    }
};