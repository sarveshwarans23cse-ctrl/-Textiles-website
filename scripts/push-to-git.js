
try {
    const { execSync } = require('child_process');

    // Configure git if needed (using generic name since it's a script)
    try {
        execSync('git config user.name "AI Assistant"');
        execSync('git config user.email "ai@assistant.com"');
    } catch (e) { }

    // Initialize if not already
    try {
        execSync('git init');
    } catch (e) {
        console.log('Git init failed or already initialized');
    }

    // Add all files
    execSync('git add .');

    // Commit
    try {
        execSync('git commit -m "Initial commit with full project structure"');
    } catch (e) {
        console.log('Nothing to commit');
    }

    // Add remote
    try {
        execSync('git remote add origin https://github.com/sarveshwarans23cse-ctrl/-Textiles-website.git');
    } catch (e) {
        try {
            execSync('git remote set-url origin https://github.com/sarveshwarans23cse-ctrl/-Textiles-website.git');
        } catch (e) {
            console.log('Remote configuration failed');
        }
    }

    // Push
    // Note: This might fail if the user is not authenticated in their terminal.
    // We can't interactively authenticate, so we'll try to push.
    execSync('git branch -M main');
    execSync('git push -u origin main');

    console.log('Push command executed.');

} catch (error) {
    console.error('Git operation failed:', error.message);
}
