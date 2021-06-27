// import moment from 'moment';

export const isEmpty = (obj) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

export const UIAlert = (type, response) => {
    alert(JSON.stringify(response))
}

export const formatPostcode =(postcode) =>{
    if(postcode!==undefined){
        if(postcode.length>4)
        {
            var temp = postcode.substring(0, postcode.length - 3);
            var frmtpostcode = temp +" "+ postcode.substring(temp.length,postcode.length);
            return frmtpostcode;
        }else{
            return postcode;
        }
    }
   
}

// export const getHrsLeft = (treatmentDateTime)=>{

//     var currentDate = moment();
//     var treatmentDate = moment(treatmentDateTime,"YYYY/MM/DD HH:mm");
//     var ms = moment(treatmentDate).diff(currentDate,"hours");
//     console.log("currentDate:-",currentDate);
//     console.log("treatmentDateTime:-",treatmentDate);
//     console.log("ms:-",ms);
//    // console.log("difference:-",diffhrs);
//     return ms;
// }
