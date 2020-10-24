import React from 'react'

class Menu extends React.Component{

   constructor(props) {
      super(props);
   }

   resizeOnChange = (e) => {
      e.target.style.height = 0; e.target.style.height = e.target.scrollHeight + 'px';
   }

   resizeTextareas = () => {
      let textAreas = document.getElementsByClassName("textAreaCells");
      Array.prototype.forEach.call(textAreas, function (e) {
         e.style.height = 0; e.style.height = e.scrollHeight + 'px';
      });
   }

   componentDidUpdate= (e) => {
      this.resizeTextareas();
   }
   render = () => {
      let {menu, handleGenerateMenu, handleOnChange, handleExcel} = this.props;
      return (
         <React.Fragment>
            <div className="contCard contMenu col-md-12 mb-4 px-0 bg-white rounded shadow ">
               <h3 className="my-4 mx-4">Menú</h3>
               <div className="table-responsive px-4 pb-0">
                  <table className="table tableMenu table-bordered">
                     <thead>
                        <tr>
                           <th></th>
                           <th>Lunes</th>
                           <th>Martes</th>
                           <th>Miércoles</th>
                           <th>Jueves</th>
                           <th>Viernes</th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td className="column-type font-weight-bold">Desayuno</td>
                           {
                              menu.lunch.map((food, index) =>
                                 <td key={index}><textarea className="textAreaCells" rows="1" onChange={(e) => { this.resizeOnChange(e); handleOnChange(index, "lunch", e.target.value) }} type="text" value={food} /></td>
                              )
                           }
                        </tr>
                        <tr>
                           <td className="column-type font-weight-bold">Colación</td>
                           {
                              menu.refreshment.map((food, index) =>
                                 <td key={index}><textarea className="textAreaCells" rows="1" onChange={(e) => { this.resizeOnChange(e); handleOnChange(index, "refreshment", e.target.value) }} type="text" value={food} /></td>
                              )
                           }
                        </tr>
                        <tr>
                           <td className="column-type font-weight-bold">Comida</td>
                           {
                              menu.meal.map((food, index) =>
                                 <td key={index}><textarea className="textAreaCells" rows="1" onChange={(e) => { this.resizeOnChange(e); handleOnChange(index, "meal", e.target.value) }} type="text" value={food} /></td>
                              )
                           }
                        </tr>
                     </tbody>
                  </table>
               </div>
               <div className="pl-4 pb-4 pt-2 mt-0">
                  <button onClick={handleGenerateMenu} className="btn btn-secondary shadow-sm">Generar Menú <span className="fas fa-sync-alt ml-2"></span></button>
                  <button onClick={handleExcel} className="btn btn-primary shadow-sm ml-2">Exportar a Excel <span className="fas fa-table ml-2"></span></button>
               </div>

            </div>
         </React.Fragment>
      )
   }
   
}

export default Menu;