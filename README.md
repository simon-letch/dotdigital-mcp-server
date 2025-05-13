# Dotdigital MCP Server

A Model Context Protocol (MCP) server for interacting with Dotdigital's API

## Features

- Send transactional emails

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dotdigital-mcp-server.git
   cd dotdigital-mcp-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your Dotdigital credentials:
   ```
   DOTDIGITAL_REGION=your-region (e.g., r1)
   DOTDIGITAL_API_USERNAME=your-api-username
   DOTDIGITAL_API_PASSWORD=your-api-password
   ```
   Replace the placeholders with your actual Dotdigital API credentials.

## Usage

Start the MCP server:
```bash
node src/index.js
```

## License

MIT
