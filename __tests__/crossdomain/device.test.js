const { getAllModels } = require('../../__utils__')

let deviceModelV1Model
let deviceModelV2Model

beforeAll(async () => {
  const models = await getAllModels()
  deviceModelV1Model = models['dtmi:digitaltwins:ngsi_ld:ontology:Device;1']
  deviceModelV2Model = models['dtmi:digitaltwins:ngsi_ld:ontology:Device;2']
})

describe('Crossdomain - device v1', () => {
  it('Interface should exists', () => {
    expect(deviceModelV1Model.sourceObject['@type']).toBe('Interface')
  })

  it('Command upgrade should be present', () => {
    const { upgrade } = deviceModelV1Model.contents
    expect(upgrade.entityKind).toBe('command')
    expect(upgrade.name).toBe('upgrade')
  })

  it('Command upgrade should require a firmwareVersion as string', () => {
    const { request } = deviceModelV1Model.contents.upgrade
    expect(request.entityKind).toBe('commandpayload')
    expect(request.schema.id).toBe('dtmi:dtdl:instance:Schema:string;2')
    expect(request.name).toBe('firmwareVersion')
  })

  it('Property dateModified should be a dateTime and writeable', () => {
    const { dateModified } = deviceModelV1Model.contents
    expect(dateModified.schema.id).toBe('dtmi:dtdl:instance:Schema:dateTime;2')
    expect(dateModified.writable).toBe(true)
  })

  it('Property dateCreated should be a dateTime and writeable', () => {
    const { dateCreated } = deviceModelV1Model.contents
    expect(dateCreated.schema.id).toBe('dtmi:dtdl:instance:Schema:dateTime;2')
    expect(dateCreated.writable).toBe(true)
  })

  it('Property dateObserved should be a dateTime and writeable', () => {
    const { dateObserved } = deviceModelV1Model.contents
    expect(dateObserved.schema.id).toBe('dtmi:dtdl:instance:Schema:dateTime;2')
    expect(dateObserved.writable).toBe(true)
  })

  it('Component deviceStatus v1 should be present', () => {
    const { deviceStatus } = deviceModelV1Model.contents
    expect(deviceStatus.schema.id).toBe('dtmi:digitaltwins:ngsi_ld:ontology:DeviceStatus;1')
  })

  it('Component address v1 should be present', () => {
    const { address } = deviceModelV1Model.contents
    expect(address.schema.id).toBe('dtmi:digitaltwins:ngsi_ld:ontology:Address;1')
  })

  it('Relationship DeviceModel v1 should be present including multiplicity', () => {
    const { refDeviceModel } = deviceModelV1Model.contents
    expect(refDeviceModel.entityKind).toBe('relationship')
    expect(refDeviceModel.target).toBe('dtmi:digitaltwins:ngsi_ld:ontology:DeviceModel;1')

    // multiplicity
    expect(refDeviceModel.minMultiplicity).toBe(0)
    expect(refDeviceModel.maxMultiplicity).toBe(1)
  })
})

describe('Crossdomain - device v2', () => {
  it('Interface v2 should exists', () => {
    expect(deviceModelV2Model.sourceObject['@type']).toBe('Interface')
  })

  it('Should extend device v1', () => {
    const deviceV1 = deviceModelV2Model.extends.filter(id => id === 'dtmi:digitaltwins:ngsi_ld:ontology:Device;1')
    expect(deviceV1).toBeDefined()
  })

  it('Command stop should be present', () => {
    const { stop } = deviceModelV2Model.contents
    expect(stop.entityKind).toBe('command')
    expect(stop.name).toBe('stop')
  })

  it('Command stop should not require any request payload', () => {
    const { request } = deviceModelV2Model.contents.stop
    expect(request).toBe(undefined)
  })

  it('Command start should be present', () => {
    const { start } = deviceModelV2Model.contents
    expect(start.entityKind).toBe('command')
    expect(start.name).toBe('start')
  })

  it('Command start should not require any request payload', () => {
    const { request } = deviceModelV2Model.contents.start
    expect(request).toBe(undefined)
  })
})
