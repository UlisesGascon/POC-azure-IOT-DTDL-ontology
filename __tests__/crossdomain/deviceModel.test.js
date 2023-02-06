const { getAllModels } = require('../../__utils__')

describe('Crossdomain - deviceModel v1', () => {
  let deviceModelV1Model

  beforeAll(async () => {
    const models = await getAllModels()
    deviceModelV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:DeviceModel;1']
  })

  it('Interface deviceModel should exists', () => {
    expect(deviceModelV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Command reboot should be present', () => {
    const { reboot } = deviceModelV1Model.contents
    expect(reboot.entityKind).toBe('command')
    expect(reboot.name).toBe('reboot')
  })

  it('Command reboot should require a delay as integer', () => {
    const { request } = deviceModelV1Model.contents.reboot
    expect(request.entityKind).toBe('commandpayload')
    expect(request.schema.id).toBe('dtmi:dtdl:instance:Schema:integer;2')
    expect(request.name).toBe('delay')
  })

  it('Property serialNumber should be a string and writeable', () => {
    const { serialNumber } = deviceModelV1Model.contents
    expect(serialNumber.schema.id).toBe('dtmi:dtdl:instance:Schema:string;2')
    expect(serialNumber.writable).toBe(true)
  })

  it('Property deviceModel should be a string and writeable', () => {
    const { deviceModel } = deviceModelV1Model.contents
    expect(deviceModel.schema.id).toBe('dtmi:dtdl:instance:Schema:string;2')
    expect(deviceModel.writable).toBe(true)
  })

  it('Property dateModified should be a dateTime and writeable', () => {
    const { dateModified } = deviceModelV1Model.contents
    expect(dateModified.schema.id).toBe('dtmi:dtdl:instance:Schema:dateTime;2')
    expect(dateModified.writable).toBe(true)
  })
})
