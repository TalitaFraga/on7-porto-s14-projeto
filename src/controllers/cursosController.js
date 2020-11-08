const cursos = require('../models/cursos')

const getAll = (req, res) => {
    cursos.find((err, cursos) => {
        if (err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(cursos)
    })
}

const getPorTurno = (req, res) => {
    const parametros = req.query
    
    cursos.find(parametros, (err, cursos) => {
        if(err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(cursos)
    })
}

const getById = (req, res) => {
    cursos.find({ id: req.params.id }, (err, cursos) => {
        if(err) {
            res.status().send({ message: err.message})
        }
        res.status(200).send(cursos)
    })
}

const getBootcamps = (req, res) => {
    cursos.find({bootcamp:true}, (err, cursos) => {
        if (err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(cursos)
    })
}

const getCursosGratuitos = (req, res) => {
    const estado = req.params.estado
    cursos.find({estado, gratuito:true}, (err, cursos) => {
        if (err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(cursos)
    })
}

const getCursosPagos = (req, res) => {
    const estado = req.params.estado
    cursos.find({estado, gratuito:false}, (err, cursos) => {
        if (err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(cursos)
    })
}

const postCurso = (req, res) => {
    const curso = new cursos(req.body)

    curso.save(err => {
        if (err){
            res.status(500).send({ message: err.message})
        }
        res.status(200).send(curso.toJSON())
    })
}

const deleteCurso = (req, res) => {
    const id = req.params.id

    cursos.find({ id }, (err, curso) => {
        if (curso.length > 0) {
            cursos.deleteMany({ id }, (err) => {
                if(err) {
                    res.status(500).send({ message: err.message, status: "FAIL"})
                }
                res.status(200).send({ message: "Registro removido", status:"SUCCESS"})
            })
        } else {
            res.status(200).send({message: "Não há tarefa para ser removida", status: "EMPTY"})
        }
    })
}

const deleteCursosPorTurno = (req, res) => {
    const parametros = req.query
    cursos.deleteMany(parametros, (err) => {
        if (err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send({ message: "deletar os cursos por turnos"})
    })
}

const putCurso = (req, res) => {
    const id = req.params.id
    cursos.updateMany ({ id },  { $set: req.body}, { upsert: true }, (err) => {
        if (err) {
            res.status(500).send({ message: err.message})
        }
        res.status(200).send({ message: "Curso atualizado com sucesso"})
    })
}

module.exports = {
    getAll,
    getPorTurno,
    getById,
    getBootcamps,
    getCursosGratuitos,
    getCursosPagos,
    postCurso,
    deleteCurso,
    deleteCursosPorTurno,
    putCurso
}