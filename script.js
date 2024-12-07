// Function to set the background color based on the current theme
function setBackgroundColorBasedOnTheme() {
    // Check if the user's system is set to dark mode or light mode
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply background color based on the mode
    if (isDarkMode) {
        document.body.style.backgroundColor = '#2E2E2E';  // Dark background for dark mode
        document.body.style.color = '#FFFFFF';  // Light text color for dark mode
    } else {
        document.body.style.backgroundColor = '#FFFFFF';  // Light background for light mode
        document.body.style.color = '#000000';  // Dark text color for light mode
    }
}

// Call the function on page load to set the initial background color
setBackgroundColorBasedOnTheme();

// Listen for changes in the system's color scheme preference and update the background color accordingly
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setBackgroundColorBasedOnTheme();
});
