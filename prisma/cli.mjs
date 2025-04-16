import { config } from "dotenv";
import { exec } from "child_process";
import { promisify } from "util";
config({ path: ".env.local" });

const execPromise = promisify(exec);

(async function runPrismaCommand() {
  const command = process.argv.slice(2).join(" ");
  try {
    const { stdout, stderr } = await execPromise(`npx prisma ${command}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log(`stdout: ${stdout}`);
  } catch (error) {
    console.error(`Error executing command: ${error.message}`);
  }
})();

