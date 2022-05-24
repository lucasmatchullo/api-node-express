const { v4: uuidv4 } = require('uuid');

module.exports = app => {
    const customerFarmDB = app.data.farm;
    const controller = {};

    const {
        farm: farmMock,
    } = customerFarmDB;

    controller.listFarm = (req, res) => res.status(200).json(customerFarmDB);

    controller.saveFarm = (req, res) => {
        farmMock.data.push({
            id: uuidv4(),
            name: req.body.name,
            parentId: uuidv4(),
            birthDate: req.body.birthDate,
            cellphone: req.body.cellphone,
            phone: req.body.phone,
            email: req.body.email,
            occupation: req.body.occupation,
            state: req.body.state,
        });

        res.status(201).json(farmMock);
    }

    controller.removeFarm = (req, res) => {
        const {
            farmId,
        } = req.params;

        const foundFarmIndex = farmMock.data.findIndex(costumer => costumer.id == farmId);

        if (foundFarmIndex == -1) {
            res.status(404).json({
                message: 'Fazenda não encontrada na base.',
                sucess: false,
                farms: farmMock,
            });
        } else {
            farmMock.data.splice(foundFarmIndex, 1);
            res.status(200).json({
                message: 'Fazenda deletada com sucesso.',
                sucess: true,
                farms: farmMock,
            });
        }
    }

    controller.updateFarm = (req, res) => {
        const {
            farmId,
        } = req.params;

        const foundFarmIndex = farmMock.data.findIndex(costumer => costumer.id == farmId);

        if (foundFarmIndex == -1) {
            res.status(404).json({
                message: 'Fazenda não encontrada na base.',
                sucess: false,
                farms: farmMock,
            });
        } else {
            const newFarm = {
                id: farmId,
                parentId: req.body.parentId,
                name: req.body.name,
                birthDate: req.body.birthDate,
                cellphone: req.body.cellphone,
                phone: req.body.phone,
                email: req.body.email,
                occupation: req.body.occupation,
                state: req.body.state,
                createdAt: new Date(),
            };

            farmMock.data.splice(foundFarmIndex, 1, newFarm);

            res.status(200).json({
                message: 'Cliente encontrado e atualizado com sucesso.',
                sucess: true,
                farms: farmMock,
            })
        }
    }



    return controller;
}