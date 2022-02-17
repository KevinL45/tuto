exports.success = function(result){
    return{
        status : 'success',
        result: result
    }
}

exports.error = function(error){
    return{
        status : 'error',
        error : error
    }
}