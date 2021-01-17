import _ from 'lodash';

export class ExportAdapter {
  constructor(simData, simConfig, configs) {
    this.simData = simData;
    this.simConfig = simConfig;
    this.configs = configs;
  }

  run() {
    let csvs = {};
    console.log(this.configs);
    Object.keys(this.configs).forEach(config_id => {
      let arr = [];
      arr.push(Object.keys(this.simData));
      for (let i = 0; i < this.simData.time.length; i++) {
        let t = this.simData.time[i];
        let datas = Object.values(_.omit(this.simData, 'time'))
                          .map(col => col[config_id][i]);
        arr.push([t, ...datas]);
      };
      csvs[this.configs[config_id].name] = arr.map( row => row.join(",") ).join("\n");
    });
    return csvs;
  }
}