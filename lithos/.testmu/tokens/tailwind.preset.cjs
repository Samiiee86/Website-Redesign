/* TestMu DS Tailwind v3 preset v1.0.0. Generated from tokens.json.
   It REPLACES Tailwind's default colors, spacing, type and radius, so classes outside the TestMu system
   simply don't exist. Use: module.exports = { presets: [require('./.testmu/tokens/tailwind.preset.cjs')], content: [...] } */
module.exports = {
  "theme": {
    "colors": {
      "transparent": "transparent",
      "current": "currentColor",
      "inherit": "inherit",
      "black": "#121212",
      "white": "#FFFFFF",
      "gray": {
        "0": "#F5F4F0",
        "100": "#E7E6DF",
        "200": "#D3D2CD",
        "300": "#B8B7B4",
        "400": "#9D9D9D",
        "500": "#7F7F7E",
        "600": "#5F5E5E",
        "700": "#4D4D4D",
        "800": "#242424",
        "900": "#121212"
      },
      "blue": {
        "0": "#EEF2FF",
        "100": "#D8E1FF",
        "200": "#B8C8FF",
        "300": "#98AEFE",
        "400": "#5273EC",
        "500": "#1742DF",
        "600": "#1637B3",
        "700": "#1433A4",
        "800": "#10287F",
        "900": "#0B1B58"
      },
      "red": {
        "0": "#FFEBE9",
        "100": "#FFCECB",
        "200": "#FFABA8",
        "300": "#FF8182",
        "400": "#FA4549",
        "500": "#CF222E",
        "600": "#A40E26",
        "700": "#82071E",
        "800": "#660018",
        "900": "#4C0014"
      },
      "green": {
        "0": "#DAFBE1",
        "100": "#ACEEBB",
        "200": "#6FDD8B",
        "300": "#4AC26B",
        "400": "#2DA44E",
        "500": "#1A7F37",
        "600": "#116329",
        "700": "#044F1E",
        "800": "#003D16",
        "900": "#002D11"
      },
      "orange": {
        "0": "#FFF1E5",
        "100": "#FFD8B5",
        "200": "#FFB77C",
        "300": "#FB8F44",
        "400": "#E16F24",
        "500": "#BC4C00",
        "600": "#953800",
        "700": "#762C00",
        "800": "#5C2200",
        "900": "#471700"
      },
      "bg": {
        "DEFAULT": "#F5F4F0",
        "muted": "#E7E6DF",
        "fill": "#EEEDE7",
        "surface": "#FFFFFF",
        "inverse": "#121212",
        "inverse-muted": "#242424",
        "accent": "#1742DF",
        "accent-muted": "#EEF2FF"
      },
      "fg": {
        "DEFAULT": "#121212",
        "muted": "#4D4D4D",
        "subtle": "#7F7F7E",
        "disabled": "#4D4D4DB8",
        "inverse": "#FFFFFF",
        "inverse-muted": "#B8B7B4",
        "link": "#1742DF",
        "success": "#1A7F37",
        "error": "#CF222E"
      },
      "border": {
        "DEFAULT": "#D3D2CD",
        "muted": "#E7E6DF",
        "frame": "#DDDCD6",
        "emphasis": "#121212"
      },
      "button": {
        "primary": "#121212",
        "primary-hover": "#3C3C3C",
        "primary-disabled": "#5F5E5E",
        "secondary": "#FFFFFF",
        "secondary-hover": "#E7E6DF"
      },
      "segment": {
        "hover": "#DBDAD2"
      },
      "hero": {
        "arrow": "#ED5F00"
      }
    },
    "fontFamily": {
      "sans": [
        "'Manrope', system-ui, -apple-system, sans-serif"
      ],
      "mono": [
        "'Space Mono', ui-monospace, SFMono-Regular, monospace"
      ],
      "pixel": [
        "'Geist Pixel', 'Manrope', sans-serif"
      ]
    },
    "fontSize": {
      "xs": [
        "12px",
        {
          "lineHeight": "18px"
        }
      ],
      "sm": [
        "14px",
        {
          "lineHeight": "22px"
        }
      ],
      "base": [
        "16px",
        {
          "lineHeight": "24px"
        }
      ],
      "lg": [
        "18px",
        {
          "lineHeight": "28px"
        }
      ],
      "xl": [
        "24px",
        {
          "lineHeight": "32px"
        }
      ],
      "2xl": [
        "32px",
        {
          "lineHeight": "40px"
        }
      ],
      "3xl": [
        "48px",
        {
          "lineHeight": "58px"
        }
      ],
      "4xl": [
        "56px",
        {
          "lineHeight": "64px"
        }
      ],
      "5xl": [
        "56px",
        {
          "lineHeight": "64px"
        }
      ],
      "h1": [
        "56px",
        {
          "lineHeight": "64px",
          "letterSpacing": "-2px",
          "fontWeight": "500"
        }
      ],
      "h2": [
        "48px",
        {
          "lineHeight": "58px",
          "letterSpacing": "-2px",
          "fontWeight": "500"
        }
      ],
      "h3": [
        "32px",
        {
          "lineHeight": "40px",
          "letterSpacing": "-1px",
          "fontWeight": "500"
        }
      ],
      "h4": [
        "24px",
        {
          "lineHeight": "32px",
          "letterSpacing": "-1px",
          "fontWeight": "500"
        }
      ],
      "h5": [
        "18px",
        {
          "lineHeight": "26px",
          "letterSpacing": "-0.5px",
          "fontWeight": "500"
        }
      ],
      "h6": [
        "14px",
        {
          "lineHeight": "22px",
          "letterSpacing": "0px",
          "fontWeight": "500"
        }
      ],
      "h7": [
        "12px",
        {
          "lineHeight": "18px",
          "letterSpacing": "0px",
          "fontWeight": "500"
        }
      ],
      "b1": [
        "18px",
        {
          "lineHeight": "28px",
          "letterSpacing": "0px",
          "fontWeight": "400"
        }
      ],
      "b2": [
        "16px",
        {
          "lineHeight": "24px",
          "letterSpacing": "0px",
          "fontWeight": "400"
        }
      ],
      "b3": [
        "14px",
        {
          "lineHeight": "22px",
          "letterSpacing": "0px",
          "fontWeight": "400"
        }
      ],
      "b4": [
        "12px",
        {
          "lineHeight": "18px",
          "letterSpacing": "0px",
          "fontWeight": "400"
        }
      ],
      "b5": [
        "10px",
        {
          "lineHeight": "14px",
          "letterSpacing": "0px",
          "fontWeight": "400"
        }
      ]
    },
    "fontWeight": {
      "light": "300",
      "normal": "400",
      "medium": "500",
      "semibold": "600"
    },
    "spacing": {
      "px": "1px",
      "0": "0px",
      "0.5": "2px",
      "1": "4px",
      "1.5": "6px",
      "2": "8px",
      "3": "12px",
      "4": "16px",
      "5": "20px",
      "6": "24px",
      "7": "28px",
      "8": "32px",
      "10": "40px",
      "11": "44px",
      "12": "48px",
      "14": "56px",
      "16": "64px",
      "18": "72px",
      "20": "80px",
      "24": "96px",
      "28": "112px",
      "32": "128px"
    },
    "borderRadius": {
      "none": "0px",
      "sm": "4px",
      "DEFAULT": "6px",
      "md": "6px",
      "full": "9999px"
    },
    "boxShadow": {
      "resting-xs": "0 0 2px 0 rgba(40,35,31,.10)",
      "resting-sm": "1px 1px 3px 0 rgba(40,36,31,.08)",
      "resting-md": "0 2px 6px 0 rgba(66,74,83,.12)",
      "floating-sm": "0 6px 18px 0 rgba(66,74,83,.12), 0 6px 12px -3px rgba(98,88,77,.04)",
      "floating-md": "0 48px 96px -24px rgba(83,76,66,.08), 0 24px 48px -12px rgba(83,75,66,.08), 0 4px 32px -4px rgba(83,79,66,.08), 0 8px 16px -4px rgba(83,78,66,.08)",
      "floating-lg": "0 40px 80px 0 rgba(83,78,66,.24)",
      "floating-xl": "0 56px 112px 0 rgba(83,78,66,.32)",
      "popover": "0 8px 24px 0 #E7E6DF",
      "none": "none",
      "DEFAULT": "1px 1px 3px 0 rgba(40,36,31,.08)"
    },
    "extend": {
      "maxWidth": {
        "frame": "1232px"
      }
    }
  }
};
