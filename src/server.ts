import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('teamooje', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
});

const test = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}