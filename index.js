var TDXApi = require("nqm-api-tdx");

const config = {
          commandHost: "https://cmd.nq-m.com",
          queryHost: "https://q.nq-m.com"
        };
const api = new TDXApi(config);

const instanceData = {
    name: "Testing Scenario Generator",
    shareKeyId: "SklzMJbZC",
    shareKeySecret: "12345",
    authTokenTTL: 3600,
    chunks: 1,
    inputs: {
    basePopId: "SJxzMvRIye",
    countyId: "E10000014",
    folderId: "SyxpDitmA",
    mappingId: "SkxyHi_MR",
    targetFolder: "SyxpDitmA",
    targetName: "Scenario Poplets"
    }
};  

const getInstanceState = (instanceId) => {
    api.getDatabotInstance(instanceId, (err, statusResult) => {
      if (err) console.log("Could not get progress: ", err);
      else {
        console.log(statusResult);
        setTimeout(() => {getInstanceState(instanceId)}, 10000);
      }
    });
}

api.authenticate("SklzMJbZC","12345", (err, accessToken) => {

  if (err) console.log("Failed to authenticate");

  else {

    api.startDatabotInstance("HylJPJ4vex", instanceData, (err, startResult) => {

        if (err) console.log(err);

        else {

            console.log("started databot instance id is %s", startResult.response.instanceId);
            setTimeout(() => {getInstanceState(startResult.response.instanceId)}, 10000);
       
        }
    });

  }
});