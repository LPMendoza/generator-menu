import React, { Component } from 'react';
import FormFood from '../components/FormFood';
import Menu from '../components/Menu';
import WindowHeader from '../components/WindowHeader';
import MenuController from '../controllers/MenuController';
import FoodTable from '../components/FoodTable';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styleSwal } from "../conf/conf";
import Swal from 'sweetalert2';


const { remote } = window.require("electron");
var dialog = remote.require('electron').dialog;


class ManagmentContainer extends Component {
   constructor(props) {
      super(props);
      this.menuCtrl = new MenuController();

      this.state = {
         form: {
            name: "",
            type: "1"
         },
         food: [],
         foodSearched: null,
         menu: {
            lunch: [],
            meal: [],
            refreshment: []
         },
         isEditing: false,
         indexEditing: -1

      }
   }

   componentDidMount = () => {
      this.getFoods();   
   }

   handleOnInput = (e) => {
      this.setState({
         form: {
            ...this.state.form,
            [e.target.name] : e.target.value
         }
      });

   }

   handleSearch = (e) => {
      let foodSearched = this.state.food.filter((el) => el.name.includes(e.target.value));
      this.setState({
         foodSearched
      });
   }

   getFoods = () => {
      this.setState({
         food: this.menuCtrl.getFoods()
      });
   }

   handleOnSubmit = (e) => {
      e.preventDefault();
      let food = this.state.food;
      let message = "Comida agregada!";

      if (this.state.isEditing) {
         food.splice(this.state.indexEditing, 1, this.state.form);
         message = "Comida actualizada!";
      }
      else {
         let foodNames = this.state.form.name;

         foodNames = foodNames.split("\n").filter(food => food != "");

         foodNames.forEach(dish => {
            food.push({
               name: dish,
               type: this.state.form.type
            });
         });
         
      }  

      this.menuCtrl.addFood(this.state.food);
      this.setState({
         food,
         form: {
            name: "",
            type: this.state.form.type
         },
         isEditing: false,
         indexEditing: -1
      });
   }

   handleDelete = (index) => {
      Swal.fire({
         title: "¿Desea eliminar el alimento?",
         icon: "warning",
         showCloseButton: true,
         showCancelButton: true,
         confirmButtonText: "Sí",
         confirmButtonColor: styleSwal.confirmButtonColor,
         cancelButtonText: "No",
         cancelButtonColor: styleSwal.cancelButtonColor,
      })
      .then((result) => {
         if(result.isConfirmed) {

            let food = this.state.food;
            food.splice(index, 1);
            this.menuCtrl.addFood(this.state.food);
            this.setState({
               food
            });
            toast.success("✔ Comida eliminada!", { position: "top-left" });
         }
      });
   }

   handleEdit = (index) => {
     
      this.setState({
         isEditing: true,
         indexEditing: index,
         form: {
            name: this.state.food[index].name,
            type: this.state.food[index].type
         }
      });
   }

   handleCancelEdition = (e) => {
      e.preventDefault();
      this.setState({
         isEditing: false,
         indexEdting: -1,
         form: {
            ...this.state.form,
            name: "",
         }
      });
   }

   handleGenerateMenu = (e) => {
      let lunch = this.generateLunchMenu();
      let meal = this.generateMealMenu();
      let refreshment = this.generateRefreshmentMenu();

      this.setState({
         menu: {
            lunch,
            meal,
            refreshment
         }
      });
      
   }

   generateLunchMenu = () => {
      let foods = this.state.food.filter((food) => { return food.type == 1 });
      let initialLength =foods.length;
      let lunch = [];
      if(foods.length > 0) {
         for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * foods.length );
            lunch.push(foods[random].name);

            if (initialLength >= 5) {
               foods.splice(random, 1);
            }
         }
      }
      return lunch;
   }

   generateMealMenu = () => {
      let foods = this.state.food.filter((food) => { return food.type == 2 });
      let initialLength = foods.length;
      let meal = [];
      if(foods.length > 0) {
         for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * foods.length);

            meal.push(foods[random].name);

            if (initialLength >= 5) {
               foods.splice(random, 1);
            }
         }
      }

      return meal;
   }

   generateRefreshmentMenu = () => {
      let foods = this.state.food.filter((food) => {return food.type == 3});
      let initialLength = foods.length;
      let refreshment = [];
      if(foods.length > 0) {
         for (let i = 0; i < 5; i++) {
            let random = Math.floor(Math.random() * foods.length );
            refreshment.push(foods[random].name);

            if (initialLength >= 5) {
               foods.splice(random, 1);
            }
         }
      }

      return refreshment;
   }

   handleOnChange = (index, type, value) => {
      let menu = this.state.menu;
      menu[type][index] = value;
      this.setState({
         menu
      });
      
   }

   handleExcel = () => {

      var pathExcel = dialog.showSaveDialogSync({
         properties: ['writeFile'],
         filters: [
            { name: 'Excel', extensions: ['xlsx'] },
         ]
      })
      if(pathExcel != undefined) {
         if(this.menuCtrl.createExcel2(this.state.menu, pathExcel) != undefined) {
            toast.success("✔ Menú exportado!", { position: "top-left" });
         }
      }


   }

   handleClear = (e) => {

      Swal.fire({
         title: "¿Desea limpiar el menú?",
         text: "Todo los platillos serán quitados del menú",
         icon: "warning",
         showCloseButton: true,
         showCancelButton: true,
         confirmButtonText: "Sí",
         confirmButtonColor: styleSwal.confirmButtonColor,
         cancelButtonText: "No",
         cancelButtonColor: styleSwal.cancelButtonColor,
      })
      .then((result) => {
         if(result.isConfirmed) {


            this.setState({
               menu: {
                  lunch: [],
                  meal: [],
                  refreshment: []
               }
            });
         }
      });
   }

   render() {
      return(
         <div>
            {/* <NavBar /> */}

            <WindowHeader
               classColor=""
               closeButton={true}
               maximizeButton={true}
               minimizeButton={true}
            />
            <div className="circleVectorLeft"></div>
            <div className="circleVectorRight"></div>
            <div className="contMain">
               <div className="container px-4 py-5">
                  <div className="row justify-content-between">

                     <Menu
                        menu={this.state.menu}
                        handleGenerateMenu={this.handleGenerateMenu}
                        handleOnChange={this.handleOnChange}
                        handleExcel={this.handleExcel}
                        handleClear={this.handleClear}
                     />
                     <div className="col-md-4 col-12 pl-0 pr-0 pr-md-4 pb-4">

                        <FormFood
                           isEditing={this.state.isEditing}
                           form={this.state.form}
                           handleOnSubmit={this.handleOnSubmit}
                           handleOnInput={this.handleOnInput}
                           handleCancelEdition={this.handleCancelEdition}
                        />
                     </div>
                     <FoodTable
                        foods={this.state.foodSearched || this.state.food}
                        handleDelete={this.handleDelete}
                        handleEdit={this.handleEdit}
                        handleSearch={this.handleSearch}
                     />
                  </div>
               </div>
            </div>
            <ToastContainer 
               autoClose={3000}
               newestOnTop={true}
               pauseOnFocusLoss={false}
            />
         </div>
      )
   }
}

export default ManagmentContainer;