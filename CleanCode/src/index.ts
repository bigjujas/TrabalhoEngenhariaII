import promptSync from "prompt-sync";
const prompt = promptSync();

type User = {
  name: string;
  age: number;
  task: string[];
};

const users: User[] = [];

function userExists(username: string): boolean {
  for (let i = 0; i < users.length; i++) {
    if (users[i].name === username) {
      return true;
    }
  }
  return false;
}

function findUser(username: string): User | undefined {
  return users.find((user) => user.name === username);
}

function addUser(username: string, age: number): void {
  if (userExists(username)) {
    console.log("User already exists.");
    return;
  }

  const newUser = { name: username, age: age, task: [] };
  users.push(newUser);
  console.log("User added.");
}

function addTask(username: string, task: string): void {
  if (!userExists(username)) {
    console.log("User not exists.");
    return;
  }

  const user = findUser(username);
  if (user) {
    user.task.push(task);
    console.log("Task added.");
  }
}

function removeUser(username: string): void {
  const user = findUser(username);
  if (!user) {
    console.log("User not exists.");
    return;
  }

  const index = users.indexOf(user);
  users.splice(index, 1);
  console.log("User removed.");
}

function printUsers(): void {
  for (let i = 0; i < users.length; i++) {
    console.log("User: " + users[i].name + ", Age: " + users[i].age);
    for (let j = 0; j < users[i].task.length; j++) {
      console.log(" - Task: " + users[i].task[j]);
    }
  }
}

function menu() {
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
      addUser(name, age);
    } else if (option === "2") {
      const name = prompt("Name: ");
      const task = prompt("Task: ");
      addTask(name, task);
    } else if (option === "3") {
      const name = prompt("Name: ").toUpperCase();
      removeUser(name);
    } else if (option === "4") {
      printUsers();
    } else if (option === "0") {
      console.log("Bye");
    } else {
      console.log("Error! Wrong Option");
    }
  }
}

menu();
