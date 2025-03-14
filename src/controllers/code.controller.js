const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // Unique file names to prevent collisions

module.exports.executeCode = (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ error: "Code and language are required" });
    }

    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir);
    }

    const fileId = uuidv4(); // Unique file ID
    let filePath, command;
    
    try {
        switch (language.toLowerCase()) {
            case "javascript":
                filePath = path.join(tempDir, `${fileId}.js`);
                fs.writeFileSync(filePath, code);
                command = `node ${filePath}`;
                break;
            case "python":
                filePath = path.join(tempDir, `${fileId}.py`);
                fs.writeFileSync(filePath, code);
                command = `python3 ${filePath}`;
                break;
            case "php":
                filePath = path.join(tempDir, `${fileId}.php`);
                fs.writeFileSync(filePath, code);
                command = `php ${filePath}`;
                break;
            case "typescript":
                filePath = path.join(tempDir, `${fileId}.ts`);
                fs.writeFileSync(filePath, code);
                command = `npx ts-node ${filePath}`;
                break;
            case "rust":
                filePath = path.join(tempDir, `${fileId}.rs`);
                fs.writeFileSync(filePath, code);
                command = `rustc ${filePath} -o ${tempDir}/${fileId} && ${tempDir}/${fileId}`;
                break;
            case "ruby":
                filePath = path.join(tempDir, `${fileId}.rb`);
                fs.writeFileSync(filePath, code);
                command = `ruby ${filePath}`;
                break;
            case "c":
                filePath = path.join(tempDir, `${fileId}.c`);
                fs.writeFileSync(filePath, code);
                command = `gcc ${filePath} -o ${tempDir}/${fileId} && ${tempDir}/${fileId}`;
                break;
            default:
                return res.status(400).json({ error: "Unsupported language" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Error writing file: " + err.message });
    }

   // console.log("Executing:", command);

    exec(command, { timeout: 10000 }, (error, stdout, stderr) => {
        fs.rmSync(filePath, { force: true }); // Cleanup file after execution
        if (error) {
            return res.status(500).json({ error: stderr || error.message || "Execution failed" });
        }
        res.json({ output: stdout.trim() });
    });
};
