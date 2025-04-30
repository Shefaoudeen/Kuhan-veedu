const imageAssets = [
    '../assets/Solution images/UI UX.webp',
    '../assets/Solution images/Apps.webp',
    '../assets/Solution images/CMS.webp',
    '../assets/Solution images/Softwares.webp',
    '../assets/Solution images/AI ML.webp',
]

const fontAssets = [
    {
      name: "Aboreto",
      url: "/fonts/Aboreto-Regular.ttf",
      descriptors: { style: "normal", weight: "400" },
    },
    {
      name: "Garet",
      url: "/fonts/fonnts.com-garet-book.otf",
      descriptors: { style: "normal", weight: "400" },
    },
    {
      name: "Lato",
      url: "/fonts/Lato-Regular.ttf",
      descriptors: { style: "normal", weight: "400" },
    },
  ];
  

export const preloadAssets = async () => {
    const imagePromises = imageAssets.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Don't block on errors
        })
    );

    const fontPromises = fontAssets.map(({ name, url, descriptors }) => {
      const font = new FontFace(name, `url(${url})`, descriptors);
      return font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
      });
    });

    await Promise.all([...imagePromises, ...fontPromises]);
  };


  export const goToContact = () => {
    const contactSection = document.getElementById("connect");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }