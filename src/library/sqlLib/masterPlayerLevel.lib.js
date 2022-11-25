class masterPlayerLevel {
    async getMasterPlayerLevelDetail(whereClause) {
        return await SQLManager.findOne('master_player_level', whereClause);
    }

    async getMasterPlayerLevelList(whereClause) {
        return await SQLManager.find('master_player_level', whereClause);
    }

    async updateMasterPlayerLevel(whereClause, updateData) {
        return await SQLManager.update('master_player_level', whereClause, updateData);
    }

    async createMasterPlayerLevel(master_player_levelObj) {
        return await SQLManager.insert('master_player_level', master_player_levelObj);
    }

    async getPlayerLevel(xp) {
        const result = await SQLManager.doExecuteRawQuery(`
      SELECT * 
      FROM master_player_level 
      WHERE xp_requirement<=${xp} 
      ORDER BY xp_requirement desc
      `);
        return result[0][0];
    }
}

module.exports = new masterPlayerLevel;