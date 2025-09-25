import fs from 'fs';
import path from 'path';

// Path to the TypeScript file
const tsFilePath = path.join(process.cwd(), 'src/index.d.ts');
const tsFile = path.dirname(tsFilePath);

let tsFileContent = '';

function readTsFile() {
    try {
        // Check if the directory exists
        if (!fs.existsSync(tsFile)) {
            throw new Error(`Directory not found: ${tsFile}`);
        }

        // Read the TypeScript file content
        if (!tsFileContent) {
            tsFileContent = fs.readFileSync(tsFilePath, 'utf-8');
        }
    } catch (error) {
        console.error(`An error occurred: ${error.message}`);
        process.exit(1);  // Exit the process with failure code
    }
}

// Function to extract types from multiline type definitions
const extractTypes = (content, typeName) => {
    try {
        const regex = new RegExp(`type ${typeName} =\\s*([\\s\\S]*?);`, 'g');
        const match = regex.exec(content);

        if (match) {
            return match[1]
                .split('|')                  // Split by pipe symbol
                .map(s => s.trim())           // Trim the whitespace
                .map(s => s.replace(/'/g, '')) // Remove single quotes
                .filter(Boolean);             // Remove empty strings
        }

        throw new Error(`Type definition for "${typeName}" not found.`);
    } catch (error) {
        console.error(`Error extracting types: ${error.message}`);
        return [];
    }
};

// Function to get types
function getTypes(typeName) {
    try {
        if (!tsFileContent) readTsFile();
        return extractTypes(tsFileContent, typeName);
    } catch (error) {
        console.error(`Error getting types for "${typeName}": ${error.message}`);
        return [];
    }
}

/**
 * Function to generate records and write to a destination file.
 * 
 * @param {string} destinationPath - The file path where generated records will be written.
 * @param {string} variantName - The type definition name for variant (e.g., 'ProgressVariant').
 * @param {string} colorName - The type definition name for color (e.g., 'ProgressColors').
 * @param {string} exportName - The export variable name (e.g., 'fillClasses').
 * @param {string} recordKeyType - The type definition of key for records (e.g., 'UI.ProgressVariantColor').
 * @param {string} recordValueType - The type definition of value for records (e.g., 'string').
 * @param {Function} callback - Callback function that generates values based on variantColors. 
 */
export async function generateAndWriteToFile(config) {
    const { destinationPath, variantName, colorName, exportName, recordKeyType, recordValueType, callback } = config;
    try {
        // Fetch types from the provided type definitions
        const progressVariants = getTypes(variantName);
        const progressColors = getTypes(colorName);

        // Generate the array of ProgressVariantColor strings
        const variantColors = [];
        progressVariants.forEach(variant => {
            progressColors.forEach(color => {
                variantColors.push(`${variant}-${color}`);
            });
        });

        // Use the callback to generate the mapping
        const fillClasses = callback(variantColors);

        // Convert the fillClasses object to a string with the correct export format
        const classesString = `export const ${exportName}: Record<${recordKeyType}, ${recordValueType}> = ${JSON.stringify(fillClasses, null, 2)};`;

        // Determine the full file path
        const filePath = path.join(process.cwd(), destinationPath);

        // Ensure the directory exists
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            throw new Error(`Directory not found: ${dir}`);
        }

        // Write the generated content to the file
        await fs.writeFileSync(filePath, classesString, 'utf8');
        console.log(`Css maping done for:  ${filePath}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

/**
 * Function to generate records and write to a destination file for multiple configurations.
 * 
 * @param {Array} configs - Array of configuration objects containing:
 *   - {string} destinationPath - The file path where generated records will be written.
 *   - {string} variantName - The type definition name for variant (e.g., 'ProgressVariant').
 *   - {string} colorName - The type definition name for color (e.g., 'ProgressColors').
 *   - {string} exportName - The export variable name (e.g., 'fillClasses').
 *   - {string} recordKeyType - The type definition of key for records (e.g., 'UI.ProgressVariantColor').
 *   - {string} recordValueType - The type definition of value for records (e.g., 'string').
 *   - {Function} callback - Callback function that generates values based on variantColors.
 */
export async function generateMultipleFiles(fileConfigs) {
    const tasks = fileConfigs.map((fileConfig) =>  generateAndWriteToFile(fileConfig));
    // Execute all tasks concurrently
    await Promise.all(tasks);
}



export function generateTypes(colorName, omitColors, isAppendTemeColors) {
    const mainColors = getTypes("Colors");
    const themeColors = getTypes("ThemeColors");
    const toGenetateColors = isAppendTemeColors ? [...mainColors, ...themeColors] : mainColors;
    const typeString = `type ${colorName} = ${toGenetateColors.filter((color) => !omitColors.includes(color)).map(color=>`'${color}'`).join(' | ')};\n`;
    return typeString;
}

/**
 * Generate type definitions for multiple color types using a single array of objects.
 * @param {Array} typesConfig - Array of objects containing { colorName, omitColors, isAppendThemeColors }.
 */
export async function updateIndexFile(typesConfig) {
    try {
        // Read the current content of the index.d.ts file
        await readTsFile();
        let content = tsFileContent;

        // Find the position to insert the new type definitions
        const insertPosition = content.indexOf('namespace UI {') + 'namespace UI {'.length;

        // Generate all type definitions based on the configuration
        const generatedTypes = typesConfig.map(({ colorName, omitColors, isAppendThemeColors }) => {
            return generateTypes(colorName, omitColors, isAppendThemeColors).trim();
        }).join('\n\n'); // Combine all types into a single string

        // Prepare the new content by inserting the generated types at the correct position
        const newContent = `${content.slice(0, insertPosition)}
        ${generatedTypes}
        ${content.slice(insertPosition)}`;

        // Write the updated content back to the index.d.ts file once
        await fs.writeFileSync(tsFilePath, newContent, 'utf-8');
        console.log(`Successfully updated ${tsFilePath}`);
    } catch (error) {
        console.error(`Error updating index.d.ts: ${error.message}`);
    }
}
