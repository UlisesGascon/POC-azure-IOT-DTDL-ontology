const { getAllModels } = require('../../__utils__')

describe('Environment - temperatureObserved v1', () => {
  let temperatureObservedV1Model

  beforeAll(async () => {
    const models = await getAllModels()
    temperatureObservedV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:temperatureObserved;1']
  })

  it('Interface temperatureObserved should exists', () => {
    expect(temperatureObservedV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Should extend device v1', () => {
    const deviceV1 = temperatureObservedV1Model.extends.filter(id => id === 'dtmi:digitaltwins:ngsi_ld:ontology:EnvironmentBaseModel;1')
    expect(deviceV1).toBeDefined()
  })

  it('Property temperature should be type Temperature, double, in celsius and not writeable', () => {
    const { temperature } = temperatureObservedV1Model.contents
    expect(temperature.schema.id).toBe('dtmi:dtdl:instance:Schema:double;2')
    expect(temperature.writable).toBe(false)
    expect(temperature.sourceObject.unit).toBe('degreeCelsius')

    const temperatureType = temperature.supplementalTypeIds.filter(type => type === 'dtmi:dtdl:instance:Temperature;2')
    expect(temperatureType).toBeDefined()
  })
})
