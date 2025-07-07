import fs from "fs/promises";
import url from "url";
import path from "path";

// Get current path
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function handler(req, res) {
    try {
        if (req.method === "GET") {
            let filepath;
            if (req.url === "/") {
                filepath = path.join(__dirname, 'templates', 'index.html');
            } else if (req.url === "/about") {
                filepath = path.join(__dirname, 'templates', 'about.html');
            } else if (req.url === "/contact-me") {
                filepath = path.join(__dirname, 'templates', 'contact-me.html');
            } else {
                filepath = path.join(__dirname, 'templates', '404.html');
            }

            const data = await fs.readFile(filepath);
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(data);
        } else {
            res.writeHead(405, {
                'Content-Type': 'text/plain'
            });
            res.end("Method not allowed!");
        }

    } catch (error) {
        res.writeHead(500, {
            'Content-Type': 'text/plain'
        });
        res.end('Server Error');
    }
}
