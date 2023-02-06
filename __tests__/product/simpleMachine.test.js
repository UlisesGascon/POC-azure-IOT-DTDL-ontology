const { getAllModels } = require('../../__utils__')

describe('Product - simpleMachine v1', () => {
  let simpleMachineV1Model

  beforeAll(async () => {
    const models = await getAllModels()
    simpleMachineV1Model = models['dtmi:digitaltwins:product:simpleMachine;1']
  })

  it('Interface simpleMachine should exists', () => {
    expect(simpleMachineV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Should extend device v1', () => {
    const deviceV1 = simpleMachineV1Model.extends.filter(id => id === 'dtmi:digitaltwins:ngsi_ld:ontology:Device;1')
    expect(deviceV1).toBeDefined()
  })
})
