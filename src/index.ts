import readline from 'readline';
import { addTask, viewTasks, saveToJson, deleteTasks } from './model/Operations';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


function ask(question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve));
}


async function mainLoop() {
  const items: string[] = [];

  while (true) {
    const input = await ask("> Enter a command (add task, complete task, view, delete, save, exit): ");

    switch (input.trim().toLowerCase()) {
      case "add task":
        await addTask(ask);
        break;
      case "view":
        await markDone(ask);
        break;
      case "view":
        await viewTasks();
        break;
      case "save":
        await saveToJson();
        break;
      case "delete":
        await deleteTasks(ask);
        break;
      case "exit":
        console.log("👋 Exiting. Bye!");
        await rl.close();
        await process.exit(0);
      default:
        console.log("❓ Unknown command. Try again.");
    }
  }
}


mainLoop()