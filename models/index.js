'use strict';

const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize);

//제품등록
db.gear = require('./gear')(sequelize);
db.gear_img = require('./gear_img')(sequelize);

db.gear.hasMany(db.gear_img, { foreignKey: 'gearid', onDelete: 'CASCADE' });
db.gear_img.belongsTo(db.gear, { foreignKey: 'gearid', onDelete: 'CASCADE' });

//지도
db.Spot = require('./Spot')(sequelize);
db.Location = require('./Location')(sequelize);

//갤러리와 리뷰
db.gallery = require('./gallery')(sequelize);
db.gallery_img = require('./gallery_img')(sequelize);
db.gallery_comment = require('./gallery_comment')(sequelize);
db.userLocation = require('./userLocation')(sequelize);

db.Location.hasMany(db.Spot);
db.Spot.belongsTo(db.Location);

//유저와 갤러리 1대 다
db.User.hasMany(db.gallery, { foreignKey: 'userid', onDelete: 'CASCADE' });
db.gallery.belongsTo(db.User, { foreignKey: 'userid', onDelete: 'CASCADE' });

//갤러리 관계
db.gallery.hasMany(db.gallery_comment, { foreignKey: 'galleryid', onDelete: 'CASCADE' });
db.gallery_comment.belongsTo(db.gallery, { foreignKey: 'galleryid', onDelete: 'CASCADE' });

//댓글 : 유저
db.User.hasMany(db.gallery_comment, { foreignKey: 'userid', onDelete: 'CASCADE' });
db.gallery_comment.belongsTo(db.User, { foreignKey: 'userid', onDelete: 'CASCADE' });

//갤러리 관계
db.gallery.hasMany(db.gallery_img, { foreignKey: 'galleryid', onDelete: 'CASCADE' });
db.gallery_img.belongsTo(db.gallery, { foreignKey: 'galleryid', onDelete: 'CASCADE' });
//갤러리 - 경로 관계
db.gallery.hasMany(db.userLocation, { foreignKey: 'galleryid', onDelete: 'CASCADE' });
db.userLocation.belongsTo(db.gallery, { foreignKey: 'galleryid', onDelete: 'CASCADE' });

module.exports = db;
