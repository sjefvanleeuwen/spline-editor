# Spline Editor
[Edit in StackBlitz next generation editor ⚡️](https://stackblitz.com/~/github.com/sjefvanleeuwen/spline-editor)

A custom HTML element-based spline editor for creating and managing animation splines. This tool uses the Web Components standard to offer a reusable, encapsulated graphical interface for defining and manipulating spline curves through a browser.

## Features

- **Create Splines**: Click on the graph to add control points.
- **Adjust Control Points**: Click and drag points to modify the spline curve.
- **View Coordinates**: Hover over control points to display their coordinates.
- **Custom Curve Types**: Select between different spline curve types using radial buttons (e.g., cubic Bezier).
- **Lightweight and Reusable**: Built using Web Components (Custom Elements), this editor can be integrated into any web project with ease.
  
## Web Components Overview

This project leverages Web Components, a suite of technologies to create reusable, encapsulated HTML tags. These technologies include:

- **Custom Elements**: Define your own HTML tags and behaviors using the `HTMLElement` class.
- **Shadow DOM**: Encapsulates the component’s internal DOM and styling, preventing interference from external styles.
- **HTML Templates**: Use templates to define reusable HTML structures within the component.

## Installation

To use this project:

1. Clone the repository:
   ```bash
   git clone https://github.com/sjefvanleeuwen/spline-editor.git
   ```

2. Navigate to the project folder:
   ```bash
   cd spline-editor
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Build and run the project:
   ```bash
   npm run build
   npm run start
   ```

5. Open the application in your browser:
   ```
   http://localhost:5000
   ```

## Usage

To use the spline editor as a custom element in your project:

1. Import the JavaScript file:
   ```html
   <script src="path-to-spline-editor.js"></script>
   ```

2. Add the custom element to your HTML:
   ```html
   <spline-editor></spline-editor>
   ```

3. Customize the spline editor's behavior using its API and properties (details in documentation).

## Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="path-to-spline-editor.js"></script>
  <title>Spline Editor</title>
</head>
<body>
  <spline-editor></spline-editor>
</body>
</html>
```

## Contributing

Feel free to submit issues and pull requests to improve this project. Contributions are welcome!

## License

This project is licensed under the MIT License.
