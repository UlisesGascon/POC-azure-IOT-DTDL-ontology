const { getAllModels } = require('../../__utils__')

describe('Environment - EnvironmentBaseModel v1', () => {
  let environmentalBaseModelV1Model

  beforeAll(async () => {
    const models = await getAllModels()
    environmentalBaseModelV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:EnvironmentBaseModel;1']
  })

  it('Interface environmentalBaseModel should exists', () => {
    expect(environmentalBaseModelV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Property dateObserved should be a dateTime and writeable', () => {
    const { dateObserved } = environmentalBaseModelV1Model.contents
    expect(dateObserved.schema.id).toBe('dtmi:dtdl:instance:Schema:dateTime;2')
    expect(dateObserved.writable).toBe(true)
  })

  it('Property sensorModel should be a string and writeable', () => {
    const { sensorModel } = environmentalBaseModelV1Model.contents
    expect(sensorModel.schema.id).toBe('dtmi:dtdl:instance:Schema:string;2')
    expect(sensorModel.writable).toBe(true)
  })
})
