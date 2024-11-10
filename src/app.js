import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config();

import { getIrys } from "./irys.js"

const app = express()
app.use(express.json())
app.use(cors())

app.post("/store", async (req, res) => {
    if (!req.body.data || !req.body.tags) {
        res.status(400).json({ message: "Data and tags misssing", success: false })
        return
    }

    const irys = await getIrys();
    const { data, tags } = req.body
    let receipt;
    try {

        receipt = await irys.upload(data, { tags });
    } catch (e) {
        console.log("Error uploading data ", e);
        res.status(500).json({ message: "Failed to upload", success: false })
        return
    }

    const cid = receipt?.id;
    res.status(200).json({ message: "Uploaded successfully", success: true, content: { cid } })
    return


})

app.get("/retrive", async (req, res) => {
    if (!req.query.cid) {
        res.status(400).json({ message: "CID is missing", success: false })
        return
    }

    try {
        const url = `https://gateway.irys.xyz/${req.query.cid}`
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Failed to retrieve data for ID: ${id}`);
        }

        const data = await response.json();
        res.status(200).json({
            cipherText: data.cipherText,
            dataToEncryptHash: data.dataToEncryptHash,
            accessControlConditions: data.accessControlConditions
        })

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "Not found", succss: false })
    }
})

app.listen(3002, () => {
    console.log("Serverrunning on port 3002")
})