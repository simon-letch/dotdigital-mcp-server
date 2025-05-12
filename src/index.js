import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const DOTDIGITAL_REGION = process.env.DOTDIGITAL_REGION;
if (!DOTDIGITAL_REGION) {
  console.error("Error: DOTDIGITAL_REGION environment variable is required");
  process.exit(1);
}

const DOTDIGITAL_API_USERNAME = process.env.DOTDIGITAL_API_USERNAME;
if (!DOTDIGITAL_API_USERNAME) {
  console.error("Error: DOTDIGITAL_API_USERNAME environment variable is required");
  process.exit(1);
}

const DOTDIGITAL_API_PASSWORD = process.env.DOTDIGITAL_API_PASSWORD;
if (!DOTDIGITAL_API_PASSWORD) {
  console.error("Error: DOTDIGITAL_API_PASSWORD environment variable is required");
  process.exit(1);
}

const server = new McpServer({
  name: "Dotdigital API MCP Server",
  version: "1.0.0"
});

server.tool(
    "send-transactional-email",
    "Sends a transactional email via Dotdigital API.",
    {
      toAddresses: z.array(z.string()),
      subject: z.string(),
      content: z.string()
    },
    async ({ toAddresses, subject, content }) => {
      const apiUrl = `https://${DOTDIGITAL_REGION}-api.dotdigital.com/v2/email`;
      const username = DOTDIGITAL_API_USERNAME;
      const password = DOTDIGITAL_API_PASSWORD;

      const headers = new Headers();
      headers.append("Authorization", "Basic " + btoa(username + ":" + password));
      headers.append("Content-Type", "application/json");

      const body = JSON.stringify({
        toAddresses: toAddresses,
        subject: subject,
        plainTextContent: content,
      });

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: headers,
          body: body,
        });

        return {
          content: [{
            type: "text",
            text: await response.text()
          }]
        };
      } catch (error) {
        console.error("Error sending email:", error);
        return {
          content: [{
            type: "text",
            text: `Error sending email: \${error instanceof Error ? error.message : String(error)}`
          }]
        };
      }
    }
  );

const transport = new StdioServerTransport();
await server.connect(transport);