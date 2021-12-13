<img src='./assets/readme-img.gif' align='right' />
<h1>FullStackOverflow Developer</h1>

FullStackOverflow Developer is an API that helps students find the answers related to programming that they are seeking. Any user can both ask questions and reply to them.

<h2>Contents</h2>

- <a href="#about">About</a>
- <a href="#tech">Technologies</a>
- <a href="#reqs">Requirements</a>
- <a href="#run">How to run</a>

<h2 id="about">About</h2>

FullStackOverflow Developer is an API that can help you find the answers to your questions!

It allows you to:

- Send questions
- Answer questions
- Create an account
- See the answer to a question
- See all questions

<h3>Why?</h3>

As a person who is learning how to program, FullStackOverflow Developer can be very helpful.

Stackoverflow is great and all, but sometimes, the answers you find there are too complex for someone who is getting started.

On FullStackOverflow Developer, fellow students help you and as they are also learning, odds are it will be much easier to learn and understand.

<h2 id="tech">Technologies</h2>

- Typescript
- Node.js
- Express
- Dotenv
- Postgres
- Joi

<h2 id="reqs">Requirements</h2>

In order to run this project, you must have _npm_ installed.

<h3>Windows</h3>

If you use Microsoft Windows, you can download it from here and run it to install: https://nodejs.org/dist/v16.13.0/node-v16.13.0-x86.msi

<h3>Linux</h3>

However, if you use Linux, you can do so by following the tutorial below.

1. **Open your terminal and run one of these commands.**

Their structure varies according to the distro you are using.

Ubuntu 20.04:

```
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

If the command above does not work in your distro, try this one:

```
wget -qO- <https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh> | bash
```

2. **Close and reopen the terminal before running the following lines:**

```
nvm install --lts
nvm use --lts
```

3. **In case you need extra help:**

You can refer to the official documentation here: https://github.com/nvm-sh/nvm

4. **You are ready to go!**

<h2 id="run">How To Run</h2>

Some steps are necessary for this project to run as it should in your machine.

1. **Clone this repository:**

You can clone this repository by opening your terminal and pasting this link.

```
git clone https://github.com/andrezzasouza/FullStackOverflowDeveloper_Back-end
```

2. **Install dependencies:**

Go to the folder where the cloned project currently is, open your prefered terminal and run this command to install the dependencies:

```
  npm i
```

Occasionally, it is necessary to manually install some dependencies even after running _npm i_. Your teminal will help you to know which dependencies if that is the case.

3. **Set up databases:**

This project comes with a database_backup.sql file. This file can be used to help you set up both production and testing database.

4. **Configure .env files:**

Create and configure .env.prod, .env.dev and .env.test files for production, development and tests.

You can use .env.example as a guide.

5. **Run it!:**

In order to run FullStackOverflow Developerand get to explore it, you must run this command on your terminal:

Production:

```
  npm start
```

Development:

```
  npm run start:dev
```

6. **Explore FullStackOverflow Developer:**

After the preceding steps, you can finaly get a taste of what FullStackOverflow Developeris like!

You can try it out using platforms that allow you to use APIs, such as Postman or Thunder Client. Alternatively, you can connect it to a front-end app to get the full experience.
