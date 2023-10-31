export let currentdate = new Date()
export let datetime = currentdate.getDate() + "_" + (currentdate.getMonth() + 1)
     + "_" + currentdate.getFullYear().toString().substr(-2) + "_" +
     + currentdate.getHours() + ":"
     + currentdate.getMinutes() + ":"
     + currentdate.getSeconds()

/*  let string = "25.5.2022 - 24.6.2022 24:00"
 string = string.split(" ")[0].concat(" ", string.split(" ")[1])
 string 
 console.log(string);
 
 let string2 = "Streda 25.5.2022"
 string2 = string2.split(" ")[1].concat(" ", "-")
 console.log(string2); */



class Utils {

     //Aktuálny dátum vo formáte dd-mm-yy
     async formatDateDDMMYY(date) {
          let day = date.getDate().toString().padStart(2, '0');
          let month = (date.getMonth() + 1).toString().padStart(2, '0');
          let year = date.getFullYear().toString().substr(-2);
          return `${day}-${month}-${year}`;
     }


     async removeZeroFromStart(item) {
          if (await item.charAt(0) == "0") {
               item = item.substring(1)
          }
          return item
     }

     async date(dateFromTrattovy, validityTime) {
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          let trainTimeDeparture = dateFromTrattovy

          console.log('' + months[parseInt(trainTimeDeparture.split(".")[1]) - 1] + ' ' + trainTimeDeparture.split(".")[0] + ', ' + trainTimeDeparture.split(".")[2] + '');

          let dateFrom = new Date('' + months[parseInt(trainTimeDeparture.split(".")[1]) - 1] + ' ' + trainTimeDeparture.split(".")[0] + ', ' + trainTimeDeparture.split(".")[2] + '');
          let dateTo = new Date('' + months[parseInt(trainTimeDeparture.split(".")[1]) - 1] + ' ' + trainTimeDeparture.split(".")[0] + ', ' + trainTimeDeparture.split(".")[2] + '');

          //let trainTimeValidityTo = dateTo.setDate(dateTo.getDate() + 7)
          let trainTimeValidityTo = dateTo.getDate(dateTo.setDate(dateTo.getDate() + validityTime)) + "." + (dateTo.getUTCMonth() + 1) + "." + dateTo.getFullYear()
          let trainTimeDepartureDateType = dateFrom.getDate() + "." + (dateFrom.getUTCMonth() + 1) + "." + dateFrom.getFullYear()

          let validityDays = trainTimeDepartureDateType + " - " + trainTimeValidityTo
          console.log(validityDays);;
          return validityDays
     }

     async convertVehicleNumber(inputString) {
          const formattedString = inputString.replace(/\D/g, ''); // Odstráni všetky nečíselné znaky

          // Rozdelenie stringu do formátu 61 56 88-70 017-3
          const firstPart = formattedString.slice(0, 2);
          const secondPart = formattedString.slice(2, 4);
          const thirdPart = formattedString.slice(4, 6);
          const fourthPart = formattedString.slice(6, 8);
          const fifthPart = formattedString.slice(8, 11);
          const sixthPart = formattedString.slice(11, 12);
          const finalString = `${firstPart} ${secondPart} ${thirdPart}-${fourthPart} ${fifthPart}-${sixthPart}`;

          console.log(finalString);
          return finalString;
     }

     async convertHKVVehicleNumber(inputString) {
          const formattedString = inputString.replace(/\D/g, ''); // Odstráni všetky nečíselné znaky

          // Rozdelenie stringu do formátu 61 56 88-70 017-3
          const firstPart = formattedString.slice(0, 2);
          const secondPart = formattedString.slice(2, 4);
          const thirdPart = formattedString.slice(4, 5);
          const fourthPart = formattedString.slice(5, 8);
          const fifthPart = formattedString.slice(8, 11);
          const sixthPart = formattedString.slice(11, 12);
          const finalString = `${firstPart} ${secondPart} ${thirdPart}-${fourthPart} ${fifthPart}-${sixthPart}`;

          console.log(finalString);
          return finalString;
     }

     async revertStringBySpace(inputString) {
          const convertedString = inputString.split(' ')[1] + " " + inputString.split(' ')[0]
          return convertedString
     }
}

export default new Utils()