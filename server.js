const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();
const db = require('./database');
const articlesRouter = require('./routes/articles');

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/articles', articlesRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Serveur sur http://localhost:${PORT}`));