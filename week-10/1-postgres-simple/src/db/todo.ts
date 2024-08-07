import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(userId: number, title: string, description: string) {
    try{
        // await client.connect()
        const insertQuery = "INSERT INTO todos (userId, title, description, done) VALUES ($1, $2, $3, $4)";
        const values = [userId, title, description, false];
        const res = await client.query(insertQuery, values);
        const todo = res.rows[0];
        return {
            title: todo.title,
            description: todo.description,
            done: todo.done,
            id: todo.id
        }
    }
    catch(err){
        console.log('Error during insertion, err : ', err);
        throw err;
    }
    finally{
        // await client.end();
    }
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
    try{
        // await client.connect();
        const updateQuery = "UPDATE todos SET done = true WHERE todoId = $1";
        const value = [todoId];
        const res = await client.query(updateQuery, value);
        const todo = res.rows[0];
        return {
            title: todo.title,
            description: todo.description,
            done: todo.done,
            id: todo.id
        }
    }
    catch(err){
        console.log('Error during updation, err : ', err);
        throw err;
    }
    finally{
        // await client.end();
    }
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
    try{
        // await client.connect();
        const fetchQuery = "SELECT (title, description, done, id) FROM todos WHERE userId = $1";
        const value = [userId];
        const res = await client.query(fetchQuery, value);
        return res.rows;
    }
    catch(err){
        console.log('Error during fetching, err : ', err);
        throw err;
    }
    finally{
        // await client.end();
    }

}