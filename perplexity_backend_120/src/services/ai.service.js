import { ChatMistralAI } from "@langchain/mistralai";

const model = new ChatMistralAI({
model: "mistral-small-latest",
temperature: 0
});

export async function testAi(){
    model.invoke("write a code for adding n natural numbers in js")
    .then((res)=>{
        console.log(res.text)
    })
}