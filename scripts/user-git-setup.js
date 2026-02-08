
const { execSync } = require('child_process');
const fs = require('fs');

try {
    // 1. Append to README (or create)
    try {
        fs.appendFileSync('README.md', '\n# -Textiles-website');
        console.log('Updated README.md');
    } catch (e) {
        console.error('Failed to update README:', e);
    }

    // 2. Git Init
    try {
        execSync('git init');
        console.log('Git initialized');
    } catch (e) {
        console.log('Git init skipped/failed');
    }

    // 3. Add files (Doing . instead of just README to save the project)
    execSync('git add .');
    console.log('Files staged');

    // 4. Commit
    try {
        execSync('git commit -m "first commit"');
        console.log('Committed');
    } catch (e) {
        console.log('Nothing to commit or commit failed');
    }

    // 5. Branch
    execSync('git branch -M main');

    // 6. Remote
    const remoteUrl = 'https://github.com/sarveshwarans23cse-ctrl/-Textiles-website.git';
    try {
        execSync(`git remote add origin ${remoteUrl}`);
        console.log('Remote added');
    } catch (e) {
        try {
            execSync(`git remote set-url origin ${remoteUrl}`);
            console.log('Remote URL updated');
        } catch (err) {
            console.error('Failed to set remote:', err.message);
        }
    }

    // 7. Push
    console.log('Attempting push...');
    execSync('git push -u origin main');
    console.log('Push successful!');

} catch (error) {
    console.error('Operation failed:', error.message);
    if (error.message.includes('403') || error.message.includes('Permission denied')) {
        console.log('AUTH_ERROR_DETECTED');
    }
}
