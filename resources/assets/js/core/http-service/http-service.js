// const axios = require('axios');
// const qs = require('qs');

// // $(function () {

// //   function sendToServer(method, api, body, header, onSuccess, onError) {
// //     var bd = body || {};
// //     api = environment.endpoint + api;
// //     var head = header || {
// //       'Content-Type': 'application/json',
// //       'version': ""
// //     };
// //     var options = {
// //       method: method,
// //       headers: head,
// //       data: {
// //         bd
// //       },
// //       api,
// //     };
// //     axios(options);

// //   }
// // });
// export const http = {
//   sendToServer: function (method, api, body, header, onSuccess, onError) {
//     var bd = body || {};
//     var params;
//     api = 'http://127.0.0.1:3333' + api;
//     var head = header || {
//       'Content-Type': 'application/json',
//       'Version': "",
//       'language': 'vn'

//     };
//     if (!method)
//       return;
//     switch (method.toLowerCase()) {
//       case "get":
//         var _body = JSON.parse(JSON.stringify(bd));
//         _body.tz = (-1) * new Date().getTimezoneOffset();
//         _body.random = new Date().getTime();
//         Object.keys(_body).forEach(element => {
//           if (_body[element] === "") {
//             delete _body[element];
//           }
//         });
//         params = _body

//         break;
//     }
//     axios({
//         method: method,
//         url: api,
//         // responseType: 'application/json',
//         headers: head,
//         params: params
//       })
//       .then(function (response) {
//         if (response && !response.errorCode) {
//           if (typeof onSuccess === "function") {
//             onSuccess(response);
//           }
//         }
//         // onSuccess(response.data);

//       })
//       .catch((err) => {
//         console.log("AXIOS ERROR: ", err);
//       });
//     // .catch(function (error) {
//     //   if (error.response) {
//     //     // The request was made and the server responded with a status code
//     //     // that falls out of the range of 2xx
//     //     // console.log(error.response.data);
//     //     // console.log(error.response.status);
//     //     // console.log(error.response.headers);
//     //   }
//     // });

//   },
//   handleSuccess: function (res) {
//     var re = res.json();
//     if (re.errorCode) {
//       if (re.errorCode == 403) {

//         return null;
//       }
//       if (re.errorCode == 2002) {
//         return null;
//       }

//     }
//     return re.data;
//   }
// }
