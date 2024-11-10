const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const { ocrSpace } = require('ocr-space-api-wrapper');
const axios = require('axios');
dotenv.config();

const upload = multer({ dest: path.join(__dirname, '../uploads') });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        // Check if a file is uploaded
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        // OCR processing
        const result = await ocrSpace(req.file.path, {
            apiKey: process.env.OCR_SPACE_API_KEY,
            filetype: 'pdf',
        });

        if (result.isError) {
            return res
                .status(500)
                .send('An error occurred while processing the file');
        }

        const extractedText = result.ParsedResults[0].ParsedText;

        // Delete the uploaded file after processing
        fs.unlinkSync(req.file.path);

        // Call ChatGPT API to summarize the extracted text
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a helpful assistant that summarizes resumes.',
                    },
                    {
                        role: 'user',
                        content: `Please summarize the following resume text:\n\n${extractedText}`,
                    },
                ],
                max_tokens: 500,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                },
            }
        );

        // Extract and send the summarized text as a response
        const summary = openaiResponse.data.choices[0].message.content;
        res.send(summary);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred while processing the file');
    }
});

module.exports = router;
