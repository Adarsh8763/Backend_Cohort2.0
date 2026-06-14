import express from 'express';
import morgan from 'morgan';
import fs from 'fs'
import path from 'path';
import { Server } from 'socket.io';
import http from "http"
import pty from "node-pty"
import os from "os"

const WORKING_DIR = "/workspace" //Jis folder ko access krna h, jisme kaam krna h

const BLOCKED_DIRS = ["node_modules", ".git", "dist"];

function isBlocked(filePath) {
  return BLOCKED_DIRS.some(dir => filePath.includes(dir));
}

function isSafePath(filePath) {
  const resolved = path.resolve(WORKING_DIR, filePath);
  return resolved.startsWith(path.resolve(WORKING_DIR));
}

const app = express()
const httpServer = http.createServer(app)

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"]
  }
})

app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to the sandbox Agent!",
    status: "success"
  })
})


const shell = process.env.SHELL || 'bash';

// Spawn the PTY process
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: "/workspace",
  env: process.env
});

console.log("🔄 PTY spawned, waiting for events...");

// CORRECT error handlers
ptyProcess.on('error', (err) => {
  console.error("❌ PTY ERROR:", err);
});

ptyProcess.onData((data) => {
  io.emit('terminal-output', data);
});


//IMP for debugging node-pty
ptyProcess.onExit(({ exitCode, signal }) => {
  console.log(`PTY process exited with code: ${exitCode}, signal: ${signal}`);
});


io.on("connection", (socket) => {
  console.log("Client connected: " + socket.id);

  socket.on("terminal-input", (data) => {
    try {
      ptyProcess.write(data);
    } catch (err) {
      console.error("Error writing to PTY:", err);
      socket.emit('terminal-error', { message: "PTY process not available" });
    }
  });

  // When the user disconnects, Socket.IO automatically fires the "disconnect" event.
  socket.on("disconnect", () => {
    console.log("Client disconnected: " + socket.id);
  });

  socket.on("error", (err) => {
    console.error("Socket error:", err);
  });
})


/**
 * @route GET /list-files
 * @description Lists all files in the working directory and its subdirectories. Returns a JSON object with the file paths relative to the working directory. exclude directories like node_modules, .git,dist, etc.
 * - eg. {
 *     "files": [
 *         "file1.txt",
 *         "src/file2.txt",
 *         "src/subdir/file3.txt"
 *     ]
 * }
 */

app.get("/list-files", async (req, res) => {

  const listFiles = async (dir, baseDir) => {

    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    const files = []

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      const relativePath = path.relative(baseDir, fullPath)

      //Exclude certain directories
      if (entry.isDirectory() && ["node_modules", ".git", "dist"].includes(entry.name)) {
        continue
      }

      if (entry.isDirectory()) {
        files.push(...await listFiles(fullPath, baseDir))
      }
      else {
        files.push(relativePath)
      }
    }
    return files
  }

  try {
    const files = await listFiles(WORKING_DIR, WORKING_DIR)
    console.log("Files count:", files.length)
    res.status(200).json({
      mssage: "Files listed successfully",
      files
    })
  } catch (err) {
    res.status(500).json({
      message: `Error listening files: ${err.message}`,
      status: 'error'
    })
  }
})


/**
 * @route GET /read-files
 * @description Reads the content of all files requested in the query parameter 'files' and returns their content as a JSON object.
 * - eg. /read-files?files=file1.txt,/src/file2.txt
 */

app.get("/read-files", async (req, res) => {
  const files = req.query.files


  if (!files) {
    return res.status(400).json({
      message: "No files specified in query parameter",
      status: "error"
    })
  }

  console.log("Files requested:", files)
  const fileList = files.split(",")
  console.log("Number of files:", fileList.length)

  const result = await Promise.all(fileList.map(async (file) => {
    if (isBlocked(file) || !isSafePath(file)) {
      return {
        [file]: "Access denied"
      };
    }
    if (isBlocked(file) || !isSafePath(file)) {
      return {
        [file]: "Access denied"
      };
    }
    const filePath = path.join(WORKING_DIR, file)
    try {
      const content = await fs.promises.readFile(filePath, "utf-8")
      return {
        [filePath.replace(WORKING_DIR, "")]: content
      }
    } catch (err) {
      return {
        [filePath.replace(WORKING_DIR, "")]: `Error reading file: ${err.message}`
      }
    }
  }))

  const responseData = {
    message: "File contents",
    files: result
  }

  console.log(
    "Response size:",
    JSON.stringify(responseData).length
  )

  res.status(200).json(responseData)
})

/**
 * @route PATCH /update-files
 * @description Updates the content of files specified in the request body. The request body should contain a property 'updates' with a JSON Array of object, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the new content for the file.
 */

app.patch("/update-files", async (req, res) => {
  const updates = req.body.updates

  if (!updates || !Array.isArray(updates)) {
    return res.status(400).json({
      message: "Invalid request body. Expected a JSON object with an 'updates' property containing an array of file updates.",
      status: "error"
    })
  }

  const results = await Promise.all(updates.map(async (update) => {
    const { file, content } = update
    if (isBlocked(file) || !isSafePath(file)) {
      return {
        [file]: "Access denied"
      };
    }
    const filePath = path.join(WORKING_DIR, file)
    try {
      // await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.writeFile(filePath, content, "utf-8")
      return {
        [filePath]: "File updated successfully"
      }
    } catch (err) {
      return {
        [filePath]: `Error updating file: ${err.message}`
      }
    }
  }))

  res.status(200).json({
    message: "File update results",
    results
  })
})

/**
 * @route POST /create-files
 * @description Creates new files with the content specified in the request body. The request body should contain a property 'files' with a JSON Array of objects, each object should have a 'file' property specifying the file path (relative to the working directory) and a 'content' property specifying the content for the new file.
 */

app.post("/create-files", async (req, res) => {
  const files = req.body.files

  if (!files || !Array.isArray(files)) {
    return res.status(400).json({
      message: "Invalid request body. Expected a JSON object with a 'files' property containing an array of file objects.",
      status: "error"
    })
  }

  const results = await Promise.all(files.map(async (fileObj) => {
    const { file, content } = fileObj
    const filePath = path.join(WORKING_DIR, file)
    try {
      await fs.promises.mkdir(path.dirname(filePath), { recursive: true })
      await fs.promises.writeFile(filePath, content, "utf-8")
      return {
        [filePath]: 'File created successfully'
      }
    } catch (err) {
      return {
        [filePath]: `Error creatign file: ${err.message}`
      }
    }
  }))

  res.status(200).json({
    message: "File creation results",
    results
  })
})

export default httpServer;