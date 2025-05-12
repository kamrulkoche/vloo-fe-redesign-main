const MainMenuItemsData = [
  {
    label: "How it works",
    link: "#how-it-works",
    hasDropdown: false,
  },
  {
    label: "Find your workspace",
    link: "/work-space",
    hasDropdown: false,
  },
  {
    label: "Why VLOO",
    link: "/why-vloo",
    hasDropdown: true,
    dropdownItems: [
      {
        label: "What you get",
        subtext: "What you get subtext",
        link: "/why-vloo",
      },
      {
        label: "Our story",
        subtext: "Our story subtext",
        link: "/why-vloo#about",
      },
      { label: "FAQ", subtext: "FAQ subtext", link: "/faq" },
    ],
  },
  {
    label: "Resources",
    link: "#",
    hasDropdown: true,
    dropdownItems: [
      { label: "Help", subtext: "Help subtext", link: "/help" },
      { label: "Blog", subtext: "Blog subtext", link: "/blogs" },
    ],
  },
];

export default MainMenuItemsData;
