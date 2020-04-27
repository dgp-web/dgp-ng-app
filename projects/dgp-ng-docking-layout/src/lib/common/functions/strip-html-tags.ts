declare var $: any;

/**
 * Removes html tags from a string
 *
 * @param   {String} input
 *
 * @returns {String} input without tags
 */
export function stripHtmlTags(input) {
    return $.trim(input.replace(/(<([^>]+)>)/ig, ""));
}
