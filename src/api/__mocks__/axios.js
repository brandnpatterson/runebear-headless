import mockData from '../__mockData__'

export default {
    get: jest.fn(() => Promise.resolve(mockData))
}
