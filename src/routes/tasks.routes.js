import {Router} from 'express';
const router = Router();

import { connect } from '../database'
import { ObjectID } from 'mongodb'

router.get('/', async (req, res) => {
    try {
        const db = await connect();
        const result = await db.collection('tasks').find({}).toArray();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error, intente más tarde.'
        });
    };
});

router.post('/', async (req, res) => {
    try {
        const db = await connect();
        const task = { ...req.body };
        const result = await db.collection('tasks').insert(task);
        res.json(result.ops[0]);
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error, intente más tarde.'
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const db = await connect();
        const result = await db.collection('tasks').findOne({_id: ObjectID(id)});
        res.json(result);
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error, intente más tarde.'
        });
    };
});

router.put('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const updateTask = { ...req.body };
        const db = await connect();
        await db.collection('tasks').findOneAndUpdate({_id: ObjectID(id)}, {$set: updateTask});
        res.json({
            message: `La tarea con el id ${id} ha sido actualizada.`
        });
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error, intente más tarde.'
        });
    };
});

router.delete('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const db = await connect();
        const result = await db.collection('tasks').findOneAndDelete({_id: ObjectID(id)});
        const resultValue = result.value;
        res.json({
            message: `Tarea ${id} eliminada.`,
            resultValue
        });
    } catch (error) {
        console.log(error);
        res.json({
            messageError: 'Ocurrió un error, intente más tarde.'
        });
    }
});

export default router;