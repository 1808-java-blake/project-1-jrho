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
