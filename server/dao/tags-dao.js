const tagsModel = require('../models/tags-model.js');

const findTags = () => tagsModel.find();
const findTagById = (tid) => tagsModel.findById({_id: tid});
const findTagByName = (name) => tagsModel.find({name: name})
const createTag = (tag) => tagsModel.create(tag);
const deleteTag = (tid) => tagsModel.deleteOne({_id: tid});
const updateTag = (tid, tag) => tagsModel.updateOne({_id: tid}, {$set: tag})

const tagCreate = async (name) => {
    const newTag = name;
    console.log(newTag);
    const tags = await findTagByName(newTag);
    console.log(tags)
    let cTag = ''
    if (tags.length === 0) {
        cTag = await createTag({name: newTag});
    } else {
        cTag = tags[0]._id;
    }
    return cTag;
}

module.exports = {
    findTags,
    findTagById,
    findTagByName,
    createTag,
    deleteTag,
    updateTag,
    tagCreate
};


