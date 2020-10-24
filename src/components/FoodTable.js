import React, {useState} from 'react'

const FoodTable = ({ foods, handleEdit, handleDelete, handleSearch}) => {
   
   return(
      <React.Fragment>
         <div className="contCard contFood col-md-8 bg-white shadow rounded p-0 pb-4">
            {/* <div className="m-3 txtSearch">
               <span className="fas fa-search"></span>
               <input onInput={handleSearch} type="text" name="" id="" className="custom-input ml-3" placeholder="Buscar..." />
            </div> */}
            <h3 className="m-4 pl-0">Alimentos</h3>
            <div className="table-responsive pb-0 px-4">
               <table className="table tableFood table-bordered rounded tableMenu mb-0">
                  <thead>
                     <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Editar</th>
                        <th>Eliminar</th>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        foods.map((food, index) => {
                           let type;
                           if (food.type == 1) {
                              type = "Desayuno";
                           }
                           else if (food.type == 2) {
                              type = "Comida";
                           }
                           else {
                              type = "Colación";
                           }
                           return (
                              <tr key={"trFood-" + index}>
                                 <td>{food.name}</td>
                                 <td>{type}</td>
                                 <td><button onClick={(e) => handleEdit(index)} className="btn btn-primary shadow-sm"><span className="fas fa-pen"></span></button></td>
                                 <td><button onClick={(e) => handleDelete(index)} className="btn btn-danger shadow-sm"><span className="fas fa-trash"></span></button></td>
                              </tr>

                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
         
      </React.Fragment>
   )
}

export default FoodTable;