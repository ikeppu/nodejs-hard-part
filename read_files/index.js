const fs = require('fs');

const content = fs.readFileSync('./text.txt');

console.log('[TYPEOF]:[TEXT.TXT] ----:>', typeof content);
console.log('[TYPEOF]:[TEXT.TXT]:[TO_STRING] ----:>', content.toString());

// C:\Work\as_projects\node_hard_parts\read_files\my-test.txt
