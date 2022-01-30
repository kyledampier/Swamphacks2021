const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.callback = functions.https.onRequest((request, response) => {
    const assembly = axios.create({
        baseURL: "https://api.assemblyai.com/v2",
        headers: {
            authorization: "",
            "content-type": "application/json",
        },
    });

    assembly
    .get("/transcript/" + request.body.transcript_id)
    .then((res) => {
        functions.logger.info("Response Data", res.data);
        if (res.data.status === "success") {
            admin.firestore().collection("links").where("transcript_id", "==", request.body.transcript_id).get().then((snapshots) => {
                if (snapshots.empty) {
                    functions.logger.info("No matching documents.");
                } else {
                    snapshots.forEach((doc) => {
                        functions.logger.info("Document data:", doc.data());
                        admin.firestore().collection("links").doc(doc.id).update({
                            updated: admin.firestore.FieldValue.serverTimestamp(),
                            status: "Success",
                            data: res.data,
                        });
                    });
                }
            });
        } else {
            functions.logger.info("Error", res.data.error);
        }

    })
    .catch((err) => console.error(err));
});


