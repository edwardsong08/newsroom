declare module "page-flip" {
  type PageFlipEvent = {
    data: number | string | { page: number; mode: string };
  };

  type PageFlipSettings = {
    autoSize?: boolean;
    disableFlipByClick?: boolean;
    drawShadow?: boolean;
    flippingTime?: number;
    height: number;
    maxShadowOpacity?: number;
    mobileScrollSupport?: boolean;
    showCover?: boolean;
    showPageCorners?: boolean;
    size?: "fixed" | "stretch";
    startPage?: number;
    useMouseEvents?: boolean;
    usePortrait?: boolean;
    width: number;
  };

  export class PageFlip {
    constructor(element: HTMLElement, settings: PageFlipSettings);
    destroy(): void;
    flipNext(corner?: "top" | "bottom"): void;
    flipPrev(corner?: "top" | "bottom"): void;
    loadFromImages(images: string[]): void;
    on(event: string, callback: (event: PageFlipEvent) => void): void;
  }
}
