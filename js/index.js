window.onload = () => {
  // Init
  const canvas = new fabric.Canvas('canvas');
  const bgImg = document.getElementById('cat');
  const bgImgInstance = new fabric.Image(bgImg, {
    left: 0,
    top: 0,
    selectable: false,
  });
  canvas.add(bgImgInstance);

  // Add items to canvas
  const handleItemClick = (e) => {
    console.log(e.target);
    const imgInstance = new fabric.Image(e.target, {
      left: 0,
      top: 0,
      // width: 50,
      // height: 50,
    });
    canvas.add(imgInstance);
  };
  const items = document.getElementsByClassName('item');
  for(i in items) {
    items[i].onclick = handleItemClick;
  }

  // Change BG img
  const uploadElem = document.getElementById('upload');
  uploadElem.onchange = () => {
    if (uploadElem.files && uploadElem.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('cat').src = e.target.result;
      };
      reader.readAsDataURL(uploadElem.files[0]);
    }
  };

  // Export canvas
  const outputElem = document.getElementById('output');
  const outputContainer = document.getElementById('output-block');
  document.getElementById('save-button').onclick = () => {
    console.log('clicked');
    outputElem.src = canvas.toDataURL({
      format: 'png',
    });
    outputContainer.style.display = 'block';
  };
};
