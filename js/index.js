
$(document).ready(function() {
  var background = document.getElementById('cat');
  var canvas = document.getElementById('canvas');
  var context = canvas.getContext('2d');
  var itemCount = 0;
  
  var redrawBackground = function() {
    background = document.getElementById('cat');
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    context.drawImage(background, 0, 0, 500, 500);
  }

  redrawBackground();

  $('.item').click(function(e) {
    itemCount++;
    var item = $(e.target).clone();
    item.addClass('item' + itemCount)
    item.data('data-x', 100);
    item.data('data-y', 100);
    item.css( 'z-index', itemCount);
    $('.preview').append(item);
    
    interact('.item' + itemCount)
      .draggable({
        onmove: function(event) {
          var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // translate the element
          target.style.webkitTransform =
          target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);
        }
      })
      .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        modifiers: [
          // keep the edges inside the parent
          interact.modifiers.restrictEdges({
            outer: 'parent',
            endOnly: true,
          }),

          // minimum size
          interact.modifiers.restrictSize({
            min: { width: 100, height: 50 },
          }),
        ],

        inertia: true
      })
      .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
      })
      .gesturable({
        onmove: function (event) {
          var target = event.target

          angle += event.da;

          target.style.webkitTransform =
          target.style.transform =
            'rotate(' + angle + 'deg)';
        }
      })
  });

  $("#upload").change(function (){
    var fileName = $(this).val();
    console.log(fileName)
    $("#cat").attr('src', fileName);
    redrawBackground();
  });
});


var examples = { // Not used, just some left over from copy and paste
  displayImage: function(img) {
    var newImageData = Buffer.from(img.src.replace('data:image/jpeg;base64', ''), 'base64')
    Jimp.read(newImageData).then(function (image) {
      image.clone()
      .getBase64(Jimp.MIME_JPEG, function (err, src) {
        var newImg = new Image();
        newImg.src = src;
        document.body.appendChild(newImg);
      })
    })
  },

  partial: function() {
    var imageData = Buffer.from(img.src.replace('data:image/png;base64', ''), 'base64')
    Jimp.read(imageData).then(function (image) {
      var centerX = rect.x + (rect.width / 2)
      var centerY = rect.y + (rect.height / 2)
      var x = centerX - rect.height;
      if (x < 0) { x = 0;  }
      var y = centerY - rect.height;
      if (y < 0) { y = 0; }
      var width = rect.height * 2;
      if (x + width > image.bitmap.width) { width = image.bitmap.width - x }
      var height = rect.height * 2;
      if (y + height > image.bitmap.height) { height = image.bitmap.height - y}

      image.clone()
        .crop(x, y, width, height)
        .cover(224, 224)
        .flip(true, false)
        .getBase64(Jimp.MIME_JPEG, function (err, src) {
          document.getElementById('facepreview').src = src;
        })
    });
  }
   
};