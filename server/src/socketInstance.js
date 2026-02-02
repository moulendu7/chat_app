let io = null;

module.exports = {
  init: (serverIo) => {
    io = serverIo;
  },
  get: () => io
};
