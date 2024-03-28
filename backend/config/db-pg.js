import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
  user: "postgres.gfkqtexngchfbpnaccdv",
  host: "aws-0-eu-central-1.pooler.supabase.com",
  database: "postgres",
  password: "qxyuzxRif3N2bAr7",
  port: 5432,
});

const getConnection = async () => {
  try {
    return await pool.connect();
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

export default getConnection;
