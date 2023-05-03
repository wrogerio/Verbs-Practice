import pool from "../database/db";

export const GetMemorize = async (Section) => {
  const query = ` SELECT  Verb, Translate
                  FROM    Verbs
                  WHERE   Section = ${Section}
                  ORDER   BY Verb`;
  try {
    await pool.connect();
    const result = await pool.request().query(query);
    return result.recordset.length > 0 ? result.recordset : [];
  } catch (error) {
    return { error: error.message };
  }
};