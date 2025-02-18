const express = require("express");
const PORT = 3000;
const app = express();

app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/checklist", require("./routes/checklist"));
app.use("/item", require("./routes/checklistitem"));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
