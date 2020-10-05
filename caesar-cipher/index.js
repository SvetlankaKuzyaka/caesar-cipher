const minimist = require("minimist");
const fs = require("fs");
const path = require("path");
const cipher = require("./cipher");
const { Transform, pipeline } = require("stream");
const { isInvalidArguments } = require("./utils");

const checkFileAccess = (path, mode) => {
  try {
    fs.accessSync(path, mode);
  } catch (error) {
    console.error(
      `${
        mode === fs.constants.R_OK
          ? "Input file is not readable"
          : "Output file is not writable"
      }`
    );
    process.exit(1);
  }
};

const { shift, action, input, output } = minimist(process.argv.slice(2), {
  alias: { shift: "s", action: "a", input: "i", output: "o" },
  unknown: (arg) => {
    console.error("Unknown option: ", arg);
    process.exit(1);
  },
});

if (isInvalidArguments(action, shift)) {
  console.error("Wrong `shift` and/or `action` arguments");
  process.exit(1);
}

const inputFilePath = input ? path.resolve(__dirname, input) : "";
const outputFilePath = output ? path.resolve(__dirname, output) : "";

if (input) checkFileAccess(inputFilePath, fs.constants.R_OK);
if (output) checkFileAccess(outputFilePath, fs.constants.W_OK);

const readStream = inputFilePath
  ? fs.createReadStream(inputFilePath)
  : process.stdin;
const writeStream = outputFilePath
  ? fs.createWriteStream(outputFilePath, { flags: "a" })
  : process.stdout;

const transformStream = new Transform({
  transform: (chunk, _, callback) => {
    const transformed = cipher(action, shift, chunk.toString());
    callback(null, transformed);
  },
});

pipeline(readStream, transformStream, writeStream, (error) => {
  if (error) {
    console.error(error.message);
    process.exit(1);
  }
});
