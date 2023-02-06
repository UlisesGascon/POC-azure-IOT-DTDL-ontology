const { getAllModels } = require('../../__utils__')

describe('Product - smartMachine v1', () => {
  let smartMachineV1Model

  beforeAll(async () => {
    const models = await getAllModels()
    smartMachineV1Model = models['dtmi:digitaltwins:product:smartMachine;1']
  })

  it('Interface smartMachine should exists', () => {
    expect(smartMachineV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Should extend device v2', () => {
    const deviceV1 = smartMachineV1Model.extends.filter(id => id === 'dtmi:digitaltwins:ngsi_ld:ontology:Device;2')
    expect(deviceV1).toBeDefined()
  })

  it('Component temperatureRanges v1 should be present', () => {
    const { temperatureRanges } = smartMachineV1Model.contents
    expect(temperatureRanges.schema.id).toBe('dtmi:digitaltwins:ngsi_ld:ontology:temperatureRanges;1')
  })
})
