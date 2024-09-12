// Spline.js
export class Spline {
    constructor(width, height, proximity = 10) {
        this.width = width;
        this.height = height;
        this.proximity = proximity;  // Minimum proximity distance between control points
        this.controlPoints = [
            { x: 0, y: height - 50, fixedX: true },  // Start (fixed)
            { x: width / 3, y: 50, fixedX: false },  // Control point 1
            { x: (width / 3) * 2, y: 150, fixedX: false }, // Control point 2
            { x: width, y: height - 50, fixedX: true }  // End (fixed)
        ];
    }

    // Adds a new control point and sorts by X value
    addControlPoint(x, y) {
        this.controlPoints.push({ x, y, fixedX: false });
        this.controlPoints.sort((a, b) => a.x - b.x);
    }

    // Removes a control point if it's not fixed
    removeControlPoint(point) {
        if (!point.fixedX) {
            this.controlPoints = this.controlPoints.filter(p => p !== point);
        }
    }

    // Moves a control point, but prevents it from crossing neighboring points
    moveControlPoint(point, x, y) {
        const index = this.controlPoints.indexOf(point);

        // Get previous and next points if they exist
        const prevPoint = this.controlPoints[index - 1];
        const nextPoint = this.controlPoints[index + 1];

        // Constrain movement within the proximity boundaries of neighboring points
        if (prevPoint) {
            x = Math.max(prevPoint.x + this.proximity, x);  // Ensure it doesn't go left past the proximity limit of the previous point
        }
        if (nextPoint) {
            x = Math.min(nextPoint.x - this.proximity, x);  // Ensure it doesn't go right past the proximity limit of the next point
        }

        // Update point's position
        if (!point.fixedX) {
            point.x = Math.max(0, Math.min(x, this.width));  // Ensure the point stays within the canvas boundaries
        }
        point.y = Math.max(0, Math.min(y, this.height));
    }

    // Returns the control point clicked by the user
    getClickedPoint(x, y) {
        return this.controlPoints.find(point => Math.hypot(point.x - x, point.y - y) < 10);
    }

    // Catmull-Rom spline interpolation function
    catmullRom(p0, p1, p2, p3, t) {
        const t2 = t * t;
        const t3 = t2 * t;
        return (
            0.5 * ((2 * p1) +
            (-p0 + p2) * t +
            (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
            (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
        );
    }

    // Returns an array of points for Catmull-Rom spline
    getCatmullRomSplinePoints() {
        const points = [];
        for (let i = 0; i < this.controlPoints.length - 1; i++) {
            const p0 = this.controlPoints[i === 0 ? i : i - 1];
            const p1 = this.controlPoints[i];
            const p2 = this.controlPoints[i + 1];
            const p3 = this.controlPoints[i + 2] || p2;

            for (let t = 0; t <= 1; t += 0.01) {
                points.push({
                    x: this.catmullRom(p0.x, p1.x, p2.x, p3.x, t),
                    y: this.catmullRom(p0.y, p1.y, p2.y, p3.y, t)
                });
            }
        }
        return points;
    }

    // Returns an array of points for linear envelope (straight lines)
    getLinearEnvelopePoints() {
        const points = [];
        for (let i = 0; i < this.controlPoints.length - 1; i++) {
            const p1 = this.controlPoints[i];
            const p2 = this.controlPoints[i + 1];
            points.push(p1, p2);  // Connect each point directly with the next one
        }
        return points;
    }
}
