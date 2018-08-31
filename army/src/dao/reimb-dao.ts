import { connectionPool } from "../util/connection-util";
import { Reimb } from "../model/reimb";
import { reimbConverter } from "../util/reimb-converter";
import {SqlReimb} from "../dto/sql-reimb";
import * as userDao from "../dao/user-dao";

export async function findAll(): Promise<Reimb[]>{
    const client = await connectionPool.connect();
    try{
        const resp = await client.query(
            `SELECT * FROM army.army_reimbursement`
        )
        return resp.rows.map(reimbConverter);
    }
    finally{
        client.release();
    }



}