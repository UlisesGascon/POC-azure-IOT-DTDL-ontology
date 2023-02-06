const { getAllModels } = require('../../__utils__')

describe('Crossdomain - address v1', () => {
  let addressV1Model
  const cases = ['addressCountry', 'addressLocality', 'addressRegion', 'postOfficeBoxNumber', 'postalCode', 'streetAddress']

  beforeAll(async () => {
    const models = await getAllModels()
    addressV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:Address;1']
  })

  it('Interface Address should exists', () => {
    expect(addressV1Model.sourceObject['@type']).toBe('Interface')
  })

  test.each(cases)(
    'Property %p should be a string and writeable',
    propName => {
      const property = addressV1Model.contents[propName]
      expect(property.schema.id).toBe('dtmi:dtdl:instance:Schema:string;2')
      expect(property.writable).toBe(true)
    }
  )
})
