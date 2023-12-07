const tagDao = require('../dao/tags-dao.js')
const findTags  = async (req, res) => {
    const tags = await tagDao.findTags();
    res.json(tags);
}


const findTagById  = async (req, res) => {
    const tid = req.params.tid;
    const tag = await tagDao.findTagById(tid);
    res.json(tag);
}

const findTagByName  = async (req, res) => {
    const tagName = req.params.name;
    const tag = await tagDao.findTagByName(tagName);
    res.json(tag);
}

const saveTag = async (req, res) => {
    const newTag = req.body;
    const tags = await tagDao.findTagByName(newTag.name);
    if (tags.length === 0) {
        const createTag = await tagDao
            .createTag(newTag);
        res.json(createTag);
    } else {
        res.json("Tag already present");
    }
}

const updateTag = async (req, res) => {
    const tagIdToUpdate = req.params.tid;
    const tagBody = req.body;
    const status = await tagDao
        .updateTag(tagIdToUpdate,
            tagBody);
    res.json(status);

}

const deleteTag = async (req, res) => {
    const tagIdToDelete = req.params.tid;
    const status = await tagDao
        .deleteTag(tagIdToDelete);
    res.json(status);
}

module.exports = (app) => {
    app.get('/api/tag/allTags', findTags);
    app.get('/api/tag/:tid', findTagById);
    app.get('/api/tag/getTagByName/:name', findTagByName);
    app.post('/api/tag/saveTag', saveTag);
    app.put('/api/tag/updateTag/:tid', updateTag);
    app.delete('/api/tag/deleteTag/:tid', deleteTag);
};
