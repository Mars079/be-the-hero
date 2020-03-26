const connection = require('../DB/connections');

module.exports = {

    async list(request, response) {
        const { page = 1 } = request.query;

        const [total] = await connection('incidents').count();

        const incidents = await connection('incidents')
          .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
          .limit(5)
          .offset((page - 1) * 5)
          .select([
              'incidents.*',
              'ongs.name',
              'ongs.email',
              'ongs.whatsapp',
              'ongs.city',
              'ongs.uf'
            ]);
        
        response.header('X-Total-Count', total['count(*)']);

        return response.json(incidents)
    },

    async create(request, response) {

        const { title, description, value } = request.body;
        const ong_id = request.headers.auth;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id })
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.auth;
        const incident = await connection('incidents')
                                         .where('id', id)
                                         .select('ong_id')
                                         .first()

        if (incident == null) {
            return response.json({ error: "This incident is not registered" })
        }

        if (incident.ong_id != ong_id) {
            return response.status(401)
                           .json({ error: "You're not authorized to delete this incident"});
        }

        await connection('incidents')
                        .where('id', id)
                        .delete();

        return response.status(204)
                       .send();
    }
}