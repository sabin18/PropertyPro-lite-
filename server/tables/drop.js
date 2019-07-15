
import execute from '../src/connection';

const sqlQueries = {};

const remove = `
DROP TABLE IF EXISTS users,property,flags CASCADE
                                   
`;

sqlQueries.remove = remove;
 execute(remove);

 export default sqlQueries;

