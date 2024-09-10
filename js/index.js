console.log("This is my script");

// Ensure variables are correctly selected from the DOM
const submitBtn = document.getElementById("submitBtn");
const resultCont = document.getElementById("resultCont");

// Event listener for the submit button
submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("Clicked!");
    resultCont.innerHTML = '<img width="123" src="img/loading.svg" alt="Loading...">';

    // Your API key and email
    const key = "ema_live_VWGUarckGz62xF2Z1NxIVEOJWjRRWD1Obpt757e6";
    const email = document.getElementById("username").value.trim(); // Trim any whitespace

    // Construct URL with template literals
    const url = `https://api.emailvalidation.io/v1/info?apikey=${key}&email=${email}`;

    try {
        // Fetch data from API
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
        }

        const data = await res.json();
        let str = '';

        // Iterate over the keys of the result object and create HTML content
        for (const key of Object.keys(data)) {
            if (data[key] !== "" && data[key] !== " ") { // Use data[key] instead of result[key]
                str += `<div>${key}: ${data[key]}</div>`;
            }
        }

        console.log(str);
        resultCont.innerHTML = str;
    } catch (error) {
        console.error('Error fetching data:', error);
        resultCont.innerHTML = `<div>Error: ${error.message}</div>`;
    }
});
