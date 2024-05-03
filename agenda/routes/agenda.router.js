const express = require( 'express' );
const app = express();
const agendaRoutes = express.Router();

let Agenda = require( '../model/Agenda');

//api to add agenda
agendaRoutes.route ('/add').post(function (req,res){
  let agenda = new Agenda(req.body);
  agenda.save()
  .then(agenda=>{
    res.status(200).json({'status': 'success', 'mssg': 'agenda added sucessfully'});
  }) 
  .catch(err =>{
    res.status(409).send({'status': 'failure', 'mssg': 'unable to save to database'});
  })
});

//api to get agendas
agendaRoutes.route ('/add').get(function (req,res){
  Agenda.find(function(err,agendas){
    if(err){
      res.status(400).send({'status': 'failure', 'mssg':'Something went wrong'});
    }
    else{
      res.status(200).json({'status': 'sucess', 'agendas': agendas})
    }
  });
});

//api to get agenda
agendaRoutes.route ('/agenda/:id').get(function (req,res){
  let id= req.params.id;
  Agenda.findById(id, function(err, agenda){
    if (err){
      rest.status(400).send({'status': 'failure', 'mssg': 'something went wrong'});
    }
    else{
      res.status(200).json({'status': 'sucess', 'agenda': agenda});
    }
  })
});

//api to update route
agendaRoutes.route('/update/:id').put(function (req,res){
  Agenda.findById(req.params.id, function (err,agenda){
    if (!agenda) {
      res.status(400).send({'status': 'failure', 'mssg': 'unable to find data'});
    } else {
        agenda.nome = req.body.nome;
        agenda.email = req.body.email;
        agenda.telefone = req.body.telefone;

        agenda.save().then(agenda => { 
          res.status(200).json({ 'status': 'sucess', 'mssg': 'update complete'});
        })
      }
    });
});

//api for delete
agendaRoutes.route ('/delete/:id').delete(function (req,res){
  Agenda.findByIdAndRemove({_id: req.params.id }, function (err,){
    if(err){
      res.status(400).send({'status': 'failure', 'mssg':'Something went wrong'});
    }
    else{
      res.status(200).json({'status': 'sucess', 'mssg': 'Delete Successfully'});
    }
  });
});

module.exports = agendaRoutes;
