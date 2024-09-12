// CanvasRenderer.js
export class CanvasRenderer {
    constructor(canvas, spline, options = {}) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.spline = spline;

        // Initialize with provided options or use defaults
        this.setOptions(options);
    }

    // Setter to update options properly
    setOptions(newOptions) {
        // Ensure we don't overwrite the entire options object, just merge what was provided
        this.options = {
            controlPointColor: '#ff9800',
            fixedPointColor: '#03a9f4',
            lineColor: '#ffffff',
            controlLineColor: '#888888',
            markerColor: '#00ff00',
            interpolation: 'catmullRom',  // Default interpolation
            ...newOptions  // Merge in the new options
        };
    }

    // Updates only color options dynamically
    updateColors(colors) {
        console.log(this.options.lineColor)
        // Update color-related options only
        this.setOptions(colors);

        // Log the updated options for debugging
        console.log("Updated options with new colors:", this.options);

        // Re-render after updating colors
        this.drawEditor();
    }

    // Draws the entire editor (control points, spline, marker)
    drawEditor(markerPosition = null) {
        const { ctx, spline, options } = this;
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw control lines (connecting control points)
        ctx.beginPath();
        ctx.moveTo(spline.controlPoints[0].x, spline.controlPoints[0].y);
        for (let i = 1; i < spline.controlPoints.length; i++) {
            ctx.lineTo(spline.controlPoints[i].x, spline.controlPoints[i].y);
        }
        ctx.strokeStyle = options.controlLineColor;  // Use updated controlLineColor
        ctx.stroke();

        // Draw either Catmull-Rom spline or Linear Envelope
        const splinePoints = options.interpolation === 'catmullRom'
            ? spline.getCatmullRomSplinePoints()
            : spline.getLinearEnvelopePoints();

        ctx.beginPath();
        ctx.moveTo(splinePoints[0].x, splinePoints[0].y);
        splinePoints.forEach(point => ctx.lineTo(point.x, point.y));
        ctx.strokeStyle = options.lineColor;  // Use updated lineColor
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw control points
        spline.controlPoints.forEach(point => {
            ctx.beginPath();
            ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = point.fixedX ? options.fixedPointColor : options.controlPointColor;  // Use updated colors
            ctx.fill();
        });

        // Draw the marker if a position is provided
        if (markerPosition !== null) {
            const marker = options.interpolation === 'catmullRom'
                ? this.getMarkerOnCatmullRom(markerPosition, splinePoints)
                : this.getMarkerOnLinearPath(markerPosition, spline.controlPoints);

            ctx.beginPath();
            ctx.arc(marker.x, marker.y, 5, 0, Math.PI * 2);
            ctx.fillStyle = options.markerColor;  // Use updated markerColor
            ctx.fill();
        }
    }

    // Get marker position for linear interpolation
    getMarkerOnLinearPath(position, controlPoints) {
        let totalLength = 0;
        const segmentLengths = [];

        // Calculate lengths of each segment
        for (let i = 0; i < controlPoints.length - 1; i++) {
            const p1 = controlPoints[i];
            const p2 = controlPoints[i + 1];
            const length = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            segmentLengths.push(length);
            totalLength += length;
        }

        // Calculate the position along the total path
        let markerLength = totalLength * position;
        for (let i = 0; i < segmentLengths.length; i++) {
            if (markerLength <= segmentLengths[i]) {
                const ratio = markerLength / segmentLengths[i];
                const p1 = controlPoints[i];
                const p2 = controlPoints[i + 1];
                return {
                    x: p1.x + (p2.x - p1.x) * ratio,
                    y: p1.y + (p2.y - p1.y) * ratio
                };
            }
            markerLength -= segmentLengths[i];
        }

        // Default to the last point if somehow the calculation fails
        const lastPoint = controlPoints[controlPoints.length - 1];
        return { x: lastPoint.x, y: lastPoint.y };
    }

    // Get marker position for Catmull-Rom interpolation
    getMarkerOnCatmullRom(position, splinePoints) {
        const index = Math.floor(position * (splinePoints.length - 1));
        return splinePoints[index];
    }

    // Toggles between Catmull-Rom spline and linear interpolation
    toggleInterpolation(method) {
        this.options.interpolation = method;
        this.drawEditor();
    }
}
