document.getElementById("speakButton").addEventListener("click", function () {
    startRecognition();
});

function startRecognition() {
    if (!("webkitSpeechRecognition" in window)) {
        alert("Speech Recognition is not supported in this browser. Please use Chrome.");
        return;
    }

    let recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = function (event) {
        let speechResult = event.results[0][0].transcript.toLowerCase();
        console.log("User Said:", speechResult);

        // Replace common words with mathematical symbols
        speechResult = speechResult.replace(/plus/g, "+")
                                   .replace(/minus/g, "-")
                                   .replace(/into/g, "*")
                                   .replace(/multiplied by/g, "*")
                                   .replace(/divided by/g, "/")
                                   .replace(/equals to|equals/g, "=")
                                   .replace(/times/g, "*");

        document.getElementById("result").value = speechResult;

        try {
            if (speechResult.includes("=")) {
                speechResult = speechResult.split("=")[0].trim();
            }
            let output = eval(speechResult);
            if (!isNaN(output)) {
                document.getElementById("result").value += " = " + output;
                document.getElementById("errorMessage").innerText = "";
            } else {
                throw new Error("Invalid Calculation!");
            }
        } catch (error) {
            document.getElementById("errorMessage").innerText = "Invalid Calculation!";
        }
    };

    recognition.onerror = function (event) {
        console.log("Error occurred:", event.error);
        document.getElementById("errorMessage").innerText = "Error recognizing speech. Try again!";
    };
}
