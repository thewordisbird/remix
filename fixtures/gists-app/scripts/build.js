const path = require("path");
const { build, readConfig, BuildTarget } = require("@remix-run/core");

const remixRoot = path.resolve(__dirname, "..");

async function run() {
  console.log("building gists-app fixture...");

  let config = await readConfig(remixRoot);

  let [serverBuild, browserBuild] = await Promise.all([
    build(config, { target: BuildTarget.Server }),
    build(config, { target: BuildTarget.Browser })
  ]);

  // let { output } = await serverBuild.generate({
  //   format: "cjs",
  //   exports: "named"
  // });

  // console.log({ names: output.map(item => item.name) });
  // // console.log({ keys: Object.keys(output) });
  // process.exit();

  await serverBuild.write({
    dir: config.serverBuildDirectory,
    format: "cjs",
    exports: "named"
  });

  await browserBuild.write({
    dir: config.browserBuildDirectory,
    format: "esm"
  });

  console.log("done!");
}

run();