const fs = require('fs');

// Specify the path to your JSON file
const filePath = './config.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    //if it is not able to read the json
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // process the JSON data
    for (let i = 0; i < jsonData.files.length; i++) {
      try {
        const fileContent = await readThisFile(jsonData.files[i]);
        console.log(jsonData.files[i],':', countWords(fileContent));
      } catch (error) {
        console.error(`Error reading file ${jsonData.files[i]}: ${error.message}`);
      }
    }
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});

const { readFile } = require('fs/promises');
//the function the read the content of a file
async function readThisFile(filePath) {
  try {
    const data = await readFile(filePath, 'utf8');
    return data;
  } catch (error) {
    throw error; // Re-throw the error to handle it in the calling function
  }
}

//the function that raeturs the number of words in a string
function countWords(inputString){
  //split the string into words
  const wordsArray = inputString.split(/\b/);
  // Filter out empty strings and special characters from the array
  const filteredArray= wordsArray.filter((words)=>{
    // Keep words that contain at least one letter or digit
    return /[a-zA-Z0-9]/.test(words);
  });
  // Return the number of words
  return filteredArray.length;
}