AI Agent Workflow Log
🧩 Agents Used

ChatGPT (GPT-5) – for backend architecture, Prisma/SQL schema design, and debugging

GitHub Copilot – for inline code suggestions and boilerplate generation

Cursor Agent – for structured file creation, refactoring, and TypeScript validation

💬 Prompts & Outputs
Example 1 – Schema Generation

Prompt:

“Generate a Prisma schema for tables: Route, ShipCompliance, BankEntry, Pool, PoolMember — matching this SQL design.”

AI Output:
Generated a complete Prisma schema with relationships, types, and default timestamps.

Result:
Schema matched Neon DB tables accurately with minimal manual editing.

Example 2 – Debug Refinement

Prompt:

“Fix ‘password authentication failed’ error for Neon DB in Prisma connection.”

AI Output:
Suggested using sslmode=require and verifying the correct DATABASE_URL.
Correction:
Manually verified Neon credentials and switched to pg library for a direct connection, as Prisma was unnecessary for production.

🧠 Validation / Corrections

Tested connections using a Python psycopg2 script to confirm credentials.

Verified SQL table creation and sample inserts directly in Neon dashboard.

Cross-checked AI-generated repository methods for SQL injection safety and query accuracy.