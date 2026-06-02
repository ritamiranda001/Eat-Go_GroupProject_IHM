# 🍔 Eat&Go

**Aplicação móvel desenvolvida com Ionic Framework**  
Projeto de grupo — Interação Homem-Máquina

![Ionic](https://img.shields.io/badge/Ionic-3880FF?style=for-the-badge&logo=ionic&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

---

## 📋 Sobre o Projeto

O Eat&Go é uma aplicação móvel que permite aos utilizadores descobrir e avaliar restaurantes, bares e cafés de forma rápida e intuitiva.
Experimentar algo novo pode ser desafiador — corremos o risco de ir a um restaurante que, se soubéssemos como era, seguramente não iríamos. A Eat&Go corta pela raiz esse problema!
Na Eat&Go podes ver as avaliações de outros clientes e fazer as tuas próprias avaliações.
Desenvolvida no âmbito da unidade curricular de Interação Homem-Máquina, a aplicação coloca o foco numa experiência de utilizador cuidada e centrada nas necessidades reais de quem está sempre a correr.

## ✅ Funcionalidades Implementadas

🔍 Pesquisa e filtragem de restaurantes por categoria, preço e ordenação
📍 Visualização da localização dos restaurantes no mapa
⭐ Avaliações com comentários, estrelas e modo anónimo
👤 Perfil do utilizador com estatísticas de avaliações
🔐 Autenticação com login e logout
🌙 Modo escuro com alternância nas definições
📱 Ecrã de abertura (splash screen) com o logo da app
➕ Adição de novos restaurantes
🗑️ Eliminação de avaliações próprias


## 🗂️ Estrutura do Repositório
Eat-Go_GroupProject_IHM/
├── EatGo/
│   ├── src/
│   │   ├── app/
│   │   │   ├── adicionar-restaurante/   # Página para adicionar restaurante
│   │   │   ├── avaliar/                 # Página de avaliação de restaurante
│   │   │   ├── definicoes/              # Página de definições
│   │   │   ├── guards/                  # Guards de autenticação
│   │   │   ├── home/                    # Página principal com listagem
│   │   │   ├── login/                   # Página de autenticação
│   │   │   ├── minhas-avaliacoes/       # Histórico de avaliações do utilizador
│   │   │   ├── models/                  # Interfaces e modelos de dados
│   │   │   ├── perfil/                  # Página de perfil do utilizador
│   │   │   ├── restaurante-detalhe/     # Detalhe de restaurante
│   │   │   ├── services/                # Serviços (auth, restaurantes)
│   │   │   ├── app-routing.module.ts
│   │   │   ├── app.component.html
│   │   │   ├── app.component.scss
│   │   │   ├── app.component.ts
│   │   │   └── app.module.ts
│   │   ├── assets/                      # Imagens e dados JSON
│   │   ├── environments/                # Variáveis de ambiente
│   │   ├── theme/
│   │   │   └── variables.scss           # Variáveis globais de estilo
│   │   ├── global.scss                  # Estilos globais (incl. modo escuro)
│   │   └── index.html
│   ├── android/                         # Build nativo Android (Capacitor)
│   ├── angular.json
│   ├── capacitor.config.ts
│   ├── ionic.config.json
│   └── package.json
└── README.md

## 🎨 Design & Prototipagem
Figma - https://www.figma.com/make/aDVNeplJ2fWoGezTP7Ynf4/Propt_IHM?t=EhlHgpwok5Nsk4N3-1

## 👥 Equipa
Igor Brito -34577
Keila dos Santos -34668
Rita Miranda -34581

## 🌿 Convenções Git
*Branches*
As branches seguem o formato funcionalidade_autor ou autor/funcionalidade:

main                              → versão estável
abertura-app_rita                 → splash screen
fix-modoescuro_rita               → correções modo escuro
fixes-definicoes-avaliacoes/rita  → correções definições e avaliações
correcao-pag-perfil               → correção página de perfil
ajustes_rita                      → ajustes gerais
definicoes-page_rita              → página de definições
utilizador-page_rita              → página de utilizador
mapa_rita                         → integração de mapa
keila/validar_login               → validação de login
keila/apagar                      → eliminar avaliações
keila/perfil                      → página de perfil
igor/fixes                        → correções gerais
igor/capacitor                    → integração Capacitor
igor/autenticacao                 → sistema de autenticação
igor/adicionar                    → adicionar restaurante
igor/minhas-avaliacoes            → histórico de avaliações
igor/media                        → cálculo de média
igor/anonimo                      → avaliação anónima
igor/madrugs                      → correções diversas

## 🛠️ Tecnologias Utilizadas
TecnologiaPropósitoIonic FrameworkFramework principal da aplicaçãoAngularFramework base do IonicTypeScriptLinguagem de programaçãoCapacitorBuild nativo AndroidIonic StoragePersistência de dados localLeafletMapas interativosFigmaPrototipagem e design UIVS CodeEditor de códigoGitHubControlo de versões

## 📅 Contexto Académico

*Curso: ECGM
Unidade Curricular: Interação Homem-Máquina
Tipo de trabalho: Projeto de grupo (3 elementos)
Ano letivo: 2025/2026*

<div align="center">
  <sub>Feito com ❤️ para IHM · 2025/2026</sub>
</div>
```
