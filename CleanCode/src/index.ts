import promptSync from "prompt-sync";
const prompt = promptSync();

type User = {
  name: string;
  age: number;
  task: string[];
};

class UserManager {
  private users: User[] = [];

  private userExists(username: string): boolean {
    return this.users.some((user) => user.name === username);
  }

  private findUser(username: string): User | undefined {
    return this.users.find((user) => user.name === username);
  }

  addUser(username: string, age: number): void {
    if (this.userExists(username)) {
      console.log("User already exists.");
      return;
    }

    const newUser: User = { name: username, age, task: [] };
    this.users.push(newUser);
    console.log("User added.");
  }

  addTask(username: string, task: string): void {
    const user = this.findUser(username);
    if (!user) {
      console.log("User not exists.");
      return;
    }

    user.task.push(task);
    console.log("Task added.");
  }

  removeUser(username: string): void {
    const user = this.findUser(username);
    if (!user) {
      console.log("User not exists.");
      return;
    }

    const index = this.users.indexOf(user);
    this.users.splice(index, 1);
    console.log("User removed.");
  }

  printUsers(): void {
    for (const user of this.users) {
      console.log(`User: ${user.name}, Age: ${user.age}`);
      for (const task of user.task) {
        console.log(` - Task: ${task}`);
      }
    }
  }
}

function menu() {
  const manager = new UserManager();
  let option = "";

  while (option !== "0") {
    console.log("\n1 - Add User");
    console.log("2 - Add Task");
    console.log("3 - Remove User");
    console.log("4 - Print Users");
    console.log("0 - Exit");

    option = prompt("Choose: ");

    if (option === "1") {
      const name = prompt("Name: ").toUpperCase();
      const age = parseInt(prompt("Age: "));
      manager.addUser(name, age);
    } else if (option === "2") {
      const name = prompt("Name: ").toUpperCase();
      const task = prompt("Task: ");
      manager.addTask(name, task);
    } else if (option === "3") {
      const name = prompt("Name: ").toUpperCase();
      manager.removeUser(name);
    } else if (option === "4") {
      manager.printUsers();
    } else if (option === "0") {
      console.log("Bye");
    } else {
      console.log("Error! Wrong Option");
    }
  }
}

menu();
