const { getAllModels } = require('../../__utils__')

describe('Crossdomain - deviceStatus v1', () => {
  let deviceStatusV1Model

  beforeAll(async () => {
    const models = await getAllModels()
    deviceStatusV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:DeviceStatus;1']
  })

  it('Interface DeviceStatus should exists', () => {
    expect(deviceStatusV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Property DeviceStatus should be an enum', () => {
    const { DeviceStatus } = deviceStatusV1Model.contents
    expect(DeviceStatus.schema.entityKind).toBe('enum')
    const enumTypes = DeviceStatus.schema.enumValues.map(type => type.enumValue)
    const expectedEnumTypes = ['operational', 'faulty', 'updating', 'offline', 'unknown']
    expect(expectedEnumTypes).toStrictEqual(enumTypes)
  })
})
