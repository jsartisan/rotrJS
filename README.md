<h1>RotranslateJS</h1>

<p>A very simple JS Plugin for making element rotate and translate relative to the cursor movement.<p>

<h2>Usage</h2>

<p>Include the <strong>rotr.js</strong> in head or before ending body tag.</p>

```html
  <script type="text/javascript" src="rotr.js"></script>
```

To apply it on a elment , create the Rotr Object passing the element and options to it.

```html
    <script>
  	text = new Rotr("#text",{
  		xInverse: true,     // set to true if you want to move the element opposite to cursor movement in X-Axis
			yInverse: false,    //  set to true if you want to move the element opposite to cursor movement  in Y-Axis
			speed : 0.09,       // set speed of relative movement
			translate : true,   // set to false if you dont want to translate the element
			rotate : false,     // set to false if you dont want to rotate the element
			vertical : true,    // restrict the movement in X-axis only
			horizontal : true   // restrict the movement in Y-axis only
  	});
  </script>
```

<p>Here are the default values</p>

```js
  var defaults = {
			xInverse: false,//asd
			yInverse: false,
			speed : 0.09,
			translate : true,
			rotate : true,
			vertical : true,
  };
```

