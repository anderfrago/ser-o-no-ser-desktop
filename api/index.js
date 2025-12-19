const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
let { questions } = require('./data'); // Use 'let' because we will reassign it
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const app = express();
const port = 3000;

// In-memory store for game states
const games = {};

app.use(cors());
app.use(express.json());

// Helper function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Helper function to write the questions array back to data.js
async function writeDataFile(updatedQuestions) {
    const dataPath = path.join(__dirname, 'data.js');
    const fileContent = `const questions = ${JSON.stringify(updatedQuestions, null, 2)};\n\nmodule.exports = { questions };`;
    
    try {
        await fs.promises.writeFile(dataPath, fileContent, 'utf8');
        questions = updatedQuestions; // Update the in-memory questions array
        return true;
    } catch (err) {
        console.error('Failed to save data.js:', err);
        return false;
    }
}

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

/**
 * GET /api/questions/full
 * Returns a list of all questions with full details, including answers.
 * Useful for an admin view.
 */
app.get('/api/questions/full', (req, res) => {
    res.json(questions.map(q => {
        // Ensure consistent ID naming if both IdPregunta and idPregunta exist
        const question = { ...q };
        if (question.IdPregunta && !question.idPregunta) {
            question.idPregunta = question.IdPregunta;
            delete question.IdPregunta;
        }
        question.respuestas = question.respuestas.map(r => {
            const answer = { ...r };
            if (answer.IdRespuesta && !answer.idRespuesta) {
                answer.idRespuesta = answer.IdRespuesta;
                delete answer.IdRespuesta;
            }
            return answer;
        });
        return question;
    }));
});

/**
 * GET /api/questions
 * Returns a list of all questions, but without the answer details.
 * Useful for an admin view.
 */
app.get('/api/questions', (req, res) => {
    const questionSummaries = questions.map(q => ({
        idPregunta: q.idPregunta || q.IdPregunta, // Handle both existing ID fields for now, but new ones will be idPregunta
        titulo: q.titulo,
        habilitado: q.Habilitado,
    }));
    res.json(questionSummaries);
});

/**
 * GET /api/questions/:id
 * Returns a single question with its answers shuffled.
 */
app.get('/api/questions/:id', (req, res) => {
    const id = req.params.id; // ID can now be a UUID string
    const question = questions.find(q => (q.idPregunta === id || q.IdPregunta === id));

    if (!question) {
        return res.status(404).send('Question not found');
    }

    // Return a copy of the question with shuffled answers
    const questionCopy = { ...question };
    questionCopy.respuestas = shuffle([...question.respuestas]);
    res.json(questionCopy);
});

/**
 * POST /api/questions
 * Adds a new question to the list.
 */
app.post('/api/questions', async (req, res) => {
    const { titulo, foto, respuestas, Habilitado } = req.body;

    if (!titulo || !respuestas || !Array.isArray(respuestas) || respuestas.length === 0) {
        return res.status(400).send('Invalid question data. Requires a title and at least one answer.');
    }

    const newQuestion = {
        idPregunta: uuidv4(), // Generate UUID for new question
        titulo,
        Habilitado: Habilitado !== undefined ? Habilitado : true,
        foto: foto || 'Sin foto',
        respuestas: respuestas.map(r => ({
            idRespuesta: uuidv4(), // Generate UUID for new answer
            titulo: r.titulo,
            valor: r.valor,
            foto: r.foto || 'Sin foto',
            seleccionada: false
        }))
    };

    const updatedQuestions = [...questions, newQuestion];
    if (await writeDataFile(updatedQuestions)) {
        res.status(201).json(newQuestion);
    } else {
        res.status(500).send('Error saving new question.');
    }
});

/**
 * PUT /api/questions/:id
 * Updates an existing question.
 */
app.put('/api/questions/:id', async (req, res) => {
    const id = req.params.id;
    const { titulo, foto, respuestas, Habilitado } = req.body;

    const questionIndex = questions.findIndex(q => (q.idPregunta === id || q.IdPregunta === id));

    if (questionIndex === -1) {
        return res.status(404).send('Question not found for update.');
    }

    const updatedQuestion = {
        ...questions[questionIndex],
        titulo,
        foto: foto || 'Sin foto',
        Habilitado: Habilitado !== undefined ? Habilitado : true,
        respuestas: respuestas.map(r => {
            // Use existing ID if present, otherwise generate new UUID for answer
            return {
                idRespuesta: r.idRespuesta || uuidv4(), 
                titulo: r.titulo,
                valor: r.valor,
                foto: r.foto || 'Sin foto',
                seleccionada: false
            };
        })
    };

    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex] = updatedQuestion;

    if (await writeDataFile(updatedQuestions)) {
        res.json(updatedQuestion);
    } else {
        res.status(500).send('Error updating question.');
    }
});

/**
 * DELETE /api/questions/:id
 * Deletes a question.
 */
app.delete('/api/questions/:id', async (req, res) => {
    const id = req.params.id;
    const initialLength = questions.length;
    const updatedQuestions = questions.filter(q => !((q.idPregunta === id) || (q.IdPregunta === id)));

    if (updatedQuestions.length === initialLength) {
        return res.status(404).send('Question not found for deletion.');
    }

    if (await writeDataFile(updatedQuestions)) {
        res.status(204).send(); // No Content
    } else {
        res.status(500).send('Error deleting question.');
    }
});

