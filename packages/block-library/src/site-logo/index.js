/**
 * WordPress dependencies
 */
import { siteLogo as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import metadata from './block.json' assert { type: 'json' };
import edit from './edit';

const { name } = metadata;
export { metadata, name };

export const settings = {
	icon,
	edit,
};
