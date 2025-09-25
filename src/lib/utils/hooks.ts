import { fade, fly, scale, slide } from "svelte/transition";
import { elasticInOut, quintOut, cubicInOut, cubicOut } from 'svelte/easing';
export function handleFocusLeave(node: HTMLElement, cb: () => void) {
	function handleFocusIn() {
		if (!node.contains(document.activeElement)) {
			cb();
		}
	}
	document.addEventListener('focusin', handleFocusIn);

	return {
		destroy: () => {
			document.removeEventListener('focusin', handleFocusIn);
		}
	};
}

export function clickOutside(node: HTMLElement, cb: () => void) {
	const handleClick = (event: Event) => {
		if (node && !node.contains(event.target as Node) && !event.defaultPrevented) {
			cb();
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}

export const animate = (node: Element, args: any) => {
	
	switch (args.transition) {
		case 'fly-top':
			args = { delay: 0, duration: 500, y: -500, easing: quintOut };
			return fly(node, args);
		case 'fly-bottom':
			args = { delay: 0, duration: 500, y: 500, easing: quintOut };
			return fly(node, args);
		case 'fly-right':
			args = { delay: 0, duration: 500, x: 500, easing: quintOut };
			return fly(node, args);
		case 'fly-left':
			args = { delay: 0, duration: 500, x: -500, easing: quintOut };
			return fly(node, args);
		case 'slide-x':
			args = { duration: 300, axis: 'x', opacity: 0, easing: cubicInOut };
			return slide(node, args);
		case 'slide-y':
			args = { duration: 300, axis: 'y',  easing: cubicInOut }; 
			return slide(node, args);
		case 'fade':
			args = { duration: 200, delay: 100, easing: cubicInOut };
			return fade(node, args);
		case 'scale':
			args = { duration: 300, opacity: 0, start: 0.5, easing: cubicInOut };
			return scale(node, args);
		case 'scale-top':
			return scaleFromTop(node, args);
		case 'scale-top-start':
			return scaleFromTopStart(node, args);
		case 'scale-top-end':
			return scaleFromTopEnd(node, args);
		case 'scale-left':
			return scaleFromLeft(node, args);
		case 'scale-left-start':
			return scaleFromLeftStart(node, args);
		case 'scale-left-end':
			return scaleFromLeftEnd(node, args);
		case 'scale-right':
			return scaleFromRight(node, args);
		case 'scale-right-start':
			return scaleFromRightStart(node, args);
		case 'scale-right-end':
			return scaleFromRightEnd(node, args);
		case 'scale-bottom':
			return scaleFromBottom(node, args);
		case 'scale-bottom-start':
			return scaleFromBottomStart(node, args);
		case 'scale-bottom-end':
			return scaleFromBottomEnd(node, args);
		default:
			args = { duration: 1 };
			return fade(node, args);
	}
};

  // Scale animation for Top
  export function scaleFromTop(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: top;
      `,
    };
  }

  // Scale animation for Top Start (Top Left)
  export function scaleFromTopStart(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: top left;
      `,
    };
  }

  // Scale animation for Top End (Top Right)
  export function scaleFromTopEnd(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: top right;
      `,
    };
  }

  // Scale animation for Right
  export function scaleFromRight(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: right;
      `,
    };
  }

  // Scale animation for Right Start (Top Right)
  export function scaleFromRightStart(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: top right;
      `,
    };
  }

  // Scale animation for Right End (Bottom Right)
  export function scaleFromRightEnd(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: bottom right;
      `,
    };
  }

  // Scale animation for Bottom
  export function scaleFromBottom(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: bottom;
      `,
    };
  }

  // Scale animation for Bottom Start (Bottom Left)
  export function scaleFromBottomStart(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: bottom left;
      `,
    };
  }

  // Scale animation for Bottom End (Bottom Right)
  export function scaleFromBottomEnd(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: bottom right;
      `,
    };
  }

  // Scale animation for Left
  export function scaleFromLeft(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: left;
      `,
    };
  }

  // Scale animation for Left Start (Top Left)
  export function scaleFromLeftStart(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: top left;
      `,
    };
  }

  // Scale animation for Left End (Bottom Left)
  export function scaleFromLeftEnd(node: Element, { duration = 300, easing = cubicInOut } = {}) {
    const style = getComputedStyle(node);
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
      duration,
      easing,
      css: (t: number) => `
        transform: ${transform} scale(${t});
        transform-origin: bottom left;
      `,
    };
  }


