import { client } from "..";


/*
 * Should insert into the users table
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function createUser(username: string, password: string, name: string) {
    try{
        // await client.connect();
        const insertQuery = "INSERT INTO users (username, name, password) VALUES ($1, $2, $3)";
        const values = [username, name, password];
        const res = await client.query(insertQuery, values);
        const user = res.rows[0];
        return {
            username: user.username,
            password: user.password,
            name: user.name
        }
    }
    catch(err){
        console.log('Error during insertion, err : ', err);
    }
    finally{
        // await client.end();
    }
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number) {
    try{
        // await client.connect();
        const query = "SELECT * FROM users WHERE userId = $1";
        const res = await client.query(query, [userId]);

        if (res.rows.length > 0){
            console.log('User found: ', res.rows[0]);
            const user = res.rows[0];
            return{
                username: user.username,
                password: user.password,
                name: user.name
            }
        }
        else{
            console.log('No user found with the given userID');
            return null;
        }
    }
    catch(err){
        console.log('Error during fetching, err : ', err);
        throw err;
    }
    finally{
        // await client.end();
    }
    
}
