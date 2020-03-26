const connection = require('../DB/connections');

module.exports = {
    async list(request, response) {
        const ong_id = request.headers.auth;

        const incidents = await connection('incidents')
                                          .where('ong_id', ong_id)
                                          .select('*');  
                                     
        return response.json(incidents)
    }
}
