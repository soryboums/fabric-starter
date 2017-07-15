/**
 * Created by maksim on 7/13/17.
 */
"use strict";

/**
 * @param {function(err:Error, req:Request, res:Response)} [errorReporter]
 * @returns {expressPromise}
 */
module.exports = function(errorReporter){
    errorReporter = errorReporter || reportErrorDefault;
    return function expressPromise(req, res, next){

        /*
           Report error
           You can use it in several ways:
           - promise.catch() from promise
           - res.error(new Error())  - pass any error object
           - res.error({status:401, message:'alala'})  - pass any object
           - res.error(401, 'alala')  - pass code and message separately
           - res.error('alala')  - pass only message.
           */
        res.error = (err, msg)=>{
          if(err === 401){
            err = {status:401, message: msg || 'Unauthorized'};
          }else if(typeof err === 'number' && typeof msg === 'string'){
            err = {status:err, message: msg};
          }
          errorReporter(err, req, res);
        };

        // add res.promise(<promise>) to easy handle promises
        res.promise = (promise)=>{
          return promise.then(data=>res.send(data)).catch(res.error);
        };
        next();
    };
};

/**
 *
 */
function reportErrorDefault(err, req, res){
    let status = err.status || err.statusCode || 500;
    let message = err.message || err.description || err || 'Unknown error';
    res.status(status).send({ok:false, message:message});

    console.error('Request failed: %s %s:', req.method.toUpperCase(), req.url, message );
    if(err.stack){
        console.error(err.stack);
    }
}