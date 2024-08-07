const { StatusCodes } = require('http-status-codes');
const { Logger } = require('../config');
const AppError = require('../utils/errors/app-error');


class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        
        return response;
    }

    async destroy(data) {
        try {
            const response = await this.model.destroy({
                where: {
                    id: data
                }
            });

            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
            }
            return response;
        } catch(error) {
            Logger.error('Something went wrong in the Crud Repo : destroy');
            throw error;
        }
    }

    async get(data) {
        try {
            const response = await this.model.findByPk(data);

            if(!response){
                throw new AppError("Not able to find the resource",StatusCodes.NOT_FOUND);
            }
            return response;
        } catch(error) {
            Logger.error('Something went wrong in the Crud Repo : get');
            throw error;
        }
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch(error) {
            Logger.error('Something went wrong in the Crud Repo : get');
            throw error;
        }
    }
 
   
    async update(id, data) {
        try {
            
            const [affectedRows] = await this.model.update(data, {
                where: { id }
            });

            if (!affectedRows) {
                throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
            }

            const updatedRecord = await this.model.findOne({
                where: { id }
            });

            return updatedRecord;
        } catch (error) {
            Logger.error('Something went wrong in the Crud Service : update');
            throw error;
        }
    }
}

module.exports = CrudRepository;