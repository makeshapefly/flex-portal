import { browser } from '$app/environment';
interface ColorDataset {
	chartColors: string[];
	chartDarkColors?: string[];
	themeMode: string;
}

function rgbToHex(oklchString: string): string {
	// Use regex to extract the three numeric values
	const matches = oklchString.match(/oklch\(([0-9.]+)\s+([0-9.]+)\s+([0-9.]+)\)/);
	if (matches && matches.length === 4) {
		return oklchToHex(parseFloat(matches[1]), parseFloat(matches[2]), parseFloat(matches[3]));
	}
	return '';
}

// OKLCH to hex conversion function
function oklchToHex(l: number, c: number, h: number): string {
	// Convert OKLCH to OKLAB
	const hRadians = (h * Math.PI) / 180;
	const a = c * Math.cos(hRadians);
	const b = c * Math.sin(hRadians);

	// Convert OKLAB to linear RGB
	const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = l - 0.0894841775 * a - 1.291485548 * b;

	const l_cubed = l_ * l_ * l_;
	const m_cubed = m_ * m_ * m_;
	const s_cubed = s_ * s_ * s_;

	// Convert to linear RGB
	const r = +4.0767416621 * l_cubed - 3.3077115913 * m_cubed + 0.2309699292 * s_cubed;
	const g = -1.2684380046 * l_cubed + 2.6097574011 * m_cubed - 0.3413193965 * s_cubed;
	const ba = -0.0041960863 * l_cubed - 0.7034186147 * m_cubed + 1.707614701 * s_cubed;

	// Clamp and convert to sRGB
	const toGamma = (x: number) => {
		if (x <= 0) return 0;
		if (x >= 1) return 1;
		return x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;
	};

	const r_gamma = Math.round(toGamma(r) * 255);
	const g_gamma = Math.round(toGamma(g) * 255);
	const b_gamma = Math.round(toGamma(ba) * 255);

	// Convert to hex
	return (
		'#' +
		r_gamma.toString(16).padStart(2, '0') +
		g_gamma.toString(16).padStart(2, '0') +
		b_gamma.toString(16).padStart(2, '0')
	);
}

export function getColorCodes(dataset: ColorDataset): string[] {
	// Check if the browser is available
	if (!browser) return [];

	const chartColors =
		dataset.themeMode === 'light'
			? dataset.chartColors
			: (dataset.chartDarkColors ?? dataset.chartColors);

	const hashColorCodes: Array<string> = [];
	chartColors.forEach((className) => {
		const hasClass = document.querySelector(className);
		let backgroundColor;
		if (hasClass) {
			backgroundColor = window.getComputedStyle(hasClass).backgroundColor;
		} else {
			// Create a hidden element instead of appending it to the document body
			const divElement = document.createElement('div');
			divElement.className = className;
			divElement.style.visibility = 'hidden';
			document.body.appendChild(divElement);
			// Get the computed style once
			const styles = window.getComputedStyle(divElement);
			backgroundColor = styles.backgroundColor;
			// Remove the hidden element from the DOM
			document.body.removeChild(divElement);
		}
		// Convert RGB color to hexadecimal
		const hexColor = rgbToHex(backgroundColor);
		// Store the hexadecimal color code
		if (hexColor) hashColorCodes.push(hexColor);
		else hashColorCodes.push(backgroundColor);
	});
	return hashColorCodes;
}
