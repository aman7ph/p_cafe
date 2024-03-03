import mongoose from "mongoose"

const DbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log("DB connected succesfuly")
  } catch (error) {
    console.log(`error: ${error}`)
    process.exit(1)
  }
}

export default DbConnection
