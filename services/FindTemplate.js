const { temp } = require('../model/htmltemplate');

const findtemp = async (templateType) => {
    try {
        return await temp.findOne({ tempalteType :templateType }); 
        } catch (err) {
        console.log(err);
    }
}

module.exports = { findtemp };
