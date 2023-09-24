Harpa.js Script Usage Guide

This guide provides a detailed explanation of the harpa.js script, which is a Node.js script that uses Puppeteer to automate browser interactions.

Overview

The harpa.js script performs the following actions:

1. Opens a Google Chrome instance with remote debugging enabled.
2. Connects to this Chrome instance using Puppeteer.
3. Navigates to a specific webpage.
4. Triggers a series of keyboard actions to interact with the webpage.
5. Retrieves and prints the output from the webpage.

Detailed Steps

1. Load Environment Variables: The script starts by loading environment variables from a .env file using the dotenv package. This file should contain the CHROME_URL variable, which specifies the remote debugging URL of the Chrome instance.

2. Open Chrome Instance: The script opens a Google Chrome instance with remote debugging enabled. This is done using the child_process module's exec function.

3. Wait for Chrome to Open: The script waits for 5 seconds to ensure that the Chrome instance has opened before proceeding.

4. Connect to Chrome Instance: The script connects to the Chrome instance using Puppeteer's connect function. The browserURL option is set to the CHROME_URL environment variable.

5. Open New Page: The script opens a new page in the Chrome instance.

6. Navigate to Webpage: The script navigates to a specific webpage. In this case, it navigates to a page on the 'Towards Data Science' website.

7. Wait for Page to Load: The script waits for the page to load by waiting for a specific element to be present. In this case, it waits for the 'body' element.

8. Trigger Keyboard Actions: The script triggers a series of keyboard actions to interact with the webpage. These actions include pressing the 'Control' and 'A' keys, typing a command, and pressing the 'Enter' key.

9. Wait for Output: The script waits for 20 seconds for the output to become available.

10. Retrieve and Print Output: The script retrieves the output from the webpage by reading from the clipboard using the clipboardy package. It then prints this output.

Running the Script

To run the script, use the following command:
node harpa.js