const Dev = require('../model/Dev');

module.exports = {
  async store(request, response) {
    const { devID } = request.params;
    const { user } = request.headers;

    const loggedDev = await Dev.findById(user);
    const tragetDev = await Dev.findById(devID);

    if (!tragetDev) {
      return response.status(400).json({ erro: 'Dev not exists' });
    }

    loggedDev.dislikes.push(tragetDev._id);

    await loggedDev.save();

    return response.json(loggedDev);
  }
}