"use client";

import { useEffect } from "react";

function DynamicFavicon() {
  useEffect(() => {
    async function fetchFavicon() {
      try {
        const res = await fetch(
          "https://vloo.lamptechs.com/api/v1/public/website-setting/list",
        );
        if (!res.ok) throw new Error("Failed to fetch favicon");

        const data = await res.json();
        const favIcon =
          data?.data?.[0]?.upload_logos?.[0]?.file_url || "/assets/favicon.ico";

        // Update the favicon dynamically
        let link =
          document.querySelector("link[rel~='icon']") ||
          document.createElement("link");
        link.rel = "icon";
        link.href = favIcon;
        link.sizes = "32x32";
        link.type = "image/png";
        document.head.appendChild(link);
      } catch (error) {
        console.error("Error fetching favicon:", error);
      }
    }

    fetchFavicon();
  }, []);

  return null;
}

export default DynamicFavicon;
