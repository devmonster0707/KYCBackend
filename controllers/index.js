const multer = require("multer");
const axios = require("axios");
const path = require("path");
const FormData = require("form-data");
const apiToken = "9967e527197ea04e8a1af992ab7303b357ba";
const formId = "b548341a1dab0045d6283f13c34d03842f1f";
// Create Verification and Send it to the server and Get Id

async function createVerification(req, response) {
  let appId,
    passFileId,
    docId,
    picFileId,
    selDocId,
    verifId,
    callbackUrl,
    formData,
    res;

  const { firstName, lastName } = req.body;
  const passport = req.files["passport"][0]; // Passport file (Buffer)
  const selfie = req.files["selfie"][0]; // Selfie file (Buffer)

  if (!firstName || !lastName || !passport || !selfie) {
    console.log(" message: ", "Username, passport, and selfie are required");
  }

  // Prepare form data to send to KYC AMLBot API
  //   const formData = new FormData();
  //   formData.append("username", firstName);
  //   formData.append("passport", passport.buffer, passport.originalname);
  //   formData.append("selfie", selfie.buffer, selfie.originalname);
  // }

  //Create Applicant
  try {
    res = await axios.post(
      "https://kyc-api.amlbot.com/applicants",
      {
        type: "PERSON",
        first_name: firstName,
        last_name: lastName,
        // dob: "1995-04-10",
        // residence_country: "GE",
        // nationality: "RU",
        // gender: "M",
        // email: "devmonster0707@gmail.com",
      },
      {
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    appId = res.data.applicant_id;
    console.log("applicant Id success", appId);
    //Upload Passport
    formData = new FormData();
    formData.append("file", passport.buffer, passport.originalname);
    res = await axios.post("https://kyc-api.amlbot.com/files", formData, {
      headers: {
        Authorization: `Token ${apiToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("uploading success,fileId:", res.data.file_id);
    passFileId = res.data.file_id;
    //Create Passport Document
    res = await axios.post(
      "https://kyc-api.amlbot.com/documents",
      {
        applicant_id: appId,
        type: "PASSPORT",
        // document_number: "17AB20435",
        // issue_date: "2018-03-19",
        // expiry_date: "2028-03-19",
        // issuing_authority: "AUSTRALIA",
        front_side_id: passFileId,
        // back_side_id: passFileId,
      },
      {
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    docId = res.data.document_id;
    console.log("Document success", docId);
    //Upload Selfie picture
    formData = new FormData();
    formData.append("file", selfie.buffer, selfie.originalname);
    res = await axios.post("https://kyc-api.amlbot.com/files", formData, {
      headers: {
        Authorization: `Token ${apiToken}`,
        ...formData.getHeaders(),
      },
    });
    picFileId = res.data.file_id;
    console.log("SelFish Id", picFileId);
    //Create Selfie Document
    res = await axios.post(
      "https://kyc-api.amlbot.com/documents",
      {
        applicant_id: appId,
        type: "SELFIE_IMAGE",
        front_side_id: picFileId,
      },
      {
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    //Create Verification
    selDocId = res.data.document_id;
    console.log("Selfish Document Success", selDocId);
    types = ["DOCUMENT", "FACIAL"];
    res = await axios.post(
      "https://kyc-api.amlbot.com/verifications",
      {
        applicant_id: appId,
        types: types,
        form_id: formId,
        // callback_url:
        //   "https://kycharrytest.onrender.com/kyc-result",
      },
      {
        headers: {
          Authorization: `Token ${apiToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    verifId = res.data.verification_id;
    console.log("Verification Id=", verifId);
    response.json({ verification_id: verifId });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    response.json(error.response ? error.response.data : error.message);
  }
}

// //Get Verification Result from verification Id
async function getVerification(req, response) {
  try {
    console.log(req.params.verifId);
    let res = await axios.get(
      `https://kyc-api.amlbot.com/verifications/${req.params.verifId}`,
      {
        headers: {
          Authorization: `Token ${apiToken}`,
        },
      }
    );
    response.json(res.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
    response.json(error.response ? error.response.data : error.message);
  }
}
module.exports = { getVerification, createVerification };
