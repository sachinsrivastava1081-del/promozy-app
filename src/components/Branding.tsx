import { useTheme } from "../context/ThemeContext";

interface BrandingProps {
  size?: "small" | "normal" | "large";
  showTagline?: boolean;
  showCreator?: boolean;
  layout?: "vertical" | "inline";
}

export default function Branding({
  size = "normal",
  showTagline = true,
  showCreator = true,
  layout = "vertical",
}: BrandingProps) {
  const { isDark } = useTheme();

  const sizeClasses = {
    small: { name: "text-lg", tagline: "text-xs", creator: "text-xs" },
    normal: { name: "text-2xl", tagline: "text-sm", creator: "text-sm" },
    large: { name: "text-4xl", tagline: "text-base", creator: "text-base" },
  };

  const classes = sizeClasses[size];

  if (layout === "inline") {
    return (
      <span className="flex items-center gap-2">
        <span
          className={`font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent ${classes.name}`}
        >
          PROMOZY
        </span>
      </span>
    );
  }

  return (
    <div className="text-center">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-1">
        <h1
          className={`font-black bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600 bg-clip-text text-transparent ${classes.name}`}
        >
          PROMOZY
        </h1>
      </div>

      {/* Tagline */}
      {showTagline && (
        <p
          className={`font-semibold ${classes.tagline} ${
            isDark ? "text-purple-300" : "text-purple-600"
          }`}
        >
          Promote Faster. Sell Smarter.
        </p>
      )}

      {/* Creator */}
      {showCreator && (
        <div className={`flex items-center justify-center gap-2 mt-1 ${classes.creator}`}>
          <span className={isDark ? "text-purple-400" : "text-purple-600"}>
            Created by{" "}
            <span className="font-bold text-amber-600">
              SACHIN SRIVASTAVA
            </span>
          </span>
        </div>
      )}
    </div>
  );
}

export function FooterBranding({ size = "normal" }: { size?: "small" | "normal" }) {
  const { isDark } = useTheme();

  return (
    <div className={`text-center ${size === "small" ? "py-2" : "py-4"}`}>
      <p
        className={`font-black bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent ${
          size === "small" ? "text-sm" : "text-base"
        }`}
      >
        PROMOZY
      </p>
      <p className={`text-xs mt-1 ${isDark ? "text-purple-400" : "text-gray-500"}`}>
        Created by <span className="font-bold text-amber-600">SACHIN SRIVASTAVA</span>
      </p>
      <p className={`text-xs mt-1 ${isDark ? "text-purple-500" : "text-gray-400"}`}>
        All rights reserved.
      </p>
    </div>
  );
}