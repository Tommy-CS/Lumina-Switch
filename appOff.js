(function() {
    // Apply filter to the entire HTML document
    document.querySelector("html").style.filter = "invert(0) hue-rotate(0deg)";

    // Applies filter to all images, pictures, and videos
    let media = document.querySelectorAll("img, picture, video");

    media.forEach((mediaItem) => { 
        mediaItem.style.filter = "invert(0) hue-rotate(0deg)";
    });
})();
