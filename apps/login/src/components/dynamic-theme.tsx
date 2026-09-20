"use client";

import { Logo } from "@/components/logo";
import { BrandingSettings } from "@zitadel/proto/zitadel/settings/v2/branding_settings_pb";
import React, { Children, CSSProperties, ReactNode } from "react";
import { JaynArtPicker, useJaynArtChoice } from "./jayn-art-picker";
import { ThemeWrapper } from "./theme-wrapper";

/**
 * Jayn keeps ZITADEL's flow components intact and gives every step one stable
 * shell: the landing artwork on the left and the active flow on the right.
 * CSS stacks the two regions on small screens without changing their order.
 */
export function DynamicTheme({
  branding,
  children,
}: {
  children: ReactNode | ((isSideBySide: boolean) => ReactNode);
  branding?: BrandingSettings;
}) {
  const actualChildren: ReactNode = React.useMemo(() => {
    if (typeof children === "function") {
      return (children as (isSideBySide: boolean) => ReactNode)(true);
    }
    return children;
  }, [children]);

  const childArray = Children.toArray(actualChildren);
  const hasTitleAndForm = childArray.length === 2;
  const titleContent = hasTitleAndForm ? childArray[0] : null;
  const formContent = hasTitleAndForm ? childArray[1] : childArray[0];
  const [art, cycleArt] = useJaynArtChoice();
  const artworkStyle = {
    "--jayn-art-position-band": art.band ?? "center 30%",
    "--jayn-art-position-column": art.column ?? "center",
    "--jayn-art-mobile-left": art.mobileLeft ?? "-10%",
    "--jayn-art-mobile-width": art.mobileWidth ?? "120%",
  } as CSSProperties;

  return (
    <ThemeWrapper branding={branding}>
      <div className="jayn-auth-page">
        <header className="jayn-auth-header">
          <a className="jayn-auth-wordmark jayn-chrome-control" href="https://jayn.app" aria-label="Jayn home">
            jayn
          </a>
        </header>

        <div className="jayn-auth-art" aria-hidden="true">
          <img
            className="jayn-auth-artwork jayn-auth-artwork-light"
            src={`https://jayn.app/art/portrait-${art.slug}-light.svg`}
            style={artworkStyle}
            alt=""
          />
          <img
            className="jayn-auth-artwork jayn-auth-artwork-dark"
            src={`https://jayn.app/art/portrait-${art.slug}-dark.svg`}
            style={artworkStyle}
            alt=""
          />
        </div>

        <main className="jayn-auth-panel">
          <div className="jayn-auth-content">
            {branding && (branding.lightTheme?.logoUrl || branding.darkTheme?.logoUrl) && (
              <div className="jayn-auth-branding">
                <Logo
                  lightSrc={branding.lightTheme?.logoUrl}
                  darkSrc={branding.darkTheme?.logoUrl}
                  height={56}
                  width={120}
                />
              </div>
            )}
            {titleContent && <div className="jayn-auth-heading">{titleContent}</div>}
            <div className="jayn-auth-form">{formContent}</div>
          </div>

          <a className="jayn-auth-project-link jayn-chrome-control" href="https://jayn.app/jaynshare">
            jaynshare ↗
          </a>
        </main>

        <JaynArtPicker art={art} onCycle={cycleArt} />
      </div>
    </ThemeWrapper>
  );
}
