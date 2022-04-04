<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/picinelli/Projeto-TrackIt">
    <img src="https://github.com/picinelli/Projeto-TrackIt/blob/main/src/assets/images/TrackIt-Logo.svg" alt="Logo" width="100">
  </a>

<h3 align="center">Projeto - TrackIt</h3>
  <h4 align="center"> 
	🚀 Concluído! 🚀
  </h4>
  <p align="center">
    Single-Page Application (SPA) de um Aplicativo de Hábitos (Habit Tracker)
    <br />
    <a href="https://github.com/picinelli/Projeto-TrackIt/tree/main/src"><strong>Código JSX»</strong></a>
</div>

<!-- ABOUT THE PROJECT -->

## Requisitos

- Geral
    - [x]  Manipule o HTML usando somente React (você não deve manipular o DOM diretamente com `querySelector`, `innerHTML`, `classList`)
    - [x]  Para controlar os dados dinâmicos da aplicação, utilize as ferramentas de gerenciamento de estado do React (não utilize variáveis globais)
    - [x]  Para estados globais (como usuário logado e progresso do dia) utilize **ContextAPI**. Local Storage só deve ser usada para armazenar as credenciais do usuário, enviadas pelo servidor. **Session Storage não deve ser utilizado**.
    - [x]  Versionamento usando Git é obrigatório, crie um **repositório público** no seu perfil do GitHub
    - [x]  Faça commits a cada funcionalidade implementada
- Layout
    - [x]  Aplicar layout, seguindo figma fornecido      
    - [x]  O CSS deve ser implementado utilizando **Styled Components**
    - [x]  Não é necessário fazer a versão para desktop, somente mobile
- Tela Login (rota `/`)
    - [x]  Deve ser enviado o email e senha para a API conforme documentação
    - [x]  Enquanto estiver carregando, os campos e o botão devem ser desabilitados, conforme layout 
    - [x]  Em caso de sucesso, o usuário deve ser redirecionado para a rota `/hoje`
    - [x]  Em caso de falha, deve ser exibido um `alert` informando para o usuário e os campos/botão devem ser habilitados novamente
    - [x]  Ao clicar no link para se cadastrar, o usuário deve ser redirecionado para a rota `/cadastro`
- Tela Cadastro (rota `/cadastro`)
    - [x]  Os dados devem ser enviados para a API conforme documentação
    - [x]  Enquanto estiver carregando, os campos e o botão devem ser desabilitados, conforme layout
    - [x]  Em caso de sucesso, o usuário deve ser redirecionado para a rota `/` (rota de Login)
    - [x]  Em caso de falha, deve ser exibido um alert informando para o usuário e os campos/botão devem ser habilitados novamente
    - [x]  Ao clicar no link para logar, o usuário deve ser redirecionado para a rota `/` (rota de Login)
- Topo e Menu
    - [x]  Topo e menu devem ter posicionamento fixo
    - [x]  No topo deve ser exibida a foto do usuário conforme layout  
    - [x]  No menu, os 3 botões de Hábitos, Hoje e Histórico devem redirecionar o usuário para as rotas `/habitos`, `/hoje` e `/historico` respectivamente
    - [x]  O botão de Hoje deve exibir uma barra de progresso circular indicando a porcentagem de conclusão de hábitos de hoje do usuário
- Tela Hábitos (rota `/habitos`)
    - [x]  Carregar os hábitos do usuário, mandando request pra API conforme documentação e exibindo abaixo conforme layout
    - [x]  Ao clicar para deletar um hábito, deve ser exibido um `confirm` para confirmar se o usuário gostaria realmente de apagar o hábito. Se sim, deve ser enviado um request pra API conforme documentação e os hábitos recarregados logo em seguida.
    - [x]  Caso o usuário não tenha nenhum hábito cadastrado, deve ser exibido o texto conforme layout
    - [x]  Ao clicar no botão de "+", deve-se exibir um formulário de cadastro de hábito logo abaixo do título conforme layout
    - [x]  O usuário deve inserir o nome do hábito em um campo de texto e selecionar os dias da semana que deseja realizar o hábito conforme layout
    - [x]  Ao salvar, devem ser enviados os dados para API conforme documentação
    - [x]  Enquanto estiver carregando, o campo de texto e o botão devem ser desabilitados, conforme layout. Os botões dos dias da semana devem ser desabilitados, porém não é necessária mudança visual durante o loading.
    - [x]  Em caso de sucesso, os campos devem ser limpos e reabilitados, o formulário deve ser escondido novamente e a lista de hábitos abaixo recarregada
    - [x]  Em caso de erro, os campos devem ser reabilitados e um alerta deve indicar o problema para o usuário
    - [x]  Ao Cancelar, o formulário deve ser escondido. Caso tenha dados já preenchidos, os mesmos devem ser mantidos caso o usuário reabra o formulário de criação.
- Tela Hoje (rota `/hoje`)
    - [x]  Carregar os hábitos de hoje do usuário, mandando request pra API conforme documentação e exibindo abaixo conforme layout
    - [x]  O título da tela deve exibir o dia de hoje conforme layout   
    - [x]  No subtítulo deve ser exibida a frase "Nenhum hábito concluído ainda" ou "x% dos hábitos concluídos", dependendo do progresso do usuário
    - [x]  Ao marcar ou desmarcar um hábito como concluído, deve ser enviado um request pra API conforme documentação. Não é necessário colocar loading.
    - [x]  Ao marcar um hábito como concluído, deve ser colocada em verde a contagem da sequência atual
    - [x]  Caso a sequência atual seja igual ao recorde do usuário, este também deve ser exibido em verde
- Tela Histórico (rota `/historico`)
    - [x]  Deve ser exibido o texto conforme layout

# Bônus (opcional)

- Persistência de login
    - [x]  Após o login, salve o objeto do usuário na máquina utilizando **Local Storage**  
    - [x]  Ao abrir o app, verifique se há um usuário armazenado no Local Storage. Se sim, popule o UserContext com esse dado e redirecione o usuário direto para a tela inicial do app, evitando que ele faça login novamente

- Tela Histórico (rota `/historico`)
    - [x]  Nesta tela deve ser exibido um calendário, conforme layout
    - [x]  No calendário, deve ser exibido destacado em verde os dias em que o usuário completou todos os hábitos que deveria ter completado (ex: tinha 3 hábitos para fazer e completou os 3)
    - [x]  Já os dias que o usuário tinha hábitos para completar, porém não completou todos, devem ser destacados em vermelho (ex: tinha 3 hábitos pra fazer mas só completou 2)
    - [x]  Nos dias que o usuário não tinha nenhum hábito a concluir, não devem ser destacados (continuam com o fundo branco)

- Clique no dia
    - [x]  No calendário da tela de Histórico, quando o usuário clicar em um dia em destaque (verde ou vermelho), exiba a lista de hábitos do dia clicado, indicando quais hábitos ele concluiu ou não (layout livre)
    

### Tecnologias Utilizadas

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![CSS](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Nodejs](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

<!-- CONTACT -->

### Contato

[![LinkedIn][linkedin-shield]][linkedin-url]
[![Mail][mail-shield]][mail-url]

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=blue
[linkedin-url]: https://www.linkedin.com/in/pedro-ivo-brum-cinelli//
[mail-shield]: https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white
[mail-url]: mailto:cinelli.dev@gmail.com
