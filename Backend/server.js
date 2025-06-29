const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const uploadRoutes = require('./routes/uploads');
const analyzeRoutes = require('./routes/analyze');
const githubRoute = require('./routes/githubAnalysis');
const resumeRoute = require('./routes/resumeResults');

require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "*"
}));

mongoose.connect(process.env.MONGO_DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch((err) => console.error("Mongodb refused to connect", err))

app.use('/uploads', express.static('uploads'));
app.use('/api/upload', uploadRoutes);
app.use('/analyze', analyzeRoutes);
app.use('/evaluate', githubRoute);
app.use('/api', resumeRoute);


app.use((req, res, next) => {
  console.log(`Incoming ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
    console.log('Server running on localhost 3000');
})