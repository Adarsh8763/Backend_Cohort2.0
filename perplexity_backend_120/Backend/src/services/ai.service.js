import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});

export async function testAi(){
    model.invoke("What is captial of India within 10 words")
    .then((res)=>{
        console.log(res.text)
    })
}