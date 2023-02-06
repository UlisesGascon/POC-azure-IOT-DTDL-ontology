const { getAllModels } = require('../__utils__')

describe('General', () => {
  it('All the models should be a valid DTLD v2 model', () => {
    expect(async () => await getAllModels()).not.toThrow()
  })
})
