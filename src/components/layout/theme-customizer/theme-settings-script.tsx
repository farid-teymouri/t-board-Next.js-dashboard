export function ThemeSettingsScript() {
  const script = `
    (() => {
      try {
        const root = document.documentElement;

        const preset = localStorage.getItem("theme-preset");

        if (
          preset === "default" ||
          preset === "amber-minimal" ||
          preset === "amethyst-haze" ||
          preset === "bold-tech" ||
          preset === "bubblegum" ||
          preset === "caffeine"
        ) {
          root.setAttribute("data-theme", preset);
        } else {
          root.setAttribute("data-theme", "default");
        }

        const width = localStorage.getItem("theme-width");

        if (width === "container" || width === "fluid") {
          root.setAttribute("data-theme-width", width);
        } else {
          root.setAttribute("data-theme-width", "container");
        }

        const orientation = localStorage.getItem(
          "theme-menu-orientation",
        );

        if (orientation === "horizontal" || orientation === "vertical") {
          root.setAttribute("data-menu-orientation", orientation);
        } else {
          root.setAttribute("data-menu-orientation", "vertical");
        }
      } catch {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
