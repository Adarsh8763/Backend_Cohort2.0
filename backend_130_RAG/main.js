import "dotenv/config"
import { PDFParse } from 'pdf-parse';
import fs from "fs"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { MistralAIEmbeddings } from '@langchain/mistralai';
import { Pinecone } from "@pinecone-database/pinecone";

const pc = new Pinecone({ 
    apiKey: process.env.PINECONE_API_KEY 
});
const index = pc.Index("cohort-2-rag")

// let dataBuffer = fs.readFileSync("./story.pdf")

// const parser = new PDFParse({
//     data: dataBuffer
// })

// const data = await parser.getText()

// console.log(result)

// const splitter = new RecursiveCharacterTextSplitter({ 
//     chunkSize: 500, 
//     chunkOverlap: 0 
// })

const embeddings = new MistralAIEmbeddings({
    apiKey: process.env.MISTRAL_API_KEY,
    model: "mistral-embed"
})

// const chunks = await splitter.splitText(data.text)
// console.log(texts)
// console.log(texts.length)

// const docs =  await Promise.all(chunks.map(async (chunk)=>{
//     const embedding = await embeddings.embedQuery(chunk)
//     return  {
//         text: chunk,
//         embedding
//     }
// }))

// console.log(docs)

// const result = await index.upsert({
//     records: docs.map((doc, i) => ({
//         id: `doc-${i}`,
//         values: doc.embedding,
//         metadata: {
//             text: doc.text
//         }
//     }))
// })

// console.log(result)

const queryEmbedding = await embeddings.embedQuery("How was internship?")

const result = await index.query({
    vector: queryEmbedding,
    topK: 2,
    includeMetadata: true
})

console.log(JSON.stringify(result))