import * as readline from "readline";

type User = {
  n: string;
  a: number;
  t: string[];
};

const us: User[] = [];

// Essa função cria um usuário
function addU(u: string, a: number): void {
  let f = false;
  for (let i = 0; i < us.length; i++) {
    if (us[i].n === u) {
      f = true;
      break;
    }
  }
  if (!f) {
    const nu = { n: u, a: a, t: [] };
    us.push(nu);
    console.log("User added.");
  } else {
    console.log("User already exists.");
  }
}

// Essa função designa uma tarefa a um usuario
function addT(u: string, t: string): void {
  let f = false;
  for (let i = 0; i < us.length; i++) {
    if (us[i].n === u) {
      us[i].t.push(t);
      console.log("Task added.");
      f = true;
      break;
    }
  }
  if (!f) {
    console.log("User not found.");
  }
}

function rU(u: string): void {
  for (let i = 0; i < us.length; i++) {
    if (us[i].n === u) {
      us.splice(i, 1);
      console.log("User removed.");
      return;
    }
  }
  console.log("User not found.");
}

function pU(): void {
  for (let i = 0; i < us.length; i++) {
    console.log("User: " + us[i].n + ", Age: " + us[i].a);
    for (let j = 0; j < us[i].t.length; j++) {
      console.log(" - Task: " + us[i].t[j]);
    }
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function menu() {
  console.log("\n1 - Add User");
  console.log("2 - Add Task");
  console.log("3 - Remove User");
  console.log("4 - Print Users");
  console.log("0 - Exit");

  rl.question("Choose: ", (x) => {
    if (x === "1") {
      rl.question("Name: ", (n) => {
        rl.question("Age: ", (a) => {
          addU(n, parseInt(a));
          menu();
        });
      });
    } else if (x === "2") {
      rl.question("Name: ", (n) => {
        rl.question("Task: ", (t) => {
          addT(n, t);
          menu();
        });
      });
    } else if (x === "3") {
      rl.question("Name: ", (n) => {
        rU(n);
        menu();
      });
    } else if (x === "4") {
      pU();
      menu();
    } else if (x === "0") {
      console.log("bye");
      rl.close();
    } else {
      console.log("wrong option");
      menu();
    }
  });
}

menu();