// Refactored endpoint to save all questions (full overwrite) - if needed, this can be removed if CRUD is sufficient
// For now, keeping it as it was in the original plan's spirit
app.post('/api/questions/save-all', async (req, res) => {
    try {
        const questionsToSave = req.body.map(q => {
            const question = { ...q };
            // Ensure question has idPregunta, generate if missing
            if (!question.idPregunta && question.IdPregunta) {
                question.idPregunta = question.IdPregunta;
                delete question.IdPregunta;
            }
            question.idPregunta = question.idPregunta || uuidv4();
            question.respuestas = question.respuestas.map(r => {
                // Ensure answer has idRespuesta, generate if missing
                if (!r.idRespuesta && r.IdRespuesta) {
                    r.idRespuesta = r.IdRespuesta;
                    delete r.IdRespuesta;
                }
                r.idRespuesta = r.idRespuesta || uuidv4();
                return r;
            });
            return question;
        });

        if (await writeDataFile(questionsToSave)) {
            res.json({ message: 'All questions saved successfully.' });
        } else {
            res.status(500).send('Error saving all questions.');
        }
    } catch (error) {
        console.error('Error in /api/questions/save-all:', error);
        res.status(500).send('Error processing request to save all questions.');
    }
});


/**
 * POST /api/game/setup
 * Starts a new game session.
 * Expects body: { teams: [{ name: string, color: string }], mode: 'cielo' | 'infierno' }
 */
app.post('/api/game/setup', (req, res) => {
    const { teams, mode } = req.body;

    if (!teams || teams.length < 2 || teams.length > 4 || !mode) {
        return res.status(400).send('Invalid setup data. Requires 2-4 teams and a game mode.');
    }

    const gameId = uuidv4(); // Use UUID for gameId
    const questionIds = shuffle([...questions.filter(q => q.Habilitado).map(q => q.idPregunta || q.IdPregunta)]); // Only use enabled questions

    if (questionIds.length === 0) {
        return res.status(400).send('No enabled questions available to start a game.');
    }

    const gameQuestions = questionIds; // All enabled questions will be used

    games[gameId] = {
        id: gameId,
        teams: teams.map(t => ({ ...t, puntos: 0, puntosPanel: 0 })),
        mode: mode,
        questionIds: gameQuestions,
        currentQuestionIndex: 0,
        currentTurn: 0, // Index of the team whose turn it is
    };

    console.log(`New game started: ${gameId}`);
    res.status(201).json({ gameId, message: 'Game created successfully.' });
});

/**
 * GET /api/game/:gameId
 * Gets the current state of a game.
 */
app.get('/api/game/:gameId', (req, res) => {
    const { gameId } = req.params;
    const game = games[gameId];

    if (!game) {
        return res.status(404).send('Game not found.');
    }

    if (game.currentQuestionIndex >= game.questionIds.length) {
        return res.json({
            gameover: true,
            teams: game.teams,
            mode: game.mode,
        });
    }

    const currentQuestionId = game.questionIds[game.currentQuestionIndex];
    const question = questions.find(q => (q.idPregunta === currentQuestionId || q.IdPregunta === currentQuestionId));

    if (!question) {
        return res.status(500).send('Current question not found in data.');
    }

    const questionCopy = {
        idPregunta: question.idPregunta || question.IdPregunta,
        titulo: question.titulo,
        foto: question.foto,
        respuestas: shuffle([...question.respuestas])
    };

    res.json({
        gameover: false,
        teams: game.teams,
        mode: game.mode,
        currentTurn: game.currentTurn,
        currentQuestion: questionCopy,
        panelNumber: game.currentQuestionIndex + 1,
        totalPanels: game.questionIds.length - 1 // -1 for tie-breaker
    });
});

/**
 * POST /api/game/:gameId/answer
 * Submits an answer for the current question.
 * Expects body: { answerId: string }
 */
app.post('/api/game/:gameId/answer', (req, res) => {
    const { gameId } = req.params;
    const { answerId } = req.body;
    const game = games[gameId];

    if (!game) {
        return res.status(404).send('Game not found.');
    }

    const currentQuestionId = game.questionIds[game.currentQuestionIndex];
    const question = questions.find(q => (q.idPregunta === currentQuestionId || q.IdPregunta === currentQuestionId));
    
    if (!question) {
        return res.status(500).send('Current question not found in data.');
    }

    const answer = question.respuestas.find(r => (r.idRespuesta === answerId || r.IdRespuesta === answerId));
    
    if (!answer) {
        return res.status(404).send('Answer not found.');
    }
    
    // Mark answer as selected for this game instance (in-memory)
    const answerInQuestion = question.respuestas.find(r => (r.idRespuesta === answerId || r.IdRespuesta === answerId));
    if (answerInQuestion) {
        answerInQuestion.seleccionada = true;
    }


    const team = game.teams[game.currentTurn];
    let wasCorrect = false;

    if (answer.valor === false) { // Correct answer
        wasCorrect = true;
        team.puntosPanel += 10;
        const noCorrectAnswerLeft = question.respuestas.find(r => r.valor === false && r.seleccionada === false);
        if (noCorrectAnswerLeft == null) {
            // This was the last correct answer. The current team wins the panel.
            team.puntos += team.puntosPanel;

            // Reset panel points for all teams
            game.teams.forEach(t => t.puntosPanel = 0);

            // Move to the next question
            game.currentQuestionIndex++;
            game.currentTurn = (game.currentTurn + 1) % game.teams.length;
        }
    } else { // Incorrect answer
        team.puntosPanel = 0;
        if (game.mode === 'infierno') {
            team.puntos = 0;
        }
        // Move to next player
        game.currentTurn = (game.currentTurn + 1) % game.teams.length;
    }

    res.json({
        wasCorrect,
        correctAnswer: !answer.valor, // The client might need to know the actual answer
        nextTurn: game.currentTurn,
        scores: game.teams
    });
});


app.listen(port, () => {
    console.log(`Server listening at http://0.0.0.0:${port}`);
});
