const userInfo = async (userId, appInstance)=>{
    
    const user = appInstance.client.users.info({
        "user": userId
    });

    return user;

};

exports.userInfo = userInfo;