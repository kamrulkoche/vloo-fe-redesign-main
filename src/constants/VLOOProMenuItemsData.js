const VLOOProMenuItemsData = [
  {
    label: "How it works",
    link: "#how-it-works",
    hasDropdown: false,
  },
  {
    label: "ROI",
    link: "/pro/roi",
    hasDropdown: false,
  },
  {
    label: "Why VLOO",
    link: "/pro/why-vloo",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "What you get",
        subtext: "What you get subtext",
        link: "/pro/why-vloo",
      },
      {
        label: "Our story",
        subtext: "Our story subtext",
        link: "/pro/why-vloo#about",
      },
      { label: "FAQ", subtext: "FAQ subtext", link: "/pro/faq" },
    ],
  },
  {
    label: "Resources",
    link: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Help", subtext: "Help subtext", link: "/pro/help" },
      { label: "News", subtext: "News subtext", link: "/pro/news" },
    ],
  },
];

export default VLOOProMenuItemsData;
