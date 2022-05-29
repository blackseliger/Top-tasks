import Router from './router/index.js';


const router = Router.instance();

router
  .addRoute(/^$/, 'taskManager')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('taskManager')
  .listen();
