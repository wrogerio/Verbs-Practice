import pool from "../database/db";

export const GetAll = async () => {
  const query = ` SELECT  Id, Section, Verb, Past, Translate
                  FROM    Verbs
                  ORDER   BY Section, Verb`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};

export const GetItem = async (id) => {
  const query = ` SELECT  Id, Section, Verb, Past, Translate
                  FROM    Verbs
                  WHERE   Id = '${id}'`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset[0] : {};
  } catch (error) {
    return { error: error.message };
  }
};

export const SaveItem = async (item) => {
  const query = ` INSERT INTO Verbs (Section, Verb, Past, Translate) 
                  VALUES ('${item.Section}', '${item.Verb}', '${item.Past}', '${item.Translate}')`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const UpdateItem = async (item) => {
  const query = ` UPDATE  Verbs SET
                  Section = '${item.Section}',
                  Verb = '${item.Verb}',
                  Past = '${item.Past}',
                  Translate = '${item.Translate}'
                  WHERE   Id = '${item.Id}'`;
  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}

export const RemoveItem = async (id) => {
  const query = ` DELETE FROM Verbs WHERE Id = '${id}'`;

  try {
    await pool.connect();
    await pool.request().query(query);
    return true;
  } catch (error) {
    return false
  }
}