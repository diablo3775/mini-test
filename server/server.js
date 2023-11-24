const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// A mock function to evaluate answers
// In a real scenario, this would be much more complex
const evaluateAnswers = (answers) => {
    let score = 0;
    // Example: Check if certain keywords are in the answer
    if (answers['1'] && answers['1'].includes('scope')) {
        score += 1;
    }
    if (answers['2'] && answers['2'].includes('performance')) {
        score += 1;
    }
    if (answers['3'] && answers['3'].includes('function')) {
        score += 1;
    }
    return score;
};

app.post('/submit-answers', (req, res) => {
    const answers = req.body;
    const score = evaluateAnswers(answers);
    res.json({ score });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
