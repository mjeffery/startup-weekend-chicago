angular.module('gift-tapes')

.directive('gtDrawing', function() {
	return {
		templateUrl: 'templates/drawing.html',
		scope: {
			width: '@',
			height: '@'
		},
		link: function(scope, elem, attrs) {
			scope.mouseDown = false;

			elem.on('mousemove', function(e) {
				if(scope.mouseDown) {
					var pos = getCrossBrowserElementCoords(e);
					console.log('(' + pos.x + ',' + pos.y + ')');
				}
			});

			//TODO not tracking the button that's pressed
			//TODO the 
			elem.on('mousedown', function(e) {
				scope.mouseDown = true;
			});

			elem.on('mouseup', function(e) {
				scope.mouseDown = false;
			});
		}
	}
});

//http://www.angularjshub.com/examples/eventhandlers/mouseevents/

// Accepts a MouseEvent as input and returns the x and y
// coordinates relative to the target element.
function getCrossBrowserElementCoords(mouseEvent) {
  var result = {
	x: 0,
	y: 0
  };

  if (!mouseEvent)
  {
	mouseEvent = window.event;
  }

  if (mouseEvent.pageX || mouseEvent.pageY)
  {
	result.x = mouseEvent.pageX;
	result.y = mouseEvent.pageY;
  }
  else if (mouseEvent.clientX || mouseEvent.clientY)
  {
	result.x = mouseEvent.clientX + document.body.scrollLeft +
	  document.documentElement.scrollLeft;
	result.y = mouseEvent.clientY + document.body.scrollTop +
	  document.documentElement.scrollTop;
  }

  if (mouseEvent.target)
  {
	var offEl = mouseEvent.target;
	var offX = 0;
	var offY = 0;

	if (typeof(offEl.offsetParent) != "undefined")
	{
	  while (offEl)
	  {
		offX += offEl.offsetLeft;
		offY += offEl.offsetTop;

		offEl = offEl.offsetParent;
	  }
	}
	else
	{
	  offX = offEl.x;
	  offY = offEl.y;
	}

	result.x -= offX;
	result.y -= offY;
  }

  return result;
}
