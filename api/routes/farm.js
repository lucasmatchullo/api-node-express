module.exports = app => {
    const controller = app.controllers.farm;

    app.route('/api/v1/farm')
        .get(controller.listFarm)
        .post(controller.saveFarm);

    app.route('/api/v1/farm/:farmId')
        .delete(controller.removeFarm)
        .put(controller.updateFarm);
}