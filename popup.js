const btn = document.querySelector('.changeColorBtn');
const colorGrid = document.querySelector('.colorGrid');
const colorValue = document.querySelector('.colorValue');

// extension popup tab + (console)
btn.addEventListener('click', async () => {
   
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // executeScript => to inject script in any tab
    chrome.scripting.executeScript( {
        target: { tabId: tab.id },
        function: pickColor,
    },
    async (injectionResults) => {
        const [data] = injectionResults;

        if(data.result) {
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color; // show color 
            colorValue.innerText = color; // show hex code

            // copy hex code to clipboard
            try {
                await navigator.clipboard.writeText(color);
            }
            catch(err) {
                console.log(err);
            }
        }

        console.log(colorGrid);
    });
})

// this function run in the web tabs (output in console)
async function pickColor() {
    try {
        // EyeDropper api from browser
        const eyeDropper = new EyeDropper();
        return await eyeDropper.open(); // return selected color      
    }
    catch(err) {
        console.error(err);
    }
  
}
