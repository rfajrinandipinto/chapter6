/**
 * @file contains request handler of post resource
 * @author Fikri Rahmat Nurhidayat
 */
 const carService = require("../../../services/carService");

 module.exports = {
   list(req, res) {
     carService
       .list()
       .then(({ data, count }) => {
         res.status(200).json({
           status: "success",
           message: "get cars data successfully",
           data: { cars: data },
           meta: { total: count },
         });
       })
       .catch((err) => {
         res.status(400).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   create(req, res) {
     carService
       .create({
        ...req.body,
        createdBy: req.user.id,
        lastupdateby : req.user.id
       })
       .then((car) => {
         res.status(201).json({
           status: "success",
           message: "insert car data successfully",
           data: req.body,
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   update(req, res) {
     carService
       .update(req.params.id, req.body)
       .then(() => {
         res.status(200).json({
          status: "success",
          message: "updated car data successfully",
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   show(req, res) {
     carService
       .get(req.params.id)
       .then((car) => {
         res.status(200).json({
           status: "success",
           message: "get car data successfully",
           data: car,
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 
   destroy(req, res) {
     carService
       .delete(req.params.id)
       .then(() => {
         res.status(200).json({
          status: "success",
          message: "deleted car data successfully",
         });
       })
       .catch((err) => {
         res.status(422).json({
           status: "FAIL",
           message: err.message,
         });
       });
   },
 };
 