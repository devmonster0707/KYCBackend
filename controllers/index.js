const multer = require("multer");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const apiToken = "9967e527197ea04e8a1af992ab7303b357ba";
const formId = "b548341a1dab0045d6283f13c34d03842f1f";
// Create Verification and Send it to the server and Get Id
async function createVerification(req, res) {
  let appId,
    passFileId,
    docId,
    picFileId,
    selDocId,
    verifId,
    callbackUrl,
    formData;

  //   try {
  // const { firstName, lastName } = req.body;
  // console.log(firstName, lastName);
  console.log(req.body);
  res.json({ data: "ok" });
}
// const passport = req.files.passport[0];
// const selfie = req.files.selfie[0];
//Create Applicant
//     res = await axios.post(
//       "https://kyc-api.amlbot.com/applicants",
//       {
//         type: "PERSON",
//         first_name: firstName,
//         last_name: lastName,
//         // dob: "1995-04-10",
//         // residence_country: "GE",
//         // nationality: "RU",
//         // gender: "M",
//         // email: "devmonster0707@gmail.com",
//       },
//       {
//         headers: {
//           Authorization: `Token ${apiToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     appId = res.data.applicant_id;
//     console.log("applicant Id success", appId);
//     //Upload Passport
//     formData = new FormData();
//     formData.append("file", fs.createReadStream(passport));
//     res = await axios.post("https://kyc-api.amlbot.com/files", formData, {
//       headers: {
//         Authorization: `Token ${apiToken}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });
//     console.log("uploading success,fileId:", res.data.file_id);
//     passFileId = res.data.file_id;
//     //Create Passport Document
//     axios.post(
//       "https://kyc-api.amlbot.com/documents",
//       {
//         applicant_id: appId,
//         type: "PASSPORT",
//         // document_number: "17AB20435",
//         // issue_date: "2018-03-19",
//         // expiry_date: "2028-03-19",
//         // issuing_authority: "AUSTRALIA",
//         front_side_id: passFileId,
//         // back_side_id: passFileId,
//       },
//       {
//         headers: {
//           Authorization: `Token ${apiToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     docId = response.data.document_id;
//     console.log("Document success", docId);
//     //Upload Selfie picture
//     formData = new FormData();
//     formData.append("file", fs.createReadStream(selfie));
//     axios.post("https://kyc-api.amlbot.com/files", formData, {
//       headers: {
//         Authorization: `Token ${apiToken}`,
//         ...formData.getHeaders(),
//       },
//     });
//     picFileId = res.data.file_id;
//     console.log("SelFish Id", picFileId);
//     //Create Selfie Document
//     axios.post(
//       "https://kyc-api.amlbot.com/documents",
//       {
//         applicant_id: appId,
//         type: "SELFIE_IMAGE",
//         front_side_id: picFileId,
//       },
//       {
//         headers: {
//           Authorization: `Token ${apiToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     //Create Verification
//     selDocId = res.data.document_id;
//     console.log("Selfish Document Success", selDocId);
//     types = ["DOCUMENT", "FACIAL"];
//     axios.post(
//       "https://kyc-api.amlbot.com/verifications",
//       {
//         applicant_id: appId,
//         types: types,
//         form_id: formId,
//         // callback_url:
//         //   "https://kycharrytest.onrender.com/kyc-result",
//       },
//       {
//         headers: {
//           Authorization: `Token ${apiToken}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     verifId = res.data.verification_id;
//     console.log("Verification Id=", verifId);
//   } catch (error) {
//     console.error(
//       "Error:",
//       error.response ? error.response.data : error.message
//     );
//     res.json(error.response ? error.response.data : error.message);
//   }
// }
// //Get Verification Result from verification Id
async function getVerification(req, res) {
  try {
    let res = await axios.get(
      `https://kyc-api.amlbot.com/verifications/${req.verifId}`,
      {
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      }
    );
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    res.json(error.response ? error.response.data : error.message);
  }
}
module.exports = { getVerification, createVerification };
