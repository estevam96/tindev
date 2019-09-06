const Dev = require('../model/Dev');

module.exports = {
  async store(request, response) {
    const { devID } = request.params;
    const { user } = request.headers;

    const loggedDev = await Dev.findById(user);
    const tragetDev = await Dev.findById(devID);

    if (!tragetDev) {
      return response.status(400).json({erro: 'Dev not exists'});
    }

    if(tragetDev.likes.includes(loggedDev._id)){
      const loggedSocket = request.connectedUsers[user];
      const targetSocket = request.connectedUsers[devID];

      if(loggedSocket) {
        request.io.to(loggedSocket).emit('match', tragetDev);
      }

      if (targetSocket) {
        request.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(tragetDev._id);

    await loggedDev.save();

    return response.json(loggedDev);
  }
}