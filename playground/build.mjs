import path from "path";
import { bunPluginLess, bunPluginHtml, bunPluginSvg } from "../index.mjs";
import fs from "fs";

const ROOT_DIR = process.cwd();
const SOURCE_DIR = path.join(ROOT_DIR, "playground/source");
const OUT_DIR = path.join(ROOT_DIR, "playground/dist");
async function main() {
    // entry points
    const indexPath = path.join(SOURCE_DIR, "index.mjs");
    const userLoginPath = path.join(SOURCE_DIR, "user/login.mjs");
    // less plugin
    const BunPluginLess = bunPluginLess();
    // clear output dir
    fs.existsSync(OUT_DIR) && fs.rmdirSync(OUT_DIR, { recursive: true });
    // build
    const buildConfig = {
        entrypoints: [indexPath, userLoginPath],
        outdir: OUT_DIR,
        plugins: [BunPluginLess, bunPluginSvg()],
    };
    const { outputs } = await Bun.build(buildConfig);
    bunPluginHtml({
        templatePath: path.join(SOURCE_DIR, "template.html"),
        outputs,
        buildConfig,
    });
}
main();
