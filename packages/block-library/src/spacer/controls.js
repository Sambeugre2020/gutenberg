/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useSetting } from '@wordpress/block-editor';
import {
	BaseControl,
	PanelBody,
	__experimentalUseCustomUnits as useCustomUnits,
	__experimentalUnitControl as UnitControl,
	__experimentalParseQuantityAndUnitFromRawValue as parseQuantityAndUnitFromRawValue,
} from '@wordpress/components';
import { useInstanceId } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import {
	MIN_SPACER_WIDTH,
	MAX_SPACER_WIDTH,
	MIN_SPACER_HEIGHT,
	MAX_SPACER_HEIGHT,
} from './edit';

function DimensionInput( {
	label,
	onChange,
	isResizing,
	value = '',
	min,
	max,
} ) {
	const inputId = useInstanceId( UnitControl, 'block-spacer-height-input' );

	// In most contexts the spacer size cannot meaningfully be set to a
	// percentage, since this is relative to the parent container. This
	// unit is disabled from the UI.
	const availableUnitSettings = (
		useSetting( 'spacing.units' ) || undefined
	)?.filter( ( availableUnit ) => availableUnit !== '%' );

	const units = useCustomUnits( {
		availableUnits: availableUnitSettings || [
			'px',
			'em',
			'rem',
			'vw',
			'vh',
		],
		defaultValues: { px: 100, em: 10, rem: 10, vw: 10, vh: 25 },
	} );

	const handleOnChange = ( unprocessedValue ) => {
		onChange( unprocessedValue );
	};

	// Force the unit to update to `px` when the Spacer is being resized.
	const [ parsedQuantity, parsedUnit ] = parseQuantityAndUnitFromRawValue(
		value
	);
	const computedValue = [
		parsedQuantity,
		isResizing ? 'px' : parsedUnit,
	].join( '' );

	return (
		<BaseControl label={ label } id={ inputId }>
			<UnitControl
				id={ inputId }
				isResetValueOnUnitChange
				min={ min }
				max={ max }
				onChange={ handleOnChange }
				style={ { maxWidth: 80 } }
				value={ computedValue }
				units={ units }
			/>
		</BaseControl>
	);
}

export default function SpacerControls( {
	setAttributes,
	orientation,
	height,
	width,
	isResizing,
} ) {
	return (
		<InspectorControls>
			<PanelBody title={ __( 'Spacer settings' ) }>
				{ orientation === 'horizontal' && (
					<DimensionInput
						label={ __( 'Width' ) }
						value={ width }
						onChange={ ( nextWidth ) =>
							setAttributes( { width: nextWidth } )
						}
						isResizing={ isResizing }
						min={ MIN_SPACER_WIDTH }
						max={ MAX_SPACER_WIDTH }
					/>
				) }
				{ orientation !== 'horizontal' && (
					<DimensionInput
						label={ __( 'Height' ) }
						value={ height }
						onChange={ ( nextHeight ) =>
							setAttributes( { height: nextHeight } )
						}
						isResizing={ isResizing }
						min={ MIN_SPACER_HEIGHT }
						max={ MAX_SPACER_HEIGHT }
					/>
				) }
			</PanelBody>
		</InspectorControls>
	);
}
