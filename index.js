const express = require('express');
const cors = require('cors');
const z = require('zod');

const app = express();
app.use(cors());
app.use(express.json());

