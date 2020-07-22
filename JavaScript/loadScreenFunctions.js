function loadScreenSet(loadTxt) {
    if (document.getElementById("loadDiv") == null) {
      
      loadDiv = document.createElement("div");
      loadDiv.style.backgroundColor = 'rgba(220, 220, 220, 0.7)';
      loadDiv.id = "loadDiv";
  
      var loadGIF = document.createElement("img");
      loadGIF.setAttribute("src", "https://media.giphy.com/media/DtfgzTxPw7pPq/giphy.gif");
      loadGIF.setAttribute('draggable', false);
      loadGIF.id = "loadGif";

      var loadTxtElem = document.createElement("h3");
      loadTxtElem.innerHTML = loadTxt;
      loadTxtElem.id = "loadTxt";
  
      monitorWindow.appendChild(loadDiv);
      loadDiv.appendChild(loadGIF);
      loadDiv.appendChild(loadTxtElem);
    }
  }
  
  function loadScreenReset() {
    loadDiv.remove();
  }
  