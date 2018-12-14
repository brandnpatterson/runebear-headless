export default {
  get: jest.fn(() => {
    return Promise.resolve({
      data: []
    });
  })
};
