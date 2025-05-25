const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
  }
});

const upload = multer({ storage });

// POST /upload route



app.post('/upload', upload.single('resume'), async (req, res) => {



  

  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }




  console.log('File uploaded:', req.file.filename);

  // Read the uploaded PDF file
  const filePath = path.join(__dirname, req.file.path);
  const dataBuffer = fs.readFileSync(filePath);

  try {
    const pdfData = await pdfParse(dataBuffer);
    const extractedText = pdfData.text;

    let prompt = ""

    if(req.body.flag === 'Summary')
    {
      prompt = 'Generate Summary of the attached Resume in less than 250 words'
    }
    if(req.body.flag === 'Rating')
    {
      prompt = 'Attached is the resume of a candidate basis his current designation and his overall experience , skills , role . Give him a rating on a scale of 1 to 5 . '
    }
    if(req.body.flag === 'Questionaire')
    {
      prompt = 'Attached is the resume of a candidate basis deep analysis of the same. Provide a 10 questions to be asked from him in a interview to test his skills'
    }

    res.send({
      message: 'File uploaded and content extracted successfully',
      filename: req.file.filename,
      text: await queryOllama(prompt + extractedText)

    });
  } catch (error) {
    console.error('Error parsing PDF:', error);
    res.status(500).send({ message: 'Failed to parse PDF' });
  }
});


const axios = require('axios');

async function queryOllama(promptText) {
  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: 'llama3.2',
      prompt: promptText,
      stream: false
    });

    console.log('Ollama Response:', response.data.response);
    return response.data.response;
  } catch (error) {
    console.error('Error communicating with Ollama:', error.message);
    throw error;
  }
}



// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
