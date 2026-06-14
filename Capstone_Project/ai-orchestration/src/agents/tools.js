import axios from "axios";
import { tool } from "langchain";
import * as z from "zod";

// Configure axios timeout - 10 minutes
const AXIOS_TIMEOUT = 600000; // 10 minutes

export const listFiles = tool(
    async (_, config) => {
        const projectId = config?.configurable?.projectId;
        const writer = config?.configurable?.writer;

        console.log("===============");
        console.log("Using listFiles tool");
        console.log("ProjectId:", projectId);
        console.log("===============");

        if (!projectId) {
            throw new Error("projectId is missing in config.configurable");
        }

        try {
            const url = `http://sandbox-service-${projectId}:3000/list-files`;
            console.log(`📤 Fetching from: ${url}`);
            
            const response = await axios.get(url, {
                timeout: AXIOS_TIMEOUT  //10mins
            });
            console.log("✓ Listed files:", response.data.files.length);
            
            if (writer) {
                writer("Listing files in project directory.... Files " + response.data.files.join(",") + "\n");
            }
            
            return JSON.stringify(response.data.files);
        } catch (err) {
            console.error("❌ listFiles ERROR:", err.message);
            if (writer) {
                writer("❌ Failed to list files: " + err.message + "\n");
            }
            throw err;
        }
    },
    {
        name: "list_files",
        description: "List all the files in the project directory. This is helpful in understanding what files are available to work with.",
        schema: z.object({}),
    }
);

export const readFiles = tool(
    async ({ files = [] }, config) => {
        const projectId = config?.configurable?.projectId;
        const writer = config?.configurable?.writer;

        console.log("===============");
        console.log("Using readFiles tool");
        console.log("ProjectId:", projectId);
        console.log("Files to read:", files);
        console.log("===============");

        if (!projectId) {
            throw new Error("projectId is missing in config.configurable");
        }

        try {
            const url = `http://sandbox-service-${projectId}:3000/read-files?files=${files.join(",")}`;
            console.log(`📤 Fetching from: ${url}`);
            
            const response = await axios.get(url,{
                timeout: AXIOS_TIMEOUT
            });
            console.log("✓ Read files successfully");
            
            if (writer) {
                writer("Reading files...." + files.join(",") + "\n");
            }
            
            return JSON.stringify(response.data);
        } catch (err) {
            console.error("❌ readFiles ERROR:", err.message);
            console.error("Error response:", err.response?.status, err.response?.data);
            
            if (writer) {
                writer("❌ Failed to read files: " + err.message + "\n");
            }
            throw err;
        }
    },
    {
        name: "read_files",
        description: "Read the contents of specified files. This is useful for understanding the content of files that are relevant to the task at hand.",
        schema: z.object({
            files: z.array(z.string()).describe("The list of file paths to read. These should be files that were listed using the list_files tool or created later."),
        }),
    }
);

export const updateFiles = tool(
    async ({ files }, config) => {
        const projectId = config?.configurable?.projectId;
        const writer = config?.configurable?.writer;

        console.log("===============");
        console.log("Using updateFiles tool");
        console.log("ProjectId:", projectId);
        console.log("Files received:", JSON.stringify(files, null, 2));
        console.log("===============");

        if (!projectId) {
            throw new Error("projectId is missing in config.configurable");
        }

        try {
            const url = `http://sandbox-service-${projectId}:3000/update-files`;
            console.log(`📤 Sending PATCH request to: ${url}`);
            
            const response = await axios.patch(url, { updates: files },{
                timeout: AXIOS_TIMEOUT
            });

            console.log("✓ Response status:", response.status);
            console.log("✓ Response data:", response.data);

            if (writer) {
                writer("Updating Files...." + files.map(f => f.file).join(",") + "\n");
            }

            return JSON.stringify(response.data.results);
        } catch (err) {
            console.error("❌ updateFiles ERROR:", err.message);
            console.error("Error response:", err.response?.status, err.response?.data);
            
            if (writer) {
                writer("❌ Failed to update files: " + err.message + "\n");
            }
            
            throw err;
        }
    },
    {
        name: "update_files",
        description: "Update the contents of specified files. This is useful for making changes to files based on the requirements of the task at hand. This tool can also be used to create new files by providing a new file name in the file field and the content to be added in the content field.",
        schema: z.object({
            files: z.array(z.object({
                file: z.string().describe("The absolute path of the file to update or create"),
                content: z.string().describe("The new content for the file"),
            })).describe("The list of files to update and their new contents"),
        }),
    }
);