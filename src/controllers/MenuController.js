const fs = window.require("fs");
const path = window.require("path");
const excel = window.require("node-excel-export");
var xl = window.require('excel4node');
class MenuController {

   constructor() {
      this.pathDir = path.join(__dirname, "/data");
      this.pathFoods = path.join(__dirname, "/data/foods");
   }

   crearDirectorio () {
      fs.mkdirSync(this.pathDir);
      fs.writeFileSync(this.pathFoods, JSON.stringify([]));
   }
   
   getFoods() {
      
      try {
         let menu = fs.readFileSync(this.pathFoods, "utf-8");
         return JSON.parse(menu);
      }
      catch (error) {
         //this.crearDirectorio();
         return [];
      }

   }

   addFood(foods) {

      fs.writeFile(this.pathFoods, JSON.stringify(foods), (error) => {
         if(error) throw error;

      });
   }

   createExcel(menu, pathExcel) {
      const styleCell = {
         font: {
            color: {
               rgb: '000000'
            },
            name: "Arial Narrow",
            sz: 16,
            bold: false,
            underline: false
         },
         alignment: {
            vertical: "center",
            horizontal: "center"
         }
      };

      const dataSet = [
         {
            "tipo": "Lunes",
            "lunch": menu.lunch[0],
            "refreshment": menu.refreshment[0],
            "meal": menu.meal[0]
         },
         {
            "tipo": "Martes",
            "lunch": menu.lunch[1],
            "refreshment": menu.refreshment[1],
            "meal": menu.meal[1]
         }, 
         {
            "tipo": "Miercoles",
            "lunch": menu.lunch[2],
            "refreshment": menu.refreshment[2],
            "meal": menu.meal[2]
         },
         {
            "tipo": "Jueves",
            "lunch": menu.lunch[3],
            "refreshment": menu.refreshment[3],
            "meal": menu.meal[3]
         },
         {
            "tipo": "Viernes",
            "lunch": menu.lunch[4],
            "refreshment": menu.refreshment[4],
            "meal": menu.meal[4]
         },
      ];
      const styles = {
         headerDark: {
            fill: {
               fgColor: {
                  rgb: 'F2F2F2'
               }
            },
            font: {
               color: {
                  rgb: '000000'
               },
               name: "Bahnschrift Condensed",
               sz: 24,
               bold: true,
               underline: false  
            },
            alignment: {
               vertical: "center",
               horizontal: "center"
            }
         }
      };
      const specification = {
         tipo: { // <- the key should match the actual data key
            displayName: 'DÍA', // <- Here you specify the column header
            headerStyle: styles.headerDark,
            width: 100, // <- width in pixels
            cellStyle: {
               font: {
                  color: {
                     rgb: '000000'
                  },
                  name: "Calibri",
                  sz: 16,
                  bold: false,
                  underline: false
               },
               alignment: {
                  vertical: "center",
                  horizontal: "center"
               },
               height: 200
            },
         },
         lunch: { // <- the key should match the actual data key
            displayName: 'DESAYUNO', // <- Here you specify the column header
            headerStyle: styles.headerDark,
            width: 200,
            height: 200,
            cellStyle: styleCell,
         },
         refreshment: { // <- the key should match the actual data key
            displayName: 'COLACIÓN', // <- Here you specify the column header
            headerStyle: styles.headerDark,
            width: 200, // <- width in pixels
            cellStyle: styleCell,
         },
         meal: { // <- the key should match the actual data key
            displayName: 'COMIDA', // <- Here you specify the column header
            headerStyle: styles.headerDark,
            cellStyle: styleCell,
            width: 200, // <- width in pixels
         }
      }

      let date = new Date();
      

      const report = excel.buildExport(
         [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
               name: `menu-${date.getDate(), date.getMonth() + 1, date.getFullYear()}` , // <- Specify sheet name (optional)
               data: dataSet,// <-- Report data
               specification: specification,
            }
         ]
      );
      fs.writeFileSync(pathExcel, report);
      return true;
   }

   async createExcel2(menu, pathExcel) {
      const styleSheet = {
         'sheetFormat': {
         'defaultColWidth': 23.57,
         'defaultRowHeight': 92.25,
         }
      }
      var wb = new xl.Workbook();
      var ws = wb.addWorksheet("1", styleSheet);

      var styleHead = {
         font: {
            name: "Bahnschrift Condensed",
            color: "#000000",
            bold: true,
            size: 24
         },
         fill: { // §18.8.20 fill (Fill)
            type: "gradient",
            bgColor: "#f2f2f2f2", // HTML style hex value. defaults to black
            fgColor: "#f2f2f2f2" // HTML style hex value. defaults to black
         },
         alignment: { // §18.8.1
            horizontal: "center",
            vertical: "center",
            wrapText: true
         },
         border: { // §18.8.4 border (Border)
            left: {
               style: "medium",
               color: "#000000"
            },
            right: {
               style: "medium",
               color: "#000000"
            },
            top: {
               style: "medium",
               color: "#000000"
            },
            bottom: {
               style: "medium",
               color: "#000000"
            },
            outline: true
         },
         fill: {
            type: "pattern",
            patternType: "darkDown",
            bgColor: "F2F2F2",
            fgColor: "F2F2F2",
         }
      }
      var styleCell = {
         font: {
            name: "Arial Narrow",
            color: "#000000",
            bold: false,
            size: 16,
            vertAlign: 'center'
         },
         alignment: { // §18.8.1
            horizontal: "center",
            vertical: "center",
            wrapText: true
         },
         border: { // §18.8.4 border (Border)
            left: {
               style: "medium",
               color: "#000000"
            },
            right: {
               style: "medium",
               color: "#000000"
            },
            top: {
               style: "medium",
               color: "#000000"
            },
            bottom: {
               style: "medium",
               color: "#000000"
            },
            outline: true
         }
      }

      let sytleDays = {
         alignment: { // §18.8.1
            horizontal: "center",
            vertical: "center",
            wrapText: true
         },
         font: {
            name: "Calibri",
            color: "#000000",
            bold: true,
            size: 18,
         },
         border: { // §18.8.4 border (Border)
            left: {
               style: "medium",
               color: "#000000"
            },
            right: {
               style: "medium",
               color: "#000000"
            },
            top: {
               style: "medium",
               color: "#000000"
            },
            bottom: {
               style: "medium",
               color: "#000000"
            },
            outline: true
         }
      }
      ws.cell(1, 1).string("DÍA").style(styleHead);
      ws.cell(1, 2).string("DESAYUNO").style(styleHead);
      ws.cell(1, 3).string("COLACIÓN").style(styleHead);
      ws.cell(1, 4).string("COMIDA").style(styleHead);

      ws.cell(2, 1).string("LUNES").style(sytleDays);
      ws.cell(3, 1).string("MARTES").style(sytleDays);
      ws.cell(4, 1).string("MIERCOLES").style(sytleDays);
      ws.cell(5, 1).string("JUEVES").style(sytleDays);
      ws.cell(6, 1).string("VIERNES").style(sytleDays);

      menu.lunch.forEach((food, index) => {
         ws.cell(index + 2, 2).string(food).style(styleCell);
      });
      menu.refreshment.forEach((food, index) => {
         ws.cell(index + 2, 3).string(food).style(styleCell);
      });
      menu.meal.forEach((food, index) => {
         ws.cell(index + 2, 4).string(food).style(styleCell);
      });

      let result = await wb.write(pathExcel);
      return result;
   }
}

export default MenuController;