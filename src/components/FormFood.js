import React, { Component, useState } from 'react';

const FormFood = ({form, handleOnSubmit, handleOnInput, handleCancelEdition, isEditing}) => {

   const resizeOnChange = (e) => {
      e.target.style.height = 0;
      e.target.style.height = e.target.scrollHeight + 'px';
   }


   const saveDish = (e) => {
      handleOnSubmit(e);
      document.getElementById("txtName").style.height = "2.4rem";
   }

   return(
      <div className="contCard shadow bg-white p-4 rounded formFood">
         <h3>Nuevo alimento</h3>
         <form className="mt-4">
            <div className="form-group">
               <label htmlFor="txtName">Nombre</label>
               <textarea id="txtName" rows="1" onChange={(e) => {resizeOnChange(e); handleOnInput(e);}} value={form.name} type="text" name="name" id="txtName" className={`form-control custom-input ${form.name == "" ? "invalid" : ""}`} placeholder="Ejem. Platano, Huevo, ...." autoFocus/>
            </div>
            <div className="form-group">
               <label  htmlFor="txtName">Tipo</label>
               <select onChange={handleOnInput} value={form.type} name="type" className="custom-select custom-input">
                  <option value="1" defaultValue>Desayuno</option>
                  <option value="2">Comida</option>
                  <option value="3">Colación</option>
               </select>
            </div>

            <div className="mt-4">
               <button type="submit" onClick={form.name != "" ? saveDish : null} className={`btn btn-primary shadow-sm ${form.name == "" ? "disabled" : ""} ${isEditing ? "" : "btn-block"}`}>Guardar <span className="fas fa-save ml-2"></span></button>
            
               {isEditing ? (<button onClick={handleCancelEdition} className="btn btn-danger mx-2 shadow-sm">Cancelar <span className="fas fa-times ml-2"/></button>) : ""}
            </div>
           
         </form>
      </div>
   )
}

export default FormFood;