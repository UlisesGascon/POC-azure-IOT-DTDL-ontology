const { getAllModels } = require('../../__utils__')

describe('Environment - temperatureRanges v1', () => {
  let temperatureRangesV1Model
  const cases = ['minimumTemperature', 'maximumTemperature']

  beforeAll(async () => {
    const models = await getAllModels()
    temperatureRangesV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:temperatureRanges;1']
  })

  it('Interface temperatureRanges should exists', () => {
    expect(temperatureRangesV1Model.sourceObject['@type']).toBe('Interface')
  })

  test.each(cases)(
    'Property %p should be type Temperature, double, in celsius and not writeable',
    propName => {
      const property = temperatureRangesV1Model.contents[propName]
      expect(property.schema.id).toBe('dtmi:dtdl:instance:Schema:double;2')
      expect(property.writable).toBe(false)
      expect(property.sourceObject.unit).toBe('degreeCelsius')

      const temperatureType = property.supplementalTypeIds.filter(type => type === 'dtmi:dtdl:instance:Temperature;2')
      expect(temperatureType).toBeDefined()
    }
  )
})
