// app.js

document.querySelectorAll('pre code').forEach((block) => {
    block.addEventListener('click', () => {
        const range = document.createRange();
        range.selectNodeContents(block);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            alert('Code copied to clipboard!');
        } catch (err) {
            alert('Failed to copy code.');
        }
    });
});
// Ensure that code block exists before attempting to copy
const copyButtons = document.querySelectorAll('.copy-btn');

// Add event listener to each button
copyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target'); // Get the target code block ID
        const codeBlock = document.getElementById(targetId);

        if (codeBlock) {
            // Create a temporary text area to copy the text content
            const tempTextArea = document.createElement('textarea');
            tempTextArea.value = codeBlock.textContent;  // Get the text content from the code block
            document.body.appendChild(tempTextArea);

            // Select and copy the text
            tempTextArea.select();
            try {
                document.execCommand('copy');

                // Update button text and show notification
                button.textContent = 'Copied!'; // Change button text
                
                // Reset button text back to "Copy" after 3 seconds
                setTimeout(() => {
                    button.textContent = 'Copy Code';
                }, 3000); // 3 seconds
            } catch (err) {
                alert('Failed to copy code.');
            }

            // Clean up
            document.body.removeChild(tempTextArea);
        } else {
            alert('Code block not found.');
        }
    });
});
