const getInteractorMatches = (fdaString, query) => {
  /* Remove reference numbers, everything inside ()'s, and numbers inside ()'s,
    but leave words inside ()'s.
     */
  const cleanedFdaString = fdaString.replace(
    /(\[.*?\])|(\([^a-z].*?\))|(\s\d\.\d*?\s)|(^\d)/g,
    ""
  );

  const sentences = cleanedFdaString.split(/(\.)([^e.g.,])/g);
  const foundSentences = [];

  sentences.array.forEach((sentence) => {
    foundSentences.push(sentence.trim() + ".");
  });
  return foundSentences;
};

module.exports = getInteractorMatches;
