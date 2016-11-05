if (window.addEventListener) {
    window.addEventListener('load', function() {
        var canvas, context, tool;

        function init() {
            canvas = document.getElementById('imageView');
            
            if (!canvas) {
                alert('Error: I cannot find the canvas element!');
                return;
            }

            if (!canvas.getContext) {
                alert('Error: no canvas.getContext!');
                return;
            }

            // Get the 2D canvas context.
            context = canvas.getContext('2d');
            if (!context) {
                alert('Error: failed to getContext!');
                return;
            }

            // Pencil tool instance.
            tool = new tool_pencil();

            canvas.addEventListener('mousedown', ev_canvas, false);
            canvas.addEventListener('mousemove', ev_canvas, false);
            canvas.addEventListener('mouseup', ev_canvas, false);
        }

        // This painting tool works like a drawing pencil which tracks the mouse 
        // movements.
        function tool_pencil() {
            var tool = this;
            this.started = true;
            
            this.send = function(x, y){
               canvas = document.getElementById('position').innerHTML = "X="+x + "  Y="+y ;
               //code to jnet server
            };

            this.mousedown = function(ev) {
                context.beginPath();
                context.moveTo(ev._x, ev._y);
                tool.started = true;
            };
 
            this.mousemove = function(ev) {
                if (tool.started || true) {
                    context.lineTo(ev._x, ev._y);
                    context.stroke();
                    send(ev._x, ev._y);
                }
            };
 
            this.mouseup = function(ev) {
                if (tool.started) {
                    tool.mousemove(ev);
                    tool.started = false;
                }
            };
        }

        function send(x, y){
               canvas = document.getElementById('position').innerHTML = "X="+x + "  Y="+y ;
               //code to jnet server
        }
            
        // position relative to the canvas element.
        function ev_canvas(ev) {
            if (ev.layerX || ev.layerX == 0) { // Firefox
                ev._x = ev.layerX;
                ev._y = ev.layerY;
            } else if (ev.offsetX || ev.offsetX == 0) { // Opera
                ev._x = ev.offsetX;
                ev._y = ev.offsetY;
            }

            // Call the event handler of the tool.
            var func = tool[ev.type];
            if (func) {
                func(ev);
            }
        }

        init();

    }, false);
}