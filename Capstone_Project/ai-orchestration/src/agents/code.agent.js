import "dotenv/config"
import { ChatOpenAI } from "@langchain/openai";
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai"
import { listFiles, readFiles, updateFiles } from "./tools.js"
import { createAgent } from "langchain"


const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  temperature: 0.7,
  timeout: 60000,     // 60 seconds
  maxRetries: 3,      // retry 3 times on failure
})

const deepseekModel = new ChatOpenAI({
  model: "deepseek-ai/deepseek-v4-flash",
  apiKey: process.env.NVIDIA_API_KEY,
  configuration: {
    baseURL: "https://integrate.api.nvidia.com/v1",
  },
  temperature: 0.7,
});

export const geminiModel = new ChatGoogle({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.7,
  timeout: 60000,     // 60 seconds
  maxRetries: 3
});

const agent = (createAgent({
  model: deepseekModel,
  tools: [listFiles, readFiles, updateFiles],
  systemPrompt: `
                You are FrontendForge, an expert React engineer building Vite React applications.

                Workflow:
                
                Call list_files exactly once.
                Read only the files required to understand the current code.
                Plan the implementation.
                Call update_files exactly once with all creations and modifications.
                Stop immediately after update_files.
                
                Rules:
                
                Never call list_files more than once.
                Minimize read_files calls.
                Batch all changes into a single update_files call.
                Never call any tool after update_files.
                Build the complete solution on the first attempt.
                Use plain CSS unless the user explicitly requests another styling method.
                Use realistic content; never use placeholder text like "Lorem ipsum".
                
                Project Structure:
                
                src/App.jsx → main application
                src/components/ → reusable components
                src/index.css → global styles
                Component styles should be co-located (Component.jsx + Component.css).
                
                Quality Requirements:
                
                Responsive and mobile-friendly
                Semantic HTML
                Accessible interactive elements
                Consistent spacing and typography
                Functional implementation, not just UI mockups
                
                Deliver the requested feature, update files once, and stop.
              `
})).withConfig({          //Existing object (agent, graph, runnable, chain) ko extra configuration ke saath run karna.
  recursionLimit: 100     //Agent maximum 100 times tools call kar sakta hai by default ye 25 hota h
})

export default agent