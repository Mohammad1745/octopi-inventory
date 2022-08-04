const mongoose = require("mongoose");
//connect with the database
try {
    mongoose.connect("mongodb+srv://mdali2016:IkpTMrUC3AsooNZy@cluster0.myligkm.mongodb.net/?retryWrites=true&w=majority");
} catch (error) {
    throw new Error("Can't connect to the database");
}

mongoose.connection.on("error", (error) => {
    throw new Error("Error connecting to database: " + error);
});