import controller from "../data/controller"

let chatAPi = {
    getMessages: function (cb){

        controller.getMessages( function (results){
            console.log(results);
            const len = results.length;
            for (let i = 0; i<len; i++) {
                var comment = results[i].comments.toString('utf-8')
                results[i].comments = comment;
            }
            console.log(results)
            cb(results);
        })
    },
    getBlogs : function (cb){

        controller.getBlogs (function (results){
            console.log(results);

        })

    },

    postBlog : function ( username, comments, cb){
        controller.postComment(username, comments, function(results) {
            console.log(" in post api" + results);
            cb(results);
        })


    }

}


export default chatAPi;