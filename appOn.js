// Note for myself: the (      ) surrounding the whole function declares it as an expression. "Functions defined as expressions can be immediately executed."
(function() {
    // Apply filter to the entire HTML document
    document.querySelector("html").style.filter = "invert(1) hue-rotate(180deg)";

    // Applies filter to all images, pictures, and videos
    let media = document.querySelectorAll("img, picture, video");

    media.forEach((mediaItem) => { 
        mediaItem.style.filter = "invert(1) hue-rotate(180deg)";
    });
})(); // Note for myself: the () triggers the function to run immediately after it’s defined