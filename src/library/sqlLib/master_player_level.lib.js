class master_player_level {   
    async getMaster_player_levelDetail(whereClause) {
      return await SQLManager.findOne("master_player_level", whereClause);
    }
  
    async getMaster_player_levelList(whereClause) {
      return await SQLManager.find("master_player_level", whereClause);
    }
  
    async updateMaster_player_level(whereClause, updateData) {
      return await SQLManager.update("master_player_level", whereClause, updateData);
    }
  
    async createMaster_player_level(master_player_levelObj) {
      return await SQLManager.insert("master_player_level", master_player_levelObj);
    }
  
    async getCustomMaster_player_levelData(xp) {
      return await SQLManager.doExecuteRawQuery(`SELECT * FROM master_player_level WHERE xp_requirement<=${xp} order by xp_requirement desc`);
    }
  }
  
  module.exports = new master_player_level;