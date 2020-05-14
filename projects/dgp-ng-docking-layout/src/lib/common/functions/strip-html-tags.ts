

/**
 * Removes html tags from a string
 *
 * @param   {String} input
 *
 * @returns {String} input without tags
 */
export function stripHtmlTags(input) {
    if (!input) return null;
    return $.trim(input.replace(/(<([^>]+)>)/ig, ""));
}
