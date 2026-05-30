const { AppConfigDataClient, StartConfigurationSessionCommand, GetLatestConfigurationCommand } = require("@aws-sdk/client-appconfigdata");

const client = new AppConfigDataClient({ region: "eu-north-1" });

let sessionToken = null;
let cachedConfig = {
  maintenance_mode: false,
  show_new_banner: false
};

async function startSession() {
  const command = new StartConfigurationSessionCommand({
    ApplicationIdentifier: "CodeDynasty",
    EnvironmentIdentifier: "Production",
    ConfigurationProfileIdentifier: "CodeDynastyConfig",
  });
  const response = await client.send(command);
  sessionToken = response.InitialConfigurationToken;
}

async function refreshConfig() {
  try {
    if (!sessionToken) await startSession();

    const command = new GetLatestConfigurationCommand({
      ConfigurationToken: sessionToken,
    });

    const response = await client.send(command);
    sessionToken = response.NextPollConfigurationToken;

    // ✅ fixed — check before converting
    if (response.Configuration && response.Configuration.length > 0) {
      const text = Buffer.from(response.Configuration).toString("utf-8");
      if (text) {
        cachedConfig = JSON.parse(text);
        console.log("🔄 Config refreshed:", cachedConfig);
      }
    }
  } catch (err) {
    console.error("⚠️ AppConfig failed, using cached config:", err.message);
  }
}

function getConfig() {
  return cachedConfig;
}

module.exports = { refreshConfig, getConfig };