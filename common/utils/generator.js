let app = require('../../server/server')
let uuid = require('uuid/v1')
let randomDate = require('random-datetime')

function generate(model) {
    let success = 0

    let settings = model.definition.settings
    let relations = settings.relations
    let properties = settings.properties
    let relationKeys = Object.keys(relations)
    let propertyKeys = Object.keys(properties)

    let uid = uuid()
    let datetime1 = randomDate()
    let datetime2 = randomDate()
    if (datetime2 < datetime1) {
        let dt = datetime1
        datetime1 = datetime2
        datetime2 = dt
    }

    let data = {
        uid: uid,
        ma: uid,
        ten: uid,
        ghiChu: uid,
        createdAt: datetime1,
        createdBy: Math.floor(Math.random() * 100) + 1,
        updatedAt: datetime2,
        updatedBy: Math.floor(Math.random() * 100) + 1 > 20,
        hieuLuc: (Math.floor(Math.random() * 100) + 1 > 20) ? 1 : 0,
        xoa: (Math.floor(Math.random() * 100) + 1 > 20) ? 0 : 1
    }

    for (let i in relationKeys) {
        key = relationKeys[i]
        relation = relations[key]
        modelName = relation.model
        model = app.models[modelName]

        referencedIdList = model.find({fields: {id: true}})

        foreignKeyName = relation.foreignKey
        foreignKey = properties[foreignKeyName]

        threshold = 20
        if (foreignKey.required) {
            threshold = 0
        }

        data[foreignKey]
        = ((Math.floor(Math.random() * 100) + 1 > threshold) ? 1 : 0)
        * referencedIdList[(Math.floor(Math.random() * referencedIdList.length))]
    }

    for (let i in propertyKeys) {
        key = propertyKeys[i]
        property = propertyKeys[key]

        if (data[key] == undefined && property.required) {
            data[key] = 1
        }
    }

    try {
        model.upsert(data)
        success = 1
        return success
    } catch (err) {
        return success
    }
    return success
}

module.exports = {
    generate
}