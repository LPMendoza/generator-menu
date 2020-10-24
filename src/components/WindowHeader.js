import React, {useState} from 'react';
import {
    styleSwal
} from '../conf/conf';
import Swal from 'sweetalert2';

var {remote} = window.require("electron");

const WindowHeader = ({
   classColor, 
   minimizeButton,
   maximizeButton,
   closeButton,
   backButton,
    
}) => {
    
    let [maximize, setMaximize] = useState(true);
    let currentWindow = remote.getCurrentWindow();

    const handleMaximize = (e) => {
        currentWindow = remote.getCurrentWindow();
        if (maximize) {
            currentWindow.restore()
            setMaximize(false);
        } else {
            currentWindow.maximize();
            setMaximize(true);
        }
        
    }

    const handleMinimize = (e) => {
        currentWindow = remote.getCurrentWindow();
        currentWindow.minimize();
    }

    const handleClose = (e) => {
      Swal.fire({
              title: "¿Desea salir de la aplicación?",
              body: "Todo lo que no haya guardado se perderá",
              icon: "warning",
              showCloseButton: true,
              showCancelButton: true,
              confirmButtonText: "Sí",
              confirmButtonColor: styleSwal.confirmButtonColor,
              cancelButtonText: "No",
              cancelButtonColor: styleSwal.cancelButtonColor,
          })
          .then((result) => {
              if (result.isConfirmed) {
                currentWindow = remote.getCurrentWindow();
                currentWindow.close();
              }
          });
    }

    currentWindow.on("unmaximize", (e) => {
        setMaximize(false);
    });

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
        <div className={"container-window-header " + classColor}>
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