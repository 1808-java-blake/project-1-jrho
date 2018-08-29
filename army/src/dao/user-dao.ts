import { connectionPool } from "../util/connection-util";
import { userConverter } from "../util/user-converter";
import { User } from "../model/user";
import { reimbConverter } from "../util/reimb-converter";




/**
* Retreive all users from the DB along with all their requests
*/
export async function findAll(): Promise<User []>{
    const client = await connectionPool.connect();
    try{
        const resp = await client.query(
            `SELECT * FROM (((ers.ers_users u
                LEFT JOIN ers.ers_user_roles r
                ON u.user_role_id = r.ers_user_role_id) w
                LEFT JOIN ers.ers_reimbursement er
                ON w.ers_users_id = er.reimb_author) x
                LEFT JOIN ers.ers_reimbursement_status ers
                ON x.reimb_status_id = ers.reimb_status_id) y
                LEFT JOIN ers.ers_reimbursement_type ert
                ON y.reimb_type_id = ert.reimb_type_id;`
        )
    }
}