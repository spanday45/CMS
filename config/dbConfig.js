module.exports= {
    HOST :"localhost",
    USER : "root",
    PASSWORD : "",
    DB :"cms", // change database name
    diaect : "mysql",
   


    pool:{
        max : 5, 
        min:0,
        acquire :30000,
        idle:10000,
    },
};



// module.exports= {
//     HOST :"monorail.proxy.rlwy.net",
//     USER : "root",
//     PASSWORD : "vtcpieJBCKbZQxbCsfVTpSlTFgpJeZjH",
//     DB :"railway", // change database name
//     diaect : "mysql",
   


//     pool:{
//         max : 5, 
//         min:0,
//         acquire :30000,
//         idle:10000,
//     },
// };