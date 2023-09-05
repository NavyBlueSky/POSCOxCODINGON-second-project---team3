'use strict';


const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};


const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//유저
db.User = require('./user')(sequelize)


//지도
db.Spot = require('./spot')(sequelize)
db.Location = require('./location')(sequelize)

db.Location.hasMany(db.Spot)
db.Spot.belongsTo(db.Location)


//갤러리와 리뷰
db.gallery = require("./gallery")(sequelize)
db.gallery_img = require("./gallery_img")(sequelize)
db.gallery_comment = require("./gallery_comment")(sequelize)



//갤러리 관계
db.gallery.hasMany(db.gallery_comment, { foreignKey: "galleryid", onDelete: "CASCADE" })
db.gallery_comment.belongsTo(db.gallery, { foreignKey: "galleryid", onDelete: "CASCADE" })

//갤러리 관계
db.gallery.hasMany(db.gallery_img, { foreignKey: "galleryid", onDelete: "CASCADE" })
db.gallery_img.belongsTo(db.gallery, { foreignKey: "galleryid", onDelete: "CASCADE" })

module.exports = db;
