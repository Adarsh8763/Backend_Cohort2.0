import axios from "axios";
import { tool } from "langchain"
import * as z from "zod"

export const listFiles = tool(
    async ({ }) => {
        console.log("===============")
        console.log("Using listFiles tool")
        console.log("===============")

        const response = await axios.get("http://019eb599-80c8-77a6-bf52-0affbfbf33ae.agent.localhost/list-files")
        return JSON.stringify(response.data.files)
    },
    {
        name: "list_files",
        description: "List all the files in the project directory. This is helpful in understanding what files are available to work with.",
        schema: z.object({})
    }
)

export const readFiles = tool(
    async ({ files= [] }) => {   //AI will return the files and hmko pta aise chala ki Ai files hi return krega -> bcoz we have given the format of files and also guided ai by describing the files niche mei.
        //We are passing parameter bcoz here we need to give files that is to be read as I/P 
        console.log("===============")
        console.log("Using readFiles tool")
        console.log("===============")

        const response = await axios.get("http://019eb599-80c8-77a6-bf52-0affbfbf33ae.agent.localhost/read-files?files=" + files.join(","))
        return JSON.stringify(response.data)  //This is returned to Ai agent which will call this tool and using this ai gent will think what to do next. To see retured value use log explicitly
    },
    {
        name: "read_files",
        description: "Read the contents of specified files. This is useful for understanding the content of files that are relevant to the task at hand.",
        schema: z.object({
            files: z.array(z.string()).describe("The list of files absolute paths to read. These should be files that were listed using the list_files tool or created later")
        })
    }
)

export const updateFiles = tool(
    async ({ files }) => {
        console.log("===============")
        console.log("Using updateFiles tool")
        console.log("===============")

        const response = await axios.patch("http://019eb599-80c8-77a6-bf52-0affbfbf33ae.agent.localhost/update-files", {
            updates: files
        })
        return JSON.stringify(response.data.results)
    },
    {
        name: "update_files",
        description: "Update the contents of specified files. This is useful for making changes to files based on the requirements of the task at hand. this tool can also use to create new files by providing a new file name in the file field and the content to be added in the content field.",
        schema: z.object({
            files: z.array(z.object({
                file: z.string().describe("The absolute path of the file to update"),
                content: z.string().describe("The new content for the file, the content should support json format.")
            })).describe("The list of files to update and their new contents")
        })
    }
)