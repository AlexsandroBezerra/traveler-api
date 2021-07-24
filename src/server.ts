import express from "express";

const PORT = 3333;
const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Hello, world!" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
