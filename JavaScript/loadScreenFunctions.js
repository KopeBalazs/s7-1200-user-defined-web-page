function loadScreenSet() {
    if (document.getElementById("loadDiv") == null) {
      
      loadDiv = document.createElement("div");
      loadDiv.style.backgroundColor = 'rgba(220, 220, 220, 0.5)';
      loadDiv.id = "loadDiv";
  
      loadGIF = document.createElement("img");
      loadGIF.setAttribute("src", "https://media.giphy.com/media/DtfgzTxPw7pPq/giphy.gif");
      loadGIF.setAttribute('draggable', false);
      loadGIF.id = "loadGif";
  
      monitorWindow.appendChild(loadDiv);
      loadDiv.appendChild(loadGIF);
    }
  }
  
  function loadScreenReset() {
    loadGIF.remove();
    loadDiv.remove();
  }
  