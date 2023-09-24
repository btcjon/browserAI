require('dotenv').config();
const puppeteer = require('puppeteer');
const { spawn } = require('child_process');

(async () => {
  const clipboardy = await import('clipboardy');
    
  
  // Open the Chrome application that has  --args --remote-debugging-port=9222 flag
  const { exec } = require('child_process');
  exec('open /Applications/Google\\ Chrome.app --args --remote-debugging-port=9222', (error) => {
    if (error) {
      console.error('Failed to open Chrome:', error);
      return;
    }
  });

  // Wait for the chrome to open
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  // Connect to the existing Chrome instance
  const browser = await puppeteer.connect({
    browserURL: process.env.CHROME_URL, // Replace with your Chrome instance's remote debugging URL
    defaultViewport: null, // Use the default viewport size
  });

  // Open a new page
  const page = await browser.newPage();

  // Navigate to the desired website
  await page.goto('https://towardsdatascience.com/fine-tuning-large-language-models-llms-23473d763b91', { waitUntil: 'networkidle0' });

  // Wait for a specific element to load before sending the command
  // Replace 'selector' with a selector for an element that you know will be present when the page has loaded
  await page.waitForSelector('body');

  // Trigger opening Harpa
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');

  // Wait for the Harpa popup to open
  await page.waitForTimeout(4000);

  // Type the text
  await page.keyboard.type('-p please give me 2 sentence summary');

  // Press the Enter key
  await page.keyboard.press('Enter');

  // Wait for the output to become available
  await page.waitForTimeout(20000);

  /* // Start the Python script to click the "Allow" button
  const python = spawn('python3', ['./harpa_click_allow.py']);

  // Handle output from the Python script
python.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Handle errors from the Python script
python.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Handle the Python script's exit event
python.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
  
  // Wait for the allow button to be clicked
  await page.waitForTimeout(1000); */

  // Press the Command+Shift+C keys
  await page.keyboard.down('Shift');
  await page.keyboard.down('Meta');
  await page.keyboard.press('KeyC');
  await page.keyboard.up('Meta');
  await page.keyboard.up('Shift');

  // Wait for the output to become available
  await page.waitForTimeout(1000);

  // Retrieve and print the output
  try {
    const output = clipboardy.default.readSync(); // Use clipboardy to read from the clipboard
    console.log(output);
  } catch (error) {
    console.error('Failed to read from clipboard:', error);
  }
  

  // Wait for a few seconds before closing the browser
  //await page.waitForTimeout(3000);
  // Close the browser
  //await browser.close();
})();