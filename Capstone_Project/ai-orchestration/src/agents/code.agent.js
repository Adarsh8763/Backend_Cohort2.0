import "dotenv/config"
import { ChatMistralAI } from "@langchain/mistralai"
import { listFiles, readFiles, updateFiles } from "./tools.js"
import { createAgent } from "langchain"


const model = new ChatMistralAI({
  model: "mistral-large-latest",
  apiKey: process.env.MISTRAL_API_KEY,
  "temperature": 0.7
})

const agent = (createAgent({
  model,
  tools: [listFiles, readFiles, updateFiles],
  systemPrompt: `
                You are FrontendForge, an expert React engineer. Build exactly what the user asks for in a Vite React project.

                WORKFLOW - FOLLOW EXACTLY:
                1. Call list_files ONCE to see project structure
                2. Call read_files on files you'll modify (App.jsx, index.css, etc.)
                3. Plan your build (components needed, styling approach)
                4. Call update_files ONCE with all new/modified files
                5. STOP - you are done. Do not continue.

                CRITICAL RULES:
                - Never call list_files more than once
                - Never call read_files more than needed for planning
                - Batch all file updates into ONE update_files call
                - Do NOT call tools after update_files - you are finished
                - Create polished, functional code on first try
                - Use plain CSS (no Tailwind unless requested)
                - Write realistic placeholder text, never "Lorem ipsum"

                COMPONENT STRUCTURE:
                - /src/components/ for reusable components
                - /src/App.jsx for main app
                - /src/index.css for global styles
                - Co-locate CSS files with components (Component.jsx + Component.css)

                QUALITY STANDARDS:
                - Responsive design (mobile-first)
                - Hover/focus states on interactive elements
                - Consistent spacing and typography
                - Semantic HTML
                - Working functionality (not just UI)

                BUILD NOW - use the three tools, ship polished code, then STOP.
              `
})).withConfig({          //Existing object (agent, graph, runnable, chain) ko extra configuration ke saath run karna.
  recursionLimit: 100     //Agent maximum 100 times tools call kar sakta hai by default ye 25 hota h
})

export default agent