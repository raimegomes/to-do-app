const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
  value: "Estudar 4h por dia",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta:" });

  if (meta.length == 0) {
    console.log("A meta não pode ser fazia.");
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as Setas para mudar de meta, o Espaço para marcar ou desmarcar, e o Enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada.");
    return;
  }

  metas.forEach((topico) => {
    topico.checked = false;
  });

  respostas.forEach((resposta) => {
    const meta = metas.find((topico) => {
      return topico.value == resposta;
    });

    meta.checked = true;

    console.log("Meta(s) marcada(s) como concluída(s).");
  });
};

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "Cadastrar",
        },
        {
          name: "Listar metas",
          value: "Listar",
        },
        {
          name: "Sair",
          value: "Sair",
        },
      ],
    });

    switch (opcao) {
      case "Cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;

      case "Listar":
        await listarMetas();
        break;

      case "Sair":
        console.log("Até a próxima!.");
        return;
    }
  }
};

start();
