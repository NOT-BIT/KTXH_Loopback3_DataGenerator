let generator = require('../../utils/generator')
let app = require('../../../server/server')

'use_strict';

module.exports = function (ThisModel) {
  ThisModel.randomGenerateData = async function (amount) {
    for (let i = 0; i < amount; i++) {
      generator.generate(ThisModel)
    }
  }

  ThisModel.remoteMethod('randomGenerateData',
    {
      http: {path: 'generate', verb: 'post'},
      accepts: [
        {arg: 'amount', type: 'Number', required: true}
      ],
      returns: {arg: 'amount', type: 'Number'}
    })
};