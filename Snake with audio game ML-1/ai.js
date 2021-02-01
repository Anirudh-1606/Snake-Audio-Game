// more documentation available at
// https://github.com/tensorflow/tfjs-models/tree/master/speech-commands

// the link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/EevwbGLwm/";

const UP_ARROW = 4;
const RIGHT_ARROW = 3;
const LEFT_ARROW = 2;
const DOWN_ARROW = 1;
function snakeController(direction = 0) {
  if (direction === LEFT_ARROW) {
    snake.setDir(-1, 0);
  } else if (direction === RIGHT_ARROW) {
    snake.setDir(1, 0);
  } else if (direction === DOWN_ARROW) {
    snake.setDir(0, 1);
  } else if (direction === UP_ARROW) {
    snake.setDir(0, -1);
  } else if (direction === 0) {
  } else {
    snake.grow();
  }
}

function getDirection(direction = 0) {
  if (direction === UP_ARROW) return "Up";
  if (direction === DOWN_ARROW) return "Down";
  if (direction === LEFT_ARROW) return "Left";
  if (direction === RIGHT_ARROW) return "Right";
  if (direction === 0) return "Waiting";
}

async function createModel() {
  const checkpointURL = URL + "model.json"; // model topology
  const metadataURL = URL + "metadata.json"; // model metadata

  const recognizer = speechCommands.create(
    "BROWSER_FFT", // fourier transform type, not useful to change
    undefined, // speech commands vocabulary feature, not useful for your models
    checkpointURL,
    metadataURL
  );

  // check that model and metadata are loaded via HTTPS requests.
  await recognizer.ensureModelLoaded();

  return recognizer;
}

async function init() {
  console.log("Called init");
  const recognizer = await createModel();
  const classLabels = recognizer.wordLabels(); // get class labels
  const labelContainer = document.getElementById("label-container");
  labelContainer.innerHTML = "Loading....";

  recognizer.listen(
    (result) => {
      console.log("listening");
      const scores = result.scores;
      const direction = scores.indexOf(Math.max(...scores));
      snakeController(direction);
      labelContainer.innerHTML = `You are moving ${getDirection(direction)}`;
    },
    {
      includeSpectrogram: true, // in case listen should return result.spectrogram
      probabilityThreshold: 0.75,
      invokeCallbackOnNoiseAndUnknown: true,
      overlapFactor: 0.5, // probably want between 0.5 and 0.75. More info in README
    }
  );
}
