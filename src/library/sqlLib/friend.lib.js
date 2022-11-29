const SQLManager = require('@njs2/sql');

class friend {
    async getFriendDetail(whereClause) {
        return await SQLManager.findOne('friend', whereClause);
    }

    async getFriendList(whereClause) {
        return await SQLManager.find('friend', whereClause);
    }

    async updateFriend(whereClause, updateData) {
        return await SQLManager.update('friend', whereClause, updateData);
    }

    async createFriend(friendObj) {
        return await SQLManager.insert('friend', friendObj);
    }

    async getFriends(userId, otherUserId) {
        const result = await SQLManager.doExecuteRawQuery(`
    SELECT * 
    FROM friend 
    WHERE (user_id = ${userId} and other_user_id = ${otherUserId}) 
      OR (user_id = ${otherUserId} and other_user_id =${userId})
    `);
        return result[0][0];
    }
}


module.exports = new friend;