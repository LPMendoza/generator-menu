import React, {useState} from 'react';
//import swal from 'sweetalert';
var {remote} = window.require("electron");

const WindowHeader = ({
   classColor, 
   minimizeButton,
   maximizeButton,
   closeButton,
   backButton,
    
}) => {
    
    let [maximize, setMaximize] = useState(true);

    const handleMaximize = (e) => {
        let currentWindow = remote.getCurrentWindow();
        if (maximize) {
            currentWindow.restore()
            setMaximize(false);
        } else {
            currentWindow.maximize();
            setMaximize(true);
        }
        
    }

    const handleMinimize = (e) => {
        let currentWindow = remote.getCurrentWindow();
        currentWindow.minimize();
    }

    const handleClose = (e) => {
      //   swal({
      //       title: "Do you want to exit?",
      //       text: "All you didn't save will lost",
      //       buttons: ["No", "Yes"]
      //   })
      //   .then((accept) => {
      //       if(accept) {
      //           let currentWindow = remote.getCurrentWindow();
      //           currentWindow.close();
      //       }
      //   });
      let currentWindow = remote.getCurrentWindow();
      currentWindow.close();
    }

    let classBackButton = "d-none";
    let classCloseButton = "d-none";
    let classMinimizeButton = "d-none";
    let classMaximizeButton = "d-none";

    if(backButton) {
        classBackButton = "";
    }
    if (minimizeButton) {
        classMinimizeButton = "";
    }
    if (maximizeButton) {
        classMaximizeButton = "";
    }
    if (closeButton) {
        classCloseButton = "";
    }
    const classMaximizeIcon = maximize === true ? "fas fa-compress-alt " : "fas fa-expand-alt ";
    return (
        <div className={"container-window-header border-bottom " + classColor}>
            <div>
                <span className={"window-title " + classColor}>Gestión de menú</span>
            </div>
            <div className="container-window-btn">
                <div className={`window-btn btn-minimize ${classMinimizeButton}`} onClick={handleMinimize} ><span className={"far fa-window-minimize "}></span></div>
                <div className={`window-btn btn-maximize ${classMaximizeButton}`} onClick={handleMaximize} id="btnMaximize"><span className={classMaximizeIcon} ></span></div>
                <div className={`window-btn btn-close ${classCloseButton}`} onClick={handleClose} id="btnClose"> <span className={"fas fa-times "}></span></div>
            </div>
        </div>
    )
}
export default WindowHeader;