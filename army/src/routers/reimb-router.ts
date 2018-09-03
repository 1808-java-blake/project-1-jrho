import {Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';


export const reimbRouter = express.Router();
// find all 

reimbRouter.get('', async (req: Request, resp: Response) => {
    try {
        console.log('retrieving all reimbursement');
        let reimb = await reimbDao.findAll();
        resp.json(reimb);
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});

/**
 * Apply Reimbursement
 */

reimbRouter.post('',
    [ async (req, resp) => {
        try {
            const id = await reimbDao.applyReimb(req.body);
            resp.status(201);
            resp.json(id);
        } catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
    }]);


/**
 * Find reimbursement request by status
 */
reimbRouter.get('/status/:status', async (req, resp) => {
    const status = +req.params.status; // convert the id to a number
    console.log(`retrieving requests with status:  ${status}`);
    try {
        let requests = await reimbDao.findStatus(status);
        resp.json(requests);
    } catch (err) {
        resp.sendStatus(500);
    }
});
