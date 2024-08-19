const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const connectMongo = require('./db');
const { Routes } = require('react-router-dom');
const Assessment = require('./models/Assessment')
connectMongo()
const authRoutes = require('./Routes/authRoutes');
const noticesRouter = require('./Routes/Notice');
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With,Content-Type,Accept"
);
app.use(bodyParser.json());
next();
})


app.get('/',(req,resp)=>{
    resp.send('hello world')
}) 
// cross orgin resource sharing
app.use(cors());
app.use(express.json());
app.use('/api',require('./Routes/Createuser'));
app.use('/api',require('./Routes/CreateAssessment'));
app.use('/api',require('./Routes/Savescore'));
app.use('/api',require('./Routes/Leaderb'));
// API endpoint to fetch assessments
app.get('/api/fetchexam', async (req, res) => {
  try {
      const assessments = await Assessment.find();
      console.log("Assessments:", assessments); // Log assessments
      res.json(assessments);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

// Use the authRoutes for authentication-related routes
app.use('/api', authRoutes);

// RoutesNotice 
app.use('/api', noticesRouter); 


app.listen(5000);