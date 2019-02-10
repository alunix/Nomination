import { DBError } from 'Errors';
import { DbConnection } from './dataSource';
import { formatQueryToBulkInsert, formatDataToBulkInsert} from './sqlHelper';


const ACTIVE_ELECTION_SELECT_QUERY = `SELECT ID AS activeElection_id, NAME AS activeElection_name, MODULE_ID as activeElection_module_id FROM ELECTION WHERE ID = :id`;
const ACTIVE_ELECTION_INSERT_QUERY = `INSERT INTO ELECTION (ID, NAME, CREATED_BY, CREATED_AT, UPDATED_AT, MODULE_ID) 
							                        VALUES (:id, :name,:created_by, :created_at, :updated_at, :module_id)`;

const fetchActiveElectionById = (activeElectionId) => {
  const params = { id: activeElectionId };
  return DbConnection()
    .query(ACTIVE_ELECTION_SELECT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.SELECT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 *
 * @param id : Bigint
 * @param name : String
 * @returns {Promise.<T>}
 */
const createActiveElection = (id, name) => {
  const params = { id: id, name : name, mudule_id: module_id};
  return DbConnection()
    .query(ACTIVE_ELECTION_INSERT_QUERY,
      {
        replacements: params,
        type: DbConnection().QueryTypes.INSERT,
      }).catch((error) => {
      throw new DBError(error);
    });
};

/**
 * Same can be used to insert single and multiple activeElection too,
 * we should pass list of activeElections(activeElection) to insert multiple activeElections
 * @param activeElections :Array of activeElections
 * @returns {Promise.<T>}
 */


const insertActiveElections = (activeElections) => {
  const params = activeElections;
  console.log("params",params);
	return DbConnection()
		.query(ACTIVE_ELECTION_INSERT_QUERY,
			{
				replacements: params,
				type: DbConnection().QueryTypes.INSERT,
			}).then((results) => {
				return params;
			}).catch((error) => {
				throw new DBError(error);
			});
};


export default {
  fetchActiveElectionById,
  createActiveElection,
  insertActiveElections,
}